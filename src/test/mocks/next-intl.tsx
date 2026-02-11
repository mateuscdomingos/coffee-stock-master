import React from 'react';
import messages from '../../messages/en.json';

jest.mock('next-intl', () => {
  return {
    useTranslations: (namespace: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const getNested = (obj: any, path: string) =>
        path.split('.').reduce((acc, part) => acc && acc[part], obj);

      const tMessages = namespace ? getNested(messages, namespace) : messages;

      const t = (key: string) => tMessages?.[key] || key;

      t.rich = (
        key: string,
        components: Record<
          string,
          (chunks: React.ReactNode) => React.ReactNode
        >,
      ) => {
        const rawText = tMessages?.[key] || key;
        const parts = rawText.split(/<(\w+)>(.*?)<\/\1>/g);

        if (parts.length <= 1) return rawText;

        const result: React.ReactNode[] = [];
        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];
          if (i % 3 === 0) {
            if (part) {
              result.push(
                <React.Fragment key={`text-${i}`}>{part}</React.Fragment>,
              );
            }
          } else if (i % 3 === 1) {
            const tagName = part;
            const content = parts[i + 1];
            const renderFn = components[tagName];

            if (typeof renderFn === 'function') {
              result.push(
                <React.Fragment key={`comp-${i}`}>
                  {renderFn(content)}
                </React.Fragment>,
              );
            }
            i++;
          }
        }
        return result;
      };

      return t;
    },
    useLocale: () => 'en',
    NextIntlClientProvider: ({ children }: { children: React.ReactNode }) =>
      children,
  };
});

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn(async (namespace?: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getNested = (obj: any, path: string) =>
      path.split('.').reduce((acc, part) => acc && acc[part], obj);

    const tMessages = namespace ? getNested(messages, namespace) : messages;

    return (key: string) => tMessages?.[key] || key;
  }),
}));

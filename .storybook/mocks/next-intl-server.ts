/* eslint-disable @typescript-eslint/no-explicit-any */
import messages from '../../src/messages/en.json';

export const getTranslations = async (namespace?: string) => {
  const getNested = (obj: any, path: string) => {
    if (!path) return obj;
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const tMessages = namespace ? getNested(messages, namespace) : messages;

  const t = (key: string) => {
    const value = getNested(tMessages, key);
    return value !== undefined ? value : key;
  };

  t.rich = (key: string, components: Record<string, (chunks: any) => any>) => {
    const rawText = t(key);

    if (typeof rawText !== 'string') return rawText;

    const parts = rawText.split(/<(\w+)>(.*?)<\/\1>/g);
    if (parts.length <= 1) return rawText;

    const result: any[] = [];
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (i % 3 === 0) {
        if (part) result.push(part);
      } else if (i % 3 === 1) {
        const tagName = part;
        const content = parts[i + 1];
        const renderFn = components[tagName];
        if (typeof renderFn === 'function') {
          result.push(renderFn(content));
        }
        i++;
      }
    }
    return result;
  };

  return t;
};

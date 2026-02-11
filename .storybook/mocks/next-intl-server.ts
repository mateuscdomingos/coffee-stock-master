import messages from '../../src/messages/en.json';

export const getTranslations = async (namespace?: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getNested = (obj: any, path: string) =>
    path.split('.').reduce((acc, part) => acc && acc[part], obj);

  const tMessages = namespace ? getNested(messages, namespace) : messages;

  return (key: string) => {
    return tMessages?.[key] || key;
  };
};

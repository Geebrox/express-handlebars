import fs from 'fs/promises';
import path from 'path';

export type TMessage = { author: string; message: string };
const messagesPath = path.resolve(__dirname, 'messages.json');
const defaultMessages: TMessage[] = [
  {
    author: 'John Does',
    message:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat, quia.',
  },
];

export const getMessages = async () => {
  try {
    const data = await fs.readFile(messagesPath, { encoding: 'utf8' });
    return JSON.parse(data) as TMessage[];
  } catch (err: any) {
    if ('code' in err && err.code === 'ENOENT') {
      await fs.writeFile(messagesPath, JSON.stringify(defaultMessages), {
        encoding: 'utf8',
      });
    }

    return defaultMessages;
  }
};

export const saveMessages = (messages: TMessage[]) => {
  try {
    return fs.writeFile(messagesPath, JSON.stringify(messages), {
      encoding: 'utf8',
    });
  } catch (err: any) {
    if ('code' in err && err.code === 'ENOENT') {
      return fs.writeFile(messagesPath, '[]');
    }

    return;
  }
};

export const addMessage = (author: string, message: string) => {
  getMessages().then((messages) => {
    messages.unshift({ author, message });
    saveMessages(messages);
  });
};

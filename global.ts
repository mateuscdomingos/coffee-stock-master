// in a file like global.ts or next-env.d.ts
import messages from './src/messages/en.json'; // or your default locale messages

declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof messages;
    // You can also add custom Formats or other configurations here
  }
}

export {};

/** Минимальные типы под initTelegramWebApp (полная схема в оф. SDK) */
type TelegramWebAppViewport = {
  ready: () => void;
  expand: () => void;
  viewportHeight: number;
  viewportStableHeight: number;
  setHeaderColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  onEvent: (event: string, handler: () => void) => void;
};

declare global {
  interface Window {
    Telegram?: { WebApp: TelegramWebAppViewport };
  }
}

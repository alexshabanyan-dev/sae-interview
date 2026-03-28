/** Скрипт https://telegram.org/js/telegram-web-app.js задаёт window.Telegram.WebApp */

const APP_BG = "#06060a";

export function initTelegramWebApp(): boolean {
  const tg = window.Telegram?.WebApp;
  if (!tg) {
    return false;
  }

  tg.ready();
  tg.expand();

  document.documentElement.classList.add("tg-webapp");

  const applyViewport = () => {
    const h = tg.viewportStableHeight ?? tg.viewportHeight;
    if (h > 0) {
      document.documentElement.style.setProperty("--app-viewport-height", `${h}px`);
    }
  };

  applyViewport();
  tg.onEvent("viewportChanged", applyViewport);

  try {
    tg.setHeaderColor(APP_BG);
    tg.setBackgroundColor(APP_BG);
  } catch {
    /* старые клиенты */
  }

  const extended = tg as typeof tg & { disableVerticalSwipes?: () => void };
  extended.disableVerticalSwipes?.();

  return true;
}

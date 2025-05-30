import { mockTelegramEnv, emitEvent, retrieveLaunchParams } from '@telegram-apps/bridge';

// Важно, чтобы имитация среды выполнялась только в целях разработки. При сборке
// приложения значение import.meta.env.DEV станет ложным, а код внутри будет изменен на древовидный,
// поэтому вы не увидите его в своем окончательном пакете.
if (import.meta.env.DEV) {
  let shouldMock: boolean;
  // Попытка извлечь параметры запуска, чтобы проверить, основана ли текущая среда на Telegram.
  try {
    // Если мы можем извлечь параметры запуска, это означает, что мы уже находимся в среде 
    // Telegram. Таким образом, нет необходимости имитировать её.
    retrieveLaunchParams();

    // Ранее мы могли имитировать окружающую среду. В случае, если мы это сделали, мы должны сделать это снова.
    // Потому что страница может быть перезагружена, и мы должны снова использовать имитацию, потому что имитация также
    // позволяет изменять объект window.
    shouldMock = !!sessionStorage.getItem('____mocked');
  } catch (e) {
    shouldMock = true;
  }

  if (shouldMock) {
    console.log("Включена имитация окружающей среды Telegram");
    const noInsets = {
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
    } as const;
    const themeParams = {
      accent_text_color: '#6ab2f2',
      bg_color: '#17212b',
      button_color: '#5288c1',
      button_text_color: '#ffffff',
      destructive_text_color: '#ec3942',
      header_bg_color: '#17212b',
      hint_color: '#708499',
      link_color: '#6ab3f3',
      secondary_bg_color: '#232e3c',
      section_bg_color: '#17212b',
      section_header_text_color: '#6ab3f3',
      subtitle_text_color: '#708499',
      text_color: '#f5f5f5',
    } as const;

    mockTelegramEnv({
      launchParams: {
        tgWebAppThemeParams: themeParams,
        tgWebAppData: new URLSearchParams([
          ['user', JSON.stringify({
            id: Number(import.meta.env.VITE_MOCK_USER_ID) || 99281932,
            first_name: 'Ivan',
            last_name: 'Petrov',
            username: 'petrov',
            language_code: 'ru',
            is_premium: true,
            allows_write_to_pm: true,
          })],
          ['hash', 'wP0hiNsZtrjRu_f8IE9rbgjic-lnFm4MoSBPKhMvOtZgJDqA8SSQN421SsnqxQResAsZaShR4eUuL4WKUAQLCQ'],
          ['signature', '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31'],
          ['auth_date', Date.now().toString()],
          ['chat_type', 'sender'],
          ['chat_instance', '8428209589180549439'],
        ]),
        tgWebAppStartParam: 'debug',
        tgWebAppVersion: '8.3',
        tgWebAppPlatform: 'tdesktop',
      },
      onEvent(e) {
        if (e[0] === 'web_app_request_theme') {
          return emitEvent('theme_changed', { theme_params: themeParams });
        }
        if (e[0] === 'web_app_request_viewport') {
          return emitEvent('viewport_changed', {
            height: window.innerHeight,
            width: window.innerWidth,
            is_expanded: true,
            is_state_stable: true,
          });
        }
        if (e[0] === 'web_app_request_content_safe_area') {
          return emitEvent('content_safe_area_changed', noInsets);
        }
        if (e[0] === 'web_app_request_safe_area') {
          return emitEvent('safe_area_changed', noInsets);
        }
      },
    });
    sessionStorage.setItem('____mocked', '1');

    console.info(
      'До тех пор, пока текущая среда не определяется как основанная на Telegram, она будет имитирована. Обратите внимание, что вы не должны делать этого в рабочей среде, а текущее поведение относится только к процессу разработки. Имитирование среды применяется только в режиме разработки. Таким образом, после создания приложения вы не увидите такого поведения и связанного с ним предупреждения, приводящего к сбою приложения вне Telegram.',
    );
  }
}
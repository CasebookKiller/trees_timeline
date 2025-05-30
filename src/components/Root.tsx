const erudaon = false;

import { type FC, useEffect, useMemo } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { retrieveLaunchParams } from '@telegram-apps/bridge';

import { App } from '@/components/App';
import { ErrorBoundary } from '@/components/ErrorBoundary.tsx';

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
  <div>
    <p>Произошла необработанная ошибка:</p>
    <blockquote>
      <code>
        {error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : JSON.stringify(error)}
      </code>
    </blockquote>
  </div>
);

interface InnerProps {
  Component: FC;
  pageProps: any;
}

const Inner: FC<InnerProps> = ({ Component, pageProps }) => {
  console.log('Запуск приложения');
  console.log(`Для запуска приложения в режиме отладки запустите бот с параметром: ?startapp=debug\n
    https://t.me/{botusername}/{appname}?startapp=debug`);

  const launchParams = retrieveLaunchParams();
  console.log('Параметры запуска:', launchParams);
  const startParam = launchParams.tgWebAppStartParam;
  const debug = startParam === 'debug';
  console.log('Режим отладки:', debug);
  
  const manifestUrl = useMemo(() => {
    return new URL(import.meta.env.VITE_APP_FOLDER + 'tonconnect-manifest.json', window.location.href).toString();
  }, []);

  // Включите режим отладки, чтобы просмотреть все отправленные методы и полученные события.
  useEffect(() => {
    if (debug) {
      console.log('Режим отладки включен');
      erudaon && import('eruda').then((lib) => lib.default.init());
    }
  }, [debug]);

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <PrimeReactProvider>
        <Component {...pageProps}/>
      </PrimeReactProvider>
    </TonConnectUIProvider>
  );
};

export const Root: FC = () => (
  <ErrorBoundary fallback={ErrorBoundaryError}>
    <Inner
      Component={App}
      pageProps={{title: 'Калькулятор государственной пошлины'}}
    />
  </ErrorBoundary>
);
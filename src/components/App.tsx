import { type FC,
  startTransition,
  useEffect,
} from 'react';
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import {
  shareURL,
  popup,
  mainButton,
  backButton,
  miniApp,
  themeParams,
  viewport,
  init,
  retrieveLaunchParams,
} from '@telegram-apps/sdk-react';

import { routes } from '@/navigation/routes.tsx';

function BackButtonManipulator() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    function onClick() {
      navigate(-1);
    }
    backButton.onClick(onClick);

    return () => backButton.offClick(onClick);
  }, [navigate]);

  useEffect(() => {
    console.log('location.pathname: ', location.pathname);
    if (location.pathname === '/' || location.pathname === '/poshlina-dev/') {
      if (backButton.isSupported() && backButton.isMounted()) !backButton.isVisible() && backButton.hide();
    } else {
      if (backButton.isSupported() && backButton.isMounted()) !backButton.isVisible() && backButton.show();
    }
  }, [location]);

  return null;
}

function MainButtonManipulator() {
  
  const location = useLocation();

  let mainButtonParams = {
    backgroundColor: themeParams.buttonColor() || '#2990ff',
    textColor: themeParams.buttonTextColor() || '#ffffff',
    text: 'Поделиться приложением'
  }
  
  if (!mainButton.isMounted()) mainButton.mount();
  mainButton.setParams(mainButtonParams);
  if (location.pathname === '/') mainButton.mount();
  console.log('Добавлена главная кнопка', mainButton);

  useEffect(() => {
    console.log('location.pathname: ', location.pathname);
    if (location.pathname === '/') {
      mainButton.setParams({ text: 'Поделиться приложением', isVisible: true, isEnabled: true });
      mainButton.mount();
    } else {
      mainButton.setParams({ text: 'Перейдите на главную страницу', isVisible: false, isEnabled: true });
      mainButton.mount();
    }
    mainButton.onClick(() => {
      try {
        console.log('mainButton.onCLick');
        popup.open({
            title: 'Поделиться приложением!',
            message: 'Для того чтобы поделиться приложением, нажмите на кнопку Ok.',
            buttons: [
              { id: 'btnproceed', type: 'default', text: 'Ok' },
              { id: 'btncancel', type: 'cancel' },
            ],
          })
          .then((buttonId: string|null) => {
            if (buttonId === 'btnproceed') {
              const url = 'https://t.me/{reactjs-template}'; //измените путь на путь бота и приложения
              shareURL(`Посмотрите мое приложение ${url}`);
            } else {
              console.log(
                buttonId === null 
                  ? 'Пользователь не нажимал кнопок.'
                  : `Пользователь нажал кнопку с ID "${buttonId}"`
              );
            }
           
          });
  
        console.log(popup.isOpened); // true
        
        console.log('Окно выбора чата открыто для отправки сообщения.');
      } catch (error) {
        console.error('Ошибка при открытии окна выбора чата:', error);
      }
    })
  }, [location]);

  return null;
  
}

export const App: FC = () => {
  init();
  const lp = retrieveLaunchParams();
  console.log('lp', lp);

  if (!miniApp.isMounted()) miniApp.mount();

  useEffect(() => {
    
    if (!themeParams.isMounted()) themeParams.mount();
    if (!themeParams.isCssVarsBound()) themeParams.bindCssVars();
    if (!viewport.isMounted()) viewport.mount();
    if (!backButton.isMounted()) backButton.mount();

  }, []);

    
  startTransition(() => {
    console.log('%cminiApp: %o', `color: cyan`, miniApp);
  });

  return (
    <>
      <HashRouter>
        <BackButtonManipulator/>
        <MainButtonManipulator/>
        <Routes>
          {routes.map((route) => <Route key={route.path} {...route} />)}
          <Route path='*' element={<Navigate to='/'/>}/>
        </Routes>
      </HashRouter>
    </>
  );
};

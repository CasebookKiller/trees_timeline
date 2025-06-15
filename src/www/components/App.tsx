import { type FC } from 'react';
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
//  useLocation,
//  useNavigate,
} from 'react-router-dom';

import { routes } from '@/www/navigation/routes';

export const App: FC = () => {
  return (
    <>
      <HashRouter>
        <Routes>
          {routes.map((route) => <Route key={route.path} {...route} />)}
          <Route path='*' element={<Navigate to='/'/>}/>
        </Routes>
      </HashRouter>
    </>
  );
};

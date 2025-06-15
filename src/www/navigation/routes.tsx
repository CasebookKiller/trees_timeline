import type { ComponentType, JSX } from 'react';

import { IndexPage } from '@/www/pages/IndexPage/IndexPage';
import { TimelinePage } from '@/www/pages/TimelinePage/TimelinePage';
import { TablePage } from '@/www/pages/TablePage/TablePage';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: IndexPage },
  { path: '/timeline/*', Component: TimelinePage, title: 'Хронология событий' },
  { path: '/table/*', Component: TablePage, title: 'Хронология событий' },
];

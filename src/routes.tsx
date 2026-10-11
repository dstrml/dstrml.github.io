import type { ReactElement } from 'react';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';

export type ClientEntry = 'home';

export interface Route {
  path: string;
  element: ReactElement;
  entry?: ClientEntry;
  meta?: {
    title?: string;
    description?: string;
  };
}

export const routes: Route[] = [
  { path: '/', element: <Home />, entry: 'home' },
  { path: '/404', element: <NotFound />, meta: { title: '404 · Page not found' } }
];

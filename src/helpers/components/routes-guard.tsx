import { Route, Routes } from 'react-router-dom';

import { TNavMeta } from '../../interfaces';
import { Home, PageNotFound } from '../../pages';
import { MainLayout } from '../../ui/layout';
import { lazyRetry } from '../../utilities/lazy-load';
import { SuspenseBoundary } from './suspense-boundary';

const loadComponent = (component: string) => lazyRetry(() => import(`../../pages/${component}`));

interface IRoutesGuard {
  root?: boolean;
  navMeta: TNavMeta[];
  withLayout?: boolean;
  path?: string;
}

export function RoutesGuard({
  root = false,
  navMeta,
  withLayout = true,
  path = '/',
}: IRoutesGuard) {
  return (
    <Routes>
      <Route path={path} element={withLayout ? <MainLayout /> : undefined}>
        Default Home page route component mounted
        {root && <Route index element={<Home />} />}
        {navMeta.map((nav: TNavMeta) => {
          const Component = loadComponent(nav.component);
          return (
            <Route
              key={nav.path}
              index={nav.index}
              path={nav.path}
              element={
                <SuspenseBoundary>
                  <Component />
                </SuspenseBoundary>
              }
            />
          );
        })}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

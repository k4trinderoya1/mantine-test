import { Outlet, useLocation } from 'react-router-dom';
import { Navigation } from './Navigation/Navigation';
import { useEffect, useState } from 'react';
import styles from './Layout.module.css';
import { routes } from '../Router'; // Adjust the import path as necessary

export function Layout() {
  const location = useLocation();
  const [transitionStage, setTransitionStage] = useState('fadeIn');
  const [displayLocation, setDisplayLocation] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname !== displayLocation) {
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);

  useEffect(() => {
    if (transitionStage === 'fadeOut') {
      setTransitionStage('fadeIn');
      setDisplayLocation(location.pathname);
    }
  }, [transitionStage]);

  // Определение фона текущей страницы по маршруту
  const currentRoute = routes.find(route => route.path === location.pathname ||
    (route.path.endsWith('/:id') && location.pathname.startsWith(route.path.replace('/:id', ''))));

  const pageBackground = currentRoute?.pageBackground || styles.defaultBackground;

  return (
    <>
      <Navigation />
      <div
        className={`${styles.pageTransition} ${styles[transitionStage]} ${pageBackground}`}
        onAnimationEnd={() => {
          if (transitionStage === 'fadeOut') {
            setTransitionStage('fadeIn');
          }
        }}
      >
        <Outlet />
      </div>
    </>
  );
}

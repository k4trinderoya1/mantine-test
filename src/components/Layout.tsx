import { Outlet, useLocation } from 'react-router-dom';
import { Navigation } from './Navigation/Navigation';
import { useEffect, useState } from 'react';
import styles from './Layout.module.css';
import { routes } from '../Router'; 
import { useComputedColorScheme } from '@mantine/core';

export function Layout() {
  const location = useLocation();
  const [transitionStage, setTransitionStage] = useState('fadeIn');
  const [displayLocation, setDisplayLocation] = useState(location.pathname);
  const colorScheme = useComputedColorScheme(); // Получаем текущую тему (dark или light)

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

  // Поиск текущего маршрута
  const currentRoute = routes.find(route => route.path === location.pathname ||
    (route.path.endsWith('/:id') && location.pathname.startsWith(route.path.replace('/:id', ''))));

  // Установка правильного фона в зависимости от темы
  const pageBackground = currentRoute
    ? colorScheme === 'dark'
      ? currentRoute.pageBackgroundDark // Применяем темный фон
      : currentRoute.pageBackground    // Применяем светлый фон
    : colorScheme === 'dark'
      ? styles.defaultBackgroundDark   // Применяем темный фон по умолчанию
      : styles.defaultBackground;      // Применяем светлый фон по умолчанию

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

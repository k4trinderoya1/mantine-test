import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { RatingPage } from './pages/Rating.page';
import { MenuPage } from './pages/Menu.page';
import { GalleryPage } from './pages/Gallery.page';
import GalleryItemPage from './pages/GalleryItem.page';
import { Layout } from './components/Layout';
import styles from './components/Layout.module.css';
import '../public/chatbot/chatbot/chatbot.css';

import { Container } from '@mantine/core';

export const routes = [
  { 
    path: '/', 
    element: <Container><HomePage /></Container>, 
    pageBackground: styles.homePageBackground,
    pageBackgroundDark: styles.homePageBackgroundDark // Добавили темный фон
  },
  { 
    path: '/menu', 
    element: <MenuPage />, 
    pageBackground: styles.menuPageBackground,
    pageBackgroundDark: styles.menuPageBackgroundDark // Добавили темный фон
  },
  { 
    path: '/rating', 
    element: <RatingPage />, 
    pageBackground: styles.ratingPageBackground,
    pageBackgroundDark: styles.ratingPageBackgroundDark // Добавили темный фон
  },
  { 
    path: '/gallery', 
    element: <GalleryPage />, 
    pageBackground: styles.galleryPageBackground,
    pageBackgroundDark: styles.galleryPageBackgroundDark // Добавили темный фон
  },
  { 
    path: '/gallery/:id', 
    element: <GalleryItemPage />, 
    pageBackground: styles.galleryPageBackground,
    pageBackgroundDark: styles.galleryPageBackgroundDark // Добавили темный фон
  },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, 
    children: routes.map(route => ({
      path: route.path,
      element: route.element,
    })),
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}

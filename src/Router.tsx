import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { RatingPage } from './pages/Rating.page';
import { MenuPage } from './pages/Menu.page';
import { GalleryPage } from './pages/Gallery.page';
import GalleryItemPage from './pages/GalleryItem.page';
import { Layout } from './components/Layout';
import styles from './components/Layout.module.css';

import { Container } from '@mantine/core';

export const routes = [
  { path: '/', element: <Container><HomePage /></Container>, pageBackground: styles.homePageBackground },
  { path: '/menu', element: <MenuPage />, pageBackground: styles.menuPageBackground },
  { path: '/rating', element: <RatingPage />, pageBackground: styles.ratingPageBackground },
  { path: '/gallery', element: <GalleryPage />, pageBackground: styles.galleryPageBackground },
  { 
    path: '/gallery/:id', 
    element: <GalleryItemPage />, 
    pageBackground: styles.galleryPageBackground 
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

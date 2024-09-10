import { Outlet, useLocation } from 'react-router-dom';
import { Navigation } from './Navigation/Navigation';
import { Container } from '@mantine/core';
import styles from './Layout.module.css';
import { routes } from '@/Router';




export function Layout() {
    const location = useLocation();
    const isGalleryPage = location.pathname === '/gallery';

    const pageBackground = isGalleryPage 
        ? styles.galleryBackground 
        : (routes.find(item => item.path === location.pathname)?.pageBackground || styles.defaultBackground);

    return (
        <>
            <Navigation />
            <div className={pageBackground}>
          
                <Outlet />
            
            </div>
        </>
    );
  }


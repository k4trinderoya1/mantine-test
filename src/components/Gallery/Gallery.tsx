import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Gallery.module.css';

interface GalleryProps {
  items: {
    id: string;
    title: string;
    image: string;
    link: string;
    icon: string;
  }[];
}

export function Gallery({ items }: GalleryProps) {
  const location = useLocation();
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    
    setTransitionStage("fadeOut");
  }, [location.pathname]);

  return (
    <div
      className={`${styles.pageTransition} ${styles[transitionStage]}`}
      onAnimationEnd={() => {
        if (transitionStage === "fadeOut") {
          setTransitionStage("fadeIn");
        }
      }}
    >
      <div className={styles.galleryGrid}>
        {items.map(item => (
          <NavLink key={item.id} to={item.link} className={styles.galleryItem}>
            <div className={styles.galleryImage} style={{ backgroundImage: `url(${item.image})` }}>
              {item.icon && (
                <div className={styles.iconContainer}>
                  <img src={item.icon} alt={`${item.title} icon`} className={styles.icon} />
                </div>
              )}
              <div className={styles.overlay} />
              <div className={styles.galleryTitle}>{item.title}</div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Gallery;

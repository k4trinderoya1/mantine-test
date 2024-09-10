import React from 'react';
import { NavLink } from 'react-router-dom';
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
  return (
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
  );
}

export default Gallery;

import React from 'react';
import { Gallery } from '../components/Gallery/Gallery';
import styles from '../components/Gallery/Gallery.module.css';
import galleryItems from '../components/Gallery/galleryItems.json'; 

export function GalleryPage() {
  return (
    <div className={styles.galleryPage}>
      <Gallery items={galleryItems} /> {}
    </div>
  );
}

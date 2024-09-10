import React from 'react';
import styles from './GalleryItem.module.css';

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  buttons: { label: string; style: string }[];
}

interface GalleryItemContentProps {
  galleryItem: GalleryItem;
  actionButtons: { label: string; onClick: () => void }[];
}

const GalleryItemContent: React.FC<GalleryItemContentProps> = ({ galleryItem, actionButtons }) => {
  return (
    <div
      className={styles.fullscreenBackground}
      style={{ backgroundImage: `url(${galleryItem.image})`, zIndex: 2, position: 'relative' }}
    >
      <div className={styles.overlay}>
        <h1 className={styles.title}>{galleryItem.title}</h1>
        <h2 className={styles.subtitle}>{galleryItem.subtitle}</h2>
        <div className={styles.buttonContainer}>
          {actionButtons.map((button, index) => (
            <button key={index} className={styles.actionButton} onClick={button.onClick}>
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryItemContent;

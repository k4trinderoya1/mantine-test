import React, { useEffect, useState } from 'react';
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
  actionButtons: { label: string; onClick: () => void; className: string }[];
}

const GalleryItemContent: React.FC<GalleryItemContentProps> = ({ galleryItem, actionButtons }) => {
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    // Устанавливаем анимацию "fadeOut" при монтировании компонента
    setTransitionStage("fadeOut");
  }, []);

  return (
    
    <div
      className={`${styles.fullscreenBackground} ${styles[transitionStage]}`}
      style={{ backgroundImage: `url(${galleryItem.image})`, zIndex: 2, position: 'relative' }}
      onAnimationEnd={() => {
        if (transitionStage === "fadeOut") {
          setTransitionStage("fadeIn");
        }
      }}
    >
      <div className={styles.overlay}>
        <h1 className={styles.title}>{galleryItem.title}</h1>
        <h2 className={styles.subtitle}>{galleryItem.subtitle}</h2>
        <div className={styles.buttonContainer}>
          {actionButtons.map((button, index) => (
            <button key={index} className={button.className} onClick={button.onClick}>
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryItemContent;

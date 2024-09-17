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
  const [transitionStage, setTransitionStage] = useState('hidden'); // Начальное состояние - скрытые элементы
  const [loading, setLoading] = useState(true); // Состояние загрузки

  useEffect(() => {
    // Эмуляция загрузки данных при смене маршрута
    setLoading(true);
    setTransitionStage('hidden');

    const timeout = setTimeout(() => {
      setLoading(false);
      setTransitionStage('fadeIn'); // Появление контента после загрузки
    }, 1000); // Задержка в 1 секунду для демонстрации

    return () => clearTimeout(timeout); // Очистка таймера при размонтировании компонента
  }, [location.pathname]);

  return (
    <div className={styles.pageBackground}> {/* Фон всегда отображается */}
      <div className={`${styles.pageTransition} ${styles[transitionStage]}`}>
        {!loading && ( // Отображение галереи только после загрузки
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
        )}
      </div>
    </div>
  );
}

export default Gallery;

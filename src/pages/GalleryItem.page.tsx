import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styles from '../components/Gallery/GalleryItem.module.css';
import GalleryItemContent from '../components/Gallery/GalleryItem';
import { GalleryItem } from '../components/Gallery/GalleryItem';

const GalleryItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [galleryItem, setGalleryItem] = useState<GalleryItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [transitionStage, setTransitionStage] = useState('hidden'); // Начальное состояние - скрытые элементы
  const [loading, setLoading] = useState(true); // Состояние загрузки

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Устанавливаем состояние загрузки

      try {
        const featuresResponse = await fetch('http://localhost:5000/api/gallery-items', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!featuresResponse.ok) {
          throw new Error(`Ошибка сети: ${featuresResponse.statusText}`);
        }

        const featuresData: GalleryItem[] = await featuresResponse.json();
        const foundFeatureItem = featuresData.find((item) => item.id === id);

        if (foundFeatureItem) {
          setGalleryItem(foundFeatureItem);
        } else {
          const galResponse = await fetch('http://localhost:5000/api/gallery-gal', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });

          if (!galResponse.ok) {
            throw new Error(`Ошибка сети: ${galResponse.statusText}`);
          }

          const galData: GalleryItem[] = await galResponse.json();
          const foundGalItem = galData.find((item) => item.id === id);

          setGalleryItem(foundGalItem || null);
        }
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError(error.message || 'Неизвестная ошибка');
      } finally {
        setLoading(false); // Отключаем состояние загрузки после получения данных
        setTransitionStage('fadeIn'); // Плавное появление элементов
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    setTransitionStage('fadeOut'); // При изменении маршрута запускаем анимацию исчезновения
  }, [location.pathname]);

  const handleAnimationEnd = () => {
    if (transitionStage === 'fadeOut') {
      setTransitionStage('fadeIn'); // Переход к анимации появления после исчезновения
    }
  };

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  const actionButtons =
    galleryItem?.buttons.map((button: { label: string; style: string }) => ({
      label: button.label,
      onClick: () => alert(`${button.label} triggered`),
      className: styles[button.style] || styles.defaultButton,
    })) || [];

  return (
    <div className={styles.pageBackground}> {/* Фон страницы */}
      <div
        className={`${styles.pageTransition} ${styles[transitionStage]}`} 
        onAnimationEnd={handleAnimationEnd}
      >
        {!loading && ( // Отображаем контент только после загрузки
          <div className={styles.panel}>
            {galleryItem && (
              <GalleryItemContent galleryItem={galleryItem} actionButtons={actionButtons} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryItemPage;

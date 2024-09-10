import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../components/Gallery/GalleryItem.module.css';
import GalleryItemContent from '../components/Gallery/GalleryItem';
import { GalleryItem } from '../components/Gallery/GalleryItem';
import hourglassGif from '../assets/GIFhourglass.gif';

const GalleryItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [galleryItem, setGalleryItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Первый запрос к /api/gallery-items для galleryFeatures.json
        setLoading(true);
        const featuresResponse = await fetch('http://localhost:5000/api/gallery-items', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!featuresResponse.ok) {
          throw new Error(`Ошибка сети: ${featuresResponse.statusText}`);
        }

        const featuresData: GalleryItem[] = await featuresResponse.json();
        const foundFeatureItem = featuresData.find((item) => item.id === id);

        if (foundFeatureItem) {
          setGalleryItem(foundFeatureItem);
          setLoading(false);
          return; // Если элемент найден, прекращаем дальнейший поиск
        }

        // Второй запрос к /api/gallery-gal для galeryItems.json
        const galResponse = await fetch('http://localhost:5000/api/gallery-gal', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!galResponse.ok) {
          throw new Error(`Ошибка сети: ${galResponse.statusText}`);
        }

        const galData: GalleryItem[] = await galResponse.json();
        const foundGalItem = galData.find((item) => item.id === id);

        setGalleryItem(foundGalItem || null);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError(error.message || 'Неизвестная ошибка');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loadingScreen}>
        <img src={hourglassGif} alt="Loading" className={styles.spinner} />
        <p>Загрузка...</p>
      </div>
    );
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!galleryItem) {
    return <div>Элемент не найден</div>;
  }

  const actionButtons = galleryItem.buttons.map((button: { label: string; style: string }) => ({
    label: button.label,
    onClick: () => alert(`${button.label} triggered`),
    className: styles[button.style] || styles.defaultButton,
  }));

  return (
    <div className={styles.panel}>
      <GalleryItemContent galleryItem={galleryItem} actionButtons={actionButtons} />
    </div>
  );
};

export default GalleryItemPage;

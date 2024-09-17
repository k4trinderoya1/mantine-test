import { Rating } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../components/Rating/Rating.module.css';

export function RatingPage() {
  const location = useLocation();
  const [transitionStage, setTransitionStage] = useState('hidden'); // Начальное состояние - скрытые элементы
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Сначала загрузка без контента
    setLoading(true);
    setTransitionStage('hidden');

    // Эмуляция загрузки данных
    const timeout = setTimeout(() => {
      setLoading(false);
      setTransitionStage('fadeIn'); // После загрузки происходит плавное появление элементов
    }, 1000); // Задержка в 1 секунду для демонстрации

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div className={styles.pageBackground}> {/* Фон всегда отображается */}
      <div className={`${styles.pageTransition} ${styles[transitionStage]}`}>
        {!loading && (
          <>
            <h1>Rating Page</h1>
            <p>Here you can view and manage ratings.</p>
            <Rating />
          </>
        )}
      </div>
    </div>
  );
}

export default RatingPage;

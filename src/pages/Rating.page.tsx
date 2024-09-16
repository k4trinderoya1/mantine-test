import { Rating, Group, Stack } from '@mantine/core';

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../components/Rating/Rating.module.css';

export function RatingPage() {
  const location = useLocation();
  const [transitionStage, setTransitionStage] = useState('fadeIn');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    setTransitionStage('fadeOut');
  }, [location.pathname]);

  if (loading) {
    return (
      <div className={`${styles.pageTransition} ${styles[transitionStage]}`}>
        Загрузка...
      </div>
    );
  }

  return (
    <div
      className={`${styles.pageTransition} ${styles[transitionStage]}`}
      onAnimationEnd={() => {
        if (transitionStage === 'fadeOut') {
          setTransitionStage('fadeIn');
        }
      }}
    >
      
      <h1>Rating Page</h1>
      <p>Here you can view and manage ratings.</p>
      <Rating></Rating>
    </div>
  );
}

export default RatingPage;

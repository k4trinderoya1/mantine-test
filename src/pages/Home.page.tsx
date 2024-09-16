import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../components/Welcome/Welcome.module.css';

export function HomePage() {
  const location = useLocation();
  const [transitionStage, setTransitionStage] = useState('fadeIn');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false); // Эмулируем завершение загрузки
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
    
      <Welcome />
      <ColorSchemeToggle />

    </div>
  );
}

export default HomePage;

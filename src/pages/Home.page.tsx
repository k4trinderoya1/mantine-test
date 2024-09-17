import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../components/Welcome/Welcome.module.css';

export function HomePage() {
  const location = useLocation();
  const [transitionStage, setTransitionStage] = useState('hidden'); // Начальное состояние скрытые элементы
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Эмулируем загрузку данных
    setLoading(true);
    setTransitionStage('hidden');

    const timeout = setTimeout(() => {
      setLoading(false);
      setTransitionStage('fadeIn'); // После завершения загрузки плавное появление
    }, 1000); // Задержка 1 секунда для примера

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div className={styles.pageBackground}> {/* Фон отображается сразу */}
      <div className={`${styles.pageTransition} ${styles[transitionStage]}`}>
        {!loading && (
          <>
            <Welcome />
            <ColorSchemeToggle />
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;

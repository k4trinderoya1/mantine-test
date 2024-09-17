import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Button, Text } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { IconSettings, IconMessageCircle, IconPhoto, IconSearch, IconArrowsLeftRight, IconTrash } from '@tabler/icons-react';
import styles from '../components/Menu/Menu.module.css'; // Импорт стилей

export function MenuPage() {
  const location = useLocation();
  const [transitionStage, setTransitionStage] = useState('hidden'); // Начальная стадия: элементы скрыты
  const [loading, setLoading] = useState(true); // Состояние загрузки

  useEffect(() => {
    // Имитируем загрузку данных
    setLoading(true);
    setTransitionStage('hidden'); // Элементы скрыты во время загрузки

    const timeout = setTimeout(() => {
      setLoading(false); // Завершаем загрузку
      setTransitionStage('fadeIn'); // Запускаем анимацию появления элементов
    }, 1000); // Задержка в 1 секунду для имитации загрузки

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div className={styles.pageBackground}> {/* Фон отображается сразу */}
      <div className={`${styles.pageTransition} ${styles[transitionStage]}`} onAnimationEnd={() => {
        if (transitionStage === 'fadeOut') {
          setTransitionStage('fadeIn'); // Когда закончится анимация исчезновения, запускаем анимацию появления
        }
      }}>
        {!loading && ( // Показ меню только после завершения загрузки
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button className={styles.button}>Toggle menu</Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Application</Menu.Label>
              <Menu.Item leftSection={<IconSettings style={{ width: 14, height: 14 }} />}>
                Settings
              </Menu.Item>
              <Menu.Item leftSection={<IconMessageCircle style={{ width: 14, height: 14 }} />}>
                Messages
              </Menu.Item>
              <NavLink to="/menu/gallery" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Menu.Item leftSection={<IconPhoto />}>
                  Gallery
                </Menu.Item>
              </NavLink>
              <Menu.Item leftSection={<IconSearch style={{ width: 14, height: 14 }} />} rightSection={<Text size="xs" c="dimmed">⌘K</Text>}>
                Search
              </Menu.Item>

              <Menu.Divider />

              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item leftSection={<IconArrowsLeftRight style={{ width: 14, height: 14 }} />}>
                Transfer my data
              </Menu.Item>
              <Menu.Item color="red" leftSection={<IconTrash style={{ width: 14, height: 14 }} />}>
                Delete my account
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </div>
    </div>
  );
}

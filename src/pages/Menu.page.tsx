import { MenuDropdown } from '@/components/Menu/MenuDropdown';
import { Menu, Button, Text, rem } from '@mantine/core';
import { IconArrowsLeftRight, IconMessageCircle, IconPhoto, IconSearch, IconSettings, IconTrash } from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';
import classes from '../components/Menu/Menu.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import styles from '../components/Menu/Menu.module.css';

export function MenuPage() {
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
        <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button className={classes.button}>Toggle menu</Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
            Settings
          </Menu.Item>
          <Menu.Item leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}>
            Messages
          </Menu.Item>
          <NavLink to="/menu/gallery" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Menu.Item leftSection={<IconPhoto />}>
              Gallery
            </Menu.Item>
          </NavLink>
          <Menu.Item
            leftSection={<IconSearch style={{ width: rem(14), height: rem(14) }} />}
            rightSection={
              <Text size="xs" c="dimmed">
                ⌘K
              </Text>
            }
          >
            Search
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item
            leftSection={<IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />}
          >
            Transfer my data
          </Menu.Item>
          <Menu.Item
            color="red"
            leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
          >
            Delete my account
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
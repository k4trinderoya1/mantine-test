import React from 'react';
import { Text } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import styles from './Menu.module.css'; 

type MenuItemProps = {
  leftSection: React.ReactNode;
  rightSection?: React.ReactNode;
  children: React.ReactNode;
  color?: string;
  to?: string; 
};

export function MenuItem({ leftSection, rightSection, children, color = 'black', to }: MenuItemProps) {
  const content = (
    <>
      {leftSection}
      <Text className={styles.text}>{children}</Text>
      {rightSection && <Text className={styles.rightSection}>{rightSection}</Text>}
    </>
  );

  return to ? (
    <NavLink to={to} className={styles.link} style={{ color }}>
      <div className={styles.container}>{content}</div>
    </NavLink>
  ) : (
    <div className={styles.container} style={{ color }}>
      {content}
    </div>
  );
}

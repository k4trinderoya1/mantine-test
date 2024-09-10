import React from 'react';
import { Text } from '@mantine/core';
import styles from './Menu.module.css'; 

type MenuLabelProps = {
  children: React.ReactNode;
};

export function MenuLabel({ children }: MenuLabelProps) {
  return (
    <Text className={styles.label}>
      {children}
    </Text>
  );
}

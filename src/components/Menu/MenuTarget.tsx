import React from 'react';
import { Button } from '@mantine/core';
import styles from './Menu.module.css';

type MenuTargetProps = {
  children: React.ReactNode;
};

export function MenuTarget({ children }: MenuTargetProps) {
  return (
    <Button className={styles.button}>
      {children}
    </Button>
  );
}

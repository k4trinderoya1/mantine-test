import React from 'react';
import styles from './Menu.module.css'; 

type MenuDividerProps = {};

export function MenuDivider(props: MenuDividerProps) {
  return <hr className={styles.divider} />;
}

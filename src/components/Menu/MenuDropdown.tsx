import React from 'react';
import styles from './Menu.module.css';

type MenuDropdownProps = {
  children: React.ReactNode;
};

export function MenuDropdown({ children }: MenuDropdownProps) {
  return (
    <div className={styles.dropdown}>
      {children}
    </div>
  );
}

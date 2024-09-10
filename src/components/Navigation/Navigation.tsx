import { Group } from '@mantine/core';
import { NavLink } from "react-router-dom";
import styles from './Navigation.module.css'; 

export function Navigation() {
  return (
    <div className={styles.navContainer}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? styles.active : styles.navLink)}
      >
        Home
      </NavLink>
      <NavLink
        to="/menu"
        className={({ isActive }) => (isActive ? styles.active : styles.navLink)}
      >
        Menu
      </NavLink>
      <NavLink
        to="/rating"
        className={({ isActive }) => (isActive ? styles.active : styles.navLink)}
      >
        Rating
      </NavLink>
      <NavLink
        to="/gallery"
        className={({ isActive }) => (isActive ? styles.active : styles.navLink)}
      >
        Gallery
      </NavLink>
      
      
    </div>
  );
}

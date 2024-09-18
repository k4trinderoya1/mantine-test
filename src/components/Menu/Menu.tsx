import React from 'react';
import ReactDOM from 'react-dom';
import { MenuTarget } from './MenuTarget';
import { MenuLabel } from './MenuLabel';
import { MenuItem } from './MenuItem';
import { MenuDropdown } from './MenuDropdown';
import { MenuDivider } from './MenuDivider';
import { IconSettings, IconSearch, IconPhoto, IconMessageCircle, IconTrash, IconArrowsLeftRight } from '@tabler/icons-react';
import { rem, Text } from '@mantine/core';
import './Menu.module.css'
import { NavLink } from 'react-router-dom';
import styles from './Menu.module.css';

function Menu() {
<div className={styles.formGroup}>
  <input type="text" className={styles.input} placeholder=" " />
  <label className={styles.label}>Search</label>
</div>
}


export default Menu;

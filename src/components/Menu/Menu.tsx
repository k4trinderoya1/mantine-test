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

function Menu() {
  return (
    <MenuDropdown>
      <MenuTarget>Button</MenuTarget>
      <MenuLabel>Application</MenuLabel>
      <MenuItem leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
        Settings
      </MenuItem>
      <MenuItem leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}>
        Messages
      </MenuItem>
      <MenuItem 
        leftSection={<IconPhoto style={{ width: 14, height: 14 }} />} 
        to="/menu/gallery" // Указываем путь для перехода на страницу галереи
      >
        Gallery
      </MenuItem>
      <MenuItem
        leftSection={<IconSearch style={{ width: rem(14), height: rem(14) }} />}
        rightSection={
          <Text size="xs" c="dimmed">
            ⌘K
          </Text>
        }
      >
        Search
      </MenuItem>
      <MenuDivider />
      <MenuLabel>Danger zone</MenuLabel>
      <MenuItem leftSection={<IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />}>
        Transfer my data
      </MenuItem>
      <MenuItem
        color="red"
        leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
      >
        Delete my account
      </MenuItem>
    </MenuDropdown>
  );
}


export default Menu;

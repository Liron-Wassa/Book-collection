import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';
import React from "react";

const NavBar = () => (
  <nav className={styles.NavBar}>
    <ul>
      <div className={styles.Links}>
        <li><NavLink to="/search" activeClassName={styles.Active}>Search Books</NavLink></li>
        <li><NavLink to="/collections" activeClassName={styles.Active}>Collections</NavLink></li>
      </div>
    </ul>
  </nav>
);

export default NavBar;
'use client';

import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import Image from 'next/image';

type SidebarProps = {
  activePage: string;
  activeWorkshop?: number;
  onPageChange: (page: string, workshop?: number) => void;
};

export default function Sidebar({ activePage, activeWorkshop, onPageChange }: SidebarProps) {
  const [showWorkshops, setShowWorkshops] = useState(activePage === 'machines');

  const handleNavClick = (page: string) => {
    if (page === 'machines') {
      setShowWorkshops(!showWorkshops);
    } else {
      setShowWorkshops(false);
      onPageChange(page);
    }
  };

  const handleWorkshopClick = (workshop: number) => {
    onPageChange('machines', workshop);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo} aria-label="Логотип">M</div>
      
      <nav aria-label="Главная навигация">
        <ul className={styles.nav}>
          <li>
            <button 
              className={`${styles.navItem} ${activePage === 'dashboard' ? styles.active : ''}`}
              onClick={() => handleNavClick('dashboard')}
            >
              <Image src="/Home/Icon/Vector.svg" alt="Главная" width={24} height={24} />
              <span>Главная</span>
            </button>
          </li>
          <li>
            <button 
              className={`${styles.navItem} ${activePage === 'machines' ? styles.active : ''}`}
              onClick={() => handleNavClick('machines')}
            >
              <Image src="/Home/Icon/stan.svg" alt="Станки" width={24} height={24} />
              <span>Станки</span>
            </button>
            
            {showWorkshops && (
              <ul className={styles.subMenu}>
                <li>
                  <button 
                    className={`${styles.subMenuItem} ${activeWorkshop === 1 ? styles.activeSubmenu : ''}`}
                    onClick={() => handleWorkshopClick(1)}
                  >
                    <span>Цех 1</span>
                  </button>
                </li>
                <li>
                  <button 
                    className={`${styles.subMenuItem} ${activeWorkshop === 2 ? styles.activeSubmenu : ''}`}
                    onClick={() => handleWorkshopClick(2)}
                  >
                    <span>Цех 2</span>
                  </button>
                </li>
                <li>
                  <button 
                    className={`${styles.subMenuItem} ${activeWorkshop === 3 ? styles.activeSubmenu : ''}`}
                    onClick={() => handleWorkshopClick(3)}
                  >
                    <span>Цех 3</span>
                  </button>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button 
              className={`${styles.navItem} ${activePage === 'maintenance' ? styles.active : ''}`}
              onClick={() => handleNavClick('maintenance')}
            >
              <Image src="/Home/Icon/buy.svg" alt="Ремонт и ТО" width={24} height={24} />
              <span>Ремонт и ТО</span>
            </button>
          </li>
          <li>
            <button 
              className={`${styles.navItem} ${activePage === 'reports' ? styles.active : ''}`}
              onClick={() => handleNavClick('reports')}
            >
              <Image src="/Home/Icon/Отчеты.svg" alt="Отчеты" width={24} height={24} />
              <span>Отчеты</span> 
            </button>
          </li>
        </ul>
      </nav>
      
      <div className={styles.user} aria-label="Текущий пользователь">
        <Image src="/avatar.jpg" alt="Фото пользователя" width={40} height={40} />
        <div>
          <p className={styles.userName}>Anita Cruz</p>
          <p className={styles.userEmail}>anita@commerce.com</p>
        </div>
      </div>
    </aside>
  );
} 
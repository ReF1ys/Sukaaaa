'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import Sidebar from '@/components/sidebar/Sidebar';
import Image from 'next/image';

// Типы для состояний компонента
type TabType = 'workshop' | 'machine';

// Моковые данные для примера
const workshopData = {
  totalParts: 12500,
  defectRate: 2.4,
  downtimeHours: 48,
  machines: [
    { id: 1, name: 'Станок CNC-1001', produced: 3200, defects: 52, oee: 87 },
    { id: 2, name: 'Станок CNC-1002', produced: 2800, defects: 35, oee: 92 },
    { id: 3, name: 'Станок CNC-1003', produced: 2450, defects: 48, oee: 78 },
    { id: 4, name: 'Станок CNC-1004', produced: 1950, defects: 29, oee: 84 },
    { id: 5, name: 'Станок CNC-1005', produced: 2100, defects: 41, oee: 81 },
  ]
};

const machinesOptions = [
  { id: 1, name: 'Станок CNC-1001' },
  { id: 2, name: 'Станок CNC-1002' },
  { id: 3, name: 'Станок CNC-1003' },
  { id: 4, name: 'Станок CNC-1004' },
  { id: 5, name: 'Станок CNC-1005' },
];

const machineData = {
  1: { totalParts: 3200, defectRate: 1.6, downtimeHours: 12, utilization: 87 },
  2: { totalParts: 2800, defectRate: 1.2, downtimeHours: 8, utilization: 92 },
  3: { totalParts: 2450, defectRate: 1.9, downtimeHours: 22, utilization: 78 },
  4: { totalParts: 1950, defectRate: 1.5, downtimeHours: 16, utilization: 84 },
  5: { totalParts: 2100, defectRate: 1.9, downtimeHours: 19, utilization: 81 },
};

export default function Reports() {
  const [activeTab, setActiveTab] = useState<TabType>('workshop');
  const [selectedMachine, setSelectedMachine] = useState<number>(1);
  const [activePage, setActivePage] = useState('reports');

  // Переключение табов
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  // Выбор станка
  const handleMachineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMachine(Number(e.target.value));
  };

  // Обработка навигации
  const handleNavigation = (page: string) => {
    setActivePage(page);
  };

  // Рендер контента "По цеху"
  const renderWorkshopContent = () => {
    return (
      <div className={styles.tabContent}>
        <div className={styles.statsGrid}>
          <div className={styles.statBox}>
            <div className={styles.statHeader}>
              <Image src="/images/parts.svg" alt="Детали" width={24} height={24} />
              <h3 className={styles.statTitle}>Всего деталей</h3>
            </div>
            <p className={styles.statValue}>{workshopData.totalParts.toLocaleString()}</p>
          </div>
          
          <div className={styles.statBox}>
            <div className={styles.statHeader}>
              <Image src="/images/defect.svg" alt="Брак" width={24} height={24} />
              <h3 className={styles.statTitle}>Процент брака</h3>
            </div>
            <p className={styles.statValue}>{workshopData.defectRate}%</p>
          </div>
          
          <div className={styles.statBox}>
            <div className={styles.statHeader}>
              <Image src="/images/time.svg" alt="Время" width={24} height={24} />
              <h3 className={styles.statTitle}>Время простоя</h3>
            </div>
            <p className={styles.statValue}>{workshopData.downtimeHours} ч</p>
          </div>
        </div>

        <div className={styles.chartSection}>
          <h3 className={styles.sectionTitle}>Динамика производства</h3>
          <div className={styles.chartPlaceholder}>
            График будет здесь
          </div>
        </div>

        <div className={styles.tableSection}>
          <h3 className={styles.sectionTitle}>Производительность по станкам</h3>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Станок</th>
                  <th>Выпущено</th>
                  <th>Брак</th>
                  <th>OEE</th>
                </tr>
              </thead>
              <tbody>
                {workshopData.machines.map(machine => (
                  <tr key={machine.id}>
                    <td>{machine.name}</td>
                    <td>{machine.produced.toLocaleString()}</td>
                    <td>{machine.defects}</td>
                    <td>{machine.oee}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Рендер контента "По станку"
  const renderMachineContent = () => {
    const machine = machineData[selectedMachine as keyof typeof machineData];
    
    return (
      <div className={styles.tabContent}>
        <div className={styles.selectWrapper}>
          <label htmlFor="machineSelect">Выберите станок:</label>
          <select 
            id="machineSelect" 
            className={styles.select}
            value={selectedMachine}
            onChange={handleMachineChange}
          >
            {machinesOptions.map(machine => (
              <option key={machine.id} value={machine.id}>
                {machine.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statBox}>
            <div className={styles.statHeader}>
              <Image src="/images/parts.svg" alt="Детали" width={24} height={24} />
              <h3 className={styles.statTitle}>Всего деталей</h3>
            </div>
            <p className={styles.statValue}>{machine.totalParts.toLocaleString()}</p>
          </div>
          
          <div className={styles.statBox}>
            <div className={styles.statHeader}>
              <Image src="/images/defect.svg" alt="Брак" width={24} height={24} />
              <h3 className={styles.statTitle}>Процент брака</h3>
            </div>
            <p className={styles.statValue}>{machine.defectRate}%</p>
          </div>
          
          <div className={styles.statBox}>
            <div className={styles.statHeader}>
              <Image src="/images/time.svg" alt="Время" width={24} height={24} />
              <h3 className={styles.statTitle}>Время простоя</h3>
            </div>
            <p className={styles.statValue}>{machine.downtimeHours} ч</p>
          </div>
        </div>

        <div className={styles.chartSection}>
          <h3 className={styles.sectionTitle}>Загрузка и простои</h3>
          <div className={styles.chartPlaceholder}>
            График загрузки станка будет здесь
          </div>
        </div>

        <div className={styles.utilizationSection}>
          <h3 className={styles.sectionTitle}>Эффективность использования (OEE)</h3>
          <div className={styles.utilizationWrapper}>
            <div className={styles.utilizationBar}>
              <div 
                className={styles.utilizationFill} 
                style={{ width: `${machine.utilization}%` }}
              />
            </div>
            <span className={styles.utilizationValue}>{machine.utilization}%</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Sidebar 
        activePage={activePage}
        onPageChange={handleNavigation}
      />
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>Отчёты</h1>
          <div className={styles.search}>
            <input type="text" placeholder="Поиск..." />
          </div>
        </header>

        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'workshop' ? styles.activeTab : ''}`}
            onClick={() => handleTabChange('workshop')}
          >
            По цеху
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'machine' ? styles.activeTab : ''}`}
            onClick={() => handleTabChange('machine')}
          >
            По станку
          </button>
        </div>

        <div className={styles.content}>
          {activeTab === 'workshop' ? renderWorkshopContent() : renderMachineContent()}
        </div>
      </main>
    </div>
  );
} 
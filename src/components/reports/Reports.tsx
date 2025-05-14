import React, { useState } from 'react';
import styles from './Reports.module.css';
import Image from 'next/image';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);

// Типы для состояний компонента
type TabType = 'workshop' | 'machine';
type PeriodType = 'week' | 'month' | 'year';

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
  ],
  productionData: {
    week: {
      labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      datasets: [
        {
          label: 'План',
          data: [120, 130, 125, 140, 150, 80, 70],
          borderColor: '#4caf50',
          backgroundColor: 'transparent',
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
        },
        {
          label: 'Факт',
          data: [110, 120, 115, 130, 140, 75, 60],
          borderColor: '#6a33f8',
          backgroundColor: 'transparent',
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
        }
      ]
    },
    month: {
      labels: ['1', '5', '10', '15', '20', '25', '30'],
      datasets: [
        {
          label: 'План',
          data: [400, 420, 450, 470, 500, 520, 550],
          borderColor: '#4caf50',
          backgroundColor: 'transparent',
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
        },
        {
          label: 'Факт',
          data: [380, 400, 420, 450, 480, 500, 530],
          borderColor: '#6a33f8',
          backgroundColor: 'transparent',
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
        }
      ]
    },
    year: {
      labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      datasets: [
        {
          label: 'План',
          data: [1200, 1300, 1400, 1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 2000],
          borderColor: '#4caf50',
          backgroundColor: 'transparent',
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
        },
        {
          label: 'Факт',
          data: [1150, 1250, 1350, 1450, 1550, 1650, 1700, 1750, 1800, 1850, 1900, 1950],
          borderColor: '#6a33f8',
          backgroundColor: 'transparent',
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
        }
      ]
    }
  }
};

const machinesOptions = [
  { id: 1, name: 'Станок CNC-1001' },
  { id: 2, name: 'Станок CNC-1002' },
  { id: 3, name: 'Станок CNC-1003' },
  { id: 4, name: 'Станок CNC-1004' },
  { id: 5, name: 'Станок CNC-1005' },
];

const machineData = {
  1: { 
    totalParts: 3200, 
    defectRate: 1.6, 
    downtimeHours: 12, 
    utilization: 87,
    workload: {
      week: {
        labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        datasets: [
          {
            label: 'Загрузка (%)',
            data: [85, 82, 88, 90, 86, 75, 70],
            borderColor: '#6a33f8',
            backgroundColor: 'transparent',
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3,
          },
          {
            label: 'Простой (%)',
            data: [15, 18, 12, 10, 14, 25, 30],
            borderColor: '#ff4d6d',
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3,
          }
        ]
      },
      month: {
        labels: ['1', '5', '10', '15', '20', '25', '30'],
        datasets: [
          {
            label: 'Загрузка (%)',
            data: [80, 85, 82, 88, 90, 92, 87],
            borderColor: '#6a33f8',
            backgroundColor: 'transparent',
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3,
          },
          {
            label: 'Простой (%)',
            data: [20, 15, 18, 12, 10, 8, 13],
            borderColor: '#ff4d6d',
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3,
          }
        ]
      }
    }
  },
  2: { 
    totalParts: 2800, 
    defectRate: 1.2, 
    downtimeHours: 8, 
    utilization: 92,
    workload: {
      week: {
        labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        datasets: [
          {
            label: 'Загрузка (%)',
            data: [90, 92, 94, 91, 93, 80, 75],
            borderColor: '#6a33f8',
            backgroundColor: 'transparent',
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3,
          },
          {
            label: 'Простой (%)',
            data: [10, 8, 6, 9, 7, 20, 25],
            borderColor: '#ff4d6d',
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3,
          }
        ]
      },
      month: {
        labels: ['1', '5', '10', '15', '20', '25', '30'],
        datasets: [
          {
            label: 'Загрузка (%)',
            data: [90, 92, 94, 91, 93, 95, 92],
            borderColor: '#6a33f8',
            backgroundColor: 'transparent',
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3,
          },
          {
            label: 'Простой (%)',
            data: [10, 8, 6, 9, 7, 5, 8],
            borderColor: '#ff4d6d',
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3,
          }
        ]
      }
    }
  },
  3: { 
    totalParts: 2450, 
    defectRate: 1.9, 
    downtimeHours: 22, 
    utilization: 78,
    workload: {
      week: {
        labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        datasets: [
          {
            label: 'Загрузка (%)',
            data: [75, 78, 80, 76, 78, 70, 68],
            borderColor: '#6a33f8',
            backgroundColor: 'transparent',
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3,
          },
          {
            label: 'Простой (%)',
            data: [25, 22, 20, 24, 22, 30, 32],
            borderColor: '#ff4d6d',
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3,
          }
        ]
      },
      month: {
        labels: ['1', '5', '10', '15', '20', '25', '30'],
        datasets: [
          {
            label: 'Загрузка (%)',
            data: [75, 78, 80, 76, 78, 80, 78],
            borderColor: '#6a33f8',
            backgroundColor: 'transparent',
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3,
          },
          {
            label: 'Простой (%)',
            data: [25, 22, 20, 24, 22, 20, 22],
            borderColor: '#ff4d6d',
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3,
          }
        ]
      }
    }
  },
  4: { 
    totalParts: 1950, 
    defectRate: 1.5, 
    downtimeHours: 16, 
    utilization: 84,
    workload: {
      week: {
        labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        datasets: [
          {
            label: 'Загрузка (%)',
            data: [82, 84, 86, 85, 83, 75, 72],
            borderColor: '#6a33f8',
            backgroundColor: 'transparent',
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3,
          },
          {
            label: 'Простой (%)',
            data: [18, 16, 14, 15, 17, 25, 28],
            borderColor: '#ff4d6d',
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3,
          }
        ]
      },
      month: {
        labels: ['1', '5', '10', '15', '20', '25', '30'],
        datasets: [
          {
            label: 'Загрузка (%)',
            data: [82, 84, 86, 85, 83, 86, 84],
            borderColor: '#6a33f8',
            backgroundColor: 'transparent',
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3,
          },
          {
            label: 'Простой (%)',
            data: [18, 16, 14, 15, 17, 14, 16],
            borderColor: '#ff4d6d',
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3,
          }
        ]
      }
    }
  },
  5: { 
    totalParts: 2100, 
    defectRate: 1.9, 
    downtimeHours: 19, 
    utilization: 81,
    workload: {
      week: {
        labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        datasets: [
          {
            label: 'Загрузка (%)',
            data: [80, 82, 83, 81, 80, 75, 70],
            borderColor: '#6a33f8',
            backgroundColor: 'transparent',
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3,
          },
          {
            label: 'Простой (%)',
            data: [20, 18, 17, 19, 20, 25, 30],
            borderColor: '#ff4d6d',
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3,
          }
        ]
      },
      month: {
        labels: ['1', '5', '10', '15', '20', '25', '30'],
        datasets: [
          {
            label: 'Загрузка (%)',
            data: [80, 82, 83, 81, 84, 82, 81],
            borderColor: '#6a33f8',
            backgroundColor: 'transparent',
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3,
          },
          {
            label: 'Простой (%)',
            data: [20, 18, 17, 19, 16, 18, 19],
            borderColor: '#ff4d6d',
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3,
          }
        ]
      }
    }
  },
};

export default function Reports() {
  const [activeTab, setActiveTab] = useState<TabType>('workshop');
  const [selectedMachine, setSelectedMachine] = useState<number>(1);
  const [activePeriod, setActivePeriod] = useState<PeriodType>('week');

  // Переключение табов
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  // Выбор периода
  const handlePeriodChange = (period: PeriodType) => {
    setActivePeriod(period);
  };

  // Выбор станка
  const handleMachineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMachine(Number(e.target.value));
  };

  // Опции для графиков
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          boxWidth: 10,
          font: {
            size: 12,
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#666',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10,
        boxWidth: 10,
        boxHeight: 10,
        usePointStyle: true,
      }
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: '#3a3541' }
      },
      y: {
        grid: { 
          color: '#f0f0f0',
          drawBorder: false
        },
        border: { display: false },
        ticks: { color: '#3a3541' },
        min: 0,
      }
    },
    elements: {
      line: {
        tension: 0.4
      }
    }
  };

  // Рендер контента "По цеху"
  const renderWorkshopContent = () => {
    const productionChartData = workshopData.productionData[activePeriod];

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
          <div className={styles.chartHeader}>
            <h3 className={styles.sectionTitle}>Динамика производства</h3>
            <div className={styles.periodControls}>
              <button 
                className={`${styles.periodButton} ${activePeriod === 'week' ? styles.activePeriod : ''}`}
                onClick={() => handlePeriodChange('week')}
              >
                Неделя
              </button>
              <button 
                className={`${styles.periodButton} ${activePeriod === 'month' ? styles.activePeriod : ''}`}
                onClick={() => handlePeriodChange('month')}
              >
                Месяц
              </button>
              <button 
                className={`${styles.periodButton} ${activePeriod === 'year' ? styles.activePeriod : ''}`}
                onClick={() => handlePeriodChange('year')}
              >
                Год
              </button>
            </div>
          </div>
          <div className={styles.chartContainer}>
            <Line data={productionChartData} options={chartOptions} />
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
    const workloadData = machine.workload[activePeriod === 'year' ? 'month' : activePeriod];
    
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
          <div className={styles.chartHeader}>
            <h3 className={styles.sectionTitle}>Загрузка и простои</h3>
            <div className={styles.periodControls}>
              <button 
                className={`${styles.periodButton} ${activePeriod === 'week' ? styles.activePeriod : ''}`}
                onClick={() => handlePeriodChange('week')}
              >
                Неделя
              </button>
              <button 
                className={`${styles.periodButton} ${activePeriod === 'month' ? styles.activePeriod : ''}`}
                onClick={() => handlePeriodChange('month')}
              >
                Месяц
              </button>
            </div>
          </div>
          <div className={styles.chartContainer}>
            <Line data={workloadData} options={chartOptions} />
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
    <div className={styles.reportsWrapper}>
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
    </div>
  );
} 
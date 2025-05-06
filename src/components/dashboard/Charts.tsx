"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Tooltip } from 'recharts';
import styles from '../../app/(private)/dashboard/page.module.css';

interface ChartData {
  name: string;
  value: number;
  [key: string]: unknown;
}

interface ChartProps {
  data: ChartData[];
  title: string;
  color?: string;
}

export function LineChartComponent({ data, title, color = "#8884d8" }: ChartProps) {
  return (
    <div className={styles.graphContainer}>
      <div className={styles.graphHeader}>
        <div className={styles.graphTitle}>{title}</div>
        <div className={styles.graphControls}>
          <select className={styles.periodSelect}>
            <option>Месяц</option>
            <option>Квартал</option>
            <option>Год</option>
          </select>
        </div>
      </div>
      <div className={styles.chartArea}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke={color} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function BarChartComponent({ data, color = "#8884d8" }: Omit<ChartProps, 'title'>) {
  return (
    <div className={styles.dataGraph}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
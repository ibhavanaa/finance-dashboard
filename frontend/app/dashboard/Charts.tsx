'use client';

import React from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import type { Transaction } from './page';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  TimeScale,
  Tooltip,
  Legend
);

type Props = {
  transactions: Transaction[];
};

export default function Charts({ transactions }: Props) {
  const paid = transactions.filter((tx) => tx.status === 'Paid').length;
  const pending = transactions.filter((tx) => tx.status === 'Pending').length;

  const revenue = transactions.filter((tx) => tx.category === 'Revenue');
  const expense = transactions.filter((tx) => tx.category === 'Expense');

  const dailyMap: Record<string, number> = {};
  transactions.forEach((tx) => {
    const date = new Date(tx.date).toLocaleDateString();
    dailyMap[date] = (dailyMap[date] || 0) + tx.amount;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-4 shadow rounded hover:shadow-lg transition-all duration-300">
        <h3 className="text-lg font-semibold mb-2 text-indigo-700">📊 Paid vs Pending</h3>
        <Doughnut
          data={{
            labels: ['Paid', 'Pending'],
            datasets: [
              {
                data: [paid, pending],
                backgroundColor: ['#34d399', '#fbbf24'],
              },
            ],
          }}
        />
      </div>

      <div className="bg-white p-4 shadow rounded hover:shadow-lg transition-all duration-300">
        <h3 className="text-lg font-semibold mb-2 text-indigo-700">📈 Revenue vs Expense</h3>
        <Bar
          data={{
            labels: ['Revenue', 'Expense'],
            datasets: [
              {
                label: 'Amount ₹',
                data: [
                  revenue.reduce((a, b) => a + b.amount, 0),
                  expense.reduce((a, b) => a + b.amount, 0),
                ],
                backgroundColor: ['#6366f1', '#ef4444'],
              },
            ],
          }}
        />
      </div>

      <div className="bg-white p-4 shadow rounded hover:shadow-lg transition-all duration-300">
        <h3 className="text-lg font-semibold mb-2 text-indigo-700">📅 Daily Totals</h3>
        <Line
          data={{
            labels: Object.keys(dailyMap),
            datasets: [
              {
                label: 'Daily Total ₹',
                data: Object.values(dailyMap),
                fill: false,
                borderColor: '#3b82f6',
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

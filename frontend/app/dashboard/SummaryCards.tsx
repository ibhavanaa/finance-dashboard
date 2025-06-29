'use client';

import React from 'react';
import { FaMoneyBillWave, FaShoppingCart, FaClipboardList, FaCheckCircle, FaClock } from 'react-icons/fa';
import type { Transaction } from './page';

type Props = {
  transactions: Transaction[];
};

export default function SummaryCards({ transactions }: Props) {
  const revenue = transactions.filter((tx) => tx.category === 'Revenue');
  const expense = transactions.filter((tx) => tx.category === 'Expense');
  const paid = transactions.filter((tx) => tx.status === 'Paid');
  const pending = transactions.filter((tx) => tx.status === 'Pending');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
      <div className="bg-green-100 p-4 rounded shadow flex items-center gap-4 hover:shadow-md transition-all duration-300">
        <FaMoneyBillWave className="text-green-700 text-2xl" />
        <div>
          <h4 className="text-sm font-semibold">Total Revenue</h4>
          <p className="text-lg font-bold">₹{revenue.reduce((sum, tx) => sum + tx.amount, 0)}</p>
        </div>
      </div>

      <div className="bg-red-100 p-4 rounded shadow flex items-center gap-4 hover:shadow-md transition-all duration-300">
        <FaShoppingCart className="text-red-600 text-2xl" />
        <div>
          <h4 className="text-sm font-semibold">Total Expense</h4>
          <p className="text-lg font-bold">₹{expense.reduce((sum, tx) => sum + tx.amount, 0)}</p>
        </div>
      </div>

      <div className="bg-blue-100 p-4 rounded shadow flex items-center gap-4 hover:shadow-md transition-all duration-300">
        <FaClipboardList className="text-blue-600 text-2xl" />
        <div>
          <h4 className="text-sm font-semibold">Total Transactions</h4>
          <p className="text-lg font-bold">{transactions.length}</p>
        </div>
      </div>

      <div className="bg-emerald-100 p-4 rounded shadow flex items-center gap-4 hover:shadow-md transition-all duration-300">
        <FaCheckCircle className="text-emerald-700 text-2xl" />
        <div>
          <h4 className="text-sm font-semibold">Paid</h4>
          <p className="text-lg font-bold">{paid.length}</p>
        </div>
      </div>

      <div className="bg-yellow-100 p-4 rounded shadow flex items-center gap-4 hover:shadow-md transition-all duration-300">
        <FaClock className="text-yellow-600 text-2xl" />
        <div>
          <h4 className="text-sm font-semibold">Pending</h4>
          <p className="text-lg font-bold">{pending.length}</p>
        </div>
      </div>
    </div>
  );
}

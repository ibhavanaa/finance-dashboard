"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Charts from './Charts';
import SummaryCards from './SummaryCards';
import ExportModal from './ExportModal';

export type Transaction = {
  id: string;
  date: string;
  amount: number;
  category: string;
  status: string;
  user_id: string;
  user_profile: string;
};

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [userOptions, setUserOptions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showExportModal, setShowExportModal] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const router = useRouter();

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('token');
      const params: any = {
        ...(statusFilter && { status: statusFilter }),
        ...(userFilter && { user_id: userFilter }),
        ...(categoryFilter && { category: categoryFilter }),
        ...(minAmount && { minAmount }),
        ...(maxAmount && { maxAmount }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        limit: 1000,
      };

      const res = await axios.get<{ data: Transaction[] }>('http://localhost:5000/api/transactions', {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      setTransactions(res.data.data);

      const allUsersRes = await axios.get<{ data: Transaction[] }>('http://localhost:5000/api/transactions', {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 1000 },
      });
      const uniqueUsers = Array.from(new Set(allUsersRes.data.data.map(tx => tx.user_id)));
      setUserOptions(uniqueUsers);
    } catch (error: any) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        router.push('/login');
      } else {
        toast.error('Failed to fetch transactions');
      }
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [statusFilter, userFilter, categoryFilter, minAmount, maxAmount, startDate, endDate]);

  const filteredTransactions = transactions.filter((tx) => {
    const term = searchTerm.toLowerCase();
    return (
      tx.id.toLowerCase().includes(term) ||
      tx.user_id.toLowerCase().includes(term) ||
      tx.status.toLowerCase().includes(term) ||
      tx.category.toLowerCase().includes(term)
    );
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (!sortBy) return 0;
    const valA = a[sortBy as keyof Transaction];
    const valB = b[sortBy as keyof Transaction];
    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    }
    if (typeof valA === 'string' && typeof valB === 'string') {
      return sortOrder === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }
    return 0;
  });

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-extrabold text-indigo-800 drop-shadow-md">📊 Admin Finance Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded shadow cursor-pointer"
        >
          🚪 Logout
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="p-2 border rounded-md shadow">
          <option value="">All Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>

        <select value={userFilter} onChange={(e) => setUserFilter(e.target.value)} className="p-2 border rounded-md shadow">
          <option value="">All Users</option>
          {userOptions.map((user) => (
            <option key={user} value={user}>{user}</option>
          ))}
        </select>

        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="p-2 border rounded-md shadow">
          <option value="">All Categories</option>
          <option value="Revenue">Revenue</option>
          <option value="Expense">Expense</option>
        </select>

        <input type="number" placeholder="Min ₹" value={minAmount} onChange={(e) => setMinAmount(e.target.value)} className="p-2 border rounded-md shadow" />

        <input type="number" placeholder="Max ₹" value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} className="p-2 border rounded-md shadow" />

        <input type="text" placeholder="🔍 Search keyword..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="p-2 border rounded-md shadow" />

        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="p-2 border rounded-md shadow" />

        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="p-2 border rounded-md shadow" />
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowExportModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow font-semibold cursor-pointer"
        >
          ⬇ Export CSV
        </button>
      </div>

      {showExportModal && (
        <ExportModal
          filters={{ status: statusFilter, user_id: userFilter, category: categoryFilter, minAmount, maxAmount, startDate, endDate }}
          onClose={() => setShowExportModal(false)}
        />
      )}

      <div className="overflow-auto max-h-[70vh] bg-white shadow-xl rounded-lg mb-10">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
            <tr>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('id')}>ID {sortBy === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('date')}>Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('amount')}>Amount {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('category')}>Category {sortBy === 'category' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('status')}>Status {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('user_id')}>User {sortBy === 'user_id' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th className="px-4 py-3">Profile</th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((tx, idx) => (
              <tr key={idx} className="text-center border-b hover:bg-gray-50">
                <td className="px-4 py-2">{tx.id}</td>
                <td className="px-4 py-2">{new Date(tx.date).toLocaleDateString()}</td>
                <td className="px-4 py-2 font-semibold">₹{tx.amount}</td>
                <td className="px-4 py-2">{tx.category}</td>
                <td className={`px-4 py-2 font-medium ${tx.status === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>{tx.status}</td>
                <td className="px-4 py-2">{tx.user_id}</td>
                <td className="px-4 py-2">
                  <img src={tx.user_profile} alt="profile" className="w-8 h-8 rounded-full mx-auto border border-gray-300" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {sortedTransactions.length === 0 && (
          <p className="text-center text-gray-500 p-4">No records match your filters.</p>
        )}
      </div>

      <SummaryCards transactions={sortedTransactions} />
      <Charts transactions={sortedTransactions} />
    </div>
  );
}

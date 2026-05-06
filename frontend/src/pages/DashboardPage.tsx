import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Building2, DollarSign } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const salesData = [
    { month: 'Gen', sales: 4000, deals: 24 },
    { month: 'Feb', sales: 3000, deals: 19 },
    { month: 'Mar', sales: 2000, deals: 18 },
    { month: 'Apr', sales: 2780, deals: 26 },
    { month: 'May', sales: 1890, deals: 22 }
  ];

  const kpis = [
    { label: 'Proprietà Attive', value: '145', icon: Building2, color: 'blue' },
    { label: 'Clienti', value: '328', icon: Users, color: 'green' },
    { label: 'Trattative', value: '23', icon: TrendingUp, color: 'purple' },
    { label: 'Commissioni', value: '€42.5K', icon: DollarSign, color: 'orange' }
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard Analytics</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          const colorClasses = {
            blue: 'bg-blue-50 text-blue-600',
            green: 'bg-green-50 text-green-600',
            purple: 'bg-purple-50 text-purple-600',
            orange: 'bg-orange-50 text-orange-600'
          };

          return (
            <div key={kpi.label} className={`${colorClasses[kpi.color as keyof typeof colorClasses]} rounded-lg p-6`}>
              <Icon size={28} className="mb-3" />
              <p className="text-sm font-medium opacity-75">{kpi.label}</p>
              <p className="text-3xl font-bold mt-1">{kpi.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold mb-4">Trend Vendite</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold mb-4">Trattative per Stato</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { status: 'Negoziazione', value: 8 },
              { status: 'Offerta', value: 5 },
              { status: 'Accettata', value: 6 },
              { status: 'Conclusa', value: 4 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

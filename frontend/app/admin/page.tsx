'use client';

import { motion } from 'framer-motion';
import { BentoCard, BentoGrid } from '@/components/BentoCard';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertCircle 
} from 'lucide-react';

// Mock data - Replace with real Supabase queries
const stats = [
  {
    title: 'Total Revenue',
    value: '$24,583',
    change: '+12.5%',
    icon: <DollarSign className="w-6 h-6" />,
  },
  {
    title: 'Orders',
    value: '342',
    change: '+8.2%',
    icon: <ShoppingCart className="w-6 h-6" />,
  },
  {
    title: 'Products',
    value: '156',
    change: '+4',
    icon: <Package className="w-6 h-6" />,
  },
  {
    title: 'Customers',
    value: '2,847',
    change: '+23.1%',
    icon: <Users className="w-6 h-6" />,
  },
];

const recentOrders = [
  {
    id: '1',
    orderNumber: 'SS-2023-001',
    customer: 'John Doe',
    total: 45.99,
    status: 'processing',
    date: '2024-11-23',
  },
  {
    id: '2',
    orderNumber: 'SS-2023-002',
    customer: 'Jane Smith',
    total: 78.50,
    status: 'shipped',
    date: '2024-11-23',
  },
  {
    id: '3',
    orderNumber: 'SS-2023-003',
    customer: 'Bob Johnson',
    total: 32.99,
    status: 'delivered',
    date: '2024-11-22',
  },
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-2"
          >
            Admin Dashboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600"
          >
            Manage your store, products, and orders
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-[#630D0E]/10 rounded-lg text-[#630D0E]">
                  {stat.icon}
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <BentoGrid>
            <BentoCard
              title="Products"
              description="Manage inventory"
              icon={<Package className="w-8 h-8" />}
              size="small"
              href="/admin/products"
            />
            <BentoCard
              title="Orders"
              description="View and process orders"
              icon={<ShoppingCart className="w-8 h-8" />}
              size="small"
              href="/admin/orders"
            />
            <BentoCard
              title="Customers"
              description="Customer management"
              icon={<Users className="w-8 h-8" />}
              size="small"
              href="/admin/customers"
            />
            <BentoCard
              title="Analytics"
              description="Sales insights"
              icon={<TrendingUp className="w-8 h-8" />}
              size="small"
              href="/admin/analytics"
            />
          </BentoGrid>
        </div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Order Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono text-sm font-medium text-gray-900">
                        {order.orderNumber}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          statusColors[order.status as keyof typeof statusColors]
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button className="text-[#630D0E] hover:text-[#7a1112] font-medium">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Low Stock Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-yellow-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                Low Stock Alert
              </h3>
              <p className="text-yellow-800 mb-4">
                3 products are running low on stock. Review inventory to avoid
                stockouts.
              </p>
              <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors">
                View Products
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

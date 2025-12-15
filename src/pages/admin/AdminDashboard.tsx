import React from "react";
import { motion } from "framer-motion";
import { 
  Home, Users, DollarSign, CalendarCheck, 
  Wrench, Bell, MoreVertical 
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import StatCard from "../../components/admin/StatCard";

import { revenueData, occupancyData, recentActivities } from "../../data/adminMockData";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="md:ml-64 p-6 transition-all duration-300">
        
        <AdminHeader />

        {/* Dashboard Content Grid */}
        <div className="space-y-6">
          
          {/* 1. Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Doanh thu tháng này" 
              value="65.000.000đ" 
              subtext="+12% so với tháng trước" 
              icon={DollarSign} 
              colorClass="bg-emerald-500 shadow-lg shadow-emerald-200" 
              delay={0.1} 
            />
            <StatCard 
              title="Tổng số phòng" 
              value="42" 
              subtext="5 phòng trống" 
              icon={Home} 
              colorClass="bg-indigo-500 shadow-lg shadow-indigo-200" 
              delay={0.2} 
            />
            <StatCard 
              title="Khách thuê" 
              value="86" 
              subtext="+3 khách mới" 
              icon={Users} 
              colorClass="bg-blue-500 shadow-lg shadow-blue-200" 
              delay={0.3} 
            />
            <StatCard 
              title="Yêu cầu xử lý" 
              value="4" 
              subtext="Cần xử lý ngay" 
              icon={CalendarCheck} 
              colorClass="bg-orange-500 shadow-lg shadow-orange-200" 
              delay={0.4} 
            />
          </div>

          {/* 2. Charts & Main Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left: Revenue Chart */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">Biểu đồ doanh thu (6 tháng)</h3>
                <select className="bg-gray-50 border border-gray-200 text-gray-600 text-sm rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>6 tháng gần nhất</option>
                  <option>Năm nay</option>
                </select>
              </div>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#94a3b8', fontSize: 12}} 
                      tickFormatter={(value) => `${value/1000000}tr`}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#6366f1" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorRevenue)" 
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Right: Occupancy Status */}
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.6 }}
               className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-6">Trạng thái phòng</h3>
              <div className="flex-1 flex flex-col justify-center gap-6">
                 {/* Visual Bar */}
                 <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden flex">
                    {occupancyData.map((item, index) => (
                      <motion.div 
                        key={index}
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.value / 42) * 100}%` }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="h-full"
                        style={{ backgroundColor: item.color }}
                      />
                    ))}
                 </div>

                 <div className="space-y-4">
                    {occupancyData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between group cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-gray-600 font-medium">{item.name}</span>
                        </div>
                        <span className="font-bold text-gray-800">{item.value} phòng</span>
                      </div>
                    ))}
                 </div>
                 
                 <div className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                    <p className="text-indigo-800 text-sm font-medium text-center">
                       Tỷ lệ lấp đầy: <span className="text-2xl font-bold block mt-1">83%</span>
                    </p>
                 </div>
              </div>
            </motion.div>
          </div>

          {/* 3. Recent Activity */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.7 }}
             className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-bold text-gray-800">Hoạt động gần đây</h3>
               <button className="text-sm text-indigo-600 font-semibold hover:underline">Xem tất cả</button>
            </div>
            
            <div className="grid grid-cols-1 divide-y divide-gray-50">
               {recentActivities.map((activity) => (
                 <div key={activity.id} className="py-4 flex items-center gap-4 hover:bg-gray-50 px-2 rounded-lg transition-colors -mx-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 
                      ${activity.type === 'payment' ? 'bg-emerald-100 text-emerald-600' : 
                        activity.type === 'issue' ? 'bg-red-100 text-red-600' : 
                        activity.type === 'new' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                      }`}>
                        {activity.type === 'payment' ? <DollarSign size={18} /> : 
                         activity.type === 'issue' ? <Wrench size={18} /> : 
                         activity.type === 'new' ? <Users size={18} /> : <Bell size={18} />}
                    </div>
                    <div className="flex-1">
                       <p className="text-gray-800 text-sm font-medium">
                          <span className="font-bold">{activity.user}</span> {activity.action}
                       </p>
                       <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical size={18} />
                    </button>
                 </div>
               ))}
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
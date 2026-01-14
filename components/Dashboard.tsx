
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
} from 'recharts';
import { TREND_DATA, MOCK_LOGS, COLORS, MOCK_VIEWING_STATS } from '../constants';

interface DashboardProps {
  setActiveTab: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveTab }) => {
  const behaviorMetrics = [
    { label: '今日任务下发', value: '154', sub: '节点在线率 98%', icon: '🚀', color: COLORS.info },
    { label: '在线用户数', value: MOCK_VIEWING_STATS.filter(u => u.isOnline).length.toString(), sub: '实时活跃监测', icon: '👥', color: COLORS.success },
    { label: '平均观看时长', value: '4.2h', sub: '人均每日耗时', icon: '⏱️', color: COLORS.primary },
    { label: '参数更新频率', value: '12次/日', sub: '系统动态调优', icon: '🛠️', color: COLORS.primary },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            综合指挥与行为态势中心
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-mono border border-emerald-500/20">LIVE DATA</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Integrated Command & Behavioral Intelligence Hub</p>
        </div>
        <div className="flex gap-2">
           <button className="bg-[#141414] border border-[#262626] text-[10px] px-3 py-1.5 rounded hover:bg-[#1f1f1f] transition-colors">生成行为溯源报告</button>
           <button className="bg-[#f0a020] text-black font-bold text-[10px] px-3 py-1.5 rounded shadow-lg shadow-yellow-500/10">全系统同步</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {behaviorMetrics.map((m, idx) => (
          <div key={idx} className="bg-[#141414] border border-[#262626] p-4 rounded-xl relative group overflow-hidden">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">{m.label}</span>
              <span className="text-lg">{m.icon}</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1 font-mono">{m.value}</div>
            <div className="text-[10px] font-medium" style={{ color: m.color }}>{m.sub}</div>
            <div className="absolute bottom-0 left-0 h-0.5 w-full bg-[#262626]">
              <div className="h-full bg-current transition-all duration-1000" style={{ width: '60%', color: m.color }}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#141414] border border-[#262626] rounded-xl p-5">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <div className="w-1 h-4 bg-[#f0a020]"></div>
              任务下发与预警响应趋势
            </h3>
            <div className="flex gap-4 text-[9px] uppercase font-bold tracking-widest">
              <span className="flex items-center gap-1.5 text-blue-400"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> 任务下发</span>
              <span className="flex items-center gap-1.5 text-emerald-400"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div> 人工响应</span>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TREND_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                <XAxis dataKey="time" stroke="#404040" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#404040" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0d0d0d', border: '1px solid #262626', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="deployments" stroke="#3b82f6" fill="rgba(59, 130, 246, 0.1)" strokeWidth={2} />
                <Area type="monotone" dataKey="actions" stroke="#10b981" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 用户观看活跃度审计 */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-5">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">用户在线状态监测</h3>
            <span className="text-[10px] text-emerald-500 font-mono">LIVE TRACKING</span>
          </div>
          <div className="space-y-4">
            {MOCK_VIEWING_STATS.slice(0, 4).map((user, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[#0d0d0d] border border-[#262626] hover:border-[#f0a020]/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[10px] font-bold text-[#f0a020]">
                      {user.userName.substring(0, 2).toUpperCase()}
                    </div>
                    {user.isOnline && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#0d0d0d] rounded-full animate-pulse"></span>
                    )}
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-white">{user.userName}</div>
                    <div className="text-[9px] text-gray-500">UID: {user.userId}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono text-[#f0a020]">{user.isOnline ? user.currentSessionDuration : 'Offline'}</div>
                  <div className="text-[8px] text-gray-600 uppercase">今日累计: {user.totalDurationToday}</div>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setActiveTab('reports')} 
            className="w-full mt-6 py-2 bg-[#1f1f1f] text-gray-400 text-[10px] font-bold rounded uppercase tracking-widest hover:text-white transition-colors"
          >
            查看全量观看报告
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#141414] border border-[#262626] rounded-xl overflow-hidden">
          <div className="p-4 border-b border-[#262626] bg-[#0d0d0d] flex justify-between items-center">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
              审计流流水线
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] text-left">
              <thead className="bg-[#1a1a1a] text-gray-500 border-b border-[#262626] uppercase">
                <tr>
                  <th className="p-4">用户</th>
                  <th className="p-4">行为事项</th>
                  <th className="p-4">分类</th>
                  <th className="p-4 text-right">执行时间</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262626]">
                {MOCK_LOGS.map(log => (
                  <tr key={log.id} className="hover:bg-[#1a1a1a]">
                    <td className="p-4 flex items-center gap-2 text-gray-200">
                      <div className="w-5 h-5 rounded bg-[#262626] flex items-center justify-center text-[8px]">{log.user[0]}</div>
                      {log.user}
                    </td>
                    <td className="p-4 text-white font-medium">{log.action}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[9px] border border-gray-500/30 text-gray-400">
                        {log.category}
                      </span>
                    </td>
                    <td className="p-4 text-right text-gray-500 font-mono">{log.time.split(' ')[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#141414] border border-[#262626] rounded-xl p-5">
           <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">下发任务执行管线</h3>
           <div className="space-y-5">
             {[
               { platform: 'YouTube', active: 18, total: 24, load: 75, color: '#ff0000' },
               { platform: 'Facebook', active: 12, total: 15, load: 80, color: '#1877f2' },
               { platform: 'Other News', active: 22, total: 22, load: 100, color: COLORS.success },
             ].map((node, i) => (
               <div key={i} className="group">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] text-white font-bold">{node.platform}</span>
                    <span className="text-[9px] text-gray-500 font-mono">{node.active}/{node.total}</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div className="h-full relative" style={{ width: `${node.load}%`, backgroundColor: node.color }}>
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

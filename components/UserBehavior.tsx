
import React, { useState, useEffect } from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, AreaChart, Area,
} from 'recharts';
import { 
  COLORS, MOCK_VIEWING_STATS, 
  LOGIN_TREND_DATA, WARNING_CATEGORY_STATS, 
  MOCK_TOP_CHANNELS, WARNING_DETAILS_MOCK, 
  DASHBOARD_OP_METRICS
} from '../constants';

const UserBehavior: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('24H');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [customRange, setCustomRange] = useState({ start: '', end: '' });

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [timeFilter]);

  const timeOptions = [
    { id: '24H', label: '近24小时' },
    { id: '7D', label: '近7天' },
    { id: '30D', label: '近30天' },
    { id: 'CUSTOM', label: '自定义' }
  ];

  const activeCategoryData = selectedCategory ? WARNING_CATEGORY_STATS.find(s => s.id === selectedCategory) : null;
  const activeDetails = selectedCategory ? WARNING_DETAILS_MOCK[selectedCategory] : null;

  return (
    <div className={`relative min-h-screen pb-20 space-y-6 transition-opacity duration-500 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
      
      {/* 顶部标题与筛选 */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            用户看板
            <span className="text-[10px] bg-[#f0a020]/10 text-[#f0a020] px-2 py-0.5 rounded border border-[#f0a020]/20 font-mono uppercase tracking-tighter">Behavior & Operation Intel</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-medium">User Activity Tracking & Media Operation Metrics</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* 自定义日期输入区 - 仅在选择自定义时平滑显示 */}
          {timeFilter === 'CUSTOM' && (
            <div className="flex items-center gap-2 bg-[#141414] border border-[#262626] rounded-lg p-1 animate-in fade-in slide-in-from-right-4 duration-300">
              <input 
                type="date" 
                value={customRange.start}
                onChange={(e) => setCustomRange({...customRange, start: e.target.value})}
                className="bg-transparent text-[10px] text-gray-300 outline-none px-2 py-1 font-mono uppercase focus:text-[#f0a020]"
              />
              <span className="text-gray-600 text-[10px]">至</span>
              <input 
                type="date" 
                value={customRange.end}
                onChange={(e) => setCustomRange({...customRange, end: e.target.value})}
                className="bg-transparent text-[10px] text-gray-300 outline-none px-2 py-1 font-mono uppercase focus:text-[#f0a020]"
              />
            </div>
          )}

          <div className="bg-[#141414] border border-[#262626] rounded-lg p-1 flex gap-1">
            {timeOptions.map(option => (
              <button
                key={option.id}
                onClick={() => setTimeFilter(option.id)}
                className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase transition-all ${
                  timeFilter === option.id 
                    ? 'bg-[#f0a020] text-black shadow-lg shadow-yellow-500/10' 
                    : 'text-gray-500 hover:text-gray-300 hover:bg-[#1f1f1f]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 顶部核心统计 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-[#141414] border border-[#262626] p-5 rounded-xl shadow-lg relative group overflow-hidden bg-gradient-to-br from-gray-500/5 to-transparent">
          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2 flex justify-between">系统登录统计 <span className="text-gray-400">USERS</span></div>
          <div className="text-3xl font-black text-white font-mono">{DASHBOARD_OP_METRICS.totalLogins}</div>
          <div className="mt-2 text-[9px] text-gray-600 font-bold">较昨日 +12%</div>
        </div>

        <div className="bg-[#141414] border border-[#262626] p-5 rounded-xl shadow-lg relative group overflow-hidden bg-gradient-to-br from-blue-500/5 to-transparent">
          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2 flex justify-between">在线直播观看数 <span className="text-blue-500">LIVE</span></div>
          <div className="text-3xl font-black text-white font-mono">{DASHBOARD_OP_METRICS.onlineLiveViews.toLocaleString()}</div>
          <div className="mt-2 h-0.5 w-full bg-[#262626] rounded-full overflow-hidden">
             <div className="h-full bg-blue-500 animate-pulse" style={{ width: '70%' }}></div>
          </div>
        </div>

        <div className="bg-[#141414] border border-[#262626] p-5 rounded-xl shadow-lg relative group overflow-hidden bg-gradient-to-br from-emerald-500/5 to-transparent">
          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2 flex justify-between">采集账号总数 <span className="text-emerald-500">ACCTS</span></div>
          <div className="text-3xl font-black text-white font-mono">{DASHBOARD_OP_METRICS.collectionAccounts}</div>
          <div className="mt-2 text-[9px] text-emerald-500/70 font-bold">活跃率 98.4%</div>
        </div>

        <div className="bg-[#141414] border border-[#262626] p-5 rounded-xl shadow-lg relative group overflow-hidden bg-gradient-to-br from-[#f0a020]/5 to-transparent">
          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2 flex justify-between">在线视频采集总数 <span className="text-[#f0a020]">INGEST</span></div>
          <div className="text-3xl font-black text-white font-mono">{DASHBOARD_OP_METRICS.onlineVideoTotal.toLocaleString()}</div>
          <div className="mt-2 text-[9px] text-[#f0a020]/70 font-bold">实时同步中</div>
        </div>

        <div className="bg-[#141414] border border-[#262626] p-5 rounded-xl shadow-lg relative group overflow-hidden bg-gradient-to-br from-purple-500/5 to-transparent">
          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2 flex justify-between">离线视频上传数 <span className="text-purple-500">OFFLINE</span></div>
          <div className="text-3xl font-black text-white font-mono">{DASHBOARD_OP_METRICS.offlineVideoUploads}</div>
          <div className="mt-2 text-[9px] text-purple-500/70 font-bold">存储状态正常</div>
        </div>
      </div>

      {/* 预警分类监控分析 */}
      <div className="bg-[#0d0d0d] border border-[#262626] rounded-xl p-4 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-3">
           <div className="w-1.5 h-3 bg-[#f0a020]"></div>
           <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">预警分类趋势监控 <span className="text-[#f0a020]/50 ml-1">WARNING ANALYTICS</span></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WARNING_CATEGORY_STATS.map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => setSelectedCategory(item.id)}
              className={`cursor-pointer bg-[#141414] border p-4 rounded-lg shadow-md transition-all group/card overflow-hidden ${
                selectedCategory === item.id ? 'border-[#f0a020] bg-[#1a1a1a] scale-[1.02]' : 'border-[#262626] hover:border-[#f0a020]/30 hover:bg-[#1a1a1a]'
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">{item.category}</h3>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }}></div>
              </div>
              <div className="flex flex-col">
                <div className="text-[9px] text-gray-600 uppercase font-black tracking-widest mb-1">今日新增记录</div>
                <div className="flex items-baseline gap-2">
                  <div className="text-2xl font-black text-white font-mono">{item.new}</div>
                  <div className="text-[8px] text-emerald-500 font-bold">Active</div>
                </div>
              </div>
              {/* 卡片底部的渐变背景点缀 */}
              <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full opacity-10 blur-xl" style={{ backgroundColor: item.color }}></div>
            </div>
          ))}
        </div>
      </div>

      {/* 主数据分析区 */}
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 shadow-lg">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-8">
              <div className="w-1 h-3 bg-blue-500"></div> 登录趋势分析 ({timeFilter === 'CUSTOM' ? '自定义范围' : timeFilter})
            </h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={LOGIN_TREND_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                  <XAxis dataKey="time" stroke="#444" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="#444" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0d0d0d', border: '1px solid #262626', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="logins" stroke="#3b82f6" fill="rgba(59, 130, 246, 0.1)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 shadow-lg">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-8">
              <div className="w-1 h-3 bg-[#f0a020]"></div> 频道观看时长 Top Channels
            </h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_TOP_CHANNELS} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="channelName" type="category" stroke="#9ca3af" fontSize={9} width={140} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{fill: 'rgba(255,255,255,0.03)'}} contentStyle={{ backgroundColor: '#0d0d0d', border: '1px solid #262626', borderRadius: '8px' }} />
                  <Bar dataKey="percentage" radius={[0, 4, 4, 0]} barSize={16}>
                    {MOCK_TOP_CHANNELS.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.category === 'RADIO' ? COLORS.radio : entry.category === 'YOUTUBE' ? COLORS.youtube : COLORS.success} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-[#141414] border border-[#262626] rounded-xl overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-[#262626] flex justify-between items-center bg-[#0d0d0d]">
             <div className="flex items-center gap-3">
               <div className="w-1 h-3 bg-[#f0a020]"></div>
               <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">用户行为实时审计 Activity Log</span>
             </div>
             <div className="text-[10px] text-gray-600 font-mono tracking-tighter uppercase">Operational Metadata Synced</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] text-left">
              <thead className="bg-[#1a1a1a] text-gray-500 border-b border-[#262626] uppercase font-bold tracking-tighter">
                <tr>
                  <th className="p-4">用户标识</th>
                  <th className="p-4">内容来源</th>
                  <th className="p-4">实时播放/频道内容</th>
                  <th className="p-4 text-right">今日累计时长 ({timeFilter})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262626]">
                {MOCK_VIEWING_STATS.map((user, idx) => (
                  <tr key={idx} className="hover:bg-[#1a1a1a] transition-all group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[10px] bg-[#262626] text-gray-400 group-hover:bg-[#f0a020] group-hover:text-black transition-colors">
                          {user.userName.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-white font-bold group-hover:text-[#f0a020]">{user.userName}</div>
                          <div className="text-[8px] text-gray-600 font-mono uppercase">UID: {user.userId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                       <span className={`px-2 py-0.5 rounded text-[9px] border font-black uppercase tracking-tighter ${user.currentViewing?.source === 'ONLINE_LIVE' ? 'border-emerald-500/30 text-emerald-500' : 'border-gray-500/30 text-gray-500'}`}>
                         {user.currentViewing?.source.replace('_', ' ') || 'OFFLINE'}
                       </span>
                    </td>
                    <td className="p-4 text-gray-300 truncate max-w-[500px]">{user.currentViewing?.channel || `上次活跃: ${user.lastActiveTime}`}</td>
                    <td className="p-4 text-right text-white font-mono font-black">{user.totalDurationToday}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 预警详情分析抽屉 */}
      {selectedCategory && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-300" onClick={() => setSelectedCategory(null)} />
          <div className="fixed top-0 right-0 h-full w-[450px] bg-[#0d0d0d] border-l border-[#f0a020]/30 shadow-2xl z-50 animate-in slide-in-from-right-full duration-500 flex flex-col">
            <div className="p-6 border-b border-[#262626] flex justify-between items-center bg-[#111]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-6 bg-[#f0a020]" />
                <div>
                  <h2 className="text-lg font-bold text-white uppercase tracking-wider">{activeCategoryData?.category} 深度分析</h2>
                  <p className="text-[10px] text-gray-500 uppercase font-mono mt-0.5 tracking-widest">Intelligence Node Insight</p>
                </div>
              </div>
              <button onClick={() => setSelectedCategory(null)} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1f1f1f] text-gray-500 hover:bg-[#f0a020] hover:text-black transition-all">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-l-2 border-[#f0a020] pl-2">核心运营指标 Summary</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#141414] border border-[#262626] p-4 rounded-xl">
                    <div className="text-[8px] text-gray-600 uppercase font-bold mb-1">数据库总目标</div>
                    <div className="text-2xl font-black text-[#f0a020] font-mono">{activeDetails?.summary.totalTargets}</div>
                  </div>
                  <div className="bg-[#141414] border border-[#262626] p-4 rounded-xl">
                    <div className="text-[8px] text-gray-600 uppercase font-bold mb-1">历史命中总数</div>
                    <div className="text-2xl font-black text-white font-mono">{activeDetails?.summary.totalHits}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-l-2 border-emerald-500 pl-2">预警贡献排行 TOP 5 Contributors</h3>
                <div className="space-y-3">
                  {activeDetails?.topUsers.map((user, idx) => (
                    <div key={idx} className="bg-[#141414] border border-[#262626] p-4 rounded-xl group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-white group-hover:text-emerald-500 transition-colors">{user.name}</span>
                        <span className="text-xs font-mono text-gray-400">{user.count} Warnings</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#1a1a1a] rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${user.ratio}%`, backgroundColor: user.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-l-2 border-red-500 pl-2">最近命中流水 Recent Hits</h3>
                <div className="space-y-3">
                  {activeDetails?.hits.map((hit, idx) => (
                    <div key={idx} className="bg-[#141414] border border-[#262626] p-3 rounded-lg flex justify-between items-center group hover:border-red-500/30 transition-all">
                      <div>
                        <div className="text-[11px] font-bold text-white">{hit.result}</div>
                        <div className="text-[9px] text-gray-600 uppercase font-mono mt-0.5">{hit.source} | <span className="text-emerald-500">{hit.confidence}</span></div>
                      </div>
                      <div className="text-[10px] text-gray-500 font-mono">{hit.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 bg-[#111] border-t border-[#262626]">
              <button className="w-full bg-[#f0a020] text-black font-black uppercase text-[10px] py-3 rounded-lg tracking-widest shadow-lg shadow-yellow-500/10 hover:opacity-90 transition-opacity">下载数据报告</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserBehavior;

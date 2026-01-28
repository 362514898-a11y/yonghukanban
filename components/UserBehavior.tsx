
import React, { useState, useMemo } from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, AreaChart, Area, PieChart, Pie
} from 'recharts';
import { 
  COLORS, DASHBOARD_OP_METRICS, MODULE_USAGE_DISTRIBUTION,
  WARNING_PREFERENCE_DATA,
  VIEWING_STATS_DATA, OFFLINE_UPLOAD_TREND, VISIT_TIME_DISTRIBUTION,
  LOGIN_DAILY_DATA, LOGIN_WEEKLY_DATA, MOCK_TOP10_DATA,
  MOCK_CHANNEL_VIEWERS, AI_ANALYSIS_STATS, GEO_DISTRIBUTION_DATA
} from '../constants';

const UserBehavior: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('24h');
  const [loginGranularity, setLoginGranularity] = useState<'hour' | 'day' | 'week'>('hour');
  const [activeCategory, setActiveCategory] = useState<string>('YouTube在线');
  const [inspectChannel, setInspectChannel] = useState<string | null>(null);

  const MetricCard = ({ label, value, color, icon, details, onDetailClick }: any) => (
    <div className="bg-[#0f0f0f] border border-white/[0.05] p-4 rounded-2xl shadow-2xl flex flex-col justify-between transition-all hover:bg-[#141414] hover:border-white/[0.1] group relative overflow-hidden h-full">
      <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ backgroundColor: color }}></div>
      <div className="flex justify-between items-start w-full relative z-10">
        <div className="space-y-1">
          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.18em] group-hover:text-gray-400 transition-colors">
            {label}
          </div>
          <div className="text-2xl font-bold text-white font-mono tracking-tighter">
            {value.toLocaleString()}
          </div>
        </div>
        <div className="text-xl p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] opacity-60 group-hover:opacity-100 transition-all group-hover:scale-110 shadow-inner flex items-center justify-center" style={{ color }}>
          {icon}
        </div>
      </div>
      {details && (
        <div className="mt-4 pt-3 border-t border-white/[0.05] flex justify-between gap-3 overflow-hidden">
          {details.map((d: any, i: number) => (
            <div 
              key={i} 
              className={`flex flex-col min-w-0 cursor-pointer transition-opacity hover:opacity-100 ${onDetailClick ? (activeCategory.includes(d.name) ? 'opacity-100' : 'opacity-40') : ''}`}
              onClick={() => onDetailClick && onDetailClick(d.name)}
            >
               <span className="text-[9px] text-gray-600 font-black uppercase truncate tracking-tight">{d.name || d.label}</span>
               <span className="text-[11px] text-gray-300 font-mono font-bold group-hover:text-white transition-colors truncate">
                 {d.value.toLocaleString()}
               </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const SectionHeader = ({ title, accentColor, children }: any) => (
    <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-3.5 rounded-full" style={{ backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}60` }}></div>
        <div>
          <h3 className="text-[11px] font-black text-white uppercase tracking-[0.15em]">{title}</h3>
        </div>
      </div>
      {children}
    </div>
  );

  const loginChartData = useMemo(() => {
    switch (loginGranularity) {
      case 'day': return LOGIN_DAILY_DATA;
      case 'week': return LOGIN_WEEKLY_DATA;
      default: return VISIT_TIME_DISTRIBUTION.map(d => ({ label: d.hour, value: d.value }));
    }
  }, [loginGranularity]);

  const top10Data = useMemo(() => {
    return MOCK_TOP10_DATA[activeCategory] || [];
  }, [activeCategory]);

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, name, fill }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 20;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-[8px] font-bold">
        {name}
      </text>
    );
  };

  const ViewerModal = () => {
    if (!inspectChannel) return null;
    const viewers = MOCK_CHANNEL_VIEWERS[inspectChannel] || [
      { user: 'operator_test', duration: '12m', time: '14:20:00', device: 'Web' },
      { user: 'guest_user', duration: '5m', time: '15:10:22', device: 'Mobile' }
    ];

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
        <div className="bg-[#0f0f0f] border border-white/[0.1] rounded-2xl w-full max-w-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,1)] flex flex-col animate-in zoom-in-95 duration-300">
          <div className="p-5 border-b border-white/[0.05] flex justify-between items-center bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 rounded-full bg-[#f0a020]"></div>
              <div>
                <h2 className="text-white font-black uppercase text-sm tracking-widest">观看用户详情</h2>
                <p className="text-[10px] text-[#f0a020] font-bold uppercase mt-0.5 tracking-tighter">Target: {inspectChannel}</p>
              </div>
            </div>
            <button onClick={() => setInspectChannel(null)} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all text-xl">×</button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] text-gray-600 uppercase tracking-[0.2em] border-b border-white/[0.05]">
                  <th className="pb-3 pl-2">用户 ID</th>
                  <th className="pb-3">访问设备</th>
                  <th className="pb-3">观看时长</th>
                  <th className="pb-3 text-right pr-2">最后活跃</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {viewers.map((v, i) => (
                  <tr key={i} className="group hover:bg-white/[0.02]">
                    <td className="py-3.5 pl-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-[#f0a020]/20 flex items-center justify-center text-[10px] font-bold text-[#f0a020]">{v.user[0].toUpperCase()}</div>
                        <span className="text-xs text-gray-300 font-bold group-hover:text-white">{v.user}</span>
                      </div>
                    </td>
                    <td className="py-3.5"><span className="text-[10px] text-gray-500 px-2 py-0.5 rounded border border-white/[0.05]">{v.device}</span></td>
                    <td className="py-3.5 text-[11px] font-mono text-[#10b981]">{v.duration}</td>
                    <td className="py-3.5 text-right pr-2 text-[10px] font-mono text-gray-500">{v.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-white/[0.05] bg-white/[0.01] flex justify-end">
            <button onClick={() => setInspectChannel(null)} className="px-6 py-2 bg-[#f0a020] text-black text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all">关闭窗口</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-5 pb-10 animate-in fade-in slide-in-from-bottom-3 duration-1000 max-w-[1600px] mx-auto px-4">
      <ViewerModal />
      
      {/* 1. 顶部控制栏 */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-[#0d0d0d] p-3 px-5 rounded-2xl border border-white/[0.05] shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">态势周期:</span>
          <div className="flex bg-black/60 p-0.5 rounded-lg border border-white/[0.05]">
            {['24h', '7d', '30d'].map((id) => (
              <button
                key={id}
                onClick={() => setTimeFilter(id)}
                className={`px-4 py-1.5 text-[10px] font-bold rounded-md transition-all ${
                  timeFilter === id ? 'bg-[#f0a020] text-black shadow-lg' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                {id === '24h' ? '近24小时' : id === '7d' ? '近7天' : '近30天'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. 核心统计指标 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        <MetricCard label="活跃用户登录" value={DASHBOARD_OP_METRICS.activeUsers} color={COLORS.info} icon="👤" />
        <MetricCard label="累计采集任务" value={DASHBOARD_OP_METRICS.totalCollections} color={COLORS.primary} icon="☁️" />
        <MetricCard label="预警库配置" value={DASHBOARD_OP_METRICS.totalWarningConfigs} color={COLORS.danger} icon="⚠️" details={WARNING_PREFERENCE_DATA} />
        <MetricCard label="视频观看次数统计" value={12050} color={COLORS.purple} icon="📺" onDetailClick={(p: string) => setActiveCategory(p)} details={VIEWING_STATS_DATA.map(d => ({name: d.name, value: d.value}))} />
        <MetricCard label="离线视频上传" value={850} color={COLORS.orange} icon="📁" details={[{ name: '今日新增', value: 92 }, { name: '历史累计', value: 758 }]} />
      </div>

      {/* 3. 三栏并列：登录行为趋势 + 功能模块使用占比 + AI分析能力使用占比 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* 登录趋势 */}
        <div className="bg-[#0f0f0f] border border-white/[0.05] rounded-2xl p-5 shadow-2xl flex flex-col h-[420px]">
          <SectionHeader title="用户登录行为趋势" accentColor="#3b82f6">
            <div className="flex bg-black/40 p-0.5 rounded-lg border border-white/[0.05]">
              {[{ id: 'hour', label: '时' }, { id: 'day', label: '天' }, { id: 'week', label: '周' }].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setLoginGranularity(opt.id as any)}
                  className={`px-3 py-1 text-[9px] font-black rounded-md transition-all ${
                    loginGranularity === opt.id ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-600 hover:text-gray-400'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </SectionHeader>
          <div className="flex-1 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={loginChartData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="loginGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="5 5" stroke="#1a1a1a" vertical={false} />
                <XAxis dataKey="label" stroke="#333" fontSize={9} axisLine={false} tickLine={false} tick={{ dy: 5 }} />
                <YAxis stroke="#333" fontSize={9} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0d0d0d', border: '1px solid #333', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fill="url(#loginGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 模块占比 */}
        <div className="bg-[#0f0f0f] border border-white/[0.05] rounded-2xl p-5 shadow-2xl flex flex-col h-[420px]">
          <SectionHeader title="功能模块使用占比" accentColor="#f0a020" />
          <div className="flex-1 min-h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={MODULE_USAGE_DISTRIBUTION} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value" stroke="none">
                  {MODULE_USAGE_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0d0d0d', border: '1px solid #333', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {MODULE_USAGE_DISTRIBUTION.map((m, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: m.color }}></div>
                <span className="text-[9px] text-gray-500 font-bold truncate">{m.name}</span>
                <span className="ml-auto text-[10px] text-white font-mono font-bold">{m.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI分析能力占比 */}
        <div className="bg-[#0f0f0f] border border-white/[0.05] rounded-2xl p-5 shadow-2xl flex flex-col h-[420px] relative overflow-hidden">
          <SectionHeader title="AI分析能力使用占比" accentColor="#3b82f6" />
          <div className="flex-1 min-h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={AI_ANALYSIS_STATS} 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={60} 
                  outerRadius={80} 
                  paddingAngle={4} 
                  dataKey="value" 
                  stroke="#0a0a0a"
                  strokeWidth={2}
                  label={renderCustomLabel}
                  labelLine={false}
                >
                  {AI_ANALYSIS_STATS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0d0d0d', border: '1px solid #333', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {AI_ANALYSIS_STATS.map((item, idx) => (
              <div key={idx} className="flex flex-col p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                   <span className="text-[9px] text-gray-400 font-bold uppercase">{item.name}</span>
                </div>
                <div className="text-sm font-mono font-bold text-white mt-1">{item.value.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. 地域分布态势 与 离线上传趋势 并列 (2:1 Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* 左侧：地域分布 (占据 2/3) */}
        <div className="lg:col-span-2 bg-[#0f0f0f] border border-white/[0.05] rounded-2xl p-6 shadow-2xl overflow-hidden relative">
          <SectionHeader title="用户采集频道地域分布" accentColor="#f0a020" />
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 items-stretch h-[400px]">
             {/* 地图区域 */}
             <div className="xl:col-span-3 relative flex items-center justify-center bg-black/10 rounded-xl border border-white/[0.02] overflow-hidden">
                <svg viewBox="0 0 1000 500" className="w-full h-full opacity-60">
                    <path d="M50,100 L250,100 L280,180 L350,220 L250,400 L50,300 Z" fill="#444" opacity="0.4" />
                    <path d="M100,120 L240,120 L260,200 L200,280 L120,280 Z" fill="#ff4d4d" className="animate-pulse" />
                    <path d="M250,350 L350,350 L400,450 L300,480 L250,400 Z" fill="#3b82f6" opacity="0.6" />
                    <path d="M450,100 L550,100 L580,200 L450,200 Z" fill="#6a11cb" opacity="0.6" />
                    <path d="M450,220 L550,220 L600,350 L550,450 L450,400 Z" fill="#333" opacity="0.3" />
                    <path d="M530,230 L590,230 L580,260 L540,260 Z" fill="#ff8c00" />
                    <path d="M600,100 L900,100 L950,250 L850,350 L600,350 Z" fill="#444" opacity="0.4" />
                    <path d="M750,150 L850,150 L880,220 L800,280 Z" fill="#4facfe" opacity="0.8" />
                    <path d="M850,380 L950,380 L950,450 L850,450 Z" fill="#2575fc" opacity="0.7" />
                    <path d="M0,250 L1000,250" stroke="white" strokeWidth="0.5" opacity="0.05" />
                    <path d="M500,0 L500,500" stroke="white" strokeWidth="0.5" opacity="0.05" />
                </svg>
                {/* 垂直色阶 */}
                <div className="absolute left-6 bottom-8 flex flex-col items-center gap-1 bg-black/40 p-2 rounded-lg border border-white/5 backdrop-blur-sm">
                    <span className="text-[8px] text-gray-400 font-bold uppercase">高</span>
                    <div className="w-2 h-20 rounded-full bg-gradient-to-t from-[#2575fc] via-[#f09819] to-[#ff512f] border border-white/10 shadow-[0_0_10px_rgba(255,81,47,0.2)]"></div>
                    <span className="text-[8px] text-gray-400 font-bold uppercase">低</span>
                    <div className="mt-1 text-[8px] font-mono text-gray-500">100</div>
                    <div className="h-4"></div>
                    <div className="text-[8px] font-mono text-gray-500">0</div>
                </div>
                {/* 扫描效果 */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f0a020]/5 to-transparent h-20 w-full animate-[scan_4s_linear_infinite] pointer-events-none"></div>
             </div>
             {/* 排行区域 */}
             <div className="xl:col-span-2 flex flex-col bg-black/20 p-3 rounded-xl border border-white/5">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={GEO_DISTRIBUTION_DATA} layout="vertical" margin={{ left: -10, right: 30, top: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="geoBarGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#2575fc" />
                                <stop offset="60%" stopColor="#f09819" />
                                <stop offset="100%" stopColor="#ff512f" />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" horizontal={false} />
                        <XAxis type="number" hide domain={[0, 100]} />
                        <YAxis dataKey="name" type="category" stroke="#888" fontSize={9} axisLine={false} tickLine={false} width={100} tick={{ fill: '#bbb', fontWeight: 600 }} />
                        <Tooltip cursor={{fill: 'rgba(255,255,255,0.03)'}} contentStyle={{ backgroundColor: '#0d0d0d', border: '1px solid #333', borderRadius: '8px', fontSize: '9px' }} />
                        <Bar dataKey="value" radius={[0, 2, 2, 0]} barSize={14}>
                            {GEO_DISTRIBUTION_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill="url(#geoBarGradient)" />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>

        {/* 右侧：离线视频上传 (占据 1/3) */}
        <div className="bg-[#0f0f0f] border border-white/[0.05] rounded-2xl p-6 shadow-2xl flex flex-col">
          <SectionHeader title="离线视频上传统计" accentColor="#a855f7" />
          <div className="flex-1 min-h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={OFFLINE_UPLOAD_TREND} margin={{ left: -30, top: 10 }}>
                <CartesianGrid strokeDasharray="5 5" stroke="#1a1a1a" vertical={false} />
                <XAxis dataKey="date" stroke="#555" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#555" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: 'rgba(255,255,255,0.02)'}} contentStyle={{ backgroundColor: '#0d0d0d', border: '1px solid #333', borderRadius: '8px' }} />
                <Bar dataKey="count" fill="#a855f7" radius={[4, 4, 0, 0]} barSize={35}>
                    {OFFLINE_UPLOAD_TREND.map((entry, index) => (
                        <Cell key={`cell-${index}`} fillOpacity={0.8} />
                    ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl flex justify-between items-center">
             <div className="space-y-1">
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">周期内最高</span>
                <div className="text-xl font-mono font-bold text-white">70 <span className="text-[10px] text-gray-600 font-normal">files</span></div>
             </div>
             <div className="w-px h-8 bg-white/5"></div>
             <div className="space-y-1">
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">平均上传</span>
                <div className="text-xl font-mono font-bold text-[#a855f7]">52.1</div>
             </div>
          </div>
        </div>
      </div>

      {/* 5. 视频观看联动展示区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="bg-[#0f0f0f] border border-white/[0.05] rounded-2xl p-5 shadow-2xl">
          <SectionHeader title="用户视频观看统计" accentColor="#ef4444" />
          <div className="h-[280px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={VIEWING_STATS_DATA} 
                layout="vertical"
                margin={{ left: 10, right: 30 }}
                onClick={(state) => state?.activeLabel && setActiveCategory(state.activeLabel)}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#555" fontSize={10} axisLine={false} tickLine={false} width={100} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.02)'}} 
                  contentStyle={{ backgroundColor: '#0d0d0d', border: '1px solid #333', borderRadius: '8px' }} 
                />
                <Bar dataKey="value" barSize={25} radius={[0, 4, 4, 0]} className="cursor-pointer">
                  {VIEWING_STATS_DATA.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      fillOpacity={activeCategory === entry.name ? 1 : 0.4}
                      stroke={activeCategory === entry.name ? '#fff' : 'transparent'}
                      strokeWidth={1}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {VIEWING_STATS_DATA.map((item, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveCategory(item.name)}
                className={`w-full flex items-center justify-between p-2 rounded-lg transition-all border ${activeCategory === item.name ? 'bg-white/5 border-white/10' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }}></div>
                  <span className="text-[10px] text-gray-300 font-bold uppercase">{item.name}</span>
                </div>
                <span className="text-[10px] font-mono text-gray-500">{item.value.toLocaleString()}次</span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-[#0f0f0f] border border-white/[0.05] rounded-2xl p-5 shadow-2xl">
          <SectionHeader 
            title={`${activeCategory} 播放 TOP 10`} 
            accentColor={VIEWING_STATS_DATA.find(d => d.name === activeCategory)?.color || COLORS.primary} 
          />
          <div className="overflow-x-auto min-h-[360px]">
            <table className="w-full text-left">
              <thead className="border-b border-white/[0.05] text-[9px] text-gray-600 uppercase tracking-widest">
                <tr>
                  <th className="pb-3 pl-2">排名</th>
                  <th className="pb-3">资源/频道名称</th>
                  <th className="pb-3">访问频次</th>
                  <th className="pb-3">累计时长</th>
                  <th className="pb-3 text-right pr-2">详情</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {top10Data.length > 0 ? top10Data.map((item, idx) => (
                  <tr key={idx} onClick={() => setInspectChannel(item.name)} className="hover:bg-white/[0.05] transition-colors group cursor-pointer">
                    <td className="py-3.5 pl-2">
                      <span className={`w-6 h-6 flex items-center justify-center rounded text-[10px] font-black ${idx < 3 ? 'bg-white/10 text-white' : 'text-gray-600'}`}>{idx + 1}</span>
                    </td>
                    <td className="py-3.5 text-[11px] font-bold text-gray-300 group-hover:text-white transition-colors">{item.name}</td>
                    <td className="py-3.5 text-[10px] font-mono text-gray-500">{item.value}</td>
                    <td className="py-3.5 text-[10px] font-mono text-gray-500">{item.duration}</td>
                    <td className="py-3.5 text-right pr-2"><span className="text-gray-600 group-hover:text-[#f0a020] transition-colors text-xs">👁</span></td>
                  </tr>
                )) : (
                  <tr><td colSpan={5} className="py-20 text-center text-gray-600 text-xs font-bold uppercase tracking-widest italic">暂无对应排行榜数据</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400px); }
        }
      `}</style>
    </div>
  );
};

export default UserBehavior;

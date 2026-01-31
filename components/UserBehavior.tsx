import React, { useState, useMemo } from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Bar, Cell, AreaChart, Area, PieChart, Pie,
  Radar, RadarChart, PolarGrid, PolarAngleAxis,
  BarChart
} from 'recharts';
import { 
  COLORS, DASHBOARD_OP_METRICS, MODULE_USAGE_DISTRIBUTION,
  WARNING_PREFERENCE_DATA,
  VIEWING_STATS_DATA, VISIT_TIME_DISTRIBUTION,
  LOGIN_DAILY_DATA, LOGIN_WEEKLY_DATA, MOCK_TOP10_DATA,
  MOCK_CHANNEL_VIEWERS, AI_ANALYSIS_STATS, GEO_DISTRIBUTION_DATA,
  OFFLINE_BEHAVIOR_TREND
} from '../constants';

const UserBehavior: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('24h');
  const [loginGranularity, setLoginGranularity] = useState<'hour' | 'day' | 'week'>('hour');
  const [activeCategory, setActiveCategory] = useState<string>('YouTube在线');
  const [inspectChannel, setInspectChannel] = useState<string | null>(null);
  
  // Custom date range state
  const [customRange, setCustomRange] = useState({ start: '', end: '' });

  const MetricCard = ({ label, value, color, icon, details, onDetailClick }: any) => (
    <div className="bg-[#111111] border border-white/[0.03] p-5 rounded-2xl shadow-2xl flex flex-col justify-between transition-all hover:bg-[#161616] hover:border-white/[0.08] group relative overflow-hidden min-h-[210px] h-full">
      <div className="absolute left-0 top-3 bottom-3 w-[5px] rounded-r-full" style={{ backgroundColor: color }}></div>
      
      <div className="flex justify-between items-start w-full relative z-10 pl-2">
        <div className="space-y-4 pr-2">
          <div className="text-[11px] text-gray-500 font-bold uppercase tracking-[0.1em] group-hover:text-gray-400 transition-colors leading-tight">
            {label}
          </div>
          <div className="text-4xl font-bold text-white font-mono tracking-tight leading-none">
            {value.toLocaleString()}
          </div>
        </div>
        
        <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-black/40 border border-white/[0.05] flex items-center justify-center group-hover:bg-black/60 group-hover:scale-105 transition-all duration-300">
          <span className="text-xl filter drop-shadow-md opacity-70 group-hover:opacity-100" style={{ color }}>{icon}</span>
        </div>
      </div>

      {details && (
        <div className="mt-auto pt-4 grid grid-cols-2 gap-x-4 gap-y-2 pl-2 relative z-10">
          {details.map((d: any, i: number) => (
            <div 
              key={i} 
              className={`flex flex-col min-w-0 cursor-pointer transition-all ${onDetailClick ? (activeCategory.includes(d.name) ? 'opacity-100 scale-105' : 'opacity-40 hover:opacity-100') : 'opacity-80'}`}
              onClick={() => onDetailClick && onDetailClick(d.name)}
            >
               <span className="text-[9px] text-gray-500 font-bold uppercase truncate tracking-tight mb-0.5">{d.name || d.label}</span>
               <span className="text-[13px] text-gray-100 font-mono font-bold tracking-tighter truncate">
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
        <div className="w-1.5 h-3.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]" style={{ backgroundColor: accentColor }}></div>
        <h3 className="text-[12px] font-black text-white uppercase tracking-[0.2em]">{title}</h3>
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

  const offlineRadarData = useMemo(() => {
    return [
      { subject: '视频上传', value: 389, fullMark: 500 },
      { subject: '内容切分', value: 297, fullMark: 500 },
      { subject: '小时切分', value: 220, fullMark: 500 },
    ];
  }, []);

  const top10Data = useMemo(() => {
    return MOCK_TOP10_DATA[activeCategory] || [];
  }, [activeCategory]);

  const ViewerModal = () => {
    if (!inspectChannel) return null;
    const viewers = MOCK_CHANNEL_VIEWERS[inspectChannel] || [];

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
        <div className="bg-[#0f0f0f] border border-white/[0.1] rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
          <div className="p-6 border-b border-white/[0.05] flex justify-between items-center bg-white/[0.02]">
            <div className="flex items-center gap-4">
              <div className="w-2 h-8 rounded-full bg-[#f0a020]"></div>
              <div>
                <h2 className="text-white font-black uppercase text-base tracking-widest">频道访问审计</h2>
                <p className="text-[11px] text-[#f0a020] font-mono mt-1">{inspectChannel}</p>
              </div>
            </div>
            <button onClick={() => setInspectChannel(null)} className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all text-2xl">×</button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[60vh] custom-scrollbar">
            <table className="w-full text-left">
              <thead className="text-[10px] text-gray-600 uppercase tracking-[0.2em] border-b border-white/[0.03]">
                <tr>
                  <th className="pb-4 pl-2">用户标识</th>
                  <th className="pb-4">观看时长</th>
                  <th className="pb-4 text-right pr-2">活跃时间</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02]">
                {viewers.length > 0 ? viewers.map((v, i) => (
                  <tr key={i} className="group hover:bg-white/[0.01]">
                    <td className="py-4 pl-2">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-[#f0a020]/10 flex items-center justify-center text-[11px] font-black text-[#f0a020]">{v.user[0].toUpperCase()}</div>
                        <span className="text-xs text-gray-300 font-bold group-hover:text-white transition-colors">{v.user}</span>
                      </div>
                    </td>
                    <td className="py-4 text-xs font-mono text-emerald-500">{v.duration}</td>
                    <td className="py-4 text-right pr-2 text-[10px] font-mono text-gray-500">{v.time}</td>
                  </tr>
                )) : (
                  <tr><td colSpan={3} className="py-10 text-center text-gray-600 italic text-xs">暂无详细观看记录</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-5 border-t border-white/[0.05] bg-white/[0.01] flex justify-end">
            <button onClick={() => setInspectChannel(null)} className="px-8 py-3 bg-[#f0a020] text-black text-[12px] font-black uppercase tracking-widest rounded-xl shadow-xl hover:brightness-110 active:scale-95 transition-all">确认并关闭</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-[1800px] mx-auto px-4">
      <ViewerModal />
      
      {/* 顶部控制面板 */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-[#0d0d0d] p-4 px-6 rounded-2xl border border-white/[0.05] shadow-2xl backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-8">
          <span className="text-[10px] text-gray-600 font-black uppercase tracking-[0.3em]">时间跨度筛选</span>
          <div className="flex bg-black/60 p-1 rounded-xl border border-white/[0.05] shadow-inner">
            {['24h', '7d', '30d', 'custom'].map((id) => (
              <button
                key={id}
                onClick={() => setTimeFilter(id)}
                className={`px-5 py-2 text-[10px] font-black rounded-lg transition-all ${
                  timeFilter === id ? 'bg-[#f0a020] text-black shadow-lg scale-105' : 'text-gray-500 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                {id === '24h' ? '24小时' : id === '7d' ? '7天' : id === '30d' ? '30天' : '自定义'}
              </button>
            ))}
          </div>

          {timeFilter === 'custom' && (
            <div className="flex items-center gap-3 animate-in slide-in-from-left-3 duration-300">
              <div className="flex items-center bg-black/40 border border-white/[0.05] rounded-xl px-3 py-1.5 focus-within:border-[#f0a020]/40 transition-all">
                <input type="date" className="bg-transparent text-[11px] text-gray-300 outline-none w-32 [color-scheme:dark]" />
                <span className="mx-3 text-gray-600 font-bold text-xs">→</span>
                <input type="date" className="bg-transparent text-[11px] text-gray-300 outline-none w-32 [color-scheme:dark]" />
              </div>
            </div>
          )}
        </div>
        
        <div className="text-[10px] font-mono text-gray-600 bg-white/[0.02] px-4 py-2 rounded-xl border border-white/[0.05] tracking-widest flex items-center gap-2">
           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
           最后统计时间: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* 核心指标统计 - 五列并列排放 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <MetricCard label="活跃用户登录" value={DASHBOARD_OP_METRICS.activeUsers} color={COLORS.info} icon="👤" />
        <MetricCard label="累计采集任务" value={DASHBOARD_OP_METRICS.totalCollections} color={COLORS.warning} icon="☁️" />
        <MetricCard label="预警库配置" value={DASHBOARD_OP_METRICS.totalWarningConfigs} color={COLORS.warning} icon="⚠️" details={WARNING_PREFERENCE_DATA} />
        <MetricCard label="视频观看次数统计" value={12050} color={COLORS.purple} icon="📺" onDetailClick={(p: string) => setActiveCategory(p)} details={VIEWING_STATS_DATA.map(d => ({name: d.name, value: d.value}))} />
        <MetricCard label="离线视频上传" value={850} color={COLORS.orange} icon="📁" details={[{ name: '总数', value: 2000 }]} />
      </div>

      {/* 趋势与占比分析 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 用户登录行为趋势 */}
        <div className="bg-[#0f0f0f] border border-white/[0.05] rounded-3xl p-6 shadow-2xl flex flex-col h-[440px]">
          <SectionHeader title="用户登录行为趋势" accentColor="#3b82f6">
            <div className="flex bg-[#0a0a0a] p-1 rounded-2xl border border-white/[0.03] shadow-inner items-center">
              {[{ id: 'hour', label: '时' }, { id: 'day', label: '天' }, { id: 'week', label: '周' }].map((opt) => (
                <button 
                  key={opt.id} 
                  onClick={() => setLoginGranularity(opt.id as any)} 
                  className={`w-9 h-9 text-[10px] font-black rounded-xl transition-all flex items-center justify-center ${
                    loginGranularity === opt.id 
                      ? 'bg-[#3b82f6] text-white shadow-[0_4px_12px_rgba(59,130,246,0.3)]' 
                      : 'text-gray-600 hover:text-gray-400'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </SectionHeader>
          <div className="flex-1 mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={loginChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs><linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="6 6" stroke="#1a1a1a" vertical={false} />
                <XAxis dataKey="label" stroke="#333" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#333" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  formatter={(value: any) => [`${value} 次`, '登录次数']}
                  contentStyle={{ backgroundColor: '#0d0d0d', border: '1px solid #333', borderRadius: '12px', fontSize: '11px' }} 
                />
                <Area name="登录次数" type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={4} fill="url(#trendGrad)" animationDuration={1500} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#0f0f0f] border border-white/[0.05] rounded-3xl p-6 shadow-2xl flex flex-col h-[440px]">
          <SectionHeader title="功能模块使用分布" accentColor="#f0a020" />
          <div className="flex-1 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={MODULE_USAGE_DISTRIBUTION} cx="50%" cy="50%" innerRadius={65} outerRadius={90} paddingAngle={6} dataKey="value" stroke="none">
                  {MODULE_USAGE_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.9} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0d0d0d', border: '1px solid #333', borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6">
            {MODULE_USAGE_DISTRIBUTION.map((m, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors">
                <div className="w-2.5 h-2.5 rounded-full shadow-lg" style={{ backgroundColor: m.color }}></div>
                <span className="text-[10px] text-gray-500 font-bold truncate">{m.name}</span>
                <span className="ml-auto text-[11px] text-white font-mono font-bold">{m.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0f0f0f] border border-white/[0.05] rounded-3xl p-6 shadow-2xl flex flex-col h-[440px] relative overflow-hidden group">
          <SectionHeader title="AI分析能力使用占比" accentColor="#a855f7" />
          <div className="flex-1 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={AI_ANALYSIS_STATS.map(d => ({ subject: d.name, value: d.value }))}>
                <PolarGrid stroke="#222" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 10, fontWeight: 'bold' }} />
                <Radar name="使用频次" dataKey="value" stroke="#a855f7" fill="#a855f7" fillOpacity={0.35} strokeWidth={3} />
                <Tooltip contentStyle={{ backgroundColor: '#0d0d0d', border: '1px solid #333', borderRadius: '12px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3">
             {AI_ANALYSIS_STATS.map((item, idx) => (
               <div key={idx} className="flex flex-col p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] transition-all">
                  <div className="flex items-center gap-2 mb-1">
                     <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                     <span className="text-[10px] text-gray-500 font-bold uppercase">{item.name}</span>
                  </div>
                  <div className="text-xl font-mono font-black text-white">{item.value.toLocaleString()}</div>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* 中部详情：地域分布 + 离线视频行为画像 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 地图分布 (2/3 Width) */}
        <div className="lg:col-span-2 bg-[#0d0d0d] border border-white/[0.05] rounded-3xl p-8 shadow-2xl overflow-hidden relative min-h-[500px]">
          <SectionHeader title="用户采集频道地域分布" accentColor="#f0a020" />
          <div className="flex flex-col xl:flex-row gap-10 items-stretch h-[420px] mt-4">
             <div className="flex-[3] relative flex items-center justify-center bg-black/20 rounded-2xl border border-white/[0.02] overflow-hidden">
                <svg viewBox="0 0 1000 500" className="w-full h-full opacity-40">
                    <path d="M50,100 Q150,50 250,100 Q300,150 250,400 Q150,450 50,300 Z" fill="#151515" /> 
                    <path d="M450,100 Q550,50 650,100 Q700,150 650,350 Q550,450 450,400 Z" fill="#151515" />
                    <path d="M650,100 Q850,50 950,150 Q1000,250 850,400 Q750,450 650,350 Z" fill="#151515" />
                    <circle cx="150" cy="180" r="12" fill="#ff4d2f" className="animate-pulse shadow-[0_0_15px_#ff4d2f]" />
                    <circle cx="750" cy="150" r="10" fill="#3b82f6" />
                    <circle cx="550" cy="250" r="8" fill="#f0a020" />
                    <circle cx="820" cy="380" r="14" fill="#3b82f6" className="animate-pulse" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f0a020]/10 to-transparent h-32 w-full animate-[scan_8s_linear_infinite] pointer-events-none"></div>
                <div className="absolute left-8 bottom-10 flex flex-col items-center gap-2 p-3 rounded-2xl bg-black/50 border border-white/5 backdrop-blur-md">
                    <span className="text-[10px] text-gray-400 font-black">HIGH</span>
                    <div className="w-3 h-32 rounded-full bg-gradient-to-t from-blue-600 via-yellow-500 to-red-600 border border-white/10"></div>
                    <span className="text-[10px] text-gray-400 font-black">LOW</span>
                </div>
             </div>
             <div className="flex-[2] flex flex-col bg-black/30 p-5 rounded-2xl border border-white/5">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={GEO_DISTRIBUTION_DATA} layout="vertical" margin={{ left: 10, right: 40, top: 0, bottom: 0 }}>
                        <defs><linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#3b82f6" /><stop offset="50%" stopColor="#f0a020" /><stop offset="100%" stopColor="#ef4444" /></linearGradient></defs>
                        <XAxis type="number" hide domain={[0, 100]} />
                        <YAxis dataKey="name" type="category" stroke="#666" fontSize={10} axisLine={false} tickLine={false} width={110} tick={{ fill: '#999', fontWeight: 700 }} />
                        <Tooltip cursor={{fill: 'rgba(255,255,255,0.03)'}} contentStyle={{ backgroundColor: '#0d0d0d', border: '1px solid #333', borderRadius: '12px' }} />
                        <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={22} label={{ position: 'right', fill: '#bbb', fontSize: 11, fontWeight: 'bold' }}>
                            {GEO_DISTRIBUTION_DATA.map((entry, index) => <Cell key={`cell-${index}`} fill="url(#barGrad)" />)}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>

        {/* 离线视频行为画像 (1/3 Width) */}
        <div className="bg-[#0f0f0f] border border-white/[0.05] rounded-3xl p-8 shadow-2xl flex flex-col min-h-[500px] h-full overflow-hidden relative group">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-5 bg-[#a855f7] rounded-full"></div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest">离线视频行为画像</h3>
          </div>

          <div className="flex-1 h-[200px] mb-8 relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={offlineRadarData}>
                <PolarGrid stroke="#222" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#777', fontSize: 10, fontWeight: '700' }} />
                <Radar name="行为指标" dataKey="value" stroke="#a855f7" fill="#a855f7" fillOpacity={0.4} strokeWidth={3} />
                <Tooltip contentStyle={{ backgroundColor: '#0d0d0d', border: '1px solid #333', borderRadius: '12px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest">近7天上传量分布</span>
              <span className="text-[9px] text-gray-700 font-mono tracking-widest">7-DAY DIST.</span>
            </div>
            <div className="h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={OFFLINE_BEHAVIOR_TREND}>
                  <Bar dataKey="upload" fill="#a855f7" radius={[4, 4, 0, 0]} barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-8">
            <div className="bg-[#0a0a0a] border border-white/[0.05] p-3 rounded-2xl flex flex-col items-center justify-center space-y-2 group/card hover:bg-black/80 transition-all">
              <span className="text-[9px] text-gray-500 font-black uppercase tracking-tighter">视频上传</span>
              <span className="text-lg font-mono font-black text-white group-hover/card:scale-110 transition-transform">389</span>
            </div>
            <div className="bg-[#0a0a0a] border border-white/[0.05] p-3 rounded-2xl flex flex-col items-center justify-center space-y-2 group/card hover:bg-black/80 transition-all">
              <span className="text-[9px] text-gray-500 font-black uppercase tracking-tighter">小时切分</span>
              <span className="text-lg font-mono font-black text-[#10b981] group-hover/card:scale-110 transition-transform">297</span>
            </div>
            <div className="bg-[#0a0a0a] border border-white/[0.05] p-3 rounded-2xl flex flex-col items-center justify-center space-y-2 group/card hover:bg-black/80 transition-all">
              <span className="text-[9px] text-gray-500 font-black uppercase tracking-tighter">内容切分</span>
              <span className="text-lg font-mono font-black text-[#3b82f6] group-hover/card:scale-110 transition-transform">110</span>
            </div>
          </div>
        </div>
      </div>

      {/* 底部：用户视频观看统计 和 TOP 10 联动 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：观看统计图表 */}
        <div className="bg-[#0f0f0f] border border-white/[0.05] rounded-3xl p-6 shadow-2xl flex flex-col h-[520px]">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-5 bg-[#ef4444] rounded-full"></div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest">用户视频观看统计</h3>
          </div>
          
          <div className="flex-1 min-h-[250px] mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={VIEWING_STATS_DATA} layout="vertical" margin={{ left: -10, right: 20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#555" fontSize={10} axisLine={false} tickLine={false} width={80} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#0d0d0d', border: '1px solid #333', borderRadius: '12px' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24} onClick={(data) => data && setActiveCategory(data.name)}>
                  {VIEWING_STATS_DATA.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      style={{ filter: activeCategory === entry.name ? `drop-shadow(0 0 8px ${entry.color}80)` : 'none' }}
                      className="cursor-pointer transition-all duration-300"
                      fillOpacity={activeCategory === entry.name ? 1 : 0.5}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {VIEWING_STATS_DATA.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => setActiveCategory(item.name)}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${activeCategory === item.name ? 'bg-white/[0.05] border-white/20' : 'bg-transparent border-transparent opacity-60 hover:opacity-100'}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }}></div>
                  <span className="text-[10px] text-gray-200 font-bold uppercase tracking-wider">{item.name}</span>
                </div>
                <span className="text-[11px] font-mono text-gray-500">{item.value.toLocaleString()}次</span>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧：播放排行榜 */}
        <div className="lg:col-span-2 bg-[#0f0f0f] border border-white/[0.05] rounded-3xl p-6 shadow-2xl flex flex-col h-[520px] overflow-hidden">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-5 bg-[#ef4444] rounded-full"></div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest">
              <span className="text-blue-500 mr-2">{activeCategory.toUpperCase()}</span> 播放 TOP 10
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <table className="w-full text-left">
              <thead className="border-b border-white/[0.05] text-[10px] text-gray-600 uppercase tracking-widest sticky top-0 bg-[#0f0f0f] z-10">
                <tr>
                  <th className="pb-4 pl-4 w-20">排名</th>
                  <th className="pb-4">资源/频道名称</th>
                  <th className="pb-4">访问频次</th>
                  <th className="pb-4">累计时长</th>
                  <th className="pb-4 text-right pr-4">详情</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02]">
                {top10Data.length > 0 ? top10Data.map((item, idx) => (
                  <tr key={idx} onClick={() => setInspectChannel(item.name)} className="hover:bg-white/[0.02] cursor-pointer group transition-all duration-200">
                    <td className="py-5 pl-4">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-black transition-all ${idx < 3 ? 'bg-white/[0.08] text-white shadow-lg' : 'text-gray-600'}`}>
                        {idx + 1}
                      </div>
                    </td>
                    <td className="py-5">
                      <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">{item.name}</span>
                    </td>
                    <td className="py-5">
                      <span className="text-xs font-mono text-gray-500 group-hover:text-gray-300">{item.value}</span>
                    </td>
                    <td className="py-5">
                      <span className="text-xs font-mono text-gray-500 group-hover:text-gray-300">{item.duration}</span>
                    </td>
                    <td className="py-5 text-right pr-4">
                      <div className="flex justify-end opacity-20 group-hover:opacity-100 transition-opacity">
                         <span className="text-gray-400 hover:text-white">👁️</span>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="py-20 text-center text-gray-600 text-xs italic">暂无排行榜数据</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(500px); } }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.1); }
      `}</style>
    </div>
  );
};

export default UserBehavior;
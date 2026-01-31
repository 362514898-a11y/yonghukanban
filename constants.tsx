
import { CollectionStatus, WarningType, BehaviorCategory, MediaChannel, WarningEvent, RecognitionTarget, UserActivityLog, UserViewingStats, ChannelViewingMetric } from './types';

export const COLORS = {
  primary: '#f0a020',
  background: '#0a0a0a',
  card: '#141414',
  border: '#262626',
  textMuted: '#9ca3af',
  success: '#10b981',
  danger: '#ef4444',
  info: '#3b82f6',
  warning: '#eab308',
  purple: '#a855f7',
  orange: '#f97316'
};

export const DASHBOARD_OP_METRICS = {
  activeUsers: 9,
  totalVisits: 1920,
  totalCollections: 465,
  totalWarningConfigs: 3647,
  totalReports: 1411
};

export const TREND_DATA = [
  { time: '00:00', deployments: 10, actions: 5 },
  { time: '04:00', deployments: 5, actions: 2 },
  { time: '08:00', deployments: 20, actions: 15 },
  { time: '12:00', deployments: 45, actions: 40 },
  { time: '16:00', deployments: 35, actions: 30 },
  { time: '20:00', deployments: 25, actions: 20 },
  { time: '23:59', deployments: 15, actions: 12 },
];

export const MODULE_USAGE_DISTRIBUTION = [
  { name: '采集管理', value: 25, color: '#3b82f6' },
  { name: '媒体分析', value: 20, color: '#10b981' },
  { name: '预警配置', value: 15, color: '#f0a020' },
  { name: '预警列表', value: 18, color: '#ef4444' },
  { name: '搜索', value: 12, color: '#a855f7' },
  { name: '报告中心', value: 10, color: '#0ea5e9' },
];

export const AI_ANALYSIS_STATS = [
  { name: '转录文本', value: 1551, color: '#3b82f6' },
  { name: '标签', value: 1061, color: '#10b981' },
  { name: 'OCR', value: 1750, color: '#f0a020' },
  { name: '摘要', value: 915, color: '#a855f7' },
];

// 地域分布数据 - Updated to match the reference image
export const GEO_DISTRIBUTION_DATA = [
  { name: '美国', value: 91 },
  { name: '阿联酋', value: 71 },
  { name: '沙特阿拉伯', value: 64 },
  { name: '以色列', value: 60 },
  { name: '卡塔尔', value: 59 },
  { name: '英国', value: 54 },
  { name: '科威特', value: 51 },
  { name: '中国', value: 50 },
  { name: '日本', value: 38 },
  { name: '德国', value: 35 },
];

export const VISIT_TIME_DISTRIBUTION = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  value: i < 8 ? Math.floor(Math.random() * 5) : i < 18 ? 20 + Math.floor(Math.random() * 15) : 5 + Math.floor(Math.random() * 10)
}));

export const LOGIN_DAILY_DATA = [
  { label: '1月1日', value: 12 }, { label: '1月2日', value: 18 }, { label: '1月3日', value: 15 },
  { label: '1月4日', value: 22 }, { label: '1月5日', value: 30 }, { label: '1月6日', value: 28 },
  { label: '1月7日', value: 35 }, { label: '1月8日', value: 42 }, { label: '1月9日', value: 38 },
  { label: '1月10日', value: 45 },
];

export const LOGIN_WEEKLY_DATA = [
  { label: '第1周', value: 120 }, { label: '第2周', value: 150 }, { label: '第3周', value: 180 },
  { label: '第4周', value: 210 }, { label: '第5周', value: 190 }, { label: '第6周', value: 230 },
  { label: '第7周', value: 250 }, { label: '第8周', value: 280 },
];

export const WARNING_PREFERENCE_DATA = [
  { name: '人脸', value: 1450 },
  { name: '地标', value: 890 },
  { name: '关键词', value: 1307 },
];

export const VIEWING_STATS_DATA = [
  { name: 'YouTube在线', value: 4250, color: '#ff0000' },
  { name: 'YouTube离线', value: 1840, color: '#e53935' },
  { name: 'IPTV', value: 2840, color: '#3b82f6' },
  { name: '离线视频', value: 3120, color: '#a855f7' },
];

export const OFFLINE_BEHAVIOR_TREND = [
  { date: '01-01', upload: 45, contentSplit: 32, hourSplit: 12 },
  { date: '01-02', upload: 52, contentSplit: 41, hourSplit: 18 },
  { date: '01-03', upload: 48, contentSplit: 38, hourSplit: 15 },
  { date: '01-04', upload: 70, contentSplit: 55, hourSplit: 22 },
  { date: '01-05', upload: 61, contentSplit: 48, hourSplit: 19 },
  { date: '01-06', upload: 55, contentSplit: 44, hourSplit: 17 },
  { date: '01-07', upload: 42, contentSplit: 33, hourSplit: 14 },
];

export const OFFLINE_UPLOAD_TREND = [
  { date: '01-01', count: 45 }, { date: '01-02', count: 52 }, { date: '01-03', count: 48 },
  { date: '01-04', count: 70 }, { date: '01-05', count: 61 }, { date: '01-06', count: 55 },
  { date: '01-07', count: 42 },
];

export const MOCK_TOP10_DATA: Record<string, Array<{name: string, value: string, duration: string}>> = {
  'YouTube在线': [
    { name: 'Sky News Live', value: '842次', duration: '124h' },
    { name: 'Al Jazeera Arabic', value: '712次', duration: '98h' },
    { name: 'NBC News Now', value: '654次', duration: '82h' },
    { name: 'CNA 24/7 Live', value: '523次', duration: '75h' },
    { name: 'DW News', value: '489次', duration: '64h' },
  ],
  'YouTube离线': [
    { name: 'Documentary: Space', value: '312次', duration: '45h' },
    { name: 'Interview: Tech CEO', value: '245次', duration: '32h' },
    { name: 'News Archive Dec', value: '188次', duration: '28h' },
    { name: 'Tutorial: AI Model', value: '156次', duration: '22h' },
    { name: 'Short Film: Neon', value: '98次', duration: '15h' },
  ],
  'IPTV': [
    { name: 'CCTV-13 新闻', value: '945次', duration: '156h' },
    { name: 'CNN International', value: '812次', duration: '112h' },
    { name: 'BBC World News', value: '788次', duration: '105h' },
    { name: 'NHK World Japan', value: '654次', duration: '88h' },
    { name: '凤凰卫视资讯台', value: '488次', duration: '68h' },
  ],
  '离线视频': [
    { name: 'Local_Security_A1', value: '542次', duration: '180h' },
    { name: 'Drone_Footage_Paris', value: '423次', duration: '112h' },
    { name: 'Archive_2025_Q4', value: '311次', duration: '88h' },
    { name: 'Traffic_Monitor_HK', value: '215次', duration: '64h' },
    { name: 'Border_Cam_South', value: '187次', duration: '45h' },
  ]
};

export const MOCK_CHANNEL_VIEWERS: Record<string, Array<{ user: string, duration: string, time: string, device: string }>> = {
  'Sky News Live': [
    { user: 'admin', duration: '45m', time: '10:12:05', device: 'Desktop' },
    { user: 'operator_01', duration: '1h 12m', time: '09:45:30', device: 'Web' },
    { user: 'viewer_23', duration: '15m', time: '11:20:12', device: 'Mobile' },
  ],
  'CCTV-13 新闻': [
    { user: 'admin', duration: '2h 15m', time: '08:30:00', device: 'Desktop' },
    { user: 'analyst_05', duration: '35m', time: '14:22:18', device: 'Pad' },
    { user: 'operator_02', duration: '55m', time: '16:10:45', device: 'Web' },
  ]
};

export const MOCK_TARGETS: RecognitionTarget[] = [
  { id: 1, name: 'Zendaya' },
  { id: 2, name: 'Tom Holland' },
  { id: 3, name: 'Elon Musk' },
];

export const MOCK_VIEWING_STATS: UserViewingStats[] = [
  { userId: '001', userName: 'admin', isOnline: true, currentSessionDuration: '02:45:12', totalDurationToday: '06h 12m', lastActiveTime: '刚刚', deviceType: 'Desktop' },
  { userId: '002', userName: 'operator_01', isOnline: true, currentSessionDuration: '00:12:45', totalDurationToday: '04h 30m', lastActiveTime: '刚刚', deviceType: 'Mobile' },
];

export const MOCK_LOGS: UserActivityLog[] = [
  { id: 1, user: 'admin', action: '下发[NBCNews]采集任务', module: '媒体中心', category: BehaviorCategory.TASK_DEPLOY, time: '2026-01-09 18:45:01', status: 'success', ip: '192.168.1.102' },
];

export const MOCK_CHANNELS: MediaChannel[] = [
  { id: 1, name: 'NBC News Live', url: 'https://www.youtube.com/watch?v=abc', platform: 'YouTube', status: CollectionStatus.COLLECTING, lastCollection: '2026-01-09 18:45:01' },
  { id: 2, name: 'Al Jazeera Arabic', url: 'https://www.aljazeera.net/live', platform: 'Other News', status: CollectionStatus.COLLECTING, lastCollection: '2026-01-09 18:40:12' },
];

export const MOCK_WARNINGS: WarningEvent[] = [
  { id: 1, targetName: 'Target A', type: WarningType.FACE, isLive: true, explanation: 'Detected high-value target in live stream', imageUrl: 'https://picsum.photos/seed/alert1/100/100', warningTime: '2026-01-09 18:42:00', status: 'unread' },
];

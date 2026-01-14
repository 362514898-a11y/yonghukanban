
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
  radio: '#8b5cf6',
  youtube: '#ff0000',
  offline: '#6b7280',
  login: '#3b82f6',
  landmark: '#3b82f6',
  keyword: '#a855f7',
  news: '#10b981'
};

// 媒体源状态数据
export const MEDIA_SOURCE_STATUS_DATA = {
  radio: { online: 42, offline: 18, total: 60 },
  youtube: { online: 125, offline: 45, total: 170 }
};

// 看板核心运营指标
export const DASHBOARD_OP_METRICS = {
  onlineLiveViews: 1245,        // 在线直播观看数
  collectionAccounts: 86,      // 采集账号总数
  onlineVideoTotal: 5821,      // 在线视频采集总数
  offlineVideoUploads: 412,    // 离线视频上传数
  totalLogins: 248             // 登录统计
};

// 视频采集效能统计
export const COLLECTION_OPERATION_STATS = {
  totalCaptured: 14520,
  successRate: '99.2%',
  dailyVolume: '+1,240',
  processingSpeed: '2.4s/clip'
};

// 预警分类模拟数据
export const WARNING_CATEGORY_STATS = [
  { id: 'face', category: '人脸识别', new: 124, matched: 86, color: COLORS.primary },
  { id: 'landmark', category: '地标识别', new: 45, matched: 32, color: COLORS.landmark },
  { id: 'keyword', category: '关键词检测', new: 210, matched: 145, color: COLORS.keyword },
  { id: 'news', category: '新闻播报', new: 88, matched: 54, color: COLORS.news },
];

export const WARNING_DETAILS_MOCK: Record<string, { summary: any, topUsers: any[], hits: any[] }> = {
  face: {
    summary: { totalTargets: 1420, totalHits: 8521, avgConfidence: '94.2%', dailyGrowth: '+5.2%' },
    topUsers: [
      { name: 'admin', count: 142, ratio: 95, color: '#f0a020' },
      { name: 'operator_01', count: 98, ratio: 70, color: '#3b82f6' },
      { name: 'analyst_sky', count: 76, ratio: 55, color: '#10b981' },
      { name: 'operator_02', count: 45, ratio: 35, color: '#ef4444' },
      { name: 'guest_04', count: 22, ratio: 15, color: '#6b7280' },
    ],
    hits: [
      { time: '18:45:12', result: 'Zendaya', confidence: '98%', source: 'NBC News' },
      { time: '18:30:05', result: 'Chris Evans', confidence: '92%', source: 'Sky News' },
      { time: '17:44:40', result: 'Zendaya', confidence: '99%', source: 'YouTube Live' },
    ]
  },
  landmark: {
    summary: { totalTargets: 450, totalHits: 1240, avgConfidence: '88.5%', dailyGrowth: '+1.8%' },
    topUsers: [
      { name: 'analyst_geo', count: 54, ratio: 85, color: '#3b82f6' },
      { name: 'admin', count: 32, ratio: 55, color: '#f0a020' },
      { name: 'operator_01', count: 28, ratio: 45, color: '#10b981' },
      { name: 'field_agent', count: 15, ratio: 25, color: '#8b5cf6' },
      { name: 'guest_01', count: 4, ratio: 5, color: '#6b7280' },
    ],
    hits: [
      { time: '17:42:00', result: 'Yellowstone Park', confidence: '85%', source: 'Discovery' },
      { time: '16:15:33', result: 'Eiffel Tower', confidence: '91%', source: 'Travel Channel' },
    ]
  },
  keyword: {
    summary: { totalTargets: 850, totalHits: 12450, avgConfidence: '100%', dailyGrowth: '+12.5%' },
    topUsers: [
      { name: 'threat_analyst', count: 412, ratio: 90, color: '#ef4444' },
      { name: 'admin', count: 235, ratio: 60, color: '#f0a020' },
      { name: 'operator_01', count: 188, ratio: 45, color: '#10b981' },
      { name: 'operator_02', count: 90, ratio: 25, color: '#3b82f6' },
      { name: 'monitor_04', count: 45, ratio: 10, color: '#6b7280' },
    ],
    hits: [
      { time: '19:02:11', result: 'SpaceX', confidence: '100%', source: 'TechCrunch' },
      { time: '18:55:00', result: 'Cybersecurity', confidence: '100%', source: 'BBC' },
    ]
  },
  news: {
    summary: { totalTargets: 12, totalHits: 450, avgConfidence: '91.0%', dailyGrowth: '+0.4%' },
    topUsers: [
      { name: 'news_desk', count: 120, ratio: 80, color: '#10b981' },
      { name: 'admin', count: 85, ratio: 60, color: '#f0a020' },
      { name: 'operator_01', count: 42, ratio: 35, color: '#3b82f6' },
      { name: 'guest_media', count: 12, ratio: 15, color: '#8b5cf6' },
      { name: 'monitor_01', count: 8, ratio: 10, color: '#6b7280' },
    ],
    hits: [
      { time: '19:10:00', result: 'Breaking News Intro', confidence: '94%', source: 'Fox News' },
      { time: '18:05:22', result: 'Studio Report', confidence: '88%', source: 'Al Jazeera' },
    ]
  }
};

export const MOCK_TOP_CHANNELS: ChannelViewingMetric[] = [
  { channelName: 'BBC Radio 1 (Live)', category: 'RADIO', source: 'ONLINE_LIVE', viewCount: 1250, durationMinutes: 4500, percentage: 35 },
  { channelName: 'NBC News YouTube (Live)', category: 'YOUTUBE', source: 'ONLINE_LIVE', viewCount: 840, durationMinutes: 3200, percentage: 25 },
  { channelName: 'Tech Reviews Archive', category: 'YOUTUBE', source: 'OFFLINE_VIDEO', viewCount: 620, durationMinutes: 2100, percentage: 18 },
  { channelName: 'Sky News (Live)', category: 'YOUTUBE', source: 'ONLINE_LIVE', viewCount: 450, durationMinutes: 1800, percentage: 12 },
  { channelName: 'Local Intelligence Feed', category: 'LOCAL', source: 'OFFLINE_VIDEO', viewCount: 310, durationMinutes: 1200, percentage: 10 },
];

export const LOGIN_TREND_DATA = [
  { time: '08:00', logins: 12 },
  { time: '10:00', logins: 45 },
  { time: '12:00', logins: 28 },
  { time: '14:00', logins: 65 },
  { time: '16:00', logins: 88 },
  { time: '18:00', logins: 42 },
  { time: '20:00', logins: 15 },
];

export const MOCK_VIEWING_STATS: UserViewingStats[] = [
  { userId: '001', userName: 'admin', isOnline: true, currentSessionDuration: '02:45:12', totalDurationToday: '06h 12m', lastActiveTime: '刚刚', deviceType: 'Desktop', currentViewing: { channel: 'BBC Radio 1', source: 'ONLINE_LIVE' } },
  { userId: '002', userName: 'operator_01', isOnline: true, currentSessionDuration: '00:12:45', totalDurationToday: '04h 30m', lastActiveTime: '刚刚', deviceType: 'Mobile', currentViewing: { channel: 'NBC News', source: 'ONLINE_LIVE' } },
  { userId: '003', userName: 'analyst_sky', isOnline: false, currentSessionDuration: '--', totalDurationToday: '02h 15m', lastActiveTime: '15分钟前', deviceType: 'Desktop' },
  { userId: '004', userName: 'operator_02', isOnline: true, currentSessionDuration: '01:20:05', totalDurationToday: '03h 50m', lastActiveTime: '刚刚', deviceType: 'Tablet', currentViewing: { channel: 'Archive_024', source: 'OFFLINE_VIDEO' } },
  { userId: '005', userName: 'guest_user', isOnline: false, currentSessionDuration: '--', totalDurationToday: '00h 45m', lastActiveTime: '2小时前', deviceType: 'Desktop' },
];

export const MOCK_CHANNELS: MediaChannel[] = [
  { id: 1, name: 'NBCNews', url: 'https://youtube.com/@NBCNews', platform: 'youtube', status: CollectionStatus.STOPPED, lastCollection: '2026-01-06 10:45:26' },
  { id: 2, name: 'aljazeera', url: 'https://youtube.com/@aljazeera', platform: 'youtube', status: CollectionStatus.COLLECTING, lastCollection: '2026-01-06 10:45:35' },
  { id: 3, name: 'SkyNews', url: 'https://youtube.com/@SkyNews', platform: 'youtube', status: CollectionStatus.COLLECTING, lastCollection: '2026-01-06 18:28:08' },
  { id: 4, name: 'CNN', url: 'https://youtube.com/@CNN', platform: 'youtube', status: CollectionStatus.STOPPED, lastCollection: '--' },
];

export const MOCK_WARNINGS: WarningEvent[] = [
  { id: 1, targetName: 'zln', type: WarningType.FACE, isLive: true, explanation: '', imageUrl: 'https://picsum.photos/80/45?random=1', warningTime: '2026-01-09 17:44:40', status: 'unread' },
  { id: 2, targetName: 'Yellowstone National Park', type: WarningType.LANDMARK, isLive: true, explanation: 'Yellowstone National Park', imageUrl: 'https://picsum.photos/80/45?random=2', warningTime: '2026-01-09 17:42:00', status: 'unread' },
  { id: 3, targetName: 'Chris Evans', type: WarningType.FACE, isLive: true, explanation: '', imageUrl: 'https://picsum.photos/80/45?random=3', warningTime: '2026-01-09 17:31:50', status: 'unread' },
];

export const TREND_DATA = [
  { time: '09:00', warnings: 12, actions: 80, deployments: 5 },
  { time: '11:00', warnings: 18, actions: 150, deployments: 12 },
  { time: '13:00', warnings: 8, actions: 90, deployments: 8 },
  { time: '15:00', warnings: 25, actions: 210, deployments: 20 },
  { time: '17:00', warnings: 42, actions: 340, deployments: 15 },
  { time: '19:00', warnings: 31, actions: 260, deployments: 10 },
];

export const MOCK_LOGS: UserActivityLog[] = [
  { id: 1, user: 'admin', action: '下发[NBCNews]采集任务', module: '媒体中心', category: BehaviorCategory.TASK_DEPLOY, time: '2026-01-09 18:45:01', status: 'success', ip: '192.168.1.102' },
  { id: 2, user: 'admin', action: '修改[人脸识别]置信度阈值 (0.8 -> 0.9)', module: '参数设置', category: BehaviorCategory.CONFIG_UPDATE, time: '2026-01-09 18:42:15', status: 'success', ip: '192.168.1.102' },
  { id: 3, user: 'operator_01', action: '批量下发24个采集信道', module: '媒体中心', category: BehaviorCategory.TASK_DEPLOY, time: '2026-01-09 18:30:44', status: 'success', ip: '192.168.1.145' },
  { id: 4, user: 'analyst_sky', action: '处理[zln]预警事件', module: '预警中心', category: BehaviorCategory.WARNING_TRIGGER, time: '2026-01-09 18:15:22', status: 'success', ip: '10.0.4.12', responseTime: 145 },
  { id: 5, user: 'admin', action: '更新[系统全局]配置参数', module: '系统管理', category: BehaviorCategory.CONFIG_UPDATE, time: '2026-01-09 17:55:10', status: 'success', ip: '192.168.1.102' },
  { id: 6, user: 'operator_02', action: '触发[系统自检]预警测试', module: '预警中心', category: BehaviorCategory.WARNING_TRIGGER, time: '2026-01-09 17:40:00', status: 'failed', ip: '172.16.0.5' },
];

export const MOCK_TARGETS: RecognitionTarget[] = [
  { id: 1, name: 'Zendaya' },
  { id: 2, name: 'Tom Holland' },
  { id: 3, name: 'Benedict Cumberbatch' },
];

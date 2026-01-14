
export enum CollectionStatus {
  COLLECTING = '正在采集',
  STOPPED = '已停止',
  ERROR = '采集异常'
}

export enum WarningType {
  FACE = '人脸',
  LANDMARK = '地标',
  KEYWORD = '关键词',
  NEWS = '新闻播报'
}

export enum BehaviorCategory {
  TASK_DEPLOY = '任务下发',
  WARNING_TRIGGER = '预警触发',
  CONFIG_UPDATE = '系统设置',
  DATA_QUERY = '数据检索',
  VIEWING_SESSION = '观看审计'
}

export type ViewingSource = 'ONLINE_LIVE' | 'OFFLINE_VIDEO';
export type MediaCategory = 'RADIO' | 'YOUTUBE' | 'LOCAL';

export interface ChannelViewingMetric {
  channelName: string;
  category: MediaCategory;
  source: ViewingSource;
  viewCount: number;
  durationMinutes: number;
  percentage: number;
}

export interface UserViewingStats {
  userId: string;
  userName: string;
  isOnline: boolean;
  currentSessionDuration: string;
  totalDurationToday: string;
  lastActiveTime: string;
  deviceType: string;
  currentViewing?: {
    channel: string;
    source: ViewingSource;
  };
}

export interface MediaChannel {
  id: number;
  name: string;
  url: string;
  platform: string;
  status: CollectionStatus;
  lastCollection: string;
}

export interface WarningEvent {
  id: number;
  targetName: string;
  type: WarningType;
  isLive: boolean;
  explanation: string;
  imageUrl: string;
  warningTime: string;
  status: 'read' | 'unread';
}

export interface UserActivityLog {
  id: number;
  user: string;
  action: string;
  module: string;
  category: BehaviorCategory;
  time: string;
  status: 'success' | 'failed';
  ip: string;
  responseTime?: number;
}

export interface ModuleUsage {
  name: string;
  visits: number;
  duration: string;
}

export interface RecognitionTarget {
  id: number;
  name: string;
}

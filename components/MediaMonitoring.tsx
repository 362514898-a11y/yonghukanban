
import React from 'react';
import { MOCK_CHANNELS } from '../constants';

const MediaMonitoring: React.FC = () => {
  return (
    <div className="bg-[#141414] rounded-lg border border-[#262626] overflow-hidden">
      <div className="p-4 border-b border-[#262626] bg-[#0d0d0d]">
        <h2 className="text-lg font-bold text-white mb-4">互联网音视频频道监控</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input type="text" placeholder="频道名称/链接" className="bg-[#1f1f1f] border border-[#262626] px-3 py-2 rounded text-sm outline-none focus:border-[#f0a020]" />
          <select className="bg-[#1f1f1f] border border-[#262626] px-3 py-2 rounded text-sm outline-none">
            <option>平台类型 (全部)</option>
            <option>YouTube</option>
            <option>Facebook</option>
          </select>
          <select className="bg-[#1f1f1f] border border-[#262626] px-3 py-2 rounded text-sm outline-none">
            <option>频道类型 (全部)</option>
            <option>视频</option>
            <option>音频</option>
          </select>
          <div className="flex gap-2">
             <button className="flex-1 bg-[#f0a020] text-black font-bold py-2 rounded text-sm">查询</button>
             <button className="px-4 py-2 bg-[#1f1f1f] border border-[#262626] rounded text-sm">重置</button>
          </div>
        </div>
      </div>

      <div className="p-4 flex gap-2">
        <button className="bg-[#f0a020] text-black px-3 py-1 rounded text-xs font-bold">+ 新增采集</button>
        <button className="bg-[#262626] text-gray-400 px-3 py-1 rounded text-xs">批量下发</button>
        <button className="bg-[#262626] text-gray-400 px-3 py-1 rounded text-xs">批量删除</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-[#1c1c1c] text-gray-500 border-y border-[#262626]">
            <tr>
              <th className="p-3"><input type="checkbox" /></th>
              <th className="p-3">序号</th>
              <th className="p-3">频道名称</th>
              <th className="p-3">频道链接</th>
              <th className="p-3">平台</th>
              <th className="p-3">状态</th>
              <th className="p-3">最近采集时间</th>
              <th className="p-3">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#262626]">
            {MOCK_CHANNELS.map((ch, idx) => (
              <tr key={ch.id} className="hover:bg-[#1c1c1c]">
                <td className="p-3"><input type="checkbox" /></td>
                <td className="p-3">{idx + 1}</td>
                <td className="p-3 font-medium text-white">{ch.name}</td>
                <td className="p-3 text-blue-400 underline truncate max-w-[200px]">{ch.url}</td>
                <td className="p-3 uppercase">{ch.platform}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] ${ch.status.includes('采集') ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'}`}>
                    {ch.status}
                  </span>
                </td>
                <td className="p-3 text-gray-500">{ch.lastCollection}</td>
                <td className="p-3 flex gap-2">
                   <button className="text-[#f0a020]">▶</button>
                   <button className="text-gray-500">⚙</button>
                   <button className="text-red-500">✖</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MediaMonitoring;

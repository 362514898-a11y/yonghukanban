
import React from 'react';
import { MOCK_WARNINGS } from '../constants';

const WarningCenter: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="bg-[#141414] p-4 rounded-lg border border-[#262626]">
        <h2 className="text-lg font-bold text-white mb-4">实时预警中心</h2>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
             <label className="block text-[10px] text-gray-500 mb-1 uppercase">预警类型</label>
             <select className="w-full bg-[#1f1f1f] border border-[#262626] px-3 py-1.5 rounded text-sm outline-none">
               <option>全部</option>
               <option>人脸</option>
               <option>地标</option>
             </select>
          </div>
          <div className="flex-1 min-w-[200px]">
             <label className="block text-[10px] text-gray-500 mb-1 uppercase">关键词搜索</label>
             <input type="text" placeholder="输入目标名称..." className="w-full bg-[#1f1f1f] border border-[#262626] px-3 py-1.5 rounded text-sm outline-none focus:border-[#f0a020]" />
          </div>
          <div className="flex-1 min-w-[200px]">
             <label className="block text-[10px] text-gray-500 mb-1 uppercase">时间范围</label>
             <input type="date" className="w-full bg-[#1f1f1f] border border-[#262626] px-3 py-1.5 rounded text-sm outline-none" />
          </div>
          <div className="flex items-end gap-2">
            <button className="bg-[#f0a020] text-black font-bold px-6 py-1.5 rounded text-sm h-[34px]">查询</button>
            <button className="bg-[#262626] text-white px-6 py-1.5 rounded text-sm h-[34px]">导出</button>
          </div>
        </div>
      </div>

      <div className="bg-[#141414] rounded-lg border border-[#262626] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-[#1c1c1c] text-gray-400 uppercase tracking-tighter border-b border-[#262626]">
              <tr>
                <th className="p-4 border-r border-[#262626]/50">序号</th>
                <th className="p-4 border-r border-[#262626]/50">目标名称</th>
                <th className="p-4 border-r border-[#262626]/50">类型</th>
                <th className="p-4 border-r border-[#262626]/50">实时</th>
                <th className="p-4 border-r border-[#262626]/50">解释说明</th>
                <th className="p-4 border-r border-[#262626]/50 text-center">预警图像</th>
                <th className="p-4 border-r border-[#262626]/50">触发时间</th>
                <th className="p-4 border-r border-[#262626]/50">状态</th>
                <th className="p-4">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262626]">
              {MOCK_WARNINGS.concat(MOCK_WARNINGS).map((item, idx) => (
                <tr key={idx} className="hover:bg-[#1a1a1a] transition-colors group">
                  <td className="p-4 text-gray-500 font-mono">{idx + 1}</td>
                  <td className="p-4 font-bold text-white">{item.targetName}</td>
                  <td className="p-4">{item.type}</td>
                  <td className="p-4">
                    {item.isLive ? <span className="text-red-500 font-bold px-1 bg-red-500/10 rounded">LIVE</span> : '--'}
                  </td>
                  <td className="p-4 text-gray-400 text-[10px] italic">{item.explanation || '- 无 -'}</td>
                  <td className="p-4 text-center">
                    <div className="inline-block relative overflow-hidden rounded shadow-lg border border-[#262626]">
                      <img src={item.imageUrl} alt="alert" className="w-16 h-10 object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                         <span className="text-[8px] text-white">查看</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-400 font-mono text-[10px]">{item.warningTime}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] border ${item.status === 'unread' ? 'border-red-500/50 text-red-500 bg-red-500/5' : 'border-gray-500/50 text-gray-500'}`}>
                      {item.status === 'unread' ? '未读' : '已读'}
                    </span>
                  </td>
                  <td className="p-4 flex gap-3 text-lg">
                    <button className="text-[#f0a020] hover:scale-125 transition-transform" title="追踪">📍</button>
                    <button className="text-red-600 hover:scale-125 transition-transform" title="删除">🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 flex justify-between items-center text-xs text-gray-500 bg-[#0d0d0d] border-t border-[#262626]">
          <span>共 14159 条数据</span>
          <div className="flex gap-1">
             {[1, 2, 3, 4, 5, '...', 284].map((p, i) => (
               <button key={i} className={`px-2 py-1 rounded ${p === 1 ? 'bg-[#f0a020] text-black font-bold' : 'hover:bg-[#1f1f1f]'}`}>{p}</button>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningCenter;

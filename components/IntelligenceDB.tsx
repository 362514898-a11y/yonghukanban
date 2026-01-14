
import React, { useState } from 'react';
import { MOCK_TARGETS } from '../constants';

const IntelligenceDB: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('人脸');
  
  const categories = ['人脸', '地标', '关键词', '新闻播报'];
  
  return (
    <div className="flex gap-6 h-full">
      {/* Sidebar List */}
      <div className="w-80 flex flex-col gap-4">
        <div className="bg-[#141414] border border-[#262626] rounded-lg p-4 flex flex-col h-full">
           <div className="flex justify-between items-center mb-4">
             <h2 className="font-bold text-white uppercase text-sm tracking-widest">告警库管理</h2>
             <button className="bg-[#f0a020] text-black text-[10px] font-bold px-2 py-1 rounded">+ 创建数据集</button>
           </div>
           
           <div className="flex border-b border-[#262626] mb-4">
             {categories.map(cat => (
               <button 
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`flex-1 py-2 text-[10px] transition-colors ${activeCategory === cat ? 'text-[#f0a020] border-b-2 border-[#f0a020]' : 'text-gray-500 hover:text-gray-300'}`}
               >
                 {cat}
               </button>
             ))}
           </div>

           <div className="relative mb-4">
             <input type="text" placeholder="搜索库内目标..." className="w-full bg-[#1f1f1f] border border-[#262626] px-3 py-1.5 rounded text-xs outline-none focus:border-[#f0a020]" />
             <span className="absolute right-3 top-1.5 text-gray-500 italic">🔍</span>
           </div>

           <div className="flex-1 overflow-y-auto space-y-1 pr-2 custom-scrollbar">
             {MOCK_TARGETS.map((target, idx) => (
               <div key={target.id} className={`flex items-center justify-between p-2 rounded cursor-pointer group ${idx === 0 ? 'bg-[#f0a020]/10 border border-[#f0a020]/30' : 'hover:bg-[#1c1c1c]'}`}>
                 <div className="flex items-center gap-3">
                   <input type="checkbox" defaultChecked={idx < 3} className="accent-[#f0a020]" />
                   <span className="text-xs text-gray-300">{idx + 1}. {target.name}</span>
                 </div>
                 <div className="opacity-0 group-hover:opacity-100 flex gap-2 transition-opacity">
                   <button className="text-gray-500 hover:text-white text-xs">✏️</button>
                   <button className="text-gray-500 hover:text-red-500 text-xs">🗑️</button>
                 </div>
               </div>
             ))}
             {/* Fill some mock data */}
             {Array.from({length: 10}).map((_, i) => (
               <div key={i} className="flex items-center justify-between p-2 rounded cursor-pointer hover:bg-[#1c1c1c]">
                 <div className="flex items-center gap-3">
                   <input type="checkbox" className="accent-[#f0a020]" />
                   <span className="text-xs text-gray-300">{i + 4}. 示例目标_{i}</span>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="flex-1 bg-[#141414] border border-[#262626] rounded-lg p-6 flex flex-col">
        <div className="flex justify-between items-start mb-8">
           <div>
             <h1 className="text-3xl font-bold text-white mb-1">Zendaya</h1>
             <div className="text-sm font-bold text-[#f0a020]">置信度: 98% (平均权重)</div>
           </div>
           <div className="flex gap-3">
             <div className="relative">
               <input type="text" placeholder="搜素图片..." className="bg-[#1f1f1f] border border-[#262626] px-4 py-2 rounded-lg text-sm w-64 outline-none" />
             </div>
             <button className="bg-[#f0a020] text-black font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2">
               <span>📤</span> 上传图片
             </button>
             <button className="bg-red-900/30 text-red-500 border border-red-500/30 px-4 py-2 rounded-lg text-sm">批量删除</button>
           </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({length: 8}).map((_, i) => (
            <div key={i} className="bg-[#1c1c1c] border border-[#262626] rounded-lg overflow-hidden group shadow-lg">
               <div className="relative aspect-[3/4] overflow-hidden">
                 <img src={`https://picsum.photos/300/400?random=${i + 50}`} alt="person" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 <div className="absolute top-2 left-2">
                   <input type="checkbox" className="w-4 h-4 accent-[#f0a020]" />
                 </div>
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <button className="bg-[#f0a020] text-black p-2 rounded-full font-bold">🔍</button>
                 </div>
               </div>
               <div className="p-3 flex justify-between items-center">
                 <div className="text-xs text-white font-medium">Zendaya_{i + 1}</div>
                 <button className="text-gray-500 hover:text-white">⋮</button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntelligenceDB;

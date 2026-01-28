
import React from 'react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'behavior', label: '用户看板', icon: '👤' },
    { id: 'media', label: '媒体采集', icon: '🌐' },
    { id: 'warnings', label: '实时预警', icon: '⚠️' },
    { id: 'intelligence', label: '告警库', icon: '🧠' },
  ];

  return (
    <header className="bg-[#141414] border-b border-[#262626] h-16 flex items-center px-6 justify-between sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#f0a020] rounded flex items-center justify-center font-bold text-black text-xs">AVIAS</div>
          <span className="font-bold tracking-widest text-lg">AVIAS Intelligence</span>
        </div>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === item.id 
                  ? 'bg-[#f0a020]/10 text-[#f0a020] border border-[#f0a020]/20' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1 right-1 bg-red-600 text-[10px] text-white px-1 rounded-full border border-[#141414]">12</span>
        </button>
        <div className="flex items-center gap-2 pl-4 border-l border-[#262626]">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-xs text-black uppercase">AD</div>
          <div className="hidden md:block">
            <div className="text-xs font-bold leading-none">admin</div>
            <div className="text-[10px] text-gray-500 leading-none mt-1">Super User</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

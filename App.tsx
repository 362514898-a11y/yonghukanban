
import React, { useState } from 'react';
import Header from './components/Header';
import MediaMonitoring from './components/MediaMonitoring';
import WarningCenter from './components/WarningCenter';
import IntelligenceDB from './components/IntelligenceDB';
import UserBehavior from './components/UserBehavior';

const App: React.FC = () => {
  // Default to 'behavior' as requested
  const [activeTab, setActiveTab] = useState('behavior');

  const renderContent = () => {
    switch (activeTab) {
      case 'media':
        return <MediaMonitoring />;
      case 'warnings':
        return <WarningCenter />;
      case 'intelligence':
        return <IntelligenceDB />;
      case 'behavior':
        return <UserBehavior />;
      default:
        return <UserBehavior />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-gray-200">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 p-6 overflow-y-auto">
        {renderContent()}
      </main>

      <footer className="py-2 px-6 border-t border-[#262626] bg-[#0a0a0a] text-[10px] text-gray-600 flex justify-between items-center">
        <span className="tracking-widest uppercase">© 2026 AVIAS Intelligence Systems | 实时数据流监测已开启</span>
        <div className="flex gap-4">
          <span>SYSTEM STATUS: <span className="text-emerald-500 font-bold">OPERATIONAL</span></span>
          <span>NODES: 24 ACTIVE</span>
        </div>
      </footer>
    </div>
  );
};

export default App;

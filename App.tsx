
import React, { useState } from 'react';
import Header from './components/Header';
import MediaMonitoring from './components/MediaMonitoring';
import WarningCenter from './components/WarningCenter';
import IntelligenceDB from './components/IntelligenceDB';
import UserBehavior from './components/UserBehavior';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('media');

  return (
    <div className="flex flex-col min-h-screen text-gray-200">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 p-6 overflow-y-auto">
        {activeTab === 'media' && <MediaMonitoring />}
        {activeTab === 'warning' && <WarningCenter />}
        {activeTab === 'analysis' && <IntelligenceDB />}
        {activeTab === 'reports' && <UserBehavior />}
        
        {/* Placeholder for other tabs */}
        {['search', 'system'].includes(activeTab) && (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p className="text-xl font-light">正在建设中...</p>
            </div>
          </div>
        )}
      </main>

      <footer className="py-2 px-6 border-t border-[#262626] bg-[#0a0a0a] text-[10px] text-gray-600 flex justify-between items-center">
        <span className="tracking-widest uppercase">© 2026 AVIAS Intelligence Systems | 实时用户行为流监测已开启</span>
        <div className="flex gap-4">
          <span>SYSTEM STATUS: <span className="text-emerald-500 font-bold">OPERATIONAL</span></span>
          <span>NODES: 24 ACTIVE</span>
        </div>
      </footer>
    </div>
  );
};

export default App;

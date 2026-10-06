import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DisclaimerBanner } from './components/layout/DisclaimerBanner';
import { ErrorBoundary } from './components/common/ErrorBoundary';

import { DashboardPage } from './pages/DashboardPage';
import { NewInspectionPage } from './pages/NewInspectionPage';
import { ReportPage } from './pages/ReportPage';
import { HistoryPage } from './pages/HistoryPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SystemStatusPage } from './pages/SystemStatusPage';
import { SettingsPage } from './pages/SettingsPage';

function MainLayout() {
  const { activeTab, setActiveTab } = useApp();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'new-inspection':
        return <NewInspectionPage />;
      case 'report':
        return <ReportPage />;
      case 'history':
        return <HistoryPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'system-status':
        return <SystemStatusPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      {/* Collapsible Industrial Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <Header />

        {/* Safety Disclaimer Banner */}
        <DisclaimerBanner />

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <ErrorBoundary onReset={() => setActiveTab('dashboard')}>
            {renderContent()}
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

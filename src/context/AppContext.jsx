import React, { createContext, useContext, useState, useEffect } from 'react';
import { analyzeBurnerImage, checkBackendHealth, fetchInspectionHistory } from '../services/api';
import { INITIAL_INSPECTIONS_HISTORY } from '../services/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [apiBaseUrl, setApiBaseUrl] = useState(import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000');
  
  const [backendHealth, setBackendHealth] = useState({
    online: false,
    pipeline: 'V0.4.1 Frozen',
    message: 'Checking connection...'
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('burnervision_history');
    return saved ? JSON.parse(saved) : INITIAL_INSPECTIONS_HISTORY;
  });

  const [currentReport, setCurrentReport] = useState(null);
  
  // Pipeline execution state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStage, setAnalysisStage] = useState(0); // 0 to 5
  const [analysisProgress, setAnalysisProgress] = useState(0);

  // Sync dark mode class to <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [isDarkMode]);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('burnervision_history', JSON.stringify(history));
  }, [history]);

  // Periodic health check
  useEffect(() => {
    const checkHealth = async () => {
      const res = await checkBackendHealth(apiBaseUrl);
      setBackendHealth(res);
    };

    checkHealth();
    const interval = setInterval(checkHealth, 15000);
    return () => clearInterval(interval);
  }, [apiBaseUrl]);

  // Run analysis pipeline flow
  const runAnalysis = async (imageInput, presetType = 'preset_random') => {
    setIsAnalyzing(true);
    setAnalysisStage(1); // V0.1 Image Quality
    setAnalysisProgress(15);

    try {
      // Stage 1: V0.1 Image Quality
      await new Promise(r => setTimeout(r, 600));
      setAnalysisStage(2); // V0.2 Structure & Geometry
      setAnalysisProgress(40);

      // Stage 2: V0.2 Structure & Geometry
      await new Promise(r => setTimeout(r, 700));
      setAnalysisStage(3); // V0.3 Surface Analysis
      setAnalysisProgress(65);

      // Stage 3: V0.3 Surface Analysis
      await new Promise(r => setTimeout(r, 600));
      setAnalysisStage(4); // V0.4.1 Damage & Discontinuities
      setAnalysisProgress(85);

      // Stage 4: V0.4.1 Damage Analysis
      const result = await analyzeBurnerImage(imageInput, isDemoMode, presetType);

      await new Promise(r => setTimeout(r, 500));
      setAnalysisStage(5); // Synthesis & Report
      setAnalysisProgress(100);

      await new Promise(r => setTimeout(r, 300));

      // Save to history & set current report
      setHistory(prev => [result, ...prev]);
      setCurrentReport(result);
      setIsAnalyzing(false);
      setActiveTab('report');
      return result;
    } catch (err) {
      console.error('Analysis failed:', err);
      setIsAnalyzing(false);
      throw err;
    }
  };

  const deleteInspection = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
    if (currentReport?.id === id) {
      setCurrentReport(null);
    }
  };

  const resetHistoryToDefault = () => {
    setHistory(INITIAL_INSPECTIONS_HISTORY);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isDarkMode,
        setIsDarkMode,
        isDemoMode,
        setIsDemoMode,
        apiBaseUrl,
        setApiBaseUrl,
        backendHealth,
        history,
        currentReport,
        setCurrentReport,
        isAnalyzing,
        analysisStage,
        analysisProgress,
        runAnalysis,
        deleteInspection,
        resetHistoryToDefault
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

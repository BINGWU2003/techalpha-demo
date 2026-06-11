/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import Home from './features/workbench/pages/Home';
import DeepMinePhase1 from './features/deep-mine/pages/DeepMinePhase1';
import DeepMineAnalysis from './features/deep-mine/pages/DeepMineAnalysis';
import DeepMinePhase2 from './features/deep-mine/pages/DeepMinePhase2';
import DirectionTuning from './features/deep-mine/pages/DirectionTuning';
import ReportConfirm from './features/auto-dd/pages/ReportConfirm';
import ReportConfig from './features/auto-dd/pages/ReportConfig';
import ReportGenerating from './features/auto-dd/pages/ReportGenerating';
import ReportView from './features/report-library/pages/ReportView';
import CompanyLibrary from './features/company-library/pages/CompanyLibrary';
import ReportLibrary from './features/report-library/pages/ReportLibrary';
import Alerts from './features/alerts/pages/Alerts';
import SectorScan from './features/sector-scan/pages/SectorScan';
import SectorScanPhase2 from './features/sector-scan/pages/SectorScanPhase2';
import SectorScanPhase3 from './features/sector-scan/pages/SectorScanPhase3';
import SectorScanPhase4 from './features/sector-scan/pages/SectorScanPhase4';
import { authService } from './services/auth';

export default function App() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  const openReportInNewTab = () => {
    window.open('/report-view', '_blank');
  };

  const [deepMineState, setDeepMineState] = useState({
    isDeconstructed: false,
    isAnalyzing: false,
    showAnalysis: false,
    keywords: [
      { type: 'include' as const, text: '层状氧化物' },
      { type: 'include' as const, text: '循环寿命' },
      { type: 'include' as const, text: '低成本' },
      { type: 'include' as const, text: '储能场景' },
      { type: 'exclude' as const, text: '负极材料' },
      { type: 'exclude' as const, text: '电解液' },
    ]
  });

  const updateDeepMineState = (newState: Partial<typeof deepMineState>) => {
    setDeepMineState(prev => ({ ...prev, ...newState }));
  };

  const handleStartTask = (taskType: string, input: string) => {
    if (taskType === 'DeepMine') {
      navigate('/deep-mine');
    } else if (taskType === 'AutoReport') {
      navigate('/auto-report');
    } else if (taskType === 'SignalMonitor') {
      navigate('/alerts');
    } else if (taskType === 'SectorScan') {
      navigate('/sector-scan');
    }
  };

  const navigateToReportConfigFromDeepMine = () => {
    navigate('/auto-report/config?from=deep-mine');
  };

  // Define components wrapped in layout
  return (
    <Routes>
      <Route path="/report-view" element={<ReportView />} />
      <Route path="*" element={
        <Layout onLogout={handleLogout}>
          <Routes>
            <Route path="/" element={<Home onStartTask={handleStartTask} />} />
            
            {/* Deep Mine */}
            <Route path="/deep-mine" element={
              <DeepMinePhase1 
                onAnalyze={() => navigate('/deep-mine/analysis')} 
                onAdjustTarget={() => navigate('/direction-tuning')} 
                onBack={() => navigate('/')}
                state={deepMineState}
                onUpdateState={updateDeepMineState}
              />
            } />
            <Route path="/deep-mine/analysis" element={
              <DeepMineAnalysis
                onNextStep={() => navigate('/deep-mine/results')}
                onAdjustTarget={() => navigate('/direction-tuning')}
                onBack={() => navigate('/deep-mine')}
              />
            } />
            <Route path="/deep-mine/results" element={<DeepMinePhase2 onBack={() => navigate('/deep-mine/analysis')} onGenerateReport={navigateToReportConfigFromDeepMine} />} />
            <Route path="/direction-tuning" element={
              <DirectionTuning 
                onBack={() => navigate(-1)} 
                keywords={deepMineState.keywords}
                onUpdateKeywords={(keywords) => updateDeepMineState({ keywords })}
              />
            } />
            
            {/* Auto Report */}
            <Route path="/auto-report" element={<ReportConfirm onNext={() => navigate('/auto-report/config')} onCancel={() => navigate('/')} />} />
            <Route path="/auto-report/config" element={<ReportConfig onBack={() => navigate(-1)} onGenerate={() => navigate('/auto-report/generating')} />} />
            <Route path="/auto-report/generating" element={<ReportGenerating onBack={() => navigate('/')} onViewReport={openReportInNewTab} />} />
            
            {/* Libraries & Alerts */}
            <Route path="/companies" element={<CompanyLibrary onBack={() => navigate('/')} onGenerateReport={() => navigate('/auto-report')} onOpenReport={openReportInNewTab} />} />
            <Route path="/reports" element={<ReportLibrary onBack={() => navigate('/')} onCreateReport={() => navigate('/auto-report')} onOpenReport={openReportInNewTab} onEditReport={() => navigate('/auto-report/config')} />} />
            <Route path="/alerts" element={<Alerts onBack={() => navigate('/')} onUpdateReport={() => navigate('/auto-report/config')} />} />
            
            {/* Sector Scan */}
            <Route path="/sector-scan" element={<SectorScan onBack={() => navigate('/')} onNext={() => navigate('/sector-scan/phase2')} />} />
            <Route path="/sector-scan/phase2" element={<SectorScanPhase2 onBack={() => navigate('/sector-scan')} onNext={() => navigate('/sector-scan/phase3')} />} />
            <Route path="/sector-scan/phase3" element={<SectorScanPhase3 onBack={() => navigate('/sector-scan/phase2')} onNext={() => navigate('/sector-scan/phase4')} />} />
            <Route path="/sector-scan/phase4" element={<SectorScanPhase4 onBack={() => navigate('/sector-scan/phase3')} onNext={() => navigate('/deep-mine')} />} />
          </Routes>
        </Layout>
      } />
    </Routes>
  );
}

import React from 'react';
import { useApp } from '../context/AppContext';
import { UploadZone } from '../components/inspection/UploadZone';
import { PipelineLoader } from '../components/inspection/PipelineLoader';

export function NewInspectionPage() {
  const { isAnalyzing } = useApp();

  return (
    <div className="space-y-6">
      {isAnalyzing ? (
        <PipelineLoader />
      ) : (
        <UploadZone />
      )}
    </div>
  );
}

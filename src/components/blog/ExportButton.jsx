import React, { useState } from 'react';
import { FileDown, Loader } from 'lucide-react';
import { exportToPDF } from './generatePDF';
import PDFExportDialog from './PDFExportDialog';

const ExportButton = ({ markdown }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(null);
  const [showExportDialog, setShowExportDialog] = useState(false);

  const handleExport = async (settings) => {
    setIsExporting(true);
    setShowExportDialog(false);

    const success = await exportToPDF(markdown, settings, (progress) => {
      setExportProgress(progress);
    });

    if (success) {
      // Show success message
      const notification = document.createElement('div');
      notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg';
      notification.textContent = 'PDF exported successfully!';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    }

    setIsExporting(false);
    setExportProgress(null);
  };

  return (
    <>
      <button
        onClick={() => setShowExportDialog(true)}
        className="relative inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        disabled={isExporting}
      >
        {isExporting ? (
          <>
            <Loader className="w-4 h-4 animate-spin" />
            <span>
              {exportProgress?.status === 'starting' && 'Starting export...'}
              {exportProgress?.status === 'initializing' && 'Initializing...'}
              {exportProgress?.status === 'generating' && 'Generating PDF...'}
              {exportProgress?.status === 'formatting' && 'Applying formatting...'}
              {exportProgress?.status === 'saving' && 'Saving file...'}
            </span>
          </>
        ) : (
          <>
            <FileDown className="w-4 h-4" />
            <span>Export PDF</span>
          </>
        )}
      </button>

      {isExporting && exportProgress && (
        <div className="fixed bottom-4 right-4 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Exporting PDF</span>
            <span className="text-sm text-gray-500">{exportProgress.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div
              className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${exportProgress.progress}%` }}
            />
          </div>
        </div>
      )}

      <PDFExportDialog
        isOpen={showExportDialog}
        onClose={() => setShowExportDialog(false)}
        onExport={handleExport}
        markdown={markdown}
      />
    </>
  );
};

export default ExportButton;
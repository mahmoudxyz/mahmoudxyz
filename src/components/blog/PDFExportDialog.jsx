import React, { useState, useCallback } from 'react';
import { jsPDF } from 'jspdf';
import { 
  FileText, 
  X, 
  Loader,
  GripHorizontal,
  FileDown 
} from 'lucide-react';

const PDFExportDialog = ({ isOpen, onClose, markdown }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState(null);
  const [settings, setSettings] = useState({
    fontSize: 12,
    orientation: 'portrait',
    pageSize: 'a4',
    template: 'modern',
    coverPage: true,
    tableOfContents: true,
    includeHeaders: true,
    includeFooters: true,
    pageNumbers: true,
  });

  const handleExport = useCallback(async () => {
    try {
      setIsExporting(true);
      setError(null);

      // Create PDF document
      const doc = new jsPDF({
        orientation: settings.orientation,
        unit: 'mm',
        format: settings.pageSize
      });

      // Set font
      doc.setFont('helvetica');
      doc.setFontSize(settings.fontSize);

      // Get page dimensions
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;

      let currentY = margin;
      let pageCount = 1;

      // Add cover page if enabled
      if (settings.coverPage) {
        const title = markdown.split('\n')[0].replace('#', '').trim() || 'Document';
        
        // Add cover design based on template
        if (settings.template === 'modern') {
          // Add modern cover design
          doc.setFillColor(63, 131, 248);
          doc.rect(0, 0, pageWidth * 0.4, pageHeight, 'F');
          
          doc.setTextColor(255);
          doc.setFontSize(24);
          doc.text(title, margin, 60);
          
          doc.setFontSize(12);
          doc.text(new Date().toLocaleDateString(), margin, 80);
        } else {
          // Add classic cover design
          doc.setFontSize(24);
          doc.text(title, pageWidth / 2, pageHeight / 3, { align: 'center' });
          
          doc.setFontSize(12);
          doc.text(new Date().toLocaleDateString(), pageWidth / 2, pageHeight / 3 + 20, { align: 'center' });
        }

        doc.addPage();
        currentY = margin;
        pageCount++;
      }

      // Process markdown content
      const lines = markdown.split('\n');
      
      lines.forEach((line) => {
        // Skip empty lines
        if (!line.trim()) {
          currentY += 10;
          return;
        }

        // Check if we need a new page
        if (currentY > pageHeight - margin) {
          doc.addPage();
          currentY = margin;
          pageCount++;

          // Add header if enabled
          if (settings.includeHeaders) {
            doc.setFontSize(10);
            doc.text(new Date().toLocaleDateString(), margin, 10);
            doc.setFontSize(settings.fontSize);
          }
        }

        // Process headings
        if (line.startsWith('#')) {
          const level = line.match(/^#+/)[0].length;
          const text = line.replace(/^#+\s/, '');
          doc.setFontSize(settings.fontSize + (6 - level) * 2);
          doc.text(text, margin, currentY);
          currentY += 10;
          doc.setFontSize(settings.fontSize);
          return;
        }

        // Process normal text
        const textLines = doc.splitTextToSize(line, pageWidth - 2 * margin);
        textLines.forEach((textLine) => {
          doc.text(textLine, margin, currentY);
          currentY += 7;
        });

        // Add page numbers if enabled
        if (settings.pageNumbers) {
          doc.setFontSize(10);
          doc.text(
            String(pageCount), 
            pageWidth / 2, 
            pageHeight - 10, 
            { align: 'center' }
          );
          doc.setFontSize(settings.fontSize);
        }
      });

      // Save the document
      doc.save('document.pdf');
      setIsExporting(false);
      onClose();
    } catch (err) {
      console.error('Export failed:', err);
      setError('Failed to generate PDF. Please try again.');
      setIsExporting(false);
    }
  }, [markdown, settings, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[800px] max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Export to PDF
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
            disabled={isExporting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* Templates */}
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <GripHorizontal className="w-4 h-4" />
                Template
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  className={`p-4 rounded-lg border text-left transition-colors ${
                    settings.template === 'modern' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSettings(s => ({ ...s, template: 'modern' }))}
                >
                  <div className="font-medium">Modern</div>
                  <div className="text-sm text-gray-500">Clean and minimal design</div>
                </button>
                <button
                  className={`p-4 rounded-lg border text-left transition-colors ${
                    settings.template === 'classic' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSettings(s => ({ ...s, template: 'classic' }))}
                >
                  <div className="font-medium">Classic</div>
                  <div className="text-sm text-gray-500">Traditional document style</div>
                </button>
              </div>
            </div>

            {/* Settings */}
            <div>
              <h3 className="font-medium mb-2">Document Elements</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.coverPage}
                    onChange={e => setSettings(s => ({ 
                      ...s, 
                      coverPage: e.target.checked 
                    }))}
                    className="rounded border-gray-300"
                  />
                  Include cover page
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.tableOfContents}
                    onChange={e => setSettings(s => ({ 
                      ...s, 
                      tableOfContents: e.target.checked 
                    }))}
                    className="rounded border-gray-300"
                  />
                  Include table of contents
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.includeHeaders}
                    onChange={e => setSettings(s => ({ 
                      ...s, 
                      includeHeaders: e.target.checked 
                    }))}
                    className="rounded border-gray-300"
                  />
                  Include headers
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.includeFooters}
                    onChange={e => setSettings(s => ({ 
                      ...s, 
                      includeFooters: e.target.checked 
                    }))}
                    className="rounded border-gray-300"
                  />
                  Include footers
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.pageNumbers}
                    onChange={e => setSettings(s => ({ 
                      ...s, 
                      pageNumbers: e.target.checked 
                    }))}
                    className="rounded border-gray-300"
                  />
                  Include page numbers
                </label>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Font Size
                </label>
                <select
                  value={settings.fontSize}
                  onChange={e => setSettings(s => ({ 
                    ...s, 
                    fontSize: Number(e.target.value) 
                  }))}
                  className="w-full rounded-lg border p-2"
                >
                  {[10, 11, 12, 14, 16].map(size => (
                    <option key={size} value={size}>
                      {size}pt
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Page Size
                </label>
                <select
                  value={settings.pageSize}
                  onChange={e => setSettings(s => ({ 
                    ...s, 
                    pageSize: e.target.value 
                  }))}
                  className="w-full rounded-lg border p-2"
                >
                  <option value="a4">A4</option>
                  <option value="letter">US Letter</option>
                  <option value="legal">Legal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Orientation
                </label>
                <select
                  value={settings.orientation}
                  onChange={e => setSettings(s => ({ 
                    ...s, 
                    orientation: e.target.value 
                  }))}
                  className="w-full rounded-lg border p-2"
                >
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            disabled={isExporting}
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 disabled:opacity-50"
          >
            {isExporting ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <FileDown className="w-4 h-4" />
                Export PDF
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDFExportDialog;
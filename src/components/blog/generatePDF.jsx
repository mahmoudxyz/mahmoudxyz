import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { marked } from 'marked';

export const generatePDF = async (markdown, settings) => {
  const {
    template,
    fontSize,
    primaryColor,
    accentColor,
    includeHeader,
    includeFooter,
    includePageNumbers,
    coverPage,
    tableOfContents,
    pageSize,
    margins,
  } = settings;

  // Initialize PDF document
  const doc = new jsPDF({
    format: pageSize,
    unit: 'mm',
  });

  // Set up fonts
  doc.addFont('fonts/IBMPlexSans-Regular.ttf', 'IBMPlex', 'normal');
  doc.addFont('fonts/IBMPlexSans-Bold.ttf', 'IBMPlex', 'bold');
  doc.setFont('IBMPlex');

  // Margin settings
  const marginSizes = {
    narrow: 12.7,
    normal: 25.4,
    wide: 38.1,
  };
  const margin = marginSizes[margins];
  
  // Page dimensions
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const contentWidth = pageWidth - (2 * margin);

  // Cover Page
  if (coverPage) {
    const title = getTitle(markdown) || 'Untitled Document';
    const date = new Date().toLocaleDateString();
    
    // Background pattern or design based on template
    if (template === 'modern') {
      doc.setFillColor(primaryColor);
      doc.rect(0, 0, pageWidth * 0.4, pageHeight, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(32);
      doc.text(title, margin, pageHeight * 0.4);
      doc.setFontSize(14);
      doc.text(date, margin, pageHeight * 0.4 + 20);
    }
    // Add more template designs here...

    doc.addPage();
  }

  // Table of Contents
  if (tableOfContents) {
    const headings = extractHeadings(markdown);
    doc.setFontSize(20);
    doc.text('Table of Contents', margin, margin);
    
    let yPos = margin + 15;
    headings.forEach((heading, index) => {
      doc.setFontSize(12);
      const text = `${heading.text}`;
      doc.text(text, margin + (heading.level - 1) * 10, yPos);
      yPos += 10;
    });

    doc.addPage();
  }

  // Convert markdown to HTML for processing
  const html = marked(markdown);
  
  // Split content into pages and add headers/footers
  const lines = splitContentIntoPages(html, {
    pageWidth: contentWidth,
    pageHeight: pageHeight - (2 * margin),
    fontSize,
  });

  let currentPage = 1;
  lines.forEach((pageContent) => {
    if (currentPage > 1) doc.addPage();

    // Header
    if (includeHeader) {
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(title, margin, margin - 5);
    }

    // Main content
    doc.setFontSize(fontSize);
    doc.setTextColor(0);
    let y = margin;
    
    pageContent.forEach((line) => {
      if (line.type === 'heading') {
        doc.setFontSize(fontSize * 1.5);
        doc.setFont('IBMPlex', 'bold');
      } else {
        doc.setFontSize(fontSize);
        doc.setFont('IBMPlex', 'normal');
      }
      
      doc.text(line.text, margin, y);
      y += line.height;
    });

    // Footer
    if (includeFooter || includePageNumbers) {
      doc.setFontSize(10);
      doc.setTextColor(100);
      const footerY = pageHeight - margin / 2;
      
      if (includePageNumbers) {
        doc.text(`Page ${currentPage}`, pageWidth - margin, footerY, { align: 'right' });
      }
      
      if (includeFooter) {
        doc.text(date, margin, footerY);
      }
    }

    currentPage++;
  });

  return doc;
};

// Helper functions
function getTitle(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1] : null;
}

// ... continuing from previous code

function extractHeadings(markdown) {
    const headings = [];
    const regex = /^(#{1,6})\s+(.+)$/gm;
    let match;
  
    while ((match = regex.exec(markdown)) !== null) {
      headings.push({
        level: match[1].length,
        text: match[2],
      });
    }
  
    return headings;
  }
  
  function splitContentIntoPages(html, options) {
    const { pageWidth, pageHeight, fontSize } = options;
    const lineHeight = fontSize * 1.2;
    const maxLinesPerPage = Math.floor(pageHeight / lineHeight);
  
    // Convert HTML to text blocks with formatting
    const blocks = parseHTMLToBlocks(html);
    const pages = [];
    let currentPage = [];
    let currentHeight = 0;
  
    blocks.forEach(block => {
      const blockHeight = calculateBlockHeight(block, lineHeight, pageWidth);
  
      // Check if block needs to be split across pages
      if (currentHeight + blockHeight > pageHeight) {
        // Add current page to pages
        pages.push(currentPage);
        currentPage = [];
        currentHeight = 0;
      }
  
      currentPage.push({
        ...block,
        height: blockHeight
      });
      currentHeight += blockHeight;
    });
  
    // Add the last page
    if (currentPage.length > 0) {
      pages.push(currentPage);
    }
  
    return pages;
  }
  
  function parseHTMLToBlocks(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const blocks = [];
  
    function processNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.trim()) {
          blocks.push({
            type: 'text',
            text: node.textContent.trim(),
            style: {}
          });
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const style = {};
        
        switch (node.tagName.toLowerCase()) {
          case 'h1':
          case 'h2':
          case 'h3':
          case 'h4':
          case 'h5':
          case 'h6':
            style.heading = true;
            style.level = parseInt(node.tagName[1]);
            break;
          case 'strong':
          case 'b':
            style.bold = true;
            break;
          case 'em':
          case 'i':
            style.italic = true;
            break;
          case 'code':
            style.code = true;
            break;
          case 'a':
            style.link = node.getAttribute('href');
            break;
        }
  
        if (node.childNodes.length > 0) {
          Array.from(node.childNodes).forEach(child => {
            processNode(child);
          });
        } else {
          blocks.push({
            type: node.tagName.toLowerCase(),
            text: node.textContent,
            style
          });
        }
      }
    }
  
    processNode(doc.body);
    return blocks;
  }
  
  function calculateBlockHeight(block, lineHeight, pageWidth) {
    const { type, text, style } = block;
    let height = lineHeight;
  
    // Add extra spacing for headings
    if (style.heading) {
      height *= 2;
    }
  
    // Calculate wrapped text height
    const words = text.split(' ');
    let currentLine = '';
    let lines = 1;
  
    words.forEach(word => {
      if (measureTextWidth(currentLine + ' ' + word) > pageWidth) {
        lines++;
        currentLine = word;
      } else {
        currentLine += ' ' + word;
      }
    });
  
    return height * lines;
  }
  
  // Helper function to measure text width (approximate)
  function measureTextWidth(text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    return context.measureText(text).width;
  }
  
  // Export function with progress tracking
  export async function exportToPDF(markdown, settings, onProgress) {
    try {
      onProgress?.({ status: 'starting', progress: 0 });
      
      // Initial PDF setup
      onProgress?.({ status: 'initializing', progress: 10 });
      const doc = await generatePDF(markdown, settings);
      
      // Generate content
      onProgress?.({ status: 'generating', progress: 50 });
      
      // Add styles and formatting
      onProgress?.({ status: 'formatting', progress: 75 });
      
      // Save file
      onProgress?.({ status: 'saving', progress: 90 });
      const pdfBlob = doc.output('blob');
      
      onProgress?.({ status: 'complete', progress: 100 });
      
      // Trigger download
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      console.error('PDF export failed:', error);
      onProgress?.({ status: 'error', error: error.message });
      return false;
    }
  }
  
  export const PDFTemplates = {
    modern: {
      name: 'Modern Minimal',
      colors: {
        primary: '#3B82F6',
        accent: '#60A5FA',
        text: '#1F2937',
        background: '#FFFFFF'
      },
      fonts: {
        heading: 'IBMPlex',
        body: 'IBMPlex'
      }
    },
    academic: {
      name: 'Academic Paper',
      colors: {
        primary: '#1F2937',
        accent: '#4B5563',
        text: '#1F2937',
        background: '#FFFFFF'
      },
      fonts: {
        heading: 'IBMPlex',
        body: 'IBMPlex'
      }
    },
    business: {
      name: 'Business Report',
      colors: {
        primary: '#1E40AF',
        accent: '#3B82F6',
        text: '#1F2937',
        background: '#FFFFFF'
      },
      fonts: {
        heading: 'IBMPlex',
        body: 'IBMPlex'
      }
    }
  };
import React, { useState, useEffect, useCallback } from 'react';
import { marked } from 'marked';
import { 
  PenLine, Eye, Languages, Copy, Trash2, FileDown,
  Bold, Italic, List, ListOrdered, Link2, Image,
  Quote, Code, Hash, Table, Minus, CheckSquare,
  Layout, Maximize2, Minimize2, Save, Upload,
  Moon, Sun, AlignLeft, AlignCenter, AlignRight,
  Heading1, Heading2, Heading3, Type, Undo, Redo,
  Info, FileText, ListTree, Clock
} from 'lucide-react';
import ToolbarButton from '../ui/ToolbarButton';
import ExportButton from './ExportButton';
import PDFExportDialog from './PDFExportDialog';

const MarkdownEditor = ({ language = 'en' }) => {
  const initialDirection = language === 'ar' ? 'rtl' : 'ltr';
  const [markdown, setMarkdown] = useState('## مرحباً بالعالم!\n\nThis is a **bilingual** markdown editor.\n\nاكتب بالعربية او الانجليزية\n\n- قائمة عربية\n- Arabic list\n- Mixed list مختلطة');
  const [direction, setDirection] = useState(initialDirection);
  const [html, setHtml] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedTab, setSelectedTab] = useState('split');
  const [wordCount, setWordCount] = useState({ words: 0, chars: 0, lines: 0 });
  const [history, setHistory] = useState([markdown]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [lastSaved, setLastSaved] = useState(null);
  const [showOutline, setShowOutline] = useState(false);
  const [headings, setHeadings] = useState([]);
  const [showStatsPanel, setShowStatsPanel] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);

  // Word count calculation
  useEffect(() => {
    const words = markdown.trim().split(/\s+/).length;
    const chars = markdown.length;
    const lines = markdown.split('\n').length;
    setWordCount({ words, chars, lines });
  }, [markdown]);

  // Markdown rendering with heading extraction
  useEffect(() => {
    const rendered = marked(markdown);
    setHtml(rendered);

    // Extract headings for outline
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const matches = [...markdown.matchAll(headingRegex)];
    const extractedHeadings = matches.map(match => ({
      level: match[1].length,
      text: match[2],
      id: match[2].toLowerCase().replace(/[^\w]+/g, '-')
    }));
    setHeadings(extractedHeadings);
  }, [markdown]);

  // Auto-save functionality
  useEffect(() => {
    if (autoSaveEnabled) {
      const timer = setTimeout(() => {
        localStorage.setItem('markdown-content', markdown);
        setLastSaved(new Date());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [markdown, autoSaveEnabled]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch(e.key.toLowerCase()) {
          case 'b': 
            e.preventDefault();
            insertText('**', '**');
            break;
          case 'i':
            e.preventDefault();
            insertText('_', '_');
            break;
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              redo();
            } else {
              undo();
            }
            break;
          case 's':
            e.preventDefault();
            localStorage.setItem('markdown-content', markdown);
            setLastSaved(new Date());
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [markdown, historyIndex]);

  const addToHistory = useCallback((newContent) => {
    setHistory(prev => [...prev.slice(0, historyIndex + 1), newContent]);
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setMarkdown(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setMarkdown(history[historyIndex + 1]);
    }
  };

  const insertText = (before, after = '') => {
    const textarea = document.querySelector('textarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end);
    
    const newText = markdown.substring(0, start) + 
                   before + selectedText + after + 
                   markdown.substring(end);
    
    setMarkdown(newText);
    addToHistory(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        end + before.length
      );
    }, 0);
  };

  const handleTextChange = (e) => {
    const newContent = e.target.value;
    setMarkdown(newContent);
    addToHistory(newContent);
  };

  const formatCommands = {
    bold: () => insertText('**', '**'),
    italic: () => insertText('_', '_'),
    h1: () => insertText('# '),
    h2: () => insertText('## '),
    h3: () => insertText('### '),
    list: () => insertText('- '),
    orderedList: () => insertText('1. '),
    link: () => insertText('[', '](url)'),
    image: () => insertText('![alt text](', ')'),
    quote: () => insertText('> '),
    code: () => insertText('```\n', '\n```'),
    table: () => insertText('\n| Header 1 | Header 2 |\n| -------- | -------- |\n| Cell 1   | Cell 2   |\n'),
    hr: () => insertText('\n---\n'),
    checkbox: () => insertText('- [ ] '),
    centerText: () => insertText('<div align="center">\n\n', '\n\n</div>'),
  };

  const OutlinePanel = () => (
    <div className={`fixed right-4 top-20 w-64 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg border shadow-lg p-4`}>
      <h3 className="font-bold mb-2 flex items-center gap-2">
        <ListTree className="w-4 h-4" />
        Document Outline
      </h3>
      <div className="space-y-1">
        {headings.map((heading, index) => (
          <div 
            key={index}
            className="cursor-pointer hover:text-blue-500 transition-colors"
            style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
            onClick={() => {
              document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {heading.text}
          </div>
        ))}
      </div>
    </div>
  );

  const StatsPanel = () => (
    <div className={`fixed left-4 top-20 w-64 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg border shadow-lg p-4`}>
      <h3 className="font-bold mb-2 flex items-center gap-2">
        <Info className="w-4 h-4" />
        Document Stats
      </h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Words:</span>
          <span>{wordCount.words}</span>
        </div>
        <div className="flex justify-between">
          <span>Characters:</span>
          <span>{wordCount.chars}</span>
        </div>
        <div className="flex justify-between">
          <span>Lines:</span>
          <span>{wordCount.lines}</span>
        </div>
        <div className="flex justify-between">
          <span>Headings:</span>
          <span>{headings.length}</span>
        </div>
        {lastSaved && (
          <div className="flex justify-between">
            <span>Last saved:</span>
            <span>{new Date(lastSaved).toLocaleTimeString()}</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-[90rem] mx-auto p-4">
        {/* Main Toolbar */}
        <div className={`p-2 rounded-lg mb-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} border shadow-sm`}>
          <div className="flex flex-wrap gap-2">
            {/* History Controls */}
            <div className="flex items-center gap-1 border-r pr-2">
              <ToolbarButton 
                icon={Undo} 
                label="Undo (Ctrl + Z)"
                onClick={undo}
                disabled={historyIndex === 0}
              />
              <ToolbarButton 
                icon={Redo} 
                label="Redo (Ctrl + Shift + Z)"
                onClick={redo}
                disabled={historyIndex === history.length - 1}
              />
            </div>

            {/* File Operations */}
            <div className="flex items-center gap-1 border-r pr-2">
              <ToolbarButton 
                icon={Save} 
                label="Save (Ctrl + S)"
                onClick={() => {
                  localStorage.setItem('markdown-content', markdown);
                  setLastSaved(new Date());
                }}
              />
              <ToolbarButton 
                icon={Upload} 
                label="Load"
                onClick={() => {
                  const content = localStorage.getItem('markdown-content');
                  if (content) setMarkdown(content);
                }}
              />
              <ToolbarButton icon={Copy} label="Copy" onClick={() => navigator.clipboard.writeText(markdown)} />
              <ToolbarButton icon={Trash2} label="Clear" onClick={() => {
                setMarkdown('');
                addToHistory('');
              }} />
                <button
                    onClick={() => setShowExportDialog(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                    <FileDown className="w-4 h-4" />
                    Export PDF
                    </button>
            </div>

            {/* Text Formatting */}
            <div className="flex items-center gap-1 border-r pr-2">
              <ToolbarButton icon={Bold} label="Bold (Ctrl + B)" onClick={formatCommands.bold} />
              <ToolbarButton icon={Italic} label="Italic (Ctrl + I)" onClick={formatCommands.italic} />
              <ToolbarButton icon={Heading1} label="Heading 1" onClick={formatCommands.h1} />
              <ToolbarButton icon={Heading2} label="Heading 2" onClick={formatCommands.h2} />
              <ToolbarButton icon={Heading3} label="Heading 3" onClick={formatCommands.h3} />
            </div>

            {/* Lists and Links */}
            <div className="flex items-center gap-1 border-r pr-2">
              <ToolbarButton icon={List} label="Bullet List" onClick={formatCommands.list} />
              <ToolbarButton icon={ListOrdered} label="Numbered List" onClick={formatCommands.orderedList} />
              <ToolbarButton icon={CheckSquare} label="Checkbox" onClick={formatCommands.checkbox} />
              <ToolbarButton icon={Link2} label="Link" onClick={formatCommands.link} />
              <ToolbarButton icon={Image} label="Image" onClick={formatCommands.image} />
            </div>

            {/* Alignment and Other Formatting */}
            <div className="flex items-center gap-1 border-r pr-2">
              <ToolbarButton icon={Quote} label="Quote" onClick={formatCommands.quote} />
              <ToolbarButton icon={Code} label="Code Block" onClick={formatCommands.code} />
              <ToolbarButton icon={Table} label="Table" onClick={formatCommands.table} />
              <ToolbarButton icon={Minus} label="Horizontal Rule" onClick={formatCommands.hr} />
              <ToolbarButton icon={AlignCenter} label="Center Text" onClick={formatCommands.centerText} />
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-1 border-r pr-2">
              <ToolbarButton 
                icon={Layout} 
                label="Split View"
                active={selectedTab === 'split'}
                onClick={() => setSelectedTab('split')} 
              />
              <ToolbarButton 
                icon={PenLine} 
                label="Write Mode"
                active={selectedTab === 'write'}
                onClick={() => setSelectedTab('write')} 
              />
              <ToolbarButton 
                icon={Eye} 
                label="Preview Mode"
                active={selectedTab === 'preview'}
                onClick={() => setSelectedTab('preview')} 
              />
            </div>

            {/* Extra Features */}
            <div className="flex items-center gap-1 border-r pr-2">
              <ToolbarButton 
                icon={ListTree} 
                label="Toggle Outline"
                active={showOutline}
                onClick={() => setShowOutline(!showOutline)} 
              />
              <ToolbarButton 
                icon={Info} 
                label="Toggle Stats"
                active={showStatsPanel}
                onClick={() => setShowStatsPanel(!showStatsPanel)} 
              />
              <ToolbarButton 
                icon={Clock} 
                label="Auto Save"
                active={autoSaveEnabled}
                onClick={() => setAutoSaveEnabled(!autoSaveEnabled)} 
              />
            </div>

            {/* Direction Controls */}
            <div className="flex items-center gap-1 border-r pr-2">
            <button 
                  className={`py-1 px-3 rounded-md transition-colors text-sm ${
                    direction === 'ltr' 
                      ? 'bg-blue-500 text-white' 
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setDirection('ltr')}
                >
                  LTR
                </button>
                <button 
                  className={`py-1 px-3 rounded-md transition-colors text-sm ${
                    direction === 'rtl' 
                      ? 'bg-blue-500 text-white' 
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setDirection('rtl')}
                >
                  RTL
                </button>
              </div>

              {/* Settings */}
              <div className="flex items-center gap-1">
                <ToolbarButton 
                  icon={isFullscreen ? Minimize2 : Maximize2} 
                  label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  onClick={() => {
                    if (!document.fullscreenElement) {
                      document.documentElement.requestFullscreen();
                      setIsFullscreen(true);
                    } else {
                      document.exitFullscreen();
                      setIsFullscreen(false);
                    }
                  }} 
                />
                <ToolbarButton 
                  icon={isDarkMode ? Sun : Moon} 
                  label={isDarkMode ? "Light Mode" : "Dark Mode"}
                  onClick={() => setIsDarkMode(!isDarkMode)} 
                />
              </div>
            </div>
          </div>

          {/* Secondary Toolbar - Status Bar */}
          <div className={`mt-2 pt-2 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between text-sm text-gray-500`}>
            <div className="flex items-center gap-4">
              <span>{wordCount.words} words</span>
              <span>{wordCount.chars} characters</span>
              <span>{wordCount.lines} lines</span>
              <span>{headings.length} headings</span>
            </div>
            <div className="flex items-center gap-2">
              {lastSaved && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Last saved: {new Date(lastSaved).toLocaleTimeString()}
                </span>
              )}
              {autoSaveEnabled && (
                <span className="text-green-500 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Auto-save on
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex gap-4">
          {/* Side Panels */}
          {showStatsPanel && <StatsPanel />}
          {showOutline && <OutlinePanel />}

          {/* Editor/Preview Area */}
          <div className={`flex-1 grid ${selectedTab === 'split' ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
            {/* Editor Panel */}
            {(selectedTab === 'write' || selectedTab === 'split') && (
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg border shadow-sm overflow-hidden`}>
                <div className={`flex items-center justify-between p-2 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-center gap-2">
                    <PenLine className="w-4 h-4" />
                    <span className="font-medium">Editor</span>
                  </div>
                </div>
                <textarea
                  value={markdown}
                  onChange={handleTextChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Tab') {
                      e.preventDefault();
                      const start = e.target.selectionStart;
                      const end = e.target.selectionEnd;
                      const newText = markdown.substring(0, start) + '  ' + markdown.substring(end);
                      setMarkdown(newText);
                      addToHistory(newText);
                      setTimeout(() => {
                        e.target.selectionStart = e.target.selectionEnd = start + 2;
                      }, 0);
                    }
                  }}
                  className={`w-full h-[600px] p-4 resize-none focus:outline-none font-mono text-sm ${
                    isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                  }`}
                  dir={direction}
                  style={{ 
                    fontFamily: "'IBM Plex Mono', 'Noto Sans Arabic', monospace"
                  }}
                  placeholder="Start writing... (Ctrl+B for bold, Ctrl+I for italic)"
                />
              </div>
            )}

            {/* Preview Panel */}
            {(selectedTab === 'preview' || selectedTab === 'split') && (
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg border shadow-sm overflow-hidden`}>
                <div className={`flex items-center justify-between p-2 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span className="font-medium">Preview</span>
                  </div>
                </div>
                <div
                  className={`prose ${isDarkMode ? 'prose-invert' : ''} max-w-none h-[600px] p-4 overflow-auto`}
                  dir={direction}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </div>
            )}
          </div>
        </div>
                <PDFExportDialog
                isOpen={showExportDialog}
                onClose={() => setShowExportDialog(false)}
                markdown={markdown}
            />
        {/* Keyboard Shortcuts Help */}
        <div className={`mt-4 p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} text-sm`}>
          <h3 className="font-bold mb-2">Keyboard Shortcuts</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>Ctrl + B: Bold</div>
            <div>Ctrl + I: Italic</div>
            <div>Ctrl + Z: Undo</div>
            <div>Ctrl + Shift + Z: Redo</div>
            <div>Ctrl + S: Save</div>
            <div>Tab: Indent</div>
          </div>
        </div>
      </div>
  );
};

export default MarkdownEditor;
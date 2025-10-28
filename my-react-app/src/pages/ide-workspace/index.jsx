import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import FileExplorer from './components/FileExplorer';
import CodeEditor from './components/CodeEditor';
import PreviewPanel from './components/PreviewPanel';
import ConsolePanel from './components/ConsolePanel';
import ToolbarActions from './components/ToolbarActions';
import TabManager from './components/TabManager';

const IDEWorkspace = () => {
  const [isExplorerCollapsed, setIsExplorerCollapsed] = useState(false);
  const [activeFile, setActiveFile] = useState('App.jsx');
  const [isRunning, setIsRunning] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isConsoleVisible, setIsConsoleVisible] = useState(true);
  const [layoutMode, setLayoutMode] = useState('horizontal'); // horizontal, vertical, preview-only

  const handleRun = () => {
    setIsRunning(!isRunning);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  const handleDeploy = (platform) => {
    console.log('Deploying to:', platform);
  };

  const handleFileChange = (fileName, content) => {
    console.log('File changed:', fileName, content);
  };

  const handleFileSelect = (fileName) => {
    setActiveFile(fileName);
  };

  const handleFileClose = (fileName) => {
    console.log('File closed:', fileName);
  };

  const toggleConsole = () => {
    setIsConsoleVisible(!isConsoleVisible);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex h-screen pt-16">
        {/* File Explorer */}
        <FileExplorer 
          isCollapsed={isExplorerCollapsed}
          onToggle={() => setIsExplorerCollapsed(!isExplorerCollapsed)}
        />

        {/* Main Content Area */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${
          isExplorerCollapsed ? 'ml-12' : 'ml-64'
        }`}>
          {/* Toolbar */}
          <ToolbarActions
            onRun={handleRun}
            onSave={handleSave}
            onDeploy={handleDeploy}
            isRunning={isRunning}
            isSaving={isSaving}
          />

          {/* Tab Manager */}
          <TabManager
            activeFile={activeFile}
            onFileSelect={handleFileSelect}
            onFileClose={handleFileClose}
          />

          {/* Editor and Preview Area */}
          <div className="flex-1 flex">
            {/* Code Editor */}
            <div className={`${layoutMode === 'preview-only' ? 'hidden' : 'flex-1'} border-r border-border`}>
              <CodeEditor
                activeFile={activeFile}
                onFileChange={handleFileChange}
              />
            </div>

            {/* Preview Panel */}
            <div className={`${layoutMode === 'vertical' ? 'flex-1' : layoutMode === 'preview-only' ? 'flex-1' : 'w-1/2'}`}>
              <PreviewPanel
                code=""
                isRunning={isRunning}
              />
            </div>
          </div>

          {/* Console Panel */}
          <ConsolePanel
            isVisible={isConsoleVisible}
            onToggle={toggleConsole}
          />
        </div>

        {/* Layout Controls */}
        <div className="fixed bottom-4 right-4 flex flex-col space-y-2 z-50">
          <div className="bg-card border border-border rounded-lg p-2 shadow-brand layered-depth">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setLayoutMode('horizontal')}
                className={`p-2 rounded-md transition-colors ${
                  layoutMode === 'horizontal' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                title="Horizontal Layout"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="1" y="2" width="6" height="12" rx="1" />
                  <rect x="9" y="2" width="6" height="12" rx="1" />
                </svg>
              </button>
              <button
                onClick={() => setLayoutMode('vertical')}
                className={`p-2 rounded-md transition-colors ${
                  layoutMode === 'vertical' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                title="Vertical Layout"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="2" y="1" width="12" height="6" rx="1" />
                  <rect x="2" y="9" width="12" height="6" rx="1" />
                </svg>
              </button>
              <button
                onClick={() => setLayoutMode('preview-only')}
                className={`p-2 rounded-md transition-colors ${
                  layoutMode === 'preview-only' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                title="Preview Only"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="2" y="2" width="12" height="12" rx="1" />
                </svg>
              </button>
            </div>
          </div>

          <button
            onClick={toggleConsole}
            className={`p-3 rounded-full shadow-brand transition-all breathing-element ${
              isConsoleVisible
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-muted-foreground hover:text-foreground border border-border'
            }`}
            title={isConsoleVisible ? 'Hide Console' : 'Show Console'}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 1v10h10V5H5zm1 2h8v1H6V7zm0 2h8v1H6V9zm0 2h5v1H6v-1z"/>
            </svg>
          </button>
        </div>

        {/* Live Collaboration Indicator */}
        <div className="fixed top-20 right-4 z-40">
          <div className="bg-card border border-border rounded-lg p-3 shadow-brand layered-depth">
            <div className="flex items-center space-x-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full border-2 border-background flex items-center justify-center">
                  <span className="text-xs font-bold text-white">JD</span>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-accent to-success rounded-full border-2 border-background flex items-center justify-center">
                  <span className="text-xs font-bold text-white">AS</span>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-warning to-destructive rounded-full border-2 border-background flex items-center justify-center">
                  <span className="text-xs font-bold text-white">MK</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">3 Active</div>
                <div className="text-xs text-muted-foreground">Collaborating now</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IDEWorkspace;
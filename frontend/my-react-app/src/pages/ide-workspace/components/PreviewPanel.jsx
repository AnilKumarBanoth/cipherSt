import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PreviewPanel = ({ code, isRunning }) => {
  const [previewMode, setPreviewMode] = useState('desktop');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const previewModes = [
    { id: 'desktop', name: 'Desktop', icon: 'Monitor', width: '100%' },
    { id: 'tablet', name: 'Tablet', icon: 'Tablet', width: '768px' },
    { id: 'mobile', name: 'Mobile', icon: 'Smartphone', width: '375px' }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const mockPreviewContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>React App Preview</title>
      <style>
        body { 
          margin: 0; 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .app-container {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          text-align: center;
          max-width: 400px;
          width: 90%;
        }
        h1 { color: #333; margin-bottom: 1rem; }
        p { color: #666; margin-bottom: 2rem; }
        .counter {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin: 1rem 0;
        }
        button {
          background: #667eea;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          transition: background 0.2s;
        }
        button:hover { background: #5a6fd8; }
        .count { font-weight: bold; font-size: 1.2rem; }
        .status { 
          margin-top: 1rem; 
          padding: 0.5rem; 
          background: #f0f9ff; 
          border-radius: 6px; 
          color: #0369a1;
          font-size: 0.9rem;
        }
      </style>
    </head>
    <body>
      <div class="app-container">
        <h1>Welcome to CipherStudio</h1>
        <p>Start building amazing React applications!</p>
        <div class="counter">
          <button onClick="updateCount(-1)">-</button>
          <span class="count" id="count">Count: 0</span>
          <button onClick="updateCount(1)">+</button>
        </div>
        <div class="status">
          ✨ Live preview is running
        </div>
      </div>
      <script>
        let count = 0;
        function updateCount(delta) {
          count += delta;
          document.getElementById('count').textContent = 'Count: ' + count;
        }
      </script>
    </body>
    </html>
  `;

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Preview Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Eye" size={16} className="text-primary" />
            <span className="text-sm font-medium">Preview</span>
            {isRunning && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse-glow"></div>
                <span className="text-xs text-success">Live</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-1 bg-muted/30 rounded-lg p-1">
            {previewModes?.map(mode => (
              <button
                key={mode?.id}
                onClick={() => setPreviewMode(mode?.id)}
                className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs transition-colors ${
                  previewMode === mode?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                title={mode?.name}
              >
                <Icon name={mode?.icon} size={12} />
                <span className="hidden sm:inline">{mode?.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors disabled:opacity-50"
            title="Refresh Preview"
          >
            <Icon 
              name="RefreshCw" 
              size={14} 
              className={isRefreshing ? 'animate-spin' : ''}
            />
          </button>
          <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <Icon name="ExternalLink" size={14} />
          </button>
          <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <Icon name="Settings" size={14} />
          </button>
        </div>
      </div>
      {/* Preview Content */}
      <div className="flex-1 flex items-center justify-center bg-muted/10 p-4">
        <div 
          className="bg-white rounded-lg shadow-brand overflow-hidden transition-all duration-300"
          style={{ 
            width: previewModes?.find(m => m?.id === previewMode)?.width,
            maxWidth: '100%',
            height: previewMode === 'mobile' ? '667px' : '500px'
          }}
        >
          {isRunning ? (
            <iframe
              srcDoc={mockPreviewContent}
              className="w-full h-full border-0"
              title="App Preview"
              sandbox="allow-scripts allow-same-origin"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mb-4">
                <Icon name="Play" size={24} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Preview Not Running
              </h3>
              <p className="text-muted-foreground mb-4">
                Click the run button to start the live preview
              </p>
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                <Icon name="Play" size={16} />
                <span>Start Preview</span>
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Preview Footer */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-card text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span>localhost:3000</span>
          <span>•</span>
          <span>React 18.2.0</span>
          <span>•</span>
          <span>Vite 4.0.0</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="Wifi" size={12} className="text-success" />
            <span>Connected</span>
          </div>
          <span>Build time: 1.2s</span>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
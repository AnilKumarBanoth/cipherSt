import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ConsolePanel = ({ isVisible, onToggle }) => {
  const [activeTab, setActiveTab] = useState('console');
  const [consoleInput, setConsoleInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const consoleEndRef = useRef(null);

  const consoleTabs = [
    { id: 'console', name: 'Console', icon: 'Terminal' },
    { id: 'problems', name: 'Problems', icon: 'AlertCircle', count: 2 },
    { id: 'output', name: 'Output', icon: 'FileText' },
    { id: 'terminal', name: 'Terminal', icon: 'Square' }
  ];

  const consoleMessages = [
    {
      id: 1,
      type: 'info',
      message: 'CipherStudio development server started',
      timestamp: '15:45:23',
      source: 'webpack'
    },
    {
      id: 2,
      type: 'success',
      message: 'Compiled successfully in 1.2s',
      timestamp: '15:45:24',
      source: 'webpack'
    },
    {
      id: 3,
      type: 'log',
      message: 'App component rendered',
      timestamp: '15:45:25',
      source: 'React'
    },
    {
      id: 4,
      type: 'warning',
      message: 'Component is missing key prop in list',
      timestamp: '15:45:26',
      source: 'React',
      file: 'App.jsx:15'
    },
    {
      id: 5,
      type: 'error',
      message: 'Cannot read property "map" of undefined',
      timestamp: '15:45:27',
      source: 'Runtime',
      file: 'App.jsx:23',
      stack: 'at App.jsx:23:15\nat renderComponent'
    }
  ];

  const problems = [
    {
      id: 1,
      type: 'error',
      message: 'Expected ";" but found "}"',
      file: 'App.jsx',
      line: 15,
      column: 23,
      source: 'ESLint'
    },
    {
      id: 2,
      type: 'warning',
      message: 'Unused variable "count"',
      file: 'components/Counter.jsx',
      line: 8,
      column: 9,
      source: 'ESLint'
    }
  ];

  const getMessageIcon = (type) => {
    switch (type) {
      case 'error': return 'XCircle';
      case 'warning': return 'AlertTriangle';
      case 'success': return 'CheckCircle';
      case 'info': return 'Info';
      default: return 'Circle';
    }
  };

  const getMessageColor = (type) => {
    switch (type) {
      case 'error': return 'text-destructive';
      case 'warning': return 'text-warning';
      case 'success': return 'text-success';
      case 'info': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const handleConsoleSubmit = (e) => {
    e?.preventDefault();
    if (!consoleInput?.trim()) return;

    setCommandHistory(prev => [...prev, consoleInput]);
    setConsoleInput('');
    setHistoryIndex(-1);

    // Simulate command execution
    console.log('Executing:', consoleInput);
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'ArrowUp') {
      e?.preventDefault();
      if (historyIndex < commandHistory?.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setConsoleInput(commandHistory?.[commandHistory?.length - 1 - newIndex]);
      }
    } else if (e?.key === 'ArrowDown') {
      e?.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setConsoleInput(commandHistory?.[commandHistory?.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setConsoleInput('');
      }
    }
  };

  useEffect(() => {
    consoleEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [consoleMessages]);

  if (!isVisible) return null;

  return (
    <div className="bg-card border-t border-border">
      {/* Console Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <div className="flex items-center space-x-1">
          {consoleTabs?.map(tab => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                activeTab === tab?.id
                  ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={tab?.icon} size={14} />
              <span>{tab?.name}</span>
              {tab?.count && (
                <span className="bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5 rounded-full">
                  {tab?.count}
                </span>
              )}
            </button>
          ))}
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <Icon name="Trash2" size={14} />
          </button>
          <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <Icon name="Filter" size={14} />
          </button>
          <button
            onClick={onToggle}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <Icon name="ChevronDown" size={14} />
          </button>
        </div>
      </div>
      {/* Console Content */}
      <div className="h-64 overflow-y-auto">
        {activeTab === 'console' && (
          <div className="p-4 space-y-2 font-mono text-sm">
            {consoleMessages?.map(msg => (
              <div key={msg?.id} className="flex items-start space-x-3 group">
                <span className="text-xs text-muted-foreground mt-0.5 w-16 flex-shrink-0">
                  {msg?.timestamp}
                </span>
                <Icon 
                  name={getMessageIcon(msg?.type)} 
                  size={14} 
                  className={`mt-0.5 flex-shrink-0 ${getMessageColor(msg?.type)}`}
                />
                <div className="flex-1 min-w-0">
                  <div className={`${getMessageColor(msg?.type)}`}>
                    {msg?.message}
                  </div>
                  {msg?.file && (
                    <div className="text-xs text-muted-foreground mt-1">
                      at {msg?.file}
                    </div>
                  )}
                  {msg?.stack && (
                    <div className="text-xs text-muted-foreground mt-1 pl-4 border-l-2 border-muted">
                      {msg?.stack}
                    </div>
                  )}
                </div>
                <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  {msg?.source}
                </span>
              </div>
            ))}
            <div ref={consoleEndRef} />
          </div>
        )}

        {activeTab === 'problems' && (
          <div className="p-4 space-y-2">
            {problems?.map(problem => (
              <div key={problem?.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/30 cursor-pointer group">
                <Icon 
                  name={problem?.type === 'error' ? 'XCircle' : 'AlertTriangle'} 
                  size={16} 
                  className={problem?.type === 'error' ? 'text-destructive' : 'text-warning'}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-foreground">{problem?.message}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {problem?.file}:{problem?.line}:{problem?.column} - {problem?.source}
                  </div>
                </div>
                <Icon name="ExternalLink" size={12} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'output' && (
          <div className="p-4 font-mono text-sm text-muted-foreground">
            <div>Build started at {new Date()?.toLocaleTimeString()}</div>
            <div>Compiling...</div>
            <div className="text-success">✓ Compiled successfully</div>
            <div>Bundle size: 2.3 MB</div>
            <div>Build time: 1.2s</div>
          </div>
        )}

        {activeTab === 'terminal' && (
          <div className="p-4 font-mono text-sm">
            <div className="space-y-1 mb-4">
              <div className="text-muted-foreground">$ npm start</div>
              <div className="text-success">Starting development server...</div>
              <div className="text-accent">Local: http://localhost:3000</div>
              <div className="text-muted-foreground">webpack compiled with 1 warning</div>
            </div>
            
            <form onSubmit={handleConsoleSubmit} className="flex items-center space-x-2">
              <span className="text-primary">$</span>
              <input
                type="text"
                value={consoleInput}
                onChange={(e) => setConsoleInput(e?.target?.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-foreground outline-none"
                placeholder="Type a command..."
                autoComplete="off"
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsolePanel;
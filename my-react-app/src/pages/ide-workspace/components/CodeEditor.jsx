import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const CodeEditor = ({ activeFile, onFileChange }) => {
  const [code, setCode] = useState(`import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to CipherStudio</h1>
        <p>Start building amazing React applications!</p>
        <div className="counter">
          <button onClick={() => setCount(count - 1)}>-</button>
          <span>Count: {count}</span>
          <button onClick={() => setCount(count + 1)}>+</button>
        </div>
      </header>
    </div>
  );
}

export default App;`);

  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const [isModified, setIsModified] = useState(false);
  const textareaRef = useRef(null);

  const handleCodeChange = (e) => {
    const newCode = e?.target?.value;
    setCode(newCode);
    setIsModified(true);
    onFileChange?.(activeFile, newCode);
    
    // Update cursor position
    const textarea = textareaRef?.current;
    if (textarea) {
      const lines = newCode?.substring(0, textarea?.selectionStart)?.split('\n');
      setCursorPosition({
        line: lines?.length,
        column: lines?.[lines?.length - 1]?.length + 1
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e?.ctrlKey || e?.metaKey) {
      if (e?.key === 's') {
        e?.preventDefault();
        setIsModified(false);
        // Simulate save
        console.log('File saved');
      }
    }
  };

  const formatCode = () => {
    // Simple code formatting simulation
    const formatted = code?.split('\n')?.map(line => line?.trim())?.join('\n')?.replace(/;/g, ';\n')?.replace(/{/g, '{\n')?.replace(/}/g, '\n}');
    setCode(formatted);
  };

  const lineNumbers = code?.split('\n')?.map((_, index) => index + 1);

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Code2" size={16} className="text-primary" />
            <span className="text-sm font-medium">{activeFile}</span>
            {isModified && (
              <div className="w-2 h-2 bg-warning rounded-full"></div>
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            Ln {cursorPosition?.line}, Col {cursorPosition?.column}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={formatCode}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            title="Format Code (Shift+Alt+F)"
          >
            <Icon name="AlignLeft" size={14} />
          </button>
          <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <Icon name="Search" size={14} />
          </button>
          <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <Icon name="Settings" size={14} />
          </button>
        </div>
      </div>
      {/* Editor Content */}
      <div className="flex-1 flex">
        {/* Line Numbers */}
        <div className="bg-muted/30 px-3 py-4 text-right border-r border-border">
          {lineNumbers?.map(num => (
            <div key={num} className="text-xs text-muted-foreground leading-6 font-mono">
              {num}
            </div>
          ))}
        </div>

        {/* Code Area */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={handleCodeChange}
            onKeyDown={handleKeyDown}
            className="w-full h-full p-4 bg-transparent text-foreground font-mono text-sm leading-6 resize-none outline-none"
            style={{ 
              fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
              tabSize: 2
            }}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
          
          {/* Syntax highlighting overlay would go here in a real implementation */}
          <div className="absolute top-4 right-4 opacity-50">
            <div className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
              JSX
            </div>
          </div>
        </div>
      </div>
      {/* Editor Footer */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-card text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span>UTF-8</span>
          <span>LF</span>
          <span>JavaScript React</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Spaces: 2</span>
          <span>Tab Size: 2</span>
          <div className="flex items-center space-x-1">
            <Icon name="Zap" size={12} className="text-accent" />
            <span>IntelliSense</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
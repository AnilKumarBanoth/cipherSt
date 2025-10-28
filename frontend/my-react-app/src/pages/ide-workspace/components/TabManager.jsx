import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TabManager = ({ activeFile, onFileSelect, onFileClose }) => {
  const [openFiles, setOpenFiles] = useState([
    { name: 'App.jsx', path: 'src/App.jsx', isModified: true, type: 'jsx' },
    { name: 'index.js', path: 'src/index.js', isModified: false, type: 'js' },
    { name: 'Header.jsx', path: 'src/components/Header.jsx', isModified: false, type: 'jsx' },
    { name: 'styles.css', path: 'src/styles.css', isModified: true, type: 'css' },
    { name: 'package.json', path: 'package.json', isModified: false, type: 'json' }
  ]);

  const getFileIcon = (type) => {
    switch (type) {
      case 'jsx': return 'Code2';
      case 'js': return 'FileText';
      case 'css': return 'Palette';
      case 'json': return 'Settings';
      default: return 'FileText';
    }
  };

  const getFileColor = (type) => {
    switch (type) {
      case 'jsx': return 'text-accent';
      case 'js': return 'text-warning';
      case 'css': return 'text-secondary';
      case 'json': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const handleCloseFile = (e, fileName) => {
    e?.stopPropagation();
    setOpenFiles(prev => prev?.filter(file => file?.name !== fileName));
    onFileClose?.(fileName);
  };

  const handleCloseAll = () => {
    setOpenFiles([]);
  };

  const handleCloseOthers = (keepFile) => {
    setOpenFiles(prev => prev?.filter(file => file?.name === keepFile));
  };

  return (
    <div className="flex items-center bg-card border-b border-border">
      {/* File Tabs */}
      <div className="flex-1 flex items-center overflow-x-auto scrollbar-hide">
        {openFiles?.map(file => (
          <div
            key={file?.name}
            onClick={() => onFileSelect?.(file?.name)}
            className={`flex items-center space-x-2 px-4 py-2.5 border-r border-border cursor-pointer group transition-colors min-w-0 ${
              activeFile === file?.name
                ? 'bg-background text-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
            }`}
          >
            <Icon 
              name={getFileIcon(file?.type)} 
              size={14} 
              className={getFileColor(file?.type)}
            />
            <span className="text-sm font-medium truncate max-w-32">
              {file?.name}
            </span>
            {file?.isModified && (
              <div className="w-2 h-2 bg-warning rounded-full flex-shrink-0"></div>
            )}
            <button
              onClick={(e) => handleCloseFile(e, file?.name)}
              className="p-0.5 rounded-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
            >
              <Icon name="X" size={12} />
            </button>
          </div>
        ))}
      </div>
      {/* Tab Actions */}
      <div className="flex items-center border-l border-border">
        <div className="relative group">
          <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <Icon name="MoreHorizontal" size={16} />
          </button>
          
          {/* Dropdown Menu */}
          <div className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-lg shadow-brand opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 layered-depth">
            <div className="py-2">
              <button
                onClick={handleCloseAll}
                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted/50 transition-colors"
              >
                <Icon name="X" size={14} />
                <span>Close All</span>
              </button>
              <button
                onClick={() => handleCloseOthers(activeFile)}
                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted/50 transition-colors"
              >
                <Icon name="Minus" size={14} />
                <span>Close Others</span>
              </button>
              <div className="border-t border-border my-1"></div>
              <button className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted/50 transition-colors">
                <Icon name="Copy" size={14} />
                <span>Copy Path</span>
              </button>
              <button className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted/50 transition-colors">
                <Icon name="FolderOpen" size={14} />
                <span>Reveal in Explorer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabManager;
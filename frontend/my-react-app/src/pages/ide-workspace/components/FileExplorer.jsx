import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FileExplorer = ({ isCollapsed, onToggle }) => {
  const [expandedFolders, setExpandedFolders] = useState(['src', 'components']);
  const [selectedFile, setSelectedFile] = useState('App.jsx');

  const projectStructure = [
    {
      name: 'public',
      type: 'folder',
      children: [
        { name: 'index.html', type: 'file', icon: 'FileText' },
        { name: 'favicon.ico', type: 'file', icon: 'Image' },
        { name: 'manifest.json', type: 'file', icon: 'Settings' }
      ]
    },
    {
      name: 'src',
      type: 'folder',
      children: [
        { name: 'App.jsx', type: 'file', icon: 'Code2' },
        { name: 'index.js', type: 'file', icon: 'Code2' },
        {
          name: 'components',
          type: 'folder',
          children: [
            { name: 'Header.jsx', type: 'file', icon: 'Code2' },
            { name: 'Sidebar.jsx', type: 'file', icon: 'Code2' },
            { name: 'Button.jsx', type: 'file', icon: 'Code2' }
          ]
        },
        {
          name: 'pages',
          type: 'folder',
          children: [
            { name: 'Home.jsx', type: 'file', icon: 'Code2' },
            { name: 'About.jsx', type: 'file', icon: 'Code2' }
          ]
        },
        {
          name: 'styles',
          type: 'folder',
          children: [
            { name: 'index.css', type: 'file', icon: 'Palette' },
            { name: 'tailwind.css', type: 'file', icon: 'Palette' }
          ]
        }
      ]
    },
    { name: 'package.json', type: 'file', icon: 'Package' },
    { name: 'vite.config.js', type: 'file', icon: 'Settings' },
    { name: 'README.md', type: 'file', icon: 'FileText' }
  ];

  const toggleFolder = (folderName) => {
    setExpandedFolders(prev => 
      prev?.includes(folderName) 
        ? prev?.filter(name => name !== folderName)
        : [...prev, folderName]
    );
  };

  const getFileIcon = (file) => {
    if (file?.type === 'folder') {
      return expandedFolders?.includes(file?.name) ? 'FolderOpen' : 'Folder';
    }
    return file?.icon || 'FileText';
  };

  const renderFileTree = (items, depth = 0) => {
    return items?.map((item, index) => (
      <div key={`${item?.name}-${depth}-${index}`}>
        <div
          className={`flex items-center space-x-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors group ${
            selectedFile === item?.name 
              ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => {
            if (item?.type === 'folder') {
              toggleFolder(item?.name);
            } else {
              setSelectedFile(item?.name);
            }
          }}
        >
          <Icon 
            name={getFileIcon(item)} 
            size={16} 
            className={item?.type === 'folder' ? 'text-accent' : ''}
          />
          {!isCollapsed && (
            <>
              <span className="text-sm font-medium truncate">{item?.name}</span>
              {item?.type === 'file' && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                  <Icon name="MoreHorizontal" size={12} />
                </div>
              )}
            </>
          )}
        </div>
        {item?.children && expandedFolders?.includes(item?.name) && !isCollapsed && (
          <div>
            {renderFileTree(item?.children, depth + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className={`bg-card border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-12' : 'w-64'
    }`}>
      <div className="flex items-center justify-between p-3 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <Icon name="FolderOpen" size={18} className="text-primary" />
            <span className="font-semibold text-sm">Explorer</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        >
          <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={14} />
        </button>
      </div>
      
      {!isCollapsed && (
        <div className="p-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              React Dashboard
            </span>
            <div className="flex items-center space-x-1">
              <button className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                <Icon name="Plus" size={12} />
              </button>
              <button className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                <Icon name="RefreshCw" size={12} />
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="overflow-y-auto flex-1 px-2 pb-2">
        {renderFileTree(projectStructure)}
      </div>
    </div>
  );
};

export default FileExplorer;
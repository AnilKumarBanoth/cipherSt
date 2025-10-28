import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ToolbarActions = ({ onRun, onSave, onDeploy, isRunning, isSaving }) => {
  const [showDeployMenu, setShowDeployMenu] = useState(false);

  const deployOptions = [
    { id: 'vercel', name: 'Vercel', icon: 'Zap', description: 'Deploy to Vercel' },
    { id: 'netlify', name: 'Netlify', icon: 'Globe', description: 'Deploy to Netlify' },
    { id: 'github', name: 'GitHub Pages', icon: 'GitBranch', description: 'Deploy to GitHub Pages' },
    { id: 'custom', name: 'Custom', icon: 'Server', description: 'Custom deployment' }
  ];

  const quickActions = [
    { id: 'format', name: 'Format', icon: 'AlignLeft', shortcut: 'Shift+Alt+F' },
    { id: 'find', name: 'Find', icon: 'Search', shortcut: 'Ctrl+F' },
    { id: 'replace', name: 'Replace', icon: 'Replace', shortcut: 'Ctrl+H' },
    { id: 'comment', name: 'Comment', icon: 'MessageSquare', shortcut: 'Ctrl+/' }
  ];

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
      {/* Left Actions */}
      <div className="flex items-center space-x-3">
        <Button
          variant={isRunning ? "destructive" : "default"}
          size="sm"
          iconName={isRunning ? "Square" : "Play"}
          iconPosition="left"
          onClick={onRun}
          className="breathing-element"
        >
          {isRunning ? 'Stop' : 'Run'}
        </Button>

        <Button
          variant="outline"
          size="sm"
          iconName="Save"
          iconPosition="left"
          onClick={onSave}
          loading={isSaving}
          className="breathing-element"
        >
          Save
        </Button>

        <div className="relative">
          <Button
            variant="secondary"
            size="sm"
            iconName="Rocket"
            iconPosition="left"
            onClick={() => setShowDeployMenu(!showDeployMenu)}
            className="breathing-element"
          >
            Deploy
          </Button>

          {showDeployMenu && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-brand z-50 layered-depth">
              <div className="p-2">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                  Deploy Options
                </div>
                {deployOptions?.map(option => (
                  <button
                    key={option?.id}
                    onClick={() => {
                      onDeploy?.(option?.id);
                      setShowDeployMenu(false);
                    }}
                    className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm text-popover-foreground hover:bg-muted/50 transition-colors"
                  >
                    <Icon name={option?.icon} size={16} className="text-primary" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">{option?.name}</div>
                      <div className="text-xs text-muted-foreground">{option?.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-border"></div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-1">
          {quickActions?.map(action => (
            <button
              key={action?.id}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors breathing-element"
              title={`${action?.name} (${action?.shortcut})`}
            >
              <Icon name={action?.icon} size={16} />
            </button>
          ))}
        </div>
      </div>
      {/* Center Status */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-success animate-pulse-glow' : 'bg-muted-foreground'}`}></div>
          <span className="text-sm text-muted-foreground">
            {isRunning ? 'Running on localhost:3000' : 'Ready to run'}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Users" size={12} />
          <span>3 collaborators</span>
        </div>
      </div>
      {/* Right Actions */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="GitBranch" size={14} />
          <span>main</span>
          <Icon name="Circle" size={8} className="text-warning" />
          <span>2 changes</span>
        </div>

        <div className="h-6 w-px bg-border"></div>

        <Button
          variant="ghost"
          size="sm"
          iconName="Share2"
          className="breathing-element"
        >
          Share
        </Button>

        <Button
          variant="ghost"
          size="sm"
          iconName="Settings"
          className="breathing-element"
        >
          Settings
        </Button>

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">JD</span>
          </div>
          <div className="text-sm">
            <div className="font-medium text-foreground">John Doe</div>
            <div className="text-xs text-muted-foreground">Online</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolbarActions;
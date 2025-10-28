import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onAction }) => {
  const actions = [
    {
      id: 'new-react',
      title: 'New React Project',
      description: 'Start with a modern React template',
      icon: 'Plus',
      color: 'default',
      featured: true
    },
    {
      id: 'import-github',
      title: 'Import from GitHub',
      description: 'Clone an existing repository',
      icon: 'GitBranch',
      color: 'outline'
    },
    {
      id: 'browse-templates',
      title: 'Browse Templates',
      description: 'Explore starter templates',
      icon: 'Layout',
      color: 'outline'
    },
    {
      id: 'join-workspace',
      title: 'Join Workspace',
      description: 'Collaborate with your team',
      icon: 'Users',
      color: 'outline'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-card-foreground">Quick Actions</h3>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse-glow"></div>
          <span className="text-xs text-muted-foreground">Ready to code</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => onAction(action?.id)}
            className={`p-4 rounded-lg border text-left transition-all duration-200 breathing-element group ${
              action?.featured 
                ? 'bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 hover:border-primary/40' :'bg-muted/20 border-border hover:border-primary/30 hover:bg-muted/30'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                action?.featured 
                  ? 'bg-gradient-to-br from-primary to-secondary text-white' :'bg-muted text-muted-foreground group-hover:text-card-foreground'
              }`}>
                <Button
                  variant="ghost"
                  size="icon"
                  iconName={action?.icon}
                  className="w-5 h-5 p-0 hover:bg-transparent"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium mb-1 ${
                  action?.featured ? 'text-primary' : 'text-card-foreground'
                }`}>
                  {action?.title}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {action?.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Need help getting started?</span>
          <button 
            onClick={() => onAction('help')}
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            View Tutorials
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const [activeProject, setActiveProject] = useState('react-dashboard');
  const location = useLocation();

  const navigationItems = [
    { name: 'IDE Workspace', path: '/ide-workspace', icon: 'Code2', description: 'Code editor' },
    { name: 'Projects', path: '/project-dashboard', icon: 'FolderOpen', description: 'Manage projects' },
    { name: 'Analytics', path: '/profile-analytics', icon: 'BarChart3', description: 'View insights' },
  ];

  const recentProjects = [
    { id: 'react-dashboard', name: 'React Dashboard', type: 'React', status: 'active', lastModified: '2 min ago' },
    { id: 'vue-portfolio', name: 'Vue Portfolio', type: 'Vue', status: 'deployed', lastModified: '1 hour ago' },
    { id: 'next-blog', name: 'Next.js Blog', type: 'Next.js', status: 'building', lastModified: '3 hours ago' },
    { id: 'svelte-app', name: 'Svelte App', type: 'Svelte', status: 'draft', lastModified: '1 day ago' },
  ];

  const quickActions = [
    { name: 'New React Project', icon: 'Plus', action: () => console.log('New React project') },
    { name: 'Import from GitHub', icon: 'GitBranch', action: () => console.log('Import from GitHub') },
    { name: 'Browse Templates', icon: 'Layout', action: () => console.log('Browse templates') },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-accent';
      case 'deployed': return 'text-success';
      case 'building': return 'text-warning';
      case 'draft': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'Play';
      case 'deployed': return 'CheckCircle';
      case 'building': return 'Loader';
      case 'draft': return 'FileText';
      default: return 'Circle';
    }
  };

  return (
    <aside className={`fixed left-0 top-16 bottom-0 z-40 bg-card border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-80'
    } lg:translate-x-0`}>
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <Icon name="Layers" size={20} className="text-primary" />
              <span className="font-semibold text-card-foreground">Workspace</span>
            </div>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-card-foreground hover:bg-muted/50 transition-colors breathing-element"
          >
            <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 breathing-element group ${
                  isActivePath(item?.path)
                    ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-card-foreground hover:bg-muted/50'
                }`}
                title={isCollapsed ? item?.name : ''}
              >
                <Icon name={item?.icon} size={18} />
                {!isCollapsed && (
                  <div className="flex-1">
                    <div className="font-medium">{item?.name}</div>
                    <div className="text-xs text-muted-foreground group-hover:text-muted-foreground/80">
                      {item?.description}
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </nav>

          {!isCollapsed && (
            <>
              {/* Quick Actions */}
              <div className="px-4 py-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Quick Actions
                </h3>
                <div className="space-y-1">
                  {quickActions?.map((action, index) => (
                    <button
                      key={index}
                      onClick={action?.action}
                      className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-card-foreground hover:bg-muted/50 transition-colors breathing-element"
                    >
                      <Icon name={action?.icon} size={16} />
                      <span>{action?.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Projects */}
              <div className="px-4 py-2">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Recent Projects
                  </h3>
                  <Button variant="ghost" size="xs" iconName="Plus">
                    New
                  </Button>
                </div>
                <div className="space-y-1">
                  {recentProjects?.map((project) => (
                    <button
                      key={project?.id}
                      onClick={() => setActiveProject(project?.id)}
                      className={`flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg text-sm transition-all duration-200 breathing-element group ${
                        activeProject === project?.id
                          ? 'bg-accent/10 text-accent border border-accent/20' :'text-muted-foreground hover:text-card-foreground hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        <Icon 
                          name={getStatusIcon(project?.status)} 
                          size={16} 
                          className={`${getStatusColor(project?.status)} ${project?.status === 'building' ? 'animate-spin' : ''}`}
                        />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <div className="font-medium truncate">{project?.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center space-x-2">
                          <span>{project?.type}</span>
                          <span>•</span>
                          <span>{project?.lastModified}</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Icon name="MoreHorizontal" size={14} className="text-muted-foreground" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Activity */}
              <div className="px-4 py-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Live Activity
                </h3>
                <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse-glow"></div>
                    <span className="text-xs text-muted-foreground">1,247 developers coding now</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse-glow"></div>
                    <span className="text-xs text-muted-foreground">89 projects deployed today</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border">
          {!isCollapsed ? (
            <div className="space-y-3">
              <Button 
                variant="default" 
                size="sm" 
                fullWidth 
                iconName="Zap" 
                iconPosition="left"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              >
                Upgrade Pro
              </Button>
              <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-muted/30">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">JD</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-card-foreground truncate">John Doe</div>
                  <div className="text-xs text-muted-foreground">Free Plan</div>
                </div>
                <Icon name="Settings" size={16} className="text-muted-foreground hover:text-card-foreground cursor-pointer breathing-element" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <button className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center breathing-element">
                <span className="text-xs font-bold text-white">JD</span>
              </button>
              <Icon name="Settings" size={16} className="text-muted-foreground hover:text-card-foreground cursor-pointer breathing-element" />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
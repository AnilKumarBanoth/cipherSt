import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'commit': return 'GitCommit';
      case 'deploy': return 'Rocket';
      case 'create': return 'Plus';
      case 'collaborate': return 'Users';
      case 'star': return 'Star';
      case 'fork': return 'GitBranch';
      case 'comment': return 'MessageCircle';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'commit': return 'text-primary';
      case 'deploy': return 'text-success';
      case 'create': return 'text-accent';
      case 'collaborate': return 'text-secondary';
      case 'star': return 'text-warning';
      case 'fork': return 'text-trust';
      case 'comment': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-card-foreground">Recent Activity</h3>
          <Icon name="Activity" size={18} className="text-muted-foreground" />
        </div>
      </div>
      <div className="p-4">
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {activities?.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 group">
              <div className={`w-8 h-8 rounded-full bg-muted/30 flex items-center justify-center flex-shrink-0 ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={14} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  {activity?.user?.avatar && (
                    <Image
                      src={activity?.user?.avatar}
                      alt={activity?.user?.avatarAlt}
                      className="w-5 h-5 rounded-full"
                    />
                  )}
                  <span className="text-sm font-medium text-card-foreground">
                    {activity?.user?.name || 'You'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(activity?.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {activity?.description}
                </p>
                
                {activity?.project && (
                  <div className="flex items-center space-x-2 mt-2">
                    <Icon name="Folder" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {activity?.project}
                    </span>
                  </div>
                )}
              </div>
              
              {activity?.actionable && (
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-muted/50">
                  <Icon name="ExternalLink" size={14} className="text-muted-foreground" />
                </button>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;
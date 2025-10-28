import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CommunityStats = ({ stats, recentActivity, followers }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'comment': return 'MessageCircle';
      case 'like': return 'Heart';
      case 'share': return 'Share';
      case 'follow': return 'UserPlus';
      case 'project': return 'FolderPlus';
      case 'review': return 'Eye';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'comment': return 'text-blue-500';
      case 'like': return 'text-red-500';
      case 'share': return 'text-green-500';
      case 'follow': return 'text-purple-500';
      case 'project': return 'text-orange-500';
      case 'review': return 'text-cyan-500';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground mb-1">Community Impact</h3>
          <p className="text-sm text-muted-foreground">Your contributions to the CipherStudio community</p>
        </div>
        <Icon name="Users" size={20} className="text-primary" />
      </div>
      {/* Community Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-muted/20 rounded-lg">
          <Icon name="Users" size={20} className="text-primary mx-auto mb-2" />
          <div className="text-lg font-bold text-card-foreground">{stats?.followers}</div>
          <div className="text-xs text-muted-foreground">Followers</div>
        </div>
        <div className="text-center p-4 bg-muted/20 rounded-lg">
          <Icon name="Heart" size={20} className="text-red-500 mx-auto mb-2" />
          <div className="text-lg font-bold text-card-foreground">{stats?.likes}</div>
          <div className="text-xs text-muted-foreground">Likes Received</div>
        </div>
        <div className="text-center p-4 bg-muted/20 rounded-lg">
          <Icon name="MessageCircle" size={20} className="text-blue-500 mx-auto mb-2" />
          <div className="text-lg font-bold text-card-foreground">{stats?.comments}</div>
          <div className="text-xs text-muted-foreground">Comments</div>
        </div>
        <div className="text-center p-4 bg-muted/20 rounded-lg">
          <Icon name="Share" size={20} className="text-green-500 mx-auto mb-2" />
          <div className="text-lg font-bold text-card-foreground">{stats?.shares}</div>
          <div className="text-xs text-muted-foreground">Shares</div>
        </div>
      </div>
      {/* Recent Community Activity */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-card-foreground mb-3">Recent Activity</h4>
        <div className="space-y-3">
          {recentActivity?.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-muted/10 rounded-lg">
              <div className={`w-8 h-8 rounded-full bg-muted/30 flex items-center justify-center flex-shrink-0`}>
                <Icon 
                  name={getActivityIcon(activity?.type)} 
                  size={14} 
                  className={getActivityColor(activity?.type)}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-card-foreground">{activity?.description}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <span>{activity?.time}</span>
                  {activity?.project && (
                    <>
                      <span>•</span>
                      <span className="text-primary">{activity?.project}</span>
                    </>
                  )}
                </div>
              </div>
              {activity?.count && (
                <div className="text-sm font-medium text-card-foreground">
                  +{activity?.count}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Top Followers */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-card-foreground">Recent Followers</h4>
          <button className="text-xs text-primary hover:text-primary/80 transition-colors">
            View All
          </button>
        </div>
        <div className="flex items-center gap-3">
          {followers?.slice(0, 8)?.map((follower, index) => (
            <div key={index} className="relative group">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-border group-hover:border-primary/50 transition-colors">
                <Image
                  src={follower?.avatar}
                  alt={follower?.avatarAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-popover border border-border rounded text-xs text-popover-foreground opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
                {follower?.name}
              </div>
            </div>
          ))}
          {followers?.length > 8 && (
            <div className="w-10 h-10 rounded-full bg-muted/30 border-2 border-border flex items-center justify-center">
              <span className="text-xs text-muted-foreground font-medium">
                +{followers?.length - 8}
              </span>
            </div>
          )}
        </div>
      </div>
      {/* Community Rank */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Trophy" size={16} className="text-warning" />
            <span className="text-sm font-medium text-card-foreground">Community Rank</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-card-foreground">#{stats?.rank}</div>
            <div className="text-xs text-muted-foreground">Top {stats?.percentile}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityStats;
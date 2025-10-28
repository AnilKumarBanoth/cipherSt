import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const AchievementBadges = ({ achievements }) => {
  const [filter, setFilter] = useState('all');

  const categories = [
    { value: 'all', label: 'All Badges', icon: 'Award' },
    { value: 'coding', label: 'Coding', icon: 'Code2' },
    { value: 'community', label: 'Community', icon: 'Users' },
    { value: 'learning', label: 'Learning', icon: 'BookOpen' },
    { value: 'milestone', label: 'Milestones', icon: 'Target' }
  ];

  const filteredAchievements = filter === 'all' 
    ? achievements 
    : achievements?.filter(achievement => achievement?.category === filter);

  const getBadgeColor = (rarity) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'epic': return 'from-purple-400 to-pink-500';
      case 'rare': return 'from-blue-400 to-cyan-500';
      case 'common': return 'from-green-400 to-emerald-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getRarityIcon = (rarity) => {
    switch (rarity) {
      case 'legendary': return 'Crown';
      case 'epic': return 'Zap';
      case 'rare': return 'Star';
      case 'common': return 'Award';
      default: return 'Circle';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground mb-1">Achievement Badges</h3>
          <p className="text-sm text-muted-foreground">
            {achievements?.filter(a => a?.unlocked)?.length} of {achievements?.length} badges earned
          </p>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Trophy" size={16} className="text-warning" />
          <span>Level {Math.floor(achievements?.filter(a => a?.unlocked)?.length / 5) + 1} Developer</span>
        </div>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories?.map((category) => (
          <button
            key={category?.value}
            onClick={() => setFilter(category?.value)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === category?.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/30 text-muted-foreground hover:text-card-foreground hover:bg-muted/50'
            }`}
          >
            <Icon name={category?.icon} size={14} />
            <span>{category?.label}</span>
          </button>
        ))}
      </div>
      {/* Achievement Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredAchievements?.map((achievement, index) => (
          <div
            key={index}
            className={`relative group p-4 rounded-xl border transition-all duration-200 breathing-element ${
              achievement?.unlocked
                ? 'border-border bg-card hover:bg-muted/20' :'border-muted/30 bg-muted/10 opacity-60'
            }`}
          >
            {/* Badge Icon */}
            <div className={`relative w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br ${getBadgeColor(achievement?.rarity)} flex items-center justify-center ${
              !achievement?.unlocked && 'grayscale'
            }`}>
              <Icon name={achievement?.icon} size={20} className="text-white" />
              {achievement?.unlocked && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-card flex items-center justify-center">
                  <Icon name="Check" size={10} className="text-white" />
                </div>
              )}
            </div>

            {/* Badge Info */}
            <div className="text-center">
              <h4 className="text-sm font-medium text-card-foreground mb-1 line-clamp-1">
                {achievement?.title}
              </h4>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                {achievement?.description}
              </p>
              
              {/* Rarity & Progress */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Icon name={getRarityIcon(achievement?.rarity)} size={12} className="text-warning" />
                  <span className="text-xs text-muted-foreground capitalize">{achievement?.rarity}</span>
                </div>
                {achievement?.progress && (
                  <span className="text-xs text-muted-foreground">
                    {achievement?.progress?.current}/{achievement?.progress?.total}
                  </span>
                )}
              </div>

              {/* Progress Bar */}
              {achievement?.progress && !achievement?.unlocked && (
                <div className="mt-2">
                  <div className="w-full bg-muted/30 rounded-full h-1">
                    <div 
                      className="h-1 bg-primary rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(achievement?.progress?.current / achievement?.progress?.total) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Unlock Date */}
              {achievement?.unlocked && achievement?.unlockedDate && (
                <div className="mt-2 text-xs text-muted-foreground">
                  Earned {achievement?.unlockedDate}
                </div>
              )}
            </div>

            {/* Tooltip on Hover */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover border border-border rounded-lg shadow-brand opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 w-48">
              <div className="text-sm font-medium text-popover-foreground mb-1">{achievement?.title}</div>
              <div className="text-xs text-muted-foreground">{achievement?.description}</div>
              {achievement?.hint && !achievement?.unlocked && (
                <div className="text-xs text-primary mt-1">Hint: {achievement?.hint}</div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Achievement Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-card-foreground">
              {achievements?.filter(a => a?.unlocked && a?.rarity === 'legendary')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Legendary</div>
          </div>
          <div>
            <div className="text-lg font-bold text-card-foreground">
              {achievements?.filter(a => a?.unlocked && a?.rarity === 'epic')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Epic</div>
          </div>
          <div>
            <div className="text-lg font-bold text-card-foreground">
              {achievements?.filter(a => a?.unlocked && a?.rarity === 'rare')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Rare</div>
          </div>
          <div>
            <div className="text-lg font-bold text-card-foreground">
              {achievements?.filter(a => a?.unlocked && a?.rarity === 'common')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Common</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadges;
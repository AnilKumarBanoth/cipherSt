import React from 'react';
import Icon from '../../../components/AppIcon';

const CodingStreak = ({ streakData, heatmapData }) => {
  const getDayIntensity = (commits) => {
    if (commits === 0) return 'bg-muted/20';
    if (commits <= 2) return 'bg-success/30';
    if (commits <= 5) return 'bg-success/60';
    if (commits <= 10) return 'bg-success/80';
    return 'bg-success';
  };

  const getMonthName = (monthIndex) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months?.[monthIndex];
  };

  const getDayName = (dayIndex) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days?.[dayIndex];
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground mb-1">Coding Streak</h3>
          <p className="text-sm text-muted-foreground">Your daily coding activity over the past year</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Icon name="Flame" size={16} className="text-warning" />
            <span className="text-sm font-medium text-card-foreground">
              {streakData?.current} day streak
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            Best: {streakData?.longest} days
          </div>
        </div>
      </div>
      {/* Streak Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-muted/20 rounded-lg">
          <div className="text-lg font-bold text-card-foreground">{streakData?.current}</div>
          <div className="text-xs text-muted-foreground">Current Streak</div>
        </div>
        <div className="text-center p-3 bg-muted/20 rounded-lg">
          <div className="text-lg font-bold text-card-foreground">{streakData?.longest}</div>
          <div className="text-xs text-muted-foreground">Longest Streak</div>
        </div>
        <div className="text-center p-3 bg-muted/20 rounded-lg">
          <div className="text-lg font-bold text-card-foreground">{streakData?.totalDays}</div>
          <div className="text-xs text-muted-foreground">Active Days</div>
        </div>
        <div className="text-center p-3 bg-muted/20 rounded-lg">
          <div className="text-lg font-bold text-card-foreground">{streakData?.totalCommits}</div>
          <div className="text-xs text-muted-foreground">Total Commits</div>
        </div>
      </div>
      {/* Activity Heatmap */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Month Labels */}
          <div className="flex mb-2">
            <div className="w-8"></div>
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="flex-1 text-xs text-muted-foreground text-center min-w-0">
                {getMonthName(i)}
              </div>
            ))}
          </div>

          {/* Heatmap Grid */}
          <div className="flex">
            {/* Day Labels */}
            <div className="w-8 flex flex-col justify-between text-xs text-muted-foreground">
              {['', 'Mon', '', 'Wed', '', 'Fri', '']?.map((day, i) => (
                <div key={i} className="h-3 flex items-center">
                  {day}
                </div>
              ))}
            </div>

            {/* Activity Grid */}
            <div className="flex-1 grid grid-cols-53 gap-1">
              {heatmapData?.map((week, weekIndex) =>
                week?.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-3 h-3 rounded-sm ${getDayIntensity(day?.commits)} hover:ring-2 hover:ring-primary/50 transition-all cursor-pointer`}
                    title={`${day?.date}: ${day?.commits} commits`}
                  ></div>
                ))
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
            <span>Less</span>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-sm bg-muted/20"></div>
              <div className="w-3 h-3 rounded-sm bg-success/30"></div>
              <div className="w-3 h-3 rounded-sm bg-success/60"></div>
              <div className="w-3 h-3 rounded-sm bg-success/80"></div>
              <div className="w-3 h-3 rounded-sm bg-success"></div>
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-card-foreground mb-3">Recent Activity</h4>
        <div className="space-y-2">
          {streakData?.recentActivity?.map((activity, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${getDayIntensity(activity?.commits)}`}></div>
                <span className="text-muted-foreground">{activity?.date}</span>
              </div>
              <span className="text-card-foreground font-medium">
                {activity?.commits} commits
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodingStreak;
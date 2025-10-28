import React from 'react';
import Icon from '../../../components/AppIcon';

const StorageUsage = ({ usage }) => {
  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getUsageColor = (percentage) => {
    if (percentage >= 90) return 'text-destructive bg-destructive/10 border-destructive/20';
    if (percentage >= 75) return 'text-warning bg-warning/10 border-warning/20';
    return 'text-success bg-success/10 border-success/20';
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'from-destructive to-destructive/80';
    if (percentage >= 75) return 'from-warning to-warning/80';
    return 'from-success to-success/80';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-card-foreground">Storage Usage</h3>
        <Icon name="HardDrive" size={18} className="text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {/* Overall Usage */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Total Usage</span>
            <span className={`text-sm font-medium px-2 py-1 rounded-full border ${getUsageColor(usage?.percentage)}`}>
              {usage?.percentage}%
            </span>
          </div>
          
          <div className="w-full bg-muted/30 rounded-full h-2 mb-2">
            <div 
              className={`h-2 rounded-full bg-gradient-to-r transition-all duration-300 ${getProgressColor(usage?.percentage)}`}
              style={{ width: `${usage?.percentage}%` }}
            ></div>
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatBytes(usage?.used)} used</span>
            <span>{formatBytes(usage?.total)} total</span>
          </div>
        </div>

        {/* Breakdown */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-card-foreground">Breakdown</h4>
          
          {usage?.breakdown?.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item?.color }}></div>
                <span className="text-sm text-muted-foreground">{item?.category}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-card-foreground">
                  {formatBytes(item?.size)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {item?.count} {item?.count === 1 ? 'file' : 'files'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-border">
          <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors">
            Manage Storage
          </button>
        </div>
      </div>
    </div>
  );
};

export default StorageUsage;
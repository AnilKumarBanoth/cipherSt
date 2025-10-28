import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ user, stats }) => {
  return (
    <div className="bg-card rounded-xl border border-border p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Profile Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-primary/20">
              <Image
                src={user?.avatar}
                alt={user?.avatarAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-card flex items-center justify-center">
              <Icon name="CheckCircle" size={14} className="text-white" />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-card-foreground">{user?.name}</h1>
              <div className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20">
                {user?.tier}
              </div>
            </div>
            <p className="text-muted-foreground mb-2">{user?.title}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Icon name="MapPin" size={14} />
                <span>{user?.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Calendar" size={14} />
                <span>Joined {user?.joinDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Clock" size={14} />
                <span>Last active {user?.lastActive}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-wrap gap-4 lg:gap-6">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-card-foreground">{stat?.value}</div>
              <div className="text-xs text-muted-foreground">{stat?.label}</div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" iconName="Settings">
            Settings
          </Button>
          <Button variant="default" size="sm" iconName="Share">
            Share Profile
          </Button>
        </div>
      </div>
      {/* Bio */}
      {user?.bio && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">{user?.bio}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
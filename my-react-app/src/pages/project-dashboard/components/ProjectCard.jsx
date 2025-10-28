import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onAction }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-accent bg-accent/10 border-accent/20';
      case 'deployed': return 'text-success bg-success/10 border-success/20';
      case 'building': return 'text-warning bg-warning/10 border-warning/20';
      case 'draft': return 'text-muted-foreground bg-muted/30 border-border';
      case 'error': return 'text-destructive bg-destructive/10 border-destructive/20';
      default: return 'text-muted-foreground bg-muted/30 border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'Play';
      case 'deployed': return 'CheckCircle';
      case 'building': return 'Loader';
      case 'draft': return 'FileText';
      case 'error': return 'AlertCircle';
      default: return 'Circle';
    }
  };

  const getTechIcon = (tech) => {
    switch (tech?.toLowerCase()) {
      case 'react': return 'Atom';
      case 'vue': return 'Triangle';
      case 'next.js': return 'Zap';
      case 'svelte': return 'Sparkles';
      case 'angular': return 'Shield';
      default: return 'Code2';
    }
  };

  return (
    <div 
      className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-300 breathing-element group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Thumbnail */}
      <div className="relative h-40 bg-gradient-to-br from-muted/50 to-muted/30 overflow-hidden">
        <Image
          src={project?.thumbnail}
          alt={project?.thumbnailAlt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Status Badge */}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project?.status)}`}>
          <div className="flex items-center space-x-1">
            <Icon 
              name={getStatusIcon(project?.status)} 
              size={12} 
              className={project?.status === 'building' ? 'animate-spin' : ''}
            />
            <span className="capitalize">{project?.status}</span>
          </div>
        </div>

        {/* Quick Actions Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center space-x-2 transition-all duration-300">
            <Button
              variant="outline"
              size="sm"
              iconName="Eye"
              onClick={() => onAction('preview', project?.id)}
            >
              Preview
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Code2"
              onClick={() => onAction('edit', project?.id)}
            >
              Edit
            </Button>
          </div>
        )}

        {/* Live Indicator */}
        {project?.isLive && (
          <div className="absolute top-3 right-3 flex items-center space-x-1 bg-success/20 backdrop-blur-sm px-2 py-1 rounded-full">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse-glow"></div>
            <span className="text-xs text-success font-medium">Live</span>
          </div>
        )}
      </div>
      {/* Project Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-card-foreground truncate group-hover:text-primary transition-colors">
              {project?.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {project?.description}
            </p>
          </div>
          <div className="flex items-center space-x-1 ml-2">
            <Icon name={getTechIcon(project?.technology)} size={16} className="text-primary" />
            <span className="text-xs text-muted-foreground">{project?.technology}</span>
          </div>
        </div>

        {/* Project Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Icon name="GitCommit" size={12} />
              <span>{project?.commits} commits</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={12} />
              <span>{project?.collaborators}</span>
            </div>
            {project?.stars > 0 && (
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={12} />
                <span>{project?.stars}</span>
              </div>
            )}
          </div>
          <span>{project?.lastModified}</span>
        </div>

        {/* Progress Bar */}
        {project?.progress !== undefined && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-card-foreground font-medium">{project?.progress}%</span>
            </div>
            <div className="w-full bg-muted/30 rounded-full h-1.5">
              <div 
                className="bg-gradient-to-r from-primary to-secondary h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${project?.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="MoreHorizontal"
            onClick={() => onAction('menu', project?.id)}
            className="flex-1"
          >
            Actions
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="ExternalLink"
            onClick={() => onAction('open', project?.id)}
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Share2"
            onClick={() => onAction('share', project?.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
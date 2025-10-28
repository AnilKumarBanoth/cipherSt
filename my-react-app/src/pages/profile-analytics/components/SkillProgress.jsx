import React from 'react';
import Icon from '../../../components/AppIcon';

const SkillProgress = ({ skills }) => {
  const getSkillIcon = (skill) => {
    const iconMap = {
      'React': 'Atom',
      'JavaScript': 'Code2',
      'TypeScript': 'FileCode',
      'Node.js': 'Server',
      'CSS': 'Palette',
      'HTML': 'Layout',
      'Git': 'GitBranch',
      'Testing': 'TestTube'
    };
    return iconMap?.[skill] || 'Code';
  };

  const getProgressColor = (level) => {
    if (level >= 80) return 'bg-success';
    if (level >= 60) return 'bg-primary';
    if (level >= 40) return 'bg-warning';
    return 'bg-muted-foreground';
  };

  const getSkillLevel = (level) => {
    if (level >= 90) return 'Expert';
    if (level >= 70) return 'Advanced';
    if (level >= 50) return 'Intermediate';
    if (level >= 30) return 'Beginner';
    return 'Learning';
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground mb-1">Skill Progress</h3>
          <p className="text-sm text-muted-foreground">Your development skills and proficiency levels</p>
        </div>
        <Icon name="TrendingUp" size={20} className="text-primary" />
      </div>
      <div className="space-y-4">
        {skills?.map((skill, index) => (
          <div key={index} className="group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-muted/30 rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Icon name={getSkillIcon(skill?.name)} size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <span className="text-sm font-medium text-card-foreground">{skill?.name}</span>
                  <div className="text-xs text-muted-foreground">{getSkillLevel(skill?.level)}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-card-foreground">{skill?.level}%</div>
                <div className="text-xs text-muted-foreground">+{skill?.growth}% this month</div>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(skill?.level)}`}
                  style={{ width: `${skill?.level}%` }}
                ></div>
              </div>
              {skill?.milestone && (
                <div 
                  className="absolute top-0 w-0.5 h-2 bg-accent"
                  style={{ left: `${skill?.milestone}%` }}
                  title={`Milestone at ${skill?.milestone}%`}
                ></div>
              )}
            </div>
            
            {skill?.nextGoal && (
              <div className="mt-2 text-xs text-muted-foreground">
                Next goal: {skill?.nextGoal}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Overall Progress</span>
          <span className="font-medium text-card-foreground">
            {Math.round(skills?.reduce((acc, skill) => acc + skill?.level, 0) / skills?.length)}% Average
          </span>
        </div>
      </div>
    </div>
  );
};

export default SkillProgress;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectPortfolio = ({ projects }) => {
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('grid');

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'next', label: 'Next.js' },
    { value: 'node', label: 'Node.js' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects?.filter(project => project?.tech?.toLowerCase()?.includes(filter));

  const getStatusColor = (status) => {
    switch (status) {
      case 'deployed': return 'text-success bg-success/10 border-success/20';
      case 'building': return 'text-warning bg-warning/10 border-warning/20';
      case 'draft': return 'text-muted-foreground bg-muted/10 border-muted/20';
      default: return 'text-muted-foreground bg-muted/10 border-muted/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'deployed': return 'CheckCircle';
      case 'building': return 'Loader';
      case 'draft': return 'FileText';
      default: return 'Circle';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground mb-1">Project Portfolio</h3>
          <p className="text-sm text-muted-foreground">{projects?.length} projects showcasing your work</p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex bg-muted/30 rounded-lg p-1">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded-md transition-colors ${
                view === 'grid' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-card-foreground'
              }`}
            >
              <Icon name="Grid3X3" size={14} />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-md transition-colors ${
                view === 'list' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-card-foreground'
              }`}
            >
              <Icon name="List" size={14} />
            </button>
          </div>
          
          <Button variant="outline" size="sm" iconName="Plus">
            New Project
          </Button>
        </div>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories?.map((category) => (
          <button
            key={category?.value}
            onClick={() => setFilter(category?.value)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === category?.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/30 text-muted-foreground hover:text-card-foreground hover:bg-muted/50'
            }`}
          >
            {category?.label}
          </button>
        ))}
      </div>
      {/* Projects Grid/List */}
      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects?.map((project, index) => (
            <div key={index} className="group bg-muted/20 rounded-xl border border-border overflow-hidden hover:border-primary/30 transition-all duration-200 breathing-element">
              {/* Project Image */}
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={project?.image}
                  alt={project?.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project?.status)}`}>
                    <div className="flex items-center gap-1">
                      <Icon name={getStatusIcon(project?.status)} size={10} />
                      <span className="capitalize">{project?.status}</span>
                    </div>
                  </div>
                </div>
                {project?.featured && (
                  <div className="absolute top-3 left-3">
                    <div className="px-2 py-1 bg-warning text-warning-foreground rounded-full text-xs font-medium">
                      <Icon name="Star" size={10} className="inline mr-1" />
                      Featured
                    </div>
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {project?.title}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Icon name="Eye" size={12} />
                    <span>{project?.views}</span>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {project?.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {project?.tech}
                    </span>
                    {project?.stars && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Icon name="Star" size={10} />
                        <span>{project?.stars}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{project?.lastUpdated}</span>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="xs" iconName="ExternalLink" className="flex-1">
                    View
                  </Button>
                  <Button variant="ghost" size="xs" iconName="GitBranch">
                    Code
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredProjects?.map((project, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-muted/20 rounded-xl border border-border hover:border-primary/30 transition-all duration-200 breathing-element">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={project?.image}
                  alt={project?.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-card-foreground truncate">{project?.title}</h4>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project?.status)}`}>
                    <span className="capitalize">{project?.status}</span>
                  </div>
                  {project?.featured && (
                    <Icon name="Star" size={12} className="text-warning" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{project?.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="text-primary font-medium">{project?.tech}</span>
                  <span>{project?.lastUpdated}</span>
                  <div className="flex items-center gap-1">
                    <Icon name="Eye" size={10} />
                    <span>{project?.views}</span>
                  </div>
                  {project?.stars && (
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={10} />
                      <span>{project?.stars}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <Button variant="outline" size="xs" iconName="ExternalLink">
                  View
                </Button>
                <Button variant="ghost" size="xs" iconName="GitBranch">
                  Code
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {filteredProjects?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FolderOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-medium text-card-foreground mb-2">No projects found</h4>
          <p className="text-sm text-muted-foreground mb-4">
            {filter === 'all' ? 'Start building your first project' : `No ${filter} projects yet`}
          </p>
          <Button variant="default" iconName="Plus">
            Create New Project
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectPortfolio;
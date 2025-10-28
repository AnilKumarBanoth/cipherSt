import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProjectCard from './components/ProjectCard';
import StatsCard from './components/StatsCard';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import ProjectFilters from './components/ProjectFilters';
import StorageUsage from './components/StorageUsage';

const ProjectDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState('grid');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [sortBy, setSortBy] = useState('modified');

  // Mock data for projects
  const projects = [
  {
    id: 1,
    name: "E-commerce Dashboard",
    description: "Modern React dashboard with real-time analytics and inventory management system",
    technology: "React",
    status: "active",
    thumbnail: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3",
    thumbnailAlt: "Modern dashboard interface showing colorful analytics charts and graphs on computer screen",
    commits: 47,
    collaborators: 3,
    stars: 12,
    lastModified: "2 hours ago",
    progress: 85,
    isLive: true
  },
  {
    id: 2,
    name: "Portfolio Website",
    description: "Personal portfolio showcasing creative projects with smooth animations",
    technology: "Next.js",
    status: "deployed",
    thumbnail: "https://images.unsplash.com/photo-1634712037516-bde0f7cdb3d8",
    thumbnailAlt: "Clean minimalist portfolio website layout displayed on laptop screen with white background",
    commits: 23,
    collaborators: 1,
    stars: 8,
    lastModified: "1 day ago",
    progress: 100,
    isLive: true
  },
  {
    id: 3,
    name: "Task Management App",
    description: "Collaborative task management with drag-and-drop functionality",
    technology: "Vue",
    status: "building",
    thumbnail: "https://images.unsplash.com/photo-1677506048148-0c914dd8197b",
    thumbnailAlt: "Task management interface with colorful kanban boards and sticky notes organized in columns",
    commits: 31,
    collaborators: 2,
    stars: 5,
    lastModified: "3 hours ago",
    progress: 65
  },
  {
    id: 4,
    name: "Blog Platform",
    description: "Content management system with markdown support and SEO optimization",
    technology: "Svelte",
    status: "draft",
    thumbnail: "https://images.unsplash.com/photo-1625296278034-71e307fed277",
    thumbnailAlt: "Blog writing interface showing text editor with markdown formatting on laptop screen",
    commits: 15,
    collaborators: 1,
    stars: 3,
    lastModified: "5 days ago",
    progress: 30
  },
  {
    id: 5,
    name: "Weather App",
    description: "Real-time weather tracking with interactive maps and forecasts",
    technology: "React",
    status: "error",
    thumbnail: "https://images.unsplash.com/photo-1687168644714-3343aa9b5af8",
    thumbnailAlt: "Weather application interface displaying colorful weather maps and temperature data on mobile device",
    commits: 8,
    collaborators: 1,
    stars: 2,
    lastModified: "1 week ago",
    progress: 45
  },
  {
    id: 6,
    name: "Social Media Dashboard",
    description: "Analytics dashboard for social media management and engagement tracking",
    technology: "Angular",
    status: "active",
    thumbnail: "https://images.unsplash.com/photo-1660732421009-469aba1c2e81",
    thumbnailAlt: "Social media analytics dashboard showing engagement metrics and colorful charts on desktop monitor",
    commits: 52,
    collaborators: 4,
    stars: 18,
    lastModified: "30 minutes ago",
    progress: 78,
    isLive: true
  }];


  // Mock data for statistics
  const stats = [
  {
    title: "Total Projects",
    value: "24",
    change: "+3",
    changeType: "positive",
    icon: "FolderOpen",
    color: "primary"
  },
  {
    title: "Active Projects",
    value: "8",
    change: "+2",
    changeType: "positive",
    icon: "Play",
    color: "success"
  },
  {
    title: "Deployed",
    value: "12",
    change: "+1",
    changeType: "positive",
    icon: "Rocket",
    color: "accent"
  },
  {
    title: "Collaborators",
    value: "15",
    change: "+4",
    changeType: "positive",
    icon: "Users",
    color: "secondary"
  }];


  // Mock data for recent activities
  const activities = [
  {
    type: "deploy",
    description: "Successfully deployed Portfolio Website to production",
    timestamp: new Date(Date.now() - 300000),
    project: "Portfolio Website",
    actionable: true
  },
  {
    type: "commit",
    description: "Added new authentication system with JWT tokens",
    timestamp: new Date(Date.now() - 900000),
    project: "E-commerce Dashboard",
    user: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1668049221564-862149a48e10",
      avatarAlt: "Professional headshot of Asian woman with long black hair in business attire"
    }
  },
  {
    type: "collaborate",
    description: "John invited you to collaborate on Task Management App",
    timestamp: new Date(Date.now() - 1800000),
    project: "Task Management App",
    user: {
      name: "John Smith",
      avatar: "https://images.unsplash.com/photo-1732492211739-16eea9575e84",
      avatarAlt: "Professional headshot of Caucasian man with brown hair in navy suit"
    },
    actionable: true
  },
  {
    type: "star",
    description: "Your project received 3 new stars from the community",
    timestamp: new Date(Date.now() - 3600000),
    project: "Social Media Dashboard"
  },
  {
    type: "create",
    description: "Created new React project from TypeScript template",
    timestamp: new Date(Date.now() - 7200000),
    project: "New Project"
  }];


  // Mock data for storage usage
  const storageUsage = {
    used: 2.4 * 1024 * 1024 * 1024, // 2.4 GB in bytes
    total: 5 * 1024 * 1024 * 1024, // 5 GB in bytes
    percentage: 48,
    breakdown: [
    {
      category: "Source Code",
      size: 1.2 * 1024 * 1024 * 1024,
      count: 156,
      color: "#6366F1"
    },
    {
      category: "Assets & Images",
      size: 0.8 * 1024 * 1024 * 1024,
      count: 89,
      color: "#8B5CF6"
    },
    {
      category: "Dependencies",
      size: 0.3 * 1024 * 1024 * 1024,
      count: 24,
      color: "#10B981"
    },
    {
      category: "Build Files",
      size: 0.1 * 1024 * 1024 * 1024,
      count: 12,
      color: "#F59E0B"
    }]

  };

  useEffect(() => {
    setFilteredProjects(projects);
  }, []);

  const handleProjectAction = (action, projectId) => {
    console.log(`Action: ${action} on project: ${projectId}`);
    // Handle project actions like edit, preview, share, etc.
  };

  const handleQuickAction = (actionId) => {
    console.log(`Quick action: ${actionId}`);
    // Handle quick actions like new project, import, etc.
  };

  const handleFilterChange = (filters) => {
    let filtered = [...projects];

    if (filters?.search) {
      filtered = filtered?.filter((project) =>
      project?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
      project?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    if (filters?.status !== 'all') {
      filtered = filtered?.filter((project) => project?.status === filters?.status);
    }

    if (filters?.technology !== 'all') {
      filtered = filtered?.filter((project) =>
      project?.technology?.toLowerCase() === filters?.technology?.toLowerCase()
      );
    }

    setFilteredProjects(filtered);
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
    const sorted = [...filteredProjects]?.sort((a, b) => {
      switch (sortOption) {
        case 'name':
          return a?.name?.localeCompare(b?.name);
        case 'status':
          return a?.status?.localeCompare(b?.status);
        case 'progress':
          return (b?.progress || 0) - (a?.progress || 0);
        case 'created':case 'modified':
        default:
          return new Date(b.lastModified) - new Date(a.lastModified);
      }
    });
    setFilteredProjects(sorted);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />

      <main className={`pt-16 transition-all duration-300 ${
      isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-80'}`
      }>
        <div className="p-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Project Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your projects, track progress, and collaborate with your team
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button variant="outline" iconName="Download">
                Export Data
              </Button>
              <Button variant="default" iconName="Plus" iconPosition="left">
                New Project
              </Button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats?.map((stat, index) =>
            <StatsCard
              key={index}
              title={stat?.title}
              value={stat?.value}
              change={stat?.change}
              changeType={stat?.changeType}
              icon={stat?.icon}
              color={stat?.color} />

            )}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="xl:col-span-3 space-y-6">
              {/* Quick Actions */}
              <QuickActions onAction={handleQuickAction} />

              {/* Project Filters */}
              <ProjectFilters
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                onViewChange={setCurrentView}
                currentView={currentView} />


              {/* Projects Grid/List */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-card-foreground">
                    Your Projects ({filteredProjects?.length})
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Icon name="Filter" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Sorted by {sortBy}
                    </span>
                  </div>
                </div>

                {filteredProjects?.length > 0 ?
                <div className={
                currentView === 'grid' ?
                "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"
                }>
                    {filteredProjects?.map((project) =>
                  <ProjectCard
                    key={project?.id}
                    project={project}
                    onAction={handleProjectAction} />

                  )}
                  </div> :

                <div className="text-center py-12">
                    <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-card-foreground mb-2">
                      No projects found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search criteria or create a new project
                    </p>
                    <Button variant="default" iconName="Plus" iconPosition="left">
                      Create New Project
                    </Button>
                  </div>
                }
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              {/* Activity Feed */}
              <ActivityFeed activities={activities} />
              
              {/* Storage Usage */}
              <StorageUsage usage={storageUsage} />

              {/* Quick Stats */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-card-foreground mb-4">Today's Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Lines of code</span>
                    <span className="text-sm font-medium text-card-foreground">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Commits</span>
                    <span className="text-sm font-medium text-card-foreground">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Time coding</span>
                    <span className="text-sm font-medium text-card-foreground">4h 32m</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Streak</span>
                    <div className="flex items-center space-x-1">
                      <Icon name="Flame" size={14} className="text-warning" />
                      <span className="text-sm font-medium text-warning">12 days</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-card-foreground mb-4">Quick Navigation</h3>
                <div className="space-y-2">
                  <Link
                    to="/ide-workspace"
                    className="flex items-center space-x-3 p-3 rounded-lg text-sm text-muted-foreground hover:text-card-foreground hover:bg-muted/50 transition-colors breathing-element">

                    <Icon name="Code2" size={16} />
                    <span>IDE Workspace</span>
                  </Link>
                  <Link
                    to="/profile-analytics"
                    className="flex items-center space-x-3 p-3 rounded-lg text-sm text-muted-foreground hover:text-card-foreground hover:bg-muted/50 transition-colors breathing-element">

                    <Icon name="BarChart3" size={16} />
                    <span>Analytics</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default ProjectDashboard;
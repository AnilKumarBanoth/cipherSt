import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ProfileHeader from './components/ProfileHeader';
import ActivityChart from './components/ActivityChart';
import SkillProgress from './components/SkillProgress';
import AchievementBadges from './components/AchievementBadges';
import ProjectPortfolio from './components/ProjectPortfolio';
import CodingStreak from './components/CodingStreak';
import CommunityStats from './components/CommunityStats';

const ProfileAnalytics = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock user data
  const userData = {
    name: "Alex Chen",
    title: "Full Stack React Developer",
    location: "San Francisco, CA",
    joinDate: "March 2023",
    lastActive: "2 hours ago",
    tier: "Pro Developer",
    avatar: "https://images.unsplash.com/photo-1698072556534-40ec6e337311",
    avatarAlt: "Professional headshot of Asian man with short black hair wearing navy blue shirt",
    bio: `Passionate React developer with 3+ years of experience building scalable web applications. 
Love exploring new technologies and contributing to open-source projects. 
Currently focused on mastering Next.js and TypeScript while mentoring junior developers in the community.`
  };

  const profileStats = [
  { value: "47", label: "Projects" },
  { value: "12.5k", label: "Lines of Code" },
  { value: "89", label: "Commits" },
  { value: "156", label: "Followers" }];


  // Mock activity data for charts
  const activityData = [
  { date: "Oct 14", linesOfCode: 245, commits: 3 },
  { date: "Oct 15", linesOfCode: 189, commits: 2 },
  { date: "Oct 16", linesOfCode: 312, commits: 5 },
  { date: "Oct 17", linesOfCode: 156, commits: 1 },
  { date: "Oct 18", linesOfCode: 423, commits: 7 },
  { date: "Oct 19", linesOfCode: 298, commits: 4 },
  { date: "Oct 20", linesOfCode: 367, commits: 6 },
  { date: "Oct 21", linesOfCode: 445, commits: 8 }];


  // Mock skills data
  const skillsData = [
  { name: "React", level: 92, growth: 8, nextGoal: "Master React 18 Concurrent Features", milestone: 90 },
  { name: "JavaScript", level: 88, growth: 5, nextGoal: "Advanced ES2024 Features", milestone: 85 },
  { name: "TypeScript", level: 76, growth: 12, nextGoal: "Advanced Type Patterns", milestone: 80 },
  { name: "Node.js", level: 71, growth: 9, nextGoal: "Microservices Architecture", milestone: 75 },
  { name: "CSS", level: 84, growth: 3, nextGoal: "CSS Grid Mastery", milestone: 80 },
  { name: "HTML", level: 95, growth: 1, nextGoal: "Web Components", milestone: 90 },
  { name: "Git", level: 82, growth: 4, nextGoal: "Advanced Git Workflows", milestone: 85 },
  { name: "Testing", level: 68, growth: 15, nextGoal: "E2E Testing with Playwright", milestone: 70 }];


  // Mock achievements data
  const achievementsData = [
  {
    title: "First Steps",
    description: "Created your first React project",
    icon: "Rocket",
    category: "milestone",
    rarity: "common",
    unlocked: true,
    unlockedDate: "Mar 15, 2023"
  },
  {
    title: "Code Warrior",
    description: "Write 10,000 lines of code",
    icon: "Sword",
    category: "coding",
    rarity: "rare",
    unlocked: true,
    unlockedDate: "Sep 22, 2023"
  },
  {
    title: "Community Helper",
    description: "Help 50 developers in the community",
    icon: "Heart",
    category: "community",
    rarity: "epic",
    unlocked: true,
    unlockedDate: "Oct 10, 2023"
  },
  {
    title: "Speed Demon",
    description: "Complete a project in under 2 hours",
    icon: "Zap",
    category: "coding",
    rarity: "rare",
    unlocked: true,
    unlockedDate: "Aug 5, 2023"
  },
  {
    title: "Master Builder",
    description: "Deploy 25 projects successfully",
    icon: "Crown",
    category: "milestone",
    rarity: "legendary",
    unlocked: false,
    progress: { current: 18, total: 25 },
    hint: "Keep building and deploying projects"
  },
  {
    title: "Tutorial Master",
    description: "Complete all React tutorials",
    icon: "BookOpen",
    category: "learning",
    rarity: "epic",
    unlocked: false,
    progress: { current: 8, total: 12 },
    hint: "Finish the remaining 4 tutorials"
  },
  {
    title: "Open Source Hero",
    description: "Contribute to 10 open source projects",
    icon: "GitBranch",
    category: "community",
    rarity: "legendary",
    unlocked: false,
    progress: { current: 3, total: 10 },
    hint: "Find projects that need your skills"
  },
  {
    title: "Bug Hunter",
    description: "Find and report 20 bugs",
    icon: "Bug",
    category: "community",
    rarity: "rare",
    unlocked: true,
    unlockedDate: "Jul 18, 2023"
  }];


  // Mock projects data
  const projectsData = [
  {
    title: "E-commerce Dashboard",
    description: "Modern admin dashboard for online stores with real-time analytics and inventory management",
    tech: "React",
    status: "deployed",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3",
    imageAlt: "Modern dashboard interface showing analytics charts and data visualization on computer screen",
    views: "1.2k",
    stars: 45,
    lastUpdated: "2 days ago",
    featured: true
  },
  {
    title: "Task Management App",
    description: "Collaborative project management tool with drag-and-drop functionality and team chat",
    tech: "Next.js",
    status: "building",
    image: "https://images.unsplash.com/photo-1609188343737-366b8dc25152",
    imageAlt: "Task management interface with kanban board showing project cards and workflow columns",
    views: "856",
    stars: 23,
    lastUpdated: "5 hours ago"
  },
  {
    title: "Weather Forecast Widget",
    description: "Beautiful weather component with animations and location-based forecasting",
    tech: "Vue.js",
    status: "deployed",
    image: "https://images.unsplash.com/photo-1653022056328-913942485324",
    imageAlt: "Weather application interface displaying sunny weather forecast with temperature and location data",
    views: "634",
    stars: 18,
    lastUpdated: "1 week ago"
  },
  {
    title: "Portfolio Website",
    description: "Personal portfolio showcasing projects with smooth animations and responsive design",
    tech: "React",
    status: "deployed",
    image: "https://images.unsplash.com/photo-1613395752352-292cf623d389",
    imageAlt: "Clean portfolio website layout showing project gallery and professional design elements",
    views: "2.1k",
    stars: 67,
    lastUpdated: "3 days ago",
    featured: true
  },
  {
    title: "Chat Application",
    description: "Real-time messaging app with file sharing and video call integration",
    tech: "Node.js",
    status: "draft",
    image: "https://images.unsplash.com/photo-1684089007703-445ecebdef28",
    imageAlt: "Chat application interface showing message bubbles and conversation threads on mobile device",
    views: "423",
    lastUpdated: "1 day ago"
  },
  {
    title: "Recipe Finder",
    description: "Discover and save recipes with ingredient-based search and meal planning features",
    tech: "React",
    status: "deployed",
    image: "https://images.unsplash.com/photo-1540597526190-9a0701828762",
    imageAlt: "Recipe application showing colorful food images and ingredient lists in grid layout",
    views: "789",
    stars: 31,
    lastUpdated: "4 days ago"
  }];


  // Mock coding streak data
  const streakData = {
    current: 23,
    longest: 45,
    totalDays: 187,
    totalCommits: 1247,
    recentActivity: [
    { date: "Today", commits: 8 },
    { date: "Yesterday", commits: 5 },
    { date: "Oct 19", commits: 12 },
    { date: "Oct 18", commits: 3 },
    { date: "Oct 17", commits: 7 }]

  };

  // Mock heatmap data (simplified for demo)
  const heatmapData = Array.from({ length: 53 }, (_, weekIndex) =>
  Array.from({ length: 7 }, (_, dayIndex) => ({
    date: `Week ${weekIndex + 1}, Day ${dayIndex + 1}`,
    commits: Math.floor(Math.random() * 15)
  }))
  );

  // Mock community stats
  const communityStats = {
    followers: 156,
    likes: 1247,
    comments: 89,
    shares: 34,
    rank: 127,
    percentile: 15
  };

  const recentCommunityActivity = [
  {
    type: "comment",
    description: "Commented on \'Advanced React Patterns\' discussion",
    time: "2 hours ago",
    project: "React Best Practices"
  },
  {
    type: "like",
    description: "Received 12 likes on your project showcase",
    time: "4 hours ago",
    project: "E-commerce Dashboard",
    count: 12
  },
  {
    type: "follow",
    description: "3 new developers started following you",
    time: "6 hours ago",
    count: 3
  },
  {
    type: "share",
    description: "Your tutorial was shared 5 times",
    time: "1 day ago",
    project: "React Hooks Guide",
    count: 5
  },
  {
    type: "review",
    description: "Reviewed code for junior developer",
    time: "2 days ago",
    project: "Todo App"
  }];


  const followersData = [
  {
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1728694439890-d8ec102e3703",
    avatarAlt: "Professional headshot of woman with brown hair wearing white blouse"
  },
  {
    name: "Mike Rodriguez",
    avatar: "https://images.unsplash.com/photo-1667575949231-fbf430640797",
    avatarAlt: "Professional headshot of Hispanic man with beard wearing dark shirt"
  },
  {
    name: "Emily Davis",
    avatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
    avatarAlt: "Professional headshot of blonde woman wearing blue blazer"
  },
  {
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1696489647375-30cae68481f2",
    avatarAlt: "Professional headshot of Asian man with glasses wearing gray sweater"
  },
  {
    name: "Lisa Wang",
    avatar: "https://images.unsplash.com/photo-1733875332103-d05a6beaa6b4",
    avatarAlt: "Professional headshot of Asian woman with long black hair wearing white top"
  },
  {
    name: "James Wilson",
    avatar: "https://images.unsplash.com/photo-1704731297889-6d54dc06da74",
    avatarAlt: "Professional headshot of man with short brown hair wearing navy shirt"
  },
  {
    name: "Anna Thompson",
    avatar: "https://images.unsplash.com/photo-1604465830565-7baf00db4ea6",
    avatarAlt: "Professional headshot of woman with red hair wearing black top"
  },
  {
    name: "Carlos Martinez",
    avatar: "https://images.unsplash.com/photo-1616060553268-69d000a52c7f",
    avatarAlt: "Professional headshot of Hispanic man with mustache wearing white shirt"
  },
  {
    name: "Rachel Green",
    avatar: "https://images.unsplash.com/photo-1665023024202-4c8671802bf6",
    avatarAlt: "Professional headshot of woman with curly hair wearing green blouse"
  },
  {
    name: "Tom Anderson",
    avatar: "https://images.unsplash.com/photo-1713285799064-152bb4922715",
    avatarAlt: "Professional headshot of man with blonde hair wearing blue shirt"
  }];


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />

      
      <main className={`pt-16 transition-all duration-300 ${
      sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-80'}`
      }>
        <div className="p-6 space-y-6">
          {/* Profile Header */}
          <ProfileHeader user={userData} stats={profileStats} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Activity Chart */}
              <ActivityChart data={activityData} />
              
              {/* Project Portfolio */}
              <ProjectPortfolio projects={projectsData} />
              
              {/* Coding Streak */}
              <CodingStreak streakData={streakData} heatmapData={heatmapData} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Skill Progress */}
              <SkillProgress skills={skillsData} />
              
              {/* Community Stats */}
              <CommunityStats
                stats={communityStats}
                recentActivity={recentCommunityActivity}
                followers={followersData} />

            </div>
          </div>

          {/* Achievement Badges - Full Width */}
          <AchievementBadges achievements={achievementsData} />
        </div>
      </main>
    </div>);

};

export default ProfileAnalytics;
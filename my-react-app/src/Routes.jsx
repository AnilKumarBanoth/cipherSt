import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import ProfileAnalytics from './pages/profile-analytics';
import ProjectDashboard from './pages/project-dashboard';
import IDEWorkspace from './pages/ide-workspace';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<IDEWorkspace />} />
        <Route path="/profile-analytics" element={<ProfileAnalytics />} />
        <Route path="/project-dashboard" element={<ProjectDashboard />} />
        <Route path="/ide-workspace" element={<IDEWorkspace />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

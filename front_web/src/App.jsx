import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Projects from './components/Projects';
import Developers from './components/Developers';
import Resources from './components/Resources';
import ResourceDetail from './components/ResourceDetail';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import Login from './admin/AdminLogin';
import BookDemo from './components/BookDemo';
import ProfileSetup from './components/ProfileSetup';
import ProfessionalSetup from './components/ProfessionalSetup';
import WorkspaceSync from './components/WorkspaceSync';
import Welcome from './components/Welcome';
import AdminDashboard from './admin/AdminDashboard';
import AdminProjects from './admin/AdminProjects';
import AdminDevelopers from './admin/AdminDevelopers';
import AdminResources from './admin/AdminResources';
import AdminHiring from './admin/AdminHiring';
import AdminDocumentation from './admin/AdminDocumentation';
import AdminReviews from './admin/AdminReviews';
import AdminDemos from './admin/AdminDemos';
import AdminSettings from './admin/AdminSettings';
import ManageReviews from './admin/ManageReviews';
import AdminFooter from './admin/AdminFooter';
import { SidebarProvider } from './admin/SidebarContext';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Set first visit flag if not exists
    if (!localStorage.getItem('isFirstVisit')) {
      localStorage.setItem('isFirstVisit', 'true');
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Onboarding Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/professional-setup" element={<ProfessionalSetup />} />
        <Route path="/workspace-sync" element={<WorkspaceSync />} />

        {/* Main App Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/:id" element={<ResourceDetail />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login onLogin={() => window.location.href = '/admin'} />} />
        <Route path="/book-demo" element={<BookDemo />} />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <SidebarProvider>
            <AdminDashboard />
          </SidebarProvider>
        } />
        <Route path="/admin/dashboard" element={
          <SidebarProvider>
            <AdminDashboard />
          </SidebarProvider>
        } />
        <Route path="/admin/projects" element={
          <SidebarProvider>
            <AdminProjects />
          </SidebarProvider>
        } />
        <Route path="/admin/developers" element={
          <SidebarProvider>
            <AdminDevelopers />
          </SidebarProvider>
        } />
        <Route path="/admin/resources" element={
          <SidebarProvider>
            <AdminResources />
          </SidebarProvider>
        } />
        <Route path="/admin/hiring" element={
          <SidebarProvider>
            <AdminHiring />
          </SidebarProvider>
        } />
        <Route path="/admin/documentation" element={
          <SidebarProvider>
            <AdminDocumentation />
          </SidebarProvider>
        } />
        <Route path="/admin/reviews" element={
          <SidebarProvider>
            <AdminReviews />
          </SidebarProvider>
        } />
        <Route path="/admin/demos" element={
          <SidebarProvider>
            <AdminDemos />
          </SidebarProvider>
        } />
        <Route path="/admin/settings" element={
          <SidebarProvider>
            <AdminSettings />
          </SidebarProvider>
        } />
        <Route path="/admin/manage-reviews" element={
          <SidebarProvider>
            <ManageReviews />
          </SidebarProvider>
        } />
        <Route path="/admin/footer" element={
          <SidebarProvider>
            <AdminFooter />
          </SidebarProvider>
        } />
      </Routes>
    </Router>
  );
}

export default App;

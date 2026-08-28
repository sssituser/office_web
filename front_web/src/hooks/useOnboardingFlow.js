import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ONBOARDING_STEPS = {
  WELCOME: 'welcome',
  PROJECTS: 'projects',
  PROFILE_SETUP: 'profile-setup',
  PROFESSIONAL_SETUP: 'professional-setup',
  WORKSPACE_SYNC: 'workspace-sync',
  COMPLETED: 'completed'
};

const useOnboardingFlow = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(ONBOARDING_STEPS.WELCOME);

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingStatus = localStorage.getItem('onboardingStatus');
    const isFirstVisit = localStorage.getItem('isFirstVisit');

    if (isFirstVisit === 'false' || onboardingStatus === ONBOARDING_STEPS.COMPLETED) {
      // User has completed onboarding, only redirect if they're trying to access onboarding pages
      const currentPath = window.location.pathname;
      const onboardingPaths = ['/', '/profile-setup', '/professional-setup', '/workspace-sync'];

      if (onboardingPaths.includes(currentPath)) {
        navigate('/home');
        return;
      }
    }

    // Get the last completed step
    const lastStep = localStorage.getItem('lastOnboardingStep');
    if (lastStep && lastStep !== ONBOARDING_STEPS.WELCOME) {
      setCurrentStep(lastStep);
    }
  }, [navigate]);

  const markStepCompleted = (step) => {
    localStorage.setItem('lastOnboardingStep', step);
    setCurrentStep(step);
  };

  const completeOnboarding = () => {
    localStorage.setItem('onboardingStatus', ONBOARDING_STEPS.COMPLETED);
    localStorage.setItem('isFirstVisit', 'false');
    setCurrentStep(ONBOARDING_STEPS.COMPLETED);
  };

  const resetOnboarding = () => {
    localStorage.removeItem('onboardingStatus');
    localStorage.removeItem('lastOnboardingStep');
    localStorage.setItem('isFirstVisit', 'true');
    setCurrentStep(ONBOARDING_STEPS.WELCOME);
    navigate('/');
  };

  const getNextRoute = (currentRoute) => {
    const routeFlow = {
      '/': '/profile-setup',
      '/profile-setup': '/professional-setup',
      '/professional-setup': '/workspace-sync',
      '/workspace-sync': '/home'
    };
    return routeFlow[currentRoute] || '/home';
  };

  const getPreviousRoute = (currentRoute) => {
    const routeFlow = {
      '/profile-setup': '/',
      '/professional-setup': '/profile-setup',
      '/workspace-sync': '/professional-setup'
    };
    return routeFlow[currentRoute] || '/';
  };

  return {
    currentStep,
    markStepCompleted,
    completeOnboarding,
    resetOnboarding,
    getNextRoute,
    getPreviousRoute,
    ONBOARDING_STEPS
  };
};

export default useOnboardingFlow;

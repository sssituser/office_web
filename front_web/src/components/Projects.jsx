import React, { useState, useEffect } from 'react';
import { PublicLayout } from './PublicLayout';
import apiService from '../services/api';

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentImageIndices, setCurrentImageIndices] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [currentModalImageIndex, setCurrentModalImageIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);

  // Fetch projects from admin API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await apiService.getProjects();

        // Add test project with multiple images if none exist
        const hasMultipleImages = data.some(p => p.project_images && p.project_images.length > 1);
        if (!hasMultipleImages) {
          const testProject = {
            id: 999,
            title: 'Test Carousel Project',
            description: 'This is a test project with multiple images to verify carousel functionality.',
            technologies_used: 'React,JavaScript,Testing',
            status: 'Active',
            project_images: [
              { image: 'https://picsum.photos/seed/test1/800/450.jpg' },
              { image: 'https://picsum.photos/seed/test2/800/450.jpg' },
              { image: 'https://picsum.photos/seed/test3/800/450.jpg' }
            ]
          };
          data.push(testProject);
          console.log('Added test project for carousel testing');
        }

        setProjects(data);
        setFilteredProjects(data);

        // Initialize image indices for projects with multiple images
        const initialIndices = {};
        data.forEach(project => {
          if (project.project_images && project.project_images.length > 1) {
            initialIndices[project.id] = 0;
            console.log(`Initialized carousel for project: ${project.title} (${project.project_images.length} images)`);
          }
        });
        setCurrentImageIndices(initialIndices);
        console.log('Initial image indices:', initialIndices);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Image carousel effect
  useEffect(() => {
    // Only start carousel if there are projects with multiple images
    const projectsWithMultipleImages = projects.filter(p => p.project_images && p.project_images.length > 1);

    if (projectsWithMultipleImages.length === 0) {
      return;
    }

    console.log('Starting carousel for projects:', projectsWithMultipleImages.map(p => ({ id: p.id, title: p.title, imageCount: p.project_images.length })));

    const interval = setInterval(() => {
      setCurrentImageIndices(prevIndices => {
        const newIndices = { ...prevIndices };

        projectsWithMultipleImages.forEach(project => {
          const currentIndex = newIndices[project.id] || 0;
          const nextIndex = (currentIndex + 1) % project.project_images.length;
          newIndices[project.id] = nextIndex;

          console.log(`Project ${project.title}: Image ${currentIndex + 1} -> ${nextIndex + 1}`);
        });

        return newIndices;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [projects]);

  // Apply filters
  useEffect(() => {
    let filtered = projects;

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(project => {
        // Map project technologies to categories
        const techs = project.technologies_used ? project.technologies_used.toLowerCase() : '';
        return selectedCategories.some(category => {
          switch (category) {
            case 'Cloud Architecture':
              return techs.includes('aws') || techs.includes('kubernetes') || techs.includes('docker') || techs.includes('terraform');
            case 'Neural Networks':
              return techs.includes('python') || techs.includes('tensorflow') || techs.includes('pytorch') || techs.includes('ai');
            case 'Blockchain Protocols':
              return techs.includes('blockchain') || techs.includes('ethereum') || techs.includes('solidity') || techs.includes('web3');
            default:
              return false;
          }
        });
      });
    }

    // Filter by technologies
    if (selectedTechnologies.length > 0) {
      filtered = filtered.filter(project => {
        const techs = project.technologies_used ? project.technologies_used.toLowerCase() : '';
        return selectedTechnologies.some(tech => techs.includes(tech.toLowerCase()));
      });
    }

    // Filter by status
    if (selectedStatus) {
      filtered = filtered.filter(project => {
        const status = project.status || 'Active';
        return status.toLowerCase() === selectedStatus.toLowerCase();
      });
    }

    setFilteredProjects(filtered);
  }, [projects, selectedCategories, selectedTechnologies, selectedStatus]);

  // Handle view project details
  const handleViewProject = (project) => {
    setSelectedProject(project);
    setShowProjectDetails(true);
  };

  // Close project details modal
  const closeProjectDetails = () => {
    setShowProjectDetails(false);
    setSelectedProject(null);
    setCurrentModalImageIndex(0);
  };

  // Auto-scroll modal images
  useEffect(() => {
    if (!showProjectDetails || !selectedProject) return;

    const projectImages = selectedProject.project_images || [];
    if (projectImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentModalImageIndex(prevIndex => (prevIndex + 1) % projectImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [showProjectDetails, selectedProject]);

  // Handle manual image navigation
  const goToPreviousImage = () => {
    if (!selectedProject) return;
    const projectImages = selectedProject.project_images || [];
    setCurrentModalImageIndex(prevIndex => (prevIndex - 1 + projectImages.length) % projectImages.length);
  };

  const goToNextImage = () => {
    if (!selectedProject) return;
    const projectImages = selectedProject.project_images || [];
    setCurrentModalImageIndex(prevIndex => (prevIndex + 1) % projectImages.length);
  };

  if (loading) {
    return (
      <PublicLayout activeTab="projects" showSidebar={false} sidebar={null}>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </PublicLayout>
    );
  }

  if (error) {
    return (
      <PublicLayout activeTab="projects" showSidebar={false} sidebar={null}>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg font-medium text-error">{error}</div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout activeTab="projects" showSidebar={false} sidebar={null}>
      <main className="max-w-[1440px] mx-auto flex gap-10 px-8 py-10 min-h-screen">
        {/* Sidebar Discovery Filters */}
        <aside className="w-64 flex-shrink-0 space-y-10">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.15em] font-bold text-on-surface-variant mb-6 flex items-center">
              <span className="w-2 h-2 bg-primary-fixed mr-2"></span>
              Discovery Filters
            </h2>
            <div className="space-y-8">
              {/* Categories */}
              <section>
                <h3 className="text-xs font-bold text-on-surface mb-4 uppercase tracking-wider">Categories</h3>
                <div className="space-y-3">
                  <label className="flex items-center group cursor-pointer">
                    <input
                      checked={selectedCategories.includes('Cloud Architecture')}
                      className="rounded-sm border-outline-variant text-primary focus:ring-primary h-3.5 w-3.5"
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories([...selectedCategories, 'Cloud Architecture']);
                        } else {
                          setSelectedCategories(selectedCategories.filter(cat => cat !== 'Cloud Architecture'));
                        }
                      }}
                    />
                    <span className="ml-3 text-sm text-on-surface-variant group-hover:text-primary transition-colors">Cloud Architecture</span>
                  </label>
                  <label className="flex items-center group cursor-pointer">
                    <input
                      checked={selectedCategories.includes('Neural Networks')}
                      className="rounded-sm border-outline-variant text-primary focus:ring-primary h-3.5 w-3.5"
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories([...selectedCategories, 'Neural Networks']);
                        } else {
                          setSelectedCategories(selectedCategories.filter(cat => cat !== 'Neural Networks'));
                        }
                      }}
                    />
                    <span className="ml-3 text-sm text-on-surface-variant group-hover:text-primary transition-colors">Neural Networks</span>
                  </label>
                  <label className="flex items-center group cursor-pointer">
                    <input
                      checked={selectedCategories.includes('Blockchain Protocols')}
                      className="rounded-sm border-outline-variant text-primary focus:ring-primary h-3.5 w-3.5"
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories([...selectedCategories, 'Blockchain Protocols']);
                        } else {
                          setSelectedCategories(selectedCategories.filter(cat => cat !== 'Blockchain Protocols'));
                        }
                      }}
                    />
                    <span className="ml-3 text-sm text-on-surface-variant group-hover:text-primary transition-colors">Blockchain Protocols</span>
                  </label>
                </div>
              </section>

              {/* Technologies */}
              <section>
                <h3 className="text-xs font-bold text-on-surface mb-4 uppercase tracking-wider">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {['RUST', 'GO', 'REACT', 'PYTHON', 'WASM', 'TYPESCRIPT'].map((tech) => (
                    <span
                      key={tech}
                      className={`px-2 py-1 text-[10px] font-semibold rounded-sm border border-transparent hover:border-primary-fixed transition-all cursor-pointer ${selectedTechnologies.includes(tech)
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-low text-on-secondary-container'
                        }`}
                      onClick={() => {
                        if (selectedTechnologies.includes(tech)) {
                          setSelectedTechnologies(selectedTechnologies.filter(t => t !== tech));
                        } else {
                          setSelectedTechnologies([...selectedTechnologies, tech]);
                        }
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>

              {/* Development Status */}
              <section>
                <h3 className="text-xs font-bold text-on-surface mb-4 uppercase tracking-wider">Project Status</h3>
                <div className="space-y-3">
                  {['Active Sprint', 'Alpha Testing', 'Staging Deployment'].map((status) => (
                    <label key={status} className="flex items-center group cursor-pointer">
                      <input
                        checked={selectedStatus === status}
                        className="border-outline-variant text-primary focus:ring-primary h-3.5 w-3.5"
                        name="status"
                        type="radio"
                        onChange={() => setSelectedStatus(status)}
                      />
                      <span className="ml-3 text-sm text-on-surface-variant group-hover:text-primary transition-colors">{status}</span>
                    </label>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <section className="flex-grow">
          <header className="flex justify-between items-end mb-12">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-primary mb-2 block">System Repository</span>
              <h1 className="text-4xl font-extrabold tracking-tighter text-on-surface">
                Active Projects <span className="text-primary opacity-30 text-2xl font-normal ml-2">/ {projects.length}</span>
              </h1>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              <span>Sort by:</span>
              <button className="flex items-center gap-1 hover:text-primary transition-colors">
                Newest First
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>
            </div>
          </header>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Project Cards */}
            {filteredProjects.map((project) => {
              const hasMultipleImages = project.project_images && project.project_images.length > 1;
              const currentImageIndex = currentImageIndices[project.id] || 0;

              console.log(`Rendering project: ${project.title}, hasMultipleImages: ${hasMultipleImages}, currentIndex: ${currentImageIndex}`);

              return (
                <article key={project.id} className="bg-surface-container-lowest group relative transition-all duration-300">
                  <div className="aspect-[16/9] w-full bg-surface-container-high overflow-hidden relative">
                    {/* Project Image with Carousel */}
                    {project.project_image ? (
                      <img
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={project.project_image}
                      />
                    ) : project.project_images && project.project_images.length > 0 ? (
                      <div className="relative w-full h-full">
                        <img
                          alt={`${project.title} - Image ${currentImageIndex + 1}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          src={project.project_images[currentImageIndex].image}
                        />
                        {/* Carousel Indicators */}
                        {project.project_images.length > 1 && (
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                            {project.project_images.map((_, index) => (
                              <div
                                key={index}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex
                                  ? 'bg-white w-6'
                                  : 'bg-white/50'
                                  }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-full bg-surface-container-low flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl text-outline-variant">code</span>
                      </div>
                    )}

                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-2 py-1 bg-on-surface text-[9px] font-black text-surface tracking-tighter uppercase">
                        {project.status || 'ACTIVE'}
                      </span>
                      <span className="px-2 py-1 bg-primary-fixed text-[9px] font-black text-on-primary-fixed tracking-tighter uppercase">
                        {project.technologies_used ? project.technologies_used.split(',')[0].trim().toUpperCase() : 'PROJECT'}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 ghost-border border-t-0">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold tracking-tight text-on-surface">{project.title}</h3>
                      <span className="text-[10px] font-mono text-on-surface-variant opacity-50">#{project.id}</span>
                    </div>
                    <p className="text-sm text-on-surface-variant leading-relaxed mb-8 h-10 line-clamp-2">{project.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {/* Placeholder team avatars - can be enhanced with real team data */}
                        <div className="w-6 h-6 rounded-full border-2 border-surface-container-lowest bg-primary-container"></div>
                        <div className="w-6 h-6 rounded-full border-2 border-surface-container-lowest bg-secondary-fixed"></div>
                        <div className="w-6 h-6 rounded-full border-2 border-surface-container-lowest bg-tertiary-fixed text-[8px] flex items-center justify-center font-bold text-on-tertiary-fixed">+{Math.floor(Math.random() * 5) + 2}</div>
                      </div>
                      <button
                        onClick={() => handleViewProject(project)}
                        className="flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-primary-container transition-all scale-[0.98] active:scale-[0.95]"
                      >
                        View Project
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                  <div className="absolute -top-px left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500"></div>
                </article>
              );
            })}

            {/* Create New Instance Card */}
            <article className="bg-surface-container-lowest group relative transition-all duration-300">
              <div className="aspect-[16/9] w-full bg-surface-container-high overflow-hidden relative">
                <div className="w-full h-full bg-surface-container-low flex items-center justify-center p-12">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-4xl text-outline-variant mb-2 block">add_circle</span>
                    <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Initialize New Project</p>
                  </div>
                </div>
              </div>
              <div className="p-8 ghost-border border-t-0 flex flex-col items-center justify-center text-center">
                <h3 className="text-xl font-bold tracking-tight text-on-surface mb-2">Create New Instance</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-8 max-w-[240px]">Bootstrap a new repository using pre-approved precision templates.</p>
                <button className="px-8 py-2.5 bg-surface-container-high text-on-surface rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-surface-container-highest transition-all">
                  Open Architect
                </button>
              </div>
            </article>
          </div>

          {/* Pagination */}
          <footer className="mt-20 flex items-center justify-between border-t border-outline-variant border-opacity-20 pt-10">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Showing {filteredProjects.length} of {projects.length} projects</span>
            <nav className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant border-opacity-20 text-on-surface hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-on-primary font-bold text-xs">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface font-bold text-xs hover:bg-surface-container-low transition-colors">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface font-bold text-xs hover:bg-surface-container-low transition-colors">3</button>
              <span className="text-on-surface-variant px-2">...</span>
              <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface font-bold text-xs hover:bg-surface-container-low transition-colors">6</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant border-opacity-20 text-on-surface hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </nav>
          </footer>
        </section>
      </main>

      {/* Project Details Modal */}
      {showProjectDetails && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="bg-surface-container-lowest rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-outline-variant">
                <h2 className="text-2xl font-bold text-on-surface">{selectedProject.title}</h2>
                <button
                  onClick={closeProjectDetails}
                  className="text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-2xl">close</span>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Project Images */}
                {selectedProject.project_images && selectedProject.project_images.length > 0 && (
                  <div className="mb-8">
                    <div
                      className="relative aspect-video bg-surface-container-high rounded-lg overflow-hidden group"
                      onMouseEnter={() => setShowArrows(true)}
                      onMouseLeave={() => setShowArrows(false)}
                    >
                      <img
                        src={selectedProject.project_images[currentModalImageIndex].image}
                        alt={`${selectedProject.title} - Image ${currentModalImageIndex + 1}`}
                        className="w-full h-full object-cover transition-opacity duration-500"
                      />

                      {/* Left Arrow */}
                      {selectedProject.project_images.length > 1 && showArrows && (
                        <button
                          onClick={goToPreviousImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all duration-200 opacity-0 group-hover:opacity-100"
                        >
                          <span className="material-symbols-outlined text-xl">chevron_left</span>
                        </button>
                      )}

                      {/* Right Arrow */}
                      {selectedProject.project_images.length > 1 && showArrows && (
                        <button
                          onClick={goToNextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all duration-200 opacity-0 group-hover:opacity-100"
                        >
                          <span className="material-symbols-outlined text-xl">chevron_right</span>
                        </button>
                      )}

                      {/* Image Indicators */}
                      {selectedProject.project_images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                          {selectedProject.project_images.map((_, index) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentModalImageIndex
                                  ? 'bg-white w-6'
                                  : 'bg-white/50'
                                }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Thumbnail Gallery */}
                    {selectedProject.project_images.length > 1 && (
                      <div className="flex gap-2 mt-4 overflow-x-auto">
                        {selectedProject.project_images.map((img, index) => (
                          <img
                            key={index}
                            src={img.image}
                            alt={`${selectedProject.title} - Image ${index + 1}`}
                            onClick={() => setCurrentModalImageIndex(index)}
                            className={`w-20 h-20 object-cover rounded-lg border-2 cursor-pointer transition-all duration-200 ${index === currentModalImageIndex
                                ? 'border-primary scale-110'
                                : 'border-surface-container-high hover:border-primary'
                              }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Project Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <h3 className="text-sm font-bold text-on-surface-variant mb-2 uppercase tracking-wider">Status</h3>
                    <span className="px-3 py-1 bg-on-surface text-[10px] font-black text-surface tracking-tighter uppercase rounded-full">
                      {selectedProject.status || 'ACTIVE'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-on-surface-variant mb-2 uppercase tracking-wider">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies_used && selectedProject.technologies_used.split(',').map((tech, index) => (
                        <span key={index} className="px-2 py-1 bg-surface-container-high text-[10px] font-medium text-on-surface-variant rounded-md">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-on-surface-variant mb-2 uppercase tracking-wider">Project ID</h3>
                    <span className="text-sm font-mono text-on-surface-variant">#{selectedProject.id}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-on-surface-variant mb-4 uppercase tracking-wider">Description</h3>
                  <p className="text-on-surface leading-relaxed">{selectedProject.description}</p>
                </div>

                {/* Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedProject.github_repo && (
                    <div>
                      <h3 className="text-sm font-bold text-on-surface-variant mb-2 uppercase tracking-wider">GitHub Repository</h3>
                      <a
                        href={selectedProject.github_repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-container transition-colors flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-sm">code</span>
                        View Source Code
                      </a>
                    </div>
                  )}
                  {selectedProject.live_link && (
                    <div>
                      <h3 className="text-sm font-bold text-on-surface-variant mb-2 uppercase tracking-wider">Live Demo</h3>
                      <a
                        href={selectedProject.live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-container transition-colors flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-sm">launch</span>
                        View Live Project
                      </a>
                    </div>
                  )}
                </div>

                {/* Featured Badge */}
                {selectedProject.is_featured && (
                  <div className="mt-6">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-[10px] font-bold uppercase tracking-wider rounded-full">
                      Featured Project
                    </span>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-4 p-6 border-t border-outline-variant">
                <button
                  onClick={closeProjectDetails}
                  className="px-6 py-2.5 bg-surface-container-high text-on-surface rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-surface-container-highest transition-all"
                >
                  Close
                </button>
                {selectedProject.live_link && (
                  <a
                    href={selectedProject.live_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-primary-container transition-all"
                  >
                    Visit Project
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </PublicLayout>
  );
};

export default Projects;

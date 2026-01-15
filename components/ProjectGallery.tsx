'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Modal,
  IconButton,
  useTheme,
  useMediaQuery,
  Grid,
} from '@mui/material';
import {
  Close as CloseIcon,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Project {
  name: string;
  folderPath: string;
  images: string[];
  firstImage: string;
}

interface ProjectGalleryProps {
  projects: Project[];
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
      setCurrentImageIndex(0);
    }, 300);
  };

  const handleNextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'Escape') handleCloseModal();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isModalOpen, selectedProject, currentImageIndex]);

  return (
    <>
      {/* Project Grid */}
      <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
        {projects.map((project, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={project.name}>
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{ y: -12, scale: 1.02 }}
              style={{ height: '100%' }}
            >
              <Box
                onClick={() => handleProjectClick(project)}
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: { xs: 280, sm: 320, md: 360, lg: 400 },
                  borderRadius: { xs: 2, sm: 2.5, md: 3 },
                  overflow: 'hidden',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                  cursor: 'pointer',
                  backgroundColor: 'background.default',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
                    transform: 'translateY(-8px)',
                    '& .project-image': {
                      transform: 'scale(1.08)',
                    },
                    '& .project-overlay': {
                      opacity: 1,
                    },
                    '& .project-name': {
                      transform: 'translateY(0)',
                      opacity: 1,
                    },
                  },
                }}
              >
                {/* Image Container */}
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    backgroundColor: 'grey.100',
                  }}
                >
                  <Image
                    src={project.firstImage}
                    alt={project.name}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="project-image"
                    style={{
                      objectFit: 'cover',
                      transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    loading="lazy"
                  />

                  {/* Overlay */}
                  <Box
                    className="project-overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'white',
                        fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                        fontWeight: 600,
                        fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                      }}
                    >
                      View More
                    </Typography>
                  </Box>
                </Box>

                {/* Project Name */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: { xs: 2, sm: 2.5, md: 3 },
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
                  }}
                >
                  <Typography
                    className="project-name"
                    variant="h6"
                    sx={{
                      color: '#ffffff',
                      fontWeight: 600,
                      fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                      textAlign: 'center',
                      fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                      textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                      transform: 'translateY(0)',
                      opacity: 1,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {project.name}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Gallery Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <Modal
            open={isModalOpen}
            onClose={handleCloseModal}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1400,
            }}
            closeAfterTransition
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.95)',
                zIndex: 1400,
              }}
              onClick={handleCloseModal}
            >
              {/* Close Button */}
              <IconButton
                onClick={handleCloseModal}
                sx={{
                  position: 'absolute',
                  top: { xs: 16, sm: 24, md: 32 },
                  right: { xs: 16, sm: 24, md: 32 },
                  zIndex: 1401,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'rotate(90deg)',
                  },
                  transition: 'all 0.3s ease',
                  width: { xs: 40, sm: 48, md: 56 },
                  height: { xs: 40, sm: 48, md: 56 },
                }}
              >
                <CloseIcon sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }} />
              </IconButton>

              {/* Project Name */}
              <Box
                sx={{
                  position: 'absolute',
                  top: { xs: 16, sm: 24, md: 32 },
                  left: { xs: 16, sm: 24, md: 32 },
                  zIndex: 1401,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  backdropFilter: 'blur(10px)',
                  px: { xs: 2, sm: 3, md: 4 },
                  py: { xs: 1, sm: 1.5, md: 2 },
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: 'white',
                    fontWeight: 600,
                    fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                    fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                  }}
                >
                  {selectedProject.name}
                </Typography>
              </Box>

              {/* Image Container */}
              <Box
                onClick={(e) => e.stopPropagation()}
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: { xs: 4, sm: 6, md: 8 },
                  pt: { xs: 10, sm: 12, md: 14 },
                  pb: { xs: 10, sm: 12, md: 14 },
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      maxWidth: '90vw',
                      maxHeight: '90vh',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Image
                      src={selectedProject.images[currentImageIndex]}
                      alt={`${selectedProject.name} - Image ${currentImageIndex + 1}`}
                      fill
                      sizes="90vw"
                      style={{
                        objectFit: 'contain',
                      }}
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                {selectedProject.images.length > 1 && (
                  <>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevImage();
                      }}
                      sx={{
                        position: 'absolute',
                        left: { xs: 8, sm: 16, md: 24 },
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          transform: 'translateX(-4px)',
                        },
                        transition: 'all 0.3s ease',
                        width: { xs: 48, sm: 56, md: 64 },
                        height: { xs: 48, sm: 56, md: 64 },
                        zIndex: 1401,
                      }}
                    >
                      <ChevronLeft sx={{ fontSize: { xs: 32, sm: 36, md: 40 } }} />
                    </IconButton>

                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextImage();
                      }}
                      sx={{
                        position: 'absolute',
                        right: { xs: 8, sm: 16, md: 24 },
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          transform: 'translateX(4px)',
                        },
                        transition: 'all 0.3s ease',
                        width: { xs: 48, sm: 56, md: 64 },
                        height: { xs: 48, sm: 56, md: 64 },
                        zIndex: 1401,
                      }}
                    >
                      <ChevronRight sx={{ fontSize: { xs: 32, sm: 36, md: 40 } }} />
                    </IconButton>
                  </>
                )}

                {/* Thumbnail Navigation (Desktop) */}
                {!isMobile && selectedProject.images.length > 1 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: { xs: 16, sm: 24, md: 32 },
                      left: '50%',
                      transform: 'translateX(-50%)',
                      display: 'flex',
                      gap: 1,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      backdropFilter: 'blur(10px)',
                      px: 2,
                      py: 1.5,
                      borderRadius: 2,
                      zIndex: 1401,
                      maxWidth: '90%',
                      overflowX: 'auto',
                      '&::-webkit-scrollbar': {
                        height: 4,
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(255,255,255,0.3)',
                        borderRadius: 2,
                      },
                    }}
                  >
                    {selectedProject.images.map((img, idx) => (
                      <Box
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(idx);
                        }}
                        sx={{
                          position: 'relative',
                          width: 60,
                          height: 60,
                          borderRadius: 1,
                          overflow: 'hidden',
                          cursor: 'pointer',
                          border: currentImageIndex === idx ? '2px solid white' : '2px solid transparent',
                          opacity: currentImageIndex === idx ? 1 : 0.6,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            opacity: 1,
                            transform: 'scale(1.1)',
                          },
                        }}
                      >
                        <Image
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          sizes="60px"
                          style={{
                            objectFit: 'cover',
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectGallery;


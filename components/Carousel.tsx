'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  Typography,
} from '@mui/material';
import {
  ArrowBackIos,
  ArrowForwardIos,
  Circle,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  fadeInUp,
  scaleIn,
  staggerContainer,
  staggerItem,
} from '../utils/animations';

interface CarouselImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface CarouselProps {
  images: CarouselImage[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  height?: string | number;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  autoPlay = true,
  autoPlayInterval = 5000,
  showIndicators = true,
  showArrows = true,
  height = { xs: 300, sm: 400, md: 500 },
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: height,
          overflow: 'hidden',
          borderRadius: { xs: 2, md: 4 },
          boxShadow: theme.shadows[8],
          backgroundColor: 'background.paper',
        }}
      >
        {/* Main Image Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              style={{
                objectFit: 'cover',
              }}
              priority={currentIndex === 0}
            />
            
            {/* Overlay for text content */}
            {(images[currentIndex].title || images[currentIndex].description) && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  p: { xs: 2, md: 4 },
                  color: 'white',
                }}
              >
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  {images[currentIndex].title && (
                    <motion.div variants={staggerItem}>
                      <Typography
                        variant={isMobile ? 'h5' : 'h4'}
                        sx={{
                          fontWeight: 'bold',
                          mb: 1,
                          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        }}
                      >
                        {images[currentIndex].title}
                      </Typography>
                    </motion.div>
                  )}
                  {images[currentIndex].description && (
                    <motion.div variants={staggerItem}>
                      <Typography
                        variant={isMobile ? 'body2' : 'body1'}
                        sx={{
                          opacity: 0.9,
                          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                        }}
                      >
                        {images[currentIndex].description}
                      </Typography>
                    </motion.div>
                  )}
                </motion.div>
              </Box>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {showArrows && images.length > 1 && (
          <>
            <IconButton
              onClick={goToPrevious}
              sx={{
                position: 'absolute',
                left: { xs: 1, md: 2 },
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  transform: 'translateY(-50%) scale(1.1)',
                },
                transition: 'all 0.3s ease',
                zIndex: 2,
              }}
              size={isMobile ? 'small' : 'medium'}
            >
              <ArrowBackIos />
            </IconButton>
            <IconButton
              onClick={goToNext}
              sx={{
                position: 'absolute',
                right: { xs: 1, md: 2 },
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  transform: 'translateY(-50%) scale(1.1)',
                },
                transition: 'all 0.3s ease',
                zIndex: 2,
              }}
              size={isMobile ? 'small' : 'medium'}
            >
              <ArrowForwardIos />
            </IconButton>
          </>
        )}

        {/* Indicators */}
        {showIndicators && images.length > 1 && (
          <Box
            sx={{
              position: 'absolute',
              bottom: { xs: 1, md: 2 },
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 1,
              zIndex: 2,
            }}
          >
            {images.map((_, index) => (
              <IconButton
                key={index}
                onClick={() => goToSlide(index)}
                sx={{
                  p: 0.5,
                  color: currentIndex === index ? 'primary.main' : 'rgba(255, 255, 255, 0.5)',
                  '&:hover': {
                    color: 'primary.main',
                    transform: 'scale(1.2)',
                  },
                  transition: 'all 0.3s ease',
                }}
                size="small"
              >
                <Circle
                  sx={{
                    fontSize: currentIndex === index ? 12 : 8,
                    transition: 'all 0.3s ease',
                  }}
                />
              </IconButton>
            ))}
          </Box>
        )}

        {/* Image Counter */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: 1, md: 2 },
            right: { xs: 1, md: 2 },
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontSize: { xs: '0.75rem', md: '0.875rem' },
            zIndex: 2,
          }}
        >
          {currentIndex + 1} / {images.length}
        </Box>
      </Box>
    </motion.div>
  );
};

export default Carousel;

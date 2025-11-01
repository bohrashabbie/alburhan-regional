'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  useTheme,
  useMediaQuery,
  TextField,
  Paper,
} from '@mui/material';
import {
  Rocket,
  Security,
  Speed,
  Support,
  TrendingUp,
  Group,
  Lightbulb,
  Inventory,
  Build,
  Settings,
  Email,
  Phone,
  LocationOn,
  Send,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  staggerItem,
  hoverLift,
  scaleIn,
  bounceIn,
  floating,
} from '../../utils/animations';
import SpotlightAnimation from '../../components/SpotlightAnimation';
import BrandCarousel from '../../components/BrandCarousel';
import Image from 'next/image';
import { CN, KW, AE, EG } from 'country-flag-icons/react/3x2';
import { useTranslations, useLocale } from 'next-intl';

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  // Contact form state
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  const features = [
    {
      icon: <Rocket sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Innovation',
      description: 'Cutting-edge technology solutions that drive your business forward.',
    },
    {
      icon: <Security sx={{ fontSize: 40, color: 'success.main' }} />,
      title: 'Security',
      description: 'Enterprise-grade security measures to protect your data and systems.',
    },
    {
      icon: <Speed sx={{ fontSize: 40, color: 'warning.main' }} />,
      title: 'Performance',
      description: 'Lightning-fast applications optimized for maximum efficiency.',
    },
    {
      icon: <Support sx={{ fontSize: 40, color: 'secondary.main' }} />,
      title: 'Support',
      description: '24/7 dedicated support team ready to assist you anytime.',
    },
  ];


  return (
    <Box sx={{ flex: 1 }}>
      {/* Spotlight Animation Hero Section */}
      <SpotlightAnimation />

      {/* About Us Section */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: 'background.default' }}>
          <Container maxWidth="xl">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div variants={staggerItem}>
                <Typography
                  variant={isMobile ? 'h4' : 'h3'}
                  sx={{
                    fontWeight: 'bold',
                    color: 'primary.main',
                    textAlign: 'center',
                    mb: 6,
                  }}
                >
                  {t('sections.aboutUs')}
                </Typography>
              </motion.div>
              
              <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} sx={{ minHeight: { xs: 'auto', sm: 'auto', md: '600px', lg: '650px' } }}>
                {/* Left Side - 35% - Project Image */}
                <Grid size={{ xs: 12, sm: 12, md: 4.2 }}>
                    <motion.div
                    initial={{ opacity: 0, x: -80, rotateY: -15 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                      transition={{ 
                      duration: 1.2, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                    whileHover={{ 
                      scale: 1.03,
                      rotateY: 2,
                      transition: { duration: 0.4 }
                      }}
                      style={{ 
                        height: '100%',
                      perspective: '1000px'
                      }}
                    >
                    <Box
                        sx={{
                        position: 'relative',
                        width: '100%',
                        height: { 
                          xs: 280, 
                          sm: 320, 
                          md: '100%' 
                        },
                        minHeight: { 
                          xs: 280, 
                          sm: 320, 
                          md: 600,
                          lg: 650 
                        },
                        borderRadius: { xs: 2, sm: 2.5, md: 3 },
                          overflow: 'hidden',
                        boxShadow: '0 12px 48px rgba(0,0,0,0.15)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                          boxShadow: '0 20px 64px rgba(0,0,0,0.25)',
                        },
                      }}
                    >
                      <motion.div
                        initial={{ 
                          scale: 1.25, 
                          opacity: 0, 
                          filter: 'blur(12px) brightness(0.8)',
                          rotate: 2
                        }}
                        whileInView={{ 
                          scale: 1, 
                          opacity: 1, 
                          filter: 'blur(0px) brightness(1)',
                          rotate: 0
                        }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ 
                          duration: 1.4,
                          ease: [0.25, 0.46, 0.45, 0.94],
                          delay: 0.2
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          transition: { duration: 0.6 }
                        }}
                        style={{ width: '100%', height: '100%', position: 'relative' }}
                      >
                        <Image
                          src="/Projects/Project 1.png"
                          alt="AL-Burhan Project"
                          fill
                          style={{
                            objectFit: 'cover',
                          }}
                          sizes="(max-width: 960px) 100vw, 35vw"
                        />
                      </motion.div>
                      
                      {/* Animated gradient overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.6 }}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.25) 100%)',
                          zIndex: 1,
                        }}
                      />
                      
                      {/* Shine effect on hover */}
                      <motion.div
                        initial={{ x: '-100%', opacity: 0 }}
                        whileHover={{ x: '100%', opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '50%',
                          height: '100%',
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                          zIndex: 2,
                          pointerEvents: 'none',
                        }}
                      />
                    </Box>
                  </motion.div>
                </Grid>

                {/* Right Side - 65% - Country Images Grid */}
                <Grid size={{ xs: 12, sm: 12, md: 7.8 }}>
                  <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} sx={{ height: { xs: 'auto', md: '100%' } }}>
                    {[
                      { 
                        image: '/Countries/alburhan-china.jpg', 
                        firmName: t('aboutUs.china.firmName'),
                        countryName: t('aboutUs.china.countryName'),
                        flag: CN,
                        countryCode: 'CN',
                        key: 'china'
                      },
                      { 
                        image: '/Countries/alburhan-kuwait.jpg', 
                        firmName: t('aboutUs.kuwait.firmName'),
                        countryName: t('aboutUs.kuwait.countryName'),
                        flag: KW,
                        countryCode: 'KW',
                        key: 'kuwait'
                      },
                      { 
                        image: '/Countries/alburhan-dubai.jpg', 
                        firmName: t('aboutUs.dubai.firmName'),
                        countryName: t('aboutUs.dubai.countryName'),
                        flag: AE,
                        countryCode: 'AE',
                        key: 'dubai'
                      },
                      { 
                        image: '/Countries/alburhan-egypt.jpg', 
                        firmName: t('aboutUs.egypt.firmName'),
                        countryName: t('aboutUs.egypt.countryName'),
                        flag: EG,
                        countryCode: 'EG',
                        key: 'egypt'
                      },
                    ].map((country, index) => {
                      const FlagComponent = country.flag;
                      return (
                      <Grid size={{ xs: 12, sm: 6 }} key={index}>
                        <motion.div
                          initial={{ opacity: 0, y: 60, scale: 0.95 }}
                          whileInView={{ opacity: 1, y: 0, scale: 1 }}
                          viewport={{ once: true, amount: 0.1 }}
                          transition={{ 
                            duration: 0.8,
                            delay: index * 0.15,
                            ease: [0.25, 0.46, 0.45, 0.94],
                            type: "spring",
                            stiffness: 120,
                            damping: 20
                          }}
                          whileHover={{ 
                            scale: 1.02, 
                            y: -4,
                            transition: { duration: 0.3, ease: "easeOut" }
                          }}
                          style={{ height: '100%' }}
                      >
                        <Box
                          sx={{
                            position: 'relative',
                            width: '100%',
                              height: { 
                                xs: 220, 
                                sm: 250, 
                                md: 280,
                                lg: 290 
                              },
                              minHeight: { 
                                xs: 220, 
                                sm: 250, 
                                md: 280,
                                lg: 290 
                              },
                              borderRadius: { xs: 2, sm: 2.5, md: 3 },
                            overflow: 'hidden',
                              boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                              cursor: 'pointer',
                              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                              '&:hover': {
                                boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
                              },
                            }}
                          >
                            {/* Animated Image with Professional Effects */}
                          <motion.div
                              initial={{ 
                                scale: 1.2, 
                                opacity: 0, 
                                filter: 'blur(12px) brightness(0.7) saturate(0.8)',
                                rotate: -2
                              }}
                              whileInView={{ 
                                scale: 1, 
                                opacity: 1, 
                                filter: 'blur(0px) brightness(1) saturate(1)',
                                rotate: 0
                              }}
                              viewport={{ once: true, amount: 0.2 }}
                              transition={{ 
                                duration: 1.2,
                                delay: index * 0.2 + 0.3,
                                ease: [0.25, 0.46, 0.45, 0.94],
                                type: "spring",
                                stiffness: 100
                              }}
                              whileHover={{ 
                                scale: 1.03,
                                filter: 'brightness(1.05)',
                                transition: { duration: 0.4, ease: "easeOut" }
                              }}
                              style={{ width: '100%', height: '100%', position: 'relative' }}
                          >
                            <Image
                                src={country.image}
                                alt={`${country.firmName} ${country.countryName}`}
                              fill
                              style={{
                                objectFit: 'cover',
                              }}
                                sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 32.5vw"
                            />
                          </motion.div>
                          
                            {/* Animated Dark overlay with gradient */}
                          <motion.div
                            initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ 
                                duration: 0.9, 
                                delay: index * 0.2 + 0.6,
                                ease: [0.25, 0.46, 0.45, 0.94]
                              }}
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                                background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 100%)',
                                zIndex: 1,
                            }}
                          />
                          
                            {/* Subtle glow effect on hover */}
                          <motion.div
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.4 }}
                            style={{
                              position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'radial-gradient(circle at center, rgba(220, 38, 38, 0.05) 0%, transparent 70%)',
                                zIndex: 1,
                                pointerEvents: 'none',
                              }}
                            />
                            
                            {/* Text Overlay with Enhanced Animation */}
                            <Box
                              sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                p: { xs: 2, sm: 2.5, md: 3 },
                              zIndex: 2,
                            }}
                          >
                          <motion.div
                                key={`text-${index}-${country.firmName}-${country.countryName}`}
                                initial={{ 
                                  y: 30, 
                                  opacity: 0
                                }}
                                whileInView={{ 
                                  y: 0, 
                                  opacity: 1
                                }}
                                viewport={{ once: false, amount: 0.1 }}
                                transition={{ 
                                  duration: 0.8,
                                  delay: index * 0.15 + 0.4,
                                  ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                                animate={{ 
                                  opacity: 1,
                                  y: 0
                                }}
                                style={{ 
                                  display: 'block',
                                  width: '100%',
                                  position: 'relative',
                                  zIndex: 3
                                }}
                          >
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: { xs: 0.5, sm: 0.75, md: 1 },
                                  width: '100%',
                                }}
                              >
                                {/* Firm Name - First Line */}
                            <Typography
                                  variant={isMobile ? 'h6' : 'h5'}
                              sx={{
                                    fontWeight: 600,
                                    fontSize: { 
                                      xs: '1rem', 
                                      sm: '1.15rem', 
                                      md: '1.3rem',
                                      lg: '1.6rem' 
                                    },
                                    color: '#ffffff',
                                    textShadow: '2px 2px 12px rgba(0,0,0,0.9), 0 0 25px rgba(0,0,0,0.5)',
                                    fontFamily: 'var(--font-montserrat), var(--font-poppins), "Roboto", sans-serif',
                                    letterSpacing: { xs: '0.03em', sm: '0.04em', md: '0.06em' },
                                    lineHeight: 1.2,
                                    textTransform: 'none',
                                    display: 'block',
                                    width: '100%',
                                  }}
                                >
                                  {country.firmName}
                            </Typography>
                                
                                {/* Country Name with Flag - Second Line */}
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: { xs: 0.75, sm: 1, md: 1.5 },
                                    flexWrap: 'nowrap',
                                  }}
                                >
                                  {/* Country Flag */}
                                  <Box
                                    component={motion.div}
                                    initial={{ scale: 0, rotate: -180 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    viewport={{ once: false, amount: 0.1 }}
                                    transition={{ 
                                      duration: 0.6,
                                      delay: index * 0.15 + 0.6,
                                      ease: [0.34, 1.56, 0.64, 1]
                                    }}
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      minWidth: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                                      width: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                                      height: { xs: '1.25rem', sm: '1.5rem', md: '1.625rem' },
                                      filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.8))',
                                      borderRadius: '2px',
                                      overflow: 'hidden',
                                      border: '1px solid rgba(255,255,255,0.2)',
                                      boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                      flexShrink: 0,
                                    }}
                                  >
                                    <FlagComponent
                                      title={country.countryCode}
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                      }}
                                    />
                                  </Box>
                                  
                                  {/* Country Name */}
                            <Typography
                                    variant={isMobile ? 'h6' : 'h5'}
                                    sx={{
                                      fontWeight: 600,
                                      fontSize: { 
                                        xs: '0.95rem', 
                                        sm: '1.1rem', 
                                        md: '1.25rem',
                                        lg: '1.5rem' 
                                      },
                                      color: '#ffffff',
                                      textShadow: '2px 2px 12px rgba(0,0,0,0.9), 0 0 25px rgba(0,0,0,0.5)',
                                      fontFamily: 'var(--font-montserrat), var(--font-poppins), "Roboto", sans-serif',
                                      letterSpacing: { xs: '0.03em', sm: '0.04em', md: '0.06em' },
                                      lineHeight: 1.2,
                                      textTransform: 'none',
                                      flex: 1,
                                      minWidth: 0,
                                    }}
                                  >
                                    {country.countryName}
                            </Typography>
                                </Box>
                              </Box>
                          </motion.div>
                            </Box>
                            
                            {/* Subtle shine sweep effect on hover */}
                            <motion.div
                              initial={{ x: '-100%', opacity: 0 }}
                              whileHover={{ x: '100%', opacity: 0.6 }}
                              transition={{ duration: 0.6, ease: 'easeInOut' }}
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '30%',
                                height: '100%',
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                                transform: 'skewX(-15deg)',
                                zIndex: 2,
                                pointerEvents: 'none',
                              }}
                            />
                          </Box>
                    </motion.div>
                  </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              </Grid>
            </motion.div>
          </Container>
        </Box>
      </motion.div>

      {/* Introduction Section */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Box sx={{ py: { xs: 3, md: 4 }, backgroundColor: 'background.paper', position: 'relative' }}>
          <Container maxWidth="xl">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {/* Introduction Heading */}
              <motion.div
                initial={{ opacity: 0, y: -30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
              >
                <Typography
                  variant={isMobile ? 'h5' : 'h4'}
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    textAlign: 'center',
                    mb: 4,
                    fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem', lg: '2.25rem' },
                    fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                    letterSpacing: { xs: '0.02em', md: '0.04em' },
                    lineHeight: 1.4,
                  }}
                >
                  {t('sections.introduction')}
                </Typography>
              </motion.div>

              <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center">
                {/* Logo Image - Left Side */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <motion.div
                    initial={{ opacity: 0, x: -80, scale: 0.9, rotateY: -15 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ 
                      duration: 1.2,
                      ease: [0.34, 1.56, 0.64, 1],
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.4 }
                    }}
                    style={{ 
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: { xs: 200, sm: 250, md: 320, lg: 380 },
                        height: { xs: 200, sm: 250, md: 320, lg: 380 },
                        mx: 'auto',
                      }}
                    >
                      <motion.div
                        initial={{ scale: 1.2, opacity: 0, filter: 'blur(10px)' }}
                        whileInView={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 1,
                          delay: 0.3,
                          ease: [0.34, 1.56, 0.64, 1]
                        }}
                        whileHover={{ 
                          scale: 1.08,
                          transition: { duration: 0.3 }
                        }}
                        style={{
                          position: 'relative', 
                          width: '100%',
                        height: '100%',
                      }}
                    >
                      <Image
                          src="/logo/al-burhanilogo.png"
                          alt="AL-Burhan Logo"
                        fill
                        style={{
                            objectFit: 'contain',
                          }}
                          sizes="(max-width: 600px) 200px, (max-width: 960px) 250px, 320px"
                        />
                      </motion.div>
                    </Box>
                  </motion.div>
                </Grid>

                {/* Text Content - Right Side */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <motion.div
                    initial={{ opacity: 0, x: 50, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ 
                      duration: 1.2,
                      ease: [0.34, 1.56, 0.64, 1],
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, md: 2 } }}>
                      {/* Description Paragraphs with Enhanced Animations */}
                        <motion.div
                        initial={{ opacity: 0, y: 40, x: 30, filter: 'blur(12px)', scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, x: 0, filter: 'blur(0px)', scale: 1 }}
                          viewport={{ once: true }}
                        transition={{ 
                          duration: 1,
                          delay: 0.4,
                          ease: [0.34, 1.56, 0.64, 1]
                        }}
                        >
                          <Typography
                          variant="body1"
                            sx={{
                            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                            color: 'text.secondary',
                            lineHeight: 1.8,
                            mb: 1.5,
                            fontFamily: 'var(--font-roboto), var(--font-open-sans), sans-serif',
                            fontWeight: 400,
                          }}
                        >
                          {t('introduction.description')}
                          </Typography>
                        </motion.div>

                        <motion.div
                        initial={{ opacity: 0, y: 40, x: 30, filter: 'blur(12px)', scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, x: 0, filter: 'blur(0px)', scale: 1 }}
                          viewport={{ once: true }}
                        transition={{ 
                          duration: 1,
                          delay: 0.6,
                          ease: [0.34, 1.56, 0.64, 1]
                        }}
                        >
                          <Typography
                          variant="body1"
                            sx={{
                            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                            color: 'text.secondary',
                            lineHeight: 1.8,
                            mb: 1.5,
                            fontFamily: 'var(--font-roboto), var(--font-open-sans), sans-serif',
                            fontWeight: 400,
                          }}
                        >
                          {t('introduction.additionalInfo')}
                          </Typography>
                        </motion.div>

                        <motion.div
                        initial={{ opacity: 0, y: 40, x: 30, filter: 'blur(12px)', scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, x: 0, filter: 'blur(0px)', scale: 1 }}
                          viewport={{ once: true }}
                        transition={{ 
                          duration: 1,
                          delay: 0.8,
                          ease: [0.34, 1.56, 0.64, 1]
                        }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                            color: 'text.secondary',
                            lineHeight: 1.8,
                            fontFamily: 'var(--font-roboto), var(--font-open-sans), sans-serif',
                            fontWeight: 400,
                          }}
                        >
                          From innovative LED technologies to elegant designer collections, we transform visions into reality, creating lighting experiences that inspire and elevate every environment we touch.
                          </Typography>
                        </motion.div>
                    </Box>
                  </motion.div>
                </Grid>
              </Grid>
            </motion.div>
          </Container>
        </Box>
      </motion.div>

      {/* From Owner Section */}
                  <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Box sx={{ py: { xs: 3, sm: 3.5, md: 4, lg: 5 }, backgroundColor: 'background.default', position: 'relative' }}>
          <Container maxWidth="xl">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
                    viewport={{ once: true }}
            >
              {/* From Owner Heading */}
              <motion.div
                initial={{ opacity: 0, y: -30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
                  >
                    <Typography
                  variant={isMobile ? 'h5' : 'h4'}
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        textAlign: 'center',
                    mb: { xs: 3, sm: 3.5, md: 4, lg: 5 },
                    fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem', lg: '2.25rem', xl: '2.5rem' },
                    fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                    letterSpacing: { xs: '0.02em', md: '0.04em' },
                    lineHeight: 1.4,
                    px: { xs: 2, sm: 0 },
                  }}
                >
                  {t('sections.fromOwner')}
                    </Typography>
              </motion.div>

              {/* First Owner - Quote Left, Image Right */}
              <Grid container spacing={{ xs: 3, sm: 3, md: 4, lg: 5 }} alignItems="center" sx={{ mb: { xs: 4, sm: 4, md: 4, lg: 5 } }}>
                {/* Owner Image - Show First on Mobile, Right Side on Desktop */}
                <Grid size={{ xs: 12, sm: 12, md: 5, lg: 5 }} sx={{ order: { xs: 1, md: 2 } }}>
                        <motion.div
                    initial={{ opacity: 0, x: 80, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ 
                      duration: 1.2,
                      ease: [0.34, 1.56, 0.64, 1],
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                    whileHover={{ 
                      scale: 1.03,
                      transition: { duration: 0.4 }
                    }}
                    style={{ 
                      position: 'relative',
                      width: '100%',
                    }}
                        >
                          <Box
                            sx={{
                              position: 'relative',
                        width: '100%',
                        height: { xs: 280, sm: 320, md: 360, lg: 400, xl: 420 },
                        maxWidth: { xs: '100%', md: 'none' },
                        mx: { xs: 'auto', md: 0 },
                        borderRadius: { xs: 2, md: 3 },
                              overflow: 'hidden',
                        boxShadow: { xs: '0 10px 30px rgba(0,0,0,0.1)', md: '0 15px 40px rgba(0,0,0,0.1)' },
                              }}
                            >
                              <Image
                        src="/Owners/Owner1.jpeg"
                        alt="Owner"
                                fill
                                style={{
                                  objectFit: 'cover',
                                }}
                        sizes="(max-width: 600px) 100vw, (max-width: 960px) 100vw, 40vw"
                      />
                      {/* Overlay with Owner Name and Designation */}
                      <Box
                        sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                          right: 0,
                          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)',
                          p: { xs: 2.5, sm: 2.5, md: 3 },
                          color: 'white',
                        }}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                            >
                              <Typography
                            variant="h6"
                                sx={{
                              fontWeight: 700,
                              fontSize: { xs: '1.05rem', sm: '1.1rem', md: '1.15rem', lg: '1.2rem', xl: '1.3rem' },
                              fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                              mb: { xs: 0.4, sm: 0.4, md: 0.5 },
                              lineHeight: 1.2,
                            }}
                          >
                            {t('owners.founder.name')}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 400,
                              fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.85rem', lg: '0.9rem' },
                              fontFamily: 'var(--font-roboto), var(--font-open-sans), sans-serif',
                              opacity: 0.95,
                              letterSpacing: { xs: '0.03em', md: '0.05em' },
                              lineHeight: 1.3,
                            }}
                          >
                            {t('owners.founder.designation')}
                              </Typography>
                            </motion.div>
                      </Box>
                          </Box>
                        </motion.div>
                </Grid>

                {/* Owner Quote - Left Side on Desktop, Below Image on Mobile */}
                <Grid size={{ xs: 12, sm: 12, md: 7, lg: 7 }} sx={{ order: { xs: 2, md: 1 } }}>
                  <motion.div
                    initial={{ opacity: 0, x: -50, y: 30 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ 
                      duration: 1.2,
                      ease: [0.34, 1.56, 0.64, 1],
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        minHeight: { xs: 'auto', md: '100%' },
                        px: { xs: 2, sm: 2.5, md: 3, lg: 4 },
                        py: { xs: 0, sm: 0, md: 0 },
                      }}
                        >
                          <Box
                            sx={{
                              position: 'relative',
                        pr: { xs: 0, sm: 0, md: 3, lg: 4 },
                        pl: { xs: 0, sm: 0 },
                        textAlign: { xs: 'center', sm: 'center', md: isRTL ? 'right' : 'right' },
                      }}
                    >
                      {/* Quote Icon */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: { xs: -5, sm: -8, md: -10 },
                          right: { xs: 'auto', sm: 'auto', md: isRTL ? 0 : 'auto' },
                          left: { xs: '50%', sm: '50%', md: isRTL ? 'auto' : 0 },
                          transform: { xs: 'translateX(-50%)', md: 'none' },
                          fontSize: { xs: '3rem', sm: '3.5rem', md: '4.5rem', lg: '5rem' },
                          color: 'text.secondary',
                          opacity: 0.2,
                          fontFamily: 'Georgia, serif',
                          lineHeight: 1,
                          display: { xs: 'none', sm: 'block' },
                        }}
                      >
                        "
                      </Box>
                      
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.15rem', lg: '1.25rem', xl: '1.35rem' },
                          color: 'text.secondary',
                          lineHeight: { xs: 1.75, sm: 1.8, md: 1.8 },
                          fontFamily: 'var(--font-roboto), var(--font-open-sans), sans-serif',
                          fontWeight: 400,
                          fontStyle: 'italic',
                          mb: { xs: 2.5, sm: 3, md: 3 },
                          position: 'relative',
                          zIndex: 1,
                          textAlign: { xs: 'center', sm: 'center', md: isRTL ? 'right' : 'right' },
                          wordBreak: 'break-word',
                          px: { xs: 1, sm: 2, md: 0 },
                        }}
                      >
                        {t('owners.founder.quote')}
                      </Typography>
                      
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.15rem', lg: '1.25rem', xl: '1.35rem' },
                          color: 'text.secondary',
                          lineHeight: { xs: 1.75, sm: 1.8, md: 1.8 },
                          fontFamily: 'var(--font-roboto), var(--font-open-sans), sans-serif',
                          fontWeight: 400,
                          fontStyle: 'italic',
                          position: 'relative',
                          zIndex: 1,
                          textAlign: { xs: 'center', sm: 'center', md: isRTL ? 'right' : 'right' },
                          wordBreak: 'break-word',
                          px: { xs: 1, sm: 2, md: 0 },
                        }}
                      >
                        {t('owners.founder.quote2')}
                      </Typography>
                    </Box>
                    </Box>
                  </motion.div>
                </Grid>
                </Grid>

              {/* Second Owner - Image Left, Quote Right */}
              <Grid container spacing={{ xs: 3, sm: 3, md: 4, lg: 5 }} alignItems="center">
                {/* Owner Image - Left Side on Desktop, Show First on Mobile */}
                <Grid size={{ xs: 12, sm: 12, md: 5, lg: 5 }} sx={{ order: { xs: 1, md: 1 } }}>
                  <motion.div
                    initial={{ opacity: 0, x: -80, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ 
                      duration: 1.2,
                      ease: [0.34, 1.56, 0.64, 1],
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                    whileHover={{ 
                      scale: 1.03,
                      transition: { duration: 0.4 }
                    }}
                              style={{
                      position: 'relative',
                                width: '100%',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: { xs: 320, sm: 350, md: 360, lg: 400, xl: 420 },
                        maxWidth: { xs: '100%', md: 'none' },
                        mx: { xs: 'auto', md: 0 },
                        borderRadius: { xs: 3, md: 3 },
                        overflow: 'hidden',
                        boxShadow: { xs: '0 12px 35px rgba(0,0,0,0.12)', md: '0 15px 40px rgba(0,0,0,0.1)' },
                        mb: { xs: 3, md: 0 },
                              }}
                            >
                              <Image
                        src="/Owners/owner2.webp"
                        alt="Owner"
                                fill
                                style={{
                                  objectFit: 'cover',
                                }}
                        sizes="(max-width: 600px) 100vw, (max-width: 960px) 100vw, 40vw"
                      />
                      {/* Overlay with Owner Name and Designation */}
                      <Box
                        sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                          right: 0,
                          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)',
                          p: { xs: 2.5, sm: 2.5, md: 3 },
                          color: 'white',
                        }}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <Typography
                            variant="h6"
                      sx={{
                              fontWeight: 700,
                              fontSize: { xs: '1.05rem', sm: '1.1rem', md: '1.15rem', lg: '1.2rem', xl: '1.3rem' },
                              fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                              mb: { xs: 0.4, sm: 0.4, md: 0.5 },
                              lineHeight: 1.2,
                            }}
                          >
                            {t('owners.coFounder.name')}
                    </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 400,
                              fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.85rem', lg: '0.9rem' },
                              fontFamily: 'var(--font-roboto), var(--font-open-sans), sans-serif',
                              opacity: 0.95,
                              letterSpacing: { xs: '0.03em', md: '0.05em' },
                              lineHeight: 1.3,
                            }}
                          >
                            {t('owners.coFounder.designation')}
                              </Typography>
                            </motion.div>
                      </Box>
                          </Box>
                        </motion.div>
                </Grid>

                {/* Owner Quote - Right Side on Desktop, Below Image on Mobile */}
                <Grid size={{ xs: 12, sm: 12, md: 7, lg: 7 }} sx={{ order: { xs: 2, md: 2 } }}>
                          <motion.div
                    initial={{ opacity: 0, x: 50, y: 30 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                            transition={{ 
                      duration: 1.2,
                      ease: [0.34, 1.56, 0.64, 1],
                              type: "spring",
                      stiffness: 100,
                      damping: 15
                            }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                        minHeight: { xs: 'auto', md: '100%' },
                        px: { xs: 2, sm: 2.5, md: 3, lg: 4 },
                        py: { xs: 0, sm: 0, md: 0 },
                      }}
                    >
                    <Box
                      sx={{
                        position: 'relative',
                        pl: { xs: 0, sm: 0, md: isRTL ? 0 : 3, lg: isRTL ? 0 : 4 },
                        pr: { xs: 0, sm: 0, md: isRTL ? 3 : 0, lg: isRTL ? 4 : 0 },
                        textAlign: { xs: 'center', sm: 'center', md: isRTL ? 'right' : 'left' },
                      }}
                    >
                      {/* Quote Icon */}
                                <Box
                                  sx={{
                          position: 'absolute',
                          top: { xs: -5, sm: -8, md: -10 },
                          left: { xs: '50%', sm: '50%', md: 0 },
                          transform: { xs: 'translateX(-50%)', md: 'none' },
                          fontSize: { xs: '3rem', sm: '3.5rem', md: '4.5rem', lg: '5rem' },
                          color: 'text.secondary',
                          opacity: 0.2,
                          fontFamily: 'Georgia, serif',
                          lineHeight: 1,
                          display: { xs: 'none', sm: 'block' },
                        }}
                      >
                        "
                                  </Box>
                      
                              <Typography
                        variant="body1"
                                sx={{
                          fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.15rem', lg: '1.25rem', xl: '1.35rem' },
                          color: 'text.secondary',
                          lineHeight: { xs: 1.75, sm: 1.8, md: 1.8 },
                          fontFamily: 'var(--font-roboto), var(--font-open-sans), sans-serif',
                          fontWeight: 400,
                          fontStyle: 'italic',
                          mb: { xs: 2.5, sm: 3, md: 3 },
                          position: 'relative',
                          zIndex: 1,
                          textAlign: { xs: 'center', sm: 'center', md: 'left' },
                          wordBreak: 'break-word',
                          px: { xs: 1, sm: 2, md: 0 },
                        }}
                      >
                        "Through dedication and passion, we have built a legacy of trust and innovation, creating lighting solutions that enhance lives and illuminate possibilities."
                              </Typography>
                      
                              <Typography
                        variant="body1"
                                sx={{
                          fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.15rem', lg: '1.25rem', xl: '1.35rem' },
                          color: 'text.secondary',
                          lineHeight: { xs: 1.75, sm: 1.8, md: 1.8 },
                          fontFamily: 'var(--font-roboto), var(--font-open-sans), sans-serif',
                          fontWeight: 400,
                          fontStyle: 'italic',
                          position: 'relative',
                          zIndex: 1,
                          textAlign: { xs: 'center', sm: 'center', md: 'left' },
                          wordBreak: 'break-word',
                          px: { xs: 1, sm: 2, md: 0 },
                        }}
                      >
                        {t('owners.coFounder.quote')}
                              </Typography>
                                  </Box>
                            </Box>
                  </motion.div>
                </Grid>
              </Grid>
            </motion.div>
          </Container>
        </Box>
      </motion.div>

      {/* Our Brand Section */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Box sx={{ pt: { xs: 4, sm: 5, md: 6, lg: 7 }, pb: { xs: 1, sm: 1.5, md: 2 }, backgroundColor: 'background.paper', position: 'relative', overflow: 'hidden' }}>
          <Container maxWidth="xl">
            {/* Our Brand Heading */}
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
              transition={{ 
                duration: 0.8,
                ease: [0.34, 1.56, 0.64, 1]
                        }}
                      >
                        <Typography
                variant={isMobile ? 'h5' : 'h4'}
                          sx={{
                                  fontWeight: 600,
                                  color: 'text.primary',
                        textAlign: 'center',
                  mb: 0,
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem', lg: '2.25rem', xl: '2.5rem' },
                  fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                  letterSpacing: { xs: '0.02em', md: '0.04em' },
                  lineHeight: 1.4,
                  px: { xs: 2, sm: 0 },
                }}
              >
                {t('sections.ourBrand')}
                        </Typography>
            </motion.div>
          </Container>
          
          {/* Brand Carousel - Full Width */}
          <Box sx={{ width: '100%', overflow: 'hidden' }}>
            <BrandCarousel />
          </Box>
        </Box>
      </motion.div>

      {/* Our Projects Section */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Box sx={{ pt: { xs: 1, sm: 1.5, md: 2 }, pb: { xs: 4, sm: 5, md: 6, lg: 7 }, backgroundColor: 'background.paper', position: 'relative', overflow: 'hidden' }}>
          <Container maxWidth="xl">
            {/* Our Projects Heading */}
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ 
                duration: 0.8,
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
                  <Typography
                variant={isMobile ? 'h5' : 'h4'}
                    sx={{
                  fontWeight: 600,
                      color: 'text.primary',
                                textAlign: 'center',
                  mb: { xs: 3, sm: 4, md: 5 },
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem', lg: '2.25rem', xl: '2.5rem' },
                  fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                  letterSpacing: { xs: '0.02em', md: '0.04em' },
                  lineHeight: 1.4,
                  px: { xs: 2, sm: 0 },
                }}
              >
                {t('sections.ourProjects')}
                  </Typography>
                </motion.div>

            {/* Projects Gallery - Masonry Layout to Minimize Gaps */}
            <Box
              sx={{
                columnCount: { xs: 1, sm: 2, md: 3 },
                columnGap: { xs: 2, sm: 2.5, md: 3 },
                columnFill: 'balance',
                WebkitColumnCount: { xs: 1, sm: 2, md: 3 },
                WebkitColumnGap: { xs: 2, sm: 2.5, md: 3 },
                WebkitColumnFill: 'balance',
                '& > *': {
                  breakInside: 'avoid',
                  WebkitColumnBreakInside: 'avoid',
                  pageBreakInside: 'avoid',
                  marginBottom: { xs: 2, sm: 2.5, md: 3 },
                  display: 'inline-block',
                  width: '100%',
                  verticalAlign: 'top',
                },
              }}
            >
              {[
                // Optimized order for masonry layout - images arranged to fill gaps efficiently
                { src: '/Projects/Project2.png', alt: t('projects.project2'), key: 'project2' },
                { src: '/Projects/project5.png', alt: t('projects.project5'), key: 'project5' },
                { src: '/Projects/Project3.png', alt: t('projects.project3'), key: 'project3' },
                { src: '/Projects/Project7.png', alt: t('projects.project7'), key: 'project7' },
                { src: '/Projects/Project4.png', alt: t('projects.project4'), key: 'project4' },
                { src: '/Projects/Project6.png', alt: t('projects.project6'), key: 'project6' },
              ].map((project, index) => (
                    <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.08,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  whileHover={{ y: -12, scale: 1.03 }}
                  style={{ width: '100%', display: 'inline-block' }}
                >
                  <Box
                    className="project-card"
                        sx={{
                      position: 'relative',
                      width: '100%',
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
                          transform: 'scale(1.05)',
                        },
                          },
                        }}
                      >
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        overflow: 'hidden',
                        backgroundColor: 'grey.100',
                      }}
                    >
                      <Box
                        component="span"
                            sx={{
                          position: 'relative',
                          display: 'block',
                          width: '100%',
                          zIndex: 0,
                        }}
                      >
                        <Image
                          src={project.src}
                          alt={project.alt}
                          width={1200}
                          height={900}
                          sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                          className="project-image"
                          style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            objectFit: 'contain',
                            transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                          }}
                          loading="lazy"
                        />
                      </Box>
                    </Box>
                            </Box>
                    </motion.div>
                ))}
            </Box>
          </Container>
        </Box>
      </motion.div>

      {/* Contact Us Section */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Box
          sx={{
            py: { xs: 6, md: 8, lg: 10 },
            backgroundColor: 'background.paper',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
                  <Typography
                variant={isMobile ? 'h5' : 'h4'}
                    sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  textAlign: 'center',
                  mb: { xs: 2, md: 1 },
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem', lg: '2.25rem', xl: '2.5rem' },
                  fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                  letterSpacing: { xs: '0.02em', md: '0.04em' },
                  lineHeight: 1.4,
                }}
              >
                {t('contact.title')}
                  </Typography>
                  <Typography
                variant="body1"
                    sx={{
                  textAlign: 'center',
                  color: 'text.secondary',
                  mb: { xs: 4, md: 6 },
                  fontSize: { xs: '0.95rem', md: '1.1rem' },
                      maxWidth: 600,
                      mx: 'auto',
                    }}
                  >
                {t('contact.subtitle')}
                  </Typography>
                </motion.div>

            <Grid container spacing={{ xs: 3, md: 5 }}>
              {/* Contact Information */}
              <Grid size={{ xs: 12, md: 4 }}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Box sx={{ mb: { xs: 4, md: 0 } }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 3,
                        color: 'text.primary',
                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                      }}
                    >
                      {t('contact.headOffice')}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box
                    sx={{
                            backgroundColor: 'primary.main',
                            borderRadius: '50%',
                            p: 1.5,
                      display: 'flex',
                            alignItems: 'center',
                      justifyContent: 'center',
                            minWidth: 48,
                            height: 48,
                          }}
                        >
                          <LocationOn sx={{ color: 'white', fontSize: 24 }} />
                        </Box>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, mb: 0.5, color: 'text.primary' }}
                          >
                            {t('contact.address')}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                            {t('contact.addressLine')}<br />
                            {t('contact.addressLine2')}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Box
                          sx={{
                            backgroundColor: 'primary.main',
                            borderRadius: '50%',
                            p: 1.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: 48,
                            height: 48,
                          }}
                        >
                          <Phone sx={{ color: 'white', fontSize: 24 }} />
                        </Box>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, mb: 0.5, color: 'text.primary' }}
                          >
                            {t('contact.phoneNumbers')}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                            {t('contact.phone1')}<br />
                            {t('contact.phone2')}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Box
                          sx={{
                            backgroundColor: 'primary.main',
                            borderRadius: '50%',
                            p: 1.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: 48,
                            height: 48,
                          }}
                        >
                          <Email sx={{ color: 'white', fontSize: 24 }} />
                        </Box>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, mb: 0.5, color: 'text.primary' }}
                          >
                            {t('contact.email')}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {t('contact.emailValue')}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>

              {/* Contact Form */}
              <Grid size={{ xs: 12, md: 8 }}>
                  <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Paper
                    elevation={3}
                      sx={{
                      p: { xs: 3, sm: 4, md: 5 },
                      borderRadius: 3,
                      backgroundColor: 'background.paper',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    }}
                  >
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            fullWidth
                            label={t('contact.form.name')}
                            name="name"
                            value={formData.name}
                            onChange={handleFormChange}
                            required
                            variant="outlined"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                                '&:hover fieldset': {
                                  borderColor: 'primary.main',
                                },
                              },
                            }}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            fullWidth
                            label={t('contact.form.email')}
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            required
                            variant="outlined"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                '&:hover fieldset': {
                                  borderColor: 'primary.main',
                                },
                              },
                            }}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            fullWidth
                            label={t('contact.form.phone')}
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleFormChange}
                            variant="outlined"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                '&:hover fieldset': {
                                  borderColor: 'primary.main',
                                },
                              },
                            }}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            fullWidth
                            label={t('contact.form.subject')}
                            name="subject"
                            value={formData.subject}
                            onChange={handleFormChange}
                            required
                            variant="outlined"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                '&:hover fieldset': {
                                  borderColor: 'primary.main',
                                },
                              },
                            }}
                          />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <TextField
                            fullWidth
                            label={t('contact.form.message')}
                            name="message"
                            value={formData.message}
                            onChange={handleFormChange}
                            required
                            multiline
                            rows={5}
                            variant="outlined"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                '&:hover fieldset': {
                                  borderColor: 'primary.main',
                                },
                              },
                            }}
                          />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                  <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                  >
                    <Button
                              type="submit"
                              variant="contained"
                      size="large"
                              fullWidth
                              endIcon={<Send />}
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                                fontSize: { xs: '1rem', md: '1.1rem' },
                                fontWeight: 600,
                                textTransform: 'none',
                                boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                        '&:hover': {
                                  boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                        },
                      }}
                    >
                              {t('contact.form.sendMessage')}
                    </Button>
                  </motion.div>
                        </Grid>
                      </Grid>
                    </form>
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </motion.div>
    </Box>
  );
}

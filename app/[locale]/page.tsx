'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
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
import { Link } from '@/i18n/routing';
import { useCountries } from '../../hooks/useApi';
import { getImageUrl } from '../../lib/api';

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  // Fetch countries from API
  const { data: apiCountries } = useCountries();

  // Map API country images to static country keys
  const apiCountryImages = useMemo(() => {
    if (!apiCountries || apiCountries.length === 0) return null;
    const mapping: { [key: string]: string } = {};
    apiCountries.forEach((c) => {
      const name = (c.countrynameen || '').toLowerCase();
      if (c.countryurl) {
        const imgUrl = getImageUrl(c.countryurl);
        if (imgUrl) {
          if (name.includes('china')) mapping['china'] = imgUrl;
          else if (name.includes('kuwait')) mapping['kuwait'] = imgUrl;
          else if (name.includes('uae') || name.includes('emirates') || name.includes('dubai')) mapping['dubai'] = imgUrl;
          else if (name.includes('egypt')) mapping['egypt'] = imgUrl;
        }
      }
    });
    return Object.keys(mapping).length > 0 ? mapping : null;
  }, [apiCountries]);

  // Helper function to make AL-Burhan and country names bold
  const renderBoldText = (text: string) => {
    const alBurhanWords = locale === 'ar' 
      ? ['البرهان']
      : ['AL-Burhan Group', 'AL BURHAN GROUP'];
    const alBurhanSingle = locale === 'ar' 
      ? []
      : ['AL-Burhan'];
    const countryWords = locale === 'ar' 
      ? ['الصين', 'الكويت', 'الإمارات', 'مصر', 'الإمارات العربية المتحدة']
      : ['China', 'Kuwait', 'UAE', 'Egypt'];
    
    let processedText = text;
    
    // First, process complete phrases like "AL-Burhan Group" and "AL BURHAN GROUP"
    // Process longer phrases first to avoid partial matches
    alBurhanWords.sort((a, b) => b.length - a.length);
    alBurhanWords.forEach(word => {
      // Escape special regex characters
      const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Match the complete phrase - check if not already processed
      const regex = new RegExp(`(${escapedWord})`, 'gi');
      processedText = processedText.replace(regex, (match) => {
        // Only process if the match itself doesn't contain *** (not already processed)
        if (!match.includes('***')) {
          return `***${match}***`;
        }
        return match;
      });
    });
    
    // Then, process single "AL-Burhan" only if it's NOT followed by " Group"
    // This ensures we don't match "AL-Burhan" when it's part of "AL-Burhan Group"
    alBurhanSingle.forEach(word => {
      // Escape special regex characters
      const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Match "AL-Burhan" only if NOT followed by " Group" (negative lookahead)
      const regex = new RegExp(`(${escapedWord})(?!\\s+Group)`, 'gi');
      processedText = processedText.replace(regex, (match) => {
        // Only process if the match itself doesn't contain *** (not already processed)
        if (!match.includes('***')) {
          return `***${match}***`;
        }
        return match;
      });
    });
    
    // Process countries with regular bold
    countryWords.forEach(word => {
      const regex = new RegExp(`(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      processedText = processedText.replace(regex, (match) => {
        return `**${match}**`;
      });
    });

    const parts = processedText.split(/(\*\*\*.*?\*\*\*|\*\*.*?\*\*)/);
    
    return (
      <>
        {parts.map((part, index) => {
          if (part.startsWith('***') && part.endsWith('***')) {
            // AL-Burhan - darker and bolder
            const boldText = part.slice(3, -3);
            return (
              <Box
                key={index}
                component="span"
                sx={{ 
                  fontWeight: 900,
                  color: '#000000',
                  letterSpacing: '0.02em'
                }}
              >
                {boldText}
              </Box>
            );
          } else if (part.startsWith('**') && part.endsWith('**')) {
            // Countries - regular bold
            const boldText = part.slice(2, -2);
            return (
              <Box
                key={index}
                component="span"
                sx={{ fontWeight: 700 }}
              >
                {boldText}
              </Box>
            );
          }
          return <React.Fragment key={index}>{part}</React.Fragment>;
        })}
      </>
    );
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
              {/* Main Heading */}
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
                  variant={isMobile ? 'h4' : 'h3'}
                  sx={{
                    fontWeight: 700,
                    color: 'primary.main',
                    textAlign: 'center',
                    mb: 4,
                    fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem', lg: '2.5rem' },
                    fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                    letterSpacing: { xs: '0.02em', md: '0.04em' },
                    lineHeight: 1.4,
                  }}
                >
                  {t('sections.aboutUsTitle')}
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
                          src="/logo/AL BURHAN GROUP .png"
                          alt="AL-Burhan Group Logo"
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
                      {/* Introduction Subheading */}
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
                          variant="h6"
                          sx={{
                            fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.4rem' },
                            color: 'primary.main',
                            lineHeight: 1.8,
                            mb: 2,
                            fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                            fontWeight: 600,
                          }}
                        >
                          {t('sections.introduction')}
                        </Typography>
                      </motion.div>

                      {/* Description Paragraphs with Enhanced Animations */}
                        <motion.div
                        initial={{ opacity: 0, y: 40, x: 30, filter: 'blur(12px)', scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, x: 0, filter: 'blur(0px)', scale: 1 }}
                          viewport={{ once: true }}
                        transition={{ 
                          duration: 1,
                          delay: 0.5,
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
                          component="div"
                        >
                          {renderBoldText(t('introduction.description'))}
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
                          component="div"
                        >
                          {renderBoldText(t('introduction.additionalInfo'))}
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
                          component="div"
                        >
                          {renderBoldText(t('introduction.thirdParagraph'))}
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
                          filter: 'blur(1px) brightness(1)',
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
                          src="/Projects/Project 1.jpg"
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
                      
                      {/* Logo in corner */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: { xs: 12, sm: 16, md: 20 },
                          ...(locale === 'en' ? {
                            left: { xs: 12, sm: 16, md: 20 },
                            right: 'auto',
                          } : {
                            right: { xs: 12, sm: 16, md: 20 },
                            left: 'auto',
                          }),
                          width: { xs: 100, sm: 120, md: 140 },
                          height: { xs: 100, sm: 120, md: 140 },
                          zIndex: 3,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 0.6,
                            delay: 0.8,
                            ease: [0.34, 1.56, 0.64, 1]
                          }}
                          style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                          }}
                        >
                          <Image
                            src="/logo/AL BURHAN GROUP .png"
                            alt="Al Burhan Group Logo"
                            fill
                            style={{
                              objectFit: 'contain',
                            }}
                            sizes="(max-width: 600px) 100px, (max-width: 960px) 120px, 140px"
                          />
                        </motion.div>
                      </Box>
                      
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
                      const countryImage = (apiCountryImages && apiCountryImages[country.key]) || country.image;
                      // Map country keys to route paths
                      const countryRoutes: { [key: string]: string } = {
                        'china': '/china',
                        'kuwait': '/kuwait',
                        'dubai': '/uae',
                        'egypt': '/egypt'
                      };
                      const countryRoute = countryRoutes[country.key] || '/';
                      
                      return (
                      <Grid size={{ xs: 12, sm: 6 }} key={index}>
                        <Link href={countryRoute} style={{ textDecoration: 'none' }}>
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
                                src={countryImage}
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
                        </Link>
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
              <Grid container spacing={{ xs: 3, sm: 3, md: 4, lg: 5 }} alignItems="center" sx={{ mb: { xs: 6, sm: 7, md: 8, lg: 10 } }}>
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
                        background: 'linear-gradient(to bottom, #f8f8f8 0%, #f0f0f0 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                              }}
                            >
                              <Box
                                sx={{
                                  position: 'absolute',
                                  bottom: 0,
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  width: { xs: '55%', sm: '50%', md: '45%' },
                                  height: { xs: '80%', sm: '82%', md: '85%' },
                                  backgroundImage: 'url("/Owners/Owner1.jpeg")',
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  backgroundRepeat: 'no-repeat',
                                  filter: 'brightness(0) saturate(100%) contrast(0%) opacity(0.3)',
                                  mixBlendMode: 'multiply',
                                  zIndex: 1,
                                }}
                              />
                              <Box
                                sx={{
                                  position: 'absolute',
                                  bottom: 0,
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  width: { xs: '55%', sm: '50%', md: '45%' },
                                  height: { xs: '80%', sm: '82%', md: '85%' },
                                  background: 'radial-gradient(ellipse at center bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
                                  zIndex: 2,
                                }}
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
                      
                      {t('owners.founder.quote').split('\n\n').map((paragraph, index) => (
                        <Typography
                          key={index}
                          variant="body1"
                          sx={{
                            fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.15rem', lg: '1.25rem', xl: '1.35rem' },
                            color: 'text.secondary',
                            lineHeight: { xs: 1.75, sm: 1.8, md: 1.8 },
                            fontFamily: 'var(--font-roboto), var(--font-open-sans), sans-serif',
                            fontWeight: 400,
                            fontStyle: 'italic',
                            mb: index < t('owners.founder.quote').split('\n\n').length - 1 ? { xs: 2.5, sm: 3, md: 3 } : 0,
                            position: 'relative',
                            zIndex: 1,
                            textAlign: { xs: 'center', sm: 'center', md: isRTL ? 'right' : 'right' },
                            wordBreak: 'break-word',
                            px: { xs: 1, sm: 2, md: 0 },
                          }}
                        >
                          {renderBoldText(paragraph)}
                        </Typography>
                      ))}
                      {t('owners.founder.quote2') && (
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
                          {renderBoldText(t('owners.founder.quote2'))}
                        </Typography>
                      )}
                    </Box>
                    </Box>
                  </motion.div>
                </Grid>
                </Grid>

              {/* Second Owner - Image Left, Quote Right */}
              <Grid container spacing={{ xs: 3, sm: 3, md: 4, lg: 5 }} alignItems="center" sx={{ mt: { xs: 2, sm: 3, md: 4, lg: 5 } }}>
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
                        src="/Owners/owner_shabbir.jpeg"
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
                      
                              {t('owners.coFounder.quote').split('\n\n').map((paragraph, index) => (
                        <Typography
                          key={index}
                          variant="body1"
                          sx={{
                            fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.15rem', lg: '1.25rem', xl: '1.35rem' },
                            color: 'text.secondary',
                            lineHeight: { xs: 1.75, sm: 1.8, md: 1.8 },
                            fontFamily: 'var(--font-roboto), var(--font-open-sans), sans-serif',
                            fontWeight: 400,
                            fontStyle: 'italic',
                            mb: index < t('owners.coFounder.quote').split('\n\n').length - 1 ? { xs: 2.5, sm: 3, md: 3 } : 0,
                            position: 'relative',
                            zIndex: 1,
                            textAlign: { xs: 'center', sm: 'center', md: 'left' },
                            wordBreak: 'break-word',
                            px: { xs: 1, sm: 2, md: 0 },
                          }}
                        >
                          {renderBoldText(paragraph)}
                        </Typography>
                      ))}
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
          
          {/* Featured Brands - First Line (Bigger Size) */}
          <Container maxWidth="xl">
            <Box sx={{ mb: { xs: 3, md: 4 } }}>
              <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center" sx={{ px: { xs: 2, sm: 3 } }}>
                {[
                  '/Brands/brand6.jpg',
                  '/Brands/brand4.jpg',
                  '/Brands/brand3.png',
                  '/Brands/kosla_page-0001.jpg',
                ].map((brand, index) => (
                  <Grid size={{ xs: 6, sm: 6, md: 3 }} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <Box
                        sx={{
                          position: 'relative',
                          width: '100%',
                          height: {
                            xs: 140,
                            sm: 160,
                            md: 200,
                            lg: 220,
                          },
                          borderRadius: 2,
                          overflow: 'hidden',
                          backgroundColor: 'background.default',
                          p: { xs: 2, sm: 2.5, md: 3 },
                          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          '&:hover': {
                            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                            transform: 'translateY(-4px)',
                          },
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Image
                          src={brand}
                          alt={`Featured Brand ${index + 1}`}
                          fill
                          style={{
                            objectFit: 'contain',
                            padding: index === 1 || index === 2 ? '4px' : '12px',
                            transform: index === 1 || index === 2 ? 'scale(1.3)' : 'scale(1)',
                          }}
                          sizes="(max-width: 600px) 50vw, (max-width: 960px) 50vw, 25vw"
                        />
                      </Box>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
          
          {/* Brand Carousel - Remaining Brands */}
          <Container maxWidth="xl">
            <Box sx={{ mb: { xs: 3, md: 4 }, mt: { xs: 4, md: 5 } }}>
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
                    mb: { xs: 3, md: 4 },
                    fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem', lg: '2.25rem', xl: '2.5rem' },
                    fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                    letterSpacing: { xs: '0.02em', md: '0.04em' },
                    lineHeight: 1.4,
                    px: { xs: 2, sm: 0 },
                  }}
                >
                  {t('sections.europeanBrands')}
                </Typography>
              </motion.div>
            </Box>
          </Container>
          <Box sx={{ width: '100%', overflow: 'hidden' }}>
            <BrandCarousel />
          </Box>
        </Box>
      </motion.div>

      {/* Our Product Section */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Box sx={{ py: { xs: 6, sm: 7, md: 8, lg: 10 }, backgroundColor: 'background.default', position: 'relative' }}>
          <Container maxWidth="xl">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {/* Our Product Heading */}
              <motion.div variants={staggerItem}>
                <Typography
                  variant={isMobile ? 'h4' : 'h3'}
                  sx={{
                    fontWeight: 700,
                    color: 'primary.main',
                    textAlign: 'center',
                    mb: { xs: 4, sm: 5, md: 6 },
                    fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem', lg: '2.5rem', xl: '3rem' },
                    fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                    letterSpacing: { xs: '0.02em', md: '0.04em' },
                    lineHeight: 1.4,
                  }}
                >
                  {t('sections.ourProduct')}
                </Typography>
              </motion.div>

              {/* Service Images Grid */}
              <Grid container spacing={{ xs: 2, sm: 2.5, md: 3, lg: 4 }}>
                {[
                  { 
                    image: '/Our Product/commercial lighting.jpg', 
                    titleKey: 'products.commercialLighting' 
                  },
                  { 
                    image: '/Our Product/smart lighting.jpg', 
                    titleKey: 'products.smartLighting' 
                  },
                  { 
                    image: '/Our Product/residential lighting.jpg', 
                    titleKey: 'products.residentialLighting' 
                  },
                  { 
                    image: '/Our Product/industrial lighting.jpg', 
                    titleKey: 'products.industrialLighting' 
                  },
                ].map((service, index) => (
                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 50, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ 
                        duration: 0.8,
                        delay: index * 0.15,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        type: "spring",
                        stiffness: 100,
                        damping: 15
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
                            xs: 250, 
                            sm: 280, 
                            md: 320,
                            lg: 350,
                            xl: 380 
                          },
                          minHeight: { 
                            xs: 250, 
                            sm: 280, 
                            md: 320,
                            lg: 350,
                            xl: 380 
                          },
                          borderRadius: { xs: 2, sm: 2.5, md: 3 },
                          overflow: 'hidden',
                          boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                          cursor: 'pointer',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            boxShadow: '0 16px 48px rgba(0,0,0,0.25)',
                          },
                        }}
                      >
                        {/* Image */}
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
                            scale: 1.05,
                            filter: 'brightness(1.05)',
                            transition: { duration: 0.4, ease: "easeOut" }
                          }}
                          style={{ width: '100%', height: '100%', position: 'relative' }}
                        >
                          <Image
                            src={service.image}
                            alt={t(service.titleKey)}
                            fill
                            style={{
                              objectFit: 'cover',
                            }}
                            sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, (max-width: 1200px) 50vw, 25vw"
                          />
                        </motion.div>
                        
                        {/* Dark overlay with gradient */}
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
                        
                        {/* Text Overlay with Glassmorphism Effect */}
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            zIndex: 2,
                          }}
                        >
                          {/* Enhanced Gradient Background */}
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 70%, transparent 100%)',
                              backdropFilter: 'blur(8px)',
                              WebkitBackdropFilter: 'blur(8px)',
                            }}
                          />
                          
                          {/* Top Accent Line */}
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: '50%',
                              transform: 'translateX(-50%)',
                              width: { xs: '60px', sm: '80px', md: '100px' },
                              height: '3px',
                              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                              borderRadius: '2px',
                            }}
                          />
                          
                          {/* Content Container */}
                          <Box
                            sx={{
                              position: 'relative',
                              p: { xs: 3, sm: 3.5, md: 4, lg: 4.5 },
                              pt: { xs: 4, sm: 4.5, md: 5, lg: 5.5 },
                              zIndex: 3,
                              overflow: 'visible',
                            }}
                          >
                            <motion.div
                              initial={{ 
                                y: 40, 
                                opacity: 0,
                                scale: 0.95
                              }}
                              whileInView={{ 
                                y: 0, 
                                opacity: 1,
                                scale: 1
                              }}
                              viewport={{ once: true, amount: 0.1 }}
                              transition={{ 
                                duration: 0.9,
                                delay: index * 0.15 + 0.4,
                                ease: [0.25, 0.46, 0.45, 0.94]
                              }}
                              style={{ 
                                display: 'block',
                                width: '100%',
                                position: 'relative',
                                zIndex: 3,
                                overflow: 'visible',
                              }}
                            >
                              <Typography
                                variant={isMobile ? 'h5' : 'h4'}
                                sx={{
                                  fontWeight: 700,
                                  fontSize: { 
                                    xs: '1.1rem', 
                                    sm: '1.25rem', 
                                    md: '1.4rem',
                                    lg: '1.6rem',
                                    xl: '1.8rem' 
                                  },
                                  color: '#ffffff',
                                  textShadow: `
                                    0 2px 4px rgba(0,0,0,0.8),
                                    0 4px 8px rgba(0,0,0,0.6),
                                    0 8px 16px rgba(0,0,0,0.4),
                                    0 0 30px rgba(0,0,0,0.5),
                                    0 0 60px rgba(0,0,0,0.3)
                                  `,
                                  fontFamily: 'var(--font-montserrat), var(--font-poppins), "Roboto", sans-serif',
                                  overflow: 'visible',
                                  whiteSpace: 'normal',
                                  wordBreak: 'normal',
                                  wordWrap: 'break-word',
                                  letterSpacing: { xs: '0.03em', sm: '0.05em', md: '0.08em' },
                                  lineHeight: 1.3,
                                  textTransform: 'uppercase',
                                  display: 'block',
                                  width: '100%',
                                  textAlign: 'center',
                                  mb: { xs: 0.5, sm: 0.75, md: 1 },
                                  position: 'relative',
                                  '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: { xs: '-8px', sm: '-10px', md: '-12px' },
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: { xs: '40px', sm: '50px', md: '60px' },
                                    height: '2px',
                                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                                    borderRadius: '2px',
                                  }
                                }}
                              >
                                {t(service.titleKey)}
                              </Typography>
                            </motion.div>
                          </Box>
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
                ))}
              </Grid>
            </motion.div>
          </Container>
        </Box>
      </motion.div>

    </Box>
  );
}

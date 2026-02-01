'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  useTheme, 
  useMediaQuery,
  Paper,
  Button,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { ArrowBack, LocationOn, Phone, Email } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { fadeInUp } from '../../../utils/animations';
import { Link } from '@/i18n/routing';
import ProjectGallery from '../../../components/ProjectGallery';

export default function EgyptPage() {
  const t = useTranslations();
  const locale = useLocale();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Projects data organized by categories
  const projectCategories = {
    gyms: [
      {
        name: 'Oxygen Gym Jahra',
        folderPath: '/OurProject/Oxygen Gym Jahra',
        images: [
          '/OurProject/Oxygen Gym Jahra/IMG-20251130-WA0005.jpg',
          '/OurProject/Oxygen Gym Jahra/IMG-20251130-WA0008.jpg',
          '/OurProject/Oxygen Gym Jahra/IMG-20251130-WA0011.jpg',
          '/OurProject/Oxygen Gym Jahra/IMG-20251130-WA0012.jpg',
        ],
        firstImage: '/OurProject/Oxygen Gym Jahra/IMG-20251130-WA0005.jpg',
      },
      {
        name: 'Oxygen Gym KSA',
        folderPath: '/OurProject/Oxygen Gym KSA',
        images: [
          '/OurProject/Oxygen Gym KSA/WhatsApp Image 2026-01-02 at 3.38.06 PM.jpeg',
          '/OurProject/Oxygen Gym KSA/WhatsApp Image 2026-01-02 at 3.38.11 PM..jpeg',
          '/OurProject/Oxygen Gym KSA/WhatsApp Image 2026-01-02 at 3.38.11 PM.jpeg',
          '/OurProject/Oxygen Gym KSA/WhatsApp Image 2026-01-02 at 3.38.35 PM..jpeg',
        ],
        firstImage: '/OurProject/Oxygen Gym KSA/WhatsApp Image 2026-01-02 at 3.38.06 PM.jpeg',
      },
      {
        name: 'Oxygen Gym Mahboula',
        folderPath: '/OurProject/Oxygen Gym Mahboula',
        images: [
          '/OurProject/Oxygen Gym Mahboula/WhatsApp Image 2025-12-09 at 8.32.33 PM.jpeg',
          '/OurProject/Oxygen Gym Mahboula/WhatsApp Image 2025-12-09 at 8.33.30 PM.jpeg',
          '/OurProject/Oxygen Gym Mahboula/WhatsApp Image 2026-01-02 at 3.38.27 PM (1).jpeg',
        ],
        firstImage: '/OurProject/Oxygen Gym Mahboula/WhatsApp Image 2025-12-09 at 8.32.33 PM.jpeg',
      },
      {
        name: 'Oxygen Gym UAE',
        folderPath: '/OurProject/Oxygen Gym U.A.E',
        images: [
          '/OurProject/Oxygen Gym U.A.E/WhatsApp Image 2025-12-09 at 8.33.39 PM.jpeg',
          '/OurProject/Oxygen Gym U.A.E/WhatsApp Image 2025-12-09 at 8.33.43 PM.jpeg',
          '/OurProject/Oxygen Gym U.A.E/WhatsApp Image 2025-12-09 at 8.40.01 PM.jpeg',
        ],
        firstImage: '/OurProject/Oxygen Gym U.A.E/WhatsApp Image 2025-12-09 at 8.33.39 PM.jpeg',
      },
      {
        name: 'Peak Gym Qurain',
        folderPath: '/OurProject/Peak Gym Qurain',
        images: [
          '/OurProject/Peak Gym Qurain/WhatsApp Image 2025-12-09 at 8.40.13 PM (1).jpeg',
          '/OurProject/Peak Gym Qurain/WhatsApp Image 2025-12-09 at 8.40.13 PM.jpeg',
          '/OurProject/Peak Gym Qurain/WhatsApp Image 2025-12-09 at 8.40.14 PM (1).jpeg',
        ],
        firstImage: '/OurProject/Peak Gym Qurain/WhatsApp Image 2025-12-09 at 8.40.13 PM (1).jpeg',
      },
      {
        name: 'Plage Gym',
        folderPath: '/OurProject/Plage Gym',
        images: [
          '/OurProject/Plage Gym/WhatsApp Image 2026-01-02 at 3.38.06 PM.jpeg',
          '/OurProject/Plage Gym/WhatsApp Image 2026-01-02 at 3.38.09 PM..jpeg',
        ],
        firstImage: '/OurProject/Plage Gym/WhatsApp Image 2026-01-02 at 3.38.06 PM.jpeg',
      },
    ],
    restaurants: [
      {
        name: 'Nandos Al Kout Mall',
        folderPath: '/OurProject/Nandos Al Kout Mall/Nandos Al Kout Mall',
        images: [
          '/OurProject/Nandos Al Kout Mall/Nandos Al Kout Mall/12.jpg',
          '/OurProject/Nandos Al Kout Mall/Nandos Al Kout Mall/14.jpg',
          '/OurProject/Nandos Al Kout Mall/Nandos Al Kout Mall/5.jpg',
        ],
        firstImage: '/OurProject/Nandos Al Kout Mall/Nandos Al Kout Mall/12.jpg',
      },
      {
        name: 'Wing Stop Al Bida',
        folderPath: '/OurProject/Wing Stop Al Bida/Wing Stop Al Bida',
        images: [
          '/OurProject/Wing Stop Al Bida/Wing Stop Al Bida/WhatsApp Image 2025-08-23 at 11.30.32 AM (1).jpeg',
          '/OurProject/Wing Stop Al Bida/Wing Stop Al Bida/WhatsApp Image 2025-08-23 at 11.30.34 AM.jpeg',
          '/OurProject/Wing Stop Al Bida/Wing Stop Al Bida/WhatsApp Image 2025-08-23 at 11.30.37 AM.jpeg',
          '/OurProject/Wing Stop Al Bida/Wing Stop Al Bida/WhatsApp Image 2025-08-23 at 11.30.41 AM.jpeg',
          '/OurProject/Wing Stop Al Bida/Wing Stop Al Bida/WhatsApp Image 2025-08-23 at 11.30.49 AM.jpeg',
        ],
        firstImage: '/OurProject/Wing Stop Al Bida/Wing Stop Al Bida/WhatsApp Image 2025-08-23 at 11.30.32 AM (1).jpeg',
      },
      {
        name: 'Wing Stop Salmiya',
        folderPath: '/OurProject/Wing Stop Salmiya/Wing Stop Salmiya',
        images: [
          '/OurProject/Wing Stop Salmiya/Wing Stop Salmiya/WhatsApp Image 2025-08-23 at 11.29.56 AM (2).jpeg',
          '/OurProject/Wing Stop Salmiya/Wing Stop Salmiya/WhatsApp Image 2025-08-23 at 11.29.58 AM.jpeg',
          '/OurProject/Wing Stop Salmiya/Wing Stop Salmiya/WhatsApp Image 2025-08-23 at 11.30.03 AM.jpeg',
        ],
        firstImage: '/OurProject/Wing Stop Salmiya/Wing Stop Salmiya/WhatsApp Image 2025-08-23 at 11.29.56 AM (2).jpeg',
      },
      {
        name: 'Paul Le Cafe',
        folderPath: '/OurProject/Paul Le Cafe/Paul Le Cafe',
        images: [
          '/OurProject/Paul Le Cafe/Paul Le Cafe/WhatsApp Image 2025-12-09 at 8.30.21 PM.jpeg',
        ],
        firstImage: '/OurProject/Paul Le Cafe/Paul Le Cafe/WhatsApp Image 2025-12-09 at 8.30.21 PM.jpeg',
      },
      {
        name: 'Wings Stop Liwan',
        folderPath: '/OurProject/Wings Stop Liwan/Wings Stop Liwan',
        images: [
          '/OurProject/Wings Stop Liwan/Wings Stop Liwan/WhatsApp Image 2025-12-09 at 8.33.47 PM.jpeg',
          '/OurProject/Wings Stop Liwan/Wings Stop Liwan/WhatsApp Image 2025-12-09 at 8.33.48 PM (1).jpeg',
          '/OurProject/Wings Stop Liwan/Wings Stop Liwan/WhatsApp Image 2025-12-09 at 8.33.48 PM.jpeg',
          '/OurProject/Wings Stop Liwan/Wings Stop Liwan/WhatsApp Image 2025-12-09 at 8.33.49 PM (1).jpeg',
        ],
        firstImage: '/OurProject/Wings Stop Liwan/Wings Stop Liwan/WhatsApp Image 2025-12-09 at 8.33.47 PM.jpeg',
      },
      {
        name: 'Wings Stop Assima Mall',
        folderPath: '/OurProject/Wings Stop Assima Mall/Wings Stop Assima Mall',
        images: [
          '/OurProject/Wings Stop Assima Mall/Wings Stop Assima Mall/WhatsApp Image 2025-12-09 at 8.33.45 PM (1).jpeg',
          '/OurProject/Wings Stop Assima Mall/Wings Stop Assima Mall/WhatsApp Image 2025-12-09 at 8.33.46 PM.jpeg',
        ],
        firstImage: '/OurProject/Wings Stop Assima Mall/Wings Stop Assima Mall/WhatsApp Image 2025-12-09 at 8.33.45 PM (1).jpeg',
      },
    ],
    showrooms: [
      {
        name: 'Dar Al Saback',
        folderPath: '/OurProject/Dar Al Saback/Dar Al Saback',
        images: [
          '/OurProject/Dar Al Saback/Dar Al Saback/WhatsApp Image 2025-12-09 at 8.30.23 PM (1).jpeg',
          '/OurProject/Dar Al Saback/Dar Al Saback/WhatsApp Image 2025-12-09 at 8.30.23 PM.jpeg',
        ],
        firstImage: '/OurProject/Dar Al Saback/Dar Al Saback/WhatsApp Image 2025-12-09 at 8.30.23 PM (1).jpeg',
      },
      {
        name: 'Beverly Hills',
        folderPath: '/OurProject/Beverly Hills/Beverly Hills',
        images: [
          '/OurProject/Beverly Hills/Beverly Hills/WhatsApp Image 2025-08-22 at 1.49.44 PM.jpeg',
          '/OurProject/Beverly Hills/Beverly Hills/WhatsApp Image 2025-08-22 at 1.49.45 PM (1).jpeg',
          '/OurProject/Beverly Hills/Beverly Hills/WhatsApp Image 2025-08-22 at 1.49.45 PM.jpeg',
        ],
        firstImage: '/OurProject/Beverly Hills/Beverly Hills/WhatsApp Image 2025-08-22 at 1.49.44 PM.jpeg',
      },
      {
        name: 'Audi Showroom',
        folderPath: '/OurProject/Audi Showroom/Audi Showroom',
        images: [
          '/OurProject/Audi Showroom/Audi Showroom/WhatsApp Image 2025-08-23 at 19.37.39_bf3d8686.jpg',
          '/OurProject/Audi Showroom/Audi Showroom/WhatsApp Image 2025-08-26 at 13.10.38_774bc71a.jpg',
        ],
        firstImage: '/OurProject/Audi Showroom/Audi Showroom/WhatsApp Image 2025-08-23 at 19.37.39_bf3d8686.jpg',
      },
      {
        name: 'Inglot',
        folderPath: '/OurProject/Inglot/Inglot',
        images: [
          '/OurProject/Inglot/Inglot/WhatsApp Image 2025-08-22 at 1.40.37 PM.jpeg',
          '/OurProject/Inglot/Inglot/WhatsApp Image 2025-08-22 at 1.40.39 PM.jpeg',
          '/OurProject/Inglot/Inglot/WhatsApp Image 2025-08-22 at 1.40.42 PM.jpeg',
        ],
        firstImage: '/OurProject/Inglot/Inglot/WhatsApp Image 2025-08-22 at 1.40.37 PM.jpeg',
      },
      {
        name: 'Dune London',
        folderPath: '/OurProject/Dune London/Dune London',
        images: [
          '/OurProject/Dune London/Dune London/WhatsApp Image 2025-08-22 at 1.49.46 PM.jpeg',
          '/OurProject/Dune London/Dune London/WhatsApp Image 2025-08-22 at 1.49.47 PM (2).jpeg',
          '/OurProject/Dune London/Dune London/WhatsApp Image 2025-08-22 at 1.49.47 PM.jpeg',
        ],
        firstImage: '/OurProject/Dune London/Dune London/WhatsApp Image 2025-08-22 at 1.49.46 PM.jpeg',
      },
    ],
    banks: [
      {
        name: 'Warba Bank',
        folderPath: '/OurProject/Warba Bank/Warba Bank',
        images: [
          '/OurProject/Warba Bank/Warba Bank/WhatsApp Image 2025-12-09 at 8.30.27 PM.jpeg',
          '/OurProject/Warba Bank/Warba Bank/WhatsApp Image 2025-12-09 at 8.30.28 PM (1).jpeg',
          '/OurProject/Warba Bank/Warba Bank/WhatsApp Image 2025-12-09 at 8.30.28 PM (2).jpeg',
          '/OurProject/Warba Bank/Warba Bank/WhatsApp Image 2025-12-09 at 8.30.28 PM.jpeg',
        ],
        firstImage: '/OurProject/Warba Bank/Warba Bank/WhatsApp Image 2025-12-09 at 8.30.27 PM.jpeg',
      },
      {
        name: 'HSBC',
        folderPath: '/OurProject/HSBC/HSBC',
        images: [
          '/OurProject/HSBC/HSBC/WhatsApp Image 2025-12-09 at 8.30.24 PM (2).jpeg',
          '/OurProject/HSBC/HSBC/WhatsApp Image 2025-12-09 at 8.30.25 PM (1).jpeg',
          '/OurProject/HSBC/HSBC/WhatsApp Image 2025-12-09 at 8.30.25 PM.jpeg',
        ],
        firstImage: '/OurProject/HSBC/HSBC/WhatsApp Image 2025-12-09 at 8.30.24 PM (2).jpeg',
      },
    ],
    offices: [
      {
        name: 'STC Office Assima Tower',
        folderPath: '/OurProject/STC Office Assima Tower/STC Office Assima Tower',
        images: [
          '/OurProject/STC Office Assima Tower/STC Office Assima Tower/WhatsApp Image 2025-09-29 at 14.22.19.jpeg',
          '/OurProject/STC Office Assima Tower/STC Office Assima Tower/WhatsApp Image 2025-09-29 at 14.22.20 (2).jpeg',
          '/OurProject/STC Office Assima Tower/STC Office Assima Tower/WhatsApp Image 2025-09-29 at 14.22.24.jpeg',
          '/OurProject/STC Office Assima Tower/STC Office Assima Tower/WhatsApp Image 2025-09-29 at 14.22.25 (4).jpeg',
        ],
        firstImage: '/OurProject/STC Office Assima Tower/STC Office Assima Tower/WhatsApp Image 2025-09-29 at 14.22.19.jpeg',
      },
      {
        name: 'Zain Al Rai',
        folderPath: '/OurProject/Zain Al Rai/Zain Al Rai',
        images: [
          '/OurProject/Zain Al Rai/Zain Al Rai/WhatsApp Image 2025-08-22 at 2.26.16 PM (2).jpeg',
          '/OurProject/Zain Al Rai/Zain Al Rai/WhatsApp Image 2025-08-22 at 2.26.18 PM (1).jpeg',
          '/OurProject/Zain Al Rai/Zain Al Rai/WhatsApp Image 2025-08-22 at 2.26.19 PM (1).jpeg',
          '/OurProject/Zain Al Rai/Zain Al Rai/WhatsApp Image 2025-08-22 at 2.26.21 PM (1).jpeg',
          '/OurProject/Zain Al Rai/Zain Al Rai/WhatsApp Image 2025-08-22 at 2.26.21 PM.jpeg',
        ],
        firstImage: '/OurProject/Zain Al Rai/Zain Al Rai/WhatsApp Image 2025-08-22 at 2.26.16 PM (2).jpeg',
      },
    ],
  };

  return (
    <Box sx={{ flex: 1, minHeight: '100vh' }}>
      {/* Hero Image Section */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        viewport={{ once: true }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: '40vh', sm: '48vh', md: '56vh', lg: '64vh' },
            minHeight: { xs: 240, sm: 320, md: 400, lg: 480 },
            overflow: 'hidden',
          }}
        >
          {/* Country Image */}
          <Image
            src="/Company Countries/egypt city.jpg"
            alt="Egypt"
            fill
            style={{
              objectFit: 'cover',
            }}
            priority
          />
          
          {/* Logo in corner */}
          <Box
            sx={{
              position: 'absolute',
              top: { xs: 16, sm: 20, md: 24 },
              right: { xs: 16, sm: 20, md: 24 },
              width: { xs: 60, sm: 70, md: 80 },
              height: { xs: 60, sm: 70, md: 80 },
              zIndex: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.6,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
              }}
            >
              <Image
                src="/logo/AL BURHAN EGYPT.png"
                alt="Al Burhan Egypt Logo"
                fill
                style={{
                  objectFit: 'contain',
                }}
                sizes="(max-width: 600px) 60px, (max-width: 960px) 70px, 80px"
              />
            </motion.div>
          </Box>

          {/* Enhanced Overlay gradient for better text readability */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '60%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 70%, transparent 100%)',
            }}
          />

          {/* Company Name Overlay - Beautiful and Professional */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 4,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              pb: { xs: 4, sm: 5, md: 6, lg: 8 },
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: { xs: '90%', sm: '80%', md: '70%' },
                textAlign: 'center',
                mx: 'auto',
              }}
            >
              <motion.div
                initial={{ 
                  opacity: 0, 
                  y: 50,
                  scale: 0.95
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: 1
                }}
                transition={{ 
                  duration: 1,
                  delay: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
              <Box
                sx={{
                  position: 'relative',
                  display: 'inline-block',
                  textAlign: 'center',
                }}
              >
                {/* Company Name with Animation */}
                <motion.div
                  initial={{ 
                    opacity: 0, 
                    y: 30,
                    scale: 0.9,
                    filter: 'blur(8px)'
                  }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)'
                  }}
                  transition={{ 
                    duration: 1.2,
                    delay: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <Typography
                    variant={isMobile ? 'h3' : 'h2'}
                    sx={{
                      position: 'relative',
                      fontWeight: 800,
                      fontSize: { 
                        xs: '1.75rem', 
                        sm: '2.25rem', 
                        md: '3rem',
                        lg: '3.5rem',
                        xl: '4rem' 
                      },
                      color: '#ffffff',
                      fontFamily: 'var(--font-montserrat), var(--font-poppins), "Roboto", sans-serif',
                      letterSpacing: { xs: '0.05em', sm: '0.08em', md: '0.1em' },
                      lineHeight: 1.2,
                      textTransform: 'uppercase',
                      mb: { xs: 0.75, sm: 1, md: 1.25 },
                    }}
                  >
                    {t('aboutUs.egypt.firmName')}
                  </Typography>
                </motion.div>
                
                {/* Country Name with Animation */}
                <motion.div
                  initial={{ 
                    opacity: 0, 
                    y: 20,
                    scale: 0.95,
                    filter: 'blur(6px)'
                  }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)'
                  }}
                  transition={{ 
                    duration: 1,
                    delay: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { 
                        xs: '1.5rem', 
                        sm: '1.75rem', 
                        md: '2rem',
                        lg: '2.25rem',
                        xl: '2.5rem'
                      },
                      color: '#ffffff',
                      fontWeight: 700,
                      fontFamily: 'var(--font-montserrat), var(--font-poppins), "Roboto", sans-serif',
                      letterSpacing: { xs: '0.05em', sm: '0.08em', md: '0.1em' },
                      textTransform: 'uppercase',
                      textShadow: '0 2px 8px rgba(0,0,0,0.5), 0 0 20px rgba(0,0,0,0.3)',
                    }}
                  >
                    {t('aboutUs.egypt.countryName')}
                  </Typography>
                </motion.div>
              </Box>
              </motion.div>
            </Box>
          </Box>
        </Box>
      </motion.div>

      {/* Content Section */}
      <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: 'background.paper' }}>
        <Container maxWidth="lg">
          {/* Back to Home Button - Moved here */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', sm: 'flex-start' },
              mb: 4,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/" style={{ textDecoration: 'none' }}>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBack />}
                  sx={{
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    px: { xs: 2, sm: 2.5, md: 3 },
                    py: 0.75,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: { xs: '0.875rem', sm: '0.9375rem', md: '1rem' },
                    '&:hover': {
                      borderColor: 'primary.dark',
                      backgroundColor: 'primary.main',
                      color: '#ffffff',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Back to Home
                </Button>
              </Link>
            </motion.div>
          </Box>
          
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.1rem' },
              color: 'text.secondary',
              lineHeight: 1.8,
              textAlign: 'center',
              maxWidth: 800,
              mx: 'auto',
              mb: 6,
            }}
          >
            {t('aboutUs.egypt.countryName')}
          </Typography>
        </Container>
      </Box>

      {/* Our Projects Section */}
      <motion.div
        id="projects"
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

            {/* Gyms Section */}
            <Box sx={{ mb: { xs: 5, sm: 6, md: 7 } }}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Typography
                  variant={isMobile ? 'h6' : 'h5'}
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: { xs: 3, sm: 4 },
                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                    fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                    letterSpacing: { xs: '0.02em', md: '0.04em' },
                  }}
                >
                  Gyms
                </Typography>
              </motion.div>
              <ProjectGallery projects={projectCategories.gyms} />
            </Box>

            {/* Restaurants Section */}
            <Box sx={{ mb: { xs: 5, sm: 6, md: 7 } }}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Typography
                  variant={isMobile ? 'h6' : 'h5'}
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: { xs: 3, sm: 4 },
                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                    fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                    letterSpacing: { xs: '0.02em', md: '0.04em' },
                  }}
                >
                  Restaurants
                </Typography>
              </motion.div>
              <ProjectGallery projects={projectCategories.restaurants} />
            </Box>

            {/* Showrooms Section */}
            <Box sx={{ mb: { xs: 5, sm: 6, md: 7 } }}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Typography
                  variant={isMobile ? 'h6' : 'h5'}
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: { xs: 3, sm: 4 },
                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                    fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                    letterSpacing: { xs: '0.02em', md: '0.04em' },
                  }}
                >
                  Showrooms
                </Typography>
              </motion.div>
              <ProjectGallery projects={projectCategories.showrooms} />
            </Box>

            {/* Banks Section */}
            <Box sx={{ mb: { xs: 5, sm: 6, md: 7 } }}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Typography
                  variant={isMobile ? 'h6' : 'h5'}
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: { xs: 3, sm: 4 },
                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                    fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                    letterSpacing: { xs: '0.02em', md: '0.04em' },
                  }}
                >
                  Banks
                </Typography>
              </motion.div>
              <ProjectGallery projects={projectCategories.banks} />
            </Box>

            {/* Offices Section */}
            <Box sx={{ mb: { xs: 5, sm: 6, md: 7 } }}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Typography
                  variant={isMobile ? 'h6' : 'h5'}
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: { xs: 3, sm: 4 },
                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                    fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                    letterSpacing: { xs: '0.02em', md: '0.04em' },
                  }}
                >
                  Offices
                </Typography>
              </motion.div>
              <ProjectGallery projects={projectCategories.offices} />
            </Box>
          </Container>
        </Box>
      </motion.div>

      {/* Showrooms Section */}
      <Box sx={{ py: { xs: 6, md: 8, lg: 10 }, backgroundColor: 'background.paper' }}>
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
                mb: { xs: 3, md: 4 },
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem', lg: '2.25rem', xl: '2.5rem' },
                fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                letterSpacing: { xs: '0.02em', md: '0.04em' },
                lineHeight: 1.4,
              }}
            >
              {t('contact.ourLocation')}
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <Box
              sx={{
                p: { xs: 3, sm: 4, md: 5 },
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                backgroundColor: 'background.paper',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  mb: 3,
                  fontSize: { xs: '1.25rem', sm: '1.375rem', md: '1.5rem' },
                  fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                }}
              >
                {t('countryContact.egypt.companyName')}
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <LocationOn
                    sx={{
                      color: 'primary.main',
                      fontSize: { xs: 22, sm: 24 },
                      mt: 0.5,
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.primary',
                      lineHeight: 1.7,
                      fontSize: { xs: '1rem', sm: '1.0625rem', md: '1.125rem' },
                      fontWeight: 400,
                      fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                    }}
                  >
                    {t('countryContact.egypt.address')}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Phone
                    sx={{
                      color: 'primary.main',
                      fontSize: { xs: 20, sm: 22 },
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.primary',
                      fontWeight: 500,
                      fontSize: { xs: '1rem', sm: '1.0625rem', md: '1.125rem' },
                      fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                    }}
                  >
                    {t('countryContact.egypt.phone')}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Email
                    sx={{
                      color: 'primary.main',
                      fontSize: { xs: 20, sm: 22 },
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.primary',
                      fontWeight: 500,
                      fontSize: { xs: '1rem', sm: '1.0625rem', md: '1.125rem' },
                      fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                    }}
                  >
                    {t('countryContact.egypt.email')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Coming Soon Section */}
      <Box sx={{ py: { xs: 8, md: 12, lg: 16 }, backgroundColor: 'background.paper' }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: { xs: 4, sm: 6, md: 8 },
                borderRadius: 4,
                backgroundColor: 'background.paper',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                minHeight: { xs: 300, md: 400 },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: 'primary.main',
                  mb: 2,
                  fontSize: { xs: '2rem', md: '2.5rem', lg: '3.5rem' },
                }}
              >
                Coming Soon
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  maxWidth: 500,
                }}
              >
                We're working hard to bring you exciting content and information about our operations in Egypt. Stay tuned!
              </Typography>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}
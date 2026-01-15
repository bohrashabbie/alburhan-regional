'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  useTheme, 
  useMediaQuery,
  Grid,
  Paper,
  TextField,
  Button,
  Divider,
  Card,
  CardContent
} from '@mui/material';
import { LocationOn, Phone, Email, ArrowBack, Send } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { fadeInUp } from '../../../utils/animations';
import { Link } from '@/i18n/routing';
import ProjectGallery from '../../../components/ProjectGallery';

export default function KuwaitPage() {
  const t = useTranslations();
  const locale = useLocale();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  const branches = [
    { key: 'branch1', num: '1' },
    { key: 'branch2', num: '2' },
    { key: 'branch3', num: '3' },
    { key: 'branch4', num: '4' },
  ];

  // Projects data from OurProject folder
  const projects = [
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
      name: 'Dar Al Saback',
      folderPath: '/OurProject/Dar Al Saback/Dar Al Saback',
      images: [
        '/OurProject/Dar Al Saback/Dar Al Saback/WhatsApp Image 2025-12-09 at 8.30.23 PM (1).jpeg',
        '/OurProject/Dar Al Saback/Dar Al Saback/WhatsApp Image 2025-12-09 at 8.30.23 PM.jpeg',
      ],
      firstImage: '/OurProject/Dar Al Saback/Dar Al Saback/WhatsApp Image 2025-12-09 at 8.30.23 PM (1).jpeg',
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
      name: 'Paul Le Cafe',
      folderPath: '/OurProject/Paul Le Cafe/Paul Le Cafe',
      images: [
        '/OurProject/Paul Le Cafe/Paul Le Cafe/WhatsApp Image 2025-12-09 at 8.30.21 PM.jpeg',
      ],
      firstImage: '/OurProject/Paul Le Cafe/Paul Le Cafe/WhatsApp Image 2025-12-09 at 8.30.21 PM.jpeg',
    },
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
      name: 'Wings Stop Assima Mall',
      folderPath: '/OurProject/Wings Stop Assima Mall/Wings Stop Assima Mall',
      images: [
        '/OurProject/Wings Stop Assima Mall/Wings Stop Assima Mall/WhatsApp Image 2025-12-09 at 8.33.45 PM (1).jpeg',
        '/OurProject/Wings Stop Assima Mall/Wings Stop Assima Mall/WhatsApp Image 2025-12-09 at 8.33.46 PM.jpeg',
      ],
      firstImage: '/OurProject/Wings Stop Assima Mall/Wings Stop Assima Mall/WhatsApp Image 2025-12-09 at 8.33.45 PM (1).jpeg',
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
  ];

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
            src="/Countries/kuwait.png"
            alt="Kuwait"
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
                src="/logo/AL BURHAN GROUP .png"
                alt="Al Burhan Group Logo"
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
                    {t('aboutUs.kuwait.firmName')}
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
                        xs: '0.875rem', 
                        sm: '1rem', 
                        md: '1.125rem',
                        lg: '1.25rem'
                      },
                      color: '#ffffff',
                      fontWeight: 500,
                      fontFamily: 'var(--font-montserrat), var(--font-poppins), "Roboto", sans-serif',
                      letterSpacing: { xs: '0.03em', sm: '0.05em', md: '0.08em' },
                      textTransform: 'uppercase',
                    }}
                  >
                    {t('aboutUs.kuwait.countryName')}
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
            {t('aboutUs.kuwait.countryName')}
          </Typography>
        </Container>
      </Box>

      {/* Company Description Section */}
      <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.125rem', lg: '1.25rem' },
                color: 'text.secondary',
                lineHeight: 1.9,
                textAlign: 'center',
                maxWidth: 900,
                mx: 'auto',
                px: { xs: 2, md: 0 },
              }}
            >
              {t('aboutUs.kuwait.description')}
            </Typography>
          </motion.div>
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

            {/* Projects Gallery Component */}
            <ProjectGallery projects={projects} />
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
              {t('contact.ourLocations')}
            </Typography>
          </motion.div>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 4, md: 5 } }}>
            {branches.map((branch, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={branch.key}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <Card
                    sx={{
                      borderRadius: 3,
                      overflow: 'hidden',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                        '& .showroom-image': {
                          transform: 'scale(1.05)',
                        },
                      },
                    }}
                  >
                    <Grid container spacing={0}>
                      {/* Details Section */}
                      <Grid
                        size={{ xs: 12, md: 12 }}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Box
                          sx={{
                            p: { xs: 2.5, sm: 3.5, md: 4, lg: 5 },
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                          }}
                        >
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 700,
                              color: 'text.primary',
                              mb: { xs: 1.5, sm: 2 },
                              fontSize: { xs: '1.125rem', sm: '1.375rem', md: '1.5rem', lg: '1.75rem' },
                              fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                            }}
                          >
                            {t(`countryContact.kuwait.${branch.key}.name`)}
                          </Typography>
                          <Box 
                            sx={{ 
                              display: 'flex', 
                              alignItems: 'flex-start', 
                              gap: { xs: 1.5, sm: 2 }, 
                              mb: { xs: 2, sm: 2.5 },
                              p: { xs: 2, sm: 2.5 },
                              backgroundColor: 'primary.50',
                              borderRadius: 2,
                              borderLeft: '4px solid',
                              borderColor: 'primary.main',
                            }}
                          >
                            <LocationOn
                              sx={{
                                color: 'primary.main',
                                fontSize: { xs: 24, sm: 28, md: 32 },
                                mt: 0.5,
                                flexShrink: 0,
                              }}
                            />
                            <Typography
                              variant="body1"
                              sx={{
                                color: 'text.primary',
                                lineHeight: 1.8,
                                fontSize: { xs: '0.9375rem', sm: '1rem', md: '1.1rem' },
                                fontWeight: 500,
                              }}
                            >
                              {t(`countryContact.kuwait.${branch.key}.address`)}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
                            <Phone
                              sx={{
                                color: 'primary.main',
                                fontSize: { xs: 18, sm: 20, md: 22 },
                                flexShrink: 0,
                              }}
                            />
                            <Typography
                              variant="body1"
                              sx={{
                                color: 'text.secondary',
                                fontWeight: 500,
                                fontSize: { xs: '0.875rem', sm: '0.9375rem', md: '1rem' },
                              }}
                            >
                              {t(`countryContact.kuwait.${branch.key}.phone`)}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Card>
                </motion.div>
              );
            })}
          </Box>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box sx={{ py: { xs: 6, md: 8, lg: 10 }, backgroundColor: 'background.default' }}>
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
            {/* Contact Information - Branches */}
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
                    {branches.map((branch, index) => (
                      <Box key={branch.key}>
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
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 600, mb: 0.5, color: 'text.primary' }}
                            >
                              {t(`countryContact.kuwait.${branch.key}.name`)}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                              {t('contact.phoneNumbers')}: {t(`countryContact.kuwait.${branch.key}.phone`)}
                            </Typography>
                          </Box>
                        </Box>
                        {index < branches.length - 1 && <Divider sx={{ mt: 2 }} />}
                      </Box>
                    ))}
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
    </Box>
  );
}
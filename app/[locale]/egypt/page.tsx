'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  useTheme, 
  useMediaQuery,
  Paper,
  Button
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { fadeInUp } from '../../../utils/animations';
import { Link } from '@/i18n/routing';

export default function EgyptPage() {
  const t = useTranslations();
  const locale = useLocale();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
                src="/logo/Al burhan group logo.png"
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
                      color: 'primary.main',
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
                        xs: '0.875rem', 
                        sm: '1rem', 
                        md: '1.125rem',
                        lg: '1.25rem'
                      },
                      color: 'primary.main',
                      fontWeight: 500,
                      fontFamily: 'var(--font-montserrat), var(--font-poppins), "Roboto", sans-serif',
                      letterSpacing: { xs: '0.03em', sm: '0.05em', md: '0.08em' },
                      textTransform: 'uppercase',
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

      {/* Coming Soon Section */}
      <Box sx={{ py: { xs: 8, md: 12, lg: 16 }, backgroundColor: 'background.default' }}>
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
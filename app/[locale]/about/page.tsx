'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function About() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const t = useTranslations();

  const services = [
    {
      image: '/Our Service/supply.png',
      title: 'Supply',
      description: 'We provide high-quality products and materials to meet your project needs.',
    },
    {
      image: '/Our Service/design.png',
      title: 'Design',
      description: 'Expert design services to create innovative and functional solutions.',
    },
    {
      image: '/Our Service/installation.png',
      title: 'Installation',
      description: 'Professional installation services ensuring quality and precision.',
    },
  ];

  return (
    <Box sx={{ flex: 1, minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${(theme.palette.primary as any)[50]} 0%, ${(theme.palette.secondary as any)[50]} 100%)`,
          py: { xs: 6, md: 10 },
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant={isMobile ? 'h3' : 'h2'}
              component="h1"
              sx={{
                fontWeight: 'bold',
                color: 'text.primary',
                mb: 3,
              }}
            >
              {t('aboutPage.title')}
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                maxWidth: 1000,
                mx: 'auto',
                lineHeight: 1.8,
                mb: 3,
              }}
            >
              {t('aboutPage.description')}
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                maxWidth: 1000,
                mx: 'auto',
                lineHeight: 1.8,
                fontWeight: 500,
              }}
            >
              {t('aboutPage.additionalInfo')}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Services Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: 'background.paper' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 'bold',
                color: 'text.primary',
                mb: 2,
              }}
            >
              Our Services
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              We offer a comprehensive range of technology services to help
              your business grow and succeed.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      boxShadow: theme.shadows[8],
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3, overflow: 'visible' }}>
                    <Box
                      sx={{
                        mb: 3,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: { xs: 150, sm: 180, md: 200 },
                        overflow: 'visible',
                      }}
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={200}
                        height={200}
                        style={{
                          objectFit: 'contain',
                          maxWidth: '100%',
                          height: 'auto',
                        }}
                      />
                    </Box>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        mb: 2,
                        overflow: 'visible',
                        whiteSpace: 'normal',
                        wordBreak: 'normal',
                        wordWrap: 'break-word',
                        fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
                        textAlign: 'center',
                        lineHeight: 1.3,
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{
                        overflow: 'visible',
                        wordWrap: 'break-word',
                        whiteSpace: 'normal',
                      }}
                    >
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

    </Box>
  );
}


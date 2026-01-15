'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { fadeInUp, staggerContainer, staggerItem } from '../../../utils/animations';
import Image from 'next/image';

export default function ContactPage() {
  const t = useTranslations();
  const locale = useLocale();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isRTL = locale === 'ar';

  const countries = [
    {
      key: 'kuwait',
      name: t('contactPage.kuwait'),
      route: '/kuwait',
      flagCode: 'KW',
      flagUrl: 'https://flagcdn.com/w320/kw.png',
    },
    {
      key: 'egypt',
      name: t('contactPage.egypt'),
      route: '/egypt',
      flagCode: 'EG',
      flagUrl: 'https://flagcdn.com/w320/eg.png',
    },
    {
      key: 'china',
      name: t('contactPage.china'),
      route: '/china',
      flagCode: 'CN',
      flagUrl: 'https://flagcdn.com/w320/cn.png',
    },
    {
      key: 'uae',
      name: t('contactPage.uae'),
      route: '/uae',
      flagCode: 'AE',
      flagUrl: 'https://flagcdn.com/w320/ae.png',
    },
  ];

  return (
    <Box sx={{ flex: 1, minHeight: '100vh', py: { xs: 4, md: 6, lg: 8 } }}>
      <Container maxWidth="lg">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          {/* Page Header */}
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
            <Typography
              variant={isMobile ? 'h4' : 'h3'}
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                mb: 2,
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem', lg: '3rem' },
                fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                letterSpacing: { xs: '0.02em', md: '0.04em' },
              }}
            >
              {t('contactPage.title')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '1rem', md: '1.125rem' },
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.8,
              }}
            >
              {t('contactPage.subtitle')}
            </Typography>
          </Box>

          {/* Country Selection Cards */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <Grid container spacing={{ xs: 3, md: 4 }}>
              {countries.map((country, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={country.key}>
                  <motion.div
                    variants={staggerItem}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        borderRadius: 3,
                        overflow: 'hidden',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        '&:hover': {
                          boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                          transform: 'translateY(-4px)',
                          '& .flag-image': {
                            transform: 'scale(1.1)',
                          },
                          '& .country-name': {
                            color: 'primary.main',
                          },
                        },
                      }}
                    >
                      <CardActionArea
                        component={Link}
                        href={country.route}
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          p: { xs: 3, md: 4 },
                          textAlign: 'center',
                        }}
                      >
                        <CardContent sx={{ p: 0, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          {/* Flag Image */}
                          <Box
                            sx={{
                              position: 'relative',
                              width: { xs: 120, sm: 140, md: 160 },
                              height: { xs: 80, sm: 93, md: 107 },
                              mb: 3,
                              borderRadius: 2,
                              overflow: 'hidden',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                              backgroundColor: 'grey.100',
                            }}
                          >
                            <Image
                              src={country.flagUrl}
                              alt={`${country.name} flag`}
                              fill
                              className="flag-image"
                              style={{
                                objectFit: 'cover',
                                transition: 'transform 0.3s ease',
                              }}
                              sizes="(max-width: 600px) 120px, (max-width: 960px) 140px, 160px"
                            />
                          </Box>

                          {/* Country Name */}
                          <Typography
                            variant="h5"
                            className="country-name"
                            sx={{
                              fontWeight: 600,
                              color: 'text.primary',
                              mb: 1,
                              fontSize: { xs: '1.25rem', md: '1.5rem' },
                              fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                              transition: 'color 0.3s ease',
                            }}
                          >
                            {country.name}
                          </Typography>

                          {/* View Details Text */}
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'text.secondary',
                              fontSize: { xs: '0.875rem', md: '0.9375rem' },
                              mt: 1,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                            }}
                          >
                            {t('contactPage.viewDetails')}
                            <Box
                              component="span"
                              sx={{
                                display: 'inline-block',
                                transform: isRTL ? 'rotate(180deg)' : 'none',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                  transform: isRTL ? 'translateX(-4px) rotate(180deg)' : 'translateX(4px)',
                                },
                              }}
                            >
                              →
                            </Box>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>

          {/* Help Text */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.4 }}
          >
            <Box
              sx={{
                textAlign: 'center',
                mt: { xs: 5, md: 6 },
                p: { xs: 3, md: 4 },
                backgroundColor: 'primary.50',
                borderRadius: 3,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '0.9375rem', md: '1rem' },
                  lineHeight: 1.8,
                }}
              >
                {t('contactPage.selectCountry')}
              </Typography>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
}


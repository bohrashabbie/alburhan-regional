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
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  CheckCircle,
  DesignServices,
  Inventory,
  Build,
  Support,
  Business,
  Home,
  Store,
  Factory,
  Apartment,
  AccountBalance,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '../../../utils/animations';
import { useTranslations, useLocale } from 'next-intl';
import { AE, CN, EG, KW } from 'country-flag-icons/react/3x2';
import Image from 'next/image';

export default function About() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const t = useTranslations('aboutPage');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const sectorIcons = [
    <AccountBalance key="gov" />,
    <Business key="private" />,
    <Business key="commercial" />,
    <Store key="retail" />,
    <Home key="residential" />,
    <Factory key="industrial" />,
  ];

  // Helper function to get items from numbered keys
  const getItems = (baseKey: string, count: number): string[] => {
    return Array.from({ length: count }, (_, i) => t(`${baseKey}.item${i + 1}`));
  };

  return (
    <Box sx={{ flex: 1, minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${(theme.palette.primary as any)[50]} 0%, ${(theme.palette.secondary as any)[50]} 100%)`,
          py: { xs: 6, md: 8 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            pointerEvents: 'none',
          }}
        />
        <Container maxWidth="xl">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <Typography
              variant={isMobile ? 'h4' : 'h3'}
              component="h1"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                mb: 3,
                textAlign: 'center',
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem', lg: '3rem' },
                fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
              }}
            >
              {t('title')}
            </Typography>
            <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.9,
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.15rem' },
                  color: 'text.secondary',
                  textAlign: 'center',
                  mb: 4,
                }}
              >
                {t('mainDescription')}
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.9,
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.15rem' },
                  color: 'text.secondary',
                  textAlign: 'center',
                  mb: 4,
                }}
              >
                {t('journey')}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: { xs: 2, sm: 3 },
                  mb: 4,
                  flexWrap: 'wrap',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: { xs: 1.5, md: 2 },
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                    boxShadow: theme.shadows[2],
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: theme.shadows[4],
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 32, md: 40 },
                      height: { xs: 24, md: 30 },
                      mr: 1.5,
                      borderRadius: 1,
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    <AE style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: '0.95rem', md: '1.05rem' },
                      color: 'text.secondary',
                      fontWeight: 500,
                    }}
                  >
                    {t('branches.dubai')}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: { xs: 1.5, md: 2 },
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                    boxShadow: theme.shadows[2],
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: theme.shadows[4],
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 32, md: 40 },
                      height: { xs: 24, md: 30 },
                      mr: 1.5,
                      borderRadius: 1,
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    <CN style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: '0.95rem', md: '1.05rem' },
                      color: 'text.secondary',
                      fontWeight: 500,
                    }}
                  >
                    {t('branches.china')}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: { xs: 1.5, md: 2 },
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                    boxShadow: theme.shadows[2],
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: theme.shadows[4],
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 32, md: 40 },
                      height: { xs: 24, md: 30 },
                      mr: 1.5,
                      borderRadius: 1,
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    <EG style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: '0.95rem', md: '1.05rem' },
                      color: 'text.secondary',
                      fontWeight: 500,
                    }}
                  >
                    {t('branches.egypt')}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: { xs: 1.5, md: 2 },
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                    boxShadow: theme.shadows[2],
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: theme.shadows[4],
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 32, md: 40 },
                      height: { xs: 24, md: 30 },
                      mr: 1.5,
                      borderRadius: 1,
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    <KW style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: '0.95rem', md: '1.05rem' },
                      color: 'text.secondary',
                      fontWeight: 500,
                    }}
                  >
                    {t('branches.kuwait')}
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.9,
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.15rem' },
                  color: 'text.secondary',
                  textAlign: 'center',
                }}
              >
                {t('expansion')}
              </Typography>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* What We Offer Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: 'background.default' }}>
        <Container maxWidth="xl">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  color: 'text.primary',
                  mb: 2,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                }}
              >
                {t('whatWeOffer.title')}
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  maxWidth: 800,
                  mx: 'auto',
                  fontSize: { xs: '1rem', md: '1.1rem' },
                }}
              >
                {t('whatWeOffer.description')}
              </Typography>
            </Box>

            <Grid container spacing={{ xs: 3, md: 3 }}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      boxShadow: theme.shadows[8],
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: { xs: 200, sm: 220, md: 200 },
                      overflow: 'hidden',
                      backgroundColor: 'primary.50',
                      '& img': {
                        transition: 'transform 0.3s ease-in-out',
                      },
                      '&:hover img': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <Image
                      src="/Our Service/designing.png"
                      alt={t('whatWeOffer.lightingDesign.title')}
                      fill
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                  <CardContent sx={{ p: { xs: 2, md: 2.5 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        mb: 2,
                        lineHeight: 1.3,
                      }}
                    >
                      {t('whatWeOffer.lightingDesign.title')}
                    </Typography>
                    <List sx={{ flexGrow: 1, py: 0 }}>
                      {getItems('whatWeOffer.lightingDesign', 3).map((item: string, index: number) => (
                        <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 28 }}>
                            <CheckCircle sx={{ color: 'primary.main', fontSize: { xs: '1rem', md: '1.1rem' } }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={item}
                            primaryTypographyProps={{
                              sx: {
                                fontSize: { xs: '0.85rem', md: '0.9rem' },
                                color: 'text.secondary',
                                lineHeight: 1.4,
                              },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      boxShadow: theme.shadows[8],
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: { xs: 200, sm: 220, md: 200 },
                      overflow: 'hidden',
                      backgroundColor: 'primary.50',
                      '& img': {
                        transition: 'transform 0.3s ease-in-out',
                      },
                      '&:hover img': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <Image
                      src="/Our Service/supply.png"
                      alt={t('whatWeOffer.lightingSupply.title')}
                      fill
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                  <CardContent sx={{ p: { xs: 2, md: 2.5 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        mb: 2,
                        lineHeight: 1.3,
                      }}
                    >
                      {t('whatWeOffer.lightingSupply.title')}
                    </Typography>
                    <List sx={{ flexGrow: 1, py: 0 }}>
                      {getItems('whatWeOffer.lightingSupply', 3).map((item: string, index: number) => (
                        <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 28 }}>
                            <CheckCircle sx={{ color: 'primary.main', fontSize: { xs: '1rem', md: '1.1rem' } }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={item}
                            primaryTypographyProps={{
                              sx: {
                                fontSize: { xs: '0.85rem', md: '0.9rem' },
                                color: 'text.secondary',
                                lineHeight: 1.4,
                              },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      boxShadow: theme.shadows[8],
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: { xs: 200, sm: 220, md: 200 },
                      overflow: 'hidden',
                      backgroundColor: 'primary.50',
                      '& img': {
                        transition: 'transform 0.3s ease-in-out',
                      },
                      '&:hover img': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <Image
                      src="/Our Service/installation.png"
                      alt={t('whatWeOffer.supplyInstall.title')}
                      fill
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                  <CardContent sx={{ p: { xs: 2, md: 2.5 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        mb: 2,
                        lineHeight: 1.3,
                      }}
                    >
                      {t('whatWeOffer.supplyInstall.title')}
                    </Typography>
                    <List sx={{ flexGrow: 1, py: 0 }}>
                      {getItems('whatWeOffer.supplyInstall', 3).map((item: string, index: number) => (
                        <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 28 }}>
                            <CheckCircle sx={{ color: 'primary.main', fontSize: { xs: '1rem', md: '1.1rem' } }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={item}
                            primaryTypographyProps={{
                              sx: {
                                fontSize: { xs: '0.85rem', md: '0.9rem' },
                                color: 'text.secondary',
                                lineHeight: 1.4,
                              },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      boxShadow: theme.shadows[8],
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: { xs: 200, sm: 220, md: 200 },
                      overflow: 'hidden',
                      backgroundColor: 'primary.50',
                      '& img': {
                        transition: 'transform 0.3s ease-in-out',
                      },
                      '&:hover img': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <Image
                      src="/Our Service/after sales service.png"
                      alt={t('whatWeOffer.afterSales.title')}
                      fill
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                  <CardContent sx={{ p: { xs: 2, md: 2.5 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        mb: 2,
                        lineHeight: 1.3,
                      }}
                    >
                      {t('whatWeOffer.afterSales.title')}
                    </Typography>
                    <List sx={{ flexGrow: 1, py: 0 }}>
                      {getItems('whatWeOffer.afterSales', 3).map((item: string, index: number) => (
                        <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 28 }}>
                            <CheckCircle sx={{ color: 'primary.main', fontSize: { xs: '1rem', md: '1.1rem' } }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={item}
                            primaryTypographyProps={{
                              sx: {
                                fontSize: { xs: '0.85rem', md: '0.9rem' },
                                color: 'text.secondary',
                                lineHeight: 1.4,
                              },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Sectors We Serve Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: 'background.paper' }}>
        <Container maxWidth="xl">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  color: 'text.primary',
                  mb: 2,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                }}
              >
                {t('sectorsWeServe.title')}
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  maxWidth: 800,
                  mx: 'auto',
                  mb: 4,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                }}
              >
                {t('sectorsWeServe.description')}
              </Typography>
            </Box>

            <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
              {/* Left Part - Sectors List */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  }}
                >
                  {getItems('sectorsWeServe', 6).map((sector: string, index: number) => (
                    <Card
                      key={index}
                      sx={{
                        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                        '&:hover': {
                          boxShadow: theme.shadows[6],
                          transform: 'translateX(8px)',
                        },
                      }}
                    >
                      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                          }}
                        >
                          <Box
                            sx={{
                              color: 'primary.main',
                              fontSize: { xs: '1.5rem', md: '2rem' },
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            {sectorIcons[index]}
                          </Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              color: 'text.primary',
                              fontSize: { xs: '1rem', md: '1.1rem' },
                              flex: 1,
                            }}
                          >
                            {sector}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Grid>

              {/* Right Part - Beautiful Lit Building Image */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: { xs: 400, md: '100%' },
                    minHeight: { md: 600 },
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: theme.shadows[8],
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: theme.shadows[12],
                    },
                  }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
                    alt="Beautiful lit building at night"
                    fill
                    style={{
                      objectFit: 'cover',
                    }}
                    priority
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(128, 0, 32, 0.85) 0%, rgba(128, 0, 32, 0.6) 50%, rgba(0,0,0,0) 100%)',
                      backdropFilter: 'blur(10px)',
                      p: { xs: 3, md: 4 },
                      color: 'white',
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                      <Box
                        sx={{
                          position: 'relative',
                          pl: 2.5,
                          mb: 2,
                        }}
                      >
                        <motion.div
                          initial={{ width: 0, opacity: 0 }}
                          whileInView={{ width: '4px', opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '2px',
                          }}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                        >
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 700,
                              mb: 1,
                              fontSize: { xs: '1.25rem', md: '1.5rem' },
                              letterSpacing: '0.5px',
                              textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                              fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                            }}
                          >
                            {t('sectorsWeServe.title')}
                          </Typography>
                        </motion.div>
                      </Box>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 0.95, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: { xs: '0.9rem', md: '1rem' },
                          lineHeight: 1.7,
                          textShadow: '0 1px 4px rgba(0,0,0,0.2)',
                          fontWeight: 400,
                          pl: 2.5,
                        }}
                      >
                        {t('sectorsWeServe.closing')}
                      </Typography>
                    </motion.div>
                  </Box>
                </Box>
              </Grid>
            </Grid>

          </motion.div>
        </Container>
      </Box>

      {/* Vision & Mission Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: 'background.default' }}>
        <Container maxWidth="xl">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Vision Section */}
            <Grid container spacing={4} sx={{ mb: { xs: 4, md: 6 } }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card
                  sx={{
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.05) 0%, rgba(128, 0, 32, 0.02) 100%)',
                    border: '1px solid',
                    borderColor: 'primary.100',
                    borderRadius: 3,
                    p: { xs: 3, md: 4 },
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      boxShadow: theme.shadows[8],
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        backgroundColor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        boxShadow: theme.shadows[4],
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '2rem',
                          color: 'white',
                          fontWeight: 700,
                        }}
                      >
                        👁️
                      </Typography>
                    </Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: 'primary.main',
                        fontSize: { xs: '1.5rem', md: '1.75rem' },
                        fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                      }}
                    >
                      {t('vision.title')}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.9,
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      color: 'text.secondary',
                      pl: { xs: 0, md: 1 },
                    }}
                  >
                    {t('vision.description')}
                  </Typography>
                </Card>
              </Grid>

              {/* Mission Section */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Card
                  sx={{
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(248, 248, 248, 0.8) 0%, rgba(255, 255, 255, 1) 100%)',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 3,
                    p: { xs: 3, md: 4 },
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      boxShadow: theme.shadows[8],
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        backgroundColor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        boxShadow: theme.shadows[4],
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '2rem',
                          color: 'white',
                          fontWeight: 700,
                        }}
                      >
                        🎯
                      </Typography>
                    </Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: 'text.primary',
                        fontSize: { xs: '1.5rem', md: '1.75rem' },
                        fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
                      }}
                    >
                      {t('mission.title')}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.8,
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      color: 'text.secondary',
                      mb: 3,
                      pl: { xs: 0, md: 1 },
                    }}
                  >
                    {t('mission.description')}
                  </Typography>
                  <Box>
                    <List sx={{ py: 0 }}>
                      {getItems('mission', 4).map((item: string, index: number) => (
                        <ListItem 
                          key={index} 
                          sx={{ 
                            px: 0, 
                            py: 1,
                            borderRadius: 1,
                            mb: 0.5,
                            transition: 'background-color 0.2s ease-in-out',
                            '&:hover': {
                              backgroundColor: 'primary.50',
                            },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <CheckCircle sx={{ color: 'primary.main', fontSize: '1.25rem' }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={item}
                            primaryTypographyProps={{
                              sx: {
                                fontSize: { xs: '0.95rem', md: '1rem' },
                                color: 'text.primary',
                                fontWeight: 500,
                              },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}

'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { fadeInUp, staggerContainer, staggerItem } from '../../../utils/animations';
import { useServices } from '../../../context/SiteContentContext';
import { getImageUrl } from '../../../lib/api';

export default function ServicesPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const services = useServices();

  const pick = (en?: string | null, ar?: string | null) =>
    (locale === 'ar' ? ar || en : en || ar) || '';

  return (
    <Box sx={{ flex: 1, minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* Hero */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${(theme.palette.primary as any)[50]} 0%, ${(theme.palette.secondary as any)[50]} 100%)`,
          py: { xs: 6, md: 8 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="xl">
          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <Typography
              variant={isMobile ? 'h4' : 'h3'}
              component="h1"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                mb: 2,
                textAlign: 'center',
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem', lg: '3rem' },
                fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif',
              }}
            >
              {t('header.services')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                textAlign: 'center',
                maxWidth: 800,
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.7,
                direction: isRTL ? 'rtl' : 'ltr',
              }}
            >
              {locale === 'ar'
                ? 'خدمات متكاملة من التصميم والتوريد إلى التركيب وما بعد البيع.'
                : 'End-to-end services from design and supply to installation and after-sales support.'}
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Services grid */}
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
        {services.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              {locale === 'ar'
                ? 'لم تتم إضافة خدمات بعد.'
                : 'No services have been added yet.'}
            </Typography>
          </Box>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
          >
            <Grid container spacing={{ xs: 3, md: 4 }}>
              {services.map((svc) => {
                const title = pick(svc.title_en, svc.title_ar);
                const description = pick(svc.description_en, svc.description_ar);
                const imageUrl = getImageUrl(svc.image_url);
                const items = (svc.items || [])
                  .filter((i) => i.is_active !== false)
                  .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

                return (
                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }} key={svc.id}>
                    <motion.div variants={staggerItem} style={{ height: '100%' }}>
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          borderRadius: 3,
                          overflow: 'hidden',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-6px)',
                            boxShadow: '0 14px 32px rgba(0,0,0,0.14)',
                          },
                        }}
                      >
                        {imageUrl && (
                          <CardMedia
                            component="img"
                            image={imageUrl}
                            alt={title}
                            sx={{
                              height: { xs: 200, md: 220 },
                              objectFit: 'cover',
                            }}
                          />
                        )}
                        <CardContent
                          sx={{
                            flex: 1,
                            direction: isRTL ? 'rtl' : 'ltr',
                            p: { xs: 2.5, md: 3 },
                          }}
                        >
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 700,
                              color: 'primary.main',
                              mb: 1.5,
                              fontSize: { xs: '1.25rem', md: '1.5rem' },
                            }}
                          >
                            {title}
                          </Typography>
                          {description && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 2, lineHeight: 1.7 }}
                            >
                              {description}
                            </Typography>
                          )}
                          {items.length > 0 && (
                            <List dense disablePadding>
                              {items.map((it) => (
                                <ListItem key={it.id} disableGutters sx={{ alignItems: 'flex-start' }}>
                                  <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                                    <CheckCircle
                                      fontSize="small"
                                      sx={{ color: 'primary.main' }}
                                    />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={pick(it.text_en, it.text_ar)}
                                    primaryTypographyProps={{
                                      variant: 'body2',
                                      sx: { lineHeight: 1.6 },
                                    }}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                );
              })}
            </Grid>
          </motion.div>
        )}
      </Container>
    </Box>
  );
}

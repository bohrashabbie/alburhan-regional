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
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { fadeInUp, staggerContainer, staggerItem } from '../../../utils/animations';
import { useProducts } from '../../../context/SiteContentContext';
import { getImageUrl } from '../../../lib/api';

export default function ProductsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const products = useProducts();

  const pick = (en?: string | null, ar?: string | null) =>
    (locale === 'ar' ? ar || en : en || ar) || '';

  const activeProducts = [...(products || [])]
    .filter((p) => p.is_active !== false)
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

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
              {t('header.ourProducts')}
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
                ? 'مجموعة شاملة من المنتجات عالية الجودة المختارة بعناية لمشاريعك.'
                : 'A curated range of high-quality products for every project requirement.'}
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Grid */}
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
        {activeProducts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              {locale === 'ar'
                ? 'لم تتم إضافة منتجات بعد.'
                : 'No products have been added yet.'}
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
              {activeProducts.map((prod) => {
                const title = pick(prod.name_en, prod.name_ar);
                const description = pick(prod.description_en, prod.description_ar);
                const imageUrl = getImageUrl(prod.image_url);

                return (
                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={prod.id}>
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
                        {imageUrl ? (
                          <CardMedia
                            component="img"
                            image={imageUrl}
                            alt={title}
                            sx={{
                              height: { xs: 180, md: 220 },
                              objectFit: 'cover',
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              height: { xs: 180, md: 220 },
                              backgroundColor: 'grey.100',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'text.disabled',
                            }}
                          >
                            <Typography variant="body2">No image</Typography>
                          </Box>
                        )}
                        <CardContent
                          sx={{
                            flex: 1,
                            direction: isRTL ? 'rtl' : 'ltr',
                            p: { xs: 2, md: 2.5 },
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              color: 'primary.main',
                              mb: description ? 1 : 0,
                              fontSize: { xs: '1.05rem', md: '1.15rem' },
                              lineHeight: 1.3,
                            }}
                          >
                            {title}
                          </Typography>
                          {description && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ lineHeight: 1.6 }}
                            >
                              {description}
                            </Typography>
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

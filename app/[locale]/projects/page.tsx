'use client';

import React, { useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  useTheme,
  useMediaQuery,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { fadeInUp, staggerContainer, staggerItem } from '../../../utils/animations';
import { useProjectCategories } from '../../../context/SiteContentContext';
import { getImageUrl } from '../../../lib/api';

export default function ProjectsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const categories = useProjectCategories();

  // Localized text helpers
  const pick = (en?: string | null, ar?: string | null) =>
    (locale === 'ar' ? ar || en : en || ar) || '';

  // Flatten projects with their first image + category name for easy rendering
  const projectTiles = useMemo(() => {
    const tiles: Array<{
      id: number;
      name: string;
      description: string;
      categoryName: string;
      imageUrl: string | null;
    }> = [];

    for (const cat of categories) {
      const categoryName = pick(cat.name_en, cat.name_ar);
      for (const proj of cat.projects || []) {
        const firstImage = proj.images?.[0]?.image_url || cat.cover_image_url;
        tiles.push({
          id: proj.id,
          name: pick(proj.name_en, proj.name_ar),
          description: pick(proj.description_en, proj.description_ar),
          categoryName,
          imageUrl: getImageUrl(firstImage),
        });
      }
    }
    return tiles;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, locale]);

  const hasData = projectTiles.length > 0;

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
              {t('header.ourProjects')}
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
                ? 'استعرض مجموعة مختارة من المشاريع التي أنجزناها عبر قطاعات مختلفة.'
                : 'Explore a selection of projects we have delivered across sectors.'}
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Projects grid */}
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
        {!hasData ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              {locale === 'ar'
                ? 'لم تتم إضافة مشاريع بعد.'
                : 'No projects have been added yet.'}
            </Typography>
          </Box>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
          >
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
              {projectTiles.map((tile) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={tile.id}>
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
                      {tile.imageUrl ? (
                        <CardMedia
                          component="img"
                          image={tile.imageUrl}
                          alt={tile.name}
                          sx={{
                            height: { xs: 200, md: 240 },
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            height: { xs: 200, md: 240 },
                            backgroundColor: 'background.paper',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'text.disabled',
                          }}
                        >
                          <Typography variant="body2">No image</Typography>
                        </Box>
                      )}
                      <CardContent sx={{ flex: 1, direction: isRTL ? 'rtl' : 'ltr' }}>
                        {tile.categoryName && (
                          <Chip
                            label={tile.categoryName}
                            size="small"
                            sx={{
                              mb: 1,
                              backgroundColor: 'primary.50',
                              color: 'primary.main',
                              fontWeight: 600,
                            }}
                          />
                        )}
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: 'text.primary',
                            mb: 1,
                            lineHeight: 1.3,
                          }}
                        >
                          {tile.name}
                        </Typography>
                        {tile.description && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              lineHeight: 1.6,
                            }}
                          >
                            {tile.description}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        )}
      </Container>
    </Box>
  );
}

'use client';

import React, { useMemo } from 'react';
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
  Card,
  CardContent,
} from '@mui/material';
import { LocationOn, Phone, Email, Language, ArrowBack, Send } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { fadeInUp } from '../../../utils/animations';
import { Link } from '@/i18n/routing';
import ProjectGallery from '../../../components/ProjectGallery';
import { useProjectCategories, useSiteContent } from '../../../context/SiteContentContext';
import { getImageUrl } from '../../../lib/api';

export default function ChinaPage() {
  const t = useTranslations();
  const locale = useLocale();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { countryBySlug } = useSiteContent();
  const country = countryBySlug('china');
  const countryImage = getImageUrl(country?.country_image_url) || '/Company Countries/china city.jpg';
  const countryLogo = getImageUrl(country?.logo_url) || '/logo/AL BURHAN CHINA.png';

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

  // Project categories (with their projects + images) come from the CMS.
  // Pages no longer ship a static fallback — admin-managed content is the
  // single source of truth.
  const cmsCategories = useProjectCategories();

  const projectsByCategory = useMemo(() => {
    const cid = country?.id;
    const sortedCats = [...(cmsCategories || [])]
      .filter((c) => c.is_active !== false)
      .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
    return sortedCats
      .map((cat) => {
        const catName = (locale === 'ar' ? cat.name_ar || cat.name_en : cat.name_en) || '';
        const projects = [...(cat.projects || [])]
          .filter((p) => p.is_active !== false)
          // A project is shown on this country page if it is tagged for this
          // country or is "global" (country_id null) — keeps pre-tagged data working.
          .filter((p) => p.country_id == null || p.country_id === cid)
          .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
          .map((project) => {
            const imgs = [...(project.images || [])]
              .filter((i) => i.is_active !== false)
              .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
              .map((img) => getImageUrl(img.image_url))
              .filter((u): u is string => !!u);
            if (imgs.length === 0) return null;
            const projectName =
              (locale === 'ar' ? project.name_ar || project.name_en : project.name_en) || '';
            return {
              name: projectName,
              folderPath: '',
              images: imgs,
              firstImage: imgs[0],
            };
          })
          .filter((p): p is { name: string; folderPath: string; images: string[]; firstImage: string } => !!p);
        return { categoryName: catName, projects };
      })
      .filter((g) => g.projects.length > 0);
  }, [cmsCategories, locale, country?.id]);

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
            src={countryImage}
            alt="China"
            fill
            unoptimized
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
                src={countryLogo}
                alt="Al Burhan China Logo"
                fill
                unoptimized
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
                    {t('aboutUs.china.firmName')}
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
                    {t('aboutUs.china.countryName')}
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
            {t('aboutUs.china.countryName')}
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
              {t('aboutUs.china.description')}
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

            {/* Project categories rendered from CMS (single source of truth). */}
            {projectsByCategory.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography variant="body1" color="text.secondary">
                  {locale === 'ar'
                    ? 'لا توجد مشاريع متاحة حالياً.'
                    : 'No projects are available at the moment.'}
                </Typography>
              </Box>
            ) : (
              projectsByCategory.map(({ categoryName, projects }) => (
                <Box key={categoryName} sx={{ mb: { xs: 5, sm: 6, md: 7 } }}>
                  <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ fontWeight: 600, color: 'text.primary', mb: { xs: 3, sm: 4 }, fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }, fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif', letterSpacing: { xs: '0.02em', md: '0.04em' } }}>
                      {categoryName}
                    </Typography>
                  </motion.div>
                  <ProjectGallery projects={projects} />
                </Box>
              ))
            )}
          </Container>
        </Box>
      </motion.div>

      {/* Our Location Section */}
      <Box sx={{ py: { xs: 4, md: 5 }, backgroundColor: 'grey.50', position: 'relative' }}>
        <Container maxWidth="lg">
          <motion.div initial={{ opacity: 0, y: -16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography sx={{ fontWeight: 700, color: 'primary.main', fontSize: '1.35rem', fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif', letterSpacing: '0.04em' }}>
                {t('contact.ourLocation')}
              </Typography>
              <Box sx={{ width: 48, height: 2, borderRadius: 1, backgroundColor: 'primary.main', mx: 'auto', mt: 1.25, opacity: 0.85 }} />
            </Box>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <Card
              elevation={0}
              sx={{
                maxWidth: 720,
                mx: 'auto',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: 'none',
                overflow: 'visible',
                transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
                '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,0.06)', borderColor: 'primary.light' },
              }}
            >
              <Box sx={{ p: 2.5, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 2, md: 3 } }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.5 }}>
                    <Box sx={{ width: 36, height: 36, borderRadius: '10px', backgroundColor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <LocationOn sx={{ color: 'white', fontSize: 20 }} />
                    </Box>
                    <Typography sx={{ fontWeight: 700, color: 'text.primary', fontSize: '1.05rem', fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif', letterSpacing: '0.02em' }}>
                      {t('countryContact.china.companyName')}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.08em', mb: 0.5 }}>
                    {t('contact.address')}
                  </Typography>
                  <Typography sx={{ color: 'text.primary', lineHeight: 1.65, fontSize: '0.9375rem', fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif', whiteSpace: 'pre-line' }}>
                    {t('countryContact.china.address')}<br />
                    {t('countryContact.china.district')}<br />
                    {t('countryContact.china.province')}<br />
                    {t('countryContact.china.postalCode')}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, pt: { xs: 1.5, md: 0 }, borderTop: { xs: '1px solid', md: 'none' }, borderLeft: { md: '1px solid' }, borderColor: 'divider', pl: { md: 3 } }}>
                  <Box>
                    <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.08em', mb: 0.5 }}>
                      {t('contact.phoneNumbers')}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <Phone sx={{ color: 'primary.main', fontSize: 18 }} />
                      <Typography sx={{ color: 'text.primary', fontWeight: 500, fontSize: '0.9375rem', fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif' }}>
                        {t('countryContact.china.phone')}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.08em', mb: 0.5 }}>
                      Website
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <Language sx={{ color: 'primary.main', fontSize: 18 }} />
                      <Typography sx={{ color: 'text.primary', fontWeight: 500, fontSize: '0.9375rem', fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif' }}>
                        {t('countryContact.china.website')}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.08em', mb: 0.5 }}>
                      {t('contact.email')}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <Email sx={{ color: 'primary.main', fontSize: 18 }} />
                      <Typography sx={{ color: 'text.primary', fontWeight: 500, fontSize: '0.9375rem', fontFamily: 'var(--font-montserrat), var(--font-poppins), sans-serif' }}>
                        {t('countryContact.china.email')}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Card>
          </motion.div>
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
            {/* Contact Information */}
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
                    {t('countryContact.china.companyName')}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, mb: 0.5, color: 'text.primary' }}
                        >
                          {t('contact.phoneNumbers')}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                          {t('countryContact.china.phone')}
                        </Typography>
                      </Box>
                    </Box>
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
                        <Language sx={{ color: 'white', fontSize: 24 }} />
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, mb: 0.5, color: 'text.primary' }}
                        >
                          Website
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {t('countryContact.china.website')}
                        </Typography>
                      </Box>
                    </Box>
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
                        <Email sx={{ color: 'white', fontSize: 24 }} />
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, mb: 0.5, color: 'text.primary' }}
                        >
                          {t('contact.email')}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {t('countryContact.china.email')}
                        </Typography>
                      </Box>
                    </Box>
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

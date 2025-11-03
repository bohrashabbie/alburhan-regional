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
  Divider
} from '@mui/material';
import { LocationOn, Phone, Email, ArrowBack, Send } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { fadeInUp } from '../../../utils/animations';
import { Link } from '@/i18n/routing';

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
            src="/Company Countries/kuwait city.jpg"
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
                      color: 'primary.main',
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

            {/* Projects Gallery - Masonry Layout to Minimize Gaps */}
            <Box
              sx={{
                columnCount: { xs: 1, sm: 2, md: 3 },
                columnGap: { xs: 2, sm: 2.5, md: 3 },
                columnFill: 'balance',
                WebkitColumnCount: { xs: 1, sm: 2, md: 3 },
                WebkitColumnGap: { xs: 2, sm: 2.5, md: 3 },
                WebkitColumnFill: 'balance',
                '& > *': {
                  breakInside: 'avoid',
                  WebkitColumnBreakInside: 'avoid',
                  pageBreakInside: 'avoid',
                  marginBottom: { xs: 2, sm: 2.5, md: 3 },
                  display: 'inline-block',
                  width: '100%',
                  verticalAlign: 'top',
                },
              }}
            >
              {[
                { src: '/Projects/Project2.png', alt: t('projects.project2'), key: 'project2' },
                { src: '/Projects/project5.png', alt: t('projects.project5'), key: 'project5' },
                { src: '/Projects/Project3.png', alt: t('projects.project3'), key: 'project3' },
                { src: '/Projects/Project7.png', alt: t('projects.project7'), key: 'project7' },
                { src: '/Projects/Project4.png', alt: t('projects.project4'), key: 'project4' },
                { src: '/Projects/Project6.png', alt: t('projects.project6'), key: 'project6' },
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.08,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  whileHover={{ y: -12, scale: 1.03 }}
                  style={{ width: '100%', display: 'inline-block' }}
                >
                  <Box
                    className="project-card"
                    sx={{
                      position: 'relative',
                      width: '100%',
                      borderRadius: { xs: 2, sm: 2.5, md: 3 },
                      overflow: 'hidden',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                      cursor: 'pointer',
                      backgroundColor: 'background.default',
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
                        transform: 'translateY(-8px)',
                        '& .project-image': {
                          transform: 'scale(1.05)',
                        },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        overflow: 'hidden',
                        backgroundColor: 'grey.100',
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          position: 'relative',
                          display: 'block',
                          width: '100%',
                          zIndex: 0,
                        }}
                      >
                        <Image
                          src={project.src}
                          alt={project.alt}
                          width={1200}
                          height={900}
                          sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                          className="project-image"
                          style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            objectFit: 'contain',
                            transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                          }}
                          loading="lazy"
                        />
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Container>
        </Box>
      </motion.div>

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
                            <LocationOn sx={{ color: 'white', fontSize: 24 }} />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 600, mb: 0.5, color: 'text.primary' }}
                            >
                              {t(`countryContact.kuwait.${branch.key}.name`)}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, lineHeight: 1.6 }}>
                              {t('contact.address')}: {t(`countryContact.kuwait.${branch.key}.address`)}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Phone sx={{ fontSize: 16, color: 'primary.main' }} />
                              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                                {t('contact.phoneNumbers')}: {t(`countryContact.kuwait.${branch.key}.phone`)}
                              </Typography>
                            </Box>
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
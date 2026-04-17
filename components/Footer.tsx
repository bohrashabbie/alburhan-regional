'use client';

import React, { useMemo } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
  AccessTime,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  hoverScale,
  hoverLift,
} from '../utils/animations';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useBranches } from '../hooks/useApi';
import { useSiteContent } from '../context/SiteContentContext';

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const t = useTranslations();
  const { content } = useSiteContent();

  // Fetch branches from API
  const { data: apiBranches } = useBranches();

  const branchData = useMemo(() => {
    if (!apiBranches || apiBranches.length === 0) return null;
    const result: { [key: string]: { email?: string; phone1?: string; phone2?: string; address?: string } } = {};
    apiBranches.forEach((b) => {
      const name = (b.branchname || '').toLowerCase();
      const entry = {
        email: b.email || undefined,
        phone1: b.contact1 || undefined,
        phone2: b.contact2 || undefined,
        address: b.branchaddress || undefined,
      };
      if (name.includes('dubai') || name.includes('uae') || name.includes('emirates')) result['dubai'] = entry;
      else if (name.includes('china')) result['china'] = entry;
      else if (name.includes('kuwait')) result['kuwait'] = entry;
      else if (name.includes('egypt')) result['egypt'] = entry;
    });
    return Object.keys(result).length > 0 ? result : null;
  }, [apiBranches]);

  // Get social links from CMS or fallback
  const socialLinks = useMemo(() => {
    if (content?.social_links && content.social_links.length > 0) {
      return content.social_links
        .filter((item: any) => item.isactive)
        .sort((a: any, b: any) => (a.sequencenumber ?? 0) - (b.sequencenumber ?? 0))
        .map((item: any) => ({
          icon: <Facebook />, // Map platform to icon
          href: item.url,
          label: item.platform,
        }));
    }
    // Fallback
    return [
      { icon: <Facebook />, href: '#', label: 'Facebook' },
      { icon: <Twitter />, href: '#', label: 'Twitter' },
      { icon: <Instagram />, href: '#', label: 'Instagram' },
      { icon: <LinkedIn />, href: '#', label: 'LinkedIn' },
    ];
  }, [content]);

  const contactInfo = [
    { icon: <Email />, text: t('contact.emailValue') },
    { icon: <Phone />, text: t('contact.phone1') },
    { 
      icon: <LocationOn />, 
      text: `${t('contact.headOffice')}: ${t('contact.addressLine')}${t('contact.addressLine2') ? `, ${t('contact.addressLine2')}` : ''}` 
    },
    { 
      icon: <AccessTime />, 
      text: t('contact.hours') 
    },
  ];

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
    >
      <Box
        component="footer"
        sx={{
          borderTop: 1,
          borderColor: 'divider',
          mt: 'auto',
        }}
      >
        {/* Three Sections Side by Side */}
        <Box>
          <Box sx={{ width: '100%' }}>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.1 }}
            >
              <Grid container spacing={0}>
                {/* First Section - Maroon: Current Details */}
                <Grid 
                  size={{ xs: 12, md: 4 }}
                  sx={{
                    backgroundColor: 'primary.main',
                    py: { xs: 4, md: 6 },
                    px: { xs: 3, md: 4 },
                  }}
                >
                  <motion.div variants={staggerItem}>
                    <Box sx={{ mb: 2 }}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Typography
                          variant="h5"
                          component={Link}
                          href="/"
                          sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            textDecoration: 'none',
                            display: 'block',
                            mb: 2,
                            cursor: 'pointer',
                          }}
                        >
                          {t('common.companyName')}
                        </Typography>
                      </motion.div>
                      <Typography
                        variant="body2"
                        sx={{ mb: 2, lineHeight: 1.6, color: 'white' }}
                      >
                        {t('footer.description')}
                      </Typography>
                    </Box>
                  </motion.div>

                  {/* Contact Information */}
                  <motion.div variants={staggerItem}>
                    <Box sx={{ mb: 2 }}>
                      {contactInfo.map((contact, index) => (
                        <motion.div
                          key={index}
                          variants={staggerItem}
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              mb: 1,
                            }}
                          >
                            <Box sx={{ color: 'white', fontSize: '1.2rem' }}>
                              {contact.icon}
                            </Box>
                            <Typography variant="body2" sx={{ color: 'white' }}>
                              {contact.text}
                            </Typography>
                          </Box>
                        </motion.div>
                      ))}
                    </Box>
                  </motion.div>

                  {/* Social Links */}
                  <motion.div variants={staggerItem}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {socialLinks.map((social, index) => (
                        <motion.div
                          key={index}
                          variants={staggerItem}
                          whileHover="hover"
                        >
                          <IconButton
                            href={social.href}
                            sx={{
                              color: 'white',
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                              },
                              transition: 'all 0.2s ease-in-out',
                            }}
                            aria-label={social.label}
                          >
                            {social.icon}
                          </IconButton>
                        </motion.div>
                      ))}
                    </Box>
                  </motion.div>
                </Grid>

                {/* Second Section - White: UAE Branch */}
                <Grid 
                  size={{ xs: 12, md: 4 }}
                  sx={{
                    backgroundColor: 'background.paper',
                    py: { xs: 4, md: 6 },
                    px: { xs: 3, md: 4 },
                  }}
                >
                  <motion.div variants={staggerItem}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 'bold',
                        color: 'text.primary',
                        mb: 1,
                      }}
                    >
                      {t('countryContact.dubai.companyName')}
                    </Typography>
                  </motion.div>

                  <motion.div variants={staggerItem}>
                    <Box sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <Box sx={{ color: 'primary.main', fontSize: '1.2rem', mt: 0.5 }}>
                          <LocationOn />
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ color: 'text.primary', mb: 0.5 }}>
                            {t('countryContact.dubai.office')}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.primary', mb: 0.5 }}>
                            {t('countryContact.dubai.floor')}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.primary', mb: 0.5 }}>
                            {t('countryContact.dubai.area')}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.primary' }}>
                            {t('countryContact.dubai.city')}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>

                  <motion.div variants={staggerItem}>
                    <Box sx={{ mb: 1 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <Box sx={{ color: 'primary.main', fontSize: '1.2rem' }}>
                          <Phone />
                        </Box>
                        <Typography variant="body2" sx={{ color: 'text.primary' }}>
                          {branchData?.dubai?.phone1 || t('countryContact.dubai.phone1')}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <Box sx={{ color: 'primary.main', fontSize: '1.2rem' }}>
                          <Phone />
                        </Box>
                        <Typography variant="body2" sx={{ color: 'text.primary' }}>
                          {branchData?.dubai?.phone2 || t('countryContact.dubai.phone2')}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <Box sx={{ color: 'primary.main', fontSize: '1.2rem' }}>
                          <Email />
                        </Box>
                        <Typography variant="body2" sx={{ color: 'text.primary' }}>
                          {branchData?.dubai?.email || t('countryContact.dubai.email')}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>

                {/* Third Section - Maroon: China Branch */}
                <Grid 
                  size={{ xs: 12, md: 4 }}
                  sx={{
                    backgroundColor: 'primary.main',
                    py: { xs: 4, md: 6 },
                    px: { xs: 3, md: 4 },
                  }}
                >
                  <motion.div variants={staggerItem}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 'bold',
                        color: 'white',
                        mb: 1,
                      }}
                    >
                      {t('countryContact.china.companyName')}
                    </Typography>
                  </motion.div>

                  <motion.div variants={staggerItem}>
                    <Box sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <Box sx={{ color: 'white', fontSize: '1.2rem', mt: 0.5 }}>
                          <LocationOn />
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ color: 'white', mb: 0.5 }}>
                            {t('countryContact.china.address')}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'white', mb: 0.5 }}>
                            {t('countryContact.china.district')}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'white', mb: 0.5 }}>
                            {t('countryContact.china.province')}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'white' }}>
                            {t('countryContact.china.postalCode')}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>

                  <motion.div variants={staggerItem}>
                    <Box sx={{ mb: 1 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <Box sx={{ color: 'white', fontSize: '1.2rem' }}>
                          <Phone />
                        </Box>
                        <Typography variant="body2" sx={{ color: 'white' }}>
                          {branchData?.china?.phone1 || t('countryContact.china.phone')}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <Box sx={{ color: 'white', fontSize: '1.2rem' }}>
                          <Email />
                        </Box>
                        <Typography variant="body2" sx={{ color: 'white' }}>
                          {branchData?.china?.email || t('countryContact.china.email')}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <Box sx={{ color: 'white', fontSize: '1.2rem' }}>
                          <LocationOn />
                        </Box>
                        <Typography variant="body2" sx={{ color: 'white' }}>
                          {t('countryContact.china.website')}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>
              </Grid>
            </motion.div>
          </Box>
        </Box>

        {/* Footer Bottom */}
        <Box
          sx={{
            backgroundColor: 'primary.main',
            borderTop: 1,
            borderColor: 'rgba(255, 255, 255, 0.2)',
            mt: 0,
          }}
        >
          <Container maxWidth="xl" disableGutters sx={{ py: { xs: 3, md: 4 }, px: { xs: 3, md: 4 } }}>
            <motion.div variants={staggerItem}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  justifyContent: 'space-between',
                  alignItems: { xs: 'flex-start', md: 'center' },
                  gap: 2,
                }}
              >
                <Typography variant="body2" sx={{ color: 'white' }}>
                  © {new Date().getFullYear()} {t('common.companyName')}. {t('footer.copyright')}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    gap: { xs: 2, md: 3 },
                    flexWrap: 'wrap',
                    '& a': {
                      color: 'white',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        color: 'rgba(255, 255, 255, 0.8)',
                        textDecoration: 'underline',
                      },
                    },
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/privacy">
                      {t('footer.legal.privacy')}
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/terms">
                      {t('footer.legal.terms')}
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/cookies">
                      {t('footer.legal.cookies')}
                    </Link>
                  </motion.div>
                </Box>
              </Box>
            </motion.div>
          </Container>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Footer;

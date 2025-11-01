'use client';

import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
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

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const t = useTranslations();

  const footerSections = [
    {
      title: t('footer.services.title'),
      links: [
        { label: t('footer.services.interior'), href: '/services/interior-lighting' },
        { label: t('footer.services.commercial'), href: '/services/commercial-lighting' },
        { label: t('footer.services.exterior'), href: '/services/exterior-lighting' },
        { label: t('footer.services.smart'), href: '/services/smart-lighting' },
        { label: t('footer.services.design'), href: '/services/lighting-design' },
        { label: t('footer.services.installation'), href: '/services/installation' },
      ],
    },
    {
      title: t('footer.legal.title'),
      links: [
        { label: t('footer.legal.privacy'), href: '/privacy' },
        { label: t('footer.legal.terms'), href: '/terms' },
        { label: t('footer.legal.cookies'), href: '/cookies' },
        { label: t('footer.legal.gdpr'), href: '/gdpr' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Facebook />, href: '#', label: 'Facebook' },
    { icon: <Twitter />, href: '#', label: 'Twitter' },
    { icon: <Instagram />, href: '#', label: 'Instagram' },
    { icon: <LinkedIn />, href: '#', label: 'LinkedIn' },
  ];

  const contactInfo = [
    { icon: <Email />, text: t('contact.emailValue') },
    { icon: <Phone />, text: `${t('contact.phone1')} | ${t('contact.phone2')}` },
    { 
      icon: <LocationOn />, 
      text: `${t('contact.headOffice')}, ${t('contact.addressLine')}, ${t('contact.addressLine2')}` 
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
          backgroundColor: 'secondary.50',
          borderTop: 1,
          borderColor: 'divider',
          mt: 'auto',
        }}
      >
        <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
          {/* Main Footer Content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
          >
            <Grid container spacing={{ xs: 3, md: 4 }}>
              {/* Company Info */}
              <Grid size={{ xs: 12, md: 4 }}>
                <motion.div variants={staggerItem}>
                  <Box sx={{ mb: 2 }}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Typography
                        variant="h5"
                        component="a"
                        href="/"
                        sx={{
                          fontWeight: 'bold',
                          color: 'primary.main',
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
                      color="text.secondary"
                      sx={{ mb: 2, lineHeight: 1.6 }}
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
                          <Box sx={{ color: 'primary.main', fontSize: '1.2rem' }}>
                            {contact.icon}
                          </Box>
                          <Typography variant="body2" color="text.secondary">
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
                            color: 'primary.main',
                            backgroundColor: 'primary.50',
                            '&:hover': {
                              backgroundColor: 'primary.100',
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

              {/* Footer Links */}
              {footerSections.map((section, index) => (
                <Grid size={{ xs: 6, sm: 3, md: 2 }} key={index}>
                  <motion.div variants={staggerItem}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        mb: 2,
                        fontSize: '1rem',
                      }}
                    >
                      {section.title}
                    </Typography>
                    <Box component="nav">
                      {section.links.map((link, linkIndex) => (
                        <motion.div
                          key={linkIndex}
                          variants={staggerItem}
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Link
                            href={link.href}
                            sx={{
                              display: 'block',
                              color: 'text.secondary',
                              textDecoration: 'none',
                              mb: 1,
                              fontSize: '0.875rem',
                              '&:hover': {
                                color: 'primary.main',
                                textDecoration: 'underline',
                              },
                              transition: 'color 0.2s ease-in-out',
                            }}
                          >
                            {link.label}
                          </Link>
                        </motion.div>
                      ))}
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>

          {/* Footer Bottom */}
          <motion.div variants={staggerItem}>
            <Divider sx={{ my: { xs: 3, md: 4 } }} />
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', md: 'center' },
                gap: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} {t('common.companyName')}. {t('footer.copyright')}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: { xs: 2, md: 3 },
                  flexWrap: 'wrap',
                }}
              >
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={`/${link.toLowerCase().replace(' ', '-')}`}
                      sx={{
                        color: 'text.secondary',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        '&:hover': {
                          color: 'primary.main',
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {link}
                    </Link>
                  </motion.div>
                ))}
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </motion.div>
  );
};

export default Footer;

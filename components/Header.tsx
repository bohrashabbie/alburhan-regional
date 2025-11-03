'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Container,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Home,
  Info,
  ContactMail,
  Business,
  ShoppingBag,
  Work,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  fadeInLeft,
  fadeInRight,
  slideInFromTop,
  staggerContainer,
  staggerItem,
  hoverScale,
} from '../utils/animations';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const t = useTranslations('header');

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigationItems = [
    { label: t('home'), href: '/', icon: <Home /> },
    { label: t('aboutUs'), href: '/about', icon: <Info /> },
    { label: t('ourProducts'), href: '/products', icon: <ShoppingBag /> },
    { label: t('ourProjects'), href: '/#projects', icon: <Work /> },
    { label: t('services'), href: '/services', icon: <Business /> },
    { label: t('contact'), href: '/#contact', icon: <ContactMail /> },
  ];

  const DesktopNavigation = () => (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      style={{ display: 'flex', alignItems: 'center', gap: 16 }}
    >
      {navigationItems.map((item, index) => (
        <motion.div
          key={item.label}
          variants={staggerItem}
          whileHover="hover"
        >
          <Button
            href={item.href}
            sx={{
              color: 'text.primary',
              fontWeight: 500,
              textTransform: 'none',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'primary.50',
                color: 'primary.600',
                transform: 'translateY(-2px)',
              },
            }}
          >
            {item.label}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );

  const MobileNavigation = () => (
    <AnimatePresence>
      {mobileMenuOpen && (
        <Drawer
          anchor="right"
          open={mobileMenuOpen}
          onClose={handleMobileMenuToggle}
          sx={{
            '& .MuiDrawer-paper': {
              width: 280,
              backgroundColor: 'background.paper',
            },
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            style={{ padding: 16 }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Menu
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LanguageSwitcher />
                <IconButton onClick={handleMobileMenuToggle}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <List>
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    variants={staggerItem}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ListItem
                      component="a"
                      href={item.href}
                      sx={{
                        borderRadius: 1,
                        mb: 0.5,
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'primary.50',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                        {item.icon}
                        <ListItemText
                          primary={item.label}
                          sx={{
                            '& .MuiListItemText-primary': {
                              fontWeight: 500,
                            },
                          }}
                        />
                      </Box>
                    </ListItem>
                  </motion.div>
                ))}
              </List>
            </motion.div>
          </motion.div>
        </Drawer>
      )}
    </AnimatePresence>
  );

  return (
    <>
        <AppBar
          position="sticky"
          elevation={scrolled ? 4 : 0}
          sx={{
            backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'background.paper',
            borderBottom: 1,
            borderColor: 'divider',
            backdropFilter: 'blur(10px)',
            zIndex: 1300,
            top: 0,
            transition: 'all 0.3s ease',
          }}
          component={motion.div}
          variants={slideInFromTop}
          initial="initial"
          animate="animate"
        >
          <Container maxWidth="xl">
            <Toolbar
              sx={{
                minHeight: { xs: 56, md: 64 },
                px: { xs: 1, sm: 2 },
              }}
            >
              {/* Logo */}
              <motion.div
                variants={fadeInLeft}
                initial="initial"
                animate="animate"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Box
                  component="a"
                  href="/"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    flexGrow: { xs: 1, md: 0 },
                    mr: { md: 4 },
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: { xs: 180, md: 240 },
                      height: { xs: 70, md: 90 },
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      src="/logo/Al burhan group logo.png"
                      alt="AL-Burhan Group Logo"
                      fill
                      style={{
                        objectFit: 'contain',
                        objectPosition: 'left center',
                      }}
                      priority
                    />
                  </Box>
                </Box>
              </motion.div>

              {/* Desktop Navigation */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, flex: 1, justifyContent: 'center' }}>
                <DesktopNavigation />
              </Box>

              {/* Language Switcher */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LanguageSwitcher />
              </Box>

              {/* Mobile Menu Button */}
              <motion.div
                variants={fadeInRight}
                initial="initial"
                animate="animate"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMobileMenuToggle}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                    color: 'text.primary',
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </motion.div>
            </Toolbar>
          </Container>
        </AppBar>

      {/* Mobile Navigation Drawer */}
      <MobileNavigation />
    </>
  );
};

export default Header;

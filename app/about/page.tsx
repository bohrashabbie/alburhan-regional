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
} from '@mui/material';
import {
  Business,
  Code,
  Palette,
  Analytics,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  staggerItem,
  hoverLift,
  scaleIn,
  bounceIn,
} from '../../utils/animations';

export default function About() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const services = [
    {
      icon: <Business sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Business Solutions',
      description: 'Comprehensive business technology solutions tailored to your needs.',
    },
    {
      icon: <Code sx={{ fontSize: 40, color: 'success.main' }} />,
      title: 'Web Development',
      description: 'Modern web applications built with cutting-edge technologies.',
    },
    {
      icon: <Palette sx={{ fontSize: 40, color: 'warning.main' }} />,
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive user interfaces that enhance user experience.',
    },
    {
      icon: <Analytics sx={{ fontSize: 40, color: 'secondary.main' }} />,
      title: 'Data Analytics',
      description: 'Data-driven insights to help you make informed business decisions.',
    },
  ];

  return (
    <Box sx={{ flex: 1 }}>
      {/* Hero Section */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Box
          sx={{
            background: `linear-gradient(135deg, ${(theme.palette.primary as any)[50]} 0%, ${(theme.palette.secondary as any)[50]} 100%)`,
            py: { xs: 6, md: 10 },
          }}
        >
          <Container maxWidth="xl">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.1 }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <motion.div variants={staggerItem}>
                  <Typography
                    variant={isMobile ? 'h3' : 'h2'}
                    component="h1"
                    sx={{
                      fontWeight: 'bold',
                      color: 'text.primary',
                      mb: 2,
                    }}
                  >
                    About AL-Burhani
                  </Typography>
                </motion.div>
                <motion.div variants={staggerItem}>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{
                      maxWidth: 800,
                      mx: 'auto',
                      lineHeight: 1.6,
                    }}
                  >
                    We are a leading technology company dedicated to providing innovative
                    solutions and exceptional services to our clients worldwide. Our team
                    of experts brings years of experience in delivering cutting-edge
                    technology solutions.
                  </Typography>
                </motion.div>
              </Box>
            </motion.div>
          </Container>
        </Box>
      </motion.div>

      {/* Services Section */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: 'background.paper' }}>
          <Container maxWidth="xl">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.1 }}
            >
              <Box sx={{ textAlign: 'center', mb: 6 }}>
                <motion.div variants={staggerItem}>
                  <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                      fontWeight: 'bold',
                      color: 'text.primary',
                      mb: 2,
                    }}
                  >
                    Our Services
                  </Typography>
                </motion.div>
                <motion.div variants={staggerItem}>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ maxWidth: 600, mx: 'auto' }}
                  >
                    We offer a comprehensive range of technology services to help
                    your business grow and succeed.
                  </Typography>
                </motion.div>
              </Box>

              <Grid container spacing={4}>
                {services.map((service, index) => (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                    <motion.div
                      variants={staggerItem}
                      whileHover="hover"
                    >
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                          '&:hover': {
                            boxShadow: theme.shadows[8],
                          },
                        }}
                      >
                        <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                          <motion.div
                            variants={bounceIn}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Box sx={{ mb: 2 }}>{service.icon}</Box>
                          </motion.div>
                          <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                              fontWeight: 600,
                              color: 'text.primary',
                              mb: 2,
                            }}
                          >
                            {service.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {service.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Container>
        </Box>
      </motion.div>

      {/* Team Section */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: 'background.default' }}>
          <Container maxWidth="xl">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.1 }}
            >
              <Box sx={{ textAlign: 'center', mb: 6 }}>
                <motion.div variants={staggerItem}>
                  <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                      fontWeight: 'bold',
                      color: 'text.primary',
                      mb: 2,
                    }}
                  >
                    Our Team
                  </Typography>
                </motion.div>
                <motion.div variants={staggerItem}>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ maxWidth: 600, mx: 'auto' }}
                  >
                    Meet the talented individuals who make our success possible.
                  </Typography>
                </motion.div>
              </Box>

              <Grid container spacing={4}>
                {[1, 2, 3, 4].map((member, index) => (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                    <motion.div
                      variants={staggerItem}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card
                        sx={{
                          textAlign: 'center',
                          transition: 'transform 0.2s ease-in-out',
                          '&:hover': {
                            boxShadow: theme.shadows[8],
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <motion.div
                            variants={scaleIn}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Box
                              sx={{
                                width: 120,
                                height: 120,
                                borderRadius: '50%',
                                backgroundColor: 'primary.100',
                                mx: 'auto',
                                mb: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Typography variant="h4" color="primary.main">
                                {String.fromCharCode(65 + index)}
                              </Typography>
                            </Box>
                          </motion.div>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              color: 'text.primary',
                              mb: 1,
                            }}
                          >
                            Team Member {index + 1}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Role Description
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Container>
        </Box>
      </motion.div>
    </Box>
  );
}

'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
} from '../../../utils/animations';
import { useTranslations } from 'next-intl';

export default function TermsOfService() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const t = useTranslations();

  const sections = [
    {
      title: 'Agreement to Terms',
      content: `These Terms of Service ("Terms") constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you"), and AL-Burhan Group ("Company", "we", "us", or "our"), concerning your access to and use of the website and services.

You agree that by accessing the site, you have read, understood, and agree to be bound by all of these Terms. If you do not agree with all of these Terms, then you are expressly prohibited from using the site and you must discontinue use immediately.`,
    },
    {
      title: 'Intellectual Property Rights',
      content: `Unless otherwise indicated, the site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights.

The Content and the Marks are provided on the site "AS IS" for your information and personal use only. Except as expressly provided in these Terms, no part of the site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.`,
    },
    {
      title: 'User Representations',
      content: `By using the site, you represent and warrant that:

• All registration information you submit will be true, accurate, current, and complete
• You will maintain the accuracy of such information and promptly update such registration information as necessary
• You have the legal capacity and you agree to comply with these Terms
• You are not a minor in the jurisdiction in which you reside
• You will not access the site through automated or non-human means, whether through a bot, script, or otherwise
• You will not use the site for any illegal or unauthorized purpose
• Your use of the site will not violate any applicable law or regulation`,
    },
    {
      title: 'Prohibited Activities',
      content: `You may not access or use the site for any purpose other than that for which we make the site available. The site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.

As a user of the site, you agree not to:

• Systematically retrieve data or other content from the site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us
• Make any unauthorized use of the site, including collecting usernames and/or email addresses of users by electronic or other means
• Use the site to advertise or offer to sell goods and services
• Circumvent, disable, or otherwise interfere with security-related features of the site
• Engage in unauthorized framing of or linking to the site
• Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information
• Make improper use of our support services or submit false reports of abuse or misconduct
• Interfere with, disrupt, or create an undue burden on the site or the networks or services connected to the site`,
    },
    {
      title: 'User Generated Contributions',
      content: `The site may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the site.

You understand and acknowledge that you are responsible for any User Contributions you submit or contribute, and you, not the Company, have full responsibility for such content, including its legality, reliability, accuracy, and appropriateness.`,
    },
    {
      title: 'Site Management',
      content: `We reserve the right, but not the obligation, to:

• Monitor the site for violations of these Terms
• Take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms
• Refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof
• Remove from the site or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems
• Otherwise manage the site in a manner designed to protect our rights and property and to facilitate the proper functioning of the site`,
    },
    {
      title: 'Modifications and Interruptions',
      content: `We reserve the right to change, modify, or remove the contents of the site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our site. We also reserve the right to modify or discontinue all or part of the site without notice at any time.

We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the site.

We cannot guarantee the site will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the site, resulting in interruptions, delays, or errors.`,
    },
    {
      title: 'Governing Law',
      content: `These Terms shall be governed by and defined following the laws of Kuwait. AL-Burhan Group and yourself irrevocably consent that the courts of Kuwait shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these Terms.`,
    },
    {
      title: 'Contact Information',
      content: `In order to resolve a complaint regarding the site or to receive further information regarding use of the site, please contact us at:

Email: Info@alburhan-regional.com
Address: Kuwait, Hawally, Tunis Street, Al Refaei Building, 4th Floor, Office 5&6`,
    },
  ];

  return (
    <Box sx={{ flex: 1, minHeight: '100vh', py: { xs: 4, md: 6 }, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          viewport={{ once: true }}
        >
          {/* Header */}
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography
              variant={isMobile ? 'h4' : 'h3'}
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                mb: 2,
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
              }}
            >
              Terms of Service
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </Typography>
          </Box>

          {/* Content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                backgroundColor: 'background.paper',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              {sections.map((section, index) => (
                <motion.div key={index} variants={staggerItem}>
                  <Box sx={{ mb: index < sections.length - 1 ? 4 : 0 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        color: 'primary.main',
                        mb: 2,
                        fontSize: { xs: '1.25rem', md: '1.5rem' },
                      }}
                    >
                      {section.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.primary',
                        lineHeight: 1.8,
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {section.content}
                    </Typography>
                    {index < sections.length - 1 && (
                      <Divider sx={{ mt: 4 }} />
                    )}
                  </Box>
                </motion.div>
              ))}
            </Paper>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
}


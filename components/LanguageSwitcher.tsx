'use client';

import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Box,
  Typography,
  useTheme,
} from '@mui/material';
import { Language, Check } from '@mui/icons-material';
import { useRouter, usePathname } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  // Easy to add more languages in the future:
  // { code: 'de', name: 'German', nativeName: 'Deutsch' },
  // { code: 'zh', name: 'Chinese', nativeName: '中文' },
];

const LanguageSwitcher: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const theme = useTheme();
  const t = useTranslations('common');

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (langCode: string) => {
    router.push(pathname, { locale: langCode });
    handleMenuClose();
  };

  const currentLanguage = languages.find((lang) => lang.code === locale);

  return (
    <>
      <IconButton
        onClick={handleMenuOpen}
        sx={{
          color: 'text.primary',
          '&:hover': {
            backgroundColor: 'primary.50',
            color: 'primary.main',
          },
          transition: 'all 0.3s ease',
        }}
        aria-label="Change language"
      >
        <Language />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 2,
            boxShadow: theme.shadows[8],
            minWidth: 150,
          },
        }}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            selected={locale === language.code}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 1,
              minHeight: 48,
              '&:hover': {
                backgroundColor: 'primary.50',
              },
              '&.Mui-selected': {
                backgroundColor: 'primary.50',
                '&:hover': {
                  backgroundColor: 'primary.100',
                },
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: locale === language.code ? 600 : 400,
                  color: 'text.primary',
                }}
              >
                {language.nativeName}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.75rem',
                }}
              >
                ({language.name})
              </Typography>
            </Box>
            {locale === language.code && (
              <Check sx={{ fontSize: 18, color: 'primary.main' }} />
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSwitcher;


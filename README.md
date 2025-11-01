# AL-Burhani - Responsive Next.js Application

A highly responsive Next.js application built with MUI Material library, Tailwind CSS, and centralized theming.

## Features

- 🎨 **Centralized Theme System**: All colors, spacing, and design tokens are managed from a single theme file
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- 🧩 **Component-Based Architecture**: Reusable Header, Footer, and App components
- 🎯 **MUI Material Integration**: Professional UI components with consistent design
- ⚡ **Tailwind CSS**: Utility-first CSS framework for rapid styling
- 🔧 **TypeScript**: Full type safety throughout the application

## Project Structure

```
al-burhani/
├── app/
│   ├── globals.css          # Global styles with centralized theme variables
│   ├── layout.tsx           # Root layout with MUI theme provider
│   └── page.tsx             # Main homepage with responsive design
├── components/
│   ├── App.tsx              # Main app wrapper with Header and Footer
│   ├── Header.tsx           # Responsive navigation header
│   ├── Footer.tsx           # Comprehensive footer with links and contact info
│   └── MUIThemeProvider.tsx # MUI theme provider wrapper
├── theme/
│   └── theme.ts             # Centralized theme configuration
└── public/                  # Static assets
```

## Theme System

The application uses a centralized theme system located in `theme/theme.ts` that includes:

- **Color Palette**: Primary, secondary, accent, neutral, success, warning, and error colors
- **Spacing**: Consistent spacing scale from xs to 5xl
- **Typography**: Font families, sizes, and weights
- **Breakpoints**: Responsive breakpoints for different screen sizes
- **Shadows**: Consistent shadow system for elevation

### Changing Colors

To change the application's color scheme, simply modify the color values in `theme/theme.ts`:

```typescript
export const theme = {
  colors: {
    primary: {
      500: '#0ea5e9', // Change this to update primary color
      // ... other shades
    },
    // ... other color palettes
  },
};
```

The changes will automatically apply throughout the entire application.

## Responsive Design

The application is built with mobile-first responsive design principles:

- **Mobile (< 768px)**: Single column layout, stacked navigation
- **Tablet (768px - 1024px)**: Two-column layouts, expanded navigation
- **Desktop (> 1024px)**: Multi-column layouts, full navigation menu

### Responsive Utilities

- Uses MUI's `useMediaQuery` hook for responsive behavior
- Tailwind CSS responsive classes for styling
- Flexible Grid system for different screen sizes

## Components

### Header Component
- Responsive navigation with mobile drawer menu
- Logo and navigation links
- Mobile-friendly hamburger menu
- Sticky positioning with backdrop blur

### Footer Component
- Multi-column layout with company information
- Social media links
- Contact information
- Legal links and copyright

### App Component
- Combines Header and Footer
- Provides consistent layout structure
- Manages main content area

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Open Browser**:
   Navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Next.js 16** - React framework
- **React 19** - UI library
- **MUI Material** - Component library
- **Tailwind CSS 4** - Utility-first CSS
- **TypeScript** - Type safety
- **Emotion** - CSS-in-JS for MUI

## Customization

### Adding New Pages
1. Create new page files in the `app/` directory
2. The Header and Footer will automatically be included via the App component

### Modifying Theme
1. Edit `theme/theme.ts` to change colors, spacing, or typography
2. Update `app/globals.css` if you need to modify CSS variables
3. Restart the development server to see changes

### Adding Components
1. Create new components in the `components/` directory
2. Import and use them in your pages
3. Follow the existing component patterns for consistency

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License.
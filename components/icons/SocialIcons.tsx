import * as React from 'react';

type P = React.SVGProps<SVGSVGElement>;

const base: P = {
  viewBox: '0 0 24 24',
  width: '1em',
  height: '1em',
  xmlns: 'http://www.w3.org/2000/svg',
  fill: 'currentColor',
  'aria-hidden': true,
  focusable: false,
};

export function IconFacebook(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.2-1.5 1.5-1.5h1.6V3.6c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.6H8v3.1h2.7V21h2.8z" />
    </svg>
  );
}

export function IconInstagram(props: P) {
  return (
    <svg {...base} {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconLinkedIn(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.86 3.38-1.86 3.61 0 4.28 2.37 4.28 5.46v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export function IconX(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.94l-4.73-6.21L5.8 22H2.54l8.06-9.2L1.5 2h7.12l4.28 5.65L18.24 2zm-1.22 18h1.8L7.08 4H5.15l11.87 16z" />
    </svg>
  );
}

export function IconYouTube(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.6 15.5v-7l6.4 3.5-6.4 3.5z" />
    </svg>
  );
}

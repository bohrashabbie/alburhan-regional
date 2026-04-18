'use client';

import * as React from 'react';
import { LegalPage, type LegalSection } from '@/components/sections/LegalPage';

const SECTIONS: LegalSection[] = [
  {
    title: 'What Are Cookies',
    content: `Cookies are small text files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.

Cookies set by the website owner (in this case, AL-Burhan Group) are called "first-party cookies." Cookies set by parties other than the website owner are called "third-party cookies." Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).`,
  },
  {
    title: 'How We Use Cookies',
    content: `We use cookies for several reasons:

• Essential Cookies: These cookies are essential to provide you with services available through our website and to enable you to use some of its features. Without these cookies, the services that you have asked for cannot be provided, and we only use these cookies to provide you with those services.

• Functionality Cookies: These cookies allow our website to remember choices you make when you use our website, such as remembering your language preference or login details. The purpose of these cookies is to provide you with a more personal experience and to avoid you having to re-enter your preferences every time you use our website.

• Analytics and Performance Cookies: These cookies allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it. This helps us to improve the way our website works, for example, by ensuring that users are finding what they are looking for easily.

• Targeting and Advertising Cookies: These cookies track your browsing habits to enable us to show advertising which is more likely to be of interest to you. These cookies use information about your browsing history to group you with other users who have similar interests.`,
  },
  {
    title: 'Types of Cookies We Use',
    content: `The specific types of first and third-party cookies served through our website and the purposes they perform are described below:

• Strictly Necessary Cookies: These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.

• Performance Cookies: These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.

• Functionality Cookies: These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.

• Targeting Cookies: These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.`,
  },
  {
    title: 'Managing Cookies',
    content: `You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager.

The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.

If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. You may also set or amend your web browser controls to accept or refuse cookies.`,
  },
  {
    title: 'Third-Party Cookies',
    content: `In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website, deliver advertisements on and through the website, and so on.

These third-party cookies may include:

• Google Analytics: We use Google Analytics to analyze the use of our website. Google Analytics gathers information about website use by means of cookies. The information gathered relating to our website is used to create reports about the use of our website.

• Social Media Cookies: These cookies are used to enable you to share pages and content that you find interesting on our website through third-party social networking and other websites.`,
  },
  {
    title: 'Cookie Duration',
    content: `The cookies we use are either:

• Session Cookies: These are temporary cookies that expire at the end of a browser session (when you leave the site). These allow the website to recognize your device as you navigate between pages during a single browser session.

• Persistent Cookies: These cookies remain on your device for the period of time specified in the cookie. They are activated each time you visit the website that created that particular cookie.`,
  },
  {
    title: 'Updates to This Cookie Policy',
    content: `We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.

The date at the top of this Cookie Policy indicates when it was last updated.`,
  },
  {
    title: 'Contact Us',
    content: `If you have any questions about our use of cookies or other technologies, please contact us at:

Email: Info@alburhan-regional.com
Address: Kuwait, Hawally, Tunis Street, Al Refaei Building, 4th Floor, Office 5&6`,
  },
];

export default function CookiesPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <LegalPage
      eyebrow="Legal"
      title="Cookie Policy"
      description="How Al-Burhan Group uses cookies and similar technologies across our website."
      lastUpdated={lastUpdated}
      sections={SECTIONS}
    />
  );
}

import { TNavMeta } from '../interfaces';

// Please do not remove the below comments start with PLOP

const NAV_META: TNavMeta[] = [
  {
    path: 'about',
    title: 'About',
    component: 'about',
    // PLOP_MODIFY_PATTERN_NAV_META-about
  },
  {
    path: 'contact',
    title: 'Contact Us',
    component: 'contact',
    // PLOP_MODIFY_PATTERN_NAV_META-contact
  },
];

export const LOGGED_IN = true;

export const getNavMeta = (isLoggedIn: boolean): TNavMeta[] =>
  NAV_META.filter((nav: TNavMeta) => (nav.isPrivate && isLoggedIn) || !nav.isPrivate);

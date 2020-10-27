import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'DashBoard',
    icon: 'shopping-cart-outline',
    link: '/admin/dashboard',
    home: true,
  },
  {
    title: 'Employee',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },
  {
    title: 'Coaches',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },
  {
    title: 'Clients',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },
  {
    title: 'Events',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },
  {
    title: 'Session',
    icon: 'home-outline',
    link: '/admin/sessions',
  },
  {
    title: 'services',
    icon: 'home-outline',
    link: '/admin/services',
  },
  {
    title: 'Session Reservation',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },
  {
    title: 'Settings',
    icon: 'layout-outline',
    children: [
      {
        title: 'About Us',
        link: '/settings/about-us',
      },
      {
        title: 'Contact Us',
        link: '/settings/about-us',
      }
    ],
  },
  {
    title: 'Reports',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Report 1',
        link: '/pages/forms/inputs',
      }
    ],
  }
];

import { Routes } from '@angular/router';
import { Home } from './layout/home/home';
import { About } from './layout/about/about';
import { Skills } from './layout/skills/skills';
import { Services } from './layout/services/services';
import { Portfolio } from './layout/portfolio/portfolio';
import { Contact } from './layout/contact/contact';
import { AdminDashboard } from './layout/admin-dashboard/admin-dashboard';

export const routes: Routes = [
  {
    path: '',component: Home
  },
  {
    path: 'about',component: About
  },
  {
    path: 'skills',component: Skills
  },
  {
    path: 'services',component: Services
  },
  {
    path: 'portfolio',component: Portfolio
  },
  {
    path: 'contact',component: Contact
  },
  {
    path: 'admin', component: AdminDashboard
  },
  {
    path: '**',redirectTo: ''}
];
import { Commands, Context, Route, Router } from '@vaadin/router';
import './views/main-layout';
import '/views/pickinglist-view'
import 'Frontend/views/portal-view'
import 'Frontend/views/login-view'
import 'views/company-view'
import 'views/movements-view'
import {uiStore} from "Frontend/stores/app-store";
import {autorun} from "mobx";

export type ViewRoute = Route & {
  title?: string;
  icon?: string;
  children?: ViewRoute[];
};

export const views: ViewRoute[] = [
  // place routes below (more info https://hilla.dev/docs/routing)
  {
    path: '/',
    component: 'portal-view',
    icon: '',
    title: 'Home ',
  },
  {
    path: 'pickinglist/:id',
    component: 'pickinglist-view',
    icon: '',
    title: '',
  },
  {
    path: 'movements/:id',
    component: 'movements-view',
    icon: '',
    title: '',
  },
  {
    path: '/company',
    component: 'company-view',
    icon: '',
    title: '',

  },
];
const authGuard = async (context: Context, commands: Commands) => {
  if (!uiStore.loggedIn) {
    // Save requested path
    sessionStorage.setItem('login-redirect-path', context.pathname);
    return commands.redirect('/login');
  }
  return undefined;
};

export const routes: ViewRoute[] = [
  {
    path: 'login',
    component: 'login-view',
  },
  {
    path: 'logout',
    action: (_: Context, commands: Commands) => {
      uiStore.logout();
      return commands.redirect('/login');
    },
  },
  {
    path: '',
    component: 'main-layout',
    children: views,
    action: authGuard,
  },
];

autorun(() => {
  if (uiStore.loggedIn) {
    Router.go(sessionStorage.getItem('login-redirect-path') || '/');
  } else {
    if (location.pathname !== '/login') {
      sessionStorage.setItem('login-redirect-path', location.pathname);
      Router.go('/login');
    }
  }
});

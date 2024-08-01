import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './iterceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideNoopAnimations(),provideAnimations(),provideHttpClient(withInterceptors([authInterceptor]))]
};

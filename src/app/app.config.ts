import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { errorsInterceptor } from './_interceptors/errors.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([errorsInterceptor])),
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule, 
      ToastrModule.forRoot({
        timeOut: 5000, 
        positionClass: 'toast-bottom-right', 
        closeButton: true, 
        progressBar: true, 
      })
    )
  ]
};

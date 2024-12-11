import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { errorsInterceptor } from './_interceptors/errors.interceptor';
import { jwtInterceptor } from './_interceptors/jwt.interceptor';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './_interceptors/loading.interceptor';
import { FileUploadModule } from 'ng2-file-upload';
import { ModalModule } from 'ngx-bootstrap/modal';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(withFetch(), 
      withInterceptors([errorsInterceptor]), 
      withInterceptors([jwtInterceptor]),
      withInterceptors([loadingInterceptor])
    ),
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule,
      NgxSpinnerModule.forRoot({ type: 'line-scale-party' }),
      TabsModule.forRoot(),
      ToastrModule.forRoot({
        timeOut: 5000, 
        positionClass: 'toast-bottom-right', 
        closeButton: true, 
        progressBar: true, 
      }),
      FileUploadModule,
      ModalModule.forRoot()
    )
  ]
};

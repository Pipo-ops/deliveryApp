import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { firebaseConfig } from '../environments/firebase.config';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),

    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimationsAsync('noop'), 
    provideAnimationsAsync()
  ]
};

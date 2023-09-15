import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { EmployeeProductivityDashboardModule } from '@employee-productivity/employee-productivity/dashboard';
import { InMemoryDataService, SharedApiModule } from '@employee-productivity/shared/api';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';

import { SharedDataAccessModule } from '@employee-productivity/shared/data-access';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule, 
    AppRoutingModule, 
    EmployeeProductivityDashboardModule, 
    SharedApiModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 100 }),

    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictActionSerializability: true,
          strictStateImmutability: true,
          strictStateSerializability: true,
        },
      }
    ),
    
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !environment.production,
    }),
    EffectsModule.forRoot([]),
    SharedDataAccessModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

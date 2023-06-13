import { NgModule } from '@angular/core';
import { BrowserModule, provideProtractorTestingSupport } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, provideRouter } from '@angular/router';
import routeConfig from './routes'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HomeComponent
  ],
  providers: [
    provideProtractorTestingSupport(),
    provideRouter(routeConfig)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

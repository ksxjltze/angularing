import { NgModule } from '@angular/core';
import { BrowserModule, provideProtractorTestingSupport } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import routeConfig from './routes';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
  ],
  providers: [
    provideProtractorTestingSupport(),
    provideRouter(routeConfig)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

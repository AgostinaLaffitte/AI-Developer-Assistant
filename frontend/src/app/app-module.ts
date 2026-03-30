import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { InputArea } from './components/input-area/input-area';
import { OutputDisplay } from './components/output-display/output-display';
import { Dashboard } from './components/dashboard/dashboard';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    App,
    InputArea,
    OutputDisplay,
    Dashboard
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
  ],
  providers: [
    provideHttpClient(),
    //provideBrowserGlobalErrorListeners(),
    //provideClientHydration(withEventReplay()),
  ],
  bootstrap: [App]
})
export class AppModule { }

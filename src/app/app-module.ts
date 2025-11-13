import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { UploadComponent } from './components/upload-component/upload-component';
import { provideHttpClient } from '@angular/common/http';
import { ServiceFiles } from './services/ServiceFiles';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './components/menu-component/menu-component';
import { ServiceFutbol } from './services/ServiceFutbol';
import { EquipoComponent } from './components/equipo-component/equipo-component';

@NgModule({
  declarations: [App, UploadComponent, MenuComponent, EquipoComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    ServiceFiles,
    ServiceFutbol,
  ],
  bootstrap: [App],
})
export class AppModule {}

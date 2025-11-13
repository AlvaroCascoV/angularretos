import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { UploadComponent } from './components/upload-component/upload-component';
import { HttpClientModule } from '@angular/common/http';
import { ServiceFiles } from './services/ServiceFiles';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [App, UploadComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners(), ServiceFiles],
  bootstrap: [App],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './components/upload-component/upload-component';
import { EquipoComponent } from './components/equipo-component/equipo-component';

const routes: Routes = [
  { path: '', component: UploadComponent },
  { path: 'equipos/:idequipo', component: EquipoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

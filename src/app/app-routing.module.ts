import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { CreateComponent } from './components/create/create.component';
import { ProyectsComponent } from './components/proyects/proyects.component';
import { ProyectComponent } from './components/proyect/proyect.component';
import { EditComponent } from './components/edit/edit.component';

const appRoutes: Routes = [
  {path: '', component: AboutComponent},
  {path: 'sobre/mi', component: AboutComponent},
  {path: 'proyectos', component: ProyectsComponent},
  {path: 'crear/proyecto', component: CreateComponent},
  {path: 'contacto', component: ContactComponent},
  {path: 'proyecto/:id', component: ProyectComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: '**', component: AboutComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);

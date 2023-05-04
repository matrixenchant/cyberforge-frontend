import { NgModule } from '@angular/core';
import { CanActivate, RouterModule, Routes } from '@angular/router';
import { AssembliesComponent } from './assemblies/assemblies.component';
import { AuthComponent } from './auth/auth.component';
import { ConfiguratorComponent } from './configurator/configurator.component';
import { AuthGuard } from './services/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: 'configurator', component: ConfiguratorComponent, canActivate: [AuthGuard] },
  {path: 'configurator/:id', component: ConfiguratorComponent, canActivate: [AuthGuard] },
  {path: 'assemblies', component: AssembliesComponent}, 
  {path: 'my-assemblies', component: AssembliesComponent, canActivate: [AuthGuard]}, 
  {path: 'auth', component: AuthComponent},
  {path: 'home', component: HomeComponent},
  {path: '**', redirectTo: '/home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

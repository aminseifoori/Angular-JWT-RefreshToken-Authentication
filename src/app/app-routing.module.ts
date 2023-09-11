import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProtectedContentComponent } from './protected-content/protected-content.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/guards/auth,guard';
import { AdminAccessComponent } from './admin-access/admin-access.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'protectedcontent', component: ProtectedContentComponent, canActivate: [AuthGuard]},
  { path: 'admin', component: AdminAccessComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

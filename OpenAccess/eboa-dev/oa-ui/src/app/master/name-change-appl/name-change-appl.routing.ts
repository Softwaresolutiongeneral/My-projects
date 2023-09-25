import { NameChangeApplComponent } from './name-change-appl.component';
import { Routes } from '@angular/router';

//import { OrganisationDetailComponent } from './components/org-detail/org-detail.component';

export const routes: Routes = [
{ path: '', 
  children: [
    { path: '', redirectTo: 'name-change-appl' },
    { path: 'name-change-appl', component: NameChangeApplComponent,  pathMatch: 'full' }
  ]
}
];
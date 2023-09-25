import { NameChangeAppllistComponent } from './name-change-app-list/name-change-app-list.component';
import { NameChangeApplListService } from './name-change-app-list/name-change-app-list.service';
import { NameChangeApplComponent } from './name-change-appl.component';
import { Routes } from '@angular/router';

//import { OrganisationDetailComponent } from './components/org-detail/org-detail.component';

export const routes: Routes = [
{ path: '', 
  children: [
    { path: '', redirectTo: 'name-change-appl' },
    { path: 'name-change-appl', component: NameChangeApplComponent,  pathMatch: 'full' },
    { path:'name-change-appl/name-change-appl-list', component: NameChangeAppllistComponent,pathMatch:'full'},
    { path:'name-change-appl/:serviceNo', component: NameChangeApplComponent,pathMatch:'full'}    
  ]
}
];
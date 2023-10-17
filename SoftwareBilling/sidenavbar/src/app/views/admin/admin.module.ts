import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
import { MatIconModule } from '@angular/material/icon';
import{MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [

    HomeComponent,
       ProfileComponent,
       AboutComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatCardModule, MatIconModule,
    FlexLayoutModule
  ]
})
export class AdminModule { }

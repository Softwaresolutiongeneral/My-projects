import { AuthService } from './views/auth/auth.service';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SideMainNavComponent } from './layouts/side-main-nav/side-main-nav.component';
import { MenuListItemComponent } from './layouts/side-main-nav/ui/menu-list-item/menu-list-item.component';

// Animation
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Layout module
import { LayoutModule } from '@angular/cdk/layout';

// Material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from './views/admin/admin.service';

@NgModule({
  declarations: [
    AppComponent,
    SideMainNavComponent,
    MenuListItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    LayoutModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [AuthService,AdminService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

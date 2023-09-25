import { NameChangeApplComponent } from './name-change-appl.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, 
    MatCheckboxModule, MatChipsModule, MatStepperModule, MatDatepickerModule,
     MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, 
     MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule,
      MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, 
      MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule,
       MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, 
       MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule,
      MatFormFieldModule} from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



import { routes } from './name-change-appl.routing';
//import { OrganisationEvent } from './services/org.event'; 
import { CommonService } from '../../shared/common/common.service';
import { CustomDirective } from '../../shared/services/custom.directive';
import { NameChangeApplService } from './services/name-change-appl.service';
import { CommonUtils } from '../../shared/common/common-utils';
import { BuyersList, DocumentList, NameChangeApplmodel, NewGenDeatils } from '../../../app/transaction/vo/nametransfer';
import { Gc } from '../../grid-connectivity/services/gc';
import { NameChangeAppllistComponent } from './name-change-app-list/name-change-app-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,MatInputModule,
    MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatStepperModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule,
    NgxDatatableModule,
    FormsModule,
    FlexLayoutModule,
    CustomDirective
  ],exports: [ MatFormFieldModule, MatInputModule ],
  declarations: [ 
    NameChangeApplComponent,NameChangeAppllistComponent
    ],
  providers: [ CommonService,CommonUtils,NameChangeApplmodel,DocumentList,BuyersList,
    NewGenDeatils,NameChangeAppllistComponent]
})

export class NameChangeApplModule {
  public static routes = routes;
}

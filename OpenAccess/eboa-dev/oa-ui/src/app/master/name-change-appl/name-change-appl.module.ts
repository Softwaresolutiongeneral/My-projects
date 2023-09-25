import { NameChangeApplComponent } from './name-change-appl.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
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
import { BuyersList, DocumentList, NameChangeApplmodel } from '../vo/nametransfer';
import { Gc } from '../../grid-connectivity/services/gc';
import { ReactiveFormsModule } from '@angular/forms';
import { NameTransferPayment } from '../vo/nametransferpayment';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,MatInputModule,HttpClientModule,
    MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatStepperModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule,
    NgxDatatableModule,ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CustomDirective
  ],exports: [ MatFormFieldModule, MatInputModule ],
  declarations: [ 
    NameChangeApplComponent
    ],
  providers: [ CommonService,CommonUtils,NameChangeApplmodel,NameTransferPayment,DocumentList,BuyersList]
})

export class NameChangeApplModule {
  public static routes = routes;
}

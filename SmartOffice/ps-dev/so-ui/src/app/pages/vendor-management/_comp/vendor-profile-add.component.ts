import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import{VendorService} from '../vendor.service';
import { Partner, PartnerAccountInfo, PartnerContact, PartnerDocument, PartnerEmployee, PartnerGsts } from '../../job/vo/partner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
    selector:'vendor-profile-add',
    templateUrl:'vendor-profile-add.component.html'
})

export class VendorProfileAddComponent implements OnInit{
    partner:Partner;
    partnerContact:PartnerContact;
    msg:any;
    partnerGsts:PartnerGsts;
    form: FormGroup;
    constructor(private router: Router,private route: ActivatedRoute,private vendorService:VendorService,private formBuilder:FormBuilder ){}
ngOnInit(){
   this.partner = new Partner();
   this.partner.partnerContacts=new Array<PartnerContact>();
   this.partner.partnerEmployees=new Array<PartnerEmployee>();
   this.partner.partnerAccountInfos= new Array<PartnerAccountInfo>();
   this.partner.partnerDocuments=new Array<PartnerDocument>();
   this.partner.partnerGsts=new Array<PartnerGsts>();
   this.partnerContact = new PartnerContact();
   this.partnerGsts = new PartnerGsts();
   this.addPartner();
   this.form = this.formBuilder.group({
    GstNo: [null, [Validators.required, Validators.required]],
    refNo: [null, [Validators.required, Validators.required]],
    email: [null, [Validators.required, Validators.required]],
    firstName: [null, [Validators.required, Validators.required]],
    lastName: [null, [Validators.required, Validators.required]],
});
}
addPartner(){
    let ac = new PartnerEmployee();
    let bc = new PartnerAccountInfo();
    let cc = new PartnerDocument();

   this.partner.partnerEmployees.push(ac);
   this.partner.partnerAccountInfos.push(bc);
   this.partner.partnerDocuments.push(cc);
}
    addVendor(){
        
        this.partnerGsts.gstNo=this.partner.gstNo;
        this.partner.partnerGsts.push(this.partnerGsts);    
        console.log(this.partner);
        this.vendorService.addVendor(this.partner).subscribe(x=>{
            this.router.navigateByUrl('vendor/edit/'+x.id);
            this.msg = { type: 'success', text: "Vendor Added successfully" 
            }, error => { 
                this.msg=x;
            }
            });
}
}
import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LeaveApplicationService } from '../hr-leave-approval.service';
import { LeaveType } from '../../../vo/leaveTypes';
import { status_css } from '../../../vo/status'
import { FormControl } from '@angular/forms';

@Component({
    selector: 'view',
    templateUrl: 'leave-approvel-view.component.html'
})

export class LeaveApprovalRequestComponent implements OnInit {
	

		
	las: any;
	active:any=[];
    inactive:any=[];
	allEmployees: any;
	leaveTypes: any;
	currentUser: any;
	binding:any='true';
	statuses:any=status_css;
	page :number = 1;
    pageSize :number = 10;

	startDate:any;
    endDate:any;
	employeeId: any;
    empName:string=null;

    constructor(private router:Router, private route: ActivatedRoute, private _service: LeaveApplicationService){

    }

    ngOnInit() {
		let user = this.currentUser = this._service.getUser();
		this.getAllLeaveSettle();	
    }
	
	
	
	getAllLeaveSettle(){
		this._service.getAllLeaveHistoryHr().subscribe(x=>{

			for(let list of x){				
				if(list.isSettled=='N'){
					this.active.push(list)
				}else{
					this.inactive.push(list)
				}
			}

			this.las = x; 

		});
	}
	
	
	leaveSettle(leaveSettle:LeaveType){
		this._service.LeaveUpdate('hr1-settle',leaveSettle).subscribe(x=>{
			this.active=[];
			this.inactive=[];
			this.getAllLeaveSettle();	
		})
	//	this.router.navigateByUrl("/my-task/leave-approvel/detail/"+id);
   }

   changeView(value){
	this.binding=value;
}
employeeSelected($event) {
	this.employeeId=$event.id;
	this.empName=$event.empName;
}

      search(){
		  this.active=[]; this.inactive=[];
        this._service.advanceSearch(this.employeeId, this.startDate,this.endDate).subscribe(x=>{
		  for(let list of x){				
			if(list.isSettled=='N'){
				this.active.push(list)
			}else{
				this.inactive.push(list)
			}
		}
		this.las = x; 
        })
     }
	 reset(){
		this.active=[]; this.inactive=[];
		 this.employeeId=null;
		 this.startDate=null;
		 this.endDate=null;
		 this.ngOnInit();
	 }
}

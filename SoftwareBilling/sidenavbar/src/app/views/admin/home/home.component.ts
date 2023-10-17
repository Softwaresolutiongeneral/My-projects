import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


const ChartColors: any[] = [{
  backgroundColor:["#3f51b5", "#85144B", "#5B481A", "#FF4136", "#3D9970", "#FF851B", "#B10DC9", "#111111", "#01FF70", "#FFDC00", "#FF4136", "#001F3F"] 
    }];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	 role:any;
	 roleId:any;
	chartColors: any = ChartColors;
	constructor(private route: ActivatedRoute, private router: Router,private service:AdminService) {	}

  ngOnInit(): void {

	this.role=localStorage.getItem("role");
	console.log(this.role);
	 
	this.service.getRoleID(this.role).subscribe((x:any)=>{
		console.log(x);
		this.roleId=x;	
		
	})
  }

}

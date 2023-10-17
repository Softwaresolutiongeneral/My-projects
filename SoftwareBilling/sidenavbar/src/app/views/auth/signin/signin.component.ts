import { AuthService } from './../auth.service';
import { User } from './../model/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  images = [
    "assets/images/Image1.jpg",
    "assets/images/Image2.jpg",
    "assets/images/slide3.jpg",
  ];
  currentIndex = 0;
  user:any=User;
  data:any;
  constructor(
    private router: Router, private service:AuthService
  ) { }

  ngOnInit(): void {
    this.user= new User();
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 3000);
  }

  signin()  {
    this.service.login(this.user).subscribe(x=>{
      this.data=x;
      if(x=='x'){
        alert("Please check your username and password");
      }
      console.log(this.data);
      
    })
  }

  signUp(){
     this.router.navigate(['/signup']);
     
  }

}

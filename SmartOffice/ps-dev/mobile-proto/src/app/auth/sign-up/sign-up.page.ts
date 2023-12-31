import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  model:any={};
  users:any;
  passwordType:string;
  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }
  showPassword(){
    if(this.passwordType === 'text'){
      this.passwordType = 'password';
    }else{
      this.passwordType = 'text';
    }
  }

}

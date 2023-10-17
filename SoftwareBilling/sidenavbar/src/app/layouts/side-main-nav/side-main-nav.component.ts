import { Component, OnDestroy } from '@angular/core';
import { NavItem } from './ui/model/nav-item';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/views/admin/admin.service';

@Component({
  selector: 'app-side-main-nav',
  templateUrl: './side-main-nav.component.html',
  styleUrls: ['./side-main-nav.component.scss']
})
export class SideMainNavComponent implements OnDestroy {

  public opened = true;
  private mediaWatcher: Subscription;
  public menu: NavItem[]=[];
  role:any;
  roleId:any;

  constructor(
    private media: MediaObserver,
    private router: Router,private service:AdminService
    ) {
    this.mediaWatcher = this.media.asObservable().pipe(
      filter((changes: MediaChange[]) => changes.length > 0),
      map((changes: MediaChange[]) => changes[0])
      )
      .subscribe((mediaChange: MediaChange) => {
        this.handleMediaChange(mediaChange);
      });
      this.role=localStorage.getItem("role");
      console.log(this.role);
 
      this.service.getRoleID(this.role).subscribe((x:any)=>{
        console.log(x);
        this.roleId=x.id;	
        this.service.getMenu(this.roleId).subscribe((x:any)=>{
           this.menu=x;
           for (const menuItem of this.menu) {
            if (menuItem.landingpage === null) {
              menuItem.landingpage = "home";
            }
          }
          
           console.log(this.menu);
           const index = this.menu.findIndex(item => item.menuId === 11);
            if (index !== -1) {
              const element = this.menu.splice(index, 1)[0];
                 this.menu.unshift(element);
              }
           })
      })
      
    }

        private handleMediaChange(mediaChange: MediaChange): void {
          if (this.media.isActive('lt-md')) {
            this.opened = false;
          } else {
            this.opened = true;
          }
        }

        ngOnDestroy(): void {
          this.mediaWatcher.unsubscribe();
        }

        signout() {
          localStorage.clear();
          this.router.navigate(['/signin'])
        }
}

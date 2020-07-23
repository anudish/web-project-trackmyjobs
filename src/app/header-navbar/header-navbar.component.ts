import { NotificationServiceService } from './../job-board/notification-service.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.css']
})
export class HeaderNavbarComponent implements OnInit {

  isAuthenticated:boolean = false;
  userSub:Subscription;
  notificationCount=0;
  listOfNotification:any


  home = 'Home';
  blog = 'Blogs';
  jobs = 'Jobs';
  contact = 'Contact';
  about = 'About';
  sign_in_btn = "Sign in";
  sign_up_btn = "Sign up";
  writeBlog="Write blogs";
  analysis = "Analysis";
  job_board = "Job Board";
  job_activity = "Job Activity";

  constructor(private authService: AuthService,private notificationService:NotificationServiceService){}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = user ? true : false;

     if(this.isAuthenticated)
     {
      this. showNotificationCount();
     }
    })
  }

  onLogout(){
    this.authService.logOut();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

  showNotificationCount(){
    this.notificationService.get_deadline_notificatione(101).subscribe(res=>{
 
      this.listOfNotification =res;
      this.notificationCount=this.listOfNotification.length;
    });
   
  }
}

import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor( private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onLoadServers(){
    // some work
    this.router.navigate(['/servers'])
  }

  onLoadServer(id : number){
    // some work
    this.router.navigate(['/servers', id, 'edit'], {queryParams:{allowEdit: 1}, fragment: 'loading'})
  }

  login(){
    this.authService.login();
  }
  logout(){
    this.authService.logout();
  }

}

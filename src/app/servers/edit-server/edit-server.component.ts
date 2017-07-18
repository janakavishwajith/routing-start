import { Observable } from 'rxjs/Observable';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
 
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService, 
    private activatedRoute : ActivatedRoute,
    private router : Router) { }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.queryParams)
    console.log(this.activatedRoute.snapshot.fragment)
    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        this.allowEdit = ( params['allowEdit'] === '1' );
      }
    );

    const id = this.activatedRoute.snapshot.params['id'];
    console.log(id);
    this.server = this.serversService.getServer(+id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;

    this.router.navigate(['../', {relativeTo : this.activatedRoute}]);
  }

   canDeactivate(): boolean | Observable<boolean> | Promise<boolean>{
     if( !this.allowEdit ){
       return true;
     }
      if( ( this.serverName !== this.server.name || this.serverStatus !== this.server.status ) && 
        !this.changesSaved )
      {
        confirm("Do you really want to discard changes?")
      }
      else{
        return true;
      }
      
   }

}

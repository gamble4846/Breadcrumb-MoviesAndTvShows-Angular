import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Services/CommonServices/common.service';
import { CustomNotificationService } from 'src/app/Services/CustomNotification/custom-notification.service';
import { LocalBaseService } from 'src/app/Services/LocalBase/local-base.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menuOpen:boolean = false;

  menuData:any = [
    {name:"Home", route:"/Home"},
    {name:"Movies", route:"/Movies"},
    {name:"TvShows", route:"/TvShows"},
    {name:"Settings", route:"/Settings"},
    {name:"Search", route:"/Search"},
    {name:"Admin", route:"/Admin"},
    {name:"Refresh Data", route:"justRefreshData"}
  ];

  constructor(private _cs:CommonService, private LocalBase: LocalBaseService, private CustomNotification: CustomNotificationService) { }

  ngOnInit(): void {
  }

  OpenMenu(){
    this.menuOpen = true;
  }

  CloseMenu(){
    this.menuOpen = false;
  }

  OpenRoute(menu:any){
    if(menu.route == "justRefreshData"){
      this.RefreshData();
    }
    else{
      this._cs.ChangePage(menu.route);
    }
  }

  RefreshData(){
    this.LocalBase.SaveMoviesFromSheetAndToLocalBase().subscribe((response:any) => {
      this.CustomNotification.SmallMessage("success","Movies Updated");
    });

    this.LocalBase.SaveTvShowsFromSheetAndToLocalBase().subscribe((response:any) => {
      this.CustomNotification.SmallMessage("success","TvShows Updated");
    });
  }
}

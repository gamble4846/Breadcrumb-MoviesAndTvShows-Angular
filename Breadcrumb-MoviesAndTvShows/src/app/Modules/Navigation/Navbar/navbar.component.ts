import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Services/CommonServices/common.service';

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
    {name:"Admin", route:"/Admin"}
  ];

  constructor(private _cs:CommonService) { }

  ngOnInit(): void {
  }

  OpenMenu(){
    this.menuOpen = true;
  }

  CloseMenu(){
    this.menuOpen = false;
  }

  OpenRoute(menu:any){
    this._cs.ChangePage(menu.route);
  }
}

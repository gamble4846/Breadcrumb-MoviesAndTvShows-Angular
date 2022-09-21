import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Services/CommonServices/common.service';
import { LocalBaseService } from 'src/app/Services/LocalBase/local-base.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private LocalBase: LocalBaseService, private _cs:CommonService) { }

  ngOnInit(): void {
    this.LocalBase.SaveMoviesFromSheetAndToLocalBase().subscribe((response:any) => { console.log(response); });
    this.LocalBase.SaveTvShowsFromSheetAndToLocalBase().subscribe((response:any) => { console.log(response); });
  }

}

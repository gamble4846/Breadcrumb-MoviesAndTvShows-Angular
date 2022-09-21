import { Component } from '@angular/core';
import { CommonService } from './Services/CommonServices/common.service';
import { LocalBaseService } from './Services/LocalBase/local-base.service';
import { SessionManagementService } from './Services/SessionManagement/session-management.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Breadcrumb Movies And TvShows';

  constructor(private SessionManagement: SessionManagementService, private LocalBase: LocalBaseService, private _cs:CommonService) { }

  ngOnInit(): void {
    let saveObj = {
      DecryptionKey:"admin123#$Jay",
      GoogleAPIKey:"AIzaSyC_vYeUmpPU3o2qa-SHIvM87hmZJugT50Y",
      ScriptsLink:"https://script.google.com/macros/s/AKfycbzNxG4eQtCwgtATygH4hO6-wzRYn9_CxAl4nDZC7NKvFQWUlPfLWsEFuoDW1JJdGjCM/exec"
    }
    this.SessionManagement.SaveToSettingsLocal(JSON.stringify(saveObj));

    this._cs.GetTvShowTitlesFromGenre("Animation").subscribe((response:any) => {
      console.log(this._cs.ArrayShuffle(response));
    });
  }
}

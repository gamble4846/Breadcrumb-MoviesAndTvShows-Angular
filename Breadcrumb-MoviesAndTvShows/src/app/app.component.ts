import { Component } from '@angular/core';
import { LocalBaseService } from './Services/LocalBase/local-base.service';
import { SessionManagementService } from './Services/SessionManagement/session-management.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Breadcrumb Movies And TvShows';

  constructor(private SessionManagement: SessionManagementService, private LocalBase: LocalBaseService) { }

  ngOnInit(): void {
    let saveObj = {
      DecryptionKey:"admin123#$Jay",
      GoogleAPIKey:"AIzaSyC_vYeUmpPU3o2qa-SHIvM87hmZJugT50Y",
      ScriptsLink:"https://script.google.com/macros/s/AKfycbzNxG4eQtCwgtATygH4hO6-wzRYn9_CxAl4nDZC7NKvFQWUlPfLWsEFuoDW1JJdGjCM/exec"
    }
    this.SessionManagement.SaveToSettingsLocal(JSON.stringify(saveObj));

    this.LocalBase.GetEpisodeLinksFromLocalByServerIdAndEpisodeId("1mARC5FKqZas9sBg0FrRJJnc4v-U0Bj70bLG7Dt8eNFA",3).subscribe((response:any) => {
      console.log(response);
    });
  }
}

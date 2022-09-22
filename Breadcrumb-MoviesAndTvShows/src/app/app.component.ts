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
  }
}

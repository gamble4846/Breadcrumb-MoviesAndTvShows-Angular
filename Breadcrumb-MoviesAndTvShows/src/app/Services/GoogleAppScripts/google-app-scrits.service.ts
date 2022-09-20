import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionManagementService } from '../SessionManagement/session-management.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleAppScritsService {

  apiLink:string = "";

  constructor(private sessionManagement: SessionManagementService, private http: HttpClient) {
    this.apiLink = this.sessionManagement.GetSettingsFromLocal("ScriptsLink");
    if(!this.apiLink){
      this.apiLink = "";
    }
  }

  getOptions(){
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return options;
  }

  GetMovies(){
    console.log("GoogleAppScritsService - GetMovies");
    var body ={
      "method": "GET",
      "Action": "MOVIES"
    };
    return this.http.post(this.apiLink, body, this.getOptions());
  }

  GetTvshows(){
    console.log("GoogleAppScritsService - GetTvshows");
    var body ={
      "method": "GET",
      "Action": "TVSHOWS"
    };
    return this.http.post(this.apiLink, body, this.getOptions());
  }
}

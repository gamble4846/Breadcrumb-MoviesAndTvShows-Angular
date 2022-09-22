import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Services/CommonServices/common.service';
import { LocalBaseService } from 'src/app/Services/LocalBase/local-base.service';
import { SessionManagementService } from 'src/app/Services/SessionManagement/session-management.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  carouselDataWithGenre:any = [];
  carouselDataWithGenreToDisplay:any = [];

  constructor(private SessionManagement: SessionManagementService, private LocalBase: LocalBaseService, private _cs:CommonService) { }

  ngOnInit(): void {
    try{
      this.setUpMoviePageTitles();
    }
    catch(ex){}
  }

  setUpMoviePageTitles(){
    this._cs.ShowFullPageLoader();
    this._cs.GetTvShowsWithGenreFormat().subscribe((response:any) => {
      this.carouselDataWithGenre = this.carouselDataWithGenre.concat(response);
      this.carouselDataWithGenreToDisplay = [...this.carouselDataWithGenre];
      this._cs.HideFullPageLoader();
    });
  }

  carouselItemClicked(event:any,MovieOrTvShow:any){
    if(MovieOrTvShow == "Movie"){
      this._cs.OpenMoive(event.otherData.ServerId,event.otherData.Movies_Id);
    }
    else if(MovieOrTvShow == "TvShow"){
      this._cs.OpenTvShow(event.otherData.ServerId,event.otherData.Series_Id);
    }
    console.log(event,MovieOrTvShow);
  };

}

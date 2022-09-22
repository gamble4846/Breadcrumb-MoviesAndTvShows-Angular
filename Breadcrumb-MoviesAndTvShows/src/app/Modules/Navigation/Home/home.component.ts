import { Component, OnInit } from '@angular/core';
import { carouselData } from 'src/app/gs-lib/carousel/carouselData.model';
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
  AllMovieGenre:any;
  AllTvShowGenre:any;
  onErrorImageLink:string = `https://lh3.googleusercontent.com/pw/AL9nZEWqLCv7P3AFK1FNr_qwohZgkup1TER-mOHfQPAt6IglASRtgadX_qfCuVPZQxr2hmYmyKEdbTtqt8nGZiRaWY3UyHolj2vNm8BY7UwBwzXQhtQtbltOEFjBUwaF4n43DIw0IiRpNBlnkfpAZPAgeq3aFg=w1588-h893-no?authuser=0`;

  constructor(private SessionManagement: SessionManagementService, private LocalBase: LocalBaseService, private _cs:CommonService) { }

  ngOnInit(): void {
    try{
      this.setUpMainpageTitles();
    }
    catch(ex){}
  }

  setUpMainpageTitles(){
    let titlesCount = 0;
    this._cs.ShowFullPageLoader();
    this._cs.GetMoviesWithGenreFormat().subscribe((response:any) => {
      this.carouselDataWithGenre = this.carouselDataWithGenre.concat(response);
      titlesCount++;
      if(titlesCount == 2){
        this.carouselDataWithGenre = this._cs.ArrayShuffle(this.carouselDataWithGenre);
        this.carouselDataWithGenreToDisplay = [...this.carouselDataWithGenre];
        this._cs.HideFullPageLoader();
      }
    });
    this._cs.GetTvShowsWithGenreFormat().subscribe((response:any) => {
      this.carouselDataWithGenre = this.carouselDataWithGenre.concat(response);
      titlesCount++;
      if(titlesCount == 2){
        this.carouselDataWithGenre = this._cs.ArrayShuffle(this.carouselDataWithGenre);
        this.carouselDataWithGenreToDisplay = [...this.carouselDataWithGenre];
        this._cs.HideFullPageLoader();
      }
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

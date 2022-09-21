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
  AllMovieGenre:any;
  AllTvShowGenre:any;

  constructor(private SessionManagement: SessionManagementService, private LocalBase: LocalBaseService, private _cs:CommonService) { }

  ngOnInit(): void {
    try{
      this.setUpMainpageTitles();
    }
    catch(ex){}
  }

  setUpMainpageTitles(){
    this._cs.GetListOfAllGenreMovies().subscribe((movieGenre:any) => {
      this._cs.GetListOfAllGenreTvShow().subscribe((tvShowGenre:any) => {
        this.AllMovieGenre = this._cs.ArrayShuffle(movieGenre);
        this.AllTvShowGenre = this._cs.ArrayShuffle(tvShowGenre);

        this.AllMovieGenre.forEach((movieGenre:any) => {
          this._cs.GetMovieTitlesFromGenre(movieGenre).subscribe((currentMovieTitles:any) => {
            let fullCarouselData:any = [];
            currentMovieTitles.forEach((title:any) => {
              let carouselData:carouselData = {
                title: title.Movies_MainName,
                imageLink: title.Movies_Poster,
                id: title.Movies_Id
              }
              fullCarouselData.push(carouselData);
            });
            let currentCarouselDataWithGenre = {
              "genre": movieGenre,
              "data": this._cs.ArrayShuffle(fullCarouselData),
              "movieOrTvShow": "Movie"
            }
            this.carouselDataWithGenre.push(currentCarouselDataWithGenre);
            this.CheckIfGettingDataIsCompleted();
          })
        });

        this.AllTvShowGenre.forEach((tvshowGenre:any) => {
          this._cs.GetTvShowTitlesFromGenre(tvshowGenre).subscribe((currentTvShowTitles:any) => {
            let fullCarouselData:any = [];
            currentTvShowTitles.forEach((title:any) => {
              let carouselData:carouselData = {
                title: title.Series_MainName,
                imageLink: title.Series_Poster,
                id: title.Series_Id
              }
              fullCarouselData.push(carouselData);
            });
            let currentCarouselDataWithGenre = {
              "genre": tvshowGenre,
              "data": this._cs.ArrayShuffle(fullCarouselData),
              "movieOrTvShow": "TvShow"
            }
            this.carouselDataWithGenre.push(currentCarouselDataWithGenre);
            this.CheckIfGettingDataIsCompleted();
          })
        });
      });
    });
  }

  CheckIfGettingDataIsCompleted(){
    if(this.AllMovieGenre.length + this.AllTvShowGenre.length == this.carouselDataWithGenre.length){
      console.log("completed");
      this.carouselDataWithGenre = this._cs.ArrayShuffle(this.carouselDataWithGenre);
      console.log(this.carouselDataWithGenre);
    }
  }

  carouselItemClicked(event:any){

  };


}

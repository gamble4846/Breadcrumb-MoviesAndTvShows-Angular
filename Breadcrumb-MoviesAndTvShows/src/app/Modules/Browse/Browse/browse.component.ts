import { Component, OnInit } from '@angular/core';
import { option } from 'src/app/gs-lib/select/selectData.model';
import { CommonService } from 'src/app/Services/CommonServices/common.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  searchText:string = "";

  movieGenreALL:any = [];
  tvShowGenreALL:any = [];
  movieReleaseYearsALL:any =[];
  tvShowReleaseYearsALL:any =[];

  movieGenreSelectData:Array<option> = [];
  tvShowGenreSelectData:Array<option> = [];
  finalGenereSelectData:Array<option> = [];
  sortingMethodSelectData:Array<option> = [];
  sortingDirectionSelectData:Array<option> = [];
  movieOrTvshowSelectData:Array<option> = [];
  movieReleaseYearsSelectData:Array<option> = [];
  tvShowReleaseYearsSelectData:Array<option> = [];
  finalReleaseYearsSelectData:Array<option> = [];

  constructor(private _cs:CommonService) { }

  ngOnInit(): void {
    this.getRequiredData();
  }

  searchClicked(){
    console.log(this.searchText);
  }

  getRequiredData(){
    this._cs.ShowFullPageLoader();
    let totalCalls = 4;
    let completedCalls = 0;
    this._cs.GetListOfAllGenreMovies().subscribe((response:any) => {
      this.movieGenreALL = response;
      completedCalls++;
      if(completedCalls >= totalCalls){ this.getRequiredDataCompleted(); }
    })

    this._cs.GetListOfAllGenreTvShow().subscribe((response:any) => {
      this.tvShowGenreALL = response;
      completedCalls++;
      if(completedCalls >= totalCalls){ this.getRequiredDataCompleted(); }
    })

    this._cs.GetListOfAllReleaseYearsMovies().subscribe((response:any) =>{
      this.movieReleaseYearsALL = response;
      completedCalls++;
      if(completedCalls >= totalCalls){ this.getRequiredDataCompleted(); }
    })

    this._cs.GetListOfAllReleaseYearsTvShow().subscribe((response:any) =>{
      this.tvShowReleaseYearsALL = response;
      completedCalls++;
      if(completedCalls >= totalCalls){ this.getRequiredDataCompleted(); }
    })
  }

  getRequiredDataCompleted(){
    this._cs.HideFullPageLoader();

    console.log(this.movieGenreALL);
    console.log(this.tvShowGenreALL);
    console.log(this.movieReleaseYearsALL);
    console.log(this.tvShowReleaseYearsALL);

    this.SetDataForSelects();
  }

  SetDataForSelects(){
    //#region finalGenereSelectData
    this.movieGenreALL.forEach((movieGenre:any) => {
      this.movieGenreSelectData.push({
        value: movieGenre,
        text: movieGenre,
        checked: true
      })
    });

    this.tvShowGenreALL.forEach((tvShowGenre:any) => {
      this.tvShowGenreSelectData.push({
        value: tvShowGenre,
        text: tvShowGenre,
        checked: true
      })
    });

    this.finalGenereSelectData = [...this.movieGenreSelectData];
    //#endregion

    //#region sortingMethodSelectData
    this.sortingMethodSelectData.push({
      value: "Latest",
      text: "Latest",
      checked: true
    });

    this.sortingMethodSelectData.push({
      value: "Year",
      text: "Year",
      checked: false
    });

    this.sortingMethodSelectData.push({
      value: "ABC",
      text: "ABC",
      checked: false
    });

    this.sortingMethodSelectData = [...this.sortingMethodSelectData];
    //#endregion

    //#region sortingDirectionSelectData
    this.sortingDirectionSelectData.push({
      value: "Ascending",
      text: "Ascending",
      checked: false
    });

    this.sortingDirectionSelectData.push({
      value: "Descending",
      text: "Descending",
      checked: true
    });

    this.sortingDirectionSelectData = [...this.sortingDirectionSelectData];
    //#endregion

    //#region movieOrTvshowSelectData
    this.movieOrTvshowSelectData.push({
      value: "Movies",
      text: "Movies",
      checked: true
    });

    this.movieOrTvshowSelectData.push({
      value: "TvShows",
      text: "TvShows",
      checked: false
    });

    this.movieOrTvshowSelectData = [...this.movieOrTvshowSelectData];
    //#endregion

    //#region finalReleaseYearsSelectData
    this.movieReleaseYearsALL.forEach((movieReleaseYear:any) => {
      this.movieReleaseYearsSelectData.push({
        value: movieReleaseYear,
        text: movieReleaseYear,
        checked: true
      })
    });

    this.tvShowReleaseYearsALL.forEach((tvShowReleaseYear:any) => {
      this.tvShowReleaseYearsSelectData.push({
        value: tvShowReleaseYear,
        text: tvShowReleaseYear,
        checked: true
      })
    });

    this.finalReleaseYearsSelectData = [...this.movieReleaseYearsSelectData];
    //#endregion
  }
}

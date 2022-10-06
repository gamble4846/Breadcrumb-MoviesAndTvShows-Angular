import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalBaseService } from '../LocalBase/local-base.service';
import { carouselData } from '../../../../src/app/gs-lib/carousel/carouselData.model';
import { SessionManagementService } from  '../../Services/SessionManagement/session-management.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private LocalBase: LocalBaseService, private router:Router, private SessionManagement: SessionManagementService) { }

  onlyUnique(value:any, index:any, self:any) {
    return self.indexOf(value) === index;
  }

  GetListOfAllGenreMovies(){
    let finalData = new Observable((observer:any) => {
      this.LocalBase.GetMoviesTitlesFromLocal().subscribe((response:any) => {
        let allGenre:any = [];
        response.forEach((data:any) => {
          allGenre = allGenre.concat(data.Movies_Genre.split(","));
        });
        allGenre = allGenre.map((x:any) => x = x.trim());
        allGenre = allGenre.filter(this.onlyUnique);
        observer.next(allGenre);
        observer.complete();
      });
    })
    return finalData;
  }

  GetListOfAllGenreTvShow(){
    let finalData = new Observable((observer:any) => {
      this.LocalBase.GetTvshowTitlesFromLocal().subscribe((response:any) => {
        let allGenre:any = [];
        response.forEach((data:any) => {
          allGenre = allGenre.concat(data.Series_Genre.split(","));
        });
        allGenre = allGenre.map((x:any) => x = x.trim());
        allGenre = allGenre.filter(this.onlyUnique);
        observer.next(allGenre);
        observer.complete();
      });
    })
    return finalData;
  }

  GetMovieTitlesFromGenre(genre:any){
    let finalData = new Observable((observer:any) => {
      this.LocalBase.GetMoviesTitlesFromLocal().subscribe((response:any) => {
        response = response.filter((x:any) => x.Movies_Genre.includes(genre));
        observer.next(response);
        observer.complete();
      });
    })
    return finalData;
  }

  GetTvShowTitlesFromGenre(genre:any){
    let finalData = new Observable((observer:any) => {
      this.LocalBase.GetTvshowTitlesFromLocal().subscribe((response:any) => {
        response = response.filter((x:any) => x.Series_Genre.includes(genre));
        observer.next(response);
        observer.complete();
      });
    })
    return finalData;
  }

  ArrayShuffle(array:any) {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  ChangePage(route:string){
    this.router.navigate([route]);
  }

  ShowFullPageLoader(textToShowUnder:any = null){
    if(textToShowUnder){
      let x:any = document.getElementById("fullPageLoaderText");
      x.innerHTML = textToShowUnder;
    }
    else{
      let x:any = document.getElementById("fullPageLoaderText");
      x.innerHTML = "";
    }
    document.getElementById("fullPageLoaderContainer")?.classList.add("show");
  }

  HideFullPageLoader(){
    document.getElementById("fullPageLoaderContainer")?.classList.remove("show");
  }

  GetMoviesWithGenreFormat(){
    let finalData = new Observable((observer:any) => {
      let carouselDataWithGenreMovie:any = [];
      this.GetListOfAllGenreMovies().subscribe((movieGenre:any) => {
        let AllMovieGenre = this.ArrayShuffle(movieGenre);

        AllMovieGenre.forEach((movieGenre:any) => {
          this.GetMovieTitlesFromGenre(movieGenre).subscribe((currentMovieTitles:any) => {
            let fullCarouselData:any = [];
            currentMovieTitles.forEach((title:any) => {
              let carouselData:carouselData = {
                title: title.Movies_MainName,
                imageLink: title.Movies_Poster,
                id: title.Movies_Id,
                otherData: title
              }
              fullCarouselData.push(carouselData);
            });
            let currentCarouselDataWithGenre = {
              "genre": movieGenre,
              "data": this.ArrayShuffle(fullCarouselData),
              "movieOrTvShow": "Movie"
            }
            carouselDataWithGenreMovie.push(currentCarouselDataWithGenre);
            if(AllMovieGenre.length == carouselDataWithGenreMovie.length){
              carouselDataWithGenreMovie = this.ArrayShuffle(carouselDataWithGenreMovie);
              observer.next(carouselDataWithGenreMovie);
              observer.complete();
            }
          })
        });
      });
    })
    return finalData;
  }

  GetTvShowsWithGenreFormat(){
    let finalData = new Observable((observer:any) => {
      let carouselDataWithGenreTvShow:any = [];
      this.GetListOfAllGenreTvShow().subscribe((tvShowGenre:any) => {
        let AllTvShowGenre = this.ArrayShuffle(tvShowGenre);

        AllTvShowGenre.forEach((tvshowGenre:any) => {
          this.GetTvShowTitlesFromGenre(tvshowGenre).subscribe((currentTvShowTitles:any) => {
            let fullCarouselData:any = [];
            currentTvShowTitles.forEach((title:any) => {
              let carouselData:carouselData = {
                title: title.Series_MainName,
                imageLink: title.Series_Poster,
                id: title.Series_Id,
                otherData: title
              }
              fullCarouselData.push(carouselData);
            });
            let currentCarouselDataWithGenre = {
              "genre": tvshowGenre,
              "data": this.ArrayShuffle(fullCarouselData),
              "movieOrTvShow": "TvShow"
            }
            carouselDataWithGenreTvShow.push(currentCarouselDataWithGenre);
            if(AllTvShowGenre.length == carouselDataWithGenreTvShow.length){
              carouselDataWithGenreTvShow = this.ArrayShuffle(carouselDataWithGenreTvShow);
              observer.next(carouselDataWithGenreTvShow);
              observer.complete();
            }
          })
        });
      });
    })
    return finalData;
  }

  OpenMoive(ServerId:any, MovieId:any){
    this.router.navigate(['/Movies/Home', ServerId, MovieId]);
  }

  OpenSettings(){
    this.router.navigate(['/Settings']);
  }

  OpenTvShow(ServerId:any, TvShowId:any){
    this.router.navigate(['/TvShows/Home', ServerId, TvShowId]);
  }

  OpenLink(link:string){
    window.open(link);
  }

  CopyToClipboard(data:string){
    navigator.clipboard.writeText(data);
  }

  CreateDirectLinkFromLink(link:string){
    let justID = link.split("/")[5];
    let finalLink = "https://www.googleapis.com/drive/v3/files/"+justID+"?alt=media&key=" + this.SessionManagement.GetSettingsFromLocal("GoogleAPIKey");
    return finalLink;
  }

  GetListOfAllReleaseYearsMovies(){
    let finalData = new Observable((observer:any) => {
      this.LocalBase.GetMoviesTitlesFromLocal().subscribe((response:any) => {
        let allReleaseYears:any = [];
        response.forEach((data:any) => {
          allReleaseYears = allReleaseYears.concat(data.Movies_ReleaseYear.toString());
        });
        allReleaseYears = allReleaseYears.filter(this.onlyUnique);
        observer.next(allReleaseYears);
        observer.complete();
      });
    })
    return finalData;
  }

  GetListOfAllReleaseYearsTvShow(){
    let finalData = new Observable((observer:any) => {
      this.LocalBase.GetTvshowTitlesFromLocal().subscribe((response:any) => {
        let allReleaseYears:any = [];
        response.forEach((data:any) => {
          allReleaseYears = allReleaseYears.concat(data.Series_ReleaseYear.toString());
        });
        allReleaseYears = allReleaseYears.filter(this.onlyUnique);
        observer.next(allReleaseYears);
        observer.complete();
      });
    })
    return finalData;
  }

}

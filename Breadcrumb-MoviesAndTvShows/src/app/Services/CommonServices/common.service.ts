import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalBaseService } from '../LocalBase/local-base.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private LocalBase: LocalBaseService, private router:Router) { }

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
}

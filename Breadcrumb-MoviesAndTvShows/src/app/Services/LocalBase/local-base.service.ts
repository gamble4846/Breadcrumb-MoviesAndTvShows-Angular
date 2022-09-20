import { Injectable } from '@angular/core';
//@ts-ignore
import Localbase from 'localbase';
import { Observable } from 'rxjs';
import { GoogleAppScritsService } from '../GoogleAppScripts/google-app-scrits.service';

@Injectable({
  providedIn: 'root'
})
export class LocalBaseService {
  db:any;
  constructor(public GoogleAppScripts: GoogleAppScritsService) {
    this.db = new Localbase('BreadCrumb-Folders-Files-DB');
  }

  SaveMoviesFromSheetAndToLocalBase(){
    let finalData = new Observable((observer:any) => {
      this.GoogleAppScripts.GetMovies().subscribe((response:any) => {
        if(response.status == "200"){
          let dataToAdd = {datas:response.data};
          this.db.collection('Movies').delete().then((resultLBDEL:any) => {
            this.db.collection('Movies').add(dataToAdd).then((resultLBADD:any) => {
              observer.next(true);
              observer.complete();
            });
          });
        }
        else{
          observer.next(false);
          observer.complete();
        }
      },
      (error) => {
        observer.next(false);
        observer.complete();
      });
    });
    return finalData;
  }

  SaveTvShowsFromSheetAndToLocalBase(){
    let finalData = new Observable((observer:any) => {
      this.GoogleAppScripts.GetTvshows().subscribe((response:any) => {
        if(response.status == "200"){
          let dataToAdd = {datas:response.data};
          this.db.collection('TvShows').delete().then((resultLBDEL:any) => {
            this.db.collection('TvShows').add(dataToAdd).then((resultLBADD:any) => {
              observer.next(true);
              observer.complete();
            });
          });
        }
        else{
          observer.next(false);
          observer.complete();
        }
      },
      (error) => {
        observer.next(false);
        observer.complete();
      });
    });

    return finalData;
  }

  GetMoviesTitlesFromLocal(){
    let finalData = new Observable((observer:any) => {
      this.db.collection('Movies').get().then((resultGET:any) => {
        let allTitles:any = [];
        resultGET[0].datas.forEach((data:any) => {
          data.Data.Titles.map((x:any) => x.ServerId = data.ServerID);
          allTitles = allTitles.concat(data.Data.Titles);
        });
        observer.next(allTitles);
        observer.complete();
      });
    })
    return finalData;
  }

  GetTvshowTitlesFromLocal(){
    let finalData = new Observable((observer:any) => {
      this.db.collection('TvShows').get().then((resultGET:any) => {
        let allTitles:any = [];
        resultGET[0].datas.forEach((data:any) => {
          data.Data.Titles.map((x:any) => x.ServerId = data.ServerID);
          allTitles = allTitles.concat(data.Data.Titles);
        });
        observer.next(allTitles);
        observer.complete();
      });
    })
    return finalData;
  }

  GetMoviesLinksFromLocalByServerIdAndMovieId(ServerId:any, MovieId:any){
    let finalData = new Observable((observer:any) => {
      this.db.collection('Movies').get().then((resultGET:any) => {
        let allLinks:any = [];
        allLinks = resultGET[0].datas.find((x:any) => x.ServerID == ServerId).Data.Links.filter((x:any) => x.Movies_Id == MovieId);
        observer.next(allLinks);
        observer.complete();
      });
    })
    return finalData;
  }

  GetTvShowSeasonsFromLocalByServerIdAndTvShowId(){

  }
}

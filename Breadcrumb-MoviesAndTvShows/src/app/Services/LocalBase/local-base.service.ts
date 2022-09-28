import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//@ts-ignore
import Localbase from 'localbase';
import { Observable } from 'rxjs';
import { CommonService } from '../CommonServices/common.service';
import { GoogleAppScritsService } from '../GoogleAppScripts/google-app-scrits.service';

@Injectable({
  providedIn: 'root'
})
export class LocalBaseService {
  db:any;
  constructor(private router:Router, public GoogleAppScripts: GoogleAppScritsService) {
    this.db = new Localbase('BreadCrumb-Folders-Files-DB');
  }

  SaveMoviesFromSheetAndToLocalBase(){
    console.log("Saving Movies");
    let finalData = new Observable((observer:any) => {
      this.GoogleAppScripts.GetMovies().subscribe((response:any) => {
        if(response.status == "200"){
          let dataToAdd = {datas:response.data};
          this.db.collection('Movies').delete().then((resultLBDEL:any) => {
            this.db.collection('Movies').add(dataToAdd).then((resultLBADD:any) => {
              console.log("Movies Done");
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
    console.log("Saving Tvshows");
    let finalData = new Observable((observer:any) => {
      this.GoogleAppScripts.GetTvshows().subscribe((response:any) => {
        if(response.status == "200"){
          let dataToAdd = {datas:response.data};
          this.db.collection('TvShows').delete().then((resultLBDEL:any) => {
            this.db.collection('TvShows').add(dataToAdd).then((resultLBADD:any) => {
              console.log("Tvshows Done");
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
        try{
          let allTitles:any = [];
          resultGET[0].datas.forEach((data:any) => {
            data.Data.Titles.map((x:any) => x.ServerId = data.ServerID);
            allTitles = allTitles.concat(data.Data.Titles);
          });
          observer.next(allTitles);
          observer.complete();
        }
        catch(ex){
          this.OpenSettings();
        }
      });
    })
    return finalData;
  }

  GetTvshowTitlesFromLocal(){
    let finalData = new Observable((observer:any) => {
      this.db.collection('TvShows').get().then((resultGET:any) => {
        try{
          let allTitles:any = [];
          resultGET[0].datas.forEach((data:any) => {
            data.Data.Titles.map((x:any) => x.ServerId = data.ServerID);
            allTitles = allTitles.concat(data.Data.Titles);
          });
          observer.next(allTitles);
          observer.complete();
        }
        catch(ex){
          this.OpenSettings();
        }
      });
    })
    return finalData;
  }

  GetMoviesLinksFromLocalByServerIdAndMovieId(ServerId:any, MovieId:any){
    let finalData = new Observable((observer:any) => {
      this.db.collection('Movies').get().then((resultGET:any) => {
        try{
          let allLinks:any = [];
          allLinks = resultGET[0].datas.find((x:any) => x.ServerID == ServerId).Data.Links.filter((x:any) => x.Movies_Id == MovieId);
          observer.next(allLinks);
          observer.complete();
        }
        catch(ex){
          this.OpenSettings();
        }
      });
    })
    return finalData;
  }

  GetTvShowSeasonsFromLocalByServerIdAndTvShowId(ServerId:any, TvShowId:any){
    let finalData = new Observable((observer:any) => {
      this.db.collection('TvShows').get().then((resultGET:any) => {
        try{
          let allSeasons:any = [];
          allSeasons = resultGET[0].datas.find((x:any) => x.ServerID == ServerId).Data.Seasons.filter((x:any) => x.Series_Id == TvShowId);
          observer.next(allSeasons);
          observer.complete();
        }
        catch(ex){
          this.OpenSettings();
        }
      });
    })
    return finalData;
  }

  GetTvShowEpisodesFromLocalByServerIdAndSeasonId(ServerId:any, SeasonId:any){
    let finalData = new Observable((observer:any) => {
      this.db.collection('TvShows').get().then((resultGET:any) => {
        try{
          let allSeasons:any = [];
          allSeasons = resultGET[0].datas.find((x:any) => x.ServerID == ServerId).Data.Episodes.filter((x:any) => x.Season_Id == SeasonId);
          observer.next(allSeasons);
          observer.complete();
        }
        catch(ex){
          this.OpenSettings();
        }
      });
    })
    return finalData;
  }

  GetEpisodeLinksFromLocalByServerIdAndEpisodeId(ServerId:any, EpisodeId:any){
    let finalData = new Observable((observer:any) => {
      this.db.collection('TvShows').get().then((resultGET:any) => {
        try{
          let allSeasons:any = [];
          allSeasons = resultGET[0].datas.find((x:any) => x.ServerID == ServerId).Data.Links.filter((x:any) => x.Episode_Id == EpisodeId);
          observer.next(allSeasons);
          observer.complete();
        }
        catch(ex){
          this.OpenSettings();
        }
      });
    })
    return finalData;
  }

  OpenSettings(){
    this.router.navigate(['/Settings']);
    document.getElementById("fullPageLoaderContainer")?.classList.remove("show");
  }
}

import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/Services/CommonServices/common.service';
import { LocalBaseService } from 'src/app/Services/LocalBase/local-base.service';

@Component({
  selector: 'app-opener',
  templateUrl: './opener.component.html',
  styleUrls: ['./opener.component.css']
})
export class OpenerComponent implements OnInit {

  TvShowId:any;
  ServerId:any;
  TvShowTitle:any = {};
  TvShowSeasons:any = [];
  currentEpisodes:any = [];
  selectSeason:any;
  selectSeasonObj:any = {};
  selectedEpisode:any = {};
  currentLinks:any = [];
  showEpisodeLinksModal:boolean = false;
  showLinkModal:boolean = false;
  selectedLink:any = {};
  showViewModal:boolean = false;
  viewRawHTML:any;

  constructor(public _sanitizer: DomSanitizer, private route: ActivatedRoute, private LocalBase: LocalBaseService, public _cs: CommonService) { }

  ngOnInit(): void {
    this.TvShowId = this.route.snapshot.paramMap.get('TvShowId');
    this.ServerId = this.route.snapshot.paramMap.get('ServerId');
    this.getCurrentMovieData();
  }

  getCurrentMovieData(){
    this.LocalBase.GetTvshowTitlesFromLocal().subscribe((response:any) => {
      this.TvShowTitle = response.find((x:any) => x.ServerId == this.ServerId && x.Series_Id == this.TvShowId);
    })

    this.LocalBase.GetTvShowSeasonsFromLocalByServerIdAndTvShowId(this.ServerId,this.TvShowId).subscribe((response:any) => {
      this.TvShowSeasons = [...response];
      this.selectSeason = this.TvShowSeasons[0].Season_Id;
      this.UpdateCurrentEpisodes();
    })
  }

  SeasonUpdated(){
    this.selectSeasonObj = this.TvShowSeasons.find((x:any) => x.Season_Id == this.selectSeason);
    this.UpdateCurrentEpisodes();
  }

  UpdateCurrentEpisodes(){
    this.LocalBase.GetTvShowEpisodesFromLocalByServerIdAndSeasonId(this.ServerId, this.selectSeason).subscribe((response:any) => {
      this.currentEpisodes = [...response];
    })
  }

  getFormatedDate(dateSTR:string){
    let date = new Date(dateSTR);
    return date.toLocaleDateString("en-US", {  year: 'numeric', month: 'long', day: 'numeric' });
  }

  showEpisodeLinksModel(episode:any){
    this.selectedEpisode = episode;
    this.showEpisodeLinksModal = true;
    this.UpdateCurrentLinks();
  }

  UpdateCurrentLinks(){
    this.LocalBase.GetEpisodeLinksFromLocalByServerIdAndEpisodeId(this.ServerId, this.selectedEpisode.Episode_Id).subscribe((response:any) => {
      this.currentLinks = [...response];
    })
  }

  hideLinksModal(event:any){
    if(event){
      this.showEpisodeLinksModal = false;
    }
  }

  showLinksModal(link:any){
    this.showLinkModal = true;
    this.selectedLink = link;
  }

  hideLinkModal(event:any){
    if(event){
      this.showLinkModal = false;
    }
  }

  ViewLink(link:any, iFrameOrDirectVideo:boolean){
    this.showViewModal = true;
    if(iFrameOrDirectVideo){
      setTimeout(() => {
        this.viewRawHTML = `
          <iframe src="https://drive.google.com/file/d/` + link.split("/")[5] + `/preview" style="width: 95%; height: 95%; outline: none; border: 0px;"></iframe>
        `;
      }, 300);
    }
    else{
      setTimeout(() => {
        this.viewRawHTML = `
          <video style="width: 95%; height: 95%; outline: none; border: 0px;" controls>
            <source src="` + this._cs.CreateDirectLinkFromLink(link) + `" type="video/mp4">
          </video>
        `;
      }, 300);
    }
  }

  hideViewModal(event:any){
    if(event){
      this.showViewModal = false;
      this.viewRawHTML = "";
    }
    console.log(event);
  }
}

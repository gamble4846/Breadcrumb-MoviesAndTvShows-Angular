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

  MovieId:any;
  ServerId:any;
  MovieTitle:any = {};
  MovieLinks:any = [];
  showLinkModal:boolean = false;
  selectedLink:any = {};
  showViewModal:boolean = false;
  iframeLink:any = "";
  viewRawHTML:any = "";

  constructor(public _sanitizer: DomSanitizer, private route: ActivatedRoute, private LocalBase: LocalBaseService, public _cs: CommonService) { }

  ngOnInit(): void {
    this.MovieId = this.route.snapshot.paramMap.get('MovieId');
    this.ServerId = this.route.snapshot.paramMap.get('ServerId');
    this.getCurrentMovieData();
  }


  getCurrentMovieData(){
    this.LocalBase.GetMoviesTitlesFromLocal().subscribe((response:any) => {
      this.MovieTitle = response.find((x:any) => x.ServerId == this.ServerId && x.Movies_Id == this.MovieId);
      console.log(this.MovieTitle);
    })

    this.LocalBase.GetMoviesLinksFromLocalByServerIdAndMovieId(this.ServerId,this.MovieId).subscribe((response:any) => {
      this.MovieLinks = response;
      console.log(this.MovieLinks);
    })
  }

  hideLinksModal(event:any){
    if(event){
      this.showLinkModal = false;
    }
    console.log(event);
  }

  showLinksModal(link:any){
    this.showLinkModal = true;
    this.selectedLink = link;
  }

  ViewLink(link:any, iFrameOrDirectVideo:boolean){
    this.showViewModal = true;
    this.iframeLink = link;
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private LocalBase: LocalBaseService) { }

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
}

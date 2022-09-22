import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-opener',
  templateUrl: './opener.component.html',
  styleUrls: ['./opener.component.css']
})
export class OpenerComponent implements OnInit {

  TvShowId:any;
  ServerId:any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.TvShowId = this.route.snapshot.paramMap.get('TvShowId');
    this.ServerId = this.route.snapshot.paramMap.get('ServerId');
  }

}

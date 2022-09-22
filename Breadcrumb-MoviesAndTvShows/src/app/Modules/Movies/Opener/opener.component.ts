import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-opener',
  templateUrl: './opener.component.html',
  styleUrls: ['./opener.component.css']
})
export class OpenerComponent implements OnInit {

  MovieId:any;
  ServerId:any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.MovieId = this.route.snapshot.paramMap.get('MovieId');
    this.ServerId = this.route.snapshot.paramMap.get('ServerId');
  }

}

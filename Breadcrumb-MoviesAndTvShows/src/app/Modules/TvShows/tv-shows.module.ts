import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './Home/home.component';
import { OpenerComponent } from './Opener/opener.component';
import { TvShowsRoutingModule } from './tv-shows-routing.module';


@NgModule({
  declarations: [
    HomeComponent,
    OpenerComponent
  ],
  imports: [
    CommonModule,
    TvShowsRoutingModule
  ]
})
export class TvShowsModule { }

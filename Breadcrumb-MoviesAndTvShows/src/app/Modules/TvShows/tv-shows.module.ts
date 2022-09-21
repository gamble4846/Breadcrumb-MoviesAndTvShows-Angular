import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './Home/home.component';
import { OpenerComponent } from './Opener/opener.component';



@NgModule({
  declarations: [
    HomeComponent,
    OpenerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TvShowsModule { }

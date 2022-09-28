import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './Home/home.component';
import { OpenerComponent } from './Opener/opener.component';

import { MoviesRoutingModule } from './movies-routing.module';

//-------------------------------- GS Library --------------------------------------------------
import { CarouselModule } from '../../gs-lib/carousel/carousel.module';
import { ModalModule } from '../../gs-lib/modal/modal.module';
//----------------------------------------------------------------------------------------------

import { NzButtonModule } from 'ng-zorro-antd/button';
import { PipesModule } from '../Pipes/pipes.module';


@NgModule({
  declarations: [
    HomeComponent,
    OpenerComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    CarouselModule,
    ModalModule,
    NzButtonModule,
    PipesModule
  ]
})
export class MoviesModule { }

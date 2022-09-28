import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './Home/home.component';
import { OpenerComponent } from './Opener/opener.component';
import { TvShowsRoutingModule } from './tv-shows-routing.module';

//-------------------------------- GS Library --------------------------------------------------
import { CarouselModule } from '../../gs-lib/carousel/carousel.module';
import { ModalModule } from '../../gs-lib/modal/modal.module';
//----------------------------------------------------------------------------------------------

import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../Pipes/pipes.module';

import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [
    HomeComponent,
    OpenerComponent
  ],
  imports: [
    CommonModule,
    TvShowsRoutingModule,
    CarouselModule,
    NzSelectModule,
    FormsModule,
    ModalModule,
    PipesModule,
    NzButtonModule
  ]
})
export class TvShowsModule { }

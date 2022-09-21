import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './Loader/loader.component';
import { NavbarComponent } from './Navbar/navbar.component';
import { HomeComponent } from './Home/home.component';
import { NavigationRoutingModule } from './navigation-routing.module';

//-------------------------------- GS Library --------------------------------------------------
import { CarouselModule } from '../../gs-lib/carousel/carousel.module';
//----------------------------------------------------------------------------------------------

@NgModule({
  declarations: [
    LoaderComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    NavigationRoutingModule,
    CarouselModule
  ],
  exports:[
    LoaderComponent,
    NavbarComponent
  ]
})
export class NavigationModule { }

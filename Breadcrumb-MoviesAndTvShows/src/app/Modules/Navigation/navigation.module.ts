import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './Loader/loader.component';
import { NavbarComponent } from './Navbar/navbar.component';
import { HomeComponent } from './Home/home.component';
import { NavigationRoutingModule } from './navigation-routing.module';
import { SettingsComponent } from './Settings/settings.component';

//-------------------------------- GS Library --------------------------------------------------
import { CarouselModule } from '../../gs-lib/carousel/carousel.module';
//----------------------------------------------------------------------------------------------

//--------------------------------- NG ZORO ----------------------------------------------------
import { NzSpinModule } from 'ng-zorro-antd/spin';
//----------------------------------------------------------------------------------------------


@NgModule({
  declarations: [
    LoaderComponent,
    NavbarComponent,
    HomeComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    NavigationRoutingModule,
    CarouselModule,
    NzSpinModule
  ],
  exports:[
    LoaderComponent,
    NavbarComponent
  ]
})
export class NavigationModule { }

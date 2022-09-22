import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './Loader/loader.component';
import { NavbarComponent } from './Navbar/navbar.component';
import { HomeComponent } from './Home/home.component';
import { NavigationRoutingModule } from './navigation-routing.module';
import { SettingsComponent } from './Settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//-------------------------------- GS Library --------------------------------------------------
import { CarouselModule } from '../../gs-lib/carousel/carousel.module';
//----------------------------------------------------------------------------------------------

//--------------------------------- NG ZORO ----------------------------------------------------
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
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
    NzSpinModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule
  ],
  exports:[
    LoaderComponent,
    NavbarComponent
  ]
})
export class NavigationModule { }

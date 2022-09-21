import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './Loader/loader.component';
import { NavbarComponent } from './Navbar/navbar.component';



@NgModule({
  declarations: [
    LoaderComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NavigationModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './Safe/safe.pipe';



@NgModule({
  declarations: [
    SafePipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SafePipe
  ]
})
export class PipesModule { }

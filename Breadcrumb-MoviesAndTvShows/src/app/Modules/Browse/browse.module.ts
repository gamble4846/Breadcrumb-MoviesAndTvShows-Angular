import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BrowseRoutingModule } from './browse-routing.module';
import { BrowseComponent } from './Browse/browse.component';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { SelectModule } from '../../gs-lib/select/select.module';


@NgModule({
  declarations: [
    BrowseComponent
  ],
  imports: [
    CommonModule,
    BrowseRoutingModule,
    NzGridModule,
    NzInputModule,
    SelectModule,
    NzButtonModule,
    FormsModule
  ]
})
export class BrowseModule { }

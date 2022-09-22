import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Home/home.component';
import { OpenerComponent } from './Opener/opener.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'Home'},
  {path: 'Home', component: HomeComponent},
  {path: 'Home/:ServerId/:TvShowId', component: OpenerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TvShowsRoutingModule { }

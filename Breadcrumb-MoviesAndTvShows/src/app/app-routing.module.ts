import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'Home'},
  {path: 'Home', loadChildren: () => import('./Modules/Navigation/navigation.module').then(m => m.NavigationModule)},
  {path: 'Movies', loadChildren: () => import('./Modules/Movies/movies.module').then(m => m.MoviesModule)},
  {path: 'TvShows', loadChildren: () => import('./Modules/TvShows/tv-shows.module').then(m => m.TvShowsModule)},
  {path: 'Browse', loadChildren: () => import('./Modules/Browse/browse.module').then(m => m.BrowseModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

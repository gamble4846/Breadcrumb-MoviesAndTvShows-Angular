"use strict";(self.webpackChunkBreadcrumb_MoviesAndTvShows=self.webpackChunkBreadcrumb_MoviesAndTvShows||[]).push([[351],{8351:(C,n,s)=>{s.r(n),s.d(n,{TvShowsModule:()=>T});var l=s(9808),c=s(6816),e=s(5e3),m=s(1465),u=s(1548),h=s(8195),d=s(3196);function g(o,a){if(1&o){const t=e.EpF();e.TgZ(0,"div",1)(1,"div",2),e._uU(2),e.qZA(),e.TgZ(3,"gs-carousel",3),e.NdJ("itemClicked",function(r){return e.CHM(t),e.oxw().carouselItemClicked(r)}),e.qZA()()}if(2&o){const t=a.$implicit;e.xp6(2),e.AsE("",t.genre," - ",t.movieOrTvShow,"s"),e.xp6(1),e.Q6J("scrollSpeed",30)("imageBorder","")("imageBorderradius","5px")("lazyLoadImages",!0)("imageSmallHeight",85)("imageSmallWidth",150)("imageHeight",160)("imageWidth",285)("carouselData",t.data)("hiddenScrollBar",!0)("showButtons",!0)}}const v=[{path:"",pathMatch:"full",redirectTo:"Home"},{path:"Home",component:(()=>{class o{constructor(t,i,r){this.SessionManagement=t,this.LocalBase=i,this._cs=r,this.carouselDataWithGenre=[],this.carouselDataWithGenreToDisplay=[]}ngOnInit(){try{this.setUpMoviePageTitles()}catch(t){}}setUpMoviePageTitles(){this._cs.ShowFullPageLoader(),this._cs.GetTvShowsWithGenreFormat().subscribe(t=>{this.carouselDataWithGenre=this.carouselDataWithGenre.concat(t),this.carouselDataWithGenreToDisplay=[...this.carouselDataWithGenre],this._cs.HideFullPageLoader()})}carouselItemClicked(t){console.log(t)}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(m.e),e.Y36(u.R),e.Y36(h.v))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-home"]],decls:1,vars:1,consts:[["class","genreCarousel",4,"ngFor","ngForOf"],[1,"genreCarousel"],[1,"genreName"],[3,"scrollSpeed","imageBorder","imageBorderradius","lazyLoadImages","imageSmallHeight","imageSmallWidth","imageHeight","imageWidth","carouselData","hiddenScrollBar","showButtons","itemClicked"]],template:function(t,i){1&t&&e.YNc(0,g,4,13,"div",0),2&t&&e.Q6J("ngForOf",i.carouselDataWithGenreToDisplay)},directives:[l.sg,d.F],styles:[""]}),o})()}];let p=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[[c.Bz.forChild(v)],c.Bz]}),o})();var S=s(4942);let T=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[[l.ez,p,S.b]]}),o})()}}]);
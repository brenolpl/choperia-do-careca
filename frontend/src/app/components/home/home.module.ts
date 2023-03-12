import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeRoute} from "./home.route";
import {HomeComponent} from "./home.component";

@NgModule({
  declarations: [
      HomeComponent
  ],
  imports: [
    HomeRoute,
    CommonModule
  ]
})
export class HomeModule { }

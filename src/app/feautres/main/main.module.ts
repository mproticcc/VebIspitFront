import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, RouterModule, SharedModule, MainRoutingModule],
})
export class MainModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { Router, RouterLink } from '@angular/router';

@NgModule({
  declarations: [NavigationBarComponent],
  imports: [CommonModule, RouterLink],
  exports: [NavigationBarComponent],
})
export class SharedModule {}

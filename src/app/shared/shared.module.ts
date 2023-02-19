import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { CustomDdDirective } from './directives/custom-dd.directive';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [
    CustomDdDirective,
    LoadingComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CustomDdDirective,
    LoadingComponent,
    AlertComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }

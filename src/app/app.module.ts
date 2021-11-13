import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FilterService, PageService, SortService, TreeGridModule } from '@syncfusion/ej2-angular-treegrid';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TreeGridModule
  ],
  bootstrap: [AppComponent],
  providers: [PageService,
              SortService,
              FilterService]
})
export class AppModule { }

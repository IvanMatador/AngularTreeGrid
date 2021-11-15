import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ContextMenuService, FilterService, PageService, SortService, TreeGridModule, EditService, ToolbarService } from '@syncfusion/ej2-angular-treegrid';

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
              FilterService,
              ContextMenuService,
              EditService,
              ToolbarService]
})
export class AppModule { }

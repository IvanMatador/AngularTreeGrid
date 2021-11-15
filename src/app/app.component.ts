import { Component, OnInit, ViewChild } from '@angular/core';
import { dataSource, virtualData } from './datasource';
import { VirtualScrollService, TreeGridComponent, ColumnMenuService, EditSettingsModel, ResizeService, EditService, ContextMenuService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [VirtualScrollService, ColumnMenuService, ResizeService, EditService, ContextMenuService]
})
export class AppComponent implements OnInit {
  title = 'Angular-TreeGrid';
  @ViewChild('treegrid') treegrid!: TreeGridComponent;
  public data!: Object[];
  public contextMenuItems!: Object;
  public editing!: EditSettingsModel;
  public toolbar!: string[];
  public editparams!: Object;
  public targetElement!: HTMLElement;

  ngOnInit(): void {
    dataSource();
    this.data = virtualData;
    this.contextMenuItems= [
      {text: 'Edit Column', target: '.e-headercontent', id: 'EditCol'},
      {text: 'New Column', target: '.e-headercontent', id: 'NewCol'},
      { text: 'Delete Column', target: '.e-headercontent', id: 'DeleteCol' },
      { text: 'Choose Colomn', target: '.e-headercontent', id: 'ChooseCol' },
      { text: 'Freez Column', target: '.e-headercontent', id: 'FreezCol' },
      { text: 'Filter Column', target: '.e-headercontent', id: 'FilterCol' },
      { text: 'MultiSort', target: '.e-headercontent', id: 'MultiSort' }
    ]
    this.editing = { allowDeleting: true, allowEditing: true, allowAdding: true, mode: 'Row' };
    this.editparams = {params: { format: 'n' }};
  }

  checking(event: any) {
    event.preventDefault();
    console.log("open popup");
  }

  openContext(event: any) {
    event.preventDefault();
    console.log('open context menu')
  }

  contextMenuOpen(arg?: any) {
    //(this.treegrid.getColumnByField('TaskID')
  }

  contextMenuClick(arg?: any) {
    //console.log(arg.item.properties.id); // get type of action
    //console.log(arg.column.field); // get colomn field name
    //console.log(arg.column.headerText); // get headerText
    const column = this.treegrid.getColumnByField(arg.column.field);
    column.headerText = "Changed Text";
    this.treegrid.refreshColumns();
  }

}

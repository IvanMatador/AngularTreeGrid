import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { dataSource, virtualData } from './datasource';
import { VirtualScrollService, TreeGridComponent, ColumnMenuService, EditSettingsModel, ResizeService, EditService, ContextMenuService } from '@syncfusion/ej2-angular-treegrid';
import { Dialog } from '@syncfusion/ej2-popups';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { ButtonModel } from '@syncfusion/ej2-angular-buttons';
import { FormControl, FormGroup } from '@angular/forms';

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
  @ViewChild('ejDialog') ejDialog!: DialogComponent;
  @ViewChild('container', { read: ElementRef, static: true }) container!: ElementRef;
  public buttons: Object[] = [
    { buttonModel: { content: 'Cancel', isPrimary: true, cssClass:'e-danger' } },
    { buttonModel: { content: 'OK', isPrimary: false, cssClass:'e-success' } },
  ];
  public dialogHeaderText = 'Header';
  public dialogContentText = 'Content';

  public formControl = new FormControl();

  ngOnInit(): void {
    this.initilaizeTarget();
    dataSource();
    this.data = virtualData;
    this.contextMenuItems= [
      { text: 'Edit Column', target: '.e-headercontent', id: 'EditCol' },
      { text: 'New Column', target: '.e-headercontent', id: 'NewCol' },
      { text: 'Delete Column', target: '.e-headercontent', id: 'DeleteCol' },
      { text: 'Choose Colomn', target: '.e-headercontent', id: 'ChooseCol' },
      { text: 'Freez Column', target: '.e-headercontent', id: 'FreezCol' },
      { text: 'Filter Column', target: '.e-headercontent', id: 'FilterCol' },
      { text: 'MultiSort', target: '.e-headercontent', id: 'MultiSort' }
    ]
    this.editing = { allowDeleting: true, showDeleteConfirmDialog: true, allowEditing: true, allowAdding: true, mode: 'Cell' };
    this.editparams = {params: { format: 'n' }};
    this.toolbar = ['Add', 'Edit', 'Delite', 'Update', 'Cancel'];
  }

  public initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.container.nativeElement.parentElement;
  }

  contextMenuOpen(arg?: any) {
    console.log('contextMenuOpen')
  }

  contextMenuClick(arg?: any) {
    console.log(arg.column.field);
    this.ejDialog.show();
    //this.ejDialog.hide();
    //console.log(arg.item.properties.id); // get type of action
    //console.log(arg.column.field); // get colomn field name
    //console.log(arg.column.headerText); // get headerText

    this.editCol(arg.column.field, arg.item.properties.id);


    const column = this.treegrid.getColumnByField(arg.column.field);
    //column.headerText = "Changed Text";
    this.treegrid.refreshColumns();
  }

  public onOpenDialog = (event: any): void => {
    console.log('onOpenDialog')
  }

  closeDialog(arg?: any) {
    console.log(arg)
    //console.log(arg.target.innerText)
  }

  buttonWasClicked(arg?: any) {
    console.log(arg.target.innerText)
    //this.ejDialog.hide();
    //console.log('buttonWasClicked', arg)
  }

  editCol(columnName: string, action: string) {
    console.log(columnName, action);
    //console.log(this.taskForm);
    //console.log('columnName', columnName);
    //console.log('action', action);
    const column = this.treegrid.getColumnByField(columnName);
    this.formControl.setValue(column.headerText);
    //column.headerText = "Changed Text";
    this.treegrid.refreshColumns();
  }

  changeColName() {
    //alert('changeColName')
  }

}

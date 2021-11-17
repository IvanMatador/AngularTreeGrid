import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { dataSource, virtualData } from './datasource';
import { VirtualScrollService, TreeGridComponent, ColumnMenuService, EditSettingsModel, ResizeService, EditService, ContextMenuService } from '@syncfusion/ej2-angular-treegrid';
import { Dialog, DialogUtility } from '@syncfusion/ej2-popups';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { ButtonModel } from '@syncfusion/ej2-angular-buttons';
import { FormControl, FormGroup } from '@angular/forms';
import { MenuItemModel } from '@syncfusion/ej2-navigations';

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
  public contextMenuItems!: MenuItemModel[];
  public editing!: EditSettingsModel;
  public toolbar!: string[];
  public editparams!: Object;
  public targetElement!: HTMLElement;
  @ViewChild('ejDialog') ejDialog!: DialogComponent;
  @ViewChild('container', { read: ElementRef, static: true }) container!: ElementRef;
  //public buttons: Object[] = [
    //{ buttonModel: { content: 'Cancel', isPrimary: true, cssClass:'e-danger' } },
    //{ buttonModel: { content: 'OK', isPrimary: false, cssClass:'e-success' } },
  //];
  public hideDialog: EmitType<object> = () => {
    this.isConfirm = true;
    this.ejDialog.hide();
  }

  public cancelDialog: EmitType<object> = () => {
    this.isConfirm = false;
    this.ejDialog.hide();
  }

    public buttons: Object = [
  {
    'click': this.hideDialog.bind(this),
      buttonModel:{
      content: 'OK',
      isPrimary: true
    }
  },
  {
    'click': this.cancelDialog.bind(this),
    buttonModel: {
      content: 'Cancel'
    }
  }
    ];
  public dialogHeaderText = 'Header';
  public dialogContentText = 'Content';
  public columnNameForManipulations!: string;
  public childId!: string;
  public parentId!: string;
  public whatNeedToDo!: string;
  public editingColumnName!: boolean;
  public isConfirm!: boolean
  public columnName = new FormControl('');
  public columnNameValue: string = '';

  ngOnInit(): void {
    this.initilaizeTarget();
    dataSource();
    this.data = virtualData;
    this.contextMenuItems  = [
      { text: 'Edit Column', id: 'EditCol',
        items: [
          { text: 'Edit column name', id: 'EditColumnName' },
          { text: 'Edit column data type', id: 'EditColumnDataType' },
          { text: 'Edit column default value',  id: 'EditColumnDefaultValue' },
          { text: 'Edit column min width', id: 'EditColumnMinWidth' },
          { text: 'Edit column font size', id: 'EditColumnFontSize' },
          { text: 'Edit column font color', id: 'EditColumnFontColor' },
          { text: 'Edit column text align', id: 'EditColumnTextAlign' },
          { text: 'Edit column text wrap',  id: 'EditColumnTextWrap' },
        ] },
      { text: 'New Column', id: 'NewCol' },
      { text: 'Delete Column', id: 'DeleteCol' },
      { text: 'Choose Colomn', id: 'ChooseCol' },
      { text: 'Freez Column', id: 'FreezCol' },
      { text: 'Filter Column',  id: 'FilterCol' },
      { text: 'MultiSort',  id: 'MultiSort' }
    ];
    this.editing = { allowDeleting: true, showDeleteConfirmDialog: true, allowEditing: true, allowAdding: true, mode: 'Cell' };
    this.editparams = {params: { format: 'n' }};
    this.toolbar = ['Add', 'Edit', 'Delite', 'Update', 'Cancel'];
  }

  public initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.container.nativeElement.parentElement;
  }

  contextMenuOpen(arg?: any) {
    if(!arg.parentItem) {
      this.columnNameForManipulations = arg.column.field;
    }
    console.log('contextMenuOpen')
  }

  prepareInputs(childField: string, ) {
    switch(childField) {
      case 'EditColumnName':
        this.editColumn(this.columnNameForManipulations);

        break;
    }
  }

  getColumn(columnNmae: string) {
    return this.treegrid.getColumnByField(columnNmae);
  }

  editColumn(columnName: string) {
    this.editingColumnName = true;
    const column = this.getColumn(columnName);
    this.columnName.setValue(column.headerText);
    this.ejDialog.show();
  }

  contextMenuClick(arg?: any) {
    if(arg.item.parentObj.id) {
      this.childId = arg.element.id;
      this.parentId = arg.item.parentObj.id;
      this.prepareInputs(this.childId);
      console.log(this.childId, this.parentId, this.columnNameForManipulations);
    }

    if(this.childId && this.parentId && this.columnNameForManipulations) {
      this.editColumn(this.columnNameForManipulations);
    }

    console.log('contextMenuClick');
    console.log(arg);
    //console.log(arg.item.parentObj.id, arg.element.id);
    this.ejDialog.show();
    //this.ejDialog.hide();
    //console.log(arg.item.properties.id); // get type of action
    //console.log(arg.column.field); // get colomn field name
    //console.log(arg.column.headerText); // get headerText

    //this.editCol(arg.column.field, arg.item.properties.id);


    //const column = this.treegrid.getColumnByField(arg.column.field);
    //column.headerText = "Changed Text";
    //this.treegrid.refreshColumns();
  }

  onOpenDialog = (event: any): void => {
    console.log('onOpenDialog');
  }

  closeDialog(arg?: any) {
    //console.log('closeDialog')
    console.log(arg);
    console.log(this.childId, this.parentId, this.columnNameForManipulations);
    if (this.isConfirm) {
      this.whatNeedToDoAndDoIt(this.childId, this.parentId, this.columnNameForManipulations)
    }
  }

  whatNeedToDoAndDoIt(childId: any, parentId: any, columnName: any) {
    console.log(this.getColumn(columnName).headerText);
    console.log(this.columnNameValue);
    const whatNeed = childId ? childId : parentId
    switch (whatNeed) {
      case 'EditColumnName':
        this.getColumn(columnName).headerText = this.columnNameValue;
        break;
      case 'EditColumnDataType':
        if(columnName === 'taskID') {
          return
        } else {
          this.getColumn(columnName)
        }
        break;
      case 'EditColumnDefaultValue':
        break;
      case 'EditColumnMinWidth':
        break;
      case 'EditColumnFontSize':
        break;
      case 'EditColumnFontColor':
        break;
      case 'EditColumnTextAlign':
        break;
      case 'EditColumnTextWrap':
        break;
      default: return;
    }
    this.treegrid.refreshColumns();
    this.clearAllInputs();
  }

  clearAllInputs() {
    this.columnName.reset();
    this.columnNameValue = '';
  }

  buttonWasClicked(arg?: any) {
    console.log('buttonWasClicked')
    //console.log(arg.target.innerText)
    //this.ejDialog.hide();
    //console.log('buttonWasClicked', arg)
  }

  editCol(columnName: string, action: string) {
    console.log('editCol');
    console.log(columnName, action);
    //console.log(this.taskForm);
    //console.log('columnName', columnName);
    //console.log('action', action);
    const column = this.treegrid.getColumnByField(columnName);
    this.columnName.setValue(column.headerText);
    //column.headerText = "Changed Text";
    this.treegrid.refreshColumns();
  }

  changeColName() {
    console.log('changeColName');
    //alert('changeColName')
  }

  itemRender(event: any) {
    console.log('itemRender')
    console.log(event)
  }

  testing(text: string) {
    console.log(text);
    return 
  }

  handleChange(event: any) {
    this.columnNameValue = event.target.value;
  }

}

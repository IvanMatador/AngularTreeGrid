import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { dataSource, virtualData } from './datasource';
import { VirtualScrollService, TreeGridComponent, ColumnMenuService, EditSettingsModel, ResizeService, EditService, ContextMenuService } from '@syncfusion/ej2-angular-treegrid';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { FormControl } from '@angular/forms';
import { ItemModel, MenuItemModel } from '@syncfusion/ej2-navigations';

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
  public editparams!: Object;
  public targetElement!: HTMLElement;
  @ViewChild('ejDialog') ejDialog!: DialogComponent;
  @ViewChild('container', { read: ElementRef, static: true }) container!: ElementRef;
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
    public items: ItemModel[] = [
      { text: 'string' },
      { text: 'boolean' },
      { text: 'number' },
      { text: 'date' },
      { text: 'datetime' }];

  public dialogHeaderText = 'Header';
  public dialogContentText = 'Content';
  public columnNameForManipulations!: string;
  public childId!: string;
  public parentId!: string;
  public whatNeedToDo!: string;
  public editingColumnName!: boolean;
  public editingColumnDataType!: boolean;
  public editingColumnDefaultValue!: boolean;
  public editingColumnMinWidth!: boolean;
  public isConfirm!: boolean
  public columnName = new FormControl('');
  public columnNameValue: string = '';
  public columnDataType = new FormControl('');
  public columnDataTypeValue: string = '';
  public columnDefaultValue = new FormControl('');
  public columnDefaultValueValue: string = '';
  public columnMinWidth = new FormControl('');
  public columnMinWidthValue: string = '';
  public columnFontSize = new FormControl('');
  public columnFontSizeValue: string = '';
  public columnFontColor = new FormControl('');
  public columnFontColorValue: string = '';
  public columnBackgroundColor = new FormControl('');
  public columnBackgroundColorValue: string = '';
  public columnTextAligh = new FormControl('');
  public columnTextAlighValue: string = '';
  public columnTextWrap = new FormControl('');
  public columnTextWrapValue: string = '';
  public editTypeFIELD1: string = 'stringedit';
  public editTypeFIELD2: string = 'dropdownedit';
  public editTypeFIELD3: string = 'stringedit';
  public editTypeFIELD4: string = 'stringedit';
  public choosedDataType: string = 'string';
  public allowFiltering: boolean = false;
  public taskIDheaderText: string = 'Column 1';
  public column2headerText: string = 'Column 2';
  public column3headerText: string = 'Column 3';
  public column4headerText: string = 'Column 4';
  public column5headerText: string = 'Column 5';


  ngOnInit(): void {
    this.initilaizeTarget();
    dataSource();
    this.data = virtualData;
    this.contextMenuItems  = [
      { text: 'Edit Column', id: 'EditCol' },
      { text: 'New Column', id: 'NewCol' },
      { text: 'Delete Column', id: 'DeleteCol' },
      { text: 'Choose Colomn', id: 'ChooseCol' },
      { text: 'Freez Column', id: 'FreezCol' },
      { text: 'Filter Column',  id: 'FilterCol' },
      { text: 'MultiSort',  id: 'MultiSort' }
    ];
    this.editing = { allowDeleting: true, showDeleteConfirmDialog: true, allowEditing: true, allowAdding: true, mode: 'Cell' };
    this.editparams = {params: { format: 'n' }};
  }

  public initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.container.nativeElement.parentElement;
  }

  contextMenuOpen(arg?: any) {
    console.log(arg)
    this.clearAllInputs();
    if(!arg.parentItem) {
      this.columnNameForManipulations = arg.column.field;
    }
  }

  prepareInputs(childField: string, ) {
    switch(childField) {
      case 'EditColumnName':
        this.editColumn(this.columnNameForManipulations, 'EditColumnName');
        break;
    }
  }

  getColumn(columnNmae: string) {
    return this.treegrid.getColumnByField(columnNmae);
  }

  editColumn(columnName: string, action: string) {
    const column = this.getColumn(columnName);
    switch (action) {
      case 'EditColumnName':
        this.dialogHeaderText = 'Editing column name';
        this.editingColumnName = true;
        this.columnName.setValue(column.headerText);
        this.ejDialog.show();
        break;
      case 'EditColumnDataType':
        this.dialogHeaderText = 'Editing column data type';
        this.editingColumnDataType = true;
        this.columnDataType.setValue(column.type);
        this.ejDialog.show();
        break;
      case 'EditColumnDefaultValue':
        this.dialogHeaderText = 'Editing column default value';
        this.editingColumnDefaultValue = true;
        this.columnDefaultValue.setValue(column.defaultValue);
        this.ejDialog.show();
        break;
      case 'EditColumnMinWidth':
        this.dialogHeaderText = 'Editing column min width';
        this.editingColumnMinWidth = true;
        this.columnMinWidth.setValue(column.minWidth);
        this.ejDialog.show();
        break;
    }
  }

  contextMenuClick(arg?: any) {
    if(arg.item.parentObj.id) {
      this.childId = arg.element.id;
      this.parentId = arg.item.parentObj.id;
      this.prepareInputs(this.childId);
    }

    if(this.childId && this.parentId && this.columnNameForManipulations) {
      this.editColumn(this.columnNameForManipulations, this.childId);
    }

    this.ejDialog.show();
  }

  onOpenDialog = (event: any): void => {

  }

  closeDialog(arg?: any) {
    if (this.isConfirm) {
      this.whatNeedToDoAndDoIt(this.childId, this.parentId, this.columnNameForManipulations)
    }
  }

  whatNeedToDoAndDoIt(childId: any, parentId: any, columnName: any) {
    const whatNeed = childId ? childId : parentId;
    switch (whatNeed) {
      case 'EditColumnName':
        this.getColumn(columnName).headerText = this.columnNameValue;
        break;
      case 'EditColumnDataType':
        if(columnName === 'taskID') {
          return
        } else {
          this.getColumn(columnName).type = this.choosedDataType;
        }
        break;
      case 'EditColumnDefaultValue':
        this.getColumn(columnName).defaultValue
        break;
      case 'EditColumnMinWidth':
        this.getColumn(columnName).minWidth
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
    this.dialogHeaderText = 'Dialog Header';
    this.editingColumnName = false;
    this.editingColumnDataType = false;
    this.editingColumnDefaultValue = false;
    this.dialogHeaderText = '';
    this.columnName.reset();
    this.columnNameValue = '';
    this.columnDataType.reset();
    this.columnDefaultValueValue = '';
    this.columnDataType.reset();
    this.columnDataTypeValue = '';
  }

  editCol(columnName: string, action: string) {
    const column = this.treegrid.getColumnByField(columnName);
    this.columnName.setValue(column.headerText);
    this.treegrid.refreshColumns();
  }

  changeColName() {

  }

  itemRender(event: any) {

  }

  handleChange(event: any) {
    switch (this.childId) {
      case 'EditColumnName':
        this.columnNameValue = event.target.value;
        break;
      case 'EditColumnDefaultValue':
        this.columnDefaultValueValue = event.target.value;
        break;
      case 'EditColumnMinWidth':
        this.columnMinWidthValue = event.target.value;
        break;
    }
  }

  selectChanges(event: any) {
    this.choosedDataType = event.element.outerText;
  }

}

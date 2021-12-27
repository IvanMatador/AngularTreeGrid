import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { dataSource, virtualData } from './datasource';
import { VirtualScrollService, TreeGridComponent, ColumnMenuService, EditSettingsModel, ResizeService, EditService, ContextMenuService } from '@syncfusion/ej2-angular-treegrid';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ItemModel, MenuItemModel } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [VirtualScrollService, ColumnMenuService, ResizeService, EditService, ContextMenuService]
})

export class AppComponent implements OnInit {
  title = 'Angular-TreeGrid';

  @ViewChild('treegrid') treegrid!: TreeGridComponent;
  @ViewChild('ejDialog') ejDialog!: DialogComponent;
  @ViewChild('container', { read: ElementRef, static: true }) container!: ElementRef;
  public data!: Object[];
  public contextMenuItems!: MenuItemModel[];
  public editing!: EditSettingsModel;
  public editparams!: Object;
  public targetElement!: HTMLElement;
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
        isPrimary: true,
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
    { text: 'datetime' }
  ];

  public dialogHeaderText = 'Header';
  public dialogContentText = 'Content';
  public columnNameForManipulations!: string;
  public columnId!: string;
  public whatNeedToDo!: string;
  public editingColumnName!: boolean;
  public editingColumnDataType!: boolean;
  public editingColumnDefaultValue!: boolean;
  public editingColumnMinWidth!: boolean;
  public isConfirm!: boolean;
  public addOrEditForm: FormGroup = new FormGroup({

  });
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

  public customAttributes: Object;


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
    this.customAttributes = {class : 'customcss'};
  }

  public initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.container.nativeElement.parentElement;
  }

  contextMenuOpen(arg?: any) {
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

  getColumn(columnName: string) {
    return this.treegrid.getColumnByField(columnName);
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
    if(arg.item.properties.id) {
      this.columnId = arg.item.properties.id;
      this.prepareInputs(this.columnId);
    }

    if(this.columnId && this.columnNameForManipulations) {
      this.editColumn(this.columnNameForManipulations, this.columnId);
    }

    this.onOpenDialog(arg)
  }

  onOpenDialog = (event: any): void => {
    console.log('open dialog')
    console.log(this.columnId)
    console.log(this.columnNameForManipulations)
    const column = this.getColumn(this.columnNameForManipulations)
    this.prepareInputsForAddingOrEditing(column)

    this.ejDialog.show();
  }

  findStyle(style: string, value: string) {
    const rules: string[] = [];
    let result = '';
    if(style.includes(value)) {
      style.split(';').map(item => {
        if(item && item.length > 2) rules.push(item)
      });
      let [rule] = rules.filter(item => item.includes(value));
      result = rule.split(':')[1];
    }
    return result ? result : null;
  }

  prepareInputsForAddingOrEditing(column: any) {
    console.log(column)
    const colIndex = column.uid;
    const colHeader = document.querySelector<HTMLElement>(`[e-mappinguid="${colIndex}"]`);
    const allStyles = window.getComputedStyle(colHeader!);
    column.oldStyles = {
      textAlign: allStyles.textAlign,
      textWrap: allStyles.whiteSpace,
      bgColor: allStyles.backgroundColor,
      color: allStyles.color,
      fontSize: allStyles.fontSize,
    };

    //let oldStyles = colHeader?.getAttribute('style');
    //colHeader!.style.backgroundColor = 'red'
    /*console.log(this.findStyle(oldStyles as string, 'text-align'));
    if(oldStyles?.includes('text-align:')) textAlign = this.findStyle(oldStyles as string, 'text-align');
    if(oldStyles?.includes('text-wrap:')) textWrap = this.findStyle(oldStyles as string, 'text-wrap');
    if(oldStyles?.includes('background-color:')) bgColor = this.findStyle(oldStyles as string, 'background-color');
    if(oldStyles?.includes('color:')) color = this.findStyle(oldStyles as string, 'color');
    if(oldStyles?.includes('font-size:')) fontSize = this.findStyle(oldStyles as string, 'font-size');*/
    //colHeader?.setAttribute('style', oldStyles)
    this.addOrEditForm = new FormGroup({
      columnName: new FormControl(column.headerText),
      columnDataType: new FormControl(column.editType),
      columnDefaultValue: new FormControl(column.defaultValue),
      columnMinWidth: new FormControl(column.minWidth),
      columnFontSize: new FormControl(column.oldStyles.fontSize.replace('px', '')),
      columnFontColor: new FormControl(column.oldStyles.color),
      columnBackgroundColor: new FormControl(column.oldStyles.bgColor),
      columnTextAligh: new FormControl(column.oldStyles.textAlign),
      columnTextWrap: new FormControl(column.oldStyles.textWrap),
    });
    /*this.columnName.patchValue(column.headerText);
    //this.columnNameValue: string = '';
    this.columnDataType.patchValue('');
    //this.columnDataTypeValue: string = '';
    this.columnDefaultValue.patchValue('');
    //this.columnDefaultValueValue: string = '';
    this.columnMinWidth.patchValue('');
    //this.columnMinWidthValue: string = '';
    this.columnFontSize.patchValue('');
    //this.columnFontSizeValue: string = '';
    this.columnFontColor.patchValue('');
    //this.columnFontColorValue: string = '';
    this.columnBackgroundColor.patchValue('');
    //this.columnBackgroundColorValue: string = '';
    this.columnTextAligh.patchValue('');
    //this.columnTextAlighValue: string = '';
    this.columnTextWrap.patchValue('');
    //this.columnTextWrapValue: string = '';*/
  }

  closeDialog(arg?: any) {
    console.log('close dialog')
    console.log(this.isConfirm)
    if (this.isConfirm) {
      this.whatNeedToDoAndDoIt(this.columnId, this.columnNameForManipulations)
    }
  }

  whatNeedToDoAndDoIt(columnId: any, columnName: any) {
    const whatNeed = columnId;
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
    switch (this.columnId) {
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

  onSubmit() {

  }

}

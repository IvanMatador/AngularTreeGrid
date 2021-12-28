import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { dataSource, virtualData } from './datasource';
import { VirtualScrollService, TreeGridComponent, ColumnMenuService, EditSettingsModel, ResizeService, EditService, ContextMenuService } from '@syncfusion/ej2-angular-treegrid';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemModel, MenuItemModel } from '@syncfusion/ej2-navigations';
import { CancelEventArgs } from '@syncfusion/ej2-angular-inputs';

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
  public actionToDo!: string;
  public columnId!: string;
  public whatNeedToDo!: string;
  public editingColumnName!: boolean;
  public editingColumnDataType!: boolean;
  public editingColumnDefaultValue!: boolean;
  public editingColumnMinWidth!: boolean;
  public isConfirm!: boolean;
  public addOrEditForm: FormGroup;
  // = new FormGroup({

  // });
  /* public columnName = new FormControl('');
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
  public columnTextWrapValue: string = ''; */
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


  constructor(private fb: FormBuilder){
    this.addOrEditForm= this.fb.group({
      columnName:['', Validators.required],
      columnDataType: [''],
      columnDefaultValue: [''],
      columnMinWidth: [''],
      columnFontSize: [''],
      columnFontColor: [''],
      columnBackgroundColor: [''],
      columnTextAligh: [''],
      columnTextWrap: [''],
    })
  }
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

  getColumn(columnName: string) {
    return this.treegrid.getColumnByField(columnName);
  }

  editColumn(columnName: string, action: string) {
    /* const column = this.getColumn(columnName);
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
    } */
  }

  contextMenuClick(arg?: any) {
    if(arg) {
      this.actionToDo = arg.item.properties.id;
      console.log(this.actionToDo)
    }

    this.onOpenDialog(arg)
  }

  checkAreInputsPristine(form: FormGroup) {
    if(form.pristine) return;
    const dirtyControls = new Map();
    const controls = form.controls;
    for(let control in controls) {
      if(!controls[control].pristine) dirtyControls.set(control, controls[control].value);
    }

    return dirtyControls;
  }

  checkInputs(event: any) {
    const inputs = this.checkAreInputsPristine(this.addOrEditForm);
    console.log(inputs)
    if(inputs && inputs.size > 0 && this.addOrEditForm.status === 'VALID' && this.isConfirm) {
      this.whatNeedToDoAndDoIt(inputs);
      event.cancel = false;
    } else if(this.addOrEditForm.status !== 'VALID' && this.isConfirm) {
      alert('some fields are invalid or there is no changes, please check the data')
      event.cancel = true;
    }
  }

  onOpenDialog = (event: any): void => {
    const column = this.getColumn(this.columnNameForManipulations)
    this.prepareInputsForAddingOrEditing(column)

    this.ejDialog.show();
  }

  prepareInputsForAddingOrEditing(column: any) {
    console.log(column)
    const colIndex = column.uid;
    const colHeader = document.querySelector<HTMLElement>(`[e-mappinguid="${colIndex}"]`);
    const allStyles = window.getComputedStyle(colHeader!);
    this.addOrEditForm.patchValue({
      columnName: column.headerText,
      columnDataType:column.editType,
      columnDefaultValue: column.defaultValue,
      columnMinWidth: column.minWidth,
      columnFontSize: allStyles.fontSize.replace('px', ''),
      columnFontColor: '#000000',
      columnBackgroundColor: '#ffffff',
      columnTextAligh: allStyles.textAlign,
      columnTextWrap: allStyles.whiteSpace,
    })
  }

  closeDialog(arg?: any) {
    this.addOrEditForm.updateValueAndValidity();
    console.log(this.isConfirm , this.addOrEditForm)
    if (this.isConfirm && this.addOrEditForm.status === 'VALID') {
      this.whatNeedToDoAndDoIt(this.columnNameForManipulations)
    } else if(this.isConfirm && this.addOrEditForm.status !== 'VALID') {
      alert('wrong form values, please check data!')
    }
  }

  getValueOfInput(name: string) {
    return this.addOrEditForm.get(name)!.value;
  }

  getStyles(column: any) {
    const colIndex = column.uid;
    const colHeader = document.querySelector<HTMLElement>(`[e-mappinguid="${colIndex}"]`);
    const oldStyle = colHeader!.getAttribute('style');
    return oldStyle ? oldStyle : '';
  }

  whatNeedToDoAndDoIt(fieldValuesPairs: any) {
    const whatNeed = this.actionToDo;
    const column = this.getColumn(this.columnNameForManipulations);
    const colIndex = column.uid;
    const colHeader = document.querySelector<HTMLElement>(`[e-mappinguid="${colIndex}"]`);
    let oldStyle = this.getStyles(column);
    switch (whatNeed) {
      case 'EditCol':
        for(let [input, value] of fieldValuesPairs) {
          switch(input) {
            case 'columnName':
              column.headerText = value;
              break;
            case 'columnDataType':
              column.editType = value;
              break;
            case 'columnDefaultValue':
              column.defaultValue = value;
              break;
            case 'columnMinWidth':
              column.minWidth = value;
              break;
            case 'columnFontSize':
              colHeader!.setAttribute('style', this.getStyles(column) + ` font-size: ${value}px;`);
              break;
            case 'columnFontColor':
              colHeader!.setAttribute('style', this.getStyles(column) + ` color: ${value};`);
              break;
            case 'columnBackgroundColor':
              colHeader!.setAttribute('style', this.getStyles(column) + ` background-color: ${value};`);
              break;
            case 'columnTextAligh':
              colHeader!.setAttribute('style', this.getStyles(column) + ` text-align: ${value};`);
              break;
            case 'columnTextWrap':
              colHeader!.setAttribute('style', this.getStyles(column) + ` white-space: ${value};`);
              break;
            default: return;
          }
        }
        oldStyle = this.getStyles(column);
        
    }
    this.treegrid.refreshColumns();
    //this.clearAllInputs();
    console.log(oldStyle)
    colHeader!.setAttribute('style', oldStyle);
    console.log(colHeader)
  }

  clearAllInputs() {
    this.editingColumnName = false;
    this.editingColumnDataType = false;
    this.editingColumnDefaultValue = false;
    this.dialogHeaderText = '';
    this.addOrEditForm.reset();
  }

  editCol(columnName: string, action: string) {
    const column = this.treegrid.getColumnByField(columnName);
    //this.columnName.setValue(column.headerText);
    this.treegrid.refreshColumns();
  }

  changeColName() {

  }

  itemRender(event: any) {

  }

  handleChange(event: any) {
    /* switch (this.columnId) {
      case 'EditColumnName':
        this.columnNameValue = event.target.value;
        break;
      case 'EditColumnDefaultValue':
        this.columnDefaultValueValue = event.target.value;
        break;
      case 'EditColumnMinWidth':
        this.columnMinWidthValue = event.target.value;
        break;
    } */
  }

  selectChanges(event: any) {
    this.choosedDataType = event.element.outerText;
  }

  onSubmit() {

  }

}

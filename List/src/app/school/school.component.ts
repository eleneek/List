

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { GenerateIdService } from '../generate-id.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { StudendsComponent } from '../studends/studends.component';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnInit {
  schoolForm: FormGroup;
  schoolData = this.generateIdService.schoolData;
  displayedColumns: string[] ;
  dataSource;
  constructor(
    private fb: FormBuilder,
    private generateIdService: GenerateIdService,
    public dialog: MatDialog,
    ) { }

  columnNames = [{
    id: 'id',
    value: 'ID'

  }, {
    id: 'name',
    value: 'Name'
  },
  {
    id: 'street',
    value: 'Street'
  }];

  ngOnInit() {
    this.schoolForm = this.fb.group({
      name: ['', [Validators.required ]],
      street: ['', [Validators.required]]
    });

    this.displayedColumns = this.columnNames.map(x => x.id);
    this.displayedColumns.push('actions');
    this.createTable();
  }

  get name() {
    return this.schoolForm.get('name').value;
  }

  get street() {
    return this.schoolForm.get('street').value;
  }
  createTable() {
    this.dataSource = new MatTableDataSource(this.schoolData);
  }
  checkName() {
    if (this.schoolData && this.name) {
      if (this.schoolData.some(el => el.name.toLowerCase() === this.name.toLowerCase() )) {
        return true;
      }
    }
  }
  add() {
    if (!this.checkName() ) {
    this.schoolData.push({
      id : this.generateIdService.generateId(),
      name:  this.name,
      street : this.street,
      students: []
    });
    this.dataSource.data = [...this.schoolData];
    this.schoolForm.reset();
    }

    console.log(this.schoolData);
  }

  delete(elm) {
    this.dataSource.data = this.dataSource.data.filter(i => i !== elm);
    this.schoolData = this.schoolData.filter(i => i !== elm);
  }

  openDialog(element): void {
    const dialogRef = this.dialog.open(DialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      element.students.push(result);
    });
  }

  openData(element): void {
    const dialogRef = this.dialog.open(StudendsComponent, {
      data: {element}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Data Works');
    });
  }

}

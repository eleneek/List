import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { GenerateIdService } from '../generate-id.service';

@Component({
  selector: 'app-studends',
  templateUrl: './studends.component.html',
  styleUrls: ['./studends.component.scss']
})
export class StudendsComponent implements OnInit {
  schoolData = this.generateIdService.schoolData;
  studentsList = this.data.element.students;
  displayedColumns: string[] ;
  dataSource;
  dataCopy = [...this.studentsList]
  constructor(
    private generateIdService: GenerateIdService,
    public dialogRef: MatDialogRef<StudendsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  columnNames = [{
    id: 'fullName',
    value: 'Name'

  }, {
    id: 'email',
    value: 'Email'
  },
  {
    id: 'age',
    value: 'Age'
  }];

  ngOnInit() {
    this.displayedColumns = this.columnNames.map(x => x.id);
    this.displayedColumns.push('actions');
    this.createTable();
  }
  sortAlp() {
    this.dataCopy.sort((a, b) => a.fullName.localeCompare(b.fullname));
    this.dataSource.data = this.dataCopy;
  }
  sortNum() {
    this.dataCopy.sort((a, b) => parseFloat(a.age) - parseFloat(b.age));
    this.dataSource.data = this.dataCopy;
  }
  createTable() {
    this.dataSource = new MatTableDataSource(this.studentsList);
  }

  delete(elm) {
    this.dataSource.data = this.dataSource.data.filter(i => i !== elm);
    this.studentsList = this.studentsList.filter(i => i !== elm);
  }

  disable() {
    return this.studentsList.length < 2;
  }

  reset() {
    this.dataSource.data = this.studentsList;
  }
}

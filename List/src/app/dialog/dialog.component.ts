import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { GenerateIdService } from '../generate-id.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  addStudentForm: FormGroup;
  ages = [];
  student = {};
  duplicate = false;
  schoolData = this.generateIdService.schoolData;
  constructor(
    private generateIdService: GenerateIdService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.addStudentForm = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      age: ['', Validators.required]
    });
  }
  get email() {
    return this.addStudentForm.get('email').value;
  }
  get fullName() {
    return this.addStudentForm.get('fullName').value;
  }
  get age() {
    return this.addStudentForm.get('age').value;
  }

  checkName() {
    this.schoolData.forEach(el => el.students.forEach(stud => {
      if (stud.email.toLowerCase() === this.email) {
        this.duplicate = true;
      }
    }));
    return this.duplicate;
  }

  add() {
    if (!this.checkName()) {
      this.student = {
        email: this.email,
        fullName: this.fullName,
        age: this.age
      };
      this.dialogRef.close(this.student);
    }
  }

  change() {
    if(this.checkName()) {
      this.duplicate = false;
    }
  }
  addAge() {
    for (let i = 6;  i < 25 ; i++) {
      this.ages.push(i);
    }
  }


}

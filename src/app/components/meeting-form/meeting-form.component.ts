import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MeetingService } from '../../service/meeting.service';

@Component({
  selector: 'app-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.css']
})
export class MeetingFormComponent implements OnInit {

  public form: FormGroup;

  public idEdit: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MeetingFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: string,
    private service: MeetingService
  ) {
    this.idEdit = data;
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      subject: ['', Validators.required],
      reponsible: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });

    if (this.idEdit != null) {
      this.getById();
    }

  }

  getById() {
    this.service.getById(this.idEdit)
      .subscribe(result => {
        this.form = this.fb.group({
          id: [result['id'], Validators.required],
          name: [result['name'], Validators.required],
          subject: [result['subject'], Validators.required],
          reponsible: [result['reponsible'], Validators.required],
          date: [result['date'], Validators.required],
          time: [result['time'], Validators.required]
        });

      }, err => {
        err => console.log('Erro: ', err);
      });
  }

  save(): void {
    if (this.form.value.id == null) {
      this.create();
    } else {
      this.update();
    }
  }

  create() {
    this.service.insert(this.form.value)
      .subscribe(result => {
        console.log('Resultado: ', result)
        this.dialogRef.close(true);
        this.form.reset();
        window.location.reload();

      }, err => {
        err => console.log('Erro: ', err);
      });

  }


  update() {
    this.service.update(this.form.value)
      .subscribe(result => {
        console.log('Resultado: ', result),
          this.dialogRef.close(true);
        this.form.reset();
        window.location.reload();

      }, err => {
        err => console.log('Erro: ', err);
      });

  }

  cancel(): void {
    this.dialogRef.close();
  }

}

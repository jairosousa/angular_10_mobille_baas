import { Component, Inject, OnInit } from '@angular/core';
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

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MeetingFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private service: MeetingService
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      subject: ['', Validators.required],
      reponsible: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    })

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
        console.log('Resultado: ', result),
          err => console.log('Erro: ', err);

      });

    this.dialogRef.close(true);
    this.form.reset();
    // window.location.reload();
  }


  update() {
    this.service.update(this.form.value)
      .subscribe(result => {
        console.log('Resultado: ', result),
          err => console.log('Erro: ', err);

      });

    this.dialogRef.close(true);
    this.form.reset();
    // window.location.reload();
  }

  cancel(): void {
    this.dialogRef.close();
  }

}

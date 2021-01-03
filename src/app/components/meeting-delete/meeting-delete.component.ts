import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MeetingService } from '../../service/meeting.service';

@Component({
  selector: 'app-meeting-delete',
  templateUrl: './meeting-delete.component.html',
  styleUrls: ['./meeting-delete.component.css']
})
export class MeetingDeleteComponent implements OnInit {

  public idDelete: string;

  constructor(
    public dialogRef: MatDialogRef<MeetingDeleteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: string,
    private router: Router,
    private service: MeetingService
  ) {
    this.idDelete = data;
  }

  ngOnInit(): void {
  }



  cancel() {
    this.dialogRef.close();
  }

  delete() {
    this.service.delete(this.idDelete)
      .subscribe(result => {
        console.log("Resp delete", result);
        this.dialogRef.close(true);
        window.location.reload();

      }, err => {
        console.log('Erro', err);
        console.log('Erro', err.status);
        console.log('Erro', err.error);
        console.log('Erro', err.headers);
        this.dialogRef.close(true);
      })
  }
}

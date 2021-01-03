import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MeetingService } from '../../service/meeting.service';
import { MeetingDeleteComponent } from '../meeting-delete/meeting-delete.component';
import { MeetingFormComponent } from '../meeting-form/meeting-form.component';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'subject', 'reponsible', 'date', 'time', 'action'];
  meetings = [];

  length: number;
  totalRecordsPerPage: number = 5;
  meetingNameFind: string;
  meetingDateFind: string;

  constructor(
    private service: MeetingService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findAll(0, 'date', null);
  }

  findAll(pageNumber: number, sortField: string, filters: string) {
    this.service.getAll(pageNumber, this.totalRecordsPerPage, sortField, filters)
      .subscribe(meetingsReturn => {
        console.log(meetingsReturn);

        this.meetings = meetingsReturn['meeting'],
          this.length = meetingsReturn['page'].size

      },
        err => {
          console.log('Erro', err);
          console.log('Erro', err.status);
          console.log('Erro', err.error);
          console.log('Erro', err.headers);

        })
  }

  getServerData(event?: PageEvent) {
    this.findAll(event.pageIndex, 'date', null);
  }

  edit(id: string) {
    const dialogRef = this.dialog.open(MeetingFormComponent, {
      width: '500px',
      data: id
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        console.log('The dialog was closed');

      })

  }

  confirmDelete(id: string) {
    const dialogRef = this.dialog.open(MeetingDeleteComponent, {
      width: '500px',
      data: id
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        console.log('The dialog was closed');

      })

  }

}

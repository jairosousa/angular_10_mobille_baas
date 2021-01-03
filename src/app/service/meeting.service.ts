import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  MOBILE_BASS_URL: string = 'https://mobilebaas.com/backend/api/manage/db';

  tableName: string = 'meeting';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'MOBILEBAASKEY': 'MTYwOTY3ODgzNjk5MUphaXJvIE5hc2NpbWVudG8='
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  insert(meeting: any) {
    const url = `${this.MOBILE_BASS_URL}?table=${this.tableName}`

    return this.http.post(url, meeting, this.httpOptions);
  }

  update(meeting: any) {
    const url = `${this.MOBILE_BASS_URL}?table=${this.tableName}`

    return this.http.put(url, meeting, this.httpOptions);
  }

  delete(id: string) {
    const url = `${this.MOBILE_BASS_URL}/${id}?table=${this.tableName}`

    return this.http.delete(url, this.httpOptions);
  }

  getById(id: string) {
    const url = `${this.MOBILE_BASS_URL}/${id}?table=${this.tableName}`

    return this.http.get(url, this.httpOptions);
  }

  getAll(pageNumber: number = 0, totalRecordsPerPage: number = 5, sortField: string, filters: string) {

    let parameter = '';

    if (pageNumber != null) {
      parameter += `&pageNumber=${pageNumber}`
    }

    if (totalRecordsPerPage != null) {
      parameter += `&totalRecordsPerPage=${totalRecordsPerPage}`
    }

    if (sortField != null) {
      parameter += `&sortField=${sortField}`
    }

    if (filters != null) {
      parameter += `&filters=${filters}`
    }

    const url = `${this.MOBILE_BASS_URL}/find?table=${this.tableName}${parameter}`

    return this.http.get(url, this.httpOptions);
  }
}

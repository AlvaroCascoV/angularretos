import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable()
export class ServiceFiles {
  constructor(private _http: HttpClient) {}

  uploadFile(fileName: any, fileContent: any): Observable<any> {
    let request = 'api/testingfiles';
    let url = environment.urlApiFiles + request;

    const formData = new FormData();
    formData.append('file', fileName, fileContent);

    return this._http.post(url, formData);
  }
}

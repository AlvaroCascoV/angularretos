import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable()
export class ServiceFiles {
  constructor(private _http: HttpClient) {}

  uploadFile(fileName: string, fileContentBase64: string): Observable<any> {
    const request = 'api/testingfiles';
    const url = environment.urlApiFiles + request;

    const archivo = {
      fileName: fileName,
      fileContent: fileContentBase64,
    };

    return this._http.post(url, archivo);
  }
}

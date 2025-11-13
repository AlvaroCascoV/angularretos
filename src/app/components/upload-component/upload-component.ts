import { Component } from '@angular/core';
import { ServiceFiles } from '../../services/ServiceFiles';

@Component({
  selector: 'app-upload',
  standalone: false,
  templateUrl: './upload-component.html',
  styleUrl: './upload-component.css',
})
export class UploadComponent {
  constructor(private _service: ServiceFiles) {}

  uploadFile(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      let fileName = file.name;
      let fileContent = file;
      this._service.uploadFile(fileName, fileContent).subscribe((response) => {
        console.log(response);
      });
    }
  }
}

import { Component } from '@angular/core';
import { ServiceFiles } from '../../services/ServiceFiles';

@Component({
  selector: 'app-upload',
  standalone: false,
  templateUrl: './upload-component.html',
  styleUrls: ['./upload-component.css'],
})
export class UploadComponent {
  constructor(private _service: ServiceFiles) {}
  selectedFile?: File;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input?.files?.[0];
  }

  confirmUpload(): void {
    if (!this.selectedFile) return;
    const file = this.selectedFile;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64 = dataUrl.includes(',') ? dataUrl.split(',')[1] : dataUrl;
      this._service
        .uploadFile(file.name, base64)
        .subscribe((res) => console.log('upload success', res));
    };
  }
}

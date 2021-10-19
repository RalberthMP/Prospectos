import { Component, OnInit, Output, EventEmitter, Input,} from '@angular/core';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
//import { LoginProvider } from '../../providers/login/login.service';
//import { BaseUrl } from '../../configuration/Configuration';
import { BaseUrl } from '../../configuration/Configuration';

const URL = BaseUrl+ 'api/upload2';

@Component({
  selector: 'app-multi-file-upload',
  templateUrl: './multi-file-upload.component.html',
  styleUrls: ['./multi-file-upload.component.scss'],
})
export class MultiFileUploadComponent implements OnInit {

  @Output() archivoSel = new EventEmitter<any>();
  @Output() archivoDrop = new EventEmitter<any>();

  public uploader: FileUploader;
  public IdFactura: number;
  public hasBaseDropZoneOver: boolean = false;
  hasAnotherDropZoneOver:boolean;
  response:string; 
  public dir=BaseUrl+'api/Archivo/Upload/';

  constructor(
    //public login: LoginProvider,
  ) {
    let hh1= Headers["Content-Type:multipart/form-data; boundary=gc0p4Jq0M2Yt08jU534c0p"];
    this.uploader = new FileUploader({
      url: this.dir,
      headers: hh1,
      //withCredentials: false,
      //authToken:this.login.LoggedUser.Token,
      removeAfterUpload:true,
      //additionalParameter:{ "withCredentials":"false"},
      //allowedFileType:["xml"],      
      isHTML5:true,
      //authTokenHeader:this.login.LoggedUser.Token,
      method:'POST',      
      disableMultipart: false, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: false,
      formatDataFunction: async (item) => {
        return new Promise((resolve, reject) => {
          resolve({
            name: item._file.name,            
            length: item._file.size,
            contentType: item._file.type,
            date: new Date(),
            
          });
        });
      }
    });

    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.response = '';
  }

  ngOnInit() {}

  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }

  fileOverBase(ev): void {
    this.hasBaseDropZoneOver = ev;
  }

  // reorderFiles(reorderEvent: CustomEvent): void {
  //   let element = this.uploader.queue.splice(reorderEvent.detail.from, 1)[0];
  //   this.uploader.queue.splice(reorderEvent.detail.to, 0, element);
  // }

  RemoveFile(item)
  {
    let index=0;
    index= this.uploader.queue.findIndex(x=>x.file.name== item.file.name);
    this.uploader.queue.splice(index,1);
  }

  onselectFile($event)
  { 
    this.archivoSel.emit($event);
  }

  onDropFile($event)
  {
    this.archivoDrop.emit($event);
  }

}

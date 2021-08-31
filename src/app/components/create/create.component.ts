import { Component, OnInit } from '@angular/core';
import { Proyect } from '../../models/proyect';
import { ProyectService } from '../../services/proyect.service';
import { UploadService } from '../../services/upload.service'
import { Global } from '../../services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProyectService, UploadService]
})
export class CreateComponent implements OnInit {

  public title: string;
  public proyect: Proyect;
  public flag: number;
  public filesToUpload: Array<File>;

  constructor(
    private _proyectService: ProyectService,
    private _uploadService: UploadService
  ){ 
    this.title = 'Crear Proyecto';
    this.proyect = new Proyect('','','','','2020','','');
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    this._proyectService.saveProyect(this.proyect).subscribe(
      response => {
        if(response.proyect){

          var id = response.proyect._id;
          //Subir imagen
          this._uploadService.makeFileRequest(Global.url+'upload-image/'+id, [], this.filesToUpload, 'image')
          .then((result:any) =>{
            this.flag = 1;
            console.log(result);
            form.reset();
          });
          
        }
      },
      error => {
        console.log(<any>error);
        this.flag = 0;
      }
      
    );
  }

  fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}

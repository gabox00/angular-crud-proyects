import { Component, OnInit } from '@angular/core';
import { Proyect } from '../../models/proyect';
import { ProyectService } from '../../services/proyect.service';
import { UploadService } from '../../services/upload.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProyectService,UploadService]
})
export class EditComponent implements OnInit {

  public proyect: Proyect;
  public image: string;
  public url: string;
  public filesToUpload: File[];

  constructor(
    private _proyectService: ProyectService,
    private _uploadService: UploadService,
    private _router: Router,
    private _rotue: ActivatedRoute
  ) { 
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._rotue.params.subscribe(params => {
      let id = params.id;
      this._proyectService.getProyect(id).subscribe(
        response => {
          this.proyect = response.proyect;
        },
        error => {
          console.log(<any>error);
        }
      )
    });
  }

  editProyect(formResponse){
    this._rotue.params.subscribe(params => {
      var id = params.id;
      this.proyect = formResponse.form.value;
      this._proyectService.editProyect(id,this.proyect).subscribe(
        response => {
          if(response.proyect){
            
            if(this.filesToUpload){
              console.log(this.filesToUpload);
              //Subir imagen
              this._uploadService.makeFileRequest(this.url+'upload-image/'+id, [], this.filesToUpload, 'image')
              .then((result:any) =>{
                this.proyect = result.proyect;
              });
            }
            else{
              this.proyect = response.proyect;
            } 

          }
        });
    });
  }

  fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}

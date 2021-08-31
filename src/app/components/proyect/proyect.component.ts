import { Component, OnInit } from '@angular/core';
import { Proyect } from '../../models/proyect';
import { ProyectService } from '../../services/proyect.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';

@Component({
  selector: 'app-proyect',
  templateUrl: './proyect.component.html',
  styleUrls: ['./proyect.component.css'],
  providers: [ProyectService]
})
export class ProyectComponent implements OnInit {

  public proyect: Proyect;
  public url: string;
  public flag: number;

  constructor(
    private _proyectService: ProyectService,
    private _router: Router,
    private _rotue: ActivatedRoute
  ) { 
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._rotue.params.subscribe(params => {
      let id = params.id;;
      this.getProyect(id);
    });
  }

  getProyect(id){
    this._proyectService.getProyect(id).subscribe(
      response => {
        this.proyect = response.proyect;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  deleteProyect(id){
    this._proyectService.deleteProyect(id).subscribe(
      response => {
        this.flag = 1;
      },
      error => {
        console.log(<any>error);
        this.flag = 0;
      }
    )
  }
}

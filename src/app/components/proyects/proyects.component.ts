import { Component, OnInit } from '@angular/core';
import { Proyect } from '../../models/proyect';
import { ProyectService } from '../../services/proyect.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.css'],
  providers: [ProyectService]
})
export class ProyectsComponent implements OnInit {

  public proyects: Proyect[];
  public url: String;

  constructor(
    private _proyectService: ProyectService
  ) { 
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getProyects();
  }

  getProyects(){
    this._proyectService.getProyects().subscribe(
      response => {
        this.proyects = response.proyects;
      },
      error => {
        console.log(error);
      }
    );
  }

}

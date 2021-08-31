import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyect } from '../models/proyect';
import { Global } from './global';

@Injectable()
export class ProyectService{
    public url: string;
    public headers: HttpHeaders;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
        this.headers = new HttpHeaders().set('Content-Type','application/json');
    }

    saveProyect(proyect: Proyect):Observable<any>{
        let params = JSON.stringify(proyect);

        return this._http.post( this.url+'saveProyect', params, {headers: this.headers} );
    }

    getProyects():Observable<any>{
        return this._http.get(this.url+'proyects', {headers: this.headers});
    }

    getProyect(id):Observable<any>{
        return this._http.get(this.url+'proyect/'+id, {headers: this.headers});
    }

    deleteProyect(id):Observable<any>{
        return this._http.delete(this.url+'delete-proyect/'+id, {headers: this.headers});
    }

    editProyect(id, proyect: Proyect):Observable<any>{
        let params = JSON.stringify(proyect);
        return this._http.put(this.url+'update-proyect/'+id, params, {headers: this.headers})
    }
}
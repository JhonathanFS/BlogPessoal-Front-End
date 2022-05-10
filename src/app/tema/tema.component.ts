import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})

export class TemaComponent implements OnInit {

  tema: Tema = new Tema()
  listTema: Tema[]

  constructor(
    private router: Router,
    private tService: TemaService
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      // alert('Sua sessão expirou, faça o login novamente')
      this.router.navigate(['/login'])
    }

    this.tService.refreshToken()
    this.findAllTema()
  }

  findAllTema(){
    this.tService.getAllTema().subscribe((resp: Tema[]) =>{
      this.listTema = resp
    })
  }

  tCadastrar(){
    this.tService.postTema(this.tema).subscribe((resp: Tema) =>{
      this.tema = resp
      alert('Tema cadastrado com sucesso!')
      this.findAllTema()
      this.tema = new Tema()
    })
  }
}

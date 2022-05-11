import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema: Tema = new Tema()
  tId: number

  constructor(
    private router: Router,
    private tService: TemaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      // alert('Sua sessão expirou, faça o login novamente')
      this.router.navigate(['/login'])
    }
    this.tService.refreshToken()
    this.tId = this.route.snapshot.params['id']
    this.findByIdTema(this.tId)
  }

  findByIdTema(id: number){
    this.tService.getByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  tDelete(){
    this.tService.deleteTema(this.tId).subscribe(() => {
      alert('Deletado com sucesso!!')
      this.router.navigate(['/tema'])
    })
  }
}

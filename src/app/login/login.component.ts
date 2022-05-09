import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarioLogin: UsuarioLogin = new UsuarioLogin();

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  logar() {
    this.authService.logar(this.usuarioLogin).subscribe({
      next: (resp: UsuarioLogin) => {
        this.usuarioLogin = resp;
        alert('Usuario Logado com sucesso');

        environment.id = this.usuarioLogin.id;
        environment.nome = this.usuarioLogin.nome
        environment.token = this.usuarioLogin.token
        environment.foto = this.usuarioLogin.foto
        environment.usuario = this.usuarioLogin.usuario
        environment.tipo = this.usuarioLogin.tipo

        this.router.navigate(['/home']);
      },
      error: (error) => {
        if (error.status == 401) {
          alert('Usuário e/ou senha inválidos');
        }
      },
    });
  }

}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.component';
import { Auth } from 'src/app/auth.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  public formCadastro: FormGroup = new FormGroup({
    email: new FormControl(null),
    nome_completo: new FormControl(null),
    nome_usuario: new FormControl(null),
    senha: new FormControl(null),
  });

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  constructor(private autenticacao: Auth) { }

  ngOnInit() {
  }

  public exibir() {
    this.exibirPainel.emit('login');
  }

  public salvarDados(): void {

    let usuario = new Usuario(
      this.formCadastro.controls['email'].value,
      this.formCadastro.get('nome_completo').value,
      this.formCadastro.get('nome_usuario').value,
      this.formCadastro.value.senha,
    );

    this.autenticacao.cadastrarUsuario(usuario)
      .then(() => { this.exibir(); });

  }

}

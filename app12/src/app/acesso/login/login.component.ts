import { Component, OnInit, EventEmitter ,Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Auth } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup = new FormGroup({
    email: new FormControl(null),
    senha: new FormControl(null),
  });

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  constructor(private auth: Auth) { }

  ngOnInit() {
  }

  public exibicao(){
    this.exibirPainel.emit('cadastro');
  }

  public autenticar(){
    console.log(this.formLogin);

    let email = this.formLogin.get('email').value;
    let senha = this.formLogin.get('senha').value;

    this.auth.autenticar(email, senha);
  }

}

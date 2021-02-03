import { Component, OnInit, ViewChild } from '@angular/core';
import { Auth } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('publicacoes', {static: true}) public publicacoes: any;

  constructor(private autentica: Auth) { }

  ngOnInit() {
  }

  public atualizarTimeline(): any{
    //setTimeout(()=>{this.publicacoes.consultarPublicacoes();}, 3000);
    this.publicacoes.consultarPublicacoes();
  }

  public sair(){
    this.autentica.logOut();
  }
}

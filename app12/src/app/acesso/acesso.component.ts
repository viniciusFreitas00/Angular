import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('animacao-banner', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(-40px, 0)' }),
        animate('500ms 0s ease-in-out') // duração, delay, aceleração.
      ])
    ]),
    trigger('animacao-painel', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(40px, 0)' }),
        /*0s void => -------------X-----------------X-X--X--X--X------------------ 1.5s criado*/
        animate('1500ms 0s ease-in-out', keyframes([ // duração, delay, aceleração.
          style({ offset: 0.30, opacity: 1, transform: 'translateX(0)' }),
          style({ offset: 0.60, opacity: 1, transform: 'translateX(0)' }),

          style({ offset: 0.62, opacity: 1, transform: 'translateY(-40px)' }),
          style({ offset: 0.65, opacity: 1, transform: 'translateY(20px)' }),
          style({ offset: 0.68, opacity: 1, transform: 'translateY(-10px)' }),
          style({ offset: 0.71, opacity: 1, transform: 'translateY(10px)' }),

          style({ offset: 1, opacity: 1, transform: 'translateY(0px)' }),
        ]))
      ])
    ])
  ]
})

export class AcessoComponent implements OnInit {
  public estadoBanner: string = 'criado';
  public estadoPainel: string = 'criado';

  private cadastro: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  /*
  public trocarCadastro(){
    this.cadastro = !this.cadastro;
  }
  */
  public exibirPainel(evento) {
    this.cadastro = evento === 'cadastro' ? true : false;
  }

  public inicioAnimacao() {
    //console.log('Inicio da animação');
  }
  public fimAnimacao() {
    //window.alert('fim da animação');
  }
  

}

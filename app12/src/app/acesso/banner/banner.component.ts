import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Imagem } from '../../models/imagem.component'

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [
      state('escondido', style({
        opacity: 0
      })),
      state('visivel', style({
        opacity: 1
      })),
      transition('escondido <=> visivel', animate('1s ease-in'))
    ])
  ]
})

export class BannerComponent implements OnInit {

  imagens: Array<Imagem> = [
    { estado: 'escondido', url: '../../../assets/banner-acesso/img_1.png' },
    { estado: 'escondido', url: '../../../assets/banner-acesso/img_2.png' },
    { estado: 'escondido', url: '../../../assets/banner-acesso/img_3.png' },
    { estado: 'escondido', url: '../../../assets/banner-acesso/img_4.png' },
    { estado: 'visivel', url: '../../../assets/banner-acesso/img_5.png' },
  ];


  constructor() { }

  //public estado: string = 'visivel';

  ngOnInit() {
    setTimeout(() => this.rotacao(), 3000);
  }

  public rotacao() {
    let index: number; // índice da da imagem seguinte.

    for (let i: number = 0; i < this.imagens.length; i++) {
      //ocultar imagem.
      if (this.imagens[i].estado === 'visivel') {
        this.imagens[i].estado = 'escondido';

        index = (i + 1) % 5; //Igual a index = i === 4 ? 0 : (i + 1);
        break
      }
    }

    //Exibir a próxima imagem.
    this.imagens[index].estado = 'visivel';

    setTimeout(() => {
      this.rotacao(); // condição de loop infinito "Programação Funcional". A cada 2 segundos esse mesmo método é chamado realizando a sua ação.
    }, 3000);
  }
}

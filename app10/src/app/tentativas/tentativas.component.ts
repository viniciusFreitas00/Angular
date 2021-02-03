import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Coracao } from '../shared/Coracao.model';

@Component({
  selector: 'app-tentativas',
  templateUrl: './tentativas.component.html',
  styleUrls: ['./tentativas.component.css']
})
export class TentativasComponent implements OnInit, OnChanges {

  @Input() public tentativas : number

  public coracoes : Array<Coracao> = [
    new Coracao(true), // por padrão começa com 3 chances (vidas), portanto os 3 são true na construção do objeto.
    new Coracao(true), 
    new Coracao(true)
  ]

  constructor() { 
  }

  ngOnChanges(){
    /* métodos são executados durante o processo de decoração de componentes pai para filhos, ou seja, 
    é disparado sempre que houver input e/ou alteração de dados, é disparado ainda antes do OnInit() e depois do construtor.*/

    if(this.tentativas!== this.coracoes.length){ /* precisa do if pois a primeira chamada do método é feita ao inicio do component, 
      ou seja, mesmo sem errar um coração ficaria vazio, fazendo o índice do coração resultar em -1, que não existe no array.*/
      let indice = this.coracoes.length - this.tentativas

      this.coracoes[indice -1].cheio = false
    }
  }

  ngOnInit() {
    //console.log(this.tentativas) // métodos são executados apenas uma vez, no início do component.
  }

}

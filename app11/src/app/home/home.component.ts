import { Component, OnInit } from '@angular/core';

import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ OfertasService ] // injeção do serviço que gera ofertas.
})
export class HomeComponent implements OnInit {

  public ofertas : Oferta[] // recebe as ofertas do serviço ofertas.service

  constructor(private ofertasService : OfertasService) { } // instancia um objeto do tipo OfertasService diretamente em um objeto criado no construtor.

  ngOnInit() {

    let tempo = Observable.create((observer: Observer<string>)=>{
      observer.next('1 evento');
      observer.next('2 evento');
    });

    tempo.subscribe((response)=>{console.log(response)}, (erro)=>{console.log()}, (conclusion)=>{console.log()});

   //this.ofertas = this.ofertasService.getOfertas() // a partir daqui as ofertas do serviços são passadas para o atributo do componente.
   //console.log(this.ofertas)

   //this.ofertas = this.ofertasService.getOfertas2()   --> causa erro, pois o objeto ofertas não é do tipo Promise, a solução é utilizar o método then.
   //then(Executa uma ação quando uma promise estiver resolvida.)

   /* Recebe como parâmetros o retorno da função resolve ou da função reject, no caso,
   a função resolve retorna um Array de Oferta, por isso é criado uma variável do mesmo tipo.*/
   

   /* Exemplo 1 de promise com resolve e reject como parâmetros do then.

   this.ofertasService.getOfertas2()
    .then(
      ( ofertas : Array<Oferta>) =>{
      this.ofertas = ofertas //Quando a informação for retornada podemos usar uma arrowFunction para dar uma ação a essa resposta, FUNÇÃO 1 chamada caso receba o resolve.
      }, 
      (param : any) => {// FUNÇÃO 2 chamada caso recebe o reject.
        console.log(param)
      }
    )

    */
    
   //Exemplo 2 (Com o uso do catch).
   this.ofertasService.getOfertas() // Método inalterado pois o atributo ofertas trabalha com Array<Oferta>, que é o valor de retorno da Promise.
    .then(( ofertas : Array<Oferta>) =>{ // then recebe como parâmetro a variavel da função resolve.
      this.ofertas = ofertas
      console.log(this.ofertas);
     })
    .catch((param : any) => { // catch recebe como parâmetro a instrução da função reject.
      console.log(param)
     })

     
  }

}


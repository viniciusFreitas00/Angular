import { Component, OnInit } from '@angular/core';

import { Oferta } from '../shared/oferta.model' // Importa o modelo de dados que vai trabalhar.
import { OfertasService }from '../ofertas.service' // Importa o Serviço que será utilizado no component, do mesmo tipo de dados importado acima.

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  providers: [ OfertasService ] // Informa qual serviço será provido pro componente restaurante.
})
export class RestaurantesComponent implements OnInit {

  constructor(private ofertasService : OfertasService) { }

  private ofertas : Array<Oferta>

  ngOnInit() {
    this.ofertasService.getOfertasPorCategoria('restaurante')
    .then((ofertas : Oferta[]) => { // ofertas (argumento) recebe o resultado do resolve da Promise getOfertasPorCategoria() (resposta).
      this.ofertas = ofertas
      console.log(this.ofertas)
    })
  }

}

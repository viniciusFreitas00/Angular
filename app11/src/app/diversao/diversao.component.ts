import { Component, OnInit } from '@angular/core';

import { Oferta } from '../shared/oferta.model';
import { OfertasService } from '../ofertas.service';


@Component({
  selector: 'app-diversao',
  templateUrl: './diversao.component.html',
  styleUrls: ['./diversao.component.css'],
  providers: [ OfertasService ]
})
export class DiversaoComponent implements OnInit {

  constructor(private servico : OfertasService) { }

  private ofertas : Array<Oferta>

  ngOnInit() {
    this.servico.getOfertasDiversao().then((ofertasResultado : Oferta[]) => {
      this.ofertas = ofertasResultado;
      console.log(this.ofertas);
    })
  }

}

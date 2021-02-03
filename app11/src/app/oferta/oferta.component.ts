import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit {

  public oferta: Oferta;

  constructor(
    private route: ActivatedRoute, 
    private ofertasService: OfertasService
    ) { }

  ngOnInit() {
    //Recuperando parametros da rota a partir do método Snapshot.
    //console.log('ID recuperado da rota: ' + this.route.snapshot.params['id']); 
    
    /* Recuperando parametros da rota com o método Subscribe.
    this.route.params.subscribe((parametro : any) => {
      console.log(parametro.id);
    });
    */

    this.ofertasService.getOfertaByID(this.route.snapshot.params['id'])
      .then(( oferta : Oferta ) =>{
        console.log(oferta);
        this.oferta = oferta;
    })
  }

}

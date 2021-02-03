import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertaComponent } from '../oferta.component';
import { OfertasService } from 'src/app/ofertas.service';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [ OfertasService ]
})
export class ComoUsarComponent implements OnInit {

  constructor(private route: ActivatedRoute, private ofertasService: OfertasService) { }

  comoUsar = ''
  ngOnInit() {
    this.ofertasService.getComoUsarbyId(this.route.parent.snapshot.params['id']).then((response)=>{
      this.comoUsar = response;
      console.log(this.comoUsar);
    })

  }

}

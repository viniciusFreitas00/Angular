import { Component } from '@angular/core'

@Component({
    // cada um desses campos sao metadados, utilizados no formato json 
    selector: 'app-topo', //selector é referencia ao nome da tag que será criada, pode ser uma tag, atributo = []  ou classe = .
    templateUrl: './topo.component.html', // templateUrl aponta para o arquivo que será mostrado na tela (view) no caso arquivos .html
    styleUrls: ['./topo.component.css'] // define o estilo do arquivo html.
})
export class TopoComponent{
    public titulo: string = 'Aprendendo ingles'
}

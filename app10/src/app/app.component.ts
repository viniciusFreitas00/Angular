import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'App - Tradutor';

  public jogoEmAndamento : boolean = true
  public tipoEncerramento : string

  public encerrarJogo(tipo: string) : void{ /* método executado sempre que o atributo encerrarJogo do component filho
    for exposto com base na emissão de um evento (emit, que recebe uma string).*/
    this.jogoEmAndamento = false
    this.tipoEncerramento = tipo // recebe o tipo de encerramento (vitória ou derrota) para tratar depois com o ngIf no template.
  }

  // Método chamado por um evento para reiniciar o jogo, deixando os atributos da classe eme seus estados originais.
  public reiniciarJogo(): void{
    this.jogoEmAndamento = true;
    this.tipoEncerramento = undefined
  }

}

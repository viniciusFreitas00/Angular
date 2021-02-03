import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Frase } from '../shared/frase.model'
import { FRASES } from './frases-mock'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

  public frases: Frase[] = FRASES
  public instrucao: string = 'traduza a frase:'
  public resposta: string // Resposta do usuário recuperada com evento html.
  public rodada: number = 0
  public rodadaFrase: Frase
  public progresso: number = 0
  public tentativas: number = 3

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter() /* @Output faz o data Binding entre o component filho e o component pai de maneira semelhante ao @Input
  EventEmitter recebe o tipo string para disparar um evento que recebe esse tipo, no caso o atributo "tipo" do component pai, é generic e pode 
  receber outros tipos de dado ou ainda ter seu tipo omitido, no parâmetro o próprio angular entende qual tipo de dado está sendo recebido.*/

  constructor() {
    this.attRodadaFrase() // Atualiza a frase a ser traduzida.
  }

  public attResposta(resposta: Event): void { // Atualiza a resposta.
    this.resposta = (<HTMLInputElement>resposta.target).value
  }

  public verificaResposta(): void {

    if (this.rodadaFrase.frasePTBR.toUpperCase() == this.resposta.toUpperCase()) {
      //Trocar Pergunta da resposta.
      this.rodada++
      this.progresso += (100 / this.frases.length) // Da a porcentagem de quanto o progresso deve aumentar, baseado na quantidade de perguntas.

      if (this.rodada > 3) {
        this.encerrarJogo.emit('Vitória') /* Emite um evento atravéz output de dados, passa esse evento (emit) para o método encerrarJogo() do component pai, esse método é 
        transformado em evento que só é disparado quando esse evento (emit) for emitido pelo atributo encerrarJogo do component filho.*/
      }
      //Atualiza a pergunta que será feita ao usuário se ele acertar a resposta da pergunta anterior.
      this.attRodadaFrase()
    }
    else {
      this.tentativas--
      if (this.tentativas <= 0) {
        this.encerrarJogo.emit('Derrota') /* Emite um evento atravéz output de dados, passa esse evento (emit) para o método encerrarJogo() do component pai, esse método é 
        transformado em evento que só é disparado quando esse evento (emit) for emitido pelo atributo encerrarJogo do component filho.*/
      }

    }
  }

  public attRodadaFrase(): void {
    this.rodadaFrase = this.frases[this.rodada] // rodadafrase recebe frases em uma posição baseada na rodada, não em uma posição estática, define o valor com alguma lógica.
    this.resposta = ''  //Limpa a resposta no text area
  }
  ngOnInit() {
  }
  ngOnDestroy() {
  }

}

import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Phrase } from '../shared/phrase.model';
import { PHRASES } from './phrase-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})

export class PainelComponent implements OnInit, OnDestroy {

  public phrases: Phrase[] = PHRASES;
  public instrucao: string = 'Traduire la phrase:';
  public resposta: string = '';

  public tour: number = 0;
  public tourPhrase: Phrase;

  public progresso: number = 0;

  public tentativas: number = 3;

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter();


  constructor() {
    this.actualiseTour();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement> resposta.target).value;
    // console.log(this.resposta)
  }

  public verificarResposta(): void {

    if (this.tourPhrase.phraseFR === this.resposta) {

      // trocar pergunta da tour
      this.tour++;

      // progresso
      this.progresso = this.progresso + (100 / this.phrases.length);

      //
      if ( this.tour === 4 ) {
        this.encerrarJogo.emit('victoire');
      }

      // atualiza o objeto actualiseTour
      this.actualiseTour();

    } else {
      // decrementar a variavel tentativas
      this.tentativas--;

      if (this.tentativas === -1) {
        this.encerrarJogo.emit('defaite');
      }
    }
  }

  public actualiseTour(): void {
    this.tourPhrase = this.phrases[this.tour];

    // limpar a resposta
    this.resposta = '';
  }
}

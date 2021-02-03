import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Bd } from 'src/app/bd.service';
import * as firebase from 'firebase';
import { Progresso } from 'src/app/progresso.service';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-incluir-posts',
  templateUrl: './incluir-posts.component.html',
  styleUrls: ['./incluir-posts.component.css']
})

export class IncluirPostsComponent implements OnInit {

  @Output() public atualizarFrame: EventEmitter<any> = new EventEmitter<any>();

  public email: string;
  public imagem: any;

  public teste: number = 30;

  public progressoPost: string = 'pendente';
  public porcentagemProgresso: number = 0;

  public formModalPosts = new FormGroup({
    email: new FormControl(null, Validators.required),
    titulo: new FormControl(null),
  });

  constructor(public bd: Bd,
    public progresso: Progresso) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user: any) => {
      this.formModalPosts.get('email').setValue(user.email);
    });
  }

  public prepararArquivoPost(evento: Event): any {
    //console.log((<HTMLInputElement>evento.target).files);
    this.imagem = evento[0];
  }

  public publicarPost(): void {

    let dto = {
      titulo: this.formModalPosts.get('titulo').value,
      email: this.formModalPosts.get('email').value,
      imagem: this.imagem,
    };

    this.bd.publicar(dto);

    let continuar = new Subject();
    continuar.next(true);

    let progressoUpload = interval(300);

    progressoUpload
      .pipe(takeUntil(continuar))
      .subscribe(() => { // a foto só será armazenada caso a publicação seja adicionada ao banco de dados e terá um vínculo de nome com a key da publicação.

        if (this.progresso.estado) {
          this.porcentagemProgresso = Math.round((this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes) * 100);
        }

        this.progressoPost = 'andamento';

        if (this.progresso.status === 'Concluido') {
          this.progressoPost = 'concluido';
          continuar.next(false);
          this.atualizarFrame.emit();
        }
      });

    //this.formModalPosts.reset();
      
  }

  /*
  public FecharModal(): void {
    //this.formModalPosts.reset();
  }
  */
}

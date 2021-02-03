import * as firebase from 'firebase';
import { error } from 'protractor';

import { Progresso } from './progresso.service';
import { Injectable } from '@angular/core';
import { compileNgModule } from '@angular/compiler';

@Injectable()
export class Bd {

    constructor(public progresso: Progresso) { }

    public publicar(post: any): void {

        firebase.database().ref(`publicacoes/${btoa(post.email)}`)
            .push({ titulo: post.titulo })
            .then((response: firebase.database.ThenableReference) => {

                const nomeImagem: string = response.key;

                //Upload da imagem.
                firebase.storage().ref()
                    .child(`imagens/${nomeImagem}`)
                    .put(post.imagem)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED, // listener do put.
                        // progresso do Upload.
                        (snapshot: any) => {
                            //console.log('Snapshot capturado do método on()', snapshot);
                            this.progresso.status = 'Andamento';
                            this.progresso.estado = snapshot;
                        },
                        (error: Error) => {
                            this.progresso.status = 'Erro';
                            console.log(error)
                        },
                        () => {
                            //Finalização do processo de upload.
                            this.progresso.status = 'Concluido';
                        }
                    );
            })
            .catch((erro: Error) => {
                alert('Não foi possível postar a imagem.' + erro.message);
            });
    }

    public consultarPosts(emailUsuario: any): Promise<any> {

        //console.log(btoa(firebase.auth().currentUser.email));   Email do usuario logado na base 64.

        return new Promise(async (resolve, reject) => {
            try {
                // consultar as publicações. (Database)
                let snapshot = await firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
                    .orderByKey()
                    .once('value');
                //console.log(snapshot.val());

                let publicacoes: Array<any> = [];

                //Primeiro ordeno o Array de publicações e inverto a órdem para que seja exibida sempre a ultima publicação.
                snapshot.forEach((childSnapshot: any): any => {
                    //console.log(childSnapshot.val());

                    let publicacao = childSnapshot.val();
                    publicacao.key = childSnapshot.key;

                    publicacoes.push(publicacao);

                });

                publicacoes.reverse();

                // Depois, para cada um dos objetos no array de Publicações eu adiciono o respectvo url de imagem e nome de usuario.
                publicacoes.forEach((publicacao) => {

                    //consultar url da imagem. (Storage).
                    firebase.storage().ref().child(`imagens/${publicacao.key}`).getDownloadURL()
                        .then((url) => {
                            publicacao.url_imagem = url;

                            //Consultar o nome do usuário. (Database).
                            firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`).once('value')
                                .then((snapshot: any) => {
                                    publicacao.nome_usuario = snapshot.val().nome_usuario;
                                });
                        });
                });
                //console.log(publicacoes);
                resolve(publicacoes);
            }
            catch (erro) {
                reject(erro.message);
            }
        });
    }

    /*
    return new Promise(async (resolve, reject) => {
            try {
                // consultar as publicações. (Database)
                let snapshot = await firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
                    .orderByKey()
                    .once('value');
                console.log(snapshot.val());

                let publicacoes: Array<any> = [];

                snapshot.forEach((childSnapshot: any) => {
                    //console.log(childSnapshot.val());

                    let publicacao = childSnapshot.val();

                    //consultar url da imagem. (Storage).
                    firebase.storage().ref().child(`imagens/${childSnapshot.key}`).getDownloadURL()
                        .then((url) => {
                            publicacao.url_imagem = url;

                            //Consultar o nome do usuário. (Database).
                            firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`).once('value')
                                .then((snapshot: any) => {
                                    publicacao.nome_usuario = snapshot.val().nome_usuario;
                                });
                        });

                    publicacoes.push(publicacao);

                    resolve(publicacoes);
                });
            }
            catch (erro) {
                reject(erro.message);
            }
        });
    */
}
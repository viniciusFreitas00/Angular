import { Usuario } from './models/usuario.component';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class Auth {

    public token_id: string;

    constructor(private router: Router) { }

    /*
    public async cadastrarUsuario(usuario: Usuario) {
        try {
            let response: any = await firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha);
            console.log(response);
            return response;
        }
        catch (erro) {
            console.log(erro);
        }
    }
    */

    public cadastrarUsuario(usuario: Usuario): Promise<any> {

        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((response: any) => {
                console.log(response);
                // Retirando a informação de senha do usuário da base de dados.
                delete usuario.senha;

                // Registrando dados complementares do usuário pelo path email, em base 64.
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`).set(usuario);
            })
            .catch((erro: Error) => { console.log(erro) });
    }

    public async autenticar(email: string, senha: string) {
        
        try {
            await firebase.auth().signInWithEmailAndPassword(email, senha);
            
            try {
                this.token_id = await firebase.auth().currentUser.getIdToken();
                localStorage.setItem('token_id', this.token_id);
            }
            catch (error) {
                console.log('Erro: ' + error);
            }
            this.router.navigate(['/home']);
        }
        catch (erro) {
            console.log(erro);
        }
    }

    /*
    public autenticar(email: string, senha: string): void {
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((response: any) => { console.log(response) })
            .catch((erro: Error) => { console.log(erro) });
    }
    */

    public autenticado(): boolean {
        
        /* Lógica para passar valor para o token_id caso o usuário atualize ou feche a página, é feita a verificação para saber se o token_id tem valor, 
        caso não tenha (undefined) e tenha algum ítem armazenado em Local Storage que seja diferente de null, então o token_id recebe esse valor armazenado
        em Local Storage*/
        if(this.token_id === undefined && localStorage.getItem('token_id')){
            this.token_id = localStorage.getItem('token_id');
        }

        //Caso o usuário tente acessar alguma rota que não foi ativada será redirecionado para a raiz.
        if(this.token_id === undefined){
            this.router.navigate(['/']);
        }

        return this.token_id !== undefined;
    }

    public async logOut(): Promise<any>{

        let sair: any = await firebase.auth().signOut();

        this.token_id = undefined;
        localStorage.removeItem('token_id');
        this.router.navigate(['/']);

        return sair;
    }
}
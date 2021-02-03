import { HttpClient } from '@angular/common/http'; // importando serviço.
import { Oferta } from './shared/oferta.model';
import { promise } from 'protractor';
import { resolve } from 'url';
import { Injectable } from '@angular/core'; // importa um serviço (http) em outro serviço (Essa classe).
import { URL_OFERTAS_API } from './app.api'; // Utilizando uma constante em outra classe para ter acesso global à API, qualquer outro arquivo que importar essa constante terá acesso à URl da API.

@Injectable() export class OfertasService{ /* Decora a classe OfertasService para ter acesso ao módulo http do angular, atravéz do objeto "http" criado no constructor.
Injeta um serviço em outro serviço.*/

    //private url_ofertas_api : string = 'http://localhost:3000/ofertas'; Isolando a URLda API através da própria classe como um atributo.

    constructor(private http: HttpClient){ /* com essa instrução, o objeto do tipo OfertasService será construído com um atributo baseado
       no httpClient importado do angular*/
    }

    public getOfertas() : Promise<Oferta[]>{
        // fazer uma requisição http
        return this.http.get(`${URL_OFERTAS_API}/ofertas?destaque=true`) // método get() utiliza o verbo GET do http, requisita as informações passadas no endereço do parâmetro informado.
        .toPromise()
        .then((resposta : any) => resposta) /* Arrowfunction com 1 parâmetro e retorno simples, sem necessidade de usar {}, é retornada a resposta 
        para passar o resultado da requisição para quem chama o método getOfertas()*/
    }

    // método para montar a requisição de ofertas pela categoria.
    public getOfertasPorCategoria(categoria : string) : Promise<Oferta[]>{ 
        /* Uso de crase "` `" para usar template($) e concatenar uma informação estática com uma variavel(categoria)*/
        return this.http.get(`${URL_OFERTAS_API}?categoria=${categoria}`)// retorna um observable.
        .toPromise() // Converte Observable em Promise.
        .then((resposta : any) => resposta) // resposta será enviado para uma variavel criada no then() de quem chamar o método getOfertasPorCategoria().
         
    }
    //Criando um novo método de serviço (Promise) apenas para teste.
    public getOfertasDiversao() : Promise<Oferta[]>{
        return this.http.get(`${URL_OFERTAS_API}?categoria=diversao`)
        .toPromise()
        .then((resultado: any) => resultado)
    }

    getOfertaByID(id: number): Promise<Oferta>{
       return this.http.get(`${URL_OFERTAS_API}?id=${id}`)
        .toPromise()
        .then((response: any) => response[0]); /* retornando o que foi pegado no servidor pelo método get(), como o retorno é uma lista (Array)
        e eu preciso receber apenas 1 oferta, utilizo o método shift() que retorna a primeira posição do array ou pego o índice [0] que é o 
        primeiro e único da lista, assim me é retornado um objeto e não um array de objetos.*/
    }
    getComoUsarbyId(id: number): Promise<string>{
        return this.http.get(`${URL_OFERTAS_API}/como-usar?id=${id}`).toPromise()
        .then((result: any) =>{
            console.log(result[0].descricao);
            return result;
        })
    }

    getOndeFicabyId(id: number): Promise<string>{
        return this.http.get(`${URL_OFERTAS_API}/onde-fica?id=${id}`).toPromise()
        .then((result: any) =>{
            console.log(result[0].descricao);
            return result;
        })
    }
    
}
import { Comparavel } from "../interfaces/comparavel.js";
import { Modelo } from "../interfaces/modelo.js";
import { Imprimivel } from "../utils/imprimivel.js";
import { Negociacao } from "./negociacao.js";

export class Negociacoes implements Modelo<Negociacoes> {
   
    // outra forma de declarar o array é:
    // private negociacoes: Negociacao[] = []
    private negociacoes: Array<Negociacao> = [];

    public adiciona(negociacao:Negociacao){
        this.negociacoes.push(negociacao);
    }

    // outra solução para impedir que a lista devolvida seja manipulada (pop, push), 
    // eh usando o parâmetro ReadonlyArray
    public lista(): ReadonlyArray<Negociacao> {

    // outra forma de declarar o tipo do metodo é:
    // lista(): readonly Negociacao[]

        // essa outra solução - Spread Operator, cria uma nova lista, inserindo os itens da lista negociacoes
        // return [...this.negociacoes];

        return this.negociacoes;
    }

    public paraTexto(): string {
        return JSON.stringify(this.negociacoes, null, 2);
    }

    public ehIgual(negociacoes: Negociacoes): boolean {
        return JSON.stringify(this.negociacoes) === JSON.stringify(negociacoes.lista());
    }
}

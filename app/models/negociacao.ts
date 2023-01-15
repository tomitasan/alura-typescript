import { NoSubstitutionTemplateLiteral } from "../../node_modules/typescript/lib/typescript";
import { Imprimivel } from "../utils/imprimivel.js";

export class Negociacao extends Imprimivel {
    // private _data: Date;
    // private _quantidade: number;
    // private _valor: number;

    // constructor(data: Date, quantidade: number, valor: number) {
    //     this._data = data;
    //     this._quantidade = quantidade;
    //     this._valor = valor;
    // }

    // desta forma, o construtor já entende que deve criar os atributos indicados
    // como private e associar o valor passado
    // constructor(
    //     private _data: Date, 
    //     private _quantidade: number, 
    //     private _valor: number
    // ) {}

    // outra forma de declarar os atributos com public e com readonly
    // usando essa declaração, não é necessário ter os metodos de get para os atributos
    // pois o get está implicito no public e o readonly impede alterações
    constructor(
        // mesmo com readonly, o type data permite que o usuario altere a data com um .setDate()
        // public readonly data: Date,

        private _data: Date,
        public readonly quantidade: number,
        public readonly valor: number
    ) {
        super();
    }

    get data(): Date {
        // retornando desta forma, impede que o usuário consiga alterar a data com .setDate()
        return new Date(this._data.getTime()); 
    }

    // get quantidade(): number {
    //     return this._quantidade;
    // }

    // get valor(): number {
    //     return this._valor;
    // }

    get volume(): number {
        return this.quantidade * this.valor;
    }

    public paraTexto(): string {
        return `
            Data: ${this.data},
            Quantidade: ${this.quantidade},
            Valor: ${this.valor}
        `;
    }

    public static criaDe(dataString: string, quantidadeString: string, valorString: string): Negociacao {
        const exp = /-/g;
        const date = new Date(dataString.replace(exp, ','));
        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString);
        return new Negociacao( date, quantidade, valor );
    }
}
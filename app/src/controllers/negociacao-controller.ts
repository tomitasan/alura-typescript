import { domInjector } from "../decorators/dom-injector.js";
import { inspect } from "../decorators/inspect.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";
// import { NegociacoesDoDia } from "../interfaces/negociacao-do-dia.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacoesService } from "../services/negociacoes-service.js";
import { imprimir } from "../utils/imprimir.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoController {
    @domInjector('#data')
    private inputData: HTMLInputElement;
    @domInjector('#quantidade')
    private inputQuantidade: HTMLInputElement;
    @domInjector('#valor')
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');
    private negociacoesService = new NegociacoesService();

    constructor() {
        // this.inputData = document.querySelector('#data') as HTMLInputElement;
        // this.inputQuantidade = document.querySelector('#quantidade') as HTMLInputElement;
        // this.inputValor = document.querySelector('#valor') as HTMLInputElement;
        this.negociacoesView.update(this.negociacoes);
    }

    @inspect
    @logarTempoDeExecucao()
    public adiciona(): void {
        // const negociacao = this.criaNegociacao();
        // const negociacaoTemp = new Negociacao(null, 0, 0);        
        // const t1 = performance.now();

        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );

        if (!this.ehDiaUtil(negociacao.data)){
            this.mensagemView.update('Apenas negociações em dias úteis são permitidas.');
            return;
        }

        this.negociacoes.adiciona(negociacao);
        // console.log(`
        //     Data: ${negociacao.data},
        //     Quantidade: ${negociacao.quantidade},
        //     Valor: ${negociacao.valor}
        // `);

        // console.log(negociacao.paraTexto());
        // console.log(this.negociacoes.paraTexto());

        imprimir(negociacao, this.negociacoes);

        this.limparFormulario();
        this.atualizaView();

        // const t2 = performance.now();
        // console.log(`Tempo de execução do método adiciona: ${(t2 - t1) / 1000} segundos`);
    }

    public importaDados():void {
        this.negociacoesService
            .obterNegociacoesDoDia()
            .then(negociacoesDeHoje => {
                return negociacoesDeHoje
                    .filter(negociacaoDeHoje => {
                        return !this.negociacoes
                            .lista()
                            .some(negociacao => negociacao
                                .ehIgual(negociacaoDeHoje));
                });
            })
            .then(negociacoesDeHoje => {
                for(let negociacao of negociacoesDeHoje) {
                    this.negociacoes.adiciona(negociacao);
                }
                this.negociacoesView.update(this.negociacoes);
            });
        /*
        fetch('http://localhost:8080/dados')
            .then(res => res.json())
            .then((dados: NegociacoesDoDia[]) => {
                return dados.map(dadosDeHoje => {
                    return new Negociacao(
                        new Date(), 
                        dadosDeHoje.vezes, 
                        dadosDeHoje.montante
                    );
                })
            })
            .then(negociacoesDeHoje => {
                for(let negociacao of negociacoesDeHoje) {
                    this.negociacoes.adiciona(negociacao);
                }
                this.negociacoesView.update(this.negociacoes);
             });
        */
    }


    private ehDiaUtil(data: Date){
        return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO;
    }

    // private criaNegociacao(): Negociacao {
        // const exp = /-/g;
        // const date = new Date(this.inputData.value.replace(exp, ','));
        // const quantidade = parseInt(this.inputQuantidade.value);
        // const valor = parseFloat(this.inputValor.value);
        // return new Negociacao( date, quantidade, valor );

        // const negociacao = new Negociacao(
            // this.inputData.valueAsDate, 
            // this.inputQuantidade.valueAsNumber, 
            // this.inputValor.valueAsNumber
        // );
        // console.log(this.inputData);
        // console.log(this.inputQuantidade);
        // console.log(this.inputValor);
    // }

    private limparFormulario():void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';

        this.inputData.focus();
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso');
    }
}
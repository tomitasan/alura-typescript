import { inspect } from "../decorators/inspect.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";

// declaração de classe abstrata impede que esta seja instanciada
export abstract class View<T> {

    protected elemento: HTMLElement;
    // private escapar = false;

    // o sinal de '?' indica parâmetro opcional
    // o valor default de escapar é false
    // o primeiro valor dos parâmetros de métodos nunca podem ser opcionais
    constructor(seletor: string){
        const elemento = document.querySelector(seletor);
        if(elemento){
            this.elemento = elemento as HTMLElement;
        } else {
            throw Error(`Seletor ${seletor} não existe do DOM. Verifique.`);
        }
        // this.elemento = document.querySelector(seletor);
        // if(escapar){
        //     this.escapar = escapar;
        // }
    }

    // @inspect()
    // @inspect
    // @logarTempoDeExecucao(true)
    public update(model: T): void {
        // const t1 = performance.now();

        let template = this.template(model);

        // remove qualquer <scrip> inserido no codigo HTML passado
        // if(this.escapar) {
        //     template = template.replace(/<script>[\s\S]*?<\.script>/, '');
        // }
        this.elemento.innerHTML = template;

        // const t2 = performance.now();
        // console.log(`Tempo de execução do método update: ${(t2 - t1) / 1000} segundos`);
    }

    // declaração abstract obriga que os filhos implementem este método
    protected abstract template(model: T): string;
}
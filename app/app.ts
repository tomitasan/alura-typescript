import { NegociacaoController } from "./controllers/negociacao-controller.js";

const controller = new NegociacaoController();
const form = document.querySelector('.form');
if(form)
{
    form.addEventListener('submit', event => {
        event.preventDefault();
        controller.adiciona();
    });
} else {
    throw Error('Não foi possível inicializar a aplicação. Verifique se o formulário existe.');
}

// import { Negociacao } from "./models/negociacao.js";

// const negociacao = new Negociacao(new Date(), 10, 100);

// console.log(negociacao.data);
// console.log(negociacao.quantidade);
// console.log(negociacao.valor);
// console.log(negociacao.volume);

// Não obriga o preenchimento dos campos quantidade e valor
// const negociacao = new Negociacao(new Date());

// Ocasiona erro na chamada de volume
// console.log(negociacao.volume); ---> NAN

// Se tentar associar um valor aos campos privados, vai dar erro
// Infelizmente o erro será visto apenas em tempo de execução e não compilação
// negociacao.quantidad = 10; ---> vai criar a variavel quantidad dinamicamente
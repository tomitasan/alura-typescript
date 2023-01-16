export function domInjector(seletor: string){
    return function(
        target: any, 
        propertKey: string
    ) {
        // console.log(propertKey);
        console.log(`Modificando prototype ${target.constructor.name} e adicionando getter para a propriedade ${propertKey}`)
        
        // o let elemento será usado para cachear o valor já buscado do querySelector
        // se for vazio, faz a busca do DOM
        // se for diferente de vazio, já faz o retorno
        let elemento: HTMLElement;

        const getter = function() {
            if(!elemento) {
                elemento = <HTMLElement>document.querySelector(seletor);
                console.log(`buscando elemento do DOM com o seletor ${seletor} para injetar em ${propertKey}`)
            }
            
            return elemento;
            
            /*
            const elemento = document.querySelector(seletor);
            console.log(`buscando elemento do DOM com o seletor ${seletor} para injetar em ${propertKey}`)
            return elemento;
            */
        }

        Object.defineProperty(
            target, 
            propertKey, 
            { get: getter }
        );
    }
}
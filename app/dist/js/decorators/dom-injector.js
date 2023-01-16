export function domInjector(seletor) {
    return function (target, propertKey) {
        console.log(`Modificando prototype ${target.constructor.name} e adicionando getter para a propriedade ${propertKey}`);
        let elemento;
        const getter = function () {
            if (!elemento) {
                elemento = document.querySelector(seletor);
                console.log(`buscando elemento do DOM com o seletor ${seletor} para injetar em ${propertKey}`);
            }
            return elemento;
        };
        Object.defineProperty(target, propertKey, { get: getter });
    };
}
//# sourceMappingURL=dom-injector.js.map
// export function inspect() {
    // return function(
    export function inspect(
        target: any,
        propertKey: string,
        descriptor: PropertyDescriptor
    ) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function(...args: Array<any>) {
            console.log(`--- Método: ${propertKey}`);
            console.log(`------ Parâmetros: ${JSON.stringify(args)}`);
            const retorno = metodoOriginal.apply(this, args);
            console.log(`------ Retorno: ${JSON.stringify(retorno)}`);
            return retorno;
        }

        return descriptor;
    }
// }
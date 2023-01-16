import { Imprimivel } from "../utils/imprimivel.js";
import { Comparavel } from "./comparavel.js";

// uma interface que extends outras interfaces
// necessario usar generics por conta da interface Comparavel
export interface Modelo<T> extends Imprimivel, Comparavel<T> {}
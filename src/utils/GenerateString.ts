import { GenerateAvator } from "./GenerateAvator.ts"

export default function  genStr(){
let str=''
for (let i =0; i <= 6; i++) { 
     const r = Math.floor(97+Math.random()* 26)
     str+=String.fromCharCode(r)
    }
    return GenerateAvator(str)
}


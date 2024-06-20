const inputs = document.querySelector(".inputs")
const btn = document.querySelector(".resetar")
const dica = document.querySelector(".dica")
const letrasErradas = document.querySelector(".letras-erradas")
const tentativas = document.querySelector(".tentativas")
const inputDigitacao = document.querySelector(".input-digitacao")

let palavras
let tentativasMaximas 
let erros = []
let corretas = []

const palavrasAleatoria = ()=>{
    let objetoPalavra = listaPalavras[Math.floor(Math.random() * listaPalavras.length)]
    palavras = objetoPalavra.palavra
    tentativasMaximas = 8
    erros = []
    corretas = []
    tentativas.innerHTML = tentativasMaximas
    letrasErradas.innerHTML = erros
    dica.innerHTML = objetoPalavra.dica

    let html = ""
    for (let index = 0; index < palavras.length; index++){
        html+= '<input type="text" disabled>'
    }

    inputs.innerHTML = html
}

let iniciarJogo = (evento) =>{
    //O evento tras uma letra
    let letra = evento.target.value.toLowerCase()
    console.log(letra)
    if (letra.match(/^[A-Za-z]+$/)&& !erros.includes(letra)&& !corretas.includes(letra)){
        if(palavras.includes(letra)){
            for (let index = 0; index < palavras.length; index++) {
                if(palavras[index] === letra){
                    corretas.push(letra)
                    inputs.querySelectorAll("input")[index].value = letra
                }
            }

        }else{
            erros.push(letra)
            tentativasMaximas--
        }

        tentativas.innerHTML = tentativasMaximas
        letrasErradas.innerHTML = erros
    }

    inputDigitacao.value =""

    setTimeout(()=>{
        if (corretas.length === palavras.length){
            alert("Parabens, voce completou o desafio")
            palavrasAleatoria()
        }
        else if (tentativasMaximas < 1){
            alert("Voce perdeu")
            palavrasAleatoria()
        }
    })
}
btn.addEventListener("click",palavrasAleatoria)
inputDigitacao.addEventListener("input", iniciarJogo)
document.addEventListener('keydown',()=>{
    inputDigitacao.focus()

})


palavrasAleatoria()
import React, { useEffect, useState } from "react";
import './App.css';

const palavras = ['gato','cachorro','elefante','macaco','gorila','girafa','papagaio','urubu','pica-pau','tartaruga','topeira',]

function Letras({letras, onClick}){
  return(
    <div className="letras">
        {letras.map(letra =>(
          <button key={letra} onClick={() => onClick(letra)} disable={false}>
            {letra}
          </button>
        ))}
    </div>
  );
}


  function Forca() {
    const [palavra, setPalavras] = useState('')
    const [letrasSelecionadas, setletrasSelecionadas] = useState([])
    const [tentativasErradas, settentativasErradas] = useState(0);

    function escolherPalavra() {
      return palavras[Math.floor(Math.random() * palavras.length)]
    }

    useEffect(() => {
      setPalavras(escolherPalavra());
      setletrasSelecionadas([]);
      settentativasErradas(0);
    }, [])

    function verificarLetra(letra) {
      return palavra.includes(letra)
    }

    function handleLetraClick(letra) {
      if (!letrasSelecionadas.includes(letra)){
        const novaLista = [...letrasSelecionadas, letra]
        setletrasSelecionadas(novaLista);

        if(!verificarLetra(letra)) {
          settentativasErradas(tentativasErradas + 1)
        }
      }
    }

    function palavraOculta () {
      return palavra.split('').map(letra => (letrasSelecionadas.includes(letra) ?
    letra: '_')).join(' ');
    }

      useEffect (() => {
        if (palavra && palavra.split('').every(letra => letrasSelecionadas.includes(letra))) {
          setTimeout(() => {
            alert('Parabéns! Você Ganhou! 😎');
            reiniciarJogo();
          }, 100)
        }
      }, [palavra, letrasSelecionadas])


          // efeito para verificar se o jogador perddeu (+6 tentativas)
    useEffect(() => {
      if(tentativasErradas >= 6){
        setTimeout(() => {
          alert('Game Over');
          reiniciarJogo();
        }, 100)   // milisegundos p exibir o alerrt
      }
    }, [tentativasErradas]) // executa a função toda vez que tiver uma alteração em 'tentativasErradas


    // Função p reiniciar o Game
    function reiniciarJogo(){
      setPalavras(escolherPalavra());
      setletrasSelecionadas([]);
      settentativasErradas(0)
    }

    return(
      <div className="forca">
        <h1>Jogo da Forca</h1>
        <div> Palavra: {palavraOculta()}</div>

        <Letras letras = {
          ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
           'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
           'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']} onClick = {handleLetraClick}
           />

           <div> Letra selecionadas: {letrasSelecionadas.join(',')}</div>
           <div> Tentativas Erradas: {tentativasErradas} de 6</div>

      </div>
    )
  }
  export default Forca;
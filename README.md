# 🃏 Anime Card Creator

<p align="center">
  <img src="https://cdn.discordapp.com/attachments/1520892831298879551/1528511483846197288/53ff9c76-affc-49b5-b01e-91394bef5d55.png?ex=6a5e90c0&is=6a5d3f40&hm=6506ea48f887a4796cc499d0f18b769482fba5050ee3846adcfd25e3272e45f4" alt="Demonstração do Anime Card Creator" width="700px">
</p>

<p align="center">
  Uma aplicação web interativa para criar, personalizar e baixar cartas de personagens de anime personalizadas em tempo real.
</p>

---

## 🚀 Sobre o Projeto

O **Anime Card Creator** é uma ferramenta interativa desenvolvida para fãs de anime e jogos de cartas. A aplicação permite que o usuário monte uma carta colecionável completa preenchendo dados básicos do personagem, definindo atributos numéricos através de sliders dinâmicos e escolhendo temas visuais. O grande diferencial é a geração de um preview em tempo real e a possibilidade de exportar a carta final como imagem.

## ✨ Funcionalidades Principais

* **Upload de Imagem por Drag-and-Drop:** Arraste e solte a foto do personagem ou clique na área designada para carregar um arquivo local.
* **Customização de Informações:** Campos para Nome do Personagem, Nome do Anime, Nome do Poder e Descrição detalhada.
* **Seleção Estilizada (Temas e Raridades):** Modifique o visual de fundo e as molduras da carta alterando o Tema do Card (Ar, Fogo, etc.), Raridade (Épico, Lendário, etc.) e Signo.
* **Sliders de Atributos Dinâmicos:** Ajuste os status de **STR** (Força Física), **VEL** (Velocidade), **INT** (Inteligência) e **MAG** (Magia).
* **Cálculo Automático de Poder:** A aplicação calcula instantaneamente o status final de **PODER** utilizando a média aritmética ponderada dos atributos essenciais: `(STR + VEL + INT) / 3`.
* **Download do Card:** Um botão dedicado que processa o elemento visual do card do preview e gera um arquivo de imagem pronto para download.

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando tecnologias web puras (Vanilla Web Stack), garantindo excelente desempenho e renderização:

* **HTML5:** Estruturação semântica do formulário de criação e do container de preview do card.
* **CSS3:** Interface moderna em tom escuro, design responsivo, estilização customizada de seletores e barras de progresso (sliders).
* **JavaScript (ES6+):** Manipulação dinâmica do DOM para atualização simultânea do preview, cálculo matemático dos status e lógica para exportação da imagem do card.

---
<p align="center">Desenvolvido por Gabriel Motta</p>

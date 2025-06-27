const produtos = [
    { nome: "Crème Brulée", preco: 18.00, img: "./assents/fotos/creme_brulle.jpg", descricao: "Sobremesa francesa feita com creme, ovos e baunilha, com crosta de açúcar queimado. Servida fria em ramekins." },
    { nome: "Tarte Tatin", preco: 22.00, img: "./assents/fotos/tarte_tatin.jpg", descricao: "A Tarte Tatin é uma torta francesa clássica feita com maçãs caramelizadas e massa folhada. Criada pelas irmãs Tatin no Vale do Loire, tornou-se um ícone da gastronomia mundial." },
    { nome: "Mille-Feuille", preco: 25.00, img: "./assents/fotos/milleFeille.jpg", descricao: "O mil-folhas, também chamado de napoleão em Portugal, é um doce feito com massa folhada e recheio de creme." },
    { nome: "Éclair", preco: 16.00, img: "./assents/fotos/eclair.jpg", descricao: "Doce alongado e oco feito com massa leve, recheado com cremes variados, e coberto com calda de chocolate." },
    { nome: "Tarte au Citron", preco: 20.00, img: "./assents/fotos/tarteaucitron.jpg", descricao: "Torta francesa clássica com base de massa doce e recheio cremoso de limão, às vezes coberta com merengue." },
    { nome: "Tarte aux Fruits", preco: 21.00, img: "./assents/fotos/tarteauxfruits.jpg", descricao: "Torta francesa de verão, feita com massa folhada doce, recheio de creme e frutas frescas." },
    { nome: "Flan Pâtissier", preco: 19.00, img: "./assents/fotos/flanpatissier.jpg", descricao: "Torta de creme feita com massa folhada e recheada com um creme de ovos, assada até firmar." },
    { nome: "Souflé", preco: 17.00, img: "./assents/fotos/soufle.jpg", descricao: "Suflê de frutas vermelhas, leve e aerado, feito com purê de frutas e claras em neve, assado até dourar levemente." },
    { nome: "Madeleines", preco: 14.00, img: "./assents/fotos/madeleines.jpg", descricao: "Biscoitos em forma de concha originários da França, delicados e tradicionais." },
    { nome: "Île Flottante", preco: 23.00, img: "./assents/fotos/iiaflotante.jpg", descricao: "Versão vegana do clássico francês, com merengue leve, creme de baunilha, calda de caramelo salgado e nozes." },
    { nome: "Mousse au Chocolat", preco: 18.00, img: "./assents/fotos/mousseauchocolet.jpg", descricao: "Sobremesa francesa clássica, com textura leve e sabor intenso de chocolate." },
    { nome: "Macaron", preco: 20.00, img: "./assents/fotos/macaron.jpg", descricao: "Biscoito redondo e pequeno, feito com farinha de amêndoas, açúcar e claras, recheado com ganache ou geleia." }
];

const container = document.getElementById("produtos");
const listaCarrinho = document.getElementById("lista-carrinho");
const totalEl = document.getElementById("total");
const finalizarBtn = document.getElementById("finalizar");
const carrinhoEl = document.getElementById("carrinho");
const btnAbrirCarrinho = document.getElementById("btn-abrir-carrinho");
let carrinho = [];

produtos.forEach(prod => {
    const div = document.createElement("div");
    div.className = "produto";
    div.innerHTML = `
        <img src="${prod.img}" alt="${prod.nome}" />
        <h3>${prod.nome}</h3>
        <p class="descricao-pequena">${prod.descricao}</p>
        <button class="botao-preco">🛒 R$ ${prod.preco.toFixed(2).replace('.', ',')}</button>
      `;
    container.appendChild(div);

    const img = div.querySelector("img");
    const titulo = div.querySelector("h3");
    const descricao = div.querySelector(".descricao-pequena");
    const botao = div.querySelector("button");

    descricao.style.display = "none";

    function toggleDescricao() {
        descricao.style.display = descricao.style.display === "none" ? "block" : "none";
    }

    img.addEventListener("click", toggleDescricao);
    titulo.addEventListener("click", toggleDescricao);

    botao.addEventListener("click", () => {
        adicionarCarrinho(prod.nome, prod.preco);
    });
});

function adicionarCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    atualizarCarrinho();
    abrirCarrinho();
}

function atualizarCarrinho() {
    listaCarrinho.innerHTML = "";
    let soma = 0;
    carrinho.forEach((item, i) => {
        soma += item.preco;
        const li = document.createElement("li");
        li.innerHTML = `
          ${item.nome} - R$ ${item.preco.toFixed(2).replace('.', ',')}
          <button onclick="removerItem(${i})" title="Remover item">&times;</button>
        `;
        listaCarrinho.appendChild(li);
    });
    totalEl.textContent = `Total: R$ ${soma.toFixed(2).replace('.', ',')}`;

    const mensagem = encodeURIComponent(
        "Olá, gostaria de fazer um pedido:\n" +
        carrinho
            .map(p => `- ${p.nome} (R$ ${p.preco.toFixed(2).replace('.', ',')})`)
            .join("\n") +
        `\nTotal: R$ ${soma.toFixed(2).replace('.', ',')}`
    );
    finalizarBtn.href = `https://wa.me/5568999806290?text=${mensagem}`;
}

function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function abrirCarrinho() {
    carrinhoEl.classList.add("ativo");
    btnAbrirCarrinho.style.display = "none";
}

function fecharCarrinho() {
    carrinhoEl.classList.remove("ativo");
    btnAbrirCarrinho.style.display = "block";
}

btnAbrirCarrinho.addEventListener("click", abrirCarrinho);

// Fecha carrinho ao clicar fora dele
document.addEventListener("click", (e) => {
    if (!carrinhoEl.contains(e.target) && e.target !== btnAbrirCarrinho) {
        fecharCarrinho();
    }
});

// Permite remover itens via função global para o onclick inline
window.removerItem = removerItem;
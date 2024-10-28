let carrinho = [];
let totalFaturamento = 0;

// Adiciona um item ao carrinho
function adicionarAoCarrinho(nome, preco, quantidade) {
    const item = {
        nome,
        preco,
        quantidade: parseInt(quantidade)
    };
    carrinho.push(item);
    atualizarCarrinho();
}

// Atualiza a exibição do carrinho
function atualizarCarrinho() {
    const carrinhoElement = document.getElementById('carrinho');
    carrinhoElement.innerHTML = '';
    let total = 0;

    carrinho.forEach((item, index) => {
        total += item.preco * item.quantidade;
        const li = document.createElement('li');
        li.innerHTML = `${item.nome} - R$${item.preco} x ${item.quantidade} 
                        <button class="remover" onclick="removerDoCarrinho(${index})">Remover</button>`;
        carrinhoElement.appendChild(li);
    });

    document.getElementById('total').textContent = `Total: R$${total.toFixed(2)}`;
}

// Remove um item do carrinho
function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// Limpa o carrinho
function limparCarrinho() {
    carrinho = [];
    atualizarCarrinho();
}

// Finaliza a compra
function finalizarCompra(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const cep = document.getElementById('cep').value;
    const bairro = document.getElementById('bairro').value;

    const comanda = `Nome: ${nome}\nEndereço: ${endereco}\nCEP: ${cep}\nBairro: ${bairro}\n\nItens:\n`;

    carrinho.forEach(item => {
        comanda += `${item.nome} - R$${item.preco} x ${item.quantidade}\n`;
    });

    document.getElementById('comanda').textContent = comanda;
    document.getElementById('comanda').style.display = 'block';

    totalFaturamento += carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    console.log(`Faturamento Total: R$${totalFaturamento.toFixed(2)}`);

    limparCarrinho();
}

// Imprime a comanda
function imprimirComanda() {
    const comanda = document.getElementById('comanda').textContent;
    const novaJanela = window.open('', '_blank');
    novaJanela.document.write(`<pre>${comanda}</pre>`);
    novaJanela.document.close();
    novaJanela.print();
}

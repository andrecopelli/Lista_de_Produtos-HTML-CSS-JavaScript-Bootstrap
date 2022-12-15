//-- Classe produto, construtor iniciando um array e as variáveis do objeto
class Produto {
  constructor() {
    this.id = 1
    this.nome = ''
    this.quantidade = 0
    this.preco = 0
    this.arrayProdutos = []
  }

  //-- Adiciona um produto ao array
  adicionar() {
    let produto = {} //Cria uma variável local e recebe nelas os dados digitados pelo usuário através dos inputs
    if (
      document.getElementById('produto').value == '' ||
      document.getElementById('quantidade').value == '' ||  //Impede a entrada de registros com campos vazios
      document.getElementById('preco').value == ''
    ) {
      alert('Preencha todos os campos para prosseguir')
    } else {
      produto.id = this.id
      produto.nome = document.getElementById('produto').value
      produto.quantidade = document.getElementById('quantidade').value
      produto.preco = document.getElementById('preco').value
      this.arrayProdutos.push(produto) //Forma o objeto produto e adiciona ao array
      this.id++ //Incrementa o Id do produto
      this.mostraProdutos() //Cria linha da tabela, popula a mesma com os dados e exibe dinamicamente na tabela
      this.limparInputs() //Limpa os inputs e devolve o foco ao primeiro campo da página
      this.calcularValorTotal() ////Faz o calculo entre o valor do produto e a quantidade, calcula o valor total se houver outros produtos e atualiza o elemento HTML h4
    }
  }

  //-- Cria uma tabela e atribui os valores a serem mostrados no HTML
  mostraProdutos() {
    let tbody = document.getElementById('tbody') //Usa como variável todo o elemento de corpo da tabela
    tbody.innerText = ''
    for (let index = 0; index < this.arrayProdutos.length; index++) {
      //Para cada produto da lista cria uma linha da tabela
      let tr = tbody.insertRow() //Cria a linha e atribuí a variável
      let td_id = tr.insertCell()
      let td_nome = tr.insertCell() //Para cada item do array é criado uma variável e também uma célula ta linha da tabela
      let td_quantidade = tr.insertCell()
      let td_preco = tr.insertCell()
      let td_excluir = tr.insertCell()
      td_id.innerText = this.arrayProdutos[index].id
      td_nome.innerText = this.arrayProdutos[index].nome
      td_quantidade.innerText = this.arrayProdutos[index].quantidade //Salva os elementos em cada variável correspondente
      td_preco.innerText = this.arrayProdutos[index].preco
      td_id.classList.add('center')
      td_nome.classList.add('center')
      td_quantidade.classList.add('center') //Adiciona a classe CSS as variáveis para a exibição correta dos dados
      td_preco.classList.add('center')
      let excluir = document.createElement('img') //Cria o elemento HTML de imagem e atribui a variável
      excluir.src = 'delete.png'
      excluir.setAttribute(
        'onclick', //Atribui a propriedade onclicl na variável
        'produto.excluir(' + this.arrayProdutos[index].id + ')', //Passa o id do produto para a função de excluir
      )
      td_excluir.appendChild(excluir) //Coloca o elemento criado como elemento filho do  table data selecionado
      td_excluir.classList.add('lixeira') //Adicona a classe CSS
    }
  }

  //--Limpa os intputs e seta o primeiro input como foco para já facilitar a inserção de mais um produto
  limparInputs() {
    document.getElementById('produto').value = ''
    document.getElementById('quantidade').value = ''
    document.getElementById('preco').value = ''
    document.getElementById('produto').focus()
  }

  //--Seleciona todo o corpo da tabela compara se o id passado por parâmetro é igual a algum id do array
  excluir(id) {
    let tbody = document.getElementById('tbody')
    for (let index = 0; index < this.arrayProdutos.length; index++) {
      if (this.arrayProdutos[index].id === id) {
        this.arrayProdutos.splice(index, 1) //Exclui o registro do array através de um splice
        tbody.deleteRow(index) //Exclui o elemento HTML criado com o índice desejado
      }
    }
    this.calcularValorTotal() //Faz o calculo dos elementos restantes na tabela e atualiza o elemento HTML h4
  }

  //--Calcula o valor de cada compra e o valor total da lista retornando seu resultado concatenado para o elemento HTML h4
  calcularValorTotal() {
    let valorTotal = 0
    let valorCompra = 0
    for (const item of this.arrayProdutos) {
      valorCompra = item.preco * item.quantidade
      valorTotal = valorTotal + valorCompra
    }
    document.querySelector('h4').innerHTML = `Total: R$ ${valorTotal}`
  }
}

var produto = new Produto() //Instanciação de um novo objeto

//--Controlador switch usando variáveis CSS para acionar o tema escuro

const $html = document.querySelector('html')
const $checkbox = document.querySelector('#switch')

$checkbox.addEventListener('change', function () {
  $html.classList.toggle('dark-mode')
})

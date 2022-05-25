let inputDescricao = document.getElementById("inputDescricao");
let inputDetalhamento = document.getElementById("inputDetalhamento");
let botaoSalvar = document.getElementById("botaoSalvar");
let botaoApagar = document.getElementById("botaoDeletar");
let botaoDeletarId = document.getElementsByClassName(".botaoDeletarId");

let inputDescricaoEditar = document.getElementById('inputDescricaoEditar');
let inputDetalhamentoEditar = document.getElementById('inputDetalhamentoEditar');
let botaoEditar = document.getElementById('botaoEditar');

// localStorage.clear()
const recados = JSON.parse(localStorage.getItem("recados") || "[]");
function proximoId() {
  //let max = recados[0].id;
  const recados = JSON.parse(localStorage.getItem("recados") || "[]");
  let max = 0;
  recados.forEach((item) => {
    if (item.id > max) {
      max = item.id;
    }
  });
  return max + 1;
}
function adicionarRecado(inputDescricao, inputDetalhamento) {
  const recados = JSON.parse(localStorage.getItem("recados") || "[]");
  let recado = {
    id: proximoId(),
    inputDescricao,
    inputDetalhamento,
  }
  if (recado.inputDescricao == "") {
    alert("Você precisa preencher o campo Descrição!");
    return;
  }
  if (recado.inputDetalhamento == "") {
    alert("Você precisa preencher o campo Detalhamento!");
    return;
  }
  recados.push(recado);
  localStorage.setItem("recados", JSON.stringify(recados));
  limpaTabela();
  populaLista();
}

botaoSalvar.addEventListener("click", () => {
  adicionarRecado(inputDescricao.value, inputDetalhamento.value);
  const recados = JSON.parse(localStorage.getItem("recados") || "[]");
  inputDescricao.value = "";
  inputDetalhamento.value = "";
});
function populaLista() {
  const recados = JSON.parse(localStorage.getItem("recados") || "[]");
  limpaTabela();
  recados.forEach((item) => {
    const linha = document.createElement("tr");
      linha.innerHTML += `<td>${item.id}</td>
        <td>${item.inputDescricao}</td>
        <td>${item.inputDetalhamento}</td>
        <td>
        <button onclick="apagarRecado(${item.id})" class="botao-apagar" >Apagar</button>
        <button onclick="editarRecado(${item.id})" class="botao-editar" >Editar</button>
        </td> `;
    document.querySelector("#table>tbody").appendChild(linha);
  });
}
function limpaTabela() {
  const linhas = document.querySelectorAll("#table>tbody tr");
  linhas.forEach((linha) => linha.parentNode.removeChild(linha));
}
function apagarRecado(id) {      
  const recados = JSON.parse(localStorage.getItem("recados") || "[]");
  const index = recados.findIndex((item) => item.id == id);
  recados.splice(index, 1);  
  localStorage.setItem("recados", JSON.stringify(recados));
  populaLista();
}
populaLista();
let pessoaLogada = JSON.parse(localStorage.getItem("pessoaLogada"));
let logado = document.getElementById('logado');
logado.innerHTML = `Olá, ${pessoaLogada.name}!`;
if(localStorage.getItem('token') == null){
    alert("Você precisa estar logado para acessar os recados")    ;
    location.href="index.html" ;
}
function sair(){
    localStorage.removeItem("token");
    location.href="index.html";
}
function editarRecado(id){
    inputDescricaoEditar.style.display = "block";
    inputDetalhamentoEditar.style.display = "block";
    botaoEditar.style.display = "block";
    botaoEditar.addEventListener("click", ()=> {
        adicionarRecadoEditado(id, inputDescricao = inputDescricaoEditar.value, inputDetalhamento = inputDetalhamentoEditar.value);
    })
    const index = recados.findIndex((item) => item.id == id);
    function adicionarRecadoEditado(id, inputDescricao = inputDescricaoEditar.value, inputDetalhamento = inputDetalhamentoEditar.value){
        const index = recados.findIndex((item) => item.id == id);  
        recados[index].inputDescricao = inputDescricao;
        recados[index].inputDetalhamento = inputDetalhamento;
        if(recados[index].inputDescricao ==""){
            for(let i = 0; i < 1 ; i++){
                 alert("Você deve preencher o campo descrição!")};
        }   else if (recados[index].inputDetalhamento ==""){
            for(let i = 0; i < 1 ; i++){
                alert("Você deve preencher o campo Detalhamento!")};
        } else {
            localStorage.setItem("recados", JSON.stringify(recados));
            limpaTabela();
            populaLista();
            inputDescricaoEditar.value = "";
            inputDetalhamentoEditar.value = "";
            inputDescricaoEditar.style.display = "none";
            inputDetalhamentoEditar.style.display = "none";
            botaoEditar.style.display = "none";
        }
    }
}


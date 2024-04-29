//importando minha classe lista pessoa que tem todos os metodos e propriedades

import { ListaPessoa } from "./classes.js";

// pegando os elementos do DOM

const conteiner = document.querySelector(".conteiner");
const btnExibir = document.querySelector("#btn");
const btnExcluir = document.querySelector("#btnEx");
const pesquisarExcluir = document.querySelector("#excluirFuncionario");
const buscar = document.querySelector("#pesquisar");
const filtrar = document.querySelector("#filtrar");
const valorOriginalFiltrar = filtrar.value;
const addFunc = document.querySelector("#btnAddFunc");
const modal = document.querySelector(".modalAddClient");  
const modalInputMatricula = document.querySelector("#matriculaInputModal");
const modalInputNome = document.querySelector("#nomeInputModal");
const modalInputSexo = document.querySelector("#sexoInputModal");
const modalInputIdade = document.querySelector("#idadeInputModal");
const btnAddModal = document.querySelector("#btnEnviarModal");
const btnAtualizarModal = document.querySelector("#btnAtualizarModal");
const numeroClients = document.querySelector("#numeroClients");
const abrirModalAtualizar = document.querySelector("#abrirModalAtualizar");

// iniciando a minha classe lista pessoa na variavel listaclients

const listaClients = new ListaPessoa();

// lendo os dados salvos no LocalStorage

lerDados(listaClients);

// Eventos

window.addEventListener("DOMContentLoaded", atualizarNumeroClients);

addFunc.addEventListener("click", abrirModal);

modal.addEventListener("click", fecharModalClicarFora);

btnAddModal.addEventListener("click", addClient);

abrirModalAtualizar.addEventListener("click", abrirModalAtualizacao);

modalInputMatricula.addEventListener("keydown", imprimirDadosPorMatricula);

btnAtualizarModal.addEventListener("click", atualizar);

btnExibir.addEventListener("click", ()=>{
    listaClients.exibirTodos(conteiner, listaClients.ListaPessoas);
});

btnExcluir.addEventListener("click", ()=>{
    listaClients.removerTodos();
    listaClients.exibirTodos(conteiner, listaClients.ListaPessoas);
    atualizarNumeroClients();
    salvarDados(listaClients.ListaPessoas);
});

pesquisarExcluir.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
        listaClients.removerPessoa(Number(pesquisarExcluir.value));
        pesquisarExcluir.value = "";
        listaClients.exibirTodos(conteiner, listaClients.ListaPessoas);
        atualizarNumeroClients();
        salvarDados(listaClients.ListaPessoas);
    }
})

buscar.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
        listaClients.buscar(buscar.value, conteiner);
        buscar.value = "";
    }
})

filtrar.addEventListener("change", (e)=>{
    listaClients.filtrar(e.target.value, conteiner)
    filtrar.value = valorOriginalFiltrar;
})

// funções 

function imprimirDadosPorMatricula(e) {

    if(e.key === "Enter"){

        let valueInputMatricula = Number(modalInputMatricula.value);

        if(listaClients.ListaPessoas.has(valueInputMatricula)){

            let pessoa = listaClients.ListaPessoas.get(valueInputMatricula);

            modalInputNome.value = pessoa.nome;
            modalInputSexo.value = pessoa.sexo;
            modalInputIdade.value = pessoa.idade;
        }else {
            alert("Matricula não encontrada!");
            zerarCamposModal();
        }
    }

}

function abrirModal() {

    modal.style.display = "flex";
    btnAddModal.style.display = "flex";
    btnAtualizarModal.style.display = "none";
    modalInputMatricula.style.display = "none";

}

function abrirModalAtualizacao() {

    modal.style.display = "flex";
    btnAddModal.style.display = "none";
    btnAtualizarModal.style.display = "flex";
    modalInputMatricula.style.display = "flex";

}

function fecharModalClicarFora(e) {
        if(e.target === modal){
            modal.style.display = "none";
            zerarCamposModal();
        }
}

function fecharModal() {
    
        modal.style.display = "none";
        zerarCamposModal();
}

function addClient() {
    if(validarCamposModal()){

        listaClients.addPessoa(modalInputNome.value, modalInputSexo.value, Number(modalInputIdade.value));

        listaClients.exibirTodos(conteiner, listaClients.ListaPessoas);

        fecharModal();
        atualizarNumeroClients();
        salvarDados(listaClients.ListaPessoas);

    }else{
        alert("Preencha os campos corretamente.");
    }
}

function validarCamposModal() {
    if((isNaN(Number(modalInputNome.value)) && modalInputNome.value.length > 0) && (isNaN(Number(modalInputSexo.value)) && (modalInputSexo.value.length > 0) && (modalInputSexo.value.length < 2 ) && ((modalInputSexo.value.toLowerCase() === "m") || (modalInputSexo.value.toLowerCase() === "f"))) && ((Number(modalInputIdade.value) > 0) && (Number(modalInputIdade.value) < 150))){
        return true;
    }
    return false;
}

function atualizarNumeroClients() {
    numeroClients.textContent = `(${listaClients.ListaPessoas.size} Clientes cadastrados)`;
}

function zerarCamposModal() {
    modalInputNome.value = "";
    modalInputSexo.value = "";
    modalInputIdade.value = "";
    modalInputMatricula.value = "";
}

function atualizar() {

    let valorMatricula = Number(modalInputMatricula.value);
    let valorIdade = Number(modalInputIdade.value);

    if(validarCamposModal() && listaClients.ListaPessoas.has(valorMatricula)){

        listaClients.atualizar(valorMatricula, modalInputNome.value, modalInputSexo.value, valorIdade);
        listaClients.exibirTodos(conteiner, listaClients.ListaPessoas);
        fecharModal();
        salvarDados(listaClients.ListaPessoas);

    }else{

        alert("Preencha os campos corretamente.");
        
    }
}

function salvarDados(listaMap) {

    let entries = listaMap.values();
    let arrayEntries = Array.from(entries);
    let json = JSON.stringify(arrayEntries);

    localStorage.setItem("listaClients", json)

}

function lerDados(lista) {
    let dadosLocalStorage = localStorage.getItem("listaClients");
    if(dadosLocalStorage){
        
        let revertendoDados = JSON.parse(dadosLocalStorage);

        revertendoDados.forEach(element => {
            listaClients.addPessoa(element.nome,element.sexo,element.idade);
        });
    
    }
}
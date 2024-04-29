// implementando a classe ListaPessoa que tem como propriedade principal criar um objeto Map() que vai ser base para as operações do CRUD

export class ListaPessoa {
    constructor(){
        this.ListaPessoas = new Map();
        this.contMatricula = 0;
        this.matriculaRemovidaMeio = 0;
    }
    addPessoa(Nome,Sexo,Idade){          //Metodo para adicionar nova pessoa

        let cont = this.contMatricula;

        function setMatricula() {           // função para gerar uma matricula válida

            let data = new Date();
            let mes = data.getMonth();
            let ano = data.getFullYear();
            let stringMatricula = `${ano}${mes}${cont}`;
            return Number(stringMatricula);
        
        }

        let mat = setMatricula();

        // parte que sera exucutada normalmente para adicionar pessoa

        if(this.matriculaRemovidaMeio === 0){           
            this.ListaPessoas.set(mat, {nome: Nome, sexo: Sexo, idade: Idade, matricula: mat});     //adiciona caso ainda não tenha sido removido pessoa ou a pessoa removida seja a ultima da lista;
            this.contMatricula++;
        }else {   //essa parte é executada quando o usuario remove alguma pessoa que não seja a ultima da lista para que não aconteça a perca de matriculas
            this.ListaPessoas.set(this.matriculaRemovidaMeio, {nome: Nome, sexo: Sexo, idade: Idade, matricula: this.matriculaRemovidaMeio});
            this.matriculaRemovidaMeio = 0;
            this.contMatricula++;
        }

    }
    exibirTodos(conteiner, lista) {     // metodo para exibir todos da lista

        conteiner.innerHTML = "";
        let indice = 0;

        lista.forEach((pessoa) =>{

            if(indice === 0){
                
                let cabecalho = document.createElement("div");
                cabecalho.className = "divConteiner";
                cabecalho.style.backgroundColor = "#4F4F4F";
                cabecalho.style.color = "white";

                let divCabecalhoNome = document.createElement("div");

                let divCabecalhoIdade = document.createElement("div");

                let divCabecalhoSexo = document.createElement("div");

                let divCabecalhoMatricula = document.createElement("div");

                let cabecalhoNome = document.createElement("p")
                cabecalhoNome.textContent = "Nome";

                let cabecalhoIdade = document.createElement("p")
                cabecalhoIdade.textContent = "Idade";

                let cabecalhoSexo = document.createElement("p")
                cabecalhoSexo.textContent = "Sexo";

                let cabecalhoMatricula = document.createElement("p")
                cabecalhoMatricula.textContent = "Matricula";

                conteiner.appendChild(cabecalho);
                cabecalho.appendChild(divCabecalhoNome);
                cabecalho.appendChild(divCabecalhoSexo);
                cabecalho.appendChild(divCabecalhoIdade);
                cabecalho.appendChild(divCabecalhoMatricula);
                divCabecalhoNome.appendChild(cabecalhoNome);
                divCabecalhoSexo.appendChild(cabecalhoSexo);
                divCabecalhoIdade.appendChild(cabecalhoIdade);
                divCabecalhoMatricula.appendChild(cabecalhoMatricula);

            }

            let div = document.createElement("div");
            div.className = "divConteiner";

            let divNome = document.createElement("div");
            divNome.style.height = "55px"

            let divIdade = document.createElement("div");
            divIdade.style.height = "55px";

            let divSexo = document.createElement("div");
            divSexo.style.height = "55px";

            let divMatricula = document.createElement("div");
            divMatricula.style.height = "55px";

            let liNome = document.createElement("p")
            liNome.textContent = pessoa.nome;

            let liIdade = document.createElement("p")
            liIdade.textContent = `${pessoa.idade}`;

            let liSexo = document.createElement("p")
            liSexo.textContent =  pessoa.sexo;

            let liMatricula = document.createElement("p")
            liMatricula.textContent = `${pessoa.matricula}`;

            conteiner.appendChild(div);
            div.appendChild(divNome);
            div.appendChild(divSexo);
            div.appendChild(divIdade);
            div.appendChild(divMatricula);
            divNome.appendChild(liNome);
            divSexo.appendChild(liSexo);
            divIdade.appendChild(liIdade);
            divMatricula.appendChild(liMatricula);

            indice++;
        });

    }
    removerPessoa(matricula) {      //metodo para remover pessoa da lista

        if(!this.ListaPessoas.has(matricula)){         //tratamento de erro
            console.log("Erro ao excluir! Esse usuario não existe.");
        }else{

            let todasChaves = this.ListaPessoas.keys();  // pegando todas as chaves do meu Map()

            if(matricula !== Array.from(todasChaves)[this.ListaPessoas.size -1]){      //verificando pelas chaves se quem eu quero remover é o ultimo da lista
                this.matriculaRemovidaMeio = matricula;     //atribuo a matricula dele a essa propriedade, para evitar perca de matricula ao adicionar uma nova pessoa
            }

            this.ListaPessoas.delete(matricula);
    
            if(this.ListaPessoas.size === 0){           //zerando as propriedades caso a lista não tenha mais ninguem
                this.contMatricula = 0;
            }else{
                this.contMatricula--;               // removo -1 dessa propriedade pois houve uma remoção
            }

        }
    }
    removerTodos() {            // metodo para zerar todo o Map()

        this.ListaPessoas.clear();
        this.contMatricula = 0;

    }
    atualizar(matricula,nome,sexo,idade) {       //metodo para atualizar os dados de acordo com a matricula

        this.ListaPessoas.forEach((elemento, chave) => {
            if(matricula === chave){
                elemento.nome = nome;
                elemento.sexo = sexo;
                elemento.idade = idade;
            }
        })

    }
    filtrar(event, conteiner) {

        let arrayOrdenado;
        let arrayFiltro;

        switch(event){

            case "idade":

                arrayOrdenado = Array.from(this.ListaPessoas.values());
                arrayOrdenado.sort((a,b) => a.idade - b.idade);
                this.exibirTodos(conteiner,arrayOrdenado);
                break;

            case "masculino":

                arrayOrdenado = Array.from(this.ListaPessoas.values());
                arrayFiltro = arrayOrdenado.filter((elemento) => {
                    return elemento.sexo.toLowerCase() === "m";
                });
                this.exibirTodos(conteiner,arrayFiltro);
                break;

            case "feminino":

                arrayOrdenado = Array.from(this.ListaPessoas.values())
                arrayFiltro = arrayOrdenado.filter((elemento) => {
                    return elemento.sexo.toLowerCase() === "f";
                });
                this.exibirTodos(conteiner,arrayFiltro);
                break;

            case "nome":

                arrayOrdenado = Array.from(this.ListaPessoas.values());
                arrayOrdenado.sort((a,b) => a.nome.localeCompare(b.nome));
                this.exibirTodos(conteiner,arrayOrdenado);
                break;

        }

    }
    buscar(valor, conteiner) {         //metodo para fazer a busca por nome,idade e matricula
        
        if(isNaN(Number(valor))){      //verifica se é o nome e chama o metodo exibir filtro
                
                let arrayBusca = Array.from(this.ListaPessoas.values());
                let arrayFiltro = arrayBusca.filter(elemento => elemento.nome.toLowerCase().slice(0, valor.length).trim() === valor.toLowerCase().trim());

                if(arrayFiltro.length === 0){
                alert("Nome não encontrado!");
                }else{
                this.exibirTodos(conteiner,arrayFiltro);
                }
                
        }else{        //verifica se é numero e depois se é a idade ou matricula e chama o metodo exibir filtro
            if(Number(valor) < 150){

                let arrayBusca = Array.from(this.ListaPessoas.values());
                let arrayFiltro = arrayBusca.filter(elemento => elemento.idade === Number(valor));
                if(arrayFiltro.length === 0){
                    alert("Idade não encontrada!");
                }else{
                    this.exibirTodos(conteiner,arrayFiltro);
                }
                
            }else{

                let arrayBusca = Array.from(this.ListaPessoas.values());
                let arrayFiltro = arrayBusca.filter(elemento => elemento.matricula === Number(valor));
                if(arrayFiltro.length === 0){
                    alert("Matricula não encontrada!");
                }else{
                    this.exibirTodos(conteiner,arrayFiltro);
                }
                
            }
        }
        
    }

}
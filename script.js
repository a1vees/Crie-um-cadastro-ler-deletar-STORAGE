document.getElementById("cadastroForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio do formulário

    let id = document.getElementById("id").value;
    let nome = document.getElementById("nome").value;
    let dataNascimento = document.getElementById("dataNascimento").value;
    let time = document.getElementById("time").value;

    if (!validarIdade(dataNascimento)) {
        alert("A idade deve ser entre 7 e 100 anos. Por favor, insira uma data válida.");
        document.getElementById("dataNascimento").value = ""; // Limpa o campo
        return;
    }

    let chave = `usuario${id}`;

    let usuario = {
        id: id, // Corrigido para garantir que o ID seja armazenado
        nome: nome,
        dataNascimento: dataNascimento,
        time: time
    };

    // Armazena no localStorage
    localStorage.setItem(chave, JSON.stringify(usuario));

    // Limpa os campos do formulário
    document.getElementById("cadastroForm").reset();

    // Atualiza a lista de usuários na tela
    atualizarListaUsuarios();
});

// Função para validar idade
function validarIdade(dataNascimento) {
    let dataAtual = new Date();
    let dataNasc = new Date(dataNascimento);
    let idade = dataAtual.getFullYear() - dataNasc.getFullYear();
    let mes = dataAtual.getMonth() - dataNasc.getMonth();
    let dia = dataAtual.getDate() - dataNasc.getDate();

    if (mes < 0 || (mes === 0 && dia < 0)) {
        idade--;
    }

    return idade >= 7 && idade <= 100;
}

// Função para consultar um usuário e preencher os campos do formulário
function consultarUsuario() {
    let numero = prompt("Digite o número do usuário para consulta (1 a 5):");

    if (numero >= 1 && numero <= 5) {
        let chave = `usuario${numero}`;
        let usuarioString = localStorage.getItem(chave);

        if (usuarioString) {
            let usuario = JSON.parse(usuarioString);

            // Agora todos os dados, incluindo o ID, são preenchidos corretamente
            document.getElementById("id").value = usuario.id;
            document.getElementById("nome").value = usuario.nome;
            document.getElementById("dataNascimento").value = usuario.dataNascimento;
            document.getElementById("time").value = usuario.time;
        } else {
            alert("Usuário não encontrado!");
            document.getElementById("cadastroForm").reset(); // Limpa o formulário se o usuário não for encontrado
        }
    } else {
        alert("Número inválido! Digite um número entre 1 e 5.");
    }
}

// Evento no botão de consulta
document.getElementById("consultarBtn").addEventListener("click", consultarUsuario);

// Função para exibir os usuários cadastrados na tela
function atualizarListaUsuarios() {
    let lista = document.getElementById("usuariosList");
    lista.innerHTML = ""; // Limpa a lista antes de adicionar itens novos

    for (let i = 1; i <= 5; i++) {
        let chave = `usuario${i}`;
        let usuarioString = localStorage.getItem(chave);

        if (usuarioString) {
            let usuario = JSON.parse(usuarioString);
            let item = document.createElement("li");

            item.innerHTML = `
                Nome: ${usuario.nome} <br>
                ID: ${usuario.id} <br>
                Data de Nascimento: ${usuario.dataNascimento} <br>
                Time: ${usuario.time} <br>
                <hr>
            `;

            lista.appendChild(item);
        }
    }
}

// Função para deletar um usuário informando o número via prompt
function deletarUsuarioPorPrompt() {
    let numero = prompt("Qual usuário você quer apagar do LocalStorage? (1 a 5)");

    if (numero >= 1 && numero <= 5) {
        let chave = `usuario${numero}`;
        let usuarioString = localStorage.getItem(chave);

        if (usuarioString) {
            localStorage.removeItem(chave);
            alert(`Usuário ${numero} foi apagado com sucesso!`);
            atualizarListaUsuarios(); // Atualiza a lista na tela
        } else {
            alert("Usuário não encontrado!");
        }
    } else {
        alert("Número inválido! Digite um número entre 1 e 5.");
    }
}

// Evento no botão de deletar usuário por prompt
document.getElementById("deletarBtn").addEventListener("click", deletarUsuarioPorPrompt);

// Atualizar a lista quando a página atualizar
document.addEventListener("DOMContentLoaded", atualizarListaUsuarios);

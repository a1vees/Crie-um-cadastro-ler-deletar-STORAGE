document.getElementById("cadastroForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;
    const dataNascimento = document.getElementById("dataNascimento").value;
    const time = document.getElementById("time").value;

    if (!validarIdade(dataNascimento)) {
        alert("A idade deve ser entre 7 e 100 anos. Por favor, insira uma data válida.");
        document.getElementById("dataNascimento").value = "";
        return;
    }

    const chave = `usuario${id}`;

    const usuario = { id, nome, dataNascimento, time };

    localStorage.setItem(chave, JSON.stringify(usuario));

    document.getElementById("cadastroForm").reset();

    atualizarListaUsuarios();
});

function validarIdade(dataNascimento) {
    const dataAtual = new Date();
    const dataNasc = new Date(dataNascimento);
    let idade = dataAtual.getFullYear() - dataNasc.getFullYear();
    const mes = dataAtual.getMonth() - dataNasc.getMonth();
    const dia = dataAtual.getDate() - dataNasc.getDate();

    if (mes < 0 || (mes === 0 && dia < 0)) {
        idade--;
    }

    return idade >= 7 && idade <= 100;
}

function consultarUsuario() {
    const numero = prompt("Digite o número do usuário para consulta (1 a 5):");

    if (numero >= 1 && numero <= 5) {
        const chave = `usuario${numero}`;
        const usuarioString = localStorage.getItem(chave);

        if (usuarioString) {
            const usuario = JSON.parse(usuarioString);
            preencherCamposFormulario(usuario);
        } else {
            alert("Usuário não encontrado!");
            document.getElementById("cadastroForm").reset();
        }
    } else {
        alert("Número inválido! Digite um número entre 1 e 5.");
    }
}

function preencherCamposFormulario(usuario) {
    document.getElementById("id").value = usuario.id;
    document.getElementById("nome").value = usuario.nome;
    document.getElementById("dataNascimento").value = usuario.dataNascimento;
    document.getElementById("time").value = usuario.time;
}

document.getElementById("consultarBtn").addEventListener("click", consultarUsuario);

function atualizarListaUsuarios() {
    const lista = document.getElementById("usuariosList");
    lista.innerHTML = "";

    for (let i = 1; i <= 5; i++) {
        const chave = `usuario${i}`;
        const usuarioString = localStorage.getItem(chave);

        if (usuarioString) {
            const usuario = JSON.parse(usuarioString);
            const item = document.createElement("li");

            item.innerHTML = `
                <strong>Nome:</strong> ${usuario.nome} <br>
                <strong>ID:</strong> ${usuario.id} <br>
                <strong>Data de Nascimento:</strong> ${usuario.dataNascimento} <br>
                <strong>Time:</strong> ${usuario.time} <br>
                <hr>
            `;

            lista.appendChild(item);
        }
    }
}

function deletarUsuarioPorPrompt() {
    const numero = prompt("Qual usuário você quer apagar do LocalStorage? (1 a 5)");

    if (numero >= 1 && numero <= 5) {
        const chave = `usuario${numero}`;
        const usuarioString = localStorage.getItem(chave);

        if (usuarioString) {
            localStorage.removeItem(chave);
            alert(`Usuário ${numero} foi apagado com sucesso!`);
            atualizarListaUsuarios();
        } else {
            alert("Usuário não encontrado!");
        }
    } else {
        alert("Número inválido! Digite um número entre 1 e 5.");
    }
}

document.getElementById("deletarBtn").addEventListener("click", deletarUsuarioPorPrompt);

document.addEventListener("DOMContentLoaded", atualizarListaUsuarios);

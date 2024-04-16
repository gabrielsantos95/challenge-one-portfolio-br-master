const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector(".formulario");
const textoInputNome = document.querySelector("#nome");
const textoInputEmail = document.querySelector("#email");
const textoInputAssunto = document.querySelector("#assunto");
const textoArea = document.querySelector(".formulario__textarea");

camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault());
} )

const tiposDeErro = ['valueMissing', 'typeMismatch', 'patternMismatch', 'tooShort']

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, aumente o texto para 3 caracteres ou mais."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, aumente o numero de caracteres para 6 ou mais."
    },
    assunto: {
        valueMissing: "O campo de assunto não pode estar vazio.",
        patternMismatch: "Por favor, preencha o campo assunto com caracteres válidos.",
        tooShort: "Por favor, aumente o texto para 5 caracteres ou mais."
    },
    mensagem: {
        valueMissing: "O campo de mensagem não pode estar vazio.",
        patternMismatch: "Por favor, preencha o campo mensagem com caracteres válidos.",
        tooShort: "Por favor, aumente o texto para 15 caracteres ou mais."
    }

}

    function verificaCampo(campo) {
        let mensagem = "";
        tiposDeErro.forEach(erro => {
            if(campo.validity[erro]) {
                mensagem = mensagens[campo.id][erro];
            }
        })

        const mensagemErro = campo.parentNode.querySelector('.mensagem__erro');
        const validadorDeInput = campo.checkValidity();

        if (!validadorDeInput) {
            mensagemErro.textContent = mensagem;
        } else {
            mensagemErro.textContent = "";
        }
    }

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        const mensagemDeEnvio = document.querySelector('.mensagem__enviar');
        const respostas = {
            "nome": e.target.elements["nome"].value,
            "email": e.target.elements["email"].value,
            "assunto": e.target.elements["assunto"].value,
            "mensagem": e.target.elements["mensagem"].value
        }
        
        localStorage.setItem("contato", JSON.stringify(respostas));

        mensagemDeEnvio.innerHTML = "Mensagem enviada!" ;
        limparFormulario();
        
        function limparSpan () {
            mensagemDeEnvio.innerHTML = "";
        }
        setTimeout (limparSpan, 5000);
    })

    function limparFormulario(){
		textoInputNome.value = "";
        textoInputEmail.value = "";
        textoInputAssunto.value = ""
        textoArea.value = "";
	}

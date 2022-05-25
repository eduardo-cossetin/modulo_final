const inputUsername = document.getElementById('inputUsername')
const inputPassword = document.getElementById('inputPassword')
const botaoEntrar = document.getElementById('botaoEntrar')
const criarConta = document.getElementById('criarConta')

botaoEntrar.addEventListener ("click",(e) => {
    e.preventDefault()
    if (localStorage.hasOwnProperty("pessoasCadastradas")) {
        pessoasCadastradas = JSON.parse(localStorage.getItem("pessoasCadastradas"))
    }        

    let sameUserName = pessoasCadastradas.find((item) => (item.userName === inputUsername.value));
    let samePassword = pessoasCadastradas.find((item) => (item.password === inputPassword.value));

    if (sameUserName !== undefined && samePassword !== undefined ){
       let pessoaLogada = {
           name: inputUsername.value,
           password: inputPassword.value
       }
       window.location.href="recados.html" 

       let token = Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2)
       localStorage.setItem('token', token)

       localStorage.setItem('pessoaLogada', JSON.stringify(pessoaLogada))

    } else {
       alert("Usuário não encontrado, tente de novo ou clique em Criar Conta.")
       return
    }
})
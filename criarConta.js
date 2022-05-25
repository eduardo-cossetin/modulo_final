const inputUsername2 = document.getElementById('inputUsername2');
const inputPassword2 = document.getElementById('inputPassword2');
const inputRepeatPassword2 = document.getElementById('inputRepeatPassword2');
const criarConta = document.getElementById('criarConta');

// localStorage.removeItem('pessoasCadastradas')

const pessoasCadastradas = JSON.parse(localStorage.getItem("pessoasCadastradas") || ("[]"));
botaoCriarConta.addEventListener('click', () => {      
    if (inputPassword2.value.length < 3){
        alert("O nome de usuário precisa ter no mínimo 3 digitos!");
        return
    } else  if (inputPassword2.value.length < 4){
        alert("A senha precisa ter no mínimo 4 digitos!");
        return
    } else if (inputRepeatPassword2.value != inputPassword2.value){
        alert("As senhas estão diferentes!");
        return
    }
    const mesmoUsername = pessoasCadastradas.find((item) => item.userName == inputUsername2.value  )
    if (mesmoUsername){
        alert("Esse nome de usuário já existe!");
        return 
    }
    adicionarPessoa(inputUsername2.value, inputPassword2.value);   
    location.href="index.html";
})
function adicionarPessoa (userName, password){    
    const pessoasCadastradas = JSON.parse(localStorage.getItem("pessoasCadastradas") || ("[]"));
    let pessoa = 
    {
    id: proximoId(),
    userName,
    password,
    }    
    pessoasCadastradas.push(pessoa);
    localStorage.setItem("pessoasCadastradas", JSON.stringify(pessoasCadastradas));
}
function proximoId(){
    const pessoasCadastradas = JSON.parse(localStorage.getItem("pessoasCadastradas") || ("[]"));
    let max = 0;
    pessoasCadastradas.forEach((item) => {
        if(item.id > max){
            max = item.id
        }
    });
    return max + 1;
} 
export function verificarSenha(senha) {  
    if (senha.length < 6) {  
        console.log("Senha tem menos de 6 caracteres");
        return false;
    }

    if (!/[a-z]/.test(senha)) {  
        console.log("Pelo memos uma letra minuscula");
        return false;
    }

    if (!/[A-Z]/.test(senha)) {  
        console.log("Pelo menos uma letra maiuscula");
        return false;
    }

    if (!/[0-9]/.test(senha)) {  
        console.log("Pelo menos um numero");
        return false;
    }


    return true; 
}  

// Exemplo de uso  
//console.log(verificarSenha("HELOMEra18")); 



export function verificarSenha(senha) {  
    if (senha.length < 6) {  
        console.log("Senha precisa ter pelo menos de 6 caracteres");
        return false;
    }

    if (!/[a-z]/.test(senha)) {  
        console.log("Senha deve conter pelo menos uma letra minúscula");
        return false;
    }

    if (!/[A-Z]/.test(senha)) {  
        console.log("Senha deve conter pelo menos uma letra maiúscula");
        return false;
    }

    if (!/[0-9]/.test(senha)) {  
        console.log("Senha deve conter pelo menos um número");
        return false;
    }


    return true; 
}  

// Exemplo de uso  
//console.log(verificarSenha("HELOMEra18")); 


export const valida = () => {
  if(1<2)
    return false;
  return true;
}
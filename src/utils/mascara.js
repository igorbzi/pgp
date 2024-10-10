export const validarEFormatarCPF = (valor) => {
    // Remove qualquer caractere que não seja número
    const numeros = valor.replace(/\D/g, '');
    
    // Aplica a máscara de CPF
    const cpfComMascara = numeros
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  
    return cpfComMascara;
  };
  
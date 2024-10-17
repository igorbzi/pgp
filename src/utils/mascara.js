export const validarEFormatarCPF = (valor) => {
    const numeros = valor.replace(/\D/g, '');
    
    const cpfComMascara = numeros
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  
    return cpfComMascara;
  };

  export const validarEFormatarTelefone = (valor) => {
    const numeros = valor.replace(/\D/g, '');
    
    const telefoneComMascara = numeros
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2'); 

    return telefoneComMascara;
};

export const validarEmail = (valor) => {
  if(valor.includes('@') && valor.includes('.')){
    console.log('Email Valido')
    return true;
  }else{
    console.log('Email Invalido')
    return false;
  }
};

  
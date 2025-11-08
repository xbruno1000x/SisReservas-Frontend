// Formatar telefone no padrão brasileiro
export const formatarTelefone = (telefone: string): string => {
  if (!telefone) return '';
  
  // Remove tudo que não é número
  const numeros = telefone.replace(/\D/g, '');
  
  // Formata conforme o tamanho
  if (numeros.length === 11) {
    // Celular: (XX) XXXXX-XXXX
    return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (numeros.length === 10) {
    // Fixo: (XX) XXXX-XXXX
    return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else if (numeros.length === 9) {
    // Celular sem DDD: XXXXX-XXXX
    return numeros.replace(/(\d{5})(\d{4})/, '$1-$2');
  } else if (numeros.length === 8) {
    // Fixo sem DDD: XXXX-XXXX
    return numeros.replace(/(\d{4})(\d{4})/, '$1-$2');
  }
  
  return telefone;
};

// Aplicar máscara enquanto digita
export const aplicarMascaraTelefone = (valor: string): string => {
  if (!valor) return '';
  
  // Remove tudo que não é número
  let numeros = valor.replace(/\D/g, '');
  
  // Limita a 11 dígitos
  numeros = numeros.substring(0, 11);
  
  // Aplica a máscara
  if (numeros.length <= 2) {
    return numeros;
  } else if (numeros.length <= 6) {
    return numeros.replace(/(\d{2})(\d{0,4})/, '($1) $2');
  } else if (numeros.length <= 10) {
    return numeros.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  } else {
    return numeros.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  }
};

// Formatar data no padrão brasileiro
export const formatarData = (data: string): string => {
  if (!data) return '';
  
  try {
    const date = new Date(data + 'T00:00:00');
    return date.toLocaleDateString('pt-BR');
  } catch {
    return data;
  }
};

// Formatar data e hora completa
export const formatarDataHora = (dataHora: string): string => {
  if (!dataHora) return '';
  
  try {
    const date = new Date(dataHora);
    return date.toLocaleString('pt-BR');
  } catch {
    return dataHora;
  }
};

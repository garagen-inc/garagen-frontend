export const maskCPF = (valor: string) => {
  valor = valor.replace(/\D/g, ""); // Remove caracteres não numéricos
  if (valor.length > 11) valor = valor.slice(0, 11); // Limita o tamanho a 11 dígitos
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2"); // Adiciona o ponto
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2"); // Adiciona o segundo ponto
  valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Adiciona o traço
  return valor;
};

export const maskPhoneNumber = (valor: string) => {
  valor = valor.replace(/\D/g, ""); // Remove caracteres não numéricos
  if (valor.length > 11) valor = valor.slice(0, 11); // Limita o tamanho a 11 dígitos

  // Formata o número com o código de área e o número
  valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2"); // Adiciona o parêntese e espaço
  valor = valor.replace(/(\d{5})(\d{1,4})$/, "$1-$2"); // Adiciona o hífen

  return valor;
};

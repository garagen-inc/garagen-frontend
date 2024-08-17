export const maskCPF = (valor: string) => {
  valor = valor.replace(/\D/g, ""); // Remove caracteres não numéricos
  if (valor.length > 11) valor = valor.slice(0, 11); // Limita o tamanho a 11 dígitos
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2"); // Adiciona o ponto
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2"); // Adiciona o segundo ponto
  valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Adiciona o traço
  return valor;
};

export default maskCPF;

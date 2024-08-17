import React from "react";

const calcularDigitoVerificador = (cpf: string, posicao: number): number => {
  let soma = 0;
  let peso = posicao + 1;

  for (let i = 0; i < posicao; i++) {
    soma += parseInt(cpf.charAt(i)) * peso--;
  }

  const resto = (soma * 10) % 11;
  return resto === 10 ? 0 : resto;
};

const validateCPF = (cpf: string): boolean => {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/\D/g, "");

  // Verifica se o CPF tem 11 dígitos e se não é uma sequência repetitiva (ex.: 11111111111)
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // Calcula os dígitos verificadores
  const digito1 = calcularDigitoVerificador(cpf, 9);
  const digito2 = calcularDigitoVerificador(cpf, 10);

  // Verifica se os dígitos calculados correspondem aos dígitos do CPF
  return cpf[9] === digito1.toString() && cpf[10] === digito2.toString();
};

export default validateCPF;

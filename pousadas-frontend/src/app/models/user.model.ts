export interface User {
  userId?: number;
  nomeUsuario: string;
  email: string;
  senha: string;
  telefone: string;
  tipoUsuario: 'ADMIN' | 'HOSPEDE';
}
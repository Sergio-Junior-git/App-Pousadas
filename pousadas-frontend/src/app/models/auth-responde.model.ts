// Exemplo: Coloque isso em src/app/models/auth-response.model.ts
export interface AuthResponse {
  userId: number; // O campo que você precisa
  token?: string; // Se você usa JWT, inclua o token
  message?: string;
  nome?: string;
  // Adicione outros campos que o seu /auth/login retorna
}
export interface Componente {
    title: string;
    url: string;
    icon: string;
  }

  // Login
export class Usuario {
  Codigo: number;
  Nombre: string;
  Habilitado: boolean;
  CodigoPerfil: number;
  CodigoVendedor: number;
  UsuarioTotalAgility: string;
  //CodigoPerfilAppControl: number;
  Token: string;
}


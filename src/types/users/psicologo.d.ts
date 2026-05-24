export type Psicologo = User & {
  calendario: {
    fecha: string;
    asunto: string;
    detalles: string;
  }[];
};

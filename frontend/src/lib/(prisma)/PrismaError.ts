import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class PrismaError extends Error {
  constructor(message: string) {
    super(message);
    this.message = "PrismaError";
  }

  static handle(error: unknown): void {
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P1016":
          throw new Error("Esperado na consulta: {gitubId}.");
        case "P2002":
          throw new Error("Violação de constraint única: registro já existe.");
        case "P2015":
          throw new Error("Registro não localizado.");
        case "P2025":
          throw new Error("Registro não encontrado no banco de dados por falta de relação.");
        case "P2003":
          throw new Error(
            "Violação de integridade referencial (chave estrangeira)."
          );
        default:
          throw new Error(
            `Erro Prisma: ${error.message} [code: ${error.code}]`
          );
      }
    }

    throw new Error(`Erro inesperado: ${String(error)}`);
  }
}

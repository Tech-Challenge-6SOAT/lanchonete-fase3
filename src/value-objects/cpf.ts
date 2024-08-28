export class CPF {
  private readonly value: string;

  constructor(value: string) {
    this.value = this.create(value);
  }

  private create(value: string): string {
    if (!this.isValid(value)) {
      throw new Error("CPF Inválido");
    }
    return value;
  }

  public getValue(): string {
    return this.value;
  }

  private isValid(value: string): boolean {
    const cpfRegex = /^[0-9]{11}$/;
    return cpfRegex.test(value);
  }
}

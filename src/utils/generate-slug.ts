export function slugify(text: string): string {
  return text
      .normalize("NFD") // Normaliza os caracteres unicode, decompondo as letras acentuadas em caracteres simples
      .replace(/[\u0300-\u036f]/g, "") // Remove os diacríticos
      .replace(/[^\w\s-]/g, "") // Remove os símbolos
      .trim() // Remove espaços em branco do início e do fim
      .replace(/\s+/g, "-") // Substitui espaços em branco por hífens
      .toLowerCase(); // Converte para minúsculas
}


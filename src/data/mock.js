import { imagemSvg } from "../utils/imagem";

// Coleções de exemplo: funcionam sem login e sem Firebase.
export const COLECOES_MOCK = [
  {
    id: "mock-ingles",
    nome: "Inglês Básico",
    descricao: "Palavras e frases do dia a dia em inglês.",
    imagem: imagemSvg("🗣️", "#5e5796", "#2d294c"),
    exemplo: true,
    cartoes: [
      { frente: "Carro", verso: "Car" },
      { frente: "Casa", verso: "House", aceitas: ["Home"] },
      { frente: "Cachorro", verso: "Dog" },
      { frente: "Gato", verso: "Cat" },
      { frente: "Livro", verso: "Book" },
      { frente: "Água", verso: "Water" },
      { frente: "Obrigado", verso: "Thank you", aceitas: ["Thanks"] },
      { frente: "Bom dia", verso: "Good morning" },
      { frente: "Escola", verso: "School" },
      { frente: "Amigo", verso: "Friend" },
    ],
  },
  {
    id: "mock-capitais",
    nome: "Capitais do Brasil",
    descricao: "Qual é a capital de cada estado?",
    imagem: imagemSvg("🗺️", "#2aa8a8", "#1f4f6b"),
    exemplo: true,
    cartoes: [
      { frente: "Capital de Minas Gerais", verso: "Belo Horizonte" },
      { frente: "Capital da Bahia", verso: "Salvador" },
      { frente: "Capital do Paraná", verso: "Curitiba" },
      { frente: "Capital de Pernambuco", verso: "Recife" },
      { frente: "Capital do Ceará", verso: "Fortaleza" },
      { frente: "Capital do Rio Grande do Sul", verso: "Porto Alegre" },
      { frente: "Capital de Goiás", verso: "Goiânia" },
      { frente: "Capital do Amazonas", verso: "Manaus" },
      { frente: "Capital de Santa Catarina", verso: "Florianópolis" },
      { frente: "Capital do Pará", verso: "Belém" },
    ],
  },
  {
    id: "mock-programacao",
    nome: "Programação",
    descricao: "Conceitos de web e desenvolvimento.",
    imagem: imagemSvg("💻", "#c9852c", "#4a2d6b"),
    exemplo: true,
    cartoes: [
      { frente: "Sigla da linguagem de marcação da web", verso: "HTML" },
      {
        frente: "Método do JavaScript que transforma cada item de um array e devolve um novo array",
        verso: "map",
      },
      { frente: "Comando do Git que envia commits ao remoto", verso: "git push" },
      { frente: "Hook do React para guardar estado", verso: "useState" },
      { frente: "Verbo HTTP usado para criar um recurso", verso: "POST" },
      { frente: "Palavra-chave do JavaScript para constantes", verso: "const" },
      { frente: "Sigla da linguagem de consulta de bancos relacionais", verso: "SQL" },
      { frente: "Código HTTP de \"não encontrado\"", verso: "404" },
    ],
  },
  {
    id: "mock-matematica",
    nome: "Matemática Rápida",
    descricao: "Contas para treinar o cálculo mental.",
    imagem: imagemSvg("➗", "#d1495b", "#3d2a63"),
    exemplo: true,
    cartoes: [
      { frente: "7 × 8", verso: "56" },
      { frente: "9 × 6", verso: "54" },
      { frente: "12 × 12", verso: "144" },
      { frente: "Raiz quadrada de 81", verso: "9" },
      { frente: "15% de 200", verso: "30" },
      { frente: "2 elevado a 10", verso: "1024" },
      { frente: "100 ÷ 4", verso: "25" },
      { frente: "13 × 5", verso: "65" },
    ],
  },
].map((c) => ({
  ...c,
  cartoes: c.cartoes.map((k, i) => ({ ...k, id: `${c.id}-${i}`, idColecao: c.id })),
}));

export const ehMock = (id) => typeof id === "string" && id.startsWith("mock-");
export const buscarMock = (id) => COLECOES_MOCK.find((c) => c.id === id);

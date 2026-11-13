// Gera uma imagem (SVG em data URI) com emoji/letra e fundo em degradê.
export function imagemSvg(texto, c1 = "#736ab3", c2 = "#2d294c") {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 200'>` +
    `<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>` +
    `<stop offset='0' stop-color='${c1}'/><stop offset='1' stop-color='${c2}'/>` +
    `</linearGradient></defs><rect width='320' height='200' fill='url(#g)'/>` +
    `<text x='160' y='136' font-size='96' text-anchor='middle' fill='white' ` +
    `font-family='Arial, sans-serif'>${texto}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function imagemPadrao(nome = "?") {
  return imagemSvg((nome.trim()[0] || "?").toUpperCase());
}

// Reduz a imagem escolhida (o Firestore limita cada documento a 1 MB).
export function redimensionar(arquivo, max = 320) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onerror = () => reject(new Error("Não foi possível ler a imagem."));
    leitor.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Arquivo de imagem inválido."));
      img.onload = () => {
        const escala = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * escala);
        canvas.height = Math.round(img.height * escala);
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.src = leitor.result;
    };
    leitor.readAsDataURL(arquivo);
  });
}

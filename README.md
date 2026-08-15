# LP Giovanni

Landing page estática de página única para captação de membros do canal gratuito do Giovanni no Telegram.

## Stack

HTML + CSS + JavaScript puro. Sem build, sem dependências — é só abrir o `index.html` ou subir os arquivos em qualquer hospedagem estática (Vercel, Netlify, Cloudflare Pages, GitHub Pages, hospedagem compartilhada).

## Estrutura

```
index.html                 página completa (hero + rodapé legal)
assets/css/style.css       estilos, desktop-first
assets/js/main.js          envio do clique do CTA para o dataLayer
assets/fotos/              50 fotos do ensaio (a img_0620.jpg é a usada no hero)
```

## Rodando localmente

```bash
python3 -m http.server 8000
```

Depois abra <http://localhost:8000>.

## Layout

A página tem duas seções:

1. **Hero** — fundo escuro (`#0F1610`) com a foto do Giovanni dissolvendo à direita (no mobile, no topo), coluna de texto à esquerda e o botão de entrada no grupo.
2. **Rodapé legal** — aviso 18+, jogo responsável e links institucionais.

### Breakpoints

| Faixa | Comportamento |
| --- | --- |
| Desktop | Coluna de texto com 50% da largura, container de 1140px, título em 120px |
| ≤ 1024px | Botão e microcopy centralizados, com até 520px |
| ≤ 767px | Foto no topo, texto abaixo, título em 79px, botão com até 320px |
| ≤ 360px | Ajuste de tipografia para telas estreitas |

### Tipografia e cores

- **Bebas Neue** no título principal, **Inter** no restante (carregadas do Google Fonts).
- Fundo `#0F1610`, destaques e botão em verde `#9FE500` (hover `#8ACB00`, texto do botão `#0F1610`), textos de apoio em `#B0B4B0` e `#A4A4A4`.

## Configuração

### Link do Telegram

O link do canal aparece no `index.html`, no `href` do botão com `data-cta="hero"`. Trocar o canal significa trocar essa URL.

### Pixel & Link Manager

O snippet do Pixel & Link Manager é o **primeiro script do `<head>`**, logo abaixo das metatags de charset e viewport e acima do GTM. Ele faz duas coisas:

- carrega os pixels cadastrados no painel para o domínio em que a página estiver rodando;
- intercepta o clique no botão do Telegram e manda para o rotacionador de grupos, registrando o clique.

As URLs e a chave pública (anon) do snippet não devem ser alteradas.

Para o rotacionador funcionar, o domínio precisa estar cadastrado na aba "Grupos" do painel exatamente como aparece na barra de endereço, sem `https://` e sem barra final. Enquanto isso não acontecer, o console mostra `Nenhum site encontrado` e o botão continua abrindo o link direto do Telegram — a página não quebra.

### Google Tag Manager

O container `GTM-PNHFDG55` já está instalado: o script no `<head>` e o `<noscript>` logo após a abertura do `<body>`.

Cada clique no CTA dispara um evento no dataLayer, que pode ser usado como gatilho no GTM:

```js
{
  event: 'cta_telegram_click',
  cta_position: 'hero',
  link_url: 'https://t.me/...'
}
```

### Trocar a foto do hero

Substitua o `src` da imagem dentro de `.hero-photo` no `index.html` por qualquer arquivo de `assets/fotos/`. O enquadramento é controlado pelo `object-position` em `.hero-photo img` no CSS — há um valor para desktop e outro dentro do bloco `@media (max-width: 767px)`.

## Pendências

- Os links de **Termos de uso**, **Política de privacidade** e **Jogo responsável** no rodapé estão apontando para `#` até que as páginas existam.
- O CTA leva direto ao Telegram. Se em algum momento a escolha for capturar e-mail e telefone antes do redirecionamento, isso ainda precisa ser construído.

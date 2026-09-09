# LP Giovanni

Landing pages estáticas para captação de membros do Giovanni. São quatro páginas com o mesmo layout, cada uma com seu próprio CTA e seu próprio caminho, para que o tráfego e a conversão de cada destino sejam medidos separadamente.

## Stack

HTML + CSS + JavaScript puro. Sem build, sem dependências — é só abrir o `index.html` ou subir os arquivos em qualquer hospedagem estática (Vercel, Netlify, Cloudflare Pages, GitHub Pages, hospedagem compartilhada).

## Estrutura

```
index.html                 raiz — CTA do canal no Telegram
canal/index.html           rota /canal/ — CTA do canal no Telegram
bot/index.html             rota /bot/ — CTA do bot no Telegram
x1/index.html              rota /x1/ — CTA do grupo X1 no WhatsApp
assets/css/style.css       estilos, desktop-first (compartilhado por todas as rotas)
assets/js/main.js          envio do clique do CTA para o dataLayer
assets/fotos/              50 fotos do ensaio
```

## Rotas

| Caminho | Destino do CTA | `data-destino` | Foto do hero |
| --- | --- | --- | --- |
| `/` | Canal no Telegram | `canal` | `img_0620.jpg` |
| `/canal/` | Canal no Telegram | `canal` | `img_0620.jpg` |
| `/bot/` | Bot no Telegram | `bot` | `img_0612.jpg` |
| `/x1/` | Grupo X1 no WhatsApp | `x1` | `img_0630.jpg` |

A raiz continua sendo a página do canal, como já era, para não quebrar as campanhas que já apontam para o domínio sem caminho. A `/canal/` leva ao mesmo grupo, mas em um caminho próprio — assim dá para separar o tráfego dela no GTM.

Cada rota é uma pasta com `index.html`, então qualquer hospedagem estática serve `/canal/`, `/bot/` e `/x1/` sem configuração de rewrite.

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

### Links dos CTAs

Cada página tem um único botão, com `data-cta="hero"` e `data-destino` identificando a rota. Trocar o destino significa trocar o `href` desse botão no `index.html` da rota correspondente:

- `/` e `/canal/` → `https://t.me/+Zdhki5s2sn83ODQx`
- `/bot/` → `https://telegram.me/Giovannidarelli_bot?start=w59620463`
- `/x1/` → `https://api.whatsapp.com/send/?phone=%2B5582956350488&text=...`

No `href` do WhatsApp os `&` ficam escritos como `&amp;`, que é a forma correta em HTML — o navegador envia a URL normal.

Os links são fixos no HTML e o botão abre o destino direto, sem redirecionador no meio. Não há rotacionador de grupos: para trocar um destino, edite o `href` e publique.

### Google Tag Manager

O container `GTM-PNHFDG55` já está instalado: o script no `<head>` e o `<noscript>` logo após a abertura do `<body>`.

O container é o mesmo nas quatro rotas. Cada clique no CTA dispara dois eventos no dataLayer:

```js
{ event: 'cta_click',           cta_position: 'hero', cta_destino: 'x1', link_url: '...' }
{ event: 'cta_whatsapp_click',  cta_position: 'hero', cta_destino: 'x1', link_url: '...' }
```

O segundo evento é `cta_telegram_click` nas rotas do canal e do bot, e `cta_whatsapp_click` na `/x1/`. Use `cta_click` + `cta_destino` para separar as rotas em um gatilho só, ou os eventos por canal se preferir gatilhos separados — o `cta_telegram_click`, que já era usado antes das rotas existirem, continua disparando igual.

### Trocar a foto do hero

Substitua o `src` da imagem dentro de `.hero-photo` no `index.html` da rota por qualquer arquivo de `assets/fotos/` (nas rotas o caminho é `../assets/fotos/`). O enquadramento é controlado pelo `object-position` em `.hero-photo img` no CSS — há um valor para desktop e outro dentro do bloco `@media (max-width: 767px)`.

## Pendências

- Os links de **Termos de uso**, **Política de privacidade** e **Jogo responsável** no rodapé estão apontando para `#` até que as páginas existam — em todas as rotas.
- O CTA leva direto ao Telegram. Se em algum momento a escolha for capturar e-mail e telefone antes do redirecionamento, isso ainda precisa ser construído.

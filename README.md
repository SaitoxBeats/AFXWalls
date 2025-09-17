# Aphex Twin Wallpapers — Base de Galeria

Base minimalista (preto e branco) para armazenar e visualizar wallpapers do artista Aphex Twin.

Arquivos principais:
- `index.html` — estrutura da galeria, abas Desktop/Mobile e lightbox.
- `styles.css` — estilos minimalistas (sem bordas arredondadas).
- `script.js` — lógica de abas e lightbox.

Como usar localmente:
1. Abra `index.html` em um navegador moderno (drag & drop ou "Open File").
2. Clique nas abas "Desktop" e "Mobile" para alternar as coleções.
3. Clique em uma miniatura para abrir o lightbox; feche com o botão "Fechar" ou `Esc`.

Notas:
- Atualmente usa imagens SVG inline como placeholders. Troque os atributos `data-full` e `img src` em `index.html` pelos caminhos reais dos arquivos.
- Mantive foco em acessibilidade básica: roles, aria-labels e keyboard support para fechar o lightbox.

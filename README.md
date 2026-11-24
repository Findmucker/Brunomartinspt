# Bruno Martins · Personal Trainer

Site de apresentação responsivo, em português de Portugal. HTML, CSS e JavaScript sem dependências de execução.

## Conteúdo e contactos

- Telefone fornecido pelo utilizador: +351 913 127 319.
- Ligações diretas para chamada e WhatsApp.
- O formulário prepara uma mensagem visível, depois abre o WhatsApp com o texto. O envio é feito pelo visitante no WhatsApp. Não há submissão nem armazenamento de dados no site.
- Não são apresentados preços, certificações, anos de experiência, resultados nem testemunhos não confirmados.
- Fotografias de ambiente da Unsplash, sem representar o Bruno ou clientes. Substituir por fotografias reais quando disponíveis.
- Formatos de acompanhamento e textos de apresentação são uma proposta editorial para revisão com o Bruno. Confirmar disponibilidade de acompanhamento presencial e online, localização, horários e condições antes de divulgação pública.

## Estrutura

- `dist/index.html`: conteúdo e estrutura.
- `dist/styles.css`: estilos e adaptação a ecrãs móveis.
- `dist/app.js`: navegação, seleção de objetivo, mensagem WhatsApp e privacidade.
- `dist/assets/`: imagens, fontes locais e favicon.
- `vercel.json`: configuração da publicação estática na Vercel.

## Publicação

O projeto na Vercel usa a integração com o repositório `Findmucker/Brunomartinspt`. Os commits em `main` são a fonte da publicação de produção. A Vercel serve a pasta `dist/` diretamente, sem instalar dependências ou executar um build.

Para ver o site localmente, executa `python3 -m http.server 8000 --directory dist` e abre `http://localhost:8000`.

## Imagens e fontes

Fotografias: Unsplash, `photo-1583454110551-21f2fa2afe61`, `photo-1517836357463-d25dfeac3438`, `photo-1534438327276-14e5300c3a48`.
Fontes: Barlow Condensed e Manrope, disponibilizadas pelo Google Fonts sob SIL Open Font License. Os ficheiros são servidos localmente para evitar pedidos de fontes a terceiros.

## Verificação

Verificado no navegador a 24/11/2026: apresentação em computador, layouts de 390 e 768 px, ausência de deslocação horizontal, menu móvel, seleção de objetivo e formato, preparação de mensagem para o número correto, perguntas expansíveis e janela de privacidade. Sem envio de mensagens de teste. Ligações de ficheiros, âncoras, IDs e sintaxe JavaScript verificadas.

# FrameLab

Projeto acadêmico de Mateus Vinicius Ribeiro Leite. O FrameLab ajuda a estimar o desempenho de um PC em jogos, comparar upgrades e planejar gastos com manutenção.

## Como abrir

Abra `index.html` no navegador para ver a apresentação do projeto. Use **Acessar o FrameLab** para abrir `app.html`, onde ficam as abas e o login. O projeto usa HTML, CSS e JavaScript e roda sem dependências de instalação.

Para publicar no GitHub Pages, coloque o conteúdo desta pasta na raiz do repositório. Nas configurações de **Pages**, selecione **Deploy from a branch**, a branch **main** e a pasta **/ (root)**.

## O que demonstrar

1. Abra a página de apresentação e clique em **Acessar o FrameLab**. Na aba **Início**, use um dos atalhos para chegar a uma ferramenta.
2. Clique em **Entrar**. Use `aluno@exemplo.com` e uma senha fictícia como `teste123`. A demonstração valida os campos e permite sair. E-mail e senha não são armazenados nem enviados.
3. Em **Jogos e FPS**, escolha o hardware e compare resoluções. Em **Upgrades**, simule a troca de CPU ou GPU no mesmo cenário.
4. Em **Orçamento**, selecione os serviços e veja a faixa estimada. O próprio site informa a data e as fontes de referência.
5. Abra **Acessibilidade** para testar alto contraste, texto maior e redução de movimento.

## Como funciona

| Arquivo | Responsabilidade |
| --- | --- |
| `index.html` | Página de apresentação do projeto |
| `app.html` | Ferramentas, formulários, abas e rodapé |
| `style.css` | Layout responsivo, temas, cursor e animações |
| `app.js` | Estimativa de FPS, comparação de upgrades e soma do orçamento |
| `interface.js` | Navegação, preferências, acessibilidade e comparação de tempos em aplicativos |
| `guides.js` | Carrossel e links pessoais |
| `login.js` | Formulário de demonstração, visibilidade da senha e estado temporário de entrada |
| `privacy.js` | Aviso de privacidade e exclusão de preferências e links locais |
| `secret.js` | Sequência de teclas e animação do Modo Secreto |

O FPS é uma estimativa baseada no menor limite calculado entre CPU e GPU, com ajustes de resolução, qualidade gráfica e RAM. Em Aplicativos, o comparador calcula a diferença entre tempos medidos pelo usuário. O orçamento soma os valores de referência dos serviços selecionados.

## Evolução do projeto

Cada pasta contém uma cópia executável da versão correspondente. No site publicado, abra o caminho terminado em `index.html`. Para testar localmente, baixe o repositório e abra o arquivo dentro da pasta da versão.

| Etapa | Versão | O que entrou |
| --- | --- | --- |
| 01 | [Primeira versao](versoes/01-primeira-versao/index.html) | Calculadora de FPS e orçamento de serviços |
| 02 | [Comparacao resolucoes](versoes/02-comparacao-resolucoes/index.html) | Comparação de FPS por resolução e detalhamento do orçamento |
| 03 | [Upgrades](versoes/03-upgrades/index.html) | Comparador de CPU e GPU com meta de FPS do monitor |
| 04 | [Abas e temas](versoes/04-abas-e-temas/index.html) | Abas, comparação de aplicativos, temas e acessibilidade |
| 05 | [Acessibilidade](versoes/05-acessibilidade/index.html) | Painel flutuante de acessibilidade e leitura em voz alta |
| 06 | [Guias e links](versoes/06-guias-e-links/index.html) | Carrossel de guias e catálogo de links |
| 07 | [Paleta e cursor](versoes/07-paleta-e-cursor/index.html) | Paleta azul e violeta e cursor personalizado |
| 08 | [Privacidade](versoes/08-privacidade/index.html) | Rodapé com autoria e painel de privacidade |
| 09 | [Modo secreto](versoes/09-modo-secreto/index.html) | Catálogo de aplicativos e primeira versão do Modo Secreto |
| 10 | [Tema terminal](versoes/10-tema-terminal/index.html) | Tema de terminal na aba secreta |
| 11 | [Animacao terminal](versoes/11-animacao-terminal/index.html) | Animação de entrada do terminal |
| 12 | [Terminal tela inteira](versoes/12-terminal-tela-inteira/index.html) | Entrada em tela inteira com o código CRACK |
| 13 | [Início e login](versoes/13-home-e-login/index.html) | Aba Início e login demonstrativo |
| Entrega | [Versão atual](index.html) | Página de apresentação antes da área de ferramentas |

## Uso de IA

Usei IA como apoio na criação da interface, na geração das imagens dos guias e na edição do código. A tabela de arquivos e o roteiro acima mostram como demonstrar e explicar cada parte.

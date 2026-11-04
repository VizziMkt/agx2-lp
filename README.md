# AGX² Manutenção — Landing Page

Página estática em HTML, CSS e JavaScript, pronta para GitHub e Vercel.

## Arquivos
- index.html: página, textos e estilos responsivos.
- app.js: calculadora e formulário que prepara uma mensagem no WhatsApp.
- assets/: logo e telas do aplicativo.
- vercel.json: configuração da hospedagem estática.

## 1. GitHub
1. Extraia o ZIP no computador.
2. Abra https://github.com/new e escolha a conta ou organização da empresa.
3. Crie o repositório agx2-lp. Pode ser privado.
4. No repositório vazio, clique em “uploading an existing file”. Se já houver arquivos, use “Add file” > “Upload files”.
5. Arraste o CONTEÚDO da pasta extraída: index.html, app.js, vercel.json, README.md e a pasta assets completa.
6. Clique em “Commit changes”.

O index.html precisa aparecer na primeira tela do repositório, na raiz. Não envie o ZIP nem uma pasta externa contendo o projeto inteiro. Preserve a pasta assets e os nomes dos arquivos.

## 2. Vercel
1. Acesse https://vercel.com/new na equipe correta.
2. Importe o repositório agx2-lp do GitHub.
3. Confira:
   - Framework Preset: Other
   - Root Directory: raiz do repositório (./)
   - Build Command: vazio
   - Output Directory: .
   - Install Command: vazio
   - Environment Variables: nenhuma necessária
4. Clique em Deploy e aguarde o status Ready.
5. Abra o endereço gerado e confira logo, telas, calculadora e formulário.

O vercel.json já contém as configurações de build. Não é necessário instalar pacotes ou executar npm. Caso o repositório não apareça na importação, use a configuração da integração GitHub na Vercel para conceder acesso a esse repositório; em organizações, pode ser necessária a ação de um administrador.

## 3. Domínio
Após validar o endereço gerado, abra Settings > Domains e adicione o subdomínio escolhido. Use exatamente os registros DNS indicados pela Vercel para aquele projeto. O domínio personalizado ainda não está configurado neste pacote.

## Fluxo de contatos
O formulário prepara uma mensagem para o WhatsApp comercial +55 (16) 97404-9229. O visitante precisa revisar e ENVIAR a mensagem para concluir a solicitação. Não há banco de leads, CRM ou webhook neste pacote.

Existe o evento demo_whatsapp_click no dataLayer ao abrir o WhatsApp. Ele indica tentativa de contato, não envio confirmado ou agendamento. GTM, Meta Pixel e Talkify ainda não estão instalados.

## Referências
- https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
- https://vercel.com/docs/builds/configure-a-build

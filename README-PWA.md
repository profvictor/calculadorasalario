# Calculadora de Salário de Professor - PWA

Este projeto foi transformado em um Progressive Web App (PWA) completo, permitindo que seja instalado como um aplicativo nativo em dispositivos móveis e desktop.

## Recursos do PWA

✅ **Instalável**: Pode ser instalado na tela inicial de smartphones e desktops
✅ **Funciona Offline**: Após a primeira visita, funciona sem conexão à internet
✅ **Ícones Personalizados**: Ícones em diferentes tamanhos para todos os dispositivos
✅ **Tema Personalizado**: Cores e aparência customizadas
✅ **Modo Standalone**: Abre como um aplicativo nativo, sem barra do navegador

## Como Instalar

### No Android (Chrome):
1. Abra o site no navegador Chrome
2. Toque no menu (três pontos) no canto superior direito
3. Selecione "Adicionar à tela inicial" ou "Instalar app"
4. Confirme a instalação

### No iOS (Safari):
1. Abra o site no navegador Safari
2. Toque no botão de compartilhar (quadrado com seta)
3. Selecione "Adicionar à Tela de Início"
4. Confirme a instalação

### No Desktop (Chrome/Edge):
1. Abra o site no navegador
2. Procure pelo ícone de instalação na barra de endereços
3. Clique em "Instalar" quando aparecer o prompt

## Arquivos do PWA

- `manifest.json` - Configurações do PWA (nome, ícones, cores, etc.)
- `sw.js` - Service Worker para cache e funcionamento offline
- `icon-*.png` - Ícones em diferentes tamanhos (72x72 até 512x512)
- `generate-icons.py` - Script para gerar os ícones (requer Python e Pillow)

## Testando o PWA

1. Abra o site em um servidor local ou hospedado (não funciona com `file://`)
2. Abra as Ferramentas de Desenvolvedor (F12)
3. Vá para a aba "Application" (Chrome) ou "Manifest" (Firefox)
4. Verifique se o manifest está carregado corretamente
5. Verifique se o Service Worker está registrado e ativo
6. Teste o modo offline usando a opção "Offline" nas DevTools

## Requisitos

- Servidor web (não funciona com `file://` devido às políticas de segurança)
- Navegadores modernos que suportam Service Workers
- HTTPS (ou localhost para desenvolvimento)

## Notas

- O Service Worker usa a estratégia "Cache First", priorizando conteúdo em cache
- Os ícones foram gerados automaticamente usando o script Python
- O PWA funciona melhor quando servido via HTTPS em produção


# DailyWard

## Visão Geral
DailyWard é um aplicativo desenvolvido para facilitar a comunicação, organização e compartilhamento de recursos entre usuários em ambientes colaborativos. O projeto utiliza uma arquitetura moderna, integrando backend em Django REST Framework e frontend em React Native com Expo Router.

## Principais Frameworks e Bibliotecas

### Backend
- **Django REST Framework** - Framework web e API
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **Docker** - Contêinerização

### Frontend
- **React Native** - Framework mobile
- **Expo** - Plataforma de desenvolvimento
- **Expo Router** - Navegação
- **React Hook Form** - Gerenciamento de formulários
- **Axios** - Cliente HTTP
- **React Query (TanStack Query)** - Gerenciamento de estado e cache
- **React Native Reanimated** - Animações

### Estrutura do Projeto
- **backend/**: Código do servidor Django, configurações, apps e scripts
- **frontend/**: Aplicativo mobile, componentes, telas, assets e utilitários
- **.github/**: Workflows de CI/CD

## Como Contribuir

**Este projeto está fechado para colaborações externas no momento.**

## Como rodar o projeto

### Pré-requisitos
- Node.js e npm/yarn instalados
- Conta Expo (cadastre-se em [expo.dev](https://expo.dev))
- EAS CLI instalado e logado:
  ```bash
  npm install -g eas-cli && eas login
  ```

### Frontend (Dev Build)

Para instruções detalhadas sobre como criar um build de desenvolvimento, consulte a [documentação oficial do Expo](https://docs.expo.dev/develop/development-builds/create-a-build/).

**Resumo dos passos:**

1. Navegue até a pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Instale o `expo-dev-client`:
```bash
npx expo install expo-dev-client
```

4. Crie um build de desenvolvimento usando EAS:
```bash
# Para Android
eas build --platform android --profile development

# Para iOS 
eas build --platform ios --profile development
```

**Nota:** Para builds do iOS Simulator, é necessário editar o `eas.json` e configurar `simulator: true` no perfil de desenvolvimento. Veja a [documentação](https://docs.expo.dev/develop/development-builds/create-a-build/) para mais detalhes.

5. Após o build ser concluído, instale o APK/IPA no seu dispositivo ou emulador. O EAS CLI irá oferecer opções para instalação após o build.

6. Inicie o bundler JavaScript:
```bash
npx expo start

```
## Contato
Para dúvidas ou sugestões, entre em contato com o mantenedor do projeto.

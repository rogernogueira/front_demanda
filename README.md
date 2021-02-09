# Bem vindo ao Front Mobile

Trata-se de um conjunto de componentes que serão usados para aplicativos moveis<br> 
Contendo:

 - Login
 - Preload
 - Sistema de lista
 - Registro de usuário

# Linguagem

Totalmente desenvolvido em <b>React-Native </b>
## Ambiente
            choco install -y nodejs.install openjdk8	

## Instalação do ambiente e dependências 
Usar esses comandos dentro da pasta do projeto

	    react-native init
	    npm -i 

	   


## Executar o sistema 

	    npx react-native run-android

## Back-End
O back-end deve está rodando na  porta 5000.

## Flow inicial
Fluxo de autenticação 

```mermaid
sequenceDiagram
Preload ->> Login: Token não detectado
Login->>Home: Autentica e gera tokem
Home ->>Preload: Sair do sistema
Preload ->> Check Token: Valida tokem
Preload ->> Login: Token invalido
Preload->> Home: Token Valido

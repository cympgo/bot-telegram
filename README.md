# bot-telegram
Bot buscador de  endereço pelo cep.

1- Adicione a o token do bot no arquivo .env

const token = 'token' <= Adicionar em as aspas simples o token do seu bot.

module.exports={
    token,
    apiurl:'https://api.telegram.org/bot${token}',
    apiFileUrl:'https://api.telegram.org/file/bot${token}',
    
}

2- Execute o comando "npm i" dentro do depositorio para baixar as dependências necessária. 

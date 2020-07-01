const token = require('./.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(token.token)
const axios = require('axios')
const session = require('telegraf/session')
bot.use(session())


bot.start(ctx => {
  ctx.session.from = ctx.update.message.from
  ctx.reply(`Olá ${ctx.session.from.first_name}, Você pode procurar endereços apenas informando o cep no seguinte formato: CEP000000000!`)
})

bot.on('text', async ctx => {
  ctx.contexto = ctx.update.message.from
  ctx.session.valor = ctx.update.message.text.toUpperCase()
  if (ctx.session.valor.match(/CEP/)) {
    if (ctx.session.valor.match(/CEP+\d{8}/)) {
      ctx.reply(`${ctx.contexto.first_name}, Você está procurando pelo CEP: ${ctx.session.valor.match(/\d{8}/)}`)

    await axios.get(`https://viacep.com.br/ws/${ctx.session.valor.match(/\d{8}/)}/json/`).then((response) => {

     if(!response.data.erro === true){
      console.log(response.data)
        ctx.reply(`Cep: ${response.data.cep}
Logradouro: ${response.data.logradouro}
Complemento: ${response.data.complemento}
Bairro: ${response.data.bairro}
Localidade: ${response.data.localidade}
Uf: ${response.data.uf}
Unidade: ${response.data.unidade}
Ibge: ${response.data.ibge}
Gia: ${response.data.gia}`)
     }else{
      ctx.reply(`${ctx.contexto.first_name}, o CEP: ${ctx.session.valor.match(/\d{8}/)} não foi encontrado.`)
     }

      }).catch((erro) => {
        console.log(erro)
      })
    } else {
      ctx.reply(`${ctx.contexto.first_name}, Você está procurando por um CEP, mas as informações que você enviou não estão corretas. Você deve digitar da seguinte forma: CEP00000000.`)
    }
  } else {
    ctx.reply(`${ctx.contexto.first_name}, não encontrei nem um comando associado o texto ${ctx.session.valor} que você digitou!`)
  }
})

bot.startPolling()
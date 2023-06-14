const { Telegraf, Markup } = require('telegraf')

const bot = new Telegraf('6001849203:AAGkgCToA-BJAMnbxxBjDstVOVGixbpLcpo')

function getRandomInit(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

bot.hears('привет', (ctx) => ctx.reply('привет'))
bot.hears('hello', (ctx) => ctx.reply('hello'))
bot.hears('hola', (ctx) => ctx.reply('hola'))

const getCoinSide = () => getRandomInit(0, 1) === 0 ? 'Орел' : 'Решка'
const coinInlineKeyboard = Markup.inlineKeyboard([
    Markup.button.callback('Подбросить еще раз', 'flip_a_coin')
])

bot.hears('Подбросить монетку', ctx => ctx.reply(getCoinSide(), coinInlineKeyboard))
bot.action('flip_a_coin', async (ctx) => {
    await ctx.editMessageText(`${getCoinSide()}`)
})

const getRandomNum = () => getRandomInit(0, 100)
const numInlineKeyboard = Markup.inlineKeyboard([
    Markup.button.callback('Сгенерировать новое', 'random_number')
])
bot.hears('Случайное число', ctx => ctx.reply(getRandomNum().toString(), numInlineKeyboard))
bot.action('random_number', async (ctx) => {
    await ctx.editMessageText(`${getRandomNum()}`)
})


bot.use(async (ctx) => {
    await ctx.reply('Что делать?', Markup.keyboard([
        ['Подбросить монетку', 'Случайное число']
    ]).resize()
    )
})

bot.command('help', (ctx) => {
    ctx.reply(
        `Бот может здороваться на разных языках.
        Список поддерживаемых приветствий:
        - привет - русский
        - hello - английский
        - hola - испанский
        `
    )
})


bot.on('text', (ctx) => ctx.reply(`Привествие"${ctx.update.message.text}" не поддерживаеться`))


bot.launch().then(() => console.log('бот запущен'))

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
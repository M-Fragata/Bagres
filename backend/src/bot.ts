import { Telegraf } from 'telegraf';
import { BotTelegramController } from "./controller/botTelegram.js";

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);
const botController = new BotTelegramController();

// Middleware de segurança (opcional, mas recomendado)
bot.use(async (ctx, next) => {
    // Se quiser que apenas você peça a agenda, verifique o ID aqui
    return next();
});

bot.command('agenda', async (ctx) => {

    const args = ctx.message.text.split(" ")[1]

    const dateToSearch = args || new Date().toISOString().split("T")[0]

    const req = {
        query: {
            date: dateToSearch
        }
    } as any

    const res = {
        json: () => { },
        status: () => ({
            json: () => { }
        })
    } as any

    try {
        await botController.getDayReport(req, res);
        // Opcional: avisar no chat que deu certo se a mensagem demorar
        // ctx.reply("Buscando agenda..."); 
    } catch (error) {
        ctx.reply("❌ Ocorreu um erro ao processar o comando.");
    }

});

export { bot };
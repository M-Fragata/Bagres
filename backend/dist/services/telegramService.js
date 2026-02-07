export async function sendTelegramMessage(message) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatID = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatID) {
        console.error("Variáveis de ambiente do Telegram não encontradas!");
        return;
    }
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                chat_id: chatID,
                text: message,
                parse_mode: "HTML"
            })
        });
        const data = await response.json();
        console.log("Status do Telegram:", data.ok ? "Enviado!" : "Erro: " + data.description);
    }
    catch (error) {
        console.error("Erro ao conectar com a API do Telegram:", error);
    }
}
//# sourceMappingURL=telegramService.js.map
import {} from "express";
import { prisma } from "../database/prisma.js";
import { sendTelegramMessage } from "../services/telegramService.js";
export class BotTelegramController {
    async getDayReport(req, res) {
        const { date } = req.query;
        try {
            if (!date) {
                return res.status(400).json({ error: "Data é obrigatória" });
            }
            let dateFormatted = "";
            let dateBrazil = "";
            if (date.toString().includes("/")) {
                const [day, month, year] = String(date).split("/");
                dateBrazil = (`${day}/${month}/${year}`);
                dateFormatted = (`${year}-${month}-${day}`);
            }
            else if (date.toString().includes("-")) {
                const [year, month, day] = String(date).split("-");
                dateBrazil = (`${day}/${month}/${year}`);
                dateFormatted = String(date);
            }
            const schedules = await prisma.schedules.findMany({
                where: {
                    date: String(dateFormatted)
                },
                orderBy: {
                    hour: 'asc'
                }
            });
            if (schedules.length === 0) {
                await sendTelegramMessage(`<b>📅 Agenda: ${dateBrazil}</b>\n\nNenhum agendamento para hoje.`);
                return res.json({ message: "Relatório vazio enviado" });
            }
            let msg = `<b>📅 Agenda do Dia: ${dateBrazil}</b>\n\n`;
            const horarios = [...new Set(schedules.map(schedule => schedule.hour))];
            horarios.forEach(horario => {
                const atletaHour = schedules.filter(schedule => schedule.hour === horario);
                msg += `<b>⏰ ${horario}</b> (${atletaHour.length}/4)\n`;
                atletaHour.forEach(schedule => {
                    msg += `  • ${schedule.atleta}\n`;
                });
                msg += `\n`;
            });
            await sendTelegramMessage(msg);
            return res.json({ message: "Relatório enviado ao telegram", count: schedules.length });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao gerar relatório" });
        }
    }
}
//# sourceMappingURL=botTelegram.js.map
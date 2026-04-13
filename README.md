                                Bagres Swim Team - Agendamento
                                
Sistema de agendamentos para minha equipe de natação Bagres Swim Team, que permite a atletas agendarem horários de forma inteligente, respeitando as disponibilidades configuradas pela administração.

                                 Tecnologias Utilizadas

 - Front-end

Vite: Build tool de alta performance.
React + TypeScript: Interface reativa com tipagem estática.
Tailwind CSS: Design responsiva e estilização otimizada.

 - back-end

Node.js: Ambiente de execução JavaScript no servidor.
Express: Framework minimalista para criação de rotas e middlewares.
Zod: Biblioteca de declaração e validação de esquemas, garantindo que os dados que chegam à API estejam no formato correto (Type Safety de ponta a ponta).
Authentication (JWT): Controle de acesso através de tokens via Bearer Authorization.


                            Regras de Negócio & Funcionalidades

 - Validação de Dados com Zod
No servidor, todas as requisições passam por um "funil" de validação, evitando erros internos do servidor

 - Fluxo de Agendamento Inteligente

*Bloqueio por Calendário: O sistema consome as configurações dinâmicas do administrador para permitir agendamentos apenas em dias autorizados.
*Prevenção de Conflitos: Um horário não pode ser agendado por mais de 4 atletas simultaneamente na mesma data.
*Regra do Tempo: O sistema impede agendamentos em horários retroativos (passados)

 - Página de Administração

*Configuração de Dias Úteis: Alterar em tempo real quais dias da semana e horarios aparecem como "Disponíveis" no Front-end.

*Monitoramento de Fluxo: Visualização organizada por horarios.

*Gestão de Slots: Capacidade de remover agendamentos para liberar horários em casos de desistência.

*Gestão de atletas: Capacidade de remover atletas do site ou de editar informações.

                                    Integração com o Telegram
O sistema utiliza um Bot do Telegram para manter a administração sempre informada:

-Alertas de Atividade: Notificações instantâneas enviadas ao grupo da staff sempre que um novo agendamento é realizado ou quando um treino é cancelado.

-Relatórios: Geração de relatórios de agendamentos baseados na data selecionada diretamente pelo chat, facilitando a consulta rápida pelo treinador à beira da piscina. (comando /agenda ou /agenda dd/mm/yyyy)


                                    Como Executar o Projeto
1-Clone o repositório

2 - utilize o comando npm install para instalar as dependências
(Front -> cd frontend/bagreschedules e Back -> cd backend )

3 - Inicie o servidor Backend e frontend com o comando:
npm run dev



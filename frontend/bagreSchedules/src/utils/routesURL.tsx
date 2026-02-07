type RoutesURLProps = {
    API_LOGIN: string;
    API_SCHEDULES: string;
    API_SESSION: string;
}

// O Vite vai tentar ler a variável do arquivo .env. 
// Se não encontrar (no seu PC), ele usa o localhost como "plano B".
const BASE_URL = import.meta.env.VITE_API_URL

export const RoutesURL: RoutesURLProps = {
    "API_LOGIN": `${BASE_URL}/login`,
    "API_SCHEDULES": `${BASE_URL}/schedules`,
    "API_SESSION": `${BASE_URL}/session`
}
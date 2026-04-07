import { Routes } from "./routes/index.tsx"
import { useEffect } from "react"
import { jwtDecode } from "jwt-decode";
import { token } from "./utils/routesURL.tsx"

export function App() {

  //useEffect para verificar se o token do usuário está vencido.
  useEffect(() => {

    if (token) {
      try {

        const decoded: any = jwtDecode(token)
        const agora = Math.floor(Date.now() / 1000);

        console.log(token, agora)
        console.log(decoded.exp)

        if (decoded.exp < agora) {
          //Token venceu!
          localStorage.removeItem("@bagres:token");
          localStorage.removeItem("@bagres:user");
          localStorage.removeItem("@bagres:userName");

          alert("Sua sessão expirou. Por favor, faça login novamente.");

          window.location.href = "/";
        }

      } catch (error) {

        localStorage.clear();
        window.location.href = "/";

      }
    }

  }, [])

  return (
    <Routes />
  )
}


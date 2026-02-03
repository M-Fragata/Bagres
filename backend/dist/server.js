import express from "express";
import cors from "cors";
import { routes } from "./routes/index.js";
const app = express();
const PORT = process.env.PORT || 3333;
app.use(cors({
    origin: "*", // Durante o desenvolvimento, o "*" libera qualquer frontend (localhost:5173, etc)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(routes);
app.listen(PORT, () => console.log(`Server is running`));
//# sourceMappingURL=server.js.map
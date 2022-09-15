import dotenv from "dotenv";
import app from ".";
dotenv.config();

console.log(`minha aplicação: ${process.env.DATABASE_URL}`);
const PORT: number = Number(process.env.PORT) || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

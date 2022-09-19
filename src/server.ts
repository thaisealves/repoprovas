import dotenv from "dotenv";
import app from ".";
dotenv.config();

const PORT: number = Number(process.env.PORT) || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

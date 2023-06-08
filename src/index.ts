require("dotenv").config();
import app from "./app";
import initializeDB from "./db";

const PORT = process.env.PORT || 4000;
const start = async () => {
  try {
    // initaiizing database
    await initializeDB.initialize();

    // listening to a port
    app.listen(PORT, () =>
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
    );
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

start();

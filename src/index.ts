require("dotenv").config();
import app from "./app";
import initializeDB from "./db";

const PORT = process.env.PORT || 4000;

// const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
// const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;
const start = async () => {
  try {
    // console.log("Connecting to database...");

    await initializeDB.initialize();

    app.listen(PORT, () =>
      console.log("listening on port http://localhost:" + PORT)
    );
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

start();

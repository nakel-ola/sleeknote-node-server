require("dotenv").config();
import app from "./app";
// import initializeDB from "./db";

const PORT = process.env.PORT || 4000;
const start = async () => {
  app.listen(PORT, () =>
    console.log("listening on port http://localhost:" + PORT)
  );
  // console.log("Connecting to database...");

  // initializeDB
  //   .initialize()
  //   .then(() => {
  //     console.log("Connected to database...");
  //     app.listen(PORT, () =>
  //       console.log("listening on port http://localhost:" + PORT)
  //     );
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};

start();

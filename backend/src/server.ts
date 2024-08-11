import http from "http";
import app from "./app";
import config from "./config";
const server = http.createServer(app);

app.listen(config.port, () => {
  console.log(`Server is running at http://localhost:${config.port}`);
});

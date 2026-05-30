import app from "./app.js";
import { env } from "./config/env.js";

app.listen(env.PORT, () => {
  console.log(`Insyra backend running on port ${env.PORT}`);
});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const contentRoutes = require("./routes/content");

const app = express();
const PORT = 9000;

app.use(bodyParser.json());
app.use(cors());

app.use("/api", contentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});

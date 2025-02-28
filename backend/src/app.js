const express = require("express");
const bodyParser = require("body-parser");
const migration = require("./migration/migration");
const routes = require("./routes/routes");
const cors = require('cors')

const app = express();
const port = 3000;
migration();
app.use(cors())
app.use(bodyParser.json());
app.use("/api", routes)
app.listen(port, () => {
    console.log(`server berjalan di port ${port}`);
});
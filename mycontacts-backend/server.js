const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectionDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectionDB();
const app = express();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use('/api/contacts', require("./routes/contactRouters"));
app.use('/api/users', require("./routes/userRoutes"));
app.use(errorHandler)
app.listen(port, () => {
    console.log(`Sever running on the port ${port}`)
});
const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middlewares/errorHandler");
const contactRoutes = require("./routes/contactsRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDb = require("./config/dbConnection");

connectDb();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});

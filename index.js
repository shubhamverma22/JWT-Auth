const express = require("express");
const mongoose = require("mongoose");
const app = express();
PORT = 3000;

//middlewares
app.use(express.static("public"));

//view engines
app.set("view engine", "ejs");

//database connection
bdUri =
	"mongodb+srv://shubham:verma123@cluster0.n4nyn.mongodb.net/node-auth?retryWrites=true&w=majority";
mongoose
	.connect(bdUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then((result) => app.listen(3000))
	.catch((err) => console.log(err));

//routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));

app.listen(PORT, () => {
	console.log(`Server is Running at the PORT ${PORT}`);
});

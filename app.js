const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const app = express();
const PORT = 3000;

//middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

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
	.then((result) =>
		app.listen(PORT, () => {
			console.log(`Server is running at port ${PORT}`);
		})
	)
	.catch((err) => console.log(err));

//routes
app.get("*", checkUser); //applied for Every Route
app.get("/", requireAuth, (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.use(authRoutes);

//cookies
app.get("/set-cookies", (req, res) => {
	//res.setHeader("Set-Cookie", "newUser=true");

	res.cookie("newUser", false);
	res.cookie("isEmployed", true, {
		maxAge: 1000 * 60 * 60 * 24,
		httpOnly: true,
	});

	res.send("You got the cookies!");
});

app.get("/read-cookies", (req, res) => {
	const cookies = req.cookies;
	console.log(cookies);
	res.json(cookies);
});

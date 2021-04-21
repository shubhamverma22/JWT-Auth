const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;

	//check json web token exist & verified
	if (token) {
		jwt.verify(token, "user secret key", (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.redirect("/login");
			} else {
				console.log(decodedToken);
				next();
			}
		});
	} else {
		res.redirect("/login");
	}
};

//check current user
const checkUser = (req, res, next) => {
	const token = req.cookies.jwt;

	//check json web token exist & verified
	if (token) {
		jwt.verify(token, "user secret key", async (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.locals.user = null;
				next();
			} else {
				console.log(decodedToken);
				let user = await User.findById(decodedToken.id);
				res.locals.user = user; //that's how we access user in our views so we can use it in frontEnd part
				next();
			}
		});
	} else {
		res.locals.user = null;
		next();
	}
};

module.exports = { requireAuth, checkUser };

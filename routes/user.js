const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userCountroller = require("../controllers/users.js");

// for signup
router
  .route("/signup")
  .get(userCountroller.renderSignupForm)
  .post(wrapAsync(userCountroller.signup));

// for login
router
  .route("/login")
  .get(userCountroller.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userCountroller.login
  );

router.get("/logout", userCountroller.logout);

module.exports = router;

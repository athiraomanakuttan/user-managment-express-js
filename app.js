const express = require("express");
const session = require("express-session");
const nocache = require("nocache");
const morgan = require("morgan");

const app = express();

// ----------------------- Routers ---------------
const adminRouter = require("./Router/adminRouter");
const userRouter = require("./Router/userRouter");
const collection = require("./Config/dbConnect");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(nocache());
const oneday = 1000 * 60 * 60 * 24; // Time one day
app.use(nocache()); // use destroy cache
app.use(
  session({
    secret: "secret-Key",
    resave: false,
    cookie: { maxAge: oneday },
    saveUninitialized: false,
  })
);

// -------------- Routes for admin and user -----------

app.use("/", userRouter);
app.use("/admin", adminRouter);

// ------------------- Port connected  --------------

app.get('/',(req,res)=>{
  res.redirect("/login")
})

app.listen(3000, () => console.log("Server Started @ http://localhost:3000"));

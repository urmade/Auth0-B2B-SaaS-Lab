const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const apiHandler = require("./util/api");


app.use("/static", express.static(path.join(__dirname, "static")));

const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');


dotenv.config();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: 'http://localhost:3000',
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_ID
};

app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    if (req.oidc.isAuthenticated()) res.sendFile(path.join(__dirname, "pages", "order.html"));
    else res.sendFile(path.join(__dirname, "pages", "index.html"));
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

app.use("/api", apiHandler);


app.get("/callback", (req, res) => {
    res.redirect("/");
})



app.listen(3000, () => { console.info("Server is running") });
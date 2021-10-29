const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");


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
    issuerBaseURL: process.env.ISSUER_BASE_ID,
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
app.get("/fetchOrg", requiresAuth(), (req, res) => {
    if (req.oidc.isAuthenticated()) {
        if (req.oidc.user && req.oidc.user["https://pizza0.net/organization"]) {
            if(req.oidc.user["https://pizza0.net/license"]) res.send(req.oidc.user["https://pizza0.net/organization"] + "(" + req.oidc.user["https://pizza0.net/license"] + ")");
            else res.send(req.oidc.user["https://pizza0.net/organization"]);
        }
        else res.send(req.oidc.user.org_id);
    }
    else res.status(403).send("N/A");
})
app.get("/callback", (req, res) => {
    res.redirect("/");
})



app.listen(3000, () => { console.info("Server is running") });
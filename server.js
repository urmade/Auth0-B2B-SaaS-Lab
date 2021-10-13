const express = require("express");
const app = express();
const path = require("path");


app.use("/static", express.static(path.join(__dirname, "static")));

const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');



const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'xKgqzPI@ig964@BVYc',
    baseURL: 'http://localhost:3001',
    clientID: 'JXn4nukDikXYWKYUZNbYEM5YB1d4jtkY',
    issuerBaseURL: 'https://tu-playground.eu.auth0.com',
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
    else res.status(403).send();
})
app.get("/callback", (req, res) => {
    res.redirect("/");
})



app.listen(3001, () => { console.info("Server is running") });
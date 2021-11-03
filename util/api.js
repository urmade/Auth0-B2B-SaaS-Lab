const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.get("/organization", (req,res) => {
    if (req.oidc.isAuthenticated()) {
        if (req.oidc.user && req.oidc.user["https://pizza0.net/organization"]) {
            if(req.oidc.user["https://pizza0.net/license"]) res.send(req.oidc.user["https://pizza0.net/organization"] + " (" + req.oidc.user["https://pizza0.net/license"] + " license)");
            else res.send(req.oidc.user["https://pizza0.net/organization"]);
        }
        else res.send(req.oidc.user.org_id);
    }
    else res.status(403).send("N/A");
})
router.get("/order", (req,res) => {
    if(!req.query.type) res.status(400).send("Please specify the type of pizza you want to order!");
    if (req.oidc.isAuthenticated()) {
        fetch("http://lab.pizza0.net/api/"+req.query.type, {
            headers: {
                "Authorization": "Bearer " + req.oidc.idToken
            }
        }).then(resp => {
            res.status(resp.status).send();
        })
    }
    else {
        res.status(403).send("You are not authenticated!");
    }
})

module.exports = router;
const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const apiHandler = require("./util/api");


app.use("/static", express.static(path.join(__dirname, "static")));

dotenv.config();

//TODO: Use Auth0 as a middleware for our project (Hint: Look at the quickstart tutorial)

app.get('/', (req, res) => {
    //TODO Check if the user is authenticated
    //if(<user is authenticated>) res.sendFile(path.join(__dirname, "pages", "order.html"));
    //else
    res.sendFile(path.join(__dirname, "pages", "index.html"));
});

//TODO: Check if the user is authenticated before allowing to access to this endpoint
app.get('/profile', (req, res) => {
    //TODO send out the profile information
    //res.send(<profileInfo>)
});

//Technical helpers, can be ignored
app.use("/api", apiHandler);
app.get("/callback", (req, res) => {
    res.redirect("/");
})



app.listen(process.env.PORT ||  3000, () => { console.info("Server is running") });
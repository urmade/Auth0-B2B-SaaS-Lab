# Welcome to Pizza0!
You have been invited to help one of the hottest start-up around at the moment, Pizza0. The idea: Pizza not only for individuals, but also for corporations who either want to treat their employees or need a reliable way to order great pizza for their own events. The challenge: While Pizza0 is busy building its great platform and pizza delivery, it doesn't have a lot of time to invest into their Identity and Access Management, but user experience and security are vital to their success. 

This is why they reached out to you with your great expertise around AWS and Identity Management. They want you to show them how to:
- Integrate a login that contains their custom logo and their corporate CI colors (to be found in styleguide.md)
- Bring users in via Google, Facebook and Apple
- Log in their corporate users (mostly young and tech-savy companies sign up, so Okta is their first priority)
- Know which user belongs to what company customer (internally called organization) from the moment they sign in
- Enable users to be invited into other organizations (because especially company mergers require a lot of pizza to be successful)
- Check which license an organization has ordered and what pizza users can order accordingly

They have already sent you their baseline application in this repository. It consists of three main components:
*server.js* which hosts the Node.js server and should do most of the login parts
*index.html* which is the landing page that unauthenticated users see
*order.html* which is the site that an authenticated user can use to order pizza

Happy coding and happy securing!

*Disclaimer: This Auth0 lab is meant to be a guided exercise. We will tackle all the challenges together with you having a chance to play around with the technology yourself. If at any point you need additional help or if you want to go through this lab on your own, you can find additional help on https://lab.pizza0.net*
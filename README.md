Building a stripped down version of our Northwest Merchants management system. The goal
is a SaaS system serving multiple web front-ends (possibly through CNAMEs from different
root domains) as well as a mobile app and API-only consumers through a single API.

Current components are:

 * [api](api) - Provides registration/auth (JWT) endpoints as well as all data services,
   [https://api.merchant.gg/]
 * [apps](apps) - React Native apps using the API
 * [common](common) - Code shared between components
 * [caddy](caddy) - Web server / reverse proxy configuration, e.g. [https://inkhero.merchant.gg/]
 * [login](login) - Unified login portal for web front-ends, [https://login.merchant.gg/]
 * [ui](ui) - The main web application, [https://app.merchant.gg/]
 * [www](www) - SaaS company web site, [https://merchant.gg/]

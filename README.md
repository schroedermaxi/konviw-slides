# Slide Macro - an Atlassian Connect App using Express

Slide Macro is a replacement of the Page Properties Macro for slides rendering in Konviw.

## Setup Dev

- Clone this repository `git clone ssh://git@emea-aws-gitlab.sanofi.com:2222/factory4/digital-foundation/iadc-portal/slide-macro.git`
- Add and configure `credentials.json` in the project root

```json
{
  "hosts" : {
     "sanofiprojects-sandbox-686.atlassian.net": {
        "product" : "confluence",
        "username" : "username@sanofi.com",
        "password" : "YOUR_SECRET_KEY"
     }
  }
}
```

You can generate confluence API KEY at this page: https://id.atlassian.com/manage-profile/security/api-tokens

- Install npm and run the macro

```bash
npm install
npm start
```

## Documentations

- [Official Docs](https://bitbucket.org/atlassian/atlassian-connect-express/src/master/README.md)
- [How to build a macro](https://sanofi.atlassian.net/wiki/spaces/IADC/pages/63591792458/Atlassian+Connect+Macro+Building+Process)
- [How to deploy a macro to Heroku](https://sanofi.atlassian.net/wiki/spaces/IADC/pages/63592929904/Atlassian+Connect+Macro+Deploy+to+production+-+Heroku)


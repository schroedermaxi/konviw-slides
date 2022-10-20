export default function routes(app, addon) {
  // Redirect root path to /atlassian-connect.json,
  // which will be served by atlassian-connect-express.
  app.get('/', (req, res) => {
    res.redirect('/atlassian-connect.json')
  })

  // This is an example route used by "generalPages" module (see atlassian-connect.json).
  // Verify that the incoming request is authenticated with Atlassian Connect.
  app.get('/hello-world', addon.authenticate(), (req, res) => {
    // Rendering a template is easy; the render method takes two params: the name of the component or template file, and its props.
    // Handlebars and jsx are both supported, but please note that jsx changes require `npm run watch-jsx` in order to be picked up by the server.
    res.render(
      'hello-world.hbs', // change this to 'hello-world.jsx' to use the Atlaskit & React version
      {
        title: 'Atlassian Connect',
        //, issueId: req.query['issueId']
        //, browserOnly: true // you can set this to disable server-side rendering for react views
      }
    )
  })

  // Add additional route handlers here...
  app.get('/slide', addon.authenticate(), function (req, res) {
    // Get the macro variables passed in via the URL
    const pageId = req.query['pageId'],
      pageVersion = req.query['pageVersion'],
      macroId = req.query['macroId'],
      slideId = req.query['slideId']

    // Get the clientKey and use it to create an HTTP client for the REST API call
    const clientKey = req.context.clientKey
    const httpClient = addon.httpClient({
      clientKey: clientKey,
    })

    // Call the REST API: Get macro body by macro ID
    httpClient.get(
      '/rest/api/content/' +
        pageId +
        '/history/' +
        pageVersion +
        '/macro/id/' +
        macroId,
      function (err, response, contents) {
        if (err || response.statusCode < 200 || response.statusCode > 299) {
          console.log(err)
          res.render(
            '<strong>An error has occurred : ' +
              response.statusCode +
              '</strong>'
          )
        }
        contents = JSON.parse(contents)
        console.log(contents)

        // Render the view, passing in the {{{body}}}
        res.render('slide', {
          body: contents.body,
          slideId: slideId,
          parameters_object: contents.parameters,
          parameters_string: JSON.stringify(contents.parameters),
        })
      }
    )
  })
}

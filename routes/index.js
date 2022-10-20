const handleResponseOfCustomMacro = (req, res, addon, { view, slideScope }) => {
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
      let responseData = {
        body: contents.body,
        parameters_object: contents.parameters,
        parameters_string: JSON.stringify(contents.parameters),
      }

      if (slideScope) {
        responseData = { ...responseData, slideId }
      }

      res.render(view, responseData)
    }
  )
}

export default function routes(app, addon) {
  // Redirect root path to /atlassian-connect.json,
  // which will be served by atlassian-connect-express.
  app.get('/', (req, res) => {
    res.redirect('/atlassian-connect.json')
  })

  app.get('/slide', addon.authenticate(),function (req, res) {
    handleResponseOfCustomMacro(req, res, addon, { view: 'slide', slideScope: true })
  })

  app.get('/slideSettings', addon.authenticate(), function (req, res) {
    handleResponseOfCustomMacro(req, res, addon, { view: 'slideSettings', slideScope: false })
  })
}

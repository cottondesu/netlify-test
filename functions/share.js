const headers = {
  "Content-Type": "text/html;charset=UTF-8"
}

const template = ({name, title}) => `
<!DOCTYPE html>
<html>
<head>
  <title>${title || ("hello " + name)}</title>
</head>
<body>
<h1>hello ${name}!</h1>
</body>
</html>
`

exports.handler = ({httpMethod, path}, context, callback) => {

  if(httpMethod !== "GET") {
    callback(null, {
      statusCode: 405,
      body: "<h1>Method Not Allowed</h1>",
      headers,
    })
    return
  }


  const paths = path.match(/([^\/.]+)/g, "")
  const name = paths[paths.indexOf("share") + 1]
  if(name == null || paths[paths.indexOf("share") + 2]) {
    callback(null, {
      statusCode: 404,
      body: "<h1>Page Not Found.</h1>",
      headers,
    })
    return
  }

  callback(null, {
    statusCode: 200,
    body: template({ name }),
    headers,
  })
}


// NG ワード
const words = [ "しめ鯖", "シメサバ", "〆鯖", "シメ鯖" ]

const headers = {
  "Content-Type": "application/json;charset=UTF-8"
}

exports.handler = ({httpMethod, queryStringParameters}, context, callback) => {

  if(httpMethod !== "GET") {
    callback(null, {
      statusCode: 405,
      body: JSON.stringify({
        message: "Method Not Allowed"
      }),
      headers,
    })
    return
  }

  const { word } = queryStringParameters

  if(!word) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: "'word'クエリは必須です。",
      }),
      headers,
    })
    return
  }

  if(words.includes(word)) {
    callback(null, {
      statusCode: 401,
      body: JSON.stringify({
        message: `${word}には不適切な単語が含まれています。`,
      }),
      headers,
    })
    return
  }

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: `${word}は適切な入力です。`,
    }),
    headers
  })
}

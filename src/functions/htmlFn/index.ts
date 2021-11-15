
const handler = async function (event: any, context: any) {
    const textColor = 'yellow';
    const name = event?.queryStringParameters?.name || 'Stranger'
    
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/html'
        },
        body: `<!doctype html>
                <html>
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css" crossorigin="anonymous">
                        <title>My Demo App</title>
                    </head>
                    <body style="background-color: #0336FF;">
                        <h1 style="color:${textColor};">Hello, ${name}!</h1>
                    </body>
                </html>`,
    };
};

export { handler }

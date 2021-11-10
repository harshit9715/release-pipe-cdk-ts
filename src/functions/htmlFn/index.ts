
const handler = async function (event: any, context: any) {
    const textColor = 'yellow';
    
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/html'
        },
        body: `<!doctype html>
                <html>
                    <head>
                        <title>My Demo App </title>
                    </head>
                    <body style="background-color: #0336FF;">
                        <h1 style="color:${textColor};">Hello, world!</h1>
                    </body>
                </html>`,
    };
};

export { handler }
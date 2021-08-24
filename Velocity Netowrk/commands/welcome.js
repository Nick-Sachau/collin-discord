const { MessageAttachment } = require('discord.js')
const nodeHtmlToImage = require('node-html-to-image');

module.exports = (client, newUser, userPicture) => {
    console.log('new person joined')
    welcomeMessage();

    async function welcomeMessage() {

        const _htmlTemplate = `<!DOCTYPE html>
        <html lang="en">
            <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <style>
                body {
                    font-family: "Poppins", Arial, Helvetica, sans-serif;
                    background-image: url('https://images.unsplash.com/photo-1528484701073-2b22dc76649e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&w=1000&q=80');
                    background-repeat: no-repeat;
                    background-size: cover;
                    color: #fff;
                    max-width: 600px;
                    min-height: 200px;
                }
                p {
                    color: orange;
                }
            </style>
            </head>
            <body>
                <h1>${newUser}</h1>
            </body>
        </html>
        `

        const images = await nodeHtmlToImage({
            html: _htmlTemplate,
            quality: 100,
            type: 'jpeg',
            puppeteerArgs: {
            args: ['--no-sandbox'],
            },
            encoding: 'buffer',
        })

        client.channels.cache.get('879539054176256110').send(new MessageAttachment(images, `${client}.jpeg`))
    }
}
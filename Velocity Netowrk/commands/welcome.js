const { MessageAttachment } = require('discord.js')
const nodeHtmlToImage = require('node-html-to-image');

module.exports = (client, newUser) => {
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
                    background-image: url('https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia.istockphoto.com%2Fphotos%2Fbeautiful-blue-galaxy-background-picture-id474932998%3Fk%3D6%26m%3D474932998%26s%3D170667a%26w%3D0%26h%3D7SVf8VrFj060x46O9dRJpYwVcjmSj7BvjLlDM8AryaI%3D&imgrefurl=https%3A%2F%2Fwww.istockphoto.com%2Fphoto%2Fbeautiful-blue-galaxy-background-gm474932998-64949791&tbnid=a9LbDXz3UweeLM&vet=12ahUKEwj35tf968jyAhWPADQIHU4bADYQMyhDegQIARB6..i&docid=bS6Zaanp-S6lgM&w=537&h=322&q=galaxy%20background&ved=2ahUKEwj35tf968jyAhWPADQIHU4bADYQMyhDegQIARB6');
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
                <p>Testing Perfection</p>
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
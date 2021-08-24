const { MessageAttachment } = require('discord.js')
const nodeHtmlToImage = require('node-html-to-image');

module.exports = (message, args, Discord, client) => {

    if(message.channel.id == 879539054176256110 || message.channel.id == 853900236674170900) { // checks to see if its in testing or poll bot channel
        message.channel.send('Use command . to set the title of the poll')

        const filter = m => m.content.split(' ')[0].includes('.');

        let title = message.channel.createMessageCollector(filter, { time: 15000 });

        let titleSend = ""

        let descriptionSend = ""

        let optionsSend = [];
        let optionsLoop = '';

        title.on('collect', m => {
            title.stop()
        });

        title.on('end', collected => {
            if(collected.size == 0) {
                message.channel.send('ran out of time')
            }else {
                collected.map((element) => {
                    let messageContent = element.content.split(" ")
                    messageContent.splice(0, 1)
                    for(i in messageContent) {
                        if(i == 0) {
                            titleSend = `${messageContent[i]}`
                        }else {
                            titleSend = `${titleSend} ${messageContent[i]}`
                        }
                    }
                    message.channel.send(`Title has been set to "${titleSend}"`)
                })
            
                message.channel.send('Use command . to set the description of the poll')

                let description = message.channel.createMessageCollector(filter, { time: 60000 });

                description.on('collect', m => {
                    description.stop()
                });

                description.on('end', collected => {
                    if(collected.size == 0) {
                        message.channel.send('Dont have enough time? Contact a dev to add more time')
                    }else {
                        collected.map((element) => {
                            messageContent = element.content.split(" ")
                            messageContent.splice(0, 1)
                            for(i in messageContent) {
                                if(i == 0) {
                                    descriptionSend = `${messageContent[i]}`
                                }else {
                                    descriptionSend = `${descriptionSend} ${messageContent[i]}`
                                }
                            }
                            message.channel.send(`Description has been set to "${descriptionSend}"`)
                        })

                        message.channel.send('Use the command . followed by all the options you want')

                        let options = message.channel.createMessageCollector(filter, { time: 60000 });

                        options.on('collect', m => {
                            options.stop()
                        })

                        options.on('end', collected => {
                            if(collected.size == 0) {
                                message.channel.send('Dont have enough time? Contact a dev to add more time')
                            }else {
                                collected.map((element) => {
                                    messageContent = element.content.split(" ") 
                                    messageContent.splice(0, 1) // ['Fast_And_Furious_8_:one:', 'Fast_And_Furious_9_:two:']
                                    if(messageContent.length < 2) {
                                        message.channel.send('You need to have at least 2 options')
                                    }else {
                                        for(i in messageContent) {
                                            messageContent[i] = messageContent[i].split('_') // [ ['fast', 'and', 'furious', '8', ':one:'] ['fast', 'and', 'furious', '9', ':two:'] ]
                                            for(x in messageContent[i]) {
                                                if(x == 0) {
                                                    optionsLoop = messageContent[i][x]
                                                }else {
                                                    optionsLoop = `${optionsLoop} ${messageContent[i][x]}`
                                                }
                                            }
                                            optionsSend.push(optionsLoop)
                                        }
                                        if(optionsSend.length > 3) {
                                            message.channel.send('Currently I am only allowing 3 options. I will take the first 3. Do you accept? {type . yes or . no}')
                                            
                                            let yesOrNo = message.channel.createMessageCollector(filter, { time: 60000 });

                                            yesOrNo.on('collect', m => {
                                                yesOrNo.stop()
                                            })

                                            yesOrNo.on('end', collected => {
                                                if(collected.size == 0) {
                                                    message.channel.send('You did not answer. Poll terminted');
                                                }else {
                                                    collected.map((element) => {
                                                        let x = element.content.split(" ")
                                                        x.splice(0, 1)
                                                        if(x == 'yes') {
                                                            makePoll()
                                                        }else {
                                                            message.channel.send('You have canceled the poll.')
                                                        }
                                                    })
                                                }
                                            })
                                        }else if(optionsSend.length <= 3) {
                                            message.channel.send(`options have been set to "${optionsSend}"`)
                                            
                                            makePoll();
                                        }
                                    }
                                })
                            }
                        })
                    }
                })
            }
        });

        async function makePoll() {

            let test = `<div class="options">
                <p class="option">${optionsSend[0]}</p>
                <img class="optionImg" src="https://cdn-0.emojis.wiki/emoji-pics-lf/twitter/keycap-1-twitter.png" width="20px" height="30px"/>
                <p class="option">${optionsSend[1]}</p>
                <img class="option" src="https://cdn-0.emojis.wiki/emoji-pics-lf/twitter/keycap-2-twitter.png" width="20px" height="30px"/>
                <p class="option">${optionsSend[2]}</p>
                <img class="option" src="https://cdn-0.emojis.wiki/emoji-pics-lf/twitter/keycap-3-twitter.png" width="20px" height="30px"/>
            </div>`

            const _htmlTemplate = `<!DOCTYPE html>
            <html lang="en">
                <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <style>
                    body {
                        font-family: "Poppins", Arial, Helvetica, sans-serif;
                        background: rgb(22, 22, 22);
                        color: #fff;
                        max-width: ${optionsSend.length * 600}px;
                        min-height: 500px;
                    }
            
                    .poll {
                        max-width: ${optionsSend.length * 600}px;
                        height: 350px;
                        padding: 20px;
                        padding-top: 5px;
                        display: flex;
                        flex-direction: column;
                        border-top: 3px solid ${args[0]};
                        background: rgb(31, 31, 31);
                        align-items: left;
                    }

                    .poll .title {
                        text-align: center;
                    }

                    .poll .description {
                        font-style: italic;
                    }

                    .options {
                        display: flex;
                        flex-direction: row;
                        width: 100%;
                        height: 150px;
                        justify-content: space-around;
                        align-items: center;
                    }

                    .option {
                        font-size: ".6rem";
                        color: 'red';
                    }

                    img {
                        width: 30px;
                        height 20px;
                        margin-left: 10px;
                        margin-right: 50px;
                    }
                </style>
                </head>
                <body>
                    <div class="poll">
                        <h2 class="title">${titleSend}</h2>
                        <p class="description">${descriptionSend}</p>
                    </div>
                    ${test}
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
            
            let emojis = ['1️⃣', '2️⃣', '3️⃣']

            // make it find #announcements channel and send the image there and then @everyone in #general with the message "There is a new poll up. Please go and vote!"

            message.channel.send(new MessageAttachment(images, `${titleSend}.jpeg`))
                .then((message) => {
                    for(let x = 0; x <= 2; x++) {
                        message.react(emojis[x])
                    }
                })
        }
    }
}

// make at end post in general "@everyone new poll has been posted go to #poll to vote"

module.exports = {
    name: 'test',
    description: 'This command is just a testing command to be able to check if the bot is working',
    execute(message, args, client) {
        message.channel.send('Working')
    }
}
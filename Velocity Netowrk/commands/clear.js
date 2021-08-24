module.exports = {
    name: 'clear',
    description: 'This command will clear meassages based on the amount that has been passed through',
    async execute(message, args, client) {
        if(!args[0]) return message.reply('Please enter the amount of message that you want to clear!');
        if(isNaN(args[0])) return message.reply('Please enter a real number!');

        if(args[0] > 100) return message.reply('You cant delete more than 100 messages!');
        if(args[0] < 1) return message.reply('You must delete atleast 1 message!');

        await message.channel.messages.fetch({limit: args[0]}).then(messages => {
            message.channel.bulkDelete(messages);
        })
    }   
}
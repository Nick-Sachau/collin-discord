module.exports = {
    name: 'test copy',
    description: 'This command is just a testing command to be able to check if the bot is working (copy)',
    execute(message, args, client) {
        fs = require('fs');
        var name = 'Assets/repairs.json';
        var repair = JSON.parse(fs.readFileSync(name).toString());

        let repairs = repair.repairs

        // make only admins json and make if whoever sent message isnt admin end command

        if(args.length == 0) {
            message.channel.send('You need to add something to repair.')
            
        }else if(args.length > 1) {
            message.channel.send('You can only add one at a time.')
        }else if(args.length == 1) {
            
            for(i in repairs) {
                if(Object.keys(repairs[i]) == args[0]) {
                    message.channel.send(`${args[0]} is already set for under repairs`);
                    break;
                }else if(Object.keys(repairs[i]) !== args[0] && i == repairs.length - 1) {
                    let game = args[0]
                    let newRepair = {
                        [game]: true
                    }

                    repairs.push(newRepair);

                    message.channel.send(`${args[0]} has been set for repairs`)
                    break;
                }
            }
            
            fs.writeFileSync(name, JSON.stringify(repair));
        }
    }
}
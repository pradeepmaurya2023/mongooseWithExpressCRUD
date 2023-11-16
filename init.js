// includeing mongoose
const mongoose = require('mongoose');
const Chat = require('./models/chat');

// establishing connection
main().then(() => {
    console.log('Connection is successful');
}).catch(() => {
    console.log('Error in connection')
});

// function to create connection
async function main() {
    await mongoose.connect(`mongodb://127.0.0.1:27017/whatsapp`)
}

// sending demo message
let allChats = [
    {
        from : 'Raju',
        to : 'Rohit',
        message : 'Doodh lana hai'
    },
    {
        from : 'Shyam',
        to : 'Babu Rao',
        message : 'Daal bana'
    },
    {
        from : 'Raju',
        to : 'Shyam',
        message : 'Doodh lana hai'
    },
    {
        from : 'Shyam',
        to : 'Rohit',
        message : 'DJ wale ka num do'
    },
    {
        from : 'Pradeep',
        to : 'Rohit',
        message : 'Ghar jana hai'
    },
    {
        from : 'Raju',
        to : 'Rohit',
        message : 'Doodh lana hai'
    },
    {
        from : 'Raju',
        to : 'Rohit',
        message : 'Doodh lana hai'
    },
    {
        from : 'Raju',
        to : 'Rohit',
        message : 'Doodh lana hai'
    },
    {
        from : 'Raju',
        to : 'Rohit',
        message : 'Doodh lana hai'
    },
    {
        from : 'Raju',
        to : 'Rohit',
        message : 'Doodh lana hai'
    },
];

Chat.insertMany(allChats).then(res=> console.log(res));
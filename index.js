const express = require('express');
const path = require('path');

// including method overrirde
const methodOverride = require('method-override');

// including chat model
const Chat = require('./models/chat.js');

// includeing mongoose
const mongoose = require('mongoose');

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

const port = 8080;
const app = express();

// setting ejs as view engine  
app.set('view engine', 'ejs');

// setting path for view engine
app.set('views', path.join(__dirname, 'views'));

// setting path for pulic folder
app.use(express.static(path.join(__dirname, 'public/css')));

// setting bodyparser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// middleware to use method-override
app.use(methodOverride('_method'));

// route for root /
app.get('/', (req, res) => {
    res.send('Welcome to Home');
})

// getting all chats
app.get('/chats', async (req, res) => {
    let chats = await Chat.find();
    // console.log(chats);
    res.render('index.ejs', { chats });
})

// rendering form to add new chat
app.get('/chats/new', (req, res) => {
    res.render('new.ejs')
});

// receiving new chat data and adding it to DB and redirecting to all chats
app.post('/chats', (req, res) => {
    let { from: msgFrom, message: msg, to: msgTo } = req.body;
    // console.log(msgFrom, msg, msgTo);
    let newChat = new Chat({
        from: msgFrom,
        message: msg,
        to: msgTo
    });
    newChat.save().then((res) => {
        console.log('Data Inserted Successfully');
        // console.log(res);
    }).catch((err) => {
        console.log(err);
    });
    console.log('Outside save')
    res.redirect('/chats');
});

// generating edit form
app.get('/chats/:id/edit', async (req, res) => {
    let { id } = req.params;
    console.log(id);
    let requestedChat = await Chat.findById(`${id}`);
    console.log(requestedChat['_id']);
    res.render('edit.ejs', { requestedChat });

});

// updating chat and redirecting to /chats
app.patch('/chats/:id', async (req, res) => {
    let { id } = req.params;
    let { message: updatedMsg } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(`${id}`, { message: updatedMsg, updated_at: new Date() }, { runValidators: true, new: true });
    res.redirect('/chats');
})

// deleting requested chat
app.delete('/chats/:id', async (req, res) => {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(`${id}`);

    res.redirect('/chats');
})


app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})

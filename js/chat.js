const mongoose = require('mongoose');
const mensajeSchema = require('../DB/mensajeSchema')
const {normalize, schema, denormalize} = require('normalizr')
const util = require('util');

class Chat{
    
    constructor(){
        
    }

    async connectDB(){
        try{
            const URL = 'mongodb+srv://juandavid:azyz9510@cluster0.33nzl.mongodb.net/chat?retryWrites=true&w=majority';
            let connect = await mongoose.connect(URL,{
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        }catch (e){
            console.log(e);
        }
    }
    
    async addMessage(mensaje){
        try{
            await this.connectDB();
            await mensajeSchema.create(mensaje);
            mongoose.disconnect();
            console.log('mensaje guardado con exito');
        }catch (e){
            console.log(`Ha ocurrido el siguiente error: ${e}`);
        }
    }
    
    async readMessages(){
        try{
            await this.connectDB();
            const data = await mensajeSchema.find();
            mongoose.disconnect();
            return data;
        }catch (e){
            console.log(`Ha ocurrido el siguiente error: ${e}`);
        }
    }

    normalizar(chatSinNormalizar){

    // const mensajes2 = {
    //     id: 'mensajes',
    //     mensajes: [
    //       {
    //         author: {
    //           id: 'juandwow@gmail.com',
    //           nombre: 'Juan David',
    //           apellido: 'Pérez Restrepo',
    //           edad: 26,
    //           alias: 'azyz9510',
    //           avatar: 'https://cdn3.iconfinder.com/data/icons/geek-3/24/Assassins_Creed_video_game_action-256.png'
    //         },
    //         _id: "627899173279ddfd93f50f32",
    //         id: '1652070678887',
    //         text: 'Hola',
    //         fyh: '9/5/2022 1:31:18',
    //         __v: 0
    //       },
    //       {
    //         author: {
    //           id: 'antoblazi@gmail.com',
    //           nombre: 'Antonella',
    //           apellido: 'Blazicevic',
    //           edad: 28,
    //           alias: 'azyz9510',
    //           avatar: 'https://cdn3.iconfinder.com/data/icons/geek-3/24/Assassins_Creed_video_game_action-256.png'
    //         },
    //         _id: "627899283279ddfd93f50f36",
    //         id: '1652070695071',
    //         text: 'Oa',
    //         fyh: '9/5/2022 1:31:35',
    //         __v: 0
    //       }
    //     ]
    //   }
    

    const chatId = {id: 'mensajes', mensajes : chatSinNormalizar};
    // console.log(chatId);
        const author = new schema.Entity('author');
        const text = new schema.Entity('text',{
            author : author
        });
        const mensajes = new schema.Entity('mensajes',{
            author: author,
            messages: [text]
        });

        const normalizedChat = normalize(chatId,mensajes)
        console.log(util.inspect(normalizedChat, false, 12, true));
        // return normalizedChat;
        // return util.inspect(normalizedChat, false, 6, true)
    }

}

module.exports = Chat;
import {Server} from "socket.io"
import connection from "./database/db.js"
import {getdocument,updatedocument} from './controller/document-controller.js'
connection();
const PORT= 9000
const io = new Server(PORT, {
    cors: {
        origin: '*',
      }
    // cors: {
    //     origin: "http://localhost:3000/",
    //     methods: ["GET","POST"],
    // }
})

io.on('connection',socket=>{
    socket.on('get-document',async documentId=>{
        
        const document=await getdocument(documentId);
        socket.join(documentId);
        socket.emit('load-document',document.data);
        socket.on('send-changes',delta=>{
           // console.log(delta);
           socket.broadcast.to(documentId).emit('recieve-changes',delta);
        })
        socket.on('save-document',async data=>{
            await updatedocument(documentId,data);
        })
    })
    //console.log('connected');
})
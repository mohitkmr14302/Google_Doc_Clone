import { useEffect, useState } from 'react';
import {Box}from '@mui/material'
import styled from '@emotion/styled';
import Quill from 'quill'
import {io} from 'socket.io-client'
import 'quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
const Component = styled.div`
    background: #F5F5F5
`
const toolbarOptions = [
    // ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    // ['blockquote', 'code-block'],
  
    // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    // [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    // [{ 'direction': 'rtl' }],                         // text direction
  
    // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    // [{ 'font': [] }],
    // [{ 'align': [] }],
  
    // ['clean']                                         // remove formatting button
    [{ 'font': [] }, { 'size': [] }],
    [ 'bold', 'italic', 'underline', 'strike' ],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'script': 'super' }, { 'script': 'sub' }],
    [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block' ],
    [{ 'list': 'ordered' }, { 'list': 'bullet'}, { 'indent': '-1' }, { 'indent': '+1' }],
    [ 'direction', { 'align': [] }],
    [ 'link', 'image', 'video', 'formula' ],
    [ 'clean' ]
  ];

const Editor=()=>{
  const[socket,setsocket] =useState();
  const[quill,setquill]=useState();
  const {id}=useParams();
    useEffect(()=>{
        const quillserver = new Quill('#container',{theme: 'snow', modules: {toolbar: toolbarOptions}});
        quillserver.disable();
        quillserver.setText("Loading the document...");
        setquill(quillserver);
    },[]);

    useEffect(()=>{
       const socketserver = io('http://localhost:9000/');
       setsocket(socketserver);
       return ()=>{
        socketserver.disconnect();
       }
    },[])

    useEffect(()=>{
      if(quill===null || socket===null) return;
      const handlechange = (delta,olddata,source)=>{
        if(source!=='user') return;
        socket && socket.emit('send-changes',delta);

      }
      quill && quill.on('text-change',handlechange);

        return ()=>{
          quill && quill.off('text-change',handlechange);
        }
    
    },[socket,quill]);
    useEffect(()=>{
      if(quill===null || socket===null) return;
      const handlechange = (delta)=>{
       quill.updateContents(delta);

      }
      socket && socket.on('recieve-changes',handlechange);

        return ()=>{
          socket && socket.off('recieve-changes',handlechange);
        }
    
    },[socket,quill]);

    useEffect(()=>{
      if(quill===null || socket===null) return;
      socket && socket.once('load-document',document=>{
       quill && quill.setContents(document);
       quill && quill.enable();
      });
      socket && socket.emit('get-document',id);
    },[quill,socket,id]);

    useEffect(()=>{
      if(quill===null || socket===null) return;
      const interval=setInterval(()=>{ 
        socket && socket.emit('save-document',quill.getContents());
      },2000);

      return ()=>{
        clearInterval(interval);
      }
    },[quill,socket]);
    return(
        <Component>
           <Box className="container" id ="container"></Box> 
         </Component>
    )
}
export default Editor;
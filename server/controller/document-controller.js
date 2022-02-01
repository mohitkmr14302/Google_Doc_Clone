import Document from "../schema/documentschema.js";

export const getdocument =async (id)=> {
    if(id===null) return;
    const document=await Document.findById(id);
    if(document) return document;
    return await Document.create({_id: id,data: ""})
}
export const updatedocument=async(id,data)=>{
    return await Document.findByIdAndUpdate(id,{data});
}
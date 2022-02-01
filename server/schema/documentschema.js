import mongoose from "mongoose";

const documentschema =mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    }
})
const document =mongoose.model('document', documentschema);
export default document; 
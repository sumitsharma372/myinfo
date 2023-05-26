import { Schema,models, model } from "mongoose";

const LanguageSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    logo: {
        type: String,
        required: [true, 'Logo is required']
    }
})

const Language = models.Language || model('Language', LanguageSchema)

export default Language
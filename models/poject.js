import { Schema, models, model } from 'mongoose'

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    languages: [{
        type: Schema.Types.ObjectId,
        ref: 'Language'
    }],
    url: {
        type: String,
    }
})

const Project = models.Project || model('Project', ProjectSchema);

export default Project;
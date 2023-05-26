import { connectToDB } from "@utils/database";
import Project from "@models/poject";

export const GET = async (req, {params}) => {
    try {
        await connectToDB();

        const project = await Project.findById(params.id).populate('languages');
        if (!project) return new Response ({msg: 'Project Not found'}, {status: 404})

        return new Response(JSON.stringify(project), {status: 200})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({msg: "Failed to fetch data"}), {status: 500})
    }
}


export const PATCH = async (req, {params}) => {
    try {
        await connectToDB();

        const project = await Project.findById(params.id);
        if (!project) return new Response ({msg: 'Project Not found'}, {status: 404})

        const {name, description, languages} = await req.json();
        project.name = name;
        project.description = description;
        project.languages = languages;

        await project.save();

        return new Response(JSON.stringify(project), {status: 200})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({msg: "Failed to edit data"}), {status: 500})
    }
}

export const DELETE = async (req, {params}) => {
    try {
        await connectToDB();

        await Project.findByIdAndRemove(params.id);

        return new Response(JSON.stringify({msg: "Project Deleted"}), {status: 200})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({msg: "Failed to delete data"}), {status: 500})
    }
}
import { connectToDB } from "@utils/database";
import Project from "@models/poject";

export const POST = async (req) => {
    const { title, description, languages, selectedFile, url } = await req.json();
    console.log(title, languages);
    try {
        await connectToDB();

        const newProject = new Project({title, description, languages, image: selectedFile, url})
        await newProject.save();

        return new Response(JSON.stringify(newProject), {status: 200})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({msg: 'Failed to create project'}), {status: 500})
    }
}
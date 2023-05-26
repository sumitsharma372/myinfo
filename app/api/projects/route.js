import { connectToDB } from "@utils/database";
import Project from "@models/poject";

export const GET = async (req) => {
    try {
        await connectToDB();

        const projects = await Project.find({}).populate('languages')

        return new Response(JSON.stringify(projects), {status: 200})
    } catch (error) {
        return new Response({msg: 'Failed to fetch data'}, {status: 500})
    }
}
import { connectToDB } from "@utils/database"
import User from "@models/user"


export const GET = async (req, {params}) => {
    try {
        await connectToDB();

        const user = await User.findById(params.id)
        if(!user) new Response('User not found', {status: 404})

        return new Response(JSON.stringify(user), {status: 500})
    } catch (error) {
        return new Response("Failed to fetch data", {status: 500})
    }
}
export const PATCH = async (req, {params}) => {
    const {name, image} = await req.json();

    try {
        // console.log(id, name, image)

        await connectToDB();

        const user = await User.findById(params.id);

        if (!user) new Response({msg: 'user not'}, {status: 404})

        user.name = name;
        user.image = image;

        await user.save();

        return new Response({msg: 'updated'}, {status: 200})
    } catch (error) {
        console.log(error);
        return new Response({msg: 'failed'}, {status: 500})
    }
}

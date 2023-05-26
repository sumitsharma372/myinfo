import { connectToDB } from "@utils/database";
import User from "@models/user";

export const PATCH = async (req) => {
    const {id, name, image} = await req.json();

    try {
        // console.log(id, name, image)

        await connectToDB();

        const user = await User.findById(id);

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
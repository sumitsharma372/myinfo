import { connectToDB } from "@utils/database";
import Language from "@models/language";

export const GET = async(request) => {
    try {
        await connectToDB()

        const languages = await Language.find({})

        return new Response(JSON.stringify(languages), {status: 200})
    } catch (error) {
        return new Response('Failed to fetch data', {status: 500})
    }
}
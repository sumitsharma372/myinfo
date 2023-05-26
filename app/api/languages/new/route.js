import { connectToDB } from "@utils/database"
import Language from "@models/language"

export const POST = async (req) => {
    const { name, selectedFile } = await req.json();
    console.log(name, selectedFile)
    try {
        await connectToDB();

        const newLanguage = new Language({name, logo: selectedFile})

        await newLanguage.save();

        return new Response(JSON.stringify(newLanguage), {status: 200})
    } catch (error) {
        console.log(error);
        return new Response({msg: 'Failed to add language'}, {status: 500})
    }
}
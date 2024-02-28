import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { connect } from "mongoose";

//GET 
export const GET = async (request, {params}) => {

    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');

        if(!prompt) return new Response("Prompt not found", { status: 404});

        return new Response(JSON.stringify(prompt), {
            status:200 
        })
    }
    catch(error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }

}


//Patch
export const Patch = async(request, { params })=> {


    const { prompt, tag} = await request.JSON();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt) return new Response("Prompt not found", { status: 404});

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200})
    }
    catch(error) {
        return new Response("Failed to update all prompts", { status: 500 })
    }
 

} 

//DELETE
export const DELETE = async(request, { params }) => {
    try{
        await connectToDB();

        await Prompt.findByIdAndRemove("Prompt deleted successfully", { status: 200  })


    }
    catch(error) {
        return new Response("Failed to delete prompt", { status: 500});
    }
}

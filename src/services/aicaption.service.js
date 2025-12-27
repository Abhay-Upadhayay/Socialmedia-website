const {GoogleGenAI} = require('@google/genai');
const config = require('../config/config')

module.exports.captionGenrator = async (imageBuffer)=>{
    const ai = new GoogleGenAI({apiKey : config.GEMINI_API_KEY});

    
    imageBuffer = imageBuffer.toString('base64')


    const contents = [
    {
        inlineData: {
        mimeType: "image/jpeg",
        data: imageBuffer,
        },
    },
    { text: `You are a very experienced instagram influencer, and you are trying to come up with a caption for your latest post.

        You always try to come up with something that is both witty and relatable and you want to make sure that your caption 

        is going to get lot of likes and comments.

        You use a lot of emojis in your captions and try to make sure that your captions are going to stand out.

        You always try to write concise way and caption is going to be easy to read and also use some hashtags. 

        Give only single caption for the image and try not to write lengthy and make caption under 50 words.` },
    ];

    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    });
    return response.text;
}


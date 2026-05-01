import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateImage() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: {
        parts: [
          {
            text: `A vibrant, modern digital infographic illustration with a clean, polished style, centered around a large, ornate Arabic letter 'K' (كاف). The letter 'K' itself is designed to form the entrance and main structure of a natural cave, made of rock, stone, moss, and glowing formations. The overall shape of the 'K' frames a complete subterranean cave scene within a rocky mountain range, with stalactites, stalagmites, crystal formations, a flowing river, a small lake, and glowing bioluminescent fungi. Verbatim Arabic text flows clearly around and within the structure of the letter 'K'. In the upper part, the question is presented in clean Arabic script: "تجويف طبيعي سطحي أو جوفي في صخرة أو جبل بعضها داخلي و بعضها سطحي". Below this, inside the cave scene, the answer is visibly integrated: "الإجابة:الكهف". Subtle graphical icons representing geological terms are included. The color palette is rich, with deep greens, blues, browns, oranges, and purples, all with volumetric lighting and modern gradients. All Arabic text is beautifully rendered and legible.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: "1K"
        }
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        const buffer = Buffer.from(base64EncodeString, 'base64');
        const dir = path.join(process.cwd(), 'public', 'images');
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(path.join(dir, 'k_cave.png'), buffer);
        console.log('Image generated successfully!');
      }
    }
  } catch (error) {
    console.error('Error generating image:', error);
  }
}

generateImage();

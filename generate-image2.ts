import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateImage() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `A vibrant, modern digital infographic illustration with a clean, polished style, centered around a large, prominent, stylized Arabic letter 'K' (كاف). The letter 'K' itself is designed to form the structure of a complete natural cave system within a majestic rocky mountain range. The curves and open spaces of the character frame a rich subterranean scene with stalactites, stalagmites, crystal formations, a flowing river, a small lake, bioluminescent fungi, mushrooms, and small figures of explorers with lanterns. Verbatim Arabic text is clearly integrated inside the curves and internal spaces of the letter. In the upper part, the question flows as clean, bold Arabic text along the internal walls: "تجويف طبيعي سطحي أو جوفي في صخرة أو جبل بعضها داخلي و بعضها سطحي". Below this, in the lower part, the answer is visibly integrated: "الإجابة:الكهف". Subtle graphical icons representing geological terms are included within the design. The surrounding landscape features majestic colorful mountains, diverse flora, distant waterfalls, and a vibrant sky, all rendered in rich greens, blues, oranges, purples, and browns, with volumetric lighting and modern gradients. The entire composition has a fresh, immersive feel. All Arabic text is beautifully rendered and perfectly legible, matching the illustration's style. The central focus is the immersive 'ك' cave, with an immersive background. All text is contained within or very close to the 'ك' form. The specific text for the answer is excluded.`,
          },
        ],
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
        fs.writeFileSync(path.join(dir, 'k_cave2.png'), buffer);
        console.log('Image generated successfully!');
      }
    }
  } catch (error) {
    console.error('Error generating image:', error);
  }
}

generateImage();

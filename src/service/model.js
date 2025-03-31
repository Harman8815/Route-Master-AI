import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: "Plan a detailed, day-wise travel itinerary for **{{destination}}** over **{{days}} days** with a **{{budget}}** budget, tailored for **{{travelType}}** travel, including accommodation, activities, dining, transportation, estimated costs, and local tips. Suggest places with proper names, addresses, and add relevant data like proximity to beaches or hills.",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [
    ],
    responseMimeType: "application/json",
    responseSchema: {
      type: "object",
      properties: {
        response: {
          type: "object",
          properties: {
            hotels: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: {
                    type: "string"
                  },
                  address: {
                    type: "string"
                  },
                  price_per_night: {
                    type: "number"
                  },
                  review: {
                    type: "number"
                  }
                }
              }
            },
            days: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  day: {
                    type: "integer"
                  },
                  title: {
                    type: "string"
                  },
                  activities: {
                    type: "array",
                    items: {
                      type: "string"
                    }
                  },
                  meal_suggestions: {
                    type: "array",
                    items: {
                      type: "string"
                    }
                  },
                  travel_tips: {
                    type: "array",
                    items: {
                      type: "string"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
  };

// ✅ Use ES module export syntax
export const generateTripItinerary = async (destination, days, budget, travelType) => {
    const prompt = `Plan a detailed, day-wise travel itinerary for **${destination}** over **${days} days** with a **${budget}** budget, tailored for **${travelType}** travel, including accommodation, activities, dining, transportation, estimated costs, and local tips.`;

    try {
        const chatSession = model.startChat({ generationConfig });
        const result = await chatSession.sendMessage(prompt);

        // ✅ Return the generated itinerary
        return result.response.text();

    } catch (error) {
        console.error("Error generating itinerary:", error);
        throw error;
    }
};

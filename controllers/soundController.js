const axios = require("axios");
const fs = require("fs");
const path = require("path");

async function getSpeechDescription(message, productId) {
  try {
    const fetchSpeechDescription = async (message) => {
      const urlPath = `https://api.aiforthai.in.th/vaja9/synth_audiovisual`;
      const apiKey = "ruBZK9SmwaZ2J6SgSiWEoNO0KlufhPSi";
      const headers = {
        Apikey: apiKey,
        "Content-Type": "application/json",
      };
      const bodyData = {
        input_text: message,
        speaker: 1,
        phrase_break: 0,
        audiovisual: 0,
      };
      const result = await axios.post(urlPath, bodyData, {
        headers: headers,
      });
      return result.data.wav_url;
    };
    const wav_url = await fetchSpeechDescription(message);

    const fetchSound = async (wav_url, productId) => {
      const apiKey = "ruBZK9SmwaZ2J6SgSiWEoNO0KlufhPSi";
      const headers = {
        Apikey: apiKey,
      };
      const resp = await axios.get(wav_url, {
        headers: headers,
        responseType: "arraybuffer",
      });
      const location = "/sound";
      const soundLocation = path.join(process.cwd(), location);
      if (resp.status === 200) {
        const writeFile = fs.writeFileSync;
        writeFile(`${soundLocation}/${productId}.wav`, resp.data, "binary");
      }
    };
    await fetchSound(wav_url, productId);
  } catch (err) {
    console.error(err);
  }
}

const createSound = async (req, res) => {
  try {
    const {description, id} = req.body
    await getSpeechDescription(description,id)
    res.status(200)
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createSound,
};

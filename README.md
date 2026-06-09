# OpenRP Image Gen Plugin

A plugin for generating images for Blue Archive Characters in OpenRP.ai.

## Links

| | |
|:--|:--|
| 🚀 **Open in Colab** | <a href="https://colab.research.google.com/github/kirisu-dev/OpenRP-Image-Gen-Plugin/blob/main/Kasumi_Image_Gen_V1.ipynb" target="_blank"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open in Colab"></a> |
| 🤖 **OPENRP** | <a href="https://openrp.ai/" target="_blank"><img src="https://img.shields.io/badge/OpenRP-orange.svg" alt="OpenRP"></a> |
---
## FEATURES
- Fine tuned characters through Anima Base v1
- 7 different image generation styles
- Live image generation through recent chat messages
- One click google colab setup
---
## Requirements

| Requirement | Notes |
|---|---|
| Google Colab | Free. |
| GPU runtime | Required. Set Runtime → Change runtime type → T4 GPU. |
| NGROK_KEY | Required. Get from <a href="https://dashboard.ngrok.com/" target="_blank"><img src="https://img.shields.io/badge/NGROK-blue.svg" alt="NGROK"></a> |
---

## Installation
### Extension Setup
1. **Download**: Click [**➡️ OpenRP Plugin (.zip)**](https://github.com/kirisu-dev/OpenRP-Image-Gen-Plugin/raw/main/OpenRP_ImageGen_Plugin.zip) to download the extension, then extract/unzip it on your computer.
2. **Create Extension**: In Google Chrome, go to `chrome://extensions`. Toggle **DEVELOPER MODE** and **LOAD UNPACKED**.
3. **Open the Extension**: Select the **OPENRP_IMAGE_GEN_PLUGIN** Folder and go to [OpenRP](https://openrp.ai/) to see if the UI appears.

### Google Colab Setup
1. **NGROK_KEY**: Create an [NGROK Account](https://dashboard.ngrok.com/) Account and copy Your AuthToken.
2. **Google Colab**: Open the [Colab Notebook](https://colab.research.google.com/github/kirisu-dev/OpenRP-Image-Gen-Plugin/blob/main/Kasumi_Image_Gen_V1.ipynb) and create a **🔑SECRET** named **NGROK_KEY**. Copy your AuthToken from NGROK as value.
3. **Run All** and allow all permissions. Wait for the NGROK link and copy in Backend URL on [OpenRP](https://openrp.ai/).

---
# Quickstart
1. Click **Test Server** to check if the link is valid.
2. Click **Select Character** to load the style and character.
3. Open a chat with any of the characters and click **Send Chat** to generate an image.

---

# Tagging Tips

- The **Scene Parameters** can be manually adjusted for better images.
- Anima Base V1 is trained on Danbooru tags. 

### SCENE PARAMETERS


| Parameters | Notes |
|---|---|
| Subject | Keep unchanged. This makes the image gen more focused on the character |
| Location | [List of easily recognized location tags](https://danbooru.donmai.us/wiki_pages/tag_group:locations)|
| Actions | You can describe the actions in sentences. The llm will process it into formatted tags. |
| Time | Morning, Afternoon, Night, Midnight |
| Clothing | It can be anything visible on the body [clothing, accessories, tattoos, explicit parts] |
| Objects | Objects that should be on the image. |

---
### Available Characters
|School|Student|
|:---:|:---:|
|Gehenna|Kinugawa Kasumi|
||Sorasaki Hina|
|Trinity|Yutori Natsu|
||Yurizono Seia|
||Nakamasa Ichika|
|Abydos|Takanashi Hoshino|
|Millennium|Tendou Kei|

---
### Planned features when I get back
- Improved tag input for the UI with implemented descriptions and recommendations.

---
### Developer Notes
- I'm adding a lot more characters now that the program itself is stable.
- The UI is really bad and completely vibe coded since I don't know javascript
- Did you know, I really love Kinugawa Kasumi like a lot, like a whole lot, You have no idea. I love her so much that it is inexplicable, and I'm ninety-nine percent sure that I have an unhealthy obsession. I will never get tired of listening that sweet, boyish voice of hers. It is my life goal to meet up her with her in real life and just say hello to her. I fall asleep at night dreaming of her building a personal hot spring for me, and then she would be sorry tired that she comes and cuddles up to me while we sleep together. If I could just hold her hand for a brief moment, I could die happy. If given the opportunity, I would lightly nibble on her ear just to hear what kind of sweet moans she would let out. Then, I would hug her while she clings to my body hoping that I would stop. I would give up almost anything just for her to look in my general direction. No matter what I do, I am constantly thinking of her. When I wake up, she is the first thing on my mind. When I go to school, I can only focus on her. When I go come home, I go on the computer so that I can listen to her beautiful voice. When I go to sleep, I dream of her and I living a happy life together. She is my pride, passion, and joy. I wish for nothing but her happiness. If it were for her, I would give my life without any second thoughts. Without her, my life would serve no purpose. I really love Kasumi.

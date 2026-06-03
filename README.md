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
1. **Download**: Click [**➡️ OpenRP Plugin (.zip)**](https://github.com/kirisu-dev/OpenRP-Image-Gen-Plugin/blob/main/OpenRP_ImageGen_Plugin.zip) to download the extension, then extract/unzip it on your computer.
2. **Create Extension**: In Google Chrome, go to `chrome://extensions`. Toggle **DEVELOPER MODE** and **LOAD UNPACKED**.
3. **Open the Extension**: Select the **OPENRP_IMAGE_GEN_PLUGIN** Folder and go to [OpenRP](https://openrp.ai/) to see if the UI appears.

### Google Colab Setup
1. **NGROK_KEY**: Create an [NGROK Account](https://dashboard.ngrok.com/) Account and copy Your AuthToken.
2. **Google Colab**: Open the [Colab Notebook](https://colab.research.google.com/github/kirisu-dev/OpenRP-Image-Gen-Plugin/blob/main/Kasumi_Image_Gen_V1.ipynb) and create a **🔑SECRET** named **NGROK_KEY**. Copy your AuthToken from NGROK as value.
3. **Run All** and allow all permissions. Wait for the NGROK link and copy in Backend URL on [OpenRP](https://openrp.ai/).

---
#Quickstart
1. Click **Test Server** to check if the link is valid.
2. Click **Select Character** to load the style and character. [Available Characters: Kasumi, Natsu, Kei]
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


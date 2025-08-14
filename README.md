# Using Ollama Qwen 2.1 Model for Hindi → English Translation via API

## Overview

This guide explains how to integrate the Qwen 2.1 model (via Ollama) to automatically translate Hindi text entered into a chatbot into English.

The setup allows your chatbot to:

-   Detect if the input is in Hindi.
-   Send the text to Ollama using Qwen for translation.
-   Return the English-translated text for further chatbot processing.

---

### 1. Prerequisites

-   **Ollama installed on your machine:**
    -   [Download Ollama](https://ollama.com/download)
-   **Qwen model pulled via Ollama:**
    ```powershell
    ollama pull qwen2:1.5b
    ```
-   **Backend environment** (Python, Node.js, or other) capable of sending HTTP requests.
-   **Internet connection** for initial model download.

---

### 2. Allow API Calls from Chatbot

If your chatbot runs on `http://localhost:3000`, you need to allow cross-origin requests in Ollama. Run this command in your terminal *before* starting Ollama.

```powershell
$env:OLLAMA_ORIGINS="http://localhost:3000"
---

### 3. Manual Translation Test

You can test the Qwen model's translation capability directly in your terminal:

```powershell
ollama run qwen2:1.5b

---

### 4. Using Ollama API for Translation

Ollama runs a local API server at `http://localhost:11434` that you can use for programmatic translation.

#### POST Request Example

-   **Endpoint**: `/api/generate`
-   **Method**: `POST`


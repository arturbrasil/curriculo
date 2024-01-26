from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from transformers import Wav2Vec2Processor, Wav2Vec2ForCTC
import torchaudio
import torch
import os

app = FastAPI()

os.makedirs("temp", exist_ok=True)

# Carregando o modelo Wav2Vec2 pré-treinado e o processor
processor_asr = Wav2Vec2Processor.from_pretrained("openai/whisper-large")
modelo_asr = Wav2Vec2ForCTC.from_pretrained("openai/whisper-large")

@app.post("/asr")
async def transcrever_audio(file: UploadFile = File(...)):
    try:
        caminho_temporario = f"temp/{file.filename}"
        with open(caminho_temporario, "wb") as buffer:
            buffer.write(file.file.read())

        waveform, sample_rate = torchaudio.load(caminho_temporario)

        with torch.no_grad():
            input_values = processor_asr(waveform.squeeze().numpy(), return_tensors="pt").input_values
            logits = modelo_asr(input_values).logits
            transcription = processor_asr.batch_decode(logits.argmax(dim=-1))[0]

        os.remove(caminho_temporario)

        return JSONResponse(content={"transcricao": transcription}, status_code=200)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro durante o processamento: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)


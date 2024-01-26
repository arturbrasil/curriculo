from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from transformers import AutoTokenizer, Wav2Vec2ForCTC
import torchaudio
import torch
import os

app = FastAPI()

os.makedirs("temp", exist_ok=True)

# Carregando o modelo Wav2Vec2 pré-treinado e o tokenizer
model_name = 'Edresson/wav2vec2-large-xlsr-coraa-portuguese'
tokenizer = AutoTokenizer.from_pretrained(model_name)
modelo_asr = Wav2Vec2ForCTC.from_pretrained(model_name)

@app.post("/asr")
async def transcrever_audio(file: UploadFile = File(...)):
    try:
        caminho_temporario = f"temp/{file.filename}"
        with open(caminho_temporario, "wb") as buffer:
            buffer.write(file.file.read())

        # Carrega o áudio usando torchaudio
        waveform, sample_rate = torchaudio.load(caminho_temporario)

        # Pré-processamento usando o tokenizer do modelo Wav2Vec2
        input_values = tokenizer(waveform.squeeze().numpy(), return_tensors="pt", padding="longest").input_values

        # Inferência do modelo
        with torch.no_grad():
            logits = modelo_asr(input_values).logits
            transcription = tokenizer.batch_decode(logits.argmax(dim=-1))[0]

        os.remove(caminho_temporario)

        return JSONResponse(content={"transcricao": transcription, "taxa_amostragem": sample_rate}, status_code=200)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro durante o processamento: {str(e)}")

# Imports e dependências do ambiente de preparação
# ...

# Teste contra Common Voice (Domínio)
# ...

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

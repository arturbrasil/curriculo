from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from transformers import AutoTokenizer, Wav2Vec2ForCTC
import torchaudio
import torch
import os
from datasets import load_dataset, load_metric

app = FastAPI()

os.makedirs("temp", exist_ok=True)

# Carregando o modelo Wav2Vec2 pré-treinado e o tokenizer
model_name = 'Edresson/wav2vec2-large-xlsr-coraa-portuguese'
tokenizer = AutoTokenizer.from_pretrained(model_name)
modelo_asr = Wav2Vec2ForCTC.from_pretrained(model_name)

# Definindo o conjunto de dados de teste do Common Voice
dataset = load_dataset("common_voice", "pt", split="test", data_dir="./cv-corpus-6.1-2020-12-11")

# Função para resample e pré-processar os dados
def map_to_array(batch):
    resampler = torchaudio.transforms.Resample(orig_freq=48_000, new_freq=16_000)
    speech, _ = torchaudio.load(batch["path"])
    batch["speech"] = resampler.forward(speech.squeeze(0)).numpy()
    batch["sampling_rate"] = resampler.new_freq
    batch["sentence"] = re.sub(chars_to_ignore_regex, '', batch["sentence"]).lower().replace("â€™", "'")
    return batch

# Mapeando as transformações para o conjunto de dados
ds = dataset.map(map_to_array)

# Realizando inferência usando o modelo Wav2Vec2
result = ds.map(map_to_pred, batched=True, batch_size=1, remove_columns=list(ds.features.keys()))

# Calculando a métrica WER
wer_metric = load_metric("wer")
wer_result = wer_metric.compute(predictions=result["predicted"], references=result["target"])
print(f"Word Error Rate (WER): {wer_result}")

# Código do FastAPI
# ...

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

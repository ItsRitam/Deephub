# DeepHub – Deepfake Image and Video Detection System

**DeepHub** is a full-stack deepfake detection platform designed to identify manipulated images and videos using a **CNN-based hybrid deep learning model**.

The system combines spatial, temporal, and frequency-domain analysis to detect inconsistencies and manipulation artifacts in digital media. It provides an intuitive web interface where users can upload images or videos and receive detection results along with prediction confidence scores.

## Detection Approach

* **Spatial Analysis** – Uses CNN-based feature extraction to identify visual and facial inconsistencies in individual frames.
* **Temporal Analysis** – Uses LSTM/GRU-based analysis to detect inconsistencies across consecutive video frames.
* **Frequency Analysis** – Combines FFT with CNN-based analysis to identify frequency-domain artifacts introduced during deepfake generation.
* **Hybrid Classification** – Features obtained from multiple analysis branches are combined to generate the final deepfake prediction.

## Tech Stack

**Frontend:** React.js, JavaScript, Vite
**Backend:** Python, REST API
**Machine Learning:** CNN, LSTM/GRU, FFT
**Image & Video Processing:** OpenCV

---

## Live Deployment

### Frontend

```
https://deephub-frontend.vercel.app/
```

### Backend

```
https://deephub-api.wonderfulplant-dffbac5d.centralindia.azurecontainerapps.io
```

---

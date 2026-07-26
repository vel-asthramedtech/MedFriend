# FastAPI Setup Guide

## Prerequisites

- Python 3.10 or later
- pip

---

# macOS / Linux

## 1. Create a Virtual Environment

```bash
python3 -m venv venv
```

## 2. Activate the Virtual Environment

```bash
source venv/bin/activate
```

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

## 4. Run the FastAPI Application

```bash
python main.py
```

The API will be available at:

- API: http://127.0.0.1:8000
- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc

---

# Windows (Command Prompt)

## 1. Create a Virtual Environment

```cmd
python -m venv venv
```

## 2. Activate the Virtual Environment

```cmd
venv\Scripts\activate
```

## 3. Install Dependencies

```cmd
pip install -r requirements.txt
```

## 4. Run the FastAPI Application

```cmd
uvicorn app.main:app --reload
```

The API will be available at:

- API: http://127.0.0.1:8000
- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc

---

# Windows (PowerShell)

## 1. Create a Virtual Environment

```powershell
python -m venv venv
```

## 2. Activate the Virtual Environment

```powershell
.\venv\Scripts\Activate.ps1
```

> If PowerShell blocks script execution, run:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then activate the environment again:

```powershell
.\venv\Scripts\Activate.ps1
```

## 3. Install Dependencies

```powershell
pip install -r requirements.txt
```

## 4. Run the FastAPI Application

```powershell
python main.py
```

The API will be available at:

- API: http://127.0.0.1:8000
- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc
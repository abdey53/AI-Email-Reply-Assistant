FROM python:3.11-slim

# work directory
WORKDIR /app

# dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# project files
COPY . .

# expose django port
EXPOSE 8000

# run server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

import './App.css';
import { useState } from "react";
import axios from "axios";
import { FaGithub, FaLinkedin, FaClipboard, FaEnvelope } from 'react-icons/fa';


function App() {
  const [emailText, setEmailText] = useState("");
  const [tone, setTone] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

const generateReply = async () => {
  if (!emailText || !tone) {
    alert("Please enter email content and select a tone!");
    return;
  }

  setLoading(true);
  try {
    const res = await axios.post(
      "https://ai-email-reply-assistant-2.onrender.com/api/generate-reply/",
      {
        email_text: emailText,
        tone: tone,
      },
       {
    headers: {
      "Content-Type": "application/json",
    },
  }
    );

    setReply(res.data.reply);
  } catch (err) {
    console.error(err);
    alert("Error generating reply");
  } finally {
    setLoading(false);
  }
};


  const copyReply = () => {
    if (reply) {
      navigator.clipboard.writeText(reply);
      alert("Copied to clipboard!");
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>AI Email Reply Assistant</h1>
        <p>Generate professional email responses with ease of AI</p>
        <div className="social-icons">
          <a href="https://www.linkedin.com/in/abdey-ali/" target="_blank" rel="noreferrer"><FaLinkedin /></a>
          <a href="https://github.com/abdey53" target="_blank" rel="noreferrer"><FaGithub /></a>
      <a
  href="mailto:abdeali535353@gmail.com"
  title="Email"
  className="email-icon"
>
  <FaEnvelope />
</a>
        </div>
      </header>

      {/* Side-by-side panels */}
      <div className="main-panels">
        {/* Left: Compose */}
        <div className="panel compose-panel">
          <h2>Compose Your Response</h2>
          
          <label>Email Content</label>
          <textarea
            placeholder="Paste the original email content here..."
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
          />
          <label>Response Tone</label>
          <select value={tone} onChange={(e) => setTone(e.target.value)}>
            <option value="">Choose a tone...</option>
            <option value="professional">Professional</option>
            <option value="friendly">Friendly</option>
            <option value="formal">Formal</option>
          </select>
          <button onClick={generateReply}>
            {loading ? "Generating..." : "Generate AI Response"}
          </button>
        </div>

        {/* Right: Generated Reply */}
        <div className="panel reply-panel">
          <h2>Generated Response</h2>
          <div className="reply-box">
            {reply ? <p>{reply}</p> : <p>Your AI-generated email response will appear here...</p>}
          </div>
          {reply && (
            <button className="copy-btn" onClick={copyReply}>
              <FaClipboard /> Copy
            </button>
          )}
        </div>
      </div>

<div class="accordion about-accordion" id="aboutAccordion">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
        aria-expanded="true" aria-controls="collapseOne">
        About This Project
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
      data-bs-parent="#aboutAccordion">
      <div class="accordion-body">
        AI Email Reply Assistant uses OpenAI’s GPT models to automatically read emails and generate intelligent, context-aware replies. 
        Users can choose a tone—professional, friendly, or formal—to personalize the response. 
        Built with a React frontend and Django REST backend, it delivers fast, accurate, and AI-powered email responses.
        <div class="tech-stack">
          <span class="tech-tag">OpenAI</span>
          <span class="tech-tag">Django</span>
          <span class="tech-tag">React.js</span>
          <span class="tech-tag">REST API</span>
          <span class="tech-tag">Docker</span>
          <span class="tech-tag">Bootstrap</span>
          <span class="tech-tag">Render</span>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Footer */}
      <div class='container mb-4'>
<footer className="dev-footer">
  <h2 className="dev-title">Developer – Abdey Ali</h2>

  <p className="dev-desc">
    This project demonstrates a full-stack AI application using OpenAI,
    Django REST Framework, and React. The backend exposes secure REST APIs
    for AI-powered email generation, while the frontend focuses on clean,
    responsive UI and real-world deployment practices.
  </p>

  <div className="dev-cards">
    <div className="dev-card">
      <h4>Focus</h4>
      <p>Full-Stack Development</p>
    </div>

    <div className="dev-card">
      <h4>Tech Stack</h4>
      <p>OpenAI · React · Django · DRF · Docker · Bootstrap</p>
    </div>

    <div className="dev-card">
      <h4>Deployment</h4>
      <p>Render · GitHub Pages</p>
    </div>
  </div>

  <p className="dev-copy">
    © 2026 AI Email Reply Assistant · Built by Abdey Ali
  </p>
</footer>
</div>
    </div>
  );
}

export default App;

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
      const res = await axios.post("https://ai-email-reply-assistant-2.onrender.com/api/generate-reply/", {
        email_text: emailText,
        tone: tone,
      });
      setReply(res.data.reply);
    } catch (err) {
      alert("Error generating reply");
    }
    setLoading(false);
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

      {/* Footer */}
      <footer className="footer">
        <p>Made with ❤️ by Abdey Ali</p>
        <div className="footer-icons">
          <a href="https://github.com/abdey53" target="_blank" rel="noreferrer"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/abdey-ali/" target="_blank" rel="noreferrer"><FaLinkedin /></a>
          <a
  href="mailto:abdeali535353@gmail.com"
  title="Email"
  className="email-icon"
>
  <FaEnvelope />
</a>
        </div>
      </footer>
    </div>
  );
}

export default App;

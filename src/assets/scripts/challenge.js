const questions = [
  {
    question: "¿Qué es un firewall?",
    answers: [
      { text: "Un muro físico de seguridad", correct: false },
      { text: "Un sistema que protege redes", correct: true },
      { text: "Un antivirus avanzado", correct: false },
    ],
  },
  {
    question: "¿Qué práctica es segura al crear contraseñas?",
    answers: [
      { text: "Usar '123456'", correct: false },
      { text: "Incluir mayúsculas, números y símbolos", correct: true },
      { text: "Reutilizar contraseñas", correct: false },
    ],
  },
  {
    question: "¿Qué significa HTTPS?",
    answers: [
      { text: "Hypertext Transfer Protocol Secure", correct: true },
      { text: "Hypertext Transfer Plaintext", correct: false },
      { text: "Protocol seguro para bases de datos", correct: false },
    ],
  },
  {
    question: "¿Qué herramienta detecta vulnerabilidades?",
    answers: [
      { text: "Wireshark", correct: false },
      { text: "Nmap", correct: true },
      { text: "Ping", correct: false },
    ],
  },
  {
    question: "¿Qué es el phishing?",
    answers: [
      {
        text: "Un ataque que roba información personal simulando ser una entidad confiable",
        correct: true,
      },
      { text: "Un método para bloquear ataques DDoS", correct: false },
      { text: "Una técnica para proteger redes inalámbricas", correct: false },
    ],
  },
  {
    question: "¿Qué herramienta se utiliza para capturar paquetes en una red?",
    answers: [
      { text: "Wireshark", correct: true },
      { text: "Nmap", correct: false },
      { text: "Metasploit", correct: false },
    ],
  },
  {
    question: "¿Qué significa el término 'ransomware'?",
    answers: [
      {
        text: "Un tipo de malware que bloquea los datos y exige un rescate",
        correct: true,
      },
      {
        text: "Un virus que destruye información automáticamente",
        correct: false,
      },
      {
        text: "Un software diseñado para analizar vulnerabilidades",
        correct: false,
      },
    ],
  },
  {
    question: "¿Cuál es el objetivo de una VPN?",
    answers: [
      {
        text: "Crear una conexión segura y privada a través de una red pública",
        correct: true,
      },
      { text: "Detectar amenazas de malware", correct: false },
      { text: "Proteger únicamente dispositivos móviles", correct: false },
    ],
  },
  {
    question: "¿Qué técnica se utiliza para encriptar datos?",
    answers: [
      { text: "Cifrado AES", correct: true },
      { text: "Inyección SQL", correct: false },
      { text: "Escaneo de puertos", correct: false },
    ],
  },
  {
    question: "¿Qué es un certificado SSL?",
    answers: [
      {
        text: "Un protocolo de seguridad que autentica la identidad de un sitio web",
        correct: true,
      },
      {
        text: "Una clave para realizar ataques de fuerza bruta",
        correct: false,
      },
      { text: "Un documento que bloquea intentos de phishing", correct: false },
    ],
  },
];

let score = 0;
let questionIndex = 0;
let progressInterval;
const challenge = document.getElementById("challenge");

function startChallenge() {
  score = 0;
  questionIndex = 0;
  showQuestion();
}

function showQuestion() {
  clearInterval(progressInterval); // Limpia cualquier intervalo previo
  const question = questions[questionIndex];
  challenge.innerHTML = `
    <span class="badge bg-primary fs-5 float-end">${questionIndex + 1} / ${
    questions.length
  }</span>  
    <p class="question">${question.question}</p>
    <div class="answers">
    </div>
    <div class="progress mb-3 my-3">
      <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%;" id="progressBar"></div>
    </div>
    `;

  const answersContainer = challenge.querySelector(".answers");
  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.className = "btn btn-outline-primary w-100";
    button.addEventListener("click", () => selectAnswer(index));
    answersContainer.appendChild(button);
  });
  startProgress();
}

function startProgress() {
  const progressBar = document.getElementById("progressBar");
  let progress = 0;
  const duration = 10000; // 10 segundos
  const step = 100 / (duration / 100); // Incremento por cada intervalo
  progressInterval = setInterval(() => {
    progress += step;
    progressBar.style.width = `${progress}%`;
    if (progress >= 100) {
      clearInterval(progressInterval);
      nextQuestion(); // Pasa automáticamente a la siguiente pregunta
    }
  }, 100);
}

function selectAnswer(answerIndex) {
  const question = questions[questionIndex];
  const isCorrect = question.answers[answerIndex].correct;

  if (isCorrect) {
    score++;
  }

  nextQuestion();
}

function nextQuestion() {
  questionIndex++;

  if (questionIndex < questions.length) {
    showQuestion(questionIndex);
  } else {
    endChallenge();
  }
}

function endChallenge() {
  challenge.innerHTML = `
        <p class="question">¡Reto terminado!</p>
        <p class="text-success">Puntuación: ${score} de ${questions.length}</p>
    `;
  const button = document.createElement("button");
  button.textContent = "Volver a empezar";
  button.className = "btn btn-outline-primary w-100";
  button.addEventListener("click", () => startChallenge());
  challenge.appendChild(button);
}

document.getElementById("start").addEventListener("click", startChallenge);

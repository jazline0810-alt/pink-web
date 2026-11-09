

  const quizQuestions = [
    {
      question: "1. What is the main purpose of Microsoft PowerPoint?",
      options: ["To create slide presentations", "To calculate spreadsheet formulas", "To manage email messages", "To write long documents"],
      correct: 0
    },
    {
      question: "2. What is a slide layout in PowerPoint?",
      options: ["A transition between slides", "An arrangement of placeholders on a slide", "A saved copy of a presentation", "An animation applied to text"],
      correct: 1
    },
    {
      question: "3. Which PowerPoint view is best for presenting slides to an audience?",
      options: ["Normal View", "Slide Sorter View", "Slide Show View", "Notes Page View"],
      correct: 2
    },
    {
      question: "4. Which view displays slide thumbnails so you can easily rearrange the order of slides?",
      options: ["Reading View", "Slide Show View", "Notes Page View", "Slide Sorter View"],
      correct: 3
    },
    {
      question: "5. Which command adds a new slide to a presentation?",
      options: ["New Slide", "New Window", "New Comment", "New Animation"],
      correct: 0
    },
    {
      question: "6. Which command lets you place words or sentences on a slide in a text box?",
      options: ["Insert Chart", "Text Box", "Insert Audio", "Slide Transition"],
      correct: 1
    },
    {
      question: "7. Which PowerPoint feature allows you to add a picture from your device to a slide?",
      options: ["Slide Number", "Font Color", "Insert Pictures", "Paragraph Spacing"],
      correct: 2
    },
    {
      question: "8. What is the purpose of shapes in PowerPoint?",
      options: ["To check spelling automatically", "To change the order of slides", "To save a presentation as a file", "To add visual elements such as arrows and rectangles"],
      correct: 3
    },
    {
      question: "9. True or False: In PowerPoint, you can change the layout of a slide after creating it.",
      options: ["True", "False"],
      correct: 0
    },
    {
      question: "10. True or False: Cropping a picture in PowerPoint is used to change the font size of the text on a slide.",
      options: ["True", "False"],
      correct: 1
    }
  ];

  function loadQuiz() {
    const container = document.getElementById("questionsContainer");
    if (!container) return;
    container.innerHTML = "";

    quizQuestions.forEach((q, qIndex) => {
      const questionDiv = document.createElement("div");
      questionDiv.className = "question-block";

      let optionsHTML = "";
      q.options.forEach((opt, oIndex) => {
        const letter = String.fromCharCode(65 + oIndex);
        optionsHTML += `
          <li>
            <label class="quiz-option-label">
              <input type="radio" name="question_${qIndex}" value="${oIndex}">
              <span>${letter}. ${opt}</span>
            </label>
          </li>
        `;
      });

      questionDiv.innerHTML = `
        <p style="color: #3b82f6; font-weight: bold; margin-bottom: 15px;">${q.question}</p>
        <ul style="list-style: none; margin-left: 0; padding-left: 0;">
          ${optionsHTML}
        </ul>
      `;

      container.appendChild(questionDiv);
    });
  }

  function submitQuiz() {
    const errorMsg = document.getElementById("errorMessage");
    let totalScore = 0;
    let missingAnswer = false;

    for (let i = 0; i < quizQuestions.length; i++) {
      const selected = document.querySelector(`input[name="question_${i}"]:checked`);
      if (!selected) {
        missingAnswer = true;
        break;
      }
    }

    if (missingAnswer) {
      errorMsg.style.display = "block";
      errorMsg.textContent = "⚠️ Pakiusap sagutan ang lahat ng tanong bago mag-submit!";
      return;
    }

    errorMsg.style.display = "none";

    let detailedHTML = "";
    quizQuestions.forEach((q, index) => {
      const selected = document.querySelector(`input[name="question_${index}"]:checked`);
      const userAns = parseInt(selected.value);
      const isCorrect = userAns === q.correct;

      if (isCorrect) {
        totalScore++;
        detailedHTML += `<p style="margin-bottom: 8px; color: #4ade80;">Question ${index + 1}: <strong>Tama (Correct)</strong></p>`;
      } else {
        detailedHTML += `<p style="margin-bottom: 8px; color: #f87171;">Question ${index + 1}: <strong>Mali (Incorrect)</strong></p>`;
      }
    });

    // Itago ang form at ipakita ang resulta
    document.getElementById("quizForm").style.display = "none";
    const resultContainer = document.getElementById("resultContainer");
    document.getElementById("totalScoreText").textContent = `Your Total Score: ${totalScore} / ${quizQuestions.length}`;
    document.getElementById("detailedResults").innerHTML = detailedHTML;

    resultContainer.style.display = "block";

    // 🔽 AUTO-SCROLL PAPUNTA SA RESULTA
    resultContainer.scrollIntoView({ behavior: 'smooth' });
  }

  function resetQuiz() {
    document.getElementById("quizForm").reset();
    document.getElementById("quizForm").style.display = "block";
    document.getElementById("resultContainer").style.display = "none";
    document.getElementById("errorMessage").style.display = "none";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.addEventListener("DOMContentLoaded", loadQuiz);

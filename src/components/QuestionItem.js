import React from "react";

const BASE_URL = "http://localhost:4000/questions";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  /* ── PATCH correctIndex ── */
  function handleChange(e) {
    const newIndex = parseInt(e.target.value);

    fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: newIndex }),
    })
      .then((r) => r.json())
      .then(onUpdateQuestion);
  }

  /* ── DELETE question ── */
  function handleDelete() {
    fetch(`${BASE_URL}/${id}`, { method: "DELETE" }).then(() =>
      onDeleteQuestion(id)
    );
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>

      <label>
        Correct Answer:&nbsp;
        <select value={correctIndex} onChange={handleChange}>
          {answers.map((ans, idx) => (
            <option key={idx} value={idx}>
              {ans}
            </option>
          ))}
        </select>
      </label>

      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;

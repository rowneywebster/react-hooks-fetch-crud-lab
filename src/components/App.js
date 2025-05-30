import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

const BASE_URL = "http://localhost:4000/questions";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  /* ───────────────────────────────
      GET  /questions   (on mount)
  ─────────────────────────────── */
  useEffect(() => {
    fetch(BASE_URL)
      .then((r) => r.json())
      .then(setQuestions)
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);

  /* ── callbacks handed to children ── */
  function handleAddQuestion(newQuestion) {
    setQuestions((qs) => [...qs, newQuestion]);
  }

  function handleDeleteQuestion(id) {
    setQuestions((qs) => qs.filter((q) => q.id !== id));
  }

  function handleUpdateQuestion(updatedQuestion) {
    setQuestions((qs) =>
      qs.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;

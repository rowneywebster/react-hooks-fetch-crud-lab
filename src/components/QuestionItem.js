import React from "react";

function QuestionItem({ question,handleDeleted }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
function deleteQ(){
  fetch(`http://localhost:4000/questions/${id}`,{
    method: "DELETE",
  })
  .then(r=>r.json())
  .then(()=>handleDeleted(id))

  console.log('delete' , id)
}
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={deleteQ}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;

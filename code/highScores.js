const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
  .map(score => {
      //li stands for list/ bullet points
      //take incoming object scores and return other array 
    return `<li class="high-score">${score.name} ${score.score}</li>`;
  })
  .join(""); //join all elements in an array 
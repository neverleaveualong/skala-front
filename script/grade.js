function calculateGrade() {

  var subjects = ["HTML", "CSS", "JavaScript"];
  var total = 0;
  
  for (var i = 0; i < subjects.length; i++) {
    var scoreInput = prompt(subjects[i] + " 점수를 입력하세요.");
    
    if (scoreInput === null) {
      alert("성적 입력을 취소하였습니다.");
      return; 
    }
    
    var score = parseInt(scoreInput);
    
    if (isNaN(score) || score < 0 || score > 100) {
      alert("0부터 100 사이의 올바른 숫자를 입력해주세요!");
      i--; 
      continue;
    }
    
    total += score;
  }
  
  var average = Math.round((total / subjects.length) * 10) / 10;
  var result = average >= 60 ? "합격" : "불합격";
  
  alert("총점: " + total + "점, 평균: " + average + ", 결과: " + result + "입니다!");
}

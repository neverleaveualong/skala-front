function showMyBag() {
  // 1. 소지품 객체(이름, 수량)들이 담긴 myBag 배열 생성
  var myBag = [
    { name: "노트북", count: 1 },
    { name: "지갑", count: 1 },
    { name: "무선 이어폰", count: 1 },
    { name: "텀블러", count: 1 },
    { name: "보조배터리", count: 2 }
  ];
  
  // 2. 출력할 메시지 초기화
  var message = "👜 내 가방 속 소지품 목록:\n\n";
  
  // 3. 반복문을 통해 소지품 객체들을 순회하며 출력 메시지 생성 및 콘솔 로깅
  for (var i = 0; i < myBag.length; i++) {
    var item = myBag[i];
    
    // 💡 템플릿 리터럴(Template Literal) 문법을 활용한 가독성 높은 스트링 파싱
    message += `- ${item.name} (${item.count}개)\n`;
    
    // 개발자 도구 콘솔창 출력
    console.log(`물품명: ${item.name}, 수량: ${item.count}개`);
  }
  
  // 4. 결과를 알림창(alert)으로 보여주기
  alert(message);
}

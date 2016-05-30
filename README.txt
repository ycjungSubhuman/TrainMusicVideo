금요일까지 할 것

정유철 : 
	프로그램 작성
	수요일까지 Action, Action Initializer 구현
고병현 :
	DOF와 인스턴스 드로잉 조사 금요일까지
	색맹테스트 소스 분석
박준수 :
	기차씬 곡면 셰이딩 구현
오윤이 :
	모델 수집, 시나리오 라이팅 미디 채널 디자인


[Action 과 CamShot을 작성하는 가이드]

Action은 뮤직 비디오에서 나타나는 어떤 "장면"에서 물체들이 어떻게 배치되고, 매 업데이트에 물체들에 어떤 일이 일어나고, 
boom 이벤트(베이스드럼 소리에 따라 발생되는 이벤트)에 어떤 일이 일어나는지 기술하는 오브젝트입니다.
start는 이 장면이 시작되었을 때 장면을 초기화하는 함수입니다.
update는 매 프레임마다 호출되는 업데이트 함수입니다.
boom은 박자에 따라 호출되는 함수입니다.
end는 장면이 끝날 때 호출되는 함수입니다.

Action의 target은 현재 이 액션이 주목하고 있는 Object3D를 나타냅니다. 
CamShot의 target은 현재 이 샷이 주목하고 있는 Camera를 나타냅니다. 
CamShot의 subject는 현재 이 샷의 카메라가 붙어있는 Object3D 대상을 말합니다. 

 * 새로운 Action이나 CamShot을 작성하는 방법

action: 
js/actions/ 폴더에 원하는 이름의 .js파일을 생성합니다.
PulsateAction을 참고하여 새로운 Action 클래스를 만듭니다. 사실 복사 붙여넣기 하고 내용만 바꾸면 됩니다.

camshot:
js/camshots/ 폴더에 원하는 이름의 .js파일을 생성합니다.
MoonShot.js와 PulsatingMoonShot.js를 참고하여 새로운 CamShot클래스를 만듭니다.

 * 테스트/적용시키는 법
index.html에서 js/CamShot.js를 불러온 줄 바로 뒤에서 새로 만든 js파일들을 불러오도록 script태그를 이용하여 명시합니다.

BootStrap.js에서 44~74번째 줄에 보면 노트에 따라 타임라인에 액션과 카메라를 추가하는 코드가 있습니다.
여기에서 현재 60, 61, 71, 72번째 줄을 보면 어떤 오브젝트 (육면체, 구)에 대한 Action과 CamShot을 새로 만드는 부분이
있습니다. 여기를 자신이 만든 Action이나 CamShot으로 바꿔서 테스트합니다.


* 테스트 환경
  자기 컴퓨터를 웹서버로 만들어서 자기 컴퓨터에 접속해야 합니다. 그렇지 않으면 파일들을 로딩할 때 문제가 생깁니다. 
 
 * 참고 : GSAP TweenLite를 쓰면 부드러운 모션을 만들 수 있습니다. 
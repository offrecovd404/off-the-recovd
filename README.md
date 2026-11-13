# OFF THE RECORD.

개인 자기소개와 감정 기록을 담는 정적 웹사이트입니다. 폴더를 풀고 `index.html`을 더블클릭하면 브라우저에서 열립니다. 서버 설치나 회원가입이 필요 없습니다.

## 글과 설정을 바꾸기

메모장이나 VS Code로 `content.js`를 엽니다. 큰따옴표 안의 글을 바꾸고 UTF-8로 저장하세요. 여러 항목을 추가할 때는 아래 예시처럼 쉼표를 유지하세요. 문장 안에 큰따옴표를 넣을 때는 앞에 역슬래시를 붙여 `\"`로 적습니다.

- **자기소개**는 `about.paragraphs`에 있습니다. 문단 하나를 한 줄의 큰따옴표 안에 넣으세요.
- **닉네임**은 `about.details`에서 `label: "닉네임"`이 있는 줄의 `value`를 바꾸세요. 같은 곳에서 나이, 관심사와 키워드도 바꿀 수 있습니다. 값이 빈 항목은 화면에서 숨겨집니다.
- **표지 문구와 사진**은 `prologue`에서 바꿀 수 있습니다.
- **섹션 제목과 표시 여부**는 `sections`에 있습니다. 숨길 섹션은 `show: false`로 바꾸세요. 목차에서도 사라집니다.
- **작품과 카테고리**는 `preferences`에서 추가하거나 삭제하세요. 새 카테고리를 입력하면 필터에도 표시됩니다.
- **X 프로필**은 `connection.url`의 빈 따옴표 안에 실제 프로필의 HTTPS 주소를 붙여넣으세요. 주소를 저장하면 버튼이 표시됩니다. DM 안내는 `connection.dm`에서 바꿀 수 있습니다.

## 이미지 추가

사진을 `assets` 폴더에 복사한 뒤 `image: "assets/photo.jpg"`처럼 적으세요. 경로의 대소문자를 실제 파일명과 맞추세요. `alt`에는 사진에 무엇이 보이는지 짧게 적습니다. 사진이 없는 항목은 `image: ""`로 두세요.

초기 사진은 사이트를 위해 생성한 흑백 이미지입니다. 작품 이미지 자리에는 각 작품의 분위기와 어울리는 사진을 넣었습니다.

## 아카이브 글 추가

`afterimages: [` 다음 줄에 아래와 같은 항목을 붙여넣으세요. 목록은 입력한 순서대로 표시됩니다. 날짜와 이미지는 빈 값으로 둘 수 있습니다.

```js
{
  title: "새 기록",
  date: "2026-11-13",
  summary: "목차에 표시할 짧은 소개.",
  body: ["첫 문단.", "두 번째 문단."],
  image: "",
  alt: "",
},
```

## 독백 추가

`monologues: [` 아래에 한 줄을 더 넣으세요. 날짜는 `YYYY-MM-DD` 형식을 사용하면 최신순으로 자동 정렬됩니다. 처음 표시할 개수는 `monologuePageSize`에서 바꿀 수 있습니다.

```js
{ date: "2026-11-13", text: "오늘 적어 두고 싶은 문장." },
```

## 색상과 글꼴 변경

`styles.css` 상단의 `:root`를 엽니다. `--bg`는 배경, `--panel`은 보조 배경, `--text`는 본문, `--muted`는 보조 텍스트입니다. 영문 제목은 `--serif`, 한국어 본문은 `--sans`에서 설정합니다. `--gutter`와 `--chapter-space`는 좌우 여백과 섹션 여백을 조절합니다. Instrument Serif 라이선스는 `assets/InstrumentSerif-OFL.txt`에 있습니다.

## GitHub Pages 무료 배포와 업데이트

1. GitHub에서 공개 저장소를 만들고 웹사이트 폴더 **안의** 파일과 `assets` 폴더를 저장소 최상위에 올리세요. 최상위에 `index.html`이 있어야 합니다.
2. 저장소의 **Settings → Pages**에서 **Source**를 **Deploy from a branch**로 설정하세요.
3. **Branch**에서 파일을 올린 브랜치(보통 `main`)와 **/(root)**를 선택하고 **Save**를 누르세요.
4. 배포가 끝나면 **Settings → Pages**에 표시되는 주소를 열어 확인하세요. 그 주소를 X 프로필의 웹사이트 칸에 넣을 수 있습니다.

로컬에서 수정한 내용은 저장 후 브라우저를 새로고침하면 보입니다. 공개 사이트에 반영하려면 변경한 파일을 같은 브랜치에 업로드해 커밋하세요. 배포가 끝난 뒤에도 이전 화면이 보이면 강력 새로고침(Ctrl+F5)을 해보세요. 숨긴 섹션의 원고도 공개 저장소의 `content.js`에는 남으므로, 공개하고 싶지 않은 원고는 업로드 전에 파일에서 삭제하세요.

[GitHub Pages 공식 배포 가이드](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

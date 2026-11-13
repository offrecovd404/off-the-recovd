// 여기에 있는 문구와 항목을 수정하고 저장한 뒤 브라우저를 새로고침하세요.
window.ARCHIVE_CONTENT = {
  title: "OFF THE RECORD.",
  footer: "A personal archive",
  // false로 바꾸면 해당 섹션과 메뉴 항목이 함께 숨겨집니다.
  sections: {
    prologue: { show: true, title: "Prologue", subtitle: "" },
    about: { show: true, title: "About me", subtitle: "An incomplete portrait." },
    preferences: { show: true, title: "Preferences", subtitle: "Things that stay with me." },
    afterimages: { show: true, title: "Afterimages", subtitle: "What remains of yesterday." },
    monologue: { show: true, title: "Monologue", subtitle: "Conversations with myself." },
    connection: { show: true, title: "Connection", subtitle: "If you wish to know me." },
  },
  prologue: {
    label: "00 / PROLOGUE",
    subtitle: "Meet me in Montauk.",
    quote: "僕に今 語りかけるんだ 愛しい その声で.",
    enter: "Enter the archive",
    image: "assets/montauk.webp",
  },
  about: {
    paragraphs: [
      "저는 저 자신을 설명하는 일보다, 다른 사람을 이해하려는 일이 조금 더 익숙한 사람입니다.",
      "누군가의 글을 읽을 때면 그 문장이 만들어지기까지의 시간을 상상하곤 합니다.",
      "어떤 마음으로 그 말을 골랐을지, 그때의 풍경과 온도는 어땠을지.",
      "때로는 적혀 있는 말보다 적히지 않은 것들에 더 오래 머물기도 합니다.",
      "그렇다고 늘 무거운 이야기만 나누는 사람은 아닙니다.",
      "좋아하는 게임에 몰두하기도 하고, 음악이나 영화의 한 장면을 오래 기억하기도 합니다.",
      "이곳에는 그런 저의 여러 모습을 조금씩 남겨두려고 합니다.",
    ],
    details: [
      { label: "닉네임", value: "CH" },
      { label: "나이", value: "05년생, 22살" },
      { label: "관심사", value: "영화, 음악, 게임, 글" },
      { label: "성격 키워드", value: "경청, 관찰, 여운" },
    ],
  },
  // category가 같은 작품은 같은 필터에 묶입니다. 이미지나 링크가 없으면 ""를 사용하세요.
  preferences: [
    { category: "영화", title: "Eternal Sunshine of the Spotless Mind", description: "기억이 지워진 자리에도 어떤 마음은 남아 있을까.", image: "chair.webp", alt: "겨울 해변에 놓인 빈 의자", url: "" },
    { category: "게임", title: "God of War Ragnarök", description: "거친 풍경을 지나며 조금씩 달라지는 두 사람의 거리.", image: "mountain.webp", alt: "안개에 잠긴 눈 덮인 산맥", url: "" },
    { category: "음악", title: "Ruel — distance", description: "가까이 있고 싶다는 마음과 거리를 두고 싶은 마음 사이.", image: "window.webp", alt: "빗방울 맺힌 밤의 차창", url: "" },
  ],
  // 본문은 문단마다 큰따옴표로 묶어 배열에 추가합니다. 날짜는 생략할 수 있습니다.
  afterimages: [
    {
      title: "중독", date: "", summary: "아득해질 듯 넌 날 중독시켰다.",
      body: ["그리움은 지나간 것을 그대로 되돌리고 싶은 마음과는 조금 다르다.", "어떤 장면이 문득 떠오르면, 그때의 내가 무엇을 소중하게 여겼는지 다시 생각해 본다."],
      image: "montauk.webp", alt: "어두운 모래 위로 밀려드는 파도",
    },
    {
      title: "장면과 장면 사이", date: "", summary: "기억에 남은 장면의 앞뒤를 생각하며.",
      body: ["기억 속 장면에는 앞뒤가 잘려 있는 경우가 많다.", "남은 장면만으로도 그날을 떠올릴 수 있다는 게 가끔은 이상하다."],
      image: "", alt: "",
    },
  ],
  // 아래는 교체할 수 있는 예시 독백입니다. 날짜는 YYYY-MM-DD 형식으로 작성하세요.
  monologuePageSize: 3,
  monologues: [
    { date: "2026-10-24", text: "한 번 읽고 지나간 문장이 며칠 뒤에야 이해될 때가 있다." },
    { date: "2026-10-27", text: "마지막 곡이 끝나도 잠깐은 이어폰을 빼지 않는다." },
    { date: "2026-11-02", text: "아무 말 없이 같이 걷는 게 편한 사람이 있다." },
    { date: "2026-11-07", text: "같은 영화를 다시 보면 그때는 지나쳤던 표정이 보인다." },
  ],
  connection: {
    paragraphs: [
      "가벼운 인사도, 오래 머무는 대화도 좋습니다.",
      "처음부터 특별한 이야기를 나눌 필요는 없어요.",
      "서로를 알아가는 데에는 저마다의 속도가 있으니까요.",
    ],
    dm: "DM으로 가볍게 인사를 건네주세요.",
    linkLabel: "X 프로필 열기",
    url: "",
  },
};

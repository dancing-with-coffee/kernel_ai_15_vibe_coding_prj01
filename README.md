# 주간 레시피 - 1인 가구를 위한 레시피 추천 서비스

1인 가구 직장인을 위한 주간 레시피 추천 웹 서비스입니다. 사용자가 월요일 아침에 접속하면, 집에 있는 재료를 기반으로 한 주(월~일) 식단과 부족 재료 장보기 체크리스트를 자동으로 받아볼 수 있습니다.

## 🚀 주요 기능

### MVP (Phase 1)
- **주간 레시피 자동 추천**: 월요일 00:00 기준 새로 생성
- **냉장고 재료 관리**: 재료 이름, 수량, 유통기한 입력/수정/삭제
- **장보기 체크리스트**: 부족한 재료 목록 자동 정리
- **계정 및 기본 인증**: 이메일/소셜 로그인
- **반응형 웹 UI**: 모바일 퍼스트 디자인

### 향후 로드맵 (Phase 2+)
- AI 챗봇 Q&A & 고급 맞춤 추천 (OpenAI API)
- 영양·칼로리 정보 표시
- 구독 결제 플로우 (Stripe, Toss 등)
- 커머스/배달 연동 제휴

## 🛠️ 기술 스택

- **프론트엔드**: React + TypeScript + Vite
- **스타일링**: Tailwind CSS
- **아이콘**: Heroicons
- **인증**: Supabase Auth
- **상태 관리**: React Context API
- **라우팅**: React Router DOM

## 📦 설치 및 실행

### 1. 저장소 클론
```bash
git clone <repository-url>
cd kernel_ai_15_vibe_coding_prj01
```

### 2. 프론트엔드 의존성 설치
```bash
cd frontend
npm install
```

### 3. 환경 변수 설정
프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI API (for Phase 2)
VITE_OPENAI_API_KEY=your_openai_api_key
```

### 4. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속하세요.

## 🗄️ 데이터베이스 스키마

### Users
- id: string (PK)
- email: string
- name: string (optional)
- is_premium: boolean
- created_at: timestamp

### Ingredients
- id: string (PK)
- name: string
- quantity: number
- unit: string
- expiry_date: date
- category: enum (vegetable, meat, dairy, grain, spice, other)
- user_id: string (FK to Users)

### Recipes
- id: string (PK)
- name: string
- description: string
- ingredients: json (RecipeIngredient[])
- instructions: string[]
- cooking_time: number (minutes)
- difficulty: enum (easy, medium, hard)
- servings: number
- image_url: string (optional)
- category: enum (breakfast, lunch, dinner, snack)
- is_premium: boolean

## 🎯 비즈니스 모델

- **Freemium**: 기본 추천 무료 제공
- **프리미엄 구독**: 월 4,900원
  - 고급 AI 추천
  - 식단 분석
  - 광고 제거

## 📱 화면 구성

1. **로그인/회원가입**: 이메일 기반 인증
2. **대시보드**: 주간 식단 요약, 유통기한 임박 알림
3. **냉장고 재료**: 재료 추가/수정/삭제, 유통기한 관리
4. **레시피**: 검색, 필터링, 상세 정보
5. **장보기 목록**: 체크리스트, 카테고리별 정리

## 🔧 개발 환경 설정

### 필수 요구사항
- Node.js 18+ 
- npm 9+

### 권장 개발 도구
- VS Code
- React Developer Tools
- Tailwind CSS IntelliSense

## 🚧 개발 상태

- [x] 프로젝트 구조 설정
- [x] 기본 컴포넌트 구현
- [x] 라우팅 설정
- [x] 인증 시스템 (Supabase 연동 준비)
- [x] UI/UX 디자인
- [ ] 백엔드 API 연동
- [ ] 데이터베이스 연동
- [ ] 실제 인증 시스템
- [ ] 배포 설정

## 📋 TODO

### 단기 (1-2주)
- [ ] Supabase 프로젝트 설정
- [ ] 데이터베이스 테이블 생성
- [ ] 실제 API 연동
- [ ] 인증 시스템 완성

### 중기 (3-6주)
- [ ] 레시피 추천 알고리즘 구현
- [ ] 주간 식단 생성 로직
- [ ] 장보기 목록 자동 생성
- [ ] 테스트 및 버그 수정

### 장기 (7-10주)
- [ ] 클로즈드 베타 테스트
- [ ] 사용자 피드백 수집
- [ ] 퍼블릭 런칭
- [ ] 마케팅 온보딩

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.

---

**개발팀**: Kernel AI 15기 Vibe 팀  
**프로젝트 기간**: 2024년 8월 ~ 10월  
**목표**: 1인 가구의 식사 계획 고민을 해결하는 서비스

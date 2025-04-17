# 인테리어 포트폴리오 웹사이트

Google 스프레드시트를 활용한 인테리어 업체 전용 포트폴리오/문의 웹사이트입니다. 모바일 중심의 반응형 디자인, 이미지 중심의 포트폴리오, 문의하기 기능을 제공합니다.

## 주요 기능

- **포트폴리오 카드형 리스트**: 이미지 중심의 카드 UI, 카테고리별 필터링
- **이미지 슬라이드**: 각 포트폴리오별 여러 이미지를 스와이프(슬라이드)로 제공
- **이미지별 설명**: 각 이미지마다 별도의 설명 표시
- **문의하기**: 모달 형태의 문의 폼, 제출 시 Google 스프레드시트에 자동 저장
- **모바일/PC 반응형**: Tailwind CSS 기반의 반응형 UI

## 기술 스택

- Next.js (App Router)
- React, TypeScript
- Tailwind CSS
- Swiper.js (이미지 슬라이드)
- Google Sheets API
- Heroicons

## 설치 및 실행 방법

1. **프로젝트 클론 및 패키지 설치**

```bash
git clone [레포지토리 주소]
cd [프로젝트 폴더]
npm install
```

2. **Google API 및 환경 변수 설정**

- Google Cloud Console에서 프로젝트 생성 및 Google Sheets API 활성화
- 서비스 계정 생성 및 JSON 키 발급
- 서비스 계정 이메일에 스프레드시트 편집 권한 부여
- `.env.local` 파일 생성 후 아래와 같이 입력

```
GOOGLE_CLIENT_EMAIL=서비스계정이메일@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
SPREADSHEET_ID=스프레드시트_ID
```

3. **스프레드시트 구조**

### Portfolio 시트 (포트폴리오)

- 시트 이름: `Portfolio`
- A열: ID
- B열: 제목
- C열: 설명
- D열: 이미지 URL (여러 개일 경우 쉼표로 구분)
- E열: 이미지 설명 (여러 개일 경우 세미콜론으로 구분)
- F열: 카테고리
- G열: 날짜
- H열: 순서

### Contact 시트 (문의)

- 시트 이름: `Contact`
- A열: 접수일시
- B열: 이름
- C열: 이메일
- D열: 연락처
- E열: 문의유형
- F열: 문의내용

4. **개발 서버 실행**

```bash
npm run dev
```

5. **빌드 및 배포**

```bash
npm run build
npm run start
```

## 사용법

- **포트폴리오 관리**: Google 스프레드시트의 `Portfolio` 시트에서 데이터 추가/수정
  - 이미지 URL은 쉼표로 구분, 이미지 설명은 세미콜론으로 구분
- **문의 관리**: 웹사이트에서 접수된 문의는 `Contact` 시트에 자동 저장

## 커스터마이징

- 스타일: `src/app/globals.css` 및 Tailwind 클래스 활용
- 주요 컴포넌트: `src/components/` 폴더 참고
- 데이터 로직: `src/lib/googleSheets.ts` (스프레드시트 연동)
- 문의 API: `src/app/api/contact/route.ts`

## 참고 사항

- 외부 이미지 사용 시 `next.config.ts`의 `images.domains`에 도메인 추가 필요
- 서비스 계정에 스프레드시트 편집 권한이 반드시 있어야 함

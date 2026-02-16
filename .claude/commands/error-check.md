프로젝트 전체의 코드 오류를 검증해주세요. 아래 항목을 순서대로 체크해주세요.

## 1. TypeScript 컴파일 검증
- `npx tsc --noEmit` 실행하여 타입 에러 확인
- 타입 불일치, 누락된 타입, 잘못된 제네릭 사용 등 점검

## 2. 패키지 버전 호환성 검증
- package.json의 dependencies와 devDependencies 버전 확인
- @types 패키지와 실제 패키지 간 메이저 버전 불일치 확인 (예: express v5인데 @types/express가 v4용인 경우)
- peer dependency 충돌 여부 확인
- deprecated된 패키지가 있는지 확인

## 3. ESLint 검증
- `npx eslint src/` 실행하여 린트 에러 확인
- 미사용 변수, import 오류, 코딩 컨벤션 위반 등 점검

## 4. import/export 검증
- 존재하지 않는 모듈 import 확인
- 순환 참조(circular dependency) 확인
- 경로 별칭(@/) 설정과 실제 경로 일치 여부 확인

## 5. 환경 설정 검증
- tsconfig.json 설정 일관성 확인
- package.json scripts가 정상 동작 가능한지 확인
- Node.js 버전과 target ES 버전 호환성 확인

## 6. 테스트 검증
- `npx vitest run` 실행하여 테스트 통과 여부 확인
- 실패한 테스트가 있으면 원인 분석

## 출력 형식
각 항목별로 결과를 아래 형식으로 정리해주세요:

- ✅ 문제 없음 → 간단히 통과 표시
- ❌ 오류 발견 → 오류 내용 + 수정 방안 제시
- ⚠️ 경고 → 당장 문제는 없지만 주의가 필요한 사항

마지막에 전체 요약을 해주세요.

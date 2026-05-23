# Interview Scratchpad - 뷰어 수정 (raw-md)

## Context
- Date: 2026-05-20
- Reference: https://raw-md.pages.dev

## Emerging Themes
- 뷰어 모드 레이아웃 (가운데 정렬)
- 인페이지 앵커 링크 클릭 시 에디터 상태 유실 문제

## Requirements Captured
- 뷰어 모드에서 콘텐츠 가운데 정렬
- 본문 내 헤더 링크(#anchor) 클릭 시 작성 중인 내용 보존

## Constraints
-

## Decisions Made
- 가운데 정렬 = 콘텐츠 블록 중앙 배치 (max-width + margin auto 방식)
- max-width: 자비스 추천값 사용, 반응형 고려

## Tensions / Trade-offs
- URL 철학(hash=LZ-compressed markdown) vs 섹션 공유(hash=#section-id)
  - 현재 `#` 뒤에 압축된 마크다운이 들어감 → `#header-name` 같은 섹션 anchor와 충돌

## Areas to Dig Deeper
- [ ] 가운데 정렬: 전체 페이지 중앙? max-width + margin auto?
- [ ] 앵커 링크: URL hash 변경 방식이 문제인지, 상태 관리 방식이 문제인지
- [ ] 수정 범위: 뷰어 전용인지 에디터+뷰어 공통인지

## Key Quotes
- "작성중이던 내용이 날아감"

## Open Questions
- 앵커 이동 시 어떤 동작이 원하는가? 스크롤만? URL hash 유지?
- 가운데 정렬의 기준 너비는?

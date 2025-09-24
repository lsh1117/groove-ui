# Frontend Guidelines for Cursor AI

본 문서는 Cursor AI가 groove-ui css 라이브러리를 제작할 때 반드시 준수해야 할 지침입니다.

---

## 1. 마크업 구조

- 시맨틱 태그 우선 (`header`, `main`, `footer`, `section`, `article`, `nav`)
- 접근성 준수: ARIA 속성 (`aria-label`, `role`, `aria-disabled` 등)
- 모든 이미지에는 `alt` 속성 필수
- 폼 요소에는 반드시 `<label>` 연결

---

## 2. 라이브러리 명칭

- 라이브러리 명칭은 groove-ui
- prefix 'gr-' 사용
- Block에 라이브러리 기반임을 표시 → gr-btn, gr-radio, gr-modal
- Element/Modifier는 일반적인 BEM 규칙대로 붙임

---

## 3. 네이밍 규칙

- [ ] 클래스명은 **BEM 방식**으로 작성한다.
  - Block: `.gr-component`
  - Element: `.gr-component__element`
  - Modifier: `.gr-component--modifier`
- [ ] 모든 클래스명은 **소문자 + kebab-case**를 사용한다.
- [ ] JS 제어용 상태 클래스는 `is-` 접두어를 사용한다. (`is-active`, `is-open` 등)
- [ ] 라이브러리 기반일 경우, Block에 **프로젝트 접두어 + 라이브러리 축약어**를 포함한다.  
       (예: `.gr-sw__slide`, `.gr-sl__arrow--disabled`)

## 4. 폴더 구조.

```
css/style.css       // scss 파일이 컴파일된 css
scss/
├── abstracts/      // 변수, mixin, function
├── base/           // reset, typography
├── components/     // 버튼, 라디오, 체크박스, 탭메뉴 등
├── templates/      // 아코디언, 카드, 조회 등
├── layout/         // grid, header, footer
├── pages/          // 특정 페이지 스타일
├── themes/         // 다크모드, 컬러 테마
├── vendors/        // 외부 라이브러리 오버라이드
└── style.scss      // 엔트리 포인트
```

---

## 5. 작성규칙

- 변수 사용
  - 공통 색상, 폰트, z-index 등은 abstracts/\_variables.scss에서 관리
  - 네이밍 예:

```
$color-primary: #0070f3;
$color-danger: #e53935;
$font-base: 'Inter', sans-serif;
```

- Mixin / Function 적극 활용

```
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.gr-card {
  @include flex-center;
}
```

- 중첩 규칙
  - 최대 3 depth 이하로 제한
  - 예:

```
.gr-card {
  &__header {
    &--highlight {
      color: $color-primary;
    }
  }
}
```

- 단위 규칙

  - rem 기반 단위 사용
  - 1rem 기본 단위는 10px 이 되도록 설정
  - 예외적으로 border, media query는 px 허용

- 접근성 고려

  - :focus, :focus-visible 반드시 처리
  - 컬러 대비는 WCAG AA 이상 유지
  - 텍스트 대비율 최소 4.5:1
  - 키보드 네비게이션 가능
  - Hover 상태만 의존 금지 (Focus 스타일 포함)
  - 스크린 리더 대응
  - 상태 클래스(`is-disabled`, `is-hidden`)는 시각적 + 접근성 대응을 함께 고려한다.

- 브라우저 호환성

  - autoprefixer 사용 필수
  - 최신 2버전 브라우저 + IE11 제외 정책
  - CSS Grid / Flexbox를 기본 레이아웃 도구로 사용

- 주석 규칙
  - 컴포넌트 단위

```
/* ==========================================================================
   Button Component
   ========================================================================== */
```

- Element / Modifier 설명

```
.gr-btn {
  /* Primary button */
  &--primary {
    background: $color-primary;
  }
}
```

- 예시 코드

```
/* ==========================================================================
   Button Component
   ========================================================================== */

.gr-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-family: $font-base;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &--primary {
    background-color: $color-primary;
    color: #fff;

    &:hover {
      background-color: darken($color-primary, 5%);
    }

    &:disabled,
    &.is-disabled {
      background-color: lighten($color-primary, 20%);
      cursor: not-allowed;
    }
  }
}
```

---

### 6. 접근성 (WCAG AA)

- 텍스트 대비율 최소 4.5:1
- 키보드 네비게이션 가능
- Hover 상태만 의존 금지 (Focus 스타일 포함)
- 스크린 리더 대응

---

### 7. 퍼포먼스 / SEO

- 불필요한 inline-style 금지
- 이미지 → WebP 우선
- 시맨틱 태그 적극 활용
- 컴포넌트 재사용 최적화

---

### 8. 컴포넌트 종류

- button
- radio
- checkbox
- icon
- tag
- select
- tabmenu
- segment
- toggle
- switch
- input
- textfield

### 9. 템플릿 종류

- typography
- label
- message
- box
- list
- data-list
- card
- table
- data-grid
- pagination
- accordion
- button-group
- segment-group
- modal
- layer
- tooltip
- date-picker
- unit-group
  - input + input, input + button, radio + radio, radio + checkbox, input + select 등 form 안에 컴포넌트간 간격에 사용
- search

---

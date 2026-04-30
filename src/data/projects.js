export const projectsData = {
  BIO: {
    id: 'BIO',
    type: 'A',
    title: '반려견 유전자 분석 및 시각화 : SNP 기반의 유전 질환 예측 및 데이터 파이프라인',
    color: '#2ECC71',
    displayMode: 'presentation',
    overview: {
      definition: '반려견의 SNP(단일 염기 다형성) 데이터를 정밀 분석하여 잠재적 질환을 예측하고, 복잡한 정보를 직관적으로 설계한 유전체 리포팅 서비스입니다.',
      role: 'Genetic Data Pipeline & UI/UX Architect',
      roleKeywords: ['#반려견_유전자_분석', '#SNP_마커_추출', '#유전체_데이터_시각화', '#발표_자료_포함'],
      techStack: ['Python', 'Rust', 'SIMD', 'Dynamic Programming']
    },
    links: { repo: null, demo: '/projects/Bio/Bio_Presentation.pdf' }
  },
  MUSIC: {
    id: 'MUSIC',
    type: 'T',
    title: '팬들은 왜 떠났을까? : GA4로 분석한 유저 행동 로그',
    color: '#A569BD',
    overview: {
      definition: 'AI Agent 기반의 빠른 개발을 통한 JavaScript 기반 1인 개발 프로젝트입니다. \n Supabase로 리더보드를 구축하고, GA4로 데이터 기반의 유저 이탈 원인을 분석했습니다.',
      summaryKeywords: ['⚡ 1주 완성', '🎮 리듬게임 엔진', '🔍 GA4 이탈 분석'],
      role: 'Product Developer & Data Analyst',
      roleKeywords: ['#AI_Powered_Dev', '#Vibe_Coding', '#Data_Driven_Pivot', '#GA4_Insight'],
      techStack: ['JavaScript', 'HTML5 Canvas', 'GA4 Data Tracking', 'Leaderboard Logic', 'Supabase'],
      roleCards: [
        {
          category: 'Build (개발)',
          icon: '🛠',
          items: [
            '**AI 협업 개발**: Cursor 활용, 1주일 내 리듬게임 엔진 구축 ⚡',
            '**로직 최적화**: 프레임 단위 수동 채보로 몰입감 극대화 🎮',
            '**DB 아키텍처**: Supabase 실시간 리더보드 연동 🔗'
          ],
          tech: ['JavaScript', 'Canvas', 'Supabase']
        },
        {
          category: 'Analyze (분석)',
          icon: '📊',
          items: [
            '**GA4 로그 설계**: 유저 타격 성공률 및 이탈 구간 실시간 트래킹',
            '**데이터 기반 발견**: 평균 체류 시간 2분 지점 이탈 집중 현상 포착',
            '**서비스 고도화**: 리더보드 도입 통한 유저 리텐션 개선 가설 검증'
          ],
          tech: ['GA4', 'Data Analysis']
        }
      ]
    },
    problemBackground: '◆ 배경: 좋아하는 아티스트의 한국대중음악상 후보 선정을 기념하며, 리듬게임을 제작 및 배포하고 인스타그램 릴스로 홍보함. \n ◆ 핵심 질문: 사용자는 노래 한 곡이 끝날 때까지 **게임에 몰입을 유지**하는가?',
    hypothesisLogic: '◆ 초기 시도: 알고리즘을 통한 장애물 자동 생성을 시도했으나, 다양성 결여 및 싱크 문제 발견 \n ◆ 의사 결정: 유저의 리듬감 몰입을 저해하지 않기 위해 **수동 채보 방식**으로 전면 수정해 플레이 경험의 질을 높임.',
    methodologyQA: {
      methodology: '◆ 데이터 관찰: GA4 분석 결과, **이탈률 23.1%** / 평균 체류 시간 2분 확인 \n ◆ 현상 파악: 곡의 중간 지점에서 유저 이탈이 집중됨을 발견. 이는 곡의 후반부까지 유저를 끌고 갈 **지속적인 동기부여 요소**가 부족함을 의미함. \n ◆ 가설 수립: 유저를 끝까지 완주하게 할 **보상체계**가 있다면 이탈률이 개선될 것이다.',
      qaPoint: ''
    },
    insightImpact: '◆ 액션: 완주 동기를 강화하기 위해 **리더보드 및 SNS 공유 기능**을 추가 도입 \n ◆ 회고: 표본 부족으로 가설의 통계적 증명에는 한계가 있었으나, **[데이터 확인 > 문제 지점 발견 > 솔루션 도입]**으로 이어지는 **서비스 개선 루프**를 직접 수행하며 **데이터 기반의 의사결정**을 경험함',
    keyFeatures: [
      '**메인 엔진**: Phaser 3를 활용한 픽셀 아트 스타일의 횡스크롤 리듬 액션 엔진 총괄 개발',
      '**외부 API 연동**: YouTube Iframe API 정밀 제어를 통한 음원 및 장애물(BPM) 100% 동기화',
      '**백엔드 구축**: Supabase 도입을 통한 실시간 글로벌 랭킹 시스템 및 데이터베이스 관리',
      '**성능 최적화**: Phaser Graphics API 기반 런타임 텍스처 생성 기술로 초기 에셋 용량 최소화',
      '**아키텍처 설계**: Vite 기반 ES Modules 구조화 및 효율적인 번들링 파이프라인 구축',
      '**데이터 트래킹**: GA4 커스텀 이벤트 추적으로 사용자 이탈 구간 분석 및 게임 밸런스 개선',
      '**소셜 기능**: Kakao SDK 기반 실시간 랭킹 캡처 및 소셜 미디어 공유 기능 구현'
    ],
    snapshots: [
      {
        title: 'GAMEPLAY_MECHANICS',
        img: '/projects/music/game-play.png',
        desc: 'Phaser 3 엔진을 활용한 픽셀 아트 기반 횡스크롤 리듬 액션 게임의 실제 플레이 인터페이스'
      },
      {
        title: 'MANUAL_CHART_SYNC',
        img: '/projects/music/note-charting.png',
        desc: '프레임 단위의 정밀 동기화를 위한 수동 채보 시스템 및 장애물 배치 로직 상세'
      },
      {
        title: 'REALTIME_LEADERBOARD',
        img: '/projects/music/leaderboard.png',
        desc: 'Supabase 연동을 통한 실시간 글로벌 랭킹 시스템 및 데이터베이스 정합성 확인 화면'
      },
      {
        title: 'GA4_ANALYSIS_DASHBOARD',
        img: '/projects/music/ga-analysis.png',
        desc: '사용자 행동 로그 기반의 실시간 이탈 구간 분석 및 데이터 시각화 지표 대시보드'
      }
    ],
    links: { repo: 'https://github.com/Uheech/Attack-', demo: 'https://attack-alpha.vercel.app/' }
  },
  MENTAL: {
    id: 'MENTAL',
    type: 'C',
    title: '100번의 프롬프트 수정으로 완성한 페르소나 : 불교 철학 기반 심리상담 챗봇의 품질 통제 과정',
    color: '#EC4899',
    overview: {
      definition: 'AI의 환각 현상을 제어하기 위해 100회 이상 프롬프트 실험을 수행한 프로젝트입니다. \n 답변의 논리적 결함을 잡아내기 위해 [상활 파악-의도 진단-맥락 연결] 추론 구조를 설계했으며, \n 배포 후 유저 대화를 모니터링하기 위해 supabase 기반의 대화 기록 시스템을 구축함.',
      role: 'Product Builder & AI Engineer',
      roleKeywords: ['#AI_인터랙션_엔지니어링', '#풀스택_개발', '#프롬프트_디자인'],
      roleCards: [
        {
          category: 'Build (개발)',
          icon: '🛠',
          items: [
            '**하이브리드 AI 인터페이스계**: Gemini Live API 기반 음성 대화와 텍스트 모드를 통합하고, 두 모드 간 맥락이 끊기지 않게 연결하는 Context Bridge 구현',
            '**물리 기반 인터랙션**: SVG와 Vanilla JS를 활용해 실제 목탁을 치거나 염주를 굴리는 듯한 실감형 시뮬레이션 및 카운팅 시스템 개발',
            '**수익화 인프라**: Polar SDK를 연동한 구독 기반 결제 시스템 및 티어별(Free/Premium) 기능 제한, 관리자 전용 대시보드를 포함한 풀스택 인프라 구축',
          ],
          tech: ['Next.js', 'Gemini Live API', 'Supabase', 'Polar SDK']
        },
        {
          category: 'Engineering',
          icon: '📊',
          items: [
            '**집요한 품질 제어**: 100회 이상의 프롬프트 실험을 통해 [내부 사고 → 의도 진단] 로직을 설계하여 AI 답변의 전문성과 일관성 확보 (환각 현상 억제)',
            '**운영 비용 파이프라인**: 유저 세션별 API 토큰 사용량을 자동 계산해 Supabase에 기록하는 시스템을 구축하여 실시간 운영 비용 모니터링 기반 마련',
            '**서비스 안정성 설계**: 에러 발생 시 History Recovery 로직을 통해 대화 흐름을 복구하고, AI 윤리 가이드라인 준수를 위한 세이프티 세팅 적용',
          ],
          tech: ['Supabase Hooks', 'Amplitude', 'PostgreSQL']
        }
      ],
      techStack: ['Next.js', 'Gemini Live API', 'Prompt Engineering', 'Supabase']
    },
    problemBackground: '◆ 배경: 불교 철학 기반 심리 상담 서비스를 통해 현대인의 정신적 피로를 해소하고, 목탁/염주 등 디지털 리추얼 경험을 제공하고자 함. \n ◆ 핵심 질문: AI가 철학적 깊이를 유지하면서도, 환각 현상없이 사용자에게 일관성 있는 상담 경험을 제공할 수 있는가?',
    hypothesisLogic: '◆ 초기 시도: 단순 페르소나 설정만으로는 답변이 추상적이거나, 상담의 맥락을 놓치고 엉뚱한 대답을 하는 현상 발생. \n ◆ 의사 결정: 답변의 정합성을 높이기 위해 100회 이상의 프롬프트 실험 수행. AI가 답변 전 스스로 생각하게 만드는 [내부 사고] 과정과 유저의 의도를 먼저 파악하는 [의도 진단] 단계를 프롬프트 내에 설계하여 답변의 전문성을 확보함.',
    methodologyQA: {
      methodology: '◆ **인프라 구축**: **Gemini Live API**를 활용한 **실시간 음성 대화 시스템**을 구축하고, 배포 후 대화 기록을 관리할 수 있도록 **Supabase 실시간 로깅 환경**을 선제적으로 구현. \n ◆ **인터랙션 구현**: Vanilla JS와 SVG를 활용해 **물리 법칙이 적용된 목탁/염주 시뮬레이션**을 개발하여 상담과 체험이 결합된 서비스 형태를 완성함. \n ◆ **비즈니스 준비**: **Polar SDK를 연동하여 유저별 권한 관리 및 결제 시스템을 통합**, 단순 프로젝트를 넘어 실제 운영 가능한 서비스 구조를 설계함.',
    },
    insightImpact: '◆ **액션**: **100번의 수정**을 거친 프롬프트와 풀스택 인프라를 결합하여, 기획 의도에 완벽히 부합하는 **고품질 AI 페르소나를 구현**함. \n ◆ **회고**: 빌더로서 **최신 AI 기술(Live API)과 비즈니스 모델(Polar)을 빠르게 결합**하는 기술적 민첩성을 경험함. 특히 "좋은 답변"은 단순히 운이 아니라, **수많은 반복 실험과 논리적 프롬프트 설계를 통해 통제 가능하다는 확신**을 얻음.',
    keyFeatures: [
      '**AI 멀티모달**: **Gemini 3.1 Flash & Live API**를 결합하여 **텍스트/음성 하이브리드 대화** 및 실시간 맥락 동기화 구현',
      '**백엔드 인프라**: **Supabase** 연동을 통해 **실시간 유저 대화 로그 수집** 및 개인화 데이터 정밀 관리',
      '**수익화 자동화**: **Polar SDK**를 활용한 유저별 **티어 기반 구독 및 결제 시스템** 통합 구축',
      '**실감형 인터랙션**: SVG 및 Vanilla JS 기반의 **물리 엔진 시뮬레이션**으로 목탁/염주 리추얼 경험 극대화',
      '**모던 아키텍처**: **Next.js 및 Tailwind CSS**를 활용한 반응형 프론트엔드 및 고분해능 UI/UX 설계'
    ],
    snapshots: [
      {
        title: 'MAIN_EXPERIENCE_INTERFACE',
        img: '/projects/Mental/main.png',
        desc: '신비롭고 정제된 톤앤매너의 메인 진입 화면. 사용자에게 철학적 상담 테마와 심미적 안정감을 동시에 전달함.'
      },
      {
        title: 'AI_INTERACTION_CHROME',
        img: '/projects/Mental/chat.png',
        desc: '다단계 추론 로직과 Context Bridge가 적용된 실시간 대화 인터페이스. 의도 분류 기반의 정교한 상담 답변 렌더링.'
      },
      {
        title: 'PHYSICS_RITUAL_ENGINE',
        img: '/projects/Mental/moktak.png',
        desc: 'SVG와 Vanilla JS로 구현된 물리 엔진 기반 목탁 인터렉션. 타격 강도와 속도를 물리 법칙으로 시뮬레이션하여 몰입형 리추얼 경험 제공.'
      },
      {
        title: 'INTERACTIVE_COUNTING_SYSTEM',
        img: '/projects/Mental/rosary.png',
        desc: '사용자의 터치/드래그에 반응하는 염주 굴리기 시뮬레이션. 리얼타임 데이터 바인딩을 통해 수행 횟수를 추적하고 로그화함.'
      }
    ],
    links: { repo: 'https://github.com/Uheech/Digital-Toilet', demo: 'https://digital-toilet-1.onrender.com/' }
  },
  'DATA/QA': {
    id: 'DATA/QA',
    type: 'G',
    title: '불확실성을 제거하는 정합성 설계 : 전사적 데이터 품질 보증 및 리니지 가시화',
    color: '#0EA5E9',
    overview: {
      definition: '데이터 정합성 오류 Zero화를 위한 전주기 QA 파이프라인 설계 및 거버넌스 체계화',
      role: 'Data Infrastructure & QA Strategist',
      roleKeywords: ['#전사_데이터_거버넌스', '#데이터_리니지_구현', '#정합성_검증_자동화'],
      techStack: ['SQL', 'Data Lineage', 'Automation Script', 'Metabase']
    },
    problemBackground: '의사결정의 근거가 되는 원천 데이터의 불일치 및 가비지 데이터 유입으로 인해 분석 지표의 신뢰성이 하락하고, 잘못된 지표에 의한 대규모 마케팅 리소스 낭비가 발생하는 상황이었음.',
    hypothesisLogic: '데이터 라이프사이클 전반에 걸친 "신뢰 경계"를 설정하고, 자동화된 유효성 검사 모듈을 데이터 파이프라인의 각 단계에 삽입함으로써 임계점 이상의 데이터 무결성을 보증하려 함.',
    methodologyQA: {
      methodology: '실시간 스트리밍 유효성 검사 스크립트를 배포하여 이상 데이터 유입을 즉시 차단하고, 복잡한 데이터 흐름을 추적할 수 있는 데이터 리니지(Lineage) 가시화 맵을 구축함.',
      qaPoint: '데이터 파싱 오류 감지를 위한 무작위 샘플링 검수 로직 및 스키마 변경 자동 감칭 시스템 구축. 데이터 오너십 문화를 위한 전사 표준 지표 정의서 및 QA 매뉴얼을 전파함.'
    },
    insightImpact: '데이터 정합성 오류 발생률 95.0% 감소 및 분석 지리 응답 효율 대폭 증대. 전사적인 Data-Driven 의사결정 프로세스를 체화하고, 신뢰성 있는 비즈니스 가설 검증이 가능한 시스템 환경을 확립함.',
    keyFeatures: [
      '자동화된 실시간 데이터 정합성 검증 엔진',
      '전주기 흐름 추적을 위한 데이터 리니지 대시보드',
      '파이프라인 단계별 이상 탐지 및 자동 알림 시스템',
      '전사 공통 지표 표준화 및 데이터 거버넌스 수립'
    ],
    snapshots: [
      { title: 'ERROR_LOG_MONITOR', img: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800', desc: '실시간 데이터 유입 및 정합성 위반 탐지 알림' },
      { title: 'LINEAGE_MAP', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800', desc: '복잡한 데이터 흐름의 정합성 보증 경계 시뮬레이션' }
    ],
    links: { repo: 'https://github.com/uheech/data-qa-system', demo: 'https://lab.uheech.com/qa-dashboard' }
  }
};

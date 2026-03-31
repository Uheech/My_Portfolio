export const projectsData = {
  BIO: {
    id: 'BIO',
    type: 'A',
    title: 'RNA 분석 알고리즘 최적화',
    color: '#2ECC71',
    overview: {
      definition: '유전체 데이터 처리 효율 극대화를 위한 분석 파이프라인 설계 및 검증',
      role: 'Data Analysis & QA Engineer',
      techStack: ['Python', 'Rust', 'SIMD', 'Dynamic Programming']
    },
    problemBackground: 'RNA 서열 분석 시 대량의 비정형 데이터 처리 속도가 임계치를 초과하여 수집 데이터의 실시간 무결성 확인 및 서버 부하 관리가 불가능한 상황이었음.',
    hypothesisLogic: '기존 서열 정렬 알고리즘의 Bottleneck을 식별하고, 병렬 처리 및 DP 최적화를 적용한 고속 엔진을 설계하여 데이터 처리 지연을 40% 이상 제거할 수 있을 것으로 가설을 세움.',
    methodologyQA: {
      methodology: 'Rust 기반의 정적 타입 언어를 도입하여 런타임 오류를 최소화하고, SIMD 명령어를 활용한 벡터화 연산으로 연산 정밀도를 유지함.',
      qaPoint: '서열 데이터의 누락 및 중복 방지를 위해 Boundary Test Case를 설계하고, 대량 처리 시의 데이터 정합성을 검증하는 자동화 릴리스 파이프라인을 구축함.'
    },
    insightImpact: '기존 대비 분석 속도 65% 향상 및 데이터 유실율 0% 달성. 고도화된 분석 인프라 구축을 통해 실업 분석 생산성을 획기적으로 증대시키고 정밀 의료 의사결정의 기반을 마련함.'
  },
  MUSIC: {
    id: 'MUSIC',
    type: 'T',
    title: 'GA 기반 리듬 채보 패턴 분석 및 자동 생성',
    color: '#A569BD',
    overview: {
      definition: '오디오 파형 데이터 추출 및 유전 알고리즘을 활용한 최적의 채보 패턴 설계',
      role: 'System Architect & Algorithm Researcher',
      techStack: ['Python', 'Genetic Algorithm', 'FFT', 'Librosa']
    },
    problemBackground: '다양한 장르의 오디오 데이터를 일관된 기준으로 자동 분석하지 못해, 수동 채보 제작 시 발생하는 패턴의 편향성과 낮은 품질 유지 비용이 발생하는 한계 봉착.',
    hypothesisLogic: 'FFT(Fast Fourier Transform)를 통한 오디오 피크 검출 데이터를 GA의 피트니스 함수에 적용하면, 유저의 숙련도별로 최적화된 채보 데이터셋을 확률적으로 도출할 수 있다고 판단함.',
    methodologyQA: {
      methodology: '곡의 BPM 및 주파수 대역별 가중치를 활용한 패턴 진화 알고리즘 설계. 대규모 사용자 플레이 로그를 바탕으로 난이도 커브 데이터 분석 수행.',
      qaPoint: '노트 배치 시 발생하는 물리적 불가능 패턴(Impossible State) 필터링 로직을 개발하고, 알고리즘 생성 데이터의 일관성 보장을 위한 회귀 테스트(Regression Test) 수행.'
    },
    insightImpact: '전문가 제작 대비 85% 이상의 패턴 정밀도 도달 및 제작 공정 시간 70% 단축. 데이터 기반의 자동화 파이프라인 구축을 통한 콘텐츠 수급 안정성 확보.'
  },
  MENTAL: {
    id: 'MENTAL',
    type: 'C',
    title: 'AI 심리 상담 데이터셋 빌딩 및 정밀 튜닝',
    color: '#EC4899',
    overview: {
      definition: '자연어 처리 데이터의 정성적 가치 정량화 및 챗봇 인터랙션 신뢰도 강화',
      role: 'NLP Data Strategy & Evaluator',
      techStack: ['Python', 'RAG', 'Vector DB', 'Prompt Engineering']
    },
    problemBackground: '비정형 대화 데이터 수집 과정에서 챗봇의 감정 분석 오독률이 높고, 잠재적인 유해 문항 방지를 위한 데이터 가이드라인 및 검증 체계가 부재하여 신뢰할 수 없는 인터랙션 발생.',
    hypothesisLogic: 'RAG(Retrieval-Augmented Generation) 기법과 프롬프트 체이닝을 결합하여 전문 상담사 가이드라인을 데이터셋으로 통합하면, 챗봇의 공감 능력과 답변 신뢰도를 동시 개선할 수 있다고 가정.',
    methodologyQA: {
      methodology: '고품질 상담 도메인 텍스트 임베딩을 위한 벡터 데이터베이스 구축. 다단계 추론 모델(Chain of Thought)을 통한 인터랙션 품질 정량화 체계 도입.',
      qaPoint: 'LLM의 환각 현상 및 공격적 답변 방지를 위한 Edge Case 데이터셋 구축. 답변 정합성(Consistency)과 독성 테스트(Toxicity Check)를 통한 시스템 안정성 보장.'
    },
    insightImpact: '사용자 만족도 조사 공감 지수 72% 향상 및 답변 정합성 오류 40% 감소. 심리 상담 보조 도구로서의 데이터적 실효성을 입증하고 안전한 AI 환경 구축.'
  },
  'DATA/QA': {
    id: 'DATA/QA',
    type: 'G',
    title: '전사적 데이터 품질 보증 시스템 구축',
    color: '#0EA5E9',
    overview: {
      definition: '데이터 정합성 오류 Zero화를 위한 전주기 QA 파이프라인 설계 및 체계화',
      role: 'Lead Data Analyst / QA Strategist',
      techStack: ['SQL', 'Data Lineage', 'Automation Script', 'Metabase']
    },
    problemBackground: '의사결정의 근거가 되는 실시간 원천 데이터의 불일치 및 가비지 데이터 유입으로 인해 분석 지표의 신뢰성이 하락하고 마케팅 비용 등의 대규모 리소스 낭비가 발생하는 상황.',
    hypothesisLogic: '데이터 라이프사이클 전반에 걸친 "신뢰 경계"를 설정하고, 자동화된 유효성 검사 모듈을 데이터 파이프라인의 각 단계에 삽입함으로써 데이터 정합성을 하드웨어 수준에서 보증하려 함.',
    methodologyQA: {
      methodology: '실시간 데이터 스트리밍 유효성 검사 스크립트 배포 및 데이터 리니지(Lineage) 가시화. 전사 공통 지표 정의서(Standard UI) 구축을 통한 지표 일관성 확보.',
      qaPoint: '데이터 파싱 오류 감지를 위한 무작위 샘플링 검수 로직 및 스키마 변경 감지 알림 시스템 구축. 데이터 오너십 문화를 위한 QA 매뉴얼 전파.'
    },
    insightImpact: '데이터 정합성 오류 발생률 95% 감소 및 분석 소요 시간 효율 증대. 전사적인 Data-Driven 의사결정 체화 및 신뢰성 있는 비즈니스 인사이트 도출 시스템 확립.'
  }
};

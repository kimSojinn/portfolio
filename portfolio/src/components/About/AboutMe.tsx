import { useEffect, useRef, useState } from "react";
import memoji1 from "../../assets/images/memoji1.png";
import profileImg from "../../assets/images/profileImg.png";
// import memoji2 from "../../assets/images/memoji2.png";

import styles from "./AboutMe.module.css";

const AboutMe = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const triggerRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => {
      if (triggerRef.current) observer.unobserve(triggerRef.current);
    };
  }, [hasAnimated]);

  return (
    <section
      className={styles.mainSection}
      ref={triggerRef}
      aria-labelledby="aboutme-title"
    >
      <h2 className={styles.title} id="aboutme-title">
        About me
      </h2>

      <div className={styles.imageWrapper}>
        <img
          src={profileImg}
          alt="김소진 프로필"
          className={styles.profileImg}
        />
        {/* <img
          src={memoji1}
          alt="프론트엔드 개발자 김소진의 미모지 이미지"
          className={`${styles.image} ${styles.default}`}
        /> */}
        <img
          src={memoji1}
          alt=""
          aria-hidden="true"
          className={`${styles.image} ${styles.hover}`}
        />
      </div>

      <div className={styles.descBox}>
        <p className={`${styles.desc} ${hasAnimated ? styles.animate : ""}`}>
          기술로 사회의 장벽을 허물고, <br />
          누구나 차별 없이 이용할 수 있는 UI/UX를
        </p>
        <p
          className={`${styles.role} ${hasAnimated ? styles.animateDelay : ""}`}
        >
          만들고자 하는 <strong>김소진</strong> 입니다.
        </p>

        <span className={styles.memo}>
          * 채용공고에 주어진 사전 질문을 포트폴리오에 녹여두었습니다!
        </span>

        <dl className={styles.questionBox}>
          <dt>💡 웹 접근성이 무엇인가요?</dt>
          <dd className={styles.answer}>
            웹 접근성은 사용자 개개인의 신체적 조건이나 연령, 사용 환경과
            관계없이 누구나 웹 콘텐츠에 동등하게 접근하고 이해하며 기능을 활용할
            수 있도록 보장하는 것을 말합니다. 웹은 모든 사람에게 열려 있어야
            하며, 웹 접근성은 이를 위한 필수 조건입니다.
            <br /> 최근 고령 인구가 늘어나고 있으며 모바일 기기나 음성 기반
            인터페이스 등 웹을 사용하는 방식도 점점 다양해지고 있습니다. 이처럼
            사용자 특성과 환경이 다양해지면서, 웹 접근성을 고려해야 할 필요성도
            더욱 커지고 있습니다. 또한 장애 여부를 떠나 누구나 일시적으로 손을
            자유롭게 쓰기 어렵거나 밝은 야외에서 화면을 보기 힘든 상황을 겪을 수
            있습니다.
            <br /> 결론적으로, 웹 접근성은 다양한 상황에 처한 사용자 누구나 웹을
            동등하게 이용할 수 있도록 보장하는 것입니다. 단순히 일부의 불편을
            줄이는 수준을 넘어 웹의 정보와 서비스를 제약 없이 활용할 수 있도록
            합니다.
            <br />
            <strong>
              웹 접근성은 특정 사용자만을 위한 선택이 아니라 모두를 위한 기본
              가치로 자리잡아야 합니다.
            </strong>
          </dd>
        </dl>

        <dl className={styles.questionBox}>
          <dt>
            💡 웹 접근성을 준수하기 위한 마크업 방법 3가지와 그 이유를 작성해
            주세요.
          </dt>
          <dd className={styles.answer}>
            • 웹 접근성을 고려한 마크업의 첫 번째 핵심은{" "}
            <strong>시맨틱한 HTML 태그 작성</strong>입니다.
            <br />
            단순한 시각적 구성을 우선하기 보다는, 각 영역의 의미를 태그로 명확히
            표현해야 합니다. <br /> 예를 들어 페이지의 주 콘텐츠는 &lt;main&gt;,
            내비게이션 영역은 &lt;nav&gt;, 반복되는 카드형 콘텐츠는
            &lt;article&gt;, 클릭 가능한 요소는 &lt;button&gt;으로 구성하는 것이
            바람직합니다.
            <br />
            이렇게 의미에 맞는 태그를 사용하면 보조기기 사용자들은 웹의 구조를
            쉽게 파악할 수 있고, 스크린리더는 각 영역을 정확히 구분하여 읽어줄
            수 있습니다. 시맨틱 태그는 접근성을 위한 기술이면서도, 동시에
            유지보수성과 검색 최적화(SEO) 측면에서도 큰 장점을 가집니다. 시각적
            레이아웃만을 고려한 마크업에서 벗어나, 의미 중심의 설계가 이루어져야
            한다고 생각합니다.
            <br />
            <br />• 두 번째는{" "}
            <strong>이미지에 대체 텍스트(alt 속성)를 제공하는 것</strong>입니다.
            <br />
            이미지는 웹에서 시각적으로 많은 정보를 전달하지만, 시각장애인에게는
            alt 속성이 유일한 설명 수단이 됩니다. 주의할 점은 alt 텍스트는
            이미지의 모양이 아니라, 그 의미나 기능 중심으로 작성되어야 합니다.
            <br />
            예를 들어 ‘장바구니 아이콘’은 alt="장바구니 담기"처럼 사용자 동작을
            설명하는 방식이 더 적절합니다.
            <br />
            반대로 장식용 이미지에는 alt=""을 명시해 스크린리더가 무시하도록
            설정해야 불필요한 정보 전달을 막을 수 있습니다. alt는 간단해
            보이지만, 사용자 입장에서는 콘텐츠를 이해할 수 있는 핵심 도구이기
            때문에 상황에 맞게 작성하는 것이 중요합니다.
            <br />
            <br />• 마지막으로 {""}
            <strong>키보드 접근성과 포커스 순서를 고려한</strong> 마크업이
            중요합니다.
            <br /> 마우스를 사용할 수 없는 키보드 기반 환경에서는 웹의 모든
            기능이 키보드만으로도 접근 가능해야 합니다. 이를 위해 버튼, 링크, 폼
            요소 등 모든 인터랙션 요소에 반드시 포커스가 닿아야 하며 포커스 탐색
            순서 또한 시각적·논리적 흐름에 맞게 구성되어야 합니다.
            <br />
            예를 들어 로그인 페이지에서 입력창이나 로그인 버튼에 포커스가 닿지
            않으면 사용자는 정보를 입력하거나 로그인할 수 없습니다. 이런
            요소들이 tabindex="-1"처럼 포커스를 받을 수 없게 설정되어 있거나 DOM
            구조가 흐름과 맞지 않게 작성되면 키보드 사용자에게 웹페이지가 사실상
            '사용 불가능'해집니다.
            <br />
            특히 커스텀 UI를 구성할 때는 tabindex를 적절히 설정해 포커스 이동을
            제어하고 role과 aria-* 속성을 활용해 각 요소의 역할과 상태를
            명확하게 전달해야 합니다. 포커스가 끊기거나 탐색 순서가 왜곡되면
            사용자에게 큰 혼란을 줄 수 있으므로 이는 단순한 옵션이 아닌 웹
            접근성의 핵심 요소입니다.
          </dd>
        </dl>
      </div>
    </section>
  );
};

export default AboutMe;

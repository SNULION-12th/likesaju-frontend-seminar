import { Button } from 'components/button';
import { SectionLayout } from './section-layout';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

const GRADIENT_TOP_START_COLOR = '#170F49';
const GRADIENT_TOP_END_COLOR = '#E3E6F7';
const GRADIENT_BOTTOM_START_COLOR = '#6F6C8F';
const GRADIENT_BOTTOM_END_COLOR = '#F7F7F7';

export const MainSection = () => {
  const sectionRef = useRef(null);
  const designOuterRef = useRef(null);
  const designInnerRef = useRef(null);
  const welcomeMsgRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);
  const lionRef = useRef(null);

  const [windowHeight, setWindowHeight] = useState(window.innerHeight); // 상태로 윈도우 높이를 관리
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // 상태로 윈도우 너비를 관리
  const [initialViewportWidth] = useState(window.innerWidth);

  const maxScroll = windowHeight * 5;

  const initialScale = window.innerWidth > 768 ? 0.6 : 0.3;

  useEffect(() => {
    // 리사이즈 후 스크롤 위치에 맞는 애니메이션 상태를 유지
    const handleScroll = () => {
      const scrollY = window.scrollY;
      interpolateBackground(scrollY);
      interpolateDesignPosition(scrollY);
    };

    const handleResize = () => {
      setWindowHeight(window.innerHeight); // 리사이징 시 height 값 업데이트
      setWindowWidth(window.innerWidth); // 리사이징 시 width 값 업데이트
    };

    // 초기 애니메이션 적용
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize); // 리사이징 이벤트 처리

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [windowHeight, windowWidth]); // 윈도우 크기 변화에 따라 업데이트

  const interpolateDesignPosition = (scrollY) => {
    // 리사이즈된 화면 크기에 맞게 비율 계산
    const factor1 =
      scrollY < maxScroll / 2
        ? 0
        : Math.min(((scrollY - maxScroll / 2) * 2) / maxScroll, 1);

    const originalX = designOuterRef.current.getBoundingClientRect().x;
    const offsetXFromMiddle = windowWidth / 2 - (originalX + 170);

    if (designInnerRef.current) {
      gsap.to(designInnerRef.current, {
        x: offsetXFromMiddle * (1 - factor1),
      });
    }

    const factor2 = Math.min(scrollY / (maxScroll / 2), 1);
    const viewportYMiddle = windowHeight / 2;

    const scaleFactor = Math.min(
      initialScale,
      windowWidth / initialViewportWidth,
    );

    if (welcomeMsgRef.current) {
      gsap.to(welcomeMsgRef.current, {
        y: -50,
        opacity: 1 - factor2,
      });
    }

    if (card1Ref.current) {
      gsap.to(card1Ref.current, {
        x: (-300 + 30 * factor2) * (windowWidth / 1920),
        y: -80 * factor2,
        rotate: -45 * factor2,
        scale: scaleFactor,
      });
    }

    if (card2Ref.current) {
      gsap.to(card2Ref.current, {
        x: -100 * (windowWidth / 1920),
        y: -160 * factor2,
        rotate: -15 * factor2,
        scale: scaleFactor,
      });
    }

    if (card3Ref.current) {
      gsap.to(card3Ref.current, {
        x: 100 * (windowWidth / 1920),
        y: -160 * factor2,
        rotate: 15 * factor2,
        scale: scaleFactor,
      });
    }

    if (card4Ref.current) {
      gsap.to(card4Ref.current, {
        x: (300 - 30 * factor2) * (windowWidth / 1920),
        y: -80 * factor2,
        rotate: 45 * factor2,
        scale: scaleFactor,
      });
    }

    if (lionRef.current) {
      gsap.to(lionRef.current, {
        y: viewportYMiddle * 1.5 * (1 - factor2),
        scale: scaleFactor,
      });
    }
  };

  const interpolateBackground = (scrollY) => {
    // 리사이즈된 화면 크기에 맞게 비율 계산
    const factor = Math.min(scrollY / maxScroll, 1);

    if (sectionRef.current) {
      gsap.to(sectionRef.current, {
        background: `linear-gradient(to bottom,
          ${gsap.utils.interpolate(GRADIENT_TOP_START_COLOR, GRADIENT_TOP_END_COLOR, factor)},
          ${gsap.utils.interpolate(GRADIENT_BOTTOM_START_COLOR, GRADIENT_BOTTOM_END_COLOR, factor)}
        )`,
        duration: 0,
        ease: 'none',
      });
    }
  };

  return (
    <SectionLayout
      outerLayerClassName={'h-[500vh] flex items-start'}
      innerLayerClassName={`sticky top-[80px] h-[calc(100vh-80px)]`}
      innerLayerRef={sectionRef}
    >
      <div className="relative flex flex-col w-full gap-8 items-start mobile:items-center">
        <div className="flex flex-col items-start mobile:items-center gap-8">
          <h1 className="text-[64px] mobile:text-[32px] leading-normal whitespace-pre-wrap text-left mobile:text-center nanum-extra-bold text-black dark:text-white">
            <span>멋쟁이</span>{' '}
            <s className="text-gray-500 dark:text-gray-400">사자</s>
            {'\n'}
            <span>사주처럼</span>
          </h1>
          <p className="text-lg mobile:text-sm text-left mobile:text-center mobile:whitespace-pre-wrap dark:text-white">
            {'오늘의 사주 운세를 확인하고,\n친구에게 공유하자!'}
          </p>
          <a href="/saju">
            <Button>멋사주 시작하기</Button>
          </a>
        </div>
        <div
          ref={designOuterRef}
          className="absolute -bottom-10 right-0 size-[340px]"
        >
          <div
            className="w-full h-full flex justify-center"
            ref={designInnerRef}
          >
            <p
              ref={welcomeMsgRef}
              className="font-extrabold text-[44px] mobile:text-[28px] text-white text-nowrap w-fit"
            >
              오늘의 운세가 궁금해?
            </p>
            <img
              ref={lionRef}
              src="/images/snulion.png"
              className="absolute z-50 mobile:scale-[50%] object-contain mobile-small:scale-[30%]"
              alt="Main Illustration"
            />
            <img
              ref={card1Ref}
              src="/images/card1.png"
              className="absolute scale-[60%] mobile:scale-[30%] object-contain mobile-small:scale-[20%]"
              alt="Card1 Illustration"
            />
            <img
              ref={card2Ref}
              src="/images/card2.png"
              className="absolute scale-[60%] mobile:scale-[30%] object-contain mobile-small:scale-[20%]"
              alt="Card2 Illustration"
            />
            <img
              ref={card3Ref}
              src="/images/card3.png"
              className="absolute scale-[60%] mobile:scale-[30%] object-contain mobile-small:scale-[20%]"
              alt="Card3 Illustration"
            />
            <img
              ref={card4Ref}
              src="/images/card4.png"
              className="absolute scale-[60%] mobile:scale-[30%] object-contain mobile-small:scale-[20%]"
              alt="Card4 Illustration"
            />
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};

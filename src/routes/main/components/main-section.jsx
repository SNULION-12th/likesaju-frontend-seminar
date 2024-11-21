import { Button } from 'components/button';
import { SectionLayout } from './section-layout';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const MainSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const lionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Title animation
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          opacity: 1 - scrollY / viewportHeight,
          y: scrollY * 0.2,
        });
      }

      // Description animation
      if (descriptionRef.current) {
        gsap.to(descriptionRef.current, {
          opacity: 1 - scrollY / (viewportHeight * 1.2),
          y: scrollY * 0.3,
        });
      }

      // Button animation
      if (buttonRef.current) {
        gsap.to(buttonRef.current, {
          opacity: 1 - scrollY / (viewportHeight * 1.5),
          y: scrollY * 0.4,
        });
      }

      // Lion image animation
      if (lionRef.current) {
        gsap.to(lionRef.current, {
          y: scrollY * 0.5,
          scale: 1 - scrollY / (viewportHeight * 2),
          opacity: 1 - scrollY / (viewportHeight * 1.5),
        });
      }

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.to(card, {
            y: scrollY * (0.4 + index * 0.1),
            rotate: scrollY * (0.1 + index * 0.05),
            opacity: 1 - scrollY / (viewportHeight * 1.8),
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <SectionLayout>
      <div
        ref={sectionRef}
        className="flex flex-col w-full gap-6 sm:gap-8 items-start relative"
      >
        {/* Title */}
        <h1
          ref={titleRef}
          className="text-[36px] sm:text-[64px] leading-snug sm:leading-normal whitespace-pre-wrap text-left nanum-extra-bold text-black dark:text-white"
        >
          <span>멋쟁이</span>{' '}
          <s className="text-gray-500 dark:text-gray-400">사자</s>
          {'\n'}
          <span>사주처럼</span>
        </h1>

        {/* Description */}
        <p
          ref={descriptionRef}
          className="text-sm sm:text-lg text-left text-gray-800 dark:text-gray-300"
        >
          오늘의 사주 운세를 확인하고, 친구에게 공유하자!
        </p>

        {/* Button */}
        <a href="/saju" ref={buttonRef}>
          <Button className="w-full sm:w-auto">멋사주 시작하기</Button>
        </a>

        {/* Images */}
        <div className="relative w-full h-[200px] sm:w-[341px] sm:h-[329px] mt-6 sm:mt-0">
          <img
            ref={lionRef}
            src="/images/snulion.png"
            className="absolute z-50 object-contain w-[150px] h-[150px] sm:w-auto sm:h-auto mx-auto left-1/2 -translate-x-1/2 bottom-0 sm:right-[20vw]"
            alt="Main Illustration"
          />

          {['card1.png', 'card2.png', 'card3.png', 'card4.png'].map(
            (img, index) => (
              <img
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                src={`/images/${img}`}
                className={`absolute scale-[50%] sm:scale-[60%] object-contain ${
                  index === 0
                    ? 'left-1/4 sm:left-[77px] -translate-x-[50%] sm:-translate-x-[75%]'
                    : index === 1
                    ? 'left-1/2 sm:left-[77px] -translate-x-[50%] sm:-translate-x-[30%]'
                    : index === 2
                    ? 'right-1/2 sm:left-[77px] translate-x-[50%] sm:translate-x-[30%]'
                    : 'right-1/4 sm:left-[77px] translate-x-[50%] sm:translate-x-[75%]'
                }`}
                alt={`Card${index + 1} Illustration`}
              />
            )
          )}
        </div>
      </div>
    </SectionLayout>
  );
};

import { SectionLayout } from './section-layout';
import { useState } from 'react';

export const FAQSection = () => {
  const faqAccordionInfo = [
    {
      question: 'Q. 사주 운세를 확인하고 싶은데, 비용은 무료인가요?',
      answer: '첫 번째 질문에 대한 답변입니다.',
    },
    {
      question: 'Q. 어떤 기술이 활용되었나요?',
      answer: '두 번째 질문에 대한 답변입니다.',
    },
    {
      question: 'Q. 세 번째 질문입니다.',
      answer: '세 번째 질문에 대한 답변입니다.',
    },
  ];

  return (
    <SectionLayout>
      <div className="w-full flex flex-col gap-10 sm:gap-20">
        <h3 className="text-3xl sm:text-4xl nanum-extra-bold text-left">FAQs</h3>
        <div className="flex flex-col gap-4 sm:gap-10">
          {faqAccordionInfo.map((accordion) => (
            <FAQAccordion
              key={accordion.question}
              question={accordion.question}
              answer={accordion.answer}
            />
          ))}
        </div>
      </div>
    </SectionLayout>
  );
};

const FAQAccordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col rounded-xl px-6 py-4 sm:px-10 sm:py-8 shadow-lg">
      <div className="flex justify-between items-center">
        <p className="text-lg sm:text-xl font-bold truncate">{question}</p>
        <button
          className="rounded-full shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className={`transition transform ${isOpen ? '' : '-rotate-90'}`}
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <circle cx="20" cy="20" r="20" fill={isOpen ? '#6F6C90' : '#FFFFFF'} />
            <path
              d="M12 15L20 23L28 15"
              stroke={isOpen ? '#FFFFFF' : '#6F6C90'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      {isOpen && <p className="text-sm sm:text-lg mt-4">{answer}</p>}
    </div>
  );
};

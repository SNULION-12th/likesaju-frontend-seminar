import { Button } from 'components/button';
import { SectionLayout } from './section-layout';

export const ShareSection = () => {
  const shareCardInfo = [
    {
      title: 'STEP 1',
      description: '오늘의 운세를 확인하세요',
      img: '/images/capture1.png',
    },
    {
      title: 'STEP 2',
      description: '공유할 친구를 선택하세요',
      img: '/images/capture2.png',
    },
  ];

  return (
    <SectionLayout>
      <div className="w-full h-full flex flex-col gap-[80px]">
        {/* 헤더 섹션 */}
        <div className="w-full flex mobile:flex-col mobile:gap-4 justify-between items-center">
          <div className="space-y-6 mobile:space-y-2">
            <h3 className="text-left text-4xl nanum-extra-bold text-neutral-800 mobile:text-center mobile:text-2xl">
              사주 공유하기
            </h3>
            <p className="text-xl font-bold text-neutral-800 mobile:text-center mobile:text-sm">
              채팅으로 사주를 공유해보세요
            </p>
          </div>
          <a href="/chat">
            <Button
              className="w-[250px] h-[50px] mobile:w-[180px] mobile:h-[40px] mobile:text-sm"
              isRounded={true}
            >
              1:1 채팅 하러가기
            </Button>
          </a>
        </div>

        {/* 카드 섹션 */}
        <div className="flex gap-10 justify-center mobile:self-center mobile:flex-col mobile:w-fit mobile:grid-cols-1">
          {shareCardInfo.map((card) => (
            <ShareCard
              key={card.title}
              title={card.title}
              description={card.description}
              img={card.img}
            />
          ))}
        </div>
      </div>
    </SectionLayout>
  );
};

const ShareCard = ({ title, description, img }) => {
  return (
    <div className="flex flex-col rounded-xl shadow-md max-w-[450px] max-h-[378px] overflow-hidden mobile:max-w-[340px] mobile:max-h-[240px]">
      <img
        src={img}
        alt={title}
        className="w-full h-auto max-h-[200px] mobile:max-h-[120px] object-cover"
      />
      <div className="p-4 flex flex-col items-start gap-2 mobile:p-3 mobile:gap-1">
        <h4 className="text-base font-normal text-neutral-800 mobile:text-sm">
          {title}
        </h4>
        <p className="text-xl font-extrabold text-neutral-800 mobile:text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

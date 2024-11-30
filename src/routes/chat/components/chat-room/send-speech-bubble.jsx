export const SendSpeechBubble = ({ text }) => {
  return (
    <div className="flex max-w-[800px] px-[16px] py-[12px] justify-center items-center gap-[8px] rounded-[16px_16px_4px_16px] bg-[#4A3AFF]">
      <p
        className="text-white font-pretendard text-[18px] font-semibold leading-[27px]"
        dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br />') }}
      />
    </div>
  );
};

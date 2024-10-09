import { PAYMENT_HISTORY_LOCALIZER } from 'assets/localizer';
import styles from './modal.module.scss';

export const PaymentHistoryDetailModal = ({ history, close }) => {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50 top-0 left-0">
      <div
        className={`w-[532px] bg-white rounded-[18px] shadow-md px-[30px] py-5 ${styles.float}`}
      >
        <div className="flex justify-end">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
            onClick={close}
          >
            <path
              d="M23.875 8.13754C23.7594 8.02166 23.622 7.92972 23.4708 7.86699C23.3196 7.80427 23.1575 7.77198 22.9938 7.77198C22.8301 7.77198 22.668 7.80427 22.5168 7.86699C22.3655 7.92972 22.2282 8.02166 22.1125 8.13754L16 14.2375L9.88754 8.12504C9.77181 8.00931 9.63442 7.91751 9.48321 7.85488C9.33201 7.79225 9.16995 7.76001 9.00629 7.76001C8.84262 7.76001 8.68056 7.79225 8.52936 7.85488C8.37815 7.91751 8.24076 8.00931 8.12504 8.12504C8.00931 8.24076 7.91751 8.37815 7.85488 8.52936C7.79225 8.68056 7.76001 8.84262 7.76001 9.00629C7.76001 9.16995 7.79225 9.33201 7.85488 9.48321C7.91751 9.63442 8.00931 9.77181 8.12504 9.88754L14.2375 16L8.12504 22.1125C8.00931 22.2283 7.91751 22.3656 7.85488 22.5169C7.79225 22.6681 7.76001 22.8301 7.76001 22.9938C7.76001 23.1574 7.79225 23.3195 7.85488 23.4707C7.91751 23.6219 8.00931 23.7593 8.12504 23.875C8.24076 23.9908 8.37815 24.0826 8.52936 24.1452C8.68056 24.2078 8.84262 24.2401 9.00629 24.2401C9.16995 24.2401 9.33201 24.2078 9.48321 24.1452C9.63442 24.0826 9.77181 23.9908 9.88754 23.875L16 17.7625L22.1125 23.875C22.2283 23.9908 22.3656 24.0826 22.5169 24.1452C22.6681 24.2078 22.8301 24.2401 22.9938 24.2401C23.1574 24.2401 23.3195 24.2078 23.4707 24.1452C23.6219 24.0826 23.7593 23.9908 23.875 23.875C23.9908 23.7593 24.0826 23.6219 24.1452 23.4707C24.2078 23.3195 24.2401 23.1574 24.2401 22.9938C24.2401 22.8301 24.2078 22.6681 24.1452 22.5169C24.0826 22.3656 23.9908 22.2283 23.875 22.1125L17.7625 16L23.875 9.88754C24.35 9.41254 24.35 8.61254 23.875 8.13754Z"
              fill="#333333"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-3 items-center mt-[10px]">
          <PaymentHistoryDetailModalRow
            label="포인트"
            value={`${history.item_name} 포인트`}
          />
          <PaymentHistoryDetailModalRow
            label="결제 금액"
            value={`${history.amount.total}원`}
          />
          <PaymentHistoryDetailModalRow
            label="결제 방법"
            value={
              PAYMENT_HISTORY_LOCALIZER.Korean[history.payment_method_type]
            }
          />
          <PaymentHistoryDetailModalRow
            label="결제 일시"
            value={new Intl.DateTimeFormat('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }).format(new Date(history.approved_at))}
          />
          <PaymentHistoryDetailModalRow
            label="결제 상태"
            value={PAYMENT_HISTORY_LOCALIZER.Korean[history.status]}
          />
        </div>
      </div>
    </div>
  );
};

const PaymentHistoryDetailModalRow = ({ label, value }) => {
  return (
    <div className="flex w-full justify-between ">
      <span className="text-gray-500 font-bold">{label}</span>
      <span className="text-black font-semibold">{value}</span>
    </div>
  );
};

import { useState, useEffect } from 'react';
import { getPaymentHistory } from 'apis/api';
import { PAYMENT_HISTORY_LOCALIZER } from 'assets/localizer';
import { PaymentHistoryDetailModal } from 'components/modals/payment-history-detail';
export default function PaymentHistoryPage() {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(null);

  useEffect(() => {
    getPaymentHistory().then((data) => {
      setPaymentHistory(data);
    });
  }, []);

  return (
    <>
      {selectedHistory && (
        <PaymentHistoryDetailModal
          history={selectedHistory}
          close={() => setSelectedHistory(null)}
        />
      )}
      <div className="p-5">
        <h3 className="text-2xl font-bold">포인트 충전 내역</h3>
        <section className="mt-5">
          <table className="w-full">
            <thead className="bg-neutral-300 h-12">
              <tr>
                <th>포인트</th>
                <th>결제 금액</th>
                <th>결제 방법</th>
                <th>결제 일시</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory?.map((history, i) => (
                <PaymentHistoryItem
                  key={i}
                  history={history}
                  onClick={() => setSelectedHistory(history)}
                />
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}

const PaymentHistoryItem = ({ history, onClick }) => {
  return (
    <tr
      className="py-6 border-b border-gray-300  rounded-sm h-12 cursor-pointer"
      onClick={onClick}
    >
      <td>{history.item_name} 포인트</td>
      <td>{history.amount.total}원</td>
      <td>{PAYMENT_HISTORY_LOCALIZER.Korean[history.payment_method_type]}</td>
      <td>
        {new Intl.DateTimeFormat('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).format(new Date(history.approved_at))}
      </td>
    </tr>
  );
};

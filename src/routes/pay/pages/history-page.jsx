import React, { useEffect, useState } from 'react';
import { fetchAllPaymentHistory } from 'apis/api';
import styled from 'styled-components';

const HistoryContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2em;
  color: #333;
  margin-bottom: 20px;
`;

const PaymentCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PaymentItem = styled.p`
  font-size: 1.1em;
  margin: 5px 0;
  color: #555;
`;

const ApprovedAt = styled.p`
  font-size: 0.9em;
  color: #888;
`;

const NoHistory = styled.p`
  text-align: center;
  font-size: 1.2em;
  color: #888;
`;

const LoadingText = styled.div`
  text-align: center;
  font-size: 1.5em;
  color: #555;
`;

export const HistoryPage = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const history = await fetchAllPaymentHistory();

        if (Array.isArray(history)) {
          setPaymentHistory(history);
        } else {
          setPaymentHistory([]);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching payment history:', error);
        setPaymentHistory([]);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingText>Loading...</LoadingText>;
  }

  return (
    <HistoryContainer>
      <Title>결제 내역</Title>
      {paymentHistory.length === 0 ? (
        <NoHistory>결제 내역이 없습니다.</NoHistory>
      ) : (
        paymentHistory.map((payment, index) => (
          <PaymentCard key={index}>
            <PaymentItem>상품 이름: {payment.item_name}</PaymentItem>
            <PaymentItem>결제 금액: {payment.amount}원</PaymentItem>
            <PaymentItem>결제 수단: {payment.payment_method_type}</PaymentItem>
            <ApprovedAt>
              결제 승인 시간: {new Date(payment.approved_at).toLocaleString()}
            </ApprovedAt>
          </PaymentCard>
        ))
      )}
    </HistoryContainer>
  );
};

export default HistoryPage;

import React, { useEffect, useState } from 'react';
import { getPaymentHistory } from 'apis/api';

export const PaymentHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        // 주문 조회 API 호출
        const getPaymentList = async () => {
            try {
                const tid = localStorage.getItem('tid');
                const res = await getPaymentHistory(tid);
                console.log('API:', res);
                if (Array.isArray(res)) {
                    setHistory(res);
                } else {
                    console.error('결제 내역을 불러오는 데 실패했습니다.');
                }
            } catch (error) {
                console.error('API 호출 중 오류 발생:', error);
            }
        };

        getPaymentList();
    }, []);

    return (
        <div>
            <h2 className='font-bold text-xl my-16'>결제 내역</h2>
            {history.length > 0 ? (
                history.map((item, index) => (
                    <div key={index} className="flex justify-around text-lg">
                        <p>{item.item_name}</p>
                        <p>{item.amount}원</p>
                        <p>{item.payment_method_type}</p>
                        <p>{new Date(item.approved_at).toLocaleString()}</p>
                    </div>
                ))
            ) : (
                <p>결제 내역이 없습니다.</p>
            )}
        </div>
    );
}

export default PaymentHistory;
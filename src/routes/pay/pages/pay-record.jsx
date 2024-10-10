import { payRecord } from 'apis/api';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function PayRecord() {
  // userSlice에 저장되어 있는 tid 값 가져오기
  const { tid } = useSelector((data) => data.user);

  const [PayRecord, setPayRecord] = useState([]);

  const getPayRecord = async () => {
    const payRecordData = await payRecord(tid);
    setPayRecord(payRecordData);
  };

  useEffect(() => {
    getPayRecord();
  }, [tid]);

  return (
    <div>
      {PayRecord.amount ? (
        <>
          <h1>
            <strong>구매 상품 이름</strong>
          </h1>
          <div>{PayRecord.item_name}</div>
          <h1>
            <strong>구매 상품 가격</strong>
          </h1>
          <div>{PayRecord.amount.discount}</div>
          <div>{PayRecord.amount.green_deposit}</div>
          <div>{PayRecord.amount.point}</div>
          <div>{PayRecord.amount.tax_free}</div>
          <div>{PayRecord.amount.total}</div>
          <div>{PayRecord.amount.vat}</div>
          <h1>
            <strong>구매 방법</strong>
          </h1>
          <div>{PayRecord.payment_method_type}</div>
          <h1>
            <strong>구매 승인 시각</strong>
          </h1>
          <div>{PayRecord.approved_at}</div>{' '}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default PayRecord;

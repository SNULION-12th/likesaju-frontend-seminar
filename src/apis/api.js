import { instance, instanceWithToken } from './axios';
import { getCookie } from '../utils/cookie';
import axios from 'axios';

export const signIn = async (data) => {
  try {
    const response = await instance.post('/user/signin/', data);
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const signUp = async (data) => {
  try {
    const response = await instance.post('/user/signup/', data);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const signOut = async () => {
  try {
    const response = await instanceWithToken.post('/user/signout/', {
      refresh: getCookie('refresh_token'),
    });
    if (response.status === 204) {
      return response.data;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const kakaoSignIn = async (data) => {
  try {
    const response = await instance.post(
      '/user/kakao/callback/?code=' + data.code,
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const fetchUserInfo = async () => {
  try {
    const response = await instanceWithToken.get('/user/me');
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const userInfoUpdate = async (data) => {
  try {
    const response = await instanceWithToken.put(`/user/me/`, data);
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const checkDuplicateUser = async (data) => {
  try {
    const response = await instance.post(`/user/check/`, data);
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};
export const reducePoint = async (point) => {
  try {
    const response = await instanceWithToken.put('/user/pointreduce/', {
      point_to_deduct: point,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const paymentReady = async ({ point, price }) => {
  try {
    const res = await instanceWithToken.post('/payment/ready/', {
      cid: process.env.REACT_APP_KAKAO_PAY_CID,
      partner_order_id: 'POID1234',
      partner_user_id: 'PUID1234',
      item_name: point.toString(),
      quantity: 1,
      total_amount: parseInt(price.replaceAll(',', '')),
      tax_free_amount: 0,
      approval_url: 'http://localhost:3000/approval',
      cancel_url: 'http://localhost:3000/cancel',
      fail_url: 'http://localhost:3000/fail',
    });
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getPointList = async () => {
  try {
    const response = await instance.get('/point/');
    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

// Function to approve a payment
export const paymentApprove = async (tid, pg_token) => {
  try {
    const res = await instanceWithToken.post('/payment/approve/', {
      pg_token: pg_token,
      tid: tid,
      cid: process.env.REACT_APP_KAKAO_PAY_CID,
    });

    if (res.status === 200) {
      return res.data; // Return response containing tid
    } else {
      console.error('Error approving payment:', res);
    }
  } catch (e) {
    console.error('Exception during payment approval:', e);
  }
};

export const fetchAllPaymentHistory = async () => {
  try {
    const res = await instanceWithToken.get('/payment/history/');
    if (res.status === 200) {
      return res.data; // Return the list of payment history
    } else {
      return []; // Return an empty array if response is not 200 OK
    }
  } catch (e) {
    console.error('Error fetching payment history:', e);
    return []; // Return an empty array in case of error
  }
};

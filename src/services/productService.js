import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://pos-software-with-my-sql-test.vercel.app/api/v1',
  headers: {
    'Content-Type': 'application/json',

  },
});

export const getProductByBarcode = (barcode, token) => {
  return apiClient.get(`/purchase/get-purchase-single?search=${barcode}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

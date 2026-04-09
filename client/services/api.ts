import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

export const getTransactions = () => API.get("/transactions");
export const createTransaction = (data: any) => API.post("/transactions", data);
export const updateTransaction = (id: string, data: any) =>
  API.put(`/transactions/${id}`, data);
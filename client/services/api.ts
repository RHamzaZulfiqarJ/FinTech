import axios from "axios";
import API from "@/lib/api";

export const getTransactions = () => API.get("/transactions");
export const createTransaction = (data: any) => API.post("/transactions", data);
export const updateTransaction = (id: string, data: any) =>
  API.put(`/transactions/${id}`, data);
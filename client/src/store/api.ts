import axios from "axios";
import { TransactionData } from "./types";

export function getTransactionList() {
	return axios.get("/api/trans")
		.then((res: any) => Promise.resolve(res.data));
}

export function getTransaction(transactionId: string) {
	return axios.get(`/api/trans/${transactionId}`)
		.then((res: any) => Promise.resolve(res.data));
}

export function createTransaction(transactionData: TransactionData) {
	return axios.post("/api/trans", transactionData)
		.then((res: any) => Promise.resolve(res.data));
}

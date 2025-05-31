import { Timestamp, DocumentData } from "firebase/firestore";
import { Expense } from "@/types";

export const expenseConverter = {
  toFirestore(expense: Expense): DocumentData {
    return expense;
  },
  fromFirestore(snapshot: any): Expense {
    const data = snapshot.data();
    return {
      ...data,
      createdAt: data.createdAt as Timestamp,
      approvedAt: data.approvedAt ? (data.approvedAt as Timestamp) : undefined,
    };
  },
};

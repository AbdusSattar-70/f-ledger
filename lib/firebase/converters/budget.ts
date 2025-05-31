import { Timestamp, DocumentData } from "firebase/firestore";
import { Budget } from "@/types";

export const budgetConverter = {
  toFirestore(budget: Budget): DocumentData {
    return budget;
  },
  fromFirestore(snapshot: any): Budget {
    const data = snapshot.data();
    return {
      ...data,
      startDate: data.startDate as Timestamp,
      endDate: data.endDate as Timestamp,
    };
  },
};

import { Asset } from "@/types";
import { Timestamp, DocumentData } from "firebase/firestore";

export const assetConverter = {
  toFirestore(asset: Asset): DocumentData {
    return asset;
  },
  fromFirestore(snapshot: any): Asset {
    const data = snapshot.data();
    return { ...data, createdAt: data.createdAt as Timestamp };
  },
};

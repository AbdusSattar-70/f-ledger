import { Timestamp } from "firebase/firestore";

// 👤 User Management
export interface User {
  id: string;
  name: string;
  avatar: string | null;
  email: string;
  role: "leader" | "co_leader" | "member";
  groupId: string;
  createdAt: Timestamp;
}

// 👥 Group
export interface Group {
  id: string;
  name: string;
  leaderId: string;
  memberIds: string[];
  currency: string;
  createdAt: Timestamp;
}

// 📂 Categories
export interface Category {
  id: string;
  name: string;
  description: string;
  groupLabel?: string;
  createdAt: Timestamp;
}

export interface GlobalCategoryTemplate {
  id: string;
  name: string;
  description: string;
  default: boolean;
}

// 💰 Asset (money source)
export interface Asset {
  id: string;
  type: "cash" | "petty_cash" | "virtual_cash" | "bank";
  label: string;
  balance: number;
  locationDetails?: string;
  ownedBy: string; // userId (typically the leader)
  groupId: string;
  createdAt: Timestamp;
}

// 📊 Monthly Budget
export interface Budget {
  id: string;
  name: string; // e.g., "May 2025"
  period: "monthly";
  startDate: Timestamp;
  endDate: Timestamp;
  totalAmount: number;
  createdBy: string; // userId (typically leader)
  categoryAssignments: CategoryAssignment[];
  memberAllocations: MemberAllocation[];
  groupId: string;
  createdAt: Timestamp;
}

export interface CategoryAssignment {
  categoryId: string;
  assignedAmount: number;
}

export interface MemberAllocation {
  memberId: string;
  allocatedAmount: number;
  spentAmount: number; // calculated or updated on expense approval
}

// 🧾 Expense
export interface Expense {
  id: string;
  title: string;
  amount: number;
  assetId: string;
  categoryId: string;
  spentBy: string; // userId
  createdBy: string;
  groupId: string;
  createdAt: Timestamp;
  status: "pending" | "approved" | "rejected";
  approvedBy?: string;
  approvedAt?: Timestamp;
  description?: string;
}

// 🙋 Budget Request
export interface BudgetRequest {
  id: string;
  budgetId: string;
  requestedBy: string;
  amount: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
  reviewedBy?: string;
  reviewedAt?: Timestamp;
  groupId: string;
  createdAt: Timestamp;
}

// 🔄 Asset Transaction (ledger/audit trail)
export interface AssetTransaction {
  id: string;
  assetId: string;
  type: "expense" | "adjustment" | "transfer" | "replenishment";
  amount: number;
  relatedExpenseId?: string;
  description?: string;
  createdBy: string;
  groupId: string;
  createdAt: Timestamp;
}

// 🔁 Transfer between assets
export interface AssetTransfer {
  id: string;
  fromAssetId: string;
  toAssetId: string;
  amount: number;
  note?: string;
  createdBy: string;
  groupId: string;
  createdAt: Timestamp;
}

// 🧩  Category-Specific Member Allocations
export interface MemberCategoryAllocation {
  memberId: string;
  categoryId: string;
  allocatedAmount: number;
  spentAmount: number;
  budgetId: string;
  groupId: string;
}

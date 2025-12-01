import mongoose from "mongoose";

export interface WalletSlice {
  balance: number;
  lowBalanceThreshold: number;
  flags: any | null;
  lastLowBalanceNotification: Date | null;
}

export interface WalletModelAdapter {
  getWalletById(_fixerId: string): Promise<WalletSlice | null>;
  updateWalletById(_fixerId: string, _patch: Partial<WalletSlice>): Promise<void>;
}

// 👇 helper: convierte a ObjectId si es válido, sino lanza error
function normalizeId(raw: string): mongoose.Types.ObjectId {
  const s = String(raw).trim();
  if (!/^[0-9a-fA-F]{24}$/.test(s)) {
    throw new Error(`Invalid ObjectId: ${s}`);
  }
  return new mongoose.Types.ObjectId(s);
}

export function makeRawCollectionWalletAdapter(collectionName: string) {
  return {
    async getWalletById(fixerId: string) {
      if (!mongoose.connection.db) {
        throw new Error('Database not connected');
      }
      const _id = normalizeId(fixerId);
      const doc = await mongoose.connection.db
        .collection(collectionName)
        .findOne(
          { _id: _id as any },
          {
            projection: {
              "wallet.balance": 1,
              "wallet.lowBalanceThreshold": 1,
              "wallet.flags": 1,
              "wallet.lastLowBalanceNotification": 1,
            },
          }
        );
      if (!doc?.wallet) return null;
      return {
        balance: Number(doc.wallet.balance ?? 0),
        lowBalanceThreshold: Number(doc.wallet.lowBalanceThreshold ?? 0),
        flags: doc.wallet.flags ?? null,
        lastLowBalanceNotification: doc.wallet.lastLowBalanceNotification ?? null,
      };
    },

    async updateWalletById(fixerId: string, patch: any) {
      const _id = normalizeId(fixerId);
      const $set: any = { "wallet.updatedAt": new Date() };
      if (patch.balance !== undefined) $set["wallet.balance"] = patch.balance;
      if (patch.lowBalanceThreshold !== undefined) $set["wallet.lowBalanceThreshold"] = patch.lowBalanceThreshold;
      if (patch.flags !== undefined) $set["wallet.flags"] = patch.flags;
      if (patch.lastLowBalanceNotification !== undefined) $set["wallet.lastLowBalanceNotification"] = patch.lastLowBalanceNotification;

      if (!mongoose.connection.db) {
        throw new Error('Database not connected');
      }
      await mongoose.connection.db
        .collection(collectionName)
        .updateOne({ _id: _id as any }, { $set });
    },
  };
}
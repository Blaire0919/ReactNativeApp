import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type TransactionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Transaction {
  readonly id: string;
  readonly prodname?: string | null;
  readonly price?: number | null;
  readonly qty?: number | null;
  readonly totalprice?: number | null;
  readonly sellername?: string | null;
  readonly sellercontacts?: string | null;
  readonly status?: string | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Transaction, TransactionMetaData>);
  static copyOf(source: Transaction, mutator: (draft: MutableModel<Transaction, TransactionMetaData>) => MutableModel<Transaction, TransactionMetaData> | void): Transaction;
}
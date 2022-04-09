import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts";
import { Transfer } from "../generated/Token/Token";
import { Transaction } from "../generated/schema";

export function handleTransfer(event: Transfer): void {
    let txId = event.transaction.hash.toHexString().concat("-").concat(event.logIndex.toString());
    let transfer = Transaction.load(txId);

    if (transfer == null) {
        transfer = new Transaction(txId);
    }

    transfer.from = event.params.from;
    transfer.to = event.params.to;
    transfer.amount = event.params.value;
    transfer.block = event.block.number;

    transfer.save();
}
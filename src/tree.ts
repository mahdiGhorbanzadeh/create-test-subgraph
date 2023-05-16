import { Transfer as TransferEvent } from "../generated/Tree/Tree";
import { Transfer } from "../generated/schema";

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(event.params.tokenId.toString());

  entity.owner = event.params.to.toHexString();

  entity.save();
}

import { Transfer as TransferEvent } from "../generated/Tree/Tree";
import { Transfer } from "../generated/schema";
import { log } from "matchstick-as";

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(event.params.tokenId.toHexString());

  //----------- how to log in subgraph

  entity.owner = event.params.to.toHexString();
  entity.beforeOwner = event.params.from.toHexString();

  entity.save();
}

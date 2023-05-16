import {
  assert,
  describe,
  logStore,
  newMockEvent,
} from "matchstick-as/assembly/index";
import { Transfer as TransferEvent } from "../generated/Tree/Tree";
import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { handleTransfer } from "../src/tree";
import { Transfer } from "../generated/schema";
import { log } from "matchstick-as";

export function createNewTransferEvent(
  from: string,
  to: string,
  tokenId: BigInt
): TransferEvent {
  let newTransferEvent = changetype<TransferEvent>(newMockEvent());

  newTransferEvent.parameters = new Array();

  let fromParam = new ethereum.EventParam(
    "from",
    ethereum.Value.fromAddress(Address.fromString(from))
  );

  let toParam = new ethereum.EventParam(
    "to",
    ethereum.Value.fromAddress(Address.fromString(to))
  );

  let tokenIdParam = new ethereum.EventParam(
    "tokenId",
    ethereum.Value.fromUnsignedBigInt(tokenId)
  );

  newTransferEvent.parameters.push(fromParam);
  newTransferEvent.parameters.push(toParam);
  newTransferEvent.parameters.push(tokenIdParam);

  return newTransferEvent;
}

describe("Test tree event", () => {
  let newTreeTransferEvent = createNewTransferEvent(
    "0x680da7f9a4A3C1Ba9437FFEb90813855F686280C",
    "0xE8B6699D2B6B83Ba305E4a1e78be499eE3119576",
    BigInt.fromString("10")
  );

  handleTransfer(newTreeTransferEvent);

  logStore();

  assert.fieldEquals(
    "Transfer",
    "0xa",
    "owner",
    "0xe8b6699d2b6b83ba305e4a1e78be499ee3119576"
  );

  let entity = Transfer.load("0xa");

  if (entity != null) {
    log.info(entity.id.toString(), []);
  }
});

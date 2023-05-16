import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
  newMockEvent,
} from "matchstick-as/assembly/index";
import { Transfer as TransferEvent } from "../generated/Tree/Tree";
import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { handleTransfer } from "../src/tree";

export function createNewTransferEvent(
  from: string,
  to: string,
  tokenId: BigInt,
): TransferEvent {
  let newTransferEvent = changetype<TransferEvent>(newMockEvent());

  newTransferEvent.parameters = new Array();

  let fromParam = new ethereum.EventParam(
    "from",
    ethereum.Value.fromAddress(Address.fromString(from)),
  );

  let toParam = new ethereum.EventParam(
    "to",
    ethereum.Value.fromAddress(Address.fromString(to)),
  );

  let tokenIdParam = new ethereum.EventParam(
    "tokenId",
    ethereum.Value.fromUnsignedBigInt(tokenId),
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
    new BigInt(10),
  );

  handleTransfer(newTreeTransferEvent);

  assert.fieldEquals(
    "Transfer",
    "10",
    "owner",
    "0xE8B6699D2B6B83Ba305E4a1e78be499eE3119576",
  );
});

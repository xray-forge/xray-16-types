import { type CPhrase } from "xray16";

import { MockPhraseScript } from "./mock-phrase-script";

/**
 * Mock of the X-Ray engine dialog phrase.
 */
export class MockPhrase implements CPhrase {
  public static mock(id: string, text: string, prevPhraseId: string, goodwillLevel: number): CPhrase {
    return new MockPhrase(id, text, prevPhraseId, goodwillLevel) as unknown as CPhrase;
  }

  public id: string;
  public text: string;
  public prevPhraseId: string;
  public goodwillLevel: number;
  public script: MockPhraseScript;

  public constructor(id: string, text: string, prevPhraseId: string, goodwillLevel: number) {
    this.id = id;
    this.text = text;
    this.prevPhraseId = prevPhraseId;
    this.goodwillLevel = goodwillLevel;
    this.script = new MockPhraseScript();
  }

  public GetPhraseScript(): MockPhraseScript {
    return this.script;
  }
}

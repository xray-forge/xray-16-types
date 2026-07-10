import { jest } from "@jest/globals";
import { type CPhraseDialog } from "xray16";

import { MockPhrase } from "./mock-phrase";

/**
 * Mock of the X-Ray engine dialog phrase container.
 */
export class MockPhraseDialog implements CPhraseDialog {
  public static mock(dialog = new MockPhraseDialog()): CPhraseDialog {
    return dialog as unknown as CPhraseDialog;
  }

  public static create(): MockPhraseDialog {
    return new MockPhraseDialog();
  }

  public list: Record<string, MockPhrase> = {};

  public AddPhrase = jest.fn((text: string, phraseId: string, prevPhraseId: string, goodwillLevel: number) => {
    const phrase: MockPhrase = new MockPhrase(phraseId, text, prevPhraseId, goodwillLevel);

    this.list[phraseId] = phrase;

    return phrase;
  });

  public GetPhrase = jest.fn((id: string) => {
    if (this.list[id]) {
      return this.list[id];
    } else {
      throw new Error(`Unexpected phrase ID for get provided: '${id}'.`);
    }
  });

  public asMock(): CPhraseDialog {
    return this as unknown as CPhraseDialog;
  }
}

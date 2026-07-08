import { jest } from "@jest/globals";
import { type CUIMMShniaga } from "xray16";

import { MockCUIWindow } from "./mock-cui-window";

export class MockCUIMMShniaga extends MockCUIWindow implements CUIMMShniaga {
  public static readonly epi_main: number = 0;
  public static readonly epi_new_game: number = 1;
  public static readonly epi_new_network_game: number = 2;

  public static override mock(): CUIMMShniaga {
    return new this() as unknown as CUIMMShniaga;
  }

  public static override create(): MockCUIMMShniaga {
    return new this();
  }

  public SetPage = jest.fn();

  public ShowPage = jest.fn();

  public SetVisibleMagnifier = jest.fn();
}

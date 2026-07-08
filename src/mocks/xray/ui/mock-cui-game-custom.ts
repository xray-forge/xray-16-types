import { jest } from "@jest/globals";
import { type CUIGameCustom, type StaticDrawableWrapper } from "xray16";

import { MockStaticDrawableWrapper } from "./mock-static-drawable-wrapper";

/**
 * Mock game hud UI element.
 */
export class MockCUIGameCustom implements CUIGameCustom {
  public static mock(): CUIGameCustom {
    return new this() as unknown as CUIGameCustom;
  }

  public static create(): MockCUIGameCustom {
    return new this();
  }

  public customStatic: Record<string, StaticDrawableWrapper> = {};

  public AddCustomStatic = jest.fn((id: string) => {
    this.customStatic[id] = MockStaticDrawableWrapper.mock(id);

    return this.customStatic[id];
  });
  public RemoveCustomStatic = jest.fn((id: string) => {
    delete this.customStatic[id];
  });

  public AddDialogToRender = jest.fn(() => null);
  public CurrentItemAtCell = jest.fn(() => null);
  public GetCustomStatic = jest.fn((id: string) => {
    return this.customStatic[id] || null;
  });
  public HideActorMenu = jest.fn(() => {});
  public HidePdaMenu = jest.fn(() => {});
  public RemoveDialogToRender = jest.fn(() => {});
  public ShowActorMenu = jest.fn(() => true);
  public UpdateActorMenu = jest.fn(() => {});
  public enable_fake_indicators = jest.fn(() => {});
  public hide_messages = jest.fn(() => {});
  public show_messages = jest.fn(() => {});
  public update_fake_indicators = jest.fn(() => {});
}

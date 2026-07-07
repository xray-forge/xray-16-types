import { jest } from "@jest/globals";
import { type CUIStatic } from "xray16";

import { MockFrect } from "../mock-frect";

import { MockCUILines } from "./mock-cui-lines";
import { MockCUIWindow } from "./mock-cui-window";

/**
 * Mock CUI static.
 */
export class MockCUIStatic extends MockCUIWindow {
  public static override mock(): CUIStatic {
    return new MockCUIStatic() as unknown as CUIStatic;
  }

  public textControl: MockCUILines = new MockCUILines();
  public textureColor: number = 0xffffffff;
  public textColor: number = 0xffffffff;
  public textureRect: MockFrect = new MockFrect(0, 0, 0, 0);
  public originalRect: MockFrect = new MockFrect(0, 0, 0, 0);
  public stretchTexture: boolean = false;
  public heading: number = 0;
  public text: string = "";
  public textAlign: number = 0;
  public textX: number = 0;
  public textY: number = 0;
  public textureOffsetX: number = 0;
  public textureOffsetY: number = 0;
  public texture: string | null = null;
  public shader: string | null = null;

  public GetColor = jest.fn(() => this.textureColor);

  public SetColor = jest.fn((color: number) => {
    this.textureColor = color;
  });

  public TextControl = jest.fn(() => this.textControl);

  public GetTextureRect = jest.fn(() => this.textureRect);

  public GetStretchTexture = jest.fn(() => this.stretchTexture);

  public SetStretchTexture = jest.fn((stretch: boolean) => {
    this.stretchTexture = stretch;
  });

  public SetTextureRect = jest.fn((rect: MockFrect) => {
    this.textureRect = rect;
  });

  public InitTexture = jest.fn((texture: string) => {
    this.texture = texture;
  });

  public SetTextColor = jest.fn((a: number, r: number, g: number, b: number) => {
    this.textColor = ((a & 0xff) << 24) | ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff);
  });

  public SetTextureColor = jest.fn((color: number) => {
    this.textureColor = color;
  });

  public GetTextureColor = jest.fn(() => this.textureColor);

  public SetHeading = jest.fn((heading: number) => {
    this.heading = heading;
  });

  public SetTextST = jest.fn((text: string) => {
    this.text = text;
  });

  public SetTextAlign = jest.fn((align: number) => {
    this.textAlign = align;
  });

  public GetTextAlign = jest.fn(() => this.textAlign);

  public GetText = jest.fn(() => this.text);

  public InitTextureEx = jest.fn((texture: string, shader: string) => {
    this.texture = texture;
    this.shader = shader;
  });

  public SetTextX = jest.fn((x: number) => {
    this.textX = x;
  });

  public SetTextY = jest.fn((y: number) => {
    this.textY = y;
  });

  public GetTextY = jest.fn(() => this.textY);

  public GetTextX = jest.fn(() => this.textX);

  public SetTextureOffset = jest.fn((x: number, y: number) => {
    this.textureOffsetX = x;
    this.textureOffsetY = y;
  });

  public SetElipsis = jest.fn();

  public GetHeading = jest.fn(() => this.heading);

  public SetText = jest.fn((text: string) => {
    this.text = text;
  });

  public GetOriginalRect = jest.fn(() => this.originalRect);

  public SetOriginalRect = jest.fn((rect: MockFrect) => {
    this.originalRect = rect;
  });
}

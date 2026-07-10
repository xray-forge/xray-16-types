import { jest } from "@jest/globals";
import type { properties_helper } from "xray16";

import { MockLuabindClass } from "./mock-luabind";

/**
 * Mock of the X-Ray engine C++ `properties_helper` class.
 */
export class MockPropertiesHelper extends MockLuabindClass implements properties_helper {
  public static override create(): MockPropertiesHelper {
    return new MockPropertiesHelper();
  }

  public static override mock(): properties_helper {
    return new MockPropertiesHelper();
  }

  public create_vangle = jest.fn() as unknown as jest.MockedFunction<properties_helper["create_vangle"]>;
  public create_angle = jest.fn() as unknown as jest.MockedFunction<properties_helper["create_angle"]>;
  public create_time = jest.fn() as unknown as jest.MockedFunction<properties_helper["create_time"]>;
  public create_color = jest.fn() as unknown as jest.MockedFunction<properties_helper["create_color"]>;
  public create_vcolor = jest.fn() as unknown as jest.MockedFunction<properties_helper["create_vcolor"]>;
  public create_fcolor = jest.fn() as unknown as jest.MockedFunction<properties_helper["create_fcolor"]>;
  public create_list = jest.fn() as unknown as jest.MockedFunction<properties_helper["create_list"]>;
  public create_token8 = jest.fn() as unknown as jest.MockedFunction<properties_helper["create_token8"]>;
  public create_token16 = jest.fn() as unknown as jest.MockedFunction<properties_helper["create_token16"]>;
  public create_token32 = jest.fn() as unknown as jest.MockedFunction<properties_helper["create_token32"]>;
  public create_flag8 = jest.fn() as unknown as jest.MockedFunction<properties_helper["create_flag8"]>;
  public create_flag16 = jest.fn() as unknown as jest.MockedFunction<properties_helper["create_flag16"]>;
  public create_flag32 = jest.fn() as unknown as jest.MockedFunction<properties_helper["create_flag32"]>;
  public create_vector = jest.fn() as unknown as jest.MockedFunction<properties_helper["create_vector"]>;
  public create_bool = jest.fn() as unknown as jest.MockedFunction<properties_helper["create_bool"]>;
  public create_float = jest.fn() as unknown as jest.MockedFunction<properties_helper["create_float"]>;
  public create_u8 = jest.fn() as unknown as jest.MockedFunction<properties_helper["create_u8"]>;
  public create_u16 = jest.fn() as unknown as jest.MockedFunction<properties_helper["create_u16"]>;
  public create_u32 = jest.fn() as unknown as jest.MockedFunction<properties_helper["create_u32"]>;
  public create_s32 = jest.fn() as unknown as jest.MockedFunction<properties_helper["create_s32"]>;
  public create_s16 = jest.fn() as unknown as jest.MockedFunction<properties_helper["create_s16"]>;
  public create_choose = jest.fn() as unknown as jest.MockedFunction<properties_helper["create_choose"]>;
  public create_button = jest.fn() as unknown as jest.MockedFunction<properties_helper["create_button"]>;
  public create_canvas = jest.fn() as unknown as jest.MockedFunction<properties_helper["create_canvas"]>;
  public create_caption = jest.fn() as unknown as jest.MockedFunction<properties_helper["create_caption"]>;
  public create_text = jest.fn() as unknown as jest.MockedFunction<properties_helper["create_text"]>;
  public float_on_after_edit = jest.fn() as unknown as jest.MockedFunction<properties_helper["float_on_after_edit"]>;
  public float_on_before_edit = jest.fn() as unknown as jest.MockedFunction<properties_helper["float_on_before_edit"]>;
  public name_after_edit = jest.fn() as unknown as jest.MockedFunction<properties_helper["name_after_edit"]>;
  public name_before_edit = jest.fn() as unknown as jest.MockedFunction<properties_helper["name_before_edit"]>;
  public vector_on_before_edit = jest.fn() as unknown as jest.MockedFunction<properties_helper["vector_on_before_edit"]>;
  public vector_on_after_edit = jest.fn() as unknown as jest.MockedFunction<properties_helper["vector_on_after_edit"]>;
}

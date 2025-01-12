import {describe, it, expect, vi, afterEach} from "vitest";

import {toast} from "@/hooks/use-toast";
import {handleErrorWithToast} from "@/helpers/error/toast-handler";

vi.mock("@/hooks/use-toast", () => ({
  toast: vi.fn(),
}));

vi.mock("@/components/atoms/message-display", () => ({
  MessageDisplay: ({message}: {message: string}) => `<div>${message}</div>`,
}));

describe("handleErrorWithToast", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should display a toast with the message of an Error", () => {
    const mockError = new Error("Test error message");
    const mockTitle = "Error occurred";

    handleErrorWithToast({
      error: mockError,
      title: mockTitle,
    });

    expect(toast).toHaveBeenCalledTimes(1);
    expect(toast).toHaveBeenCalled();
  });

  it("should display a toast with the default message for a generic error", () => {
    const mockError = {code: 500};
    const mockTitle = "Unknown error";
    const mockDefaultErrorMessage = "Default error message";

    handleErrorWithToast({
      error: mockError,
      title: mockTitle,
      defaultErrorMessage: mockDefaultErrorMessage,
    });

    expect(toast).toHaveBeenCalledTimes(1);
    expect(toast).toHaveBeenCalled();
  });

  it("should use the default message if none is provided explicitly", () => {
    const mockError = {code: 404};

    handleErrorWithToast({
      error: mockError,
    });

    expect(toast).toHaveBeenCalledTimes(1);
    expect(toast).toHaveBeenCalled();
  });
});

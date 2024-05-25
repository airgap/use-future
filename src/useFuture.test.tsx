import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFuture } from "./useFuture";

describe("useFuture", () => {
  it("should return the resolved value", async () => {
    const mockPromise = () => Promise.resolve("resolved value");
    const { result } = renderHook(() => useFuture(mockPromise));

    expect(result.current[0]).toBeUndefined();
    expect(result.current[1]).toBeUndefined();
    expect(result.current[2]).toBe(true);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current[0]).toBe("resolved value");
    expect(result.current[1]).toBeUndefined();
    expect(result.current[2]).toBe(false);
  });

  it("should return the error when the promise is rejected", async () => {
    const mockPromise = () => Promise.reject("rejected error");
    const { result } = renderHook(() => useFuture(mockPromise));

    expect(result.current[0]).toBeUndefined();
    expect(result.current[1]).toBeUndefined();
    expect(result.current[2]).toBe(true);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current[0]).toBeUndefined();
    expect(result.current[1]).toBe("rejected error");
    expect(result.current[2]).toBe(false);
  });

  it("should handle errors thrown before promise creation", () => {
    const mockPromise = () => {
      throw new Error("error before promise");
    };
    const { result } = renderHook(() => useFuture(mockPromise));

    expect(result.current[0]).toBeUndefined();
    expect(result.current[1]).toEqual(new Error("error before promise"));
    expect(result.current[2]).toBe(false);
  });

  it("should update loading state correctly", async () => {
    const mockPromise = () => Promise.resolve("resolved value");
    const { result } = renderHook(() => useFuture(mockPromise));

    expect(result.current[2]).toBe(true);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current[2]).toBe(false);
  });
});

import { afterEach, beforeEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import { JSDOM } from "jsdom";

const jsdom = new JSDOM("<!doctype html><html><body></body></html>");
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: "node.js",
};
copyProps(window, global);

beforeEach(() => {
  // ...
});

afterEach(() => {
  cleanup();
});

import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => cleanup());

// jsdom não implementa estas APIs usadas por motion/IntersectionObserver.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

type Callback = (entries: Partial<IntersectionObserverEntry>[]) => void;

export class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  readonly callback: Callback;
  readonly targets = new Set<Element>();
  constructor(callback: Callback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }
  observe = (el: Element) => this.targets.add(el);
  unobserve = (el: Element) => this.targets.delete(el);
  disconnect = () => this.targets.clear();
  takeRecords = () => [];
  /** Helper de teste: simula a entrada de todos os alvos na viewport. */
  trigger(isIntersecting = true) {
    this.callback(
      [...this.targets].map((target) => ({ target, isIntersecting, intersectionRatio: isIntersecting ? 1 : 0 })),
    );
  }
}

vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

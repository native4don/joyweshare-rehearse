import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/** A file the site serves from public/, by the path the page or the manifest names. */
const publicFile = (name: string) => readFileSync(new URL(`../../public/${name.replace(/^\//, "")}`, import.meta.url));

/** Width and height from a PNG's header, or null when the file is not a PNG. */
function pngSize(bytes: Buffer): [number, number] | null {
  const signature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (!signature.every((b, i) => bytes[i] === b)) return null;
  return [bytes.readUInt32BE(16), bytes.readUInt32BE(20)];
}

interface ManifestIcon { src: string; sizes: string; type: string; purpose?: string }

describe("the site's icons", () => {
  const manifest = JSON.parse(publicFile("manifest.webmanifest").toString("utf8")) as { icons: ManifestIcon[] };

  it("are each a PNG of the size the manifest declares", () => {
    expect(manifest.icons.length).toBeGreaterThan(0);
    for (const icon of manifest.icons) {
      const [width, height] = icon.sizes.split("x").map(Number);
      expect(icon.type).toBe("image/png");
      expect(pngSize(publicFile(icon.src)), icon.src).toEqual([width, height]);
    }
  });

  it("include a 180 by 180 PNG for an iPhone's home screen", () => {
    expect(pngSize(publicFile("apple-touch-icon.png"))).toEqual([180, 180]);
  });

  it("include an SVG for browser tabs", () => {
    expect(publicFile("icon.svg").toString("utf8")).toMatch(/<svg[\s>]/);
  });
});

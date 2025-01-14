import path from "path";
import os from "os";
import fs from "fs";

import test from "ava";

// @ts-ignore
import Settings from "../lib/parser/Settings";
import { getDeck } from "./_test-utils";

process.env.WORKSPACE_BASE = path.join(os.tmpdir(), "workspaces");
fs.mkdirSync(process.env.WORKSPACE_BASE, { recursive: true });

test("Colours", async (t) => {
  const deck = await getDeck(
    "Colours 0519bf7e86d84ee4ba710c1b7ff7438e.html",
    new Settings({ cherry: "false" })
  );
  t.true(deck.cards[0].back.includes("block-color"));
});

test.skip("HTML Regression Test", (t) => {
  t.fail(
    "please automate HTML regression check. Use this page https://www.notion.so/HTML-test-4aa53621a84a4660b69e9953f3938685."
  );
});

test("Nested Toggles", async (t) => {
  const deck = await getDeck(
    "Nested Toggles.html",
    new Settings({ cherry: "true" })
  );
  t.deepEqual(deck.cards.length, 12);
});

test("Global Tags", async (t) => {
  const deck = await getDeck(
    "Global Tag Support.html",
    new Settings({ tags: "true", cherry: "false" })
  );
  t.true(deck.cards[0].tags.includes("global"));
});

test.skip("Test Basic Card", async (t) => {
  t.fail("To be implemented");
});

test("Cloze Deletions", async (t) => {
  const deck = await getDeck(
    "Some Cloze Deletions 1a118169ada841a99a9aaccc7eaa6775.html",
    new Settings({ cherry: "false" })
  );
  t.deepEqual(
    deck.cards[0].back,
    "<div class='toggle'>{{c2::Canberra}} was founded in {{c1::1913}}.</div>"
  );
  t.deepEqual(
    deck.cards[1].back,
    "<div class='toggle'>{{c1::Canberra::city}} was founded in {{c2::1913::year}}</div>"
  );
  t.deepEqual(
    deck.cards[2].back,
    "<div class='toggle'>{{c1::Canberra::city}} was founded in {{c2::1913}}</div>"
  );
  t.deepEqual(
    deck.cards[3].back,
    "<div class='toggle'>{{c1::This}} is a {{c2::cloze deletion}}</div>"
  );
  t.deepEqual(
    deck.cards[4].back,
    "<div class='toggle'>{{c2::Canberra}} was founded in {{c1::1913}}.</div>"
  );
  t.deepEqual(
    deck.cards[5].back,
    "<div class='toggle'>{{c1::Canberra::city}} was founded in {{c2::1913::year}}</div>"
  );
});

test.skip("Input Cards ", (t) => {
  t.fail("to be implemented");
});

test.skip("Multiple File Uploads", (t) => {
  t.fail("to be implemented");
});

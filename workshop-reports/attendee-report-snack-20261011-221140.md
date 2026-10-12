# Workshop attendee report (Expo Snack path, second run)

**Date:** 2026-10-11
**Role:** Junior dev, React and TypeScript, no mobile experience. Did not download the repo. Uses Expo Snack in a browser.
**Guide version:** HEAD f4a0892 (branch workshop-1). The working tree is dirty, but only `.claude/` files per the git status I was given. I ran no git command.
**Overall:** The README now sends a Snack user to the right place, so Section 1 is doable in about 10 to 15 minutes with little guessing. Section 2 onward is still not doable as written, and WORKSHOP.md itself still never mentions Snack. The README does say "Section 1 only", but a Snack user who follows the WORKSHOP into Section 2 meets no warning.

How I worked: I cannot open Snack and have no network, so everything is reasoned from the guide text. Where I describe Snack behaviour I say "I believe". Those points are repeated under "Could not verify". I used no commands. I read no previous report until my own pass was done.

## Summary

| Section | Steps | Completed | Needed help | Unclear |
| --- | --- | --- | --- | --- |
| README: Browser Based | 3 | 3 | 0 | 2 (what to expect at the top edge; Steps 1 to 3) |
| 1: Product card | 4 | 4 | 0 | 2 (heading paths mean nothing in Snack; no Snack note in WORKSHOP) |
| 2: Show the products | 8 | 0 as written. Steps 2 to 5 only in my own single-file rewrite | Steps 1, 6, 7, 8 | 8 |
| 3: Navigation and platforms | 3 | 0 | 3 (Step 2 is a style tweak on a tile I do not have) | 3 |
| 4: Storage | 4 | 0 | 4 | 4 |

No `*.solution` files are visible to me, so I used none.

## Top issues

1. WORKSHOP.md still has no Snack note. A Snack user reading Section 2 meets `src/data/products.json` ("is provided"), "The file already exists." and `../../../api/productsApi` with no warning that they cannot follow. Add a one-line note at the top of each section (text below).
2. The `Product` shape and the product data are never shown in the guide. Section 2 Steps 1, 4 and 7 depend on them. A Snack user who wants to continue past Section 1 cannot, and "type 'pixel'" in Step 4 needs data that has a Pixel in it.
3. Section 1 diffs and headings name `src/components/screens/ProductListScreen/ProductListScreen.tsx`, and the intro says "The app starts with a blank screen under the header". Neither is true in Snack. The README only covers Step 4. It does not say Steps 1 to 3 can be pasted into `App.js` too.
4. No header and no safe area in Snack. The README says "the card sits at the top of the screen", but on a phone the card or the Step 2 text may sit under the status bar or notch. Say so, or suggest `paddingTop` for Snack.
5. Tone: Section 2 Step 4 ("State is data that changes. When it changes, the screen redraws.", "Never change the value directly.") and Section 1 ("A `View` is a box.") talk down to a React developer. Meanwhile `position: 'absolute'`, `gap` and `contentContainerStyle` are used with no explanation. Details in the Tone section.

## README: Browser Based

- **Result:** Done
- **What I did:** Opened Snack in my head, replaced `App.js` with the Section 1, Step 4 "New code", expected one card at the top.
- **Snack:** I expect a default `App.js` (I believe), a phone preview and a web preview. After pasting I expect a white screen with one card. Could not verify.
- **Unclear or missing:**
  - "Replace the contents of `App.js` with the "New code" for Section 1, Step 4". This is clear now. The `<details>` summary is called "New code", so I can find it.
  - "The function name doesn't matter." Good. I believe Snack uses the default export. Could not verify.
  - "Snack has no header, so the card sits at the top of the screen." On a phone in Expo Go I believe there is no safe area, so the 16 point margin may still sit under the status bar. Could not verify.
  - It says nothing about Steps 1 to 3. I can paste each one's "New code" into `App.js` in turn. The README does not say so, so I would guess.
  - The Snack option is the last heading, below Android emulator setup. The opening "Pick one way to run the app. The quickest are a physical phone with Expo Go, or the web." does not mention Snack, so a stuck person has to scroll past everything.
  - The "When the app runs you should see a header..." sentence is in Setup, above Browser Based. A Snack user may think the missing header is a fault. The Snack paragraph does explain this. Good.
- **Questions an attendee might ask:**
  - "Do I need an Expo account for Snack?" (I believe not to run. Saving may ask for one. Could not verify.)
  - "Which SDK version should the Snack use?" (Say the repo's. Still not stated.)
  - "How do I see it on my phone?" (Snack shows a QR code for Expo Go. Not stated.)
- **Suggested fix:** Add "Using Snack? Jump to Browser Based." to the opening paragraph. Add one line: "You can paste the "New code" block of Steps 1 to 4 in turn." Add one line saying the SDK version.

## Section 1: Build a product card

Section note: "Open `src/components/screens/ProductListScreen/ProductListScreen.tsx`. The app starts with a blank screen under the header." and "Optional: `npm test`..." do not apply in Snack. Nothing in WORKSHOP.md says so.

### Step 1: View

- **Result:** Done
- **What I did:** Pasted the "New code" block into `App.js`.
- **Checks:** Snack: a blank white preview. I believe a default export with any name works. Could not verify.
- **Unclear or missing:**
  - The bold path heading is meaningless to me.
  - "The screen stays blank. That is correct." Good, but in Snack a blank and a crashed preview both look empty until I check the error bar.
- **Questions an attendee might ask:**
  - "Is `View` a `div`?" (Yes, roughly.)
- **Suggested fix:** None beyond the Snack section note.

### Step 2: Text

- **Result:** Done
- **What I did:** Pasted the "New code" block.
- **Checks:** Snack: the text "iPhone 18" at the top left. On a phone it may sit under the status bar (no header, no safe area). Could not verify.
- **Unclear or missing:**
  - "All text goes inside `<Text>`. There is no HTML here, and a bare string inside a `View` crashes the app." Clear and useful.
- **Questions an attendee might ask:**
  - "Why does my text touch the top edge?" (No header and no safe area. Safe areas come in Section 3.)
- **Suggested fix:** Snack note about the top edge.

### Step 3: Image

- **Result:** Done
- **What I did:** Pasted the "New code" block.
- **Checks:** Snack: still only "iPhone 18". The guide says so: "you will not see it until Step 4". Good.
- **Unclear or missing:**
  - The picsum URL needs the network. No fallback is mentioned if it is blocked.
- **Questions an attendee might ask:**
  - "Why does a web image need a size?" (RN cannot know the size of a remote image.)
- **Suggested fix:** One line: if the image never shows, check the network.

### Step 4: StyleSheet

- **Result:** Done
- **What I did:** Pasted the final "New code" block. This is the README's target.
- **Checks:** Snack: a white screen with one rounded card, a 110 point picture on the left and "iPhone 18" in bold on the right. On the web preview I believe `elevation` is ignored, and `shadow*` may show as a box shadow or a deprecation warning. Could not verify.
- **Unclear or missing:**
  - The diff ends with a lone `+` blank line. Small noise.
  - The bullet "Move the `Image` above the `Text`" is clear, but the new wrapping `card` `View` and the outer `container` are not mentioned in the bullets.
  - `container`'s `backgroundColor: 'white'` is not explained.
- **Questions an attendee might ask:**
  - "Where are the units?" (Plain numbers, density independent.)
- **Suggested fix:** For Snack, say "this is where Snack stops being smooth".

## Section 2: Show the products

Section note: "Fetch the products and show them in a list. Then add search. You work in the list screen." There is no Snack warning here, and the README only says "later sections use several files".

### Step 1: Data fetching

- **Result:** Blocked
- **What I did:** Read three parts. Part 1: "`src/data/products.json` is provided". Part 2: "The file already exists." Part 3 imports from `'../../../api/productsApi'` and `'../../../types/product'`.
- **Checks:** Snack: a red "Unable to resolve module" bar if I paste Part 3 as written.
- **Unclear or missing:**
  - The `Product` type and the JSON are never shown. From Step 7 I can guess `id`, `name`, `image`, `make`, `price`, `pricePeriod?`, `badge?`. That is a guess. I would have to invent the data.
  - `import data from './products.json'` in Snack: I believe a `.json` file can be added and imported. Could not verify. The data would still be missing.
  - `data as Product[]` and `useState<Product[]>` are TypeScript. In `App.js` they are syntax errors. I would need `App.tsx`. I believe Snack strips types without checking them. Could not verify.
  - The guide could say "put everything in one file". It does not.
- **Needed help:** Yes (**NEEDS HELP**). Nothing in the guide gives the data.
- **Questions an attendee might ask:**
  - "Where do I get `products.json`?" (Show it in the guide, or link a Snack.)
  - "Can I use JavaScript instead?" (Yes, if you drop the type annotations.)
- **Suggested fix:** Show the `Product` interface and four sample products in a collapsible block, with a Snack-friendly single-file variant.

### Step 2: Loading and errors

- **Result:** Done only in my own single-file rewrite
- **What I did:** With my own inline `getProducts`, I pasted the body and deleted the two project imports.
- **Checks:** Snack: a spinner for half a second, then the list.
- **Unclear or missing:**
  - The "Try it" block tells me to edit `getProducts` in `productsApi.ts`. I have no such file. I would edit my inline function.
  - "`Pressable` is a tappable wrapper. You meet it properly in Step 3." Step 3 gives one sentence ("A `Pressable` makes anything tappable"), so "properly" over-promises.
- **Questions an attendee might ask:**
  - "Why is the spinner not centred?" (No style on it.)
- **Suggested fix:** Snack note: do the Try it in your inline function.

### Step 3: Interactivity

- **Result:** Done in my own single-file rewrite
- **What I did:** Pasted the "New code" and removed the two project imports.
- **Checks:** Snack: a search box and a "Clear" label above the list. Typing shows letters but nothing filters. Matches "Typing and Clear do nothing yet."
- **Unclear or missing:**
  - `gap` is used in `searchRow` with no word on it. I believe it works on current RN. Could not verify for the Snack SDK.
- **Questions an attendee might ask:**
  - "Why is there a blue outline on the web preview?" (Browser focus ring.)
- **Suggested fix:** None.

### Step 4: State

- **Result:** Done in my own single-file rewrite
- **What I did:** Pasted the "New code".
- **Checks:** Snack: typing "pixel" shrinks the list only if my invented data has a Pixel.
- **Unclear or missing:**
  - "Type "pixel" and the list shrinks." depends on data the Snack user does not have.
  - Tone: see below.
- **Questions an attendee might ask:**
  - "Why `query.trim().toLowerCase()`?" (Ignore spaces and case.)
- **Suggested fix:** Show the data so "pixel" works.

### Step 5: Accessibility

- **Result:** Done in my own single-file rewrite (nothing to see)
- **What I did:** Pasted the "New code".
- **Checks:** Snack: no visible change.
- **Unclear or missing:**
  - "Skip this on a simulator, an emulator or the web." Snack in a browser is the web, and Snack on a phone is a phone. The guide does not say which a Snack user is.
- **Questions an attendee might ask:**
  - "How do I check without a screen reader?" (You cannot, except by reading the code.)
- **Suggested fix:** Mark as read-only for Snack web users.

### Step 6: SearchBar component

- **Result:** Blocked (partly)
- **What I did:** Read "Replace the whole of `src/components/common/SearchBar/SearchBar.tsx` with:". I believe Snack has an "add file" button. Could not verify. The guide does not say so.
- **Checks:** Snack: no visible change, as stated ("Nothing changes on screen until Step 8.").
- **Unclear or missing:**
  - "This replaces the whole starter file, including its notes." There is no starter file in Snack.
  - Step 8 imports `'../../common/SearchBar'`, which needs a folder and an `index.ts`. I would pick my own path.
- **Needed help:** Yes (**NEEDS HELP**): file name, where, and how to import it.
- **Questions an attendee might ask:**
  - "Why `export function` and not `export default`?" (Named export, import with braces.)
- **Suggested fix:** Snack note with exact file names and import paths.

### Step 7: ProductTile component

- **Result:** Blocked (partly)
- **What I did:** Same as Step 6.
- **Checks:** Snack: no visible change until Step 8.
- **Unclear or missing:**
  - It imports `Product` from `'../../../types/product'`, which the guide never shows.
  - `position: 'absolute'` (the badge) is not explained. In RN every view is `position: relative` by default, and absolute is relative to the parent, which is a difference from the web that is worth a line.
  - "`onPress`, `isFavorite` and `onToggleFavorite` are optional. Sections 3 and 4 use them." Fine.
- **Needed help:** Yes (**NEEDS HELP**), for the `Product` type.
- **Suggested fix:** Show the `Product` interface.

### Step 8: Use them in the list screen

- **Result:** Blocked (partly)
- **What I did:** "Replace the whole file with" the block. I would paste it into `App.tsx` and rewrite four imports.
- **Checks:** Snack: if all files exist and imports are fixed, a search bar, a spinner, then tiles. Otherwise a red "Unable to resolve module" bar.
- **Unclear or missing:**
  - The function is still `ProductListScreen`. README says the name does not matter, so this is fine now.
  - `contentContainerStyle` is not explained.
- **Needed help:** Yes (**NEEDS HELP**).
- **Suggested fix:** A Snack variant of the imports (`./components/ProductTile`).

## Section 3: Navigation and platforms

Section note: "Tap a product to open its details." There is no Snack warning. Step 1 starts "`src/App.tsx` already sets up a stack...". A Snack user has no such file.

### Step 1: Navigation

- **Result:** Blocked
- **What I did:** Read it. "Open `src/App.tsx` and find the two `Stack.Screen` lines." I have no stack, no `ProductDetailsScreen` and no `types/navigation.ts`.
- **Checks:** Snack: I believe it offers to add `@react-navigation/*` and the peer packages. The guide gives no `NavigationContainer`, stack or details screen code, so it cannot work. Could not verify the install.
- **Unclear or missing:**
  - "`ProductDetailsScreen` is already built." Not for me.
  - "On the web, the address bar stays the same and the browser back button does not go back." Useful for web, but a Snack web user may read this and wonder.
  - "`navigation.navigate('ProductDetails', { id })`" is clear.
- **Needed help:** Yes (**NEEDS HELP**). No way forward.
- **Questions an attendee might ask:**
  - "Where does `navigation` come from?" (The navigator passes it to each screen.)
- **Suggested fix:** Tell Snack users to stop here, or supply an `App.tsx`.

### Step 2: Platform specific styles

- **Result:** Partly (edit to my own tile)
- **What I did:** Applied the `Platform.select` diff to my `ProductTile`.
- **Checks:** Snack: on a phone the shadow appears. On the web preview neither branch matches, so there is no shadow. The guide now says so: "On the web neither case matches, so there is no shadow. That is fine for this workshop."
- **Unclear or missing:**
  - Nothing new. The previous web note has been fixed.
- **Questions an attendee might ask:**
  - "Why no shadow on web?" (Answered in the step.)
- **Suggested fix:** None.

### Step 3: Safe area

- **Result:** Blocked (partly)
- **What I did:** Would import `SafeAreaView` from `react-native-safe-area-context`.
- **Checks:** Snack: no visible change on the web preview. On a phone, the content moves below the status bar and clear of the home bar. I believe the package may need a `SafeAreaProvider` above it. Could not verify.
- **Unclear or missing:**
  - "The package is already installed." Not true for Snack.
  - The code uses `navigation` and `ProductListScreenProps` from Step 1.
  - "On a desktop browser there is no home bar, so skip the check there." Fine.
  - "With the header showing, you see little change at the top." I have no header.
  - The guide does not mention a provider.
- **Needed help:** Yes (**NEEDS HELP**), because of Step 1.
- **Suggested fix:** Say whether a provider is needed.

## Section 4: Storage

Section note: "It is already installed." Not for Snack. I believe Snack offers to add the package when imported, and Expo Go bundles it. Could not verify.

### Step 1: Storage

- **Result:** Partly, in isolation
- **What I did:** Would add a new file with the "New code".
- **Checks:** Snack: no visible change. If the package is not added I would see "Unable to resolve module".
- **Unclear or missing:**
  - The diff shows deleting `// TODO` lines that only exist in the repo stub.
  - Step 2 imports `'../../storage/favoritesStorage'` (a folder index).
- **Needed help:** Yes (**NEEDS HELP**), for file layout.
- **Questions an attendee might ask:**
  - "Is it like `localStorage`?" (Yes, async and text only.)
- **Suggested fix:** Snack note: the package is added when you import it.

### Step 2: API

- **Result:** Partly (a file, no visible result)
- **What I did:** Would add `favoritesApi.ts`.
- **Checks:** Snack: no visible change.
- **Unclear or missing:** Import path must match my own layout.
- **Suggested fix:** None beyond the layout note.

### Step 3: The heart

- **Result:** Done, if the tile file exists
- **What I did:** Edited my tile with the diff.
- **Checks:** Snack: a heart on each tile that does nothing yet. "The inner `Pressable` takes the tap first" I cannot test. Could not verify.
- **Unclear or missing:** `♥` and `♡` may look different on the web preview. Could not verify.
- **Suggested fix:** None.

### Step 4: Connect the list

- **Result:** Blocked
- **What I did:** Read it. `useFocusEffect` needs a navigator, which I do not have.
- **Checks:** Snack: a red error at start-up if I paste as written.
- **Unclear or missing:**
  - The "Check it" section now has per-platform "close the app" steps (phone, simulator, web). None is for Snack. The Web line says "close the tab, then open the page again", which in Snack may lose an unsaved Snack, or not. Could not verify.
  - "`useCallback` gives it a stable function." One line for a dependency array question. A React dev will ask "stable for what?".
- **Needed help:** Yes (**NEEDS HELP**).
- **Suggested fix:** Give a Snack variant (`useEffect`) and say what "reopen" means.

## Tone

The brief says the guide should read peer to peer. My view as a React developer:

- Talks down or pads:
  - Section 1 Step 1: "A `View` is a box. Boxes go inside boxes." Better: "`View` is the layout container, like a `div`."
  - Section 2 Step 4: "State is data that changes. When it changes, the screen redraws." and "`useState` gives you the value and a function to change it. Never change the value directly." A React reader already knows all of it. Keep only "`onChangeText` gives you the new text, not an event."
  - Section 3 Step 3: "Phones have notches and home bars." Fine, short.
  - Section 2 Step 2: "You meet it properly in Step 3." Over-promises (see Step 2).
  - Repeated reassurance: "That is correct.", "That is fine for this workshop.", "That is expected." Each once is fine. Together they read as nervous.
- Assumes too much:
  - `position: 'absolute'` (Section 2 Step 7): RN differs from the web by default positioning.
  - `gap` (Section 2 Steps 2 and 3), `contentContainerStyle` (Section 2 Step 8) and `useCallback` (Section 3 Step 4 "stable function") are used with little or no explanation.
  - "api" is lowercase in "from an api" and "Fill in the api". Minor inconsistency.
- Good: Section 1 Step 4 bullets, Section 3 Step 2 and "hitSlop" wording are about the right level.

## Compared with the previous run

Previous report: `attendee-report-snack-20261011-204631.md`.

**Fixed**
- README Browser Based now names the file (`App.js`), the exact block to paste ("New code" for Section 1, Step 4), says the function name does not matter and says there is no header.
- README now says plainly that Snack works for Section 1 only (it used to be vague; the previous report called this too thin).
- Section 3 Step 2 now says that on the web neither platform branch matches, so there is no shadow.
- Section 3 Step 3 now tells desktop browser users to skip the home bar check.
- Section 4 "Check it" now has per-platform "close the app" steps (not Snack-specific, but there is now a Web line).
- The collapsible block is labelled "New code", so the README can point at it.

**Still open**
- WORKSHOP.md has no Snack note at the top of any section (previous Top issue 1).
- README does not say Steps 1 to 3 can be pasted too; does not say the SDK version; the Snack option is still the last heading and is not mentioned in the opening paragraph.
- `Product` and the product data are still not shown (Section 2 Steps 1, 4, 7).
- Path headings and "starts with a blank screen under the header" in Section 1 still do not fit Snack.
- Possible status bar overlap in Snack (README says the card "sits at the top of the screen", which may be under the status bar).
- `position: 'absolute'` is still unexplained.
- Sections 3 and 4 still say "already installed" and "already sets up a stack". No `SafeAreaProvider` mention.
- Section 4 has no Snack meaning for "close the app".
- Section 1 Step 4 diff still ends with a lone `+` line, and the card wrapper is not in the bullets.

**New**
- Tone findings above (Section 2 Step 4 padding, "You meet it properly in Step 3", unexplained `gap` and `contentContainerStyle`).
- Section 2 Step 5 says "Skip this on a simulator, an emulator or the web", which does not say which a Snack user is.
- Section 2 Step 2's "Try it" block (new since the last run) refers to `productsApi.ts`, which a Snack user does not have.

## Questions to prepare for

**Snack setup**
- Which file do I paste into? (`App.js`, per README.) Do I need an account? Which SDK? Why no header?

**Files and TypeScript**
- Can I add files, folders, JSON? (I believe yes.) Do I need `.tsx`? (For type annotations, yes.) Where is the `Product` type?

**Native concepts**
- Why `View` and `Text`? Why does a remote `Image` need a size? What does `position: 'absolute'` do here? Why `shadow*` and `elevation`? What is a safe area?

**Persistence**
- What does "close the app" mean in a browser? Does `AsyncStorage` persist in Snack?

## Could not verify

- That I can open Snack at all.
- Whether the default file is `App.js` or `App.tsx`, and whether `.tsx` files are accepted with type stripping only.
- That a default export not named `App` works.
- That `import data from './products.json'` works in Snack.
- That Snack auto-adds `react-native-safe-area-context`, `@react-navigation/*` and `@react-native-async-storage/async-storage`, and picks matching versions.
- Whether a `SafeAreaProvider` is needed in Snack.
- Whether Snack's phone preview puts content under the status bar.
- That `gap` works on the Snack SDK, and how shadows look on the web preview.
- Whether the picsum image loads on the workshop network.
- Whether `AsyncStorage` data survives a Snack reload.
- Everything that needs a phone: VoiceOver, TalkBack, home bar, second platform shadow comparison.

## Snack-specific findings

| Section or step | Doable in Snack | Why |
| --- | --- | --- |
| README: Browser Based | Yes | File, block and "no header" are now named. Steps 1 to 3 and SDK version are not mentioned. |
| 1, Step 1: View | Yes | Paste "New code". Blank looks the same as broken. |
| 1, Step 2: Text | Yes | Core only. May sit under the status bar. |
| 1, Step 3: Image | Yes | Needs network. Nothing visible until Step 4. |
| 1, Step 4: StyleSheet | Yes | Single file, core only. Best end point. |
| 2, Step 1: Data fetching | No (as written) | `products.json`, `productsApi`, `Product` are not shown. |
| 2, Step 2: Loading and errors | Partly | One file works after removing imports. "Try it" points at `productsApi.ts`. |
| 2, Step 3: Interactivity | Partly | One file works. |
| 2, Step 4: State | Partly | Needs data with "pixel". |
| 2, Step 5: Accessibility | Partly | Code works, cannot test with a screen reader. |
| 2, Step 6: SearchBar | Partly | New file and made-up path. |
| 2, Step 7: ProductTile | Partly | New file; `Product` type missing. |
| 2, Step 8: Use them | Partly | Imports must be rewritten. |
| 3, Step 1: Navigation | No | Needs packages, `App.tsx` stack, details screen. |
| 3, Step 2: Platform styles | Partly | Phone only shows a shadow; web has none (now stated). |
| 3, Step 3: Safe area | Partly | Needs Step 1. Visible only on a phone. |
| 4, Step 1: Storage | Partly | Package probably auto-added; nothing visible. |
| 4, Step 2: API | Partly | File only. |
| 4, Step 3: The heart | Yes | Heart shows, does nothing yet. |
| 4, Step 4: Connect the list | No | `useFocusEffect` needs a navigator. |

### Suggested notes for the top of each section

**README, opening paragraph (add):**
> Stuck on setup? Use Expo Snack (see **Browser Based** below). It covers Section 1 only.

**Section 1:**
> **Snack users:** there is no `ProductListScreen.tsx` and no header. Paste each step's "New code" block into `App.js`. On a phone the content may touch the status bar. That is expected.

**Section 2:**
> **Snack users:** stop after Section 1. This section needs `src/data`, `src/api` and `src/types`, which Snack does not have. Read on to follow the ideas only.

**Section 3:**
> **Snack users:** skip this section. It needs React Navigation and files you do not have.

**Section 4:**
> **Snack users:** skip this section. Step 4 needs a navigator, and there is no "close the app" in a browser tab.

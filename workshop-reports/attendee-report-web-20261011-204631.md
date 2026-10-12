# Workshop attendee report (web path)

**Date:** 2026-10-11
**Role:** Junior dev, React and TypeScript, no mobile experience. Runs the app in a desktop browser only (`npm run web`).
**Guide version:** HEAD `c09f15e` on branch `workshop-1`, working tree dirty (as given at the start of the session; I could not run git). Copy used: `.workshop-attendee/web-20261011-204631`.
**Overall:** I could finish all 4 sections by copying the code. `tsc` was clean after every step and all 27 tests pass at the end of Section 4. I could not run or see the app, so every on-screen check is "Could not verify". The guide never says what a web attendee should expect. The one real web problem is that the shadow disappears at Section 3, Step 2.

I did not open any `*.solution` file. Nobody needed help.

## Summary

| Section | Steps | Completed | Needed help | Unclear |
| --- | --- | --- | --- | --- |
| Setup (README) | 1 | Read only (cannot run) | 0 | 3 (web) |
| 1: Product card | 4 | 4 | 0 | 2 |
| 2: Show the products | 8 | 8 | 0 | 3 |
| 3: Navigation and platforms | 3 | 3 | 0 | 3 |
| 4: Storage | 4 | 4 | 0 | 2 |

Test results (`npx jest --rootDir WORK`):

- After Section 1: 8 suites failed, 21 tests failed, 6 passed. Expected, the guide says so.
- After Section 2: 3 failed in `ProductListScreen.test` (navigate, 2 favourites), plus favourites, details and App tests still failing. Expected.
- After Section 3: 7 tests failed, all about favourites. Expected.
- After Section 4: 8 of 8 suites pass, 27 of 27 tests pass.
- Note: `jest-expo` runs the tests with the iOS preset. A green run says nothing about web.

## Top issues

1. Section 3, Step 2: on web `Platform.select({ ios, android })` returns `undefined`, so the tile shadow vanishes. Section 1 did show a shadow on web. Nothing in the guide explains this. Add a `default` or `web` key.
2. README "Web" section is two lines. It does not say a browser tab opens, the URL (usually `http://localhost:8081`), that you press `w` in the terminal if it does not open, or that Expo Go, a QR code and a login are not needed. The Expo-account line is the only hint, and it sits in the shared setup.
3. Section 4 "Check it": "Close the app (swipe Expo Go away), then open it again" has no web equivalent. Web uses `localStorage`, so "close the tab and open the page again" works, but clearing site data or a private window loses favourites.
4. Section 3, Step 1 and Step 3: no word on the browser URL bar, back button, or `SafeAreaView` and the home bar on web. The URL stays on `/` and the browser back button leaves the app, because `App.tsx` has no `linking`. A web attendee will think they missed something at "Check it: look at the bottom of the list. Does it sit clear of the home bar?".
5. Words say "tap", "phone", "swipe", "screen". Web attendees click. Add one line near the top of the guide: "On web, read tap as click."

## Section 1: Build a product card

### Step 1: View

- **Result:** Done
- **What I did:** Replaced `ProductListScreen.tsx` with the "New code" block.
- **Checks:** tsc ok
- **Unclear or missing:** The file starts as `return null;` with no imports, so the diff matches. Nothing to flag. Guess: `View` is a `div`.
- **Questions an attendee might ask:**
  - Is `View` just a `div`? (Close. On web React Native turns it into a `div` with flex layout by default.)
  - Why is the screen blank under the header? (An empty `View` has no size or colour. Expected.)
- **Could not verify:** blank page below a header reading "Phones & SIM cards".

### Step 2: Text

- **Result:** Done
- **What I did:** Applied the new code.
- **Checks:** tsc ok
- **Unclear or missing:** "a bare string inside a `View` crashes the app". On web React Native Web may not crash (it can render the string). The guide states a native fact as if it holds everywhere. Hard to follow for web: an attendee who tries it in the browser may see no crash and doubt the guide.
- **Questions an attendee might ask:**
  - Why does text have to be inside `Text`? (Native has no text nodes in a view. It is a rule even where web is forgiving.)
  - Can I use `<p>` or `<h1>`? (No. Use `Text` and style it.)

### Step 3: Image

- **Result:** Done
- **What I did:** Applied the new code.
- **Checks:** tsc ok
- **Unclear or missing:** "`uri` is the address of the image" is fine. "An image from the internet also needs a width and height, so you will not see it until Step 4." Works the same on web as far as I can tell (a web `Image` with no size is a 0 by 0 box). Could not verify.
- **Questions an attendee might ask:**
  - Why `source={{ uri }}` and not `src`? (It is an object so it can also carry headers, or a local `require`.)
  - Why is the image missing? (No width and height. Step 4 adds them.)

### Step 4: StyleSheet

- **Result:** Done
- **What I did:** Applied the new code, including `shadow*` and `elevation` together.
- **Checks:** tsc ok. Tests: see the Section 1 result above.
- **Unclear or missing:**
  - "iOS draws shadows with the `shadow*` styles ... Android uses `elevation`. Set both." Web is not mentioned.
  - From reading `react-native-web/dist/exports/StyleSheet/preprocess.js`: on web, `shadowColor`, `shadowOffset`, `shadowOpacity` and `shadowRadius` are converted into a CSS `box-shadow`, so the shadow should show. `elevation` is ignored. There is a dev-only warning once: `"shadow*" style props are deprecated. Use "boxShadow".` A web attendee may see this in the browser console and worry.
  - "Move the `Image` above the `Text`" is vague. The diff shows it, but the bullet is a task and the diff is the answer.
  - "Styles are plain objects, not CSS." Web attendees know CSS and may ask why `fontWeight: '600'` is a string and `padding: 12` has no `px`.
- **Questions an attendee might ask:**
  - Why no `px`? (Numbers are density-independent points. On web they become pixels.)
  - Why does `flex: 1` on `name` work here? (It sits in a row and fills the space left by the image.)
  - Is there a console warning about shadows? (Yes on web. Harmless. Newer React Native also has `boxShadow`.)
- **Suggested fix:** Add one line: "On web the shadow shows too. You may see a console warning about `shadow*`. Ignore it."
- **Could not verify:** the card looks like image left, text right, with a soft shadow.

## Section 2: Show the products

### Step 1: Data fetching

- **Result:** Done
- **What I did:** Edited `src/data/products.ts`, `src/api/productsApi/productsApi.ts` and the list screen, copying each "New code" block.
- **Checks:** tsc ok.
- **Unclear or missing:**
  - Part 1 says "`src/data/products.json` is provided." I could confirm it exists (I read it).
  - The three-part step is long, and the third diff repeats the whole `styles` block. Hard to follow: easy to lose your place.
  - Section 1 text says "iPhone 18" with a picsum seed `iphone18`, but the real data is "Apple iPhone 16 Pro". Harmless, may confuse.
- **Questions an attendee might ask:**
  - Why `data as Product[]`? (The JSON import is loosely typed. The cast tells TypeScript the shape.)
  - Is `getProducts` a real API call? (No, a local fake with a 500 ms delay.)
  - Why `keyExtractor`? (Each row needs a stable unique key, like `key` in React lists.)
  - Does `FlatList` need a fixed height on web? (It scrolls inside its parent. The parent has `flex: 1`. Could not verify in a browser window.)

### Step 2: Loading and errors

- **Result:** Done
- **What I did:** Applied the new code.
- **Checks:** tsc ok.
- **Unclear or missing:** "**Try it:** change `resolve(products)` to `reject(new Error('Network down'))`" is clear. But `reject` is not in the function's parameter list (`(resolve) =>`), so the attendee must also change the arrow to `(resolve, reject)`. The step does not say. Wrong or incomplete instruction: the literal edit gives a TypeScript and runtime error (`reject` is not defined).
- **Questions an attendee might ask:**
  - Where does `reject` come from? (Add it as the second parameter of the `Promise` callback.)
  - Why `Pressable` for Retry and not `Button`? (`Pressable` is unstyled and flexible. `Button` looks different per platform.)
- **Suggested fix:** In "Try it", write: `new Promise((resolve, reject) => { setTimeout(() => reject(new Error('Network down')), 500); })`.

### Step 3: Interactivity

- **Result:** Done
- **What I did:** Applied the new code.
- **Checks:** tsc ok.
- **Unclear or missing:** "A `Pressable` makes anything tappable." On web it is clickable and a `Pressable` becomes a focusable `div`. Not mentioned. The `TextInput` on web will show the browser focus outline, which looks different from the phone. Could not verify.
- **Questions an attendee might ask:**
  - Why is the Clear button not a `Button`? (See Step 2.)
  - Why `gap`? (Space between children in a row or column. React Native supports it.)
  - Is there a mouse versus touch difference? (On web `onPress` fires on click, and the cursor is a pointer.)

### Step 4: State

- **Result:** Done
- **What I did:** Applied the new code.
- **Checks:** tsc ok.
- **Unclear or missing:** "Type 'pixel' and the list shrinks." I confirmed "Google Pixel 9" is in the data. "`onChangeText` gives you the new text, not an event." Good, a web React dev will expect `e.target.value`.
- **Questions an attendee might ask:**
  - Why `trim()`? (So a trailing space still matches.)
  - Why filter on every render and not in state? (It is derived data. State would go stale.)

### Step 5: Accessibility

- **Result:** Done
- **What I did:** Applied the new code.
- **Checks:** tsc ok.
- **Unclear or missing:** "Optional: turn on VoiceOver ... or TalkBack ..." Nothing for web. Web attendees can use the browser's accessibility inspector (Chrome DevTools, Elements, Accessibility tab) or a screen reader such as VoiceOver on macOS (Cmd+F5) or NVDA on Windows. From `createDOMProps` in `react-native-web`, `accessibilityLabel` and `accessibilityRole` are accepted and mapped to `aria-label` and `role`. So the code works on web. Newer docs prefer `aria-label` and `role`, but the guide uses the older names, which is fine.
- **Questions an attendee might ask:**
  - Is this just `aria-label`? (On web, yes. On native it becomes the platform's label.)
  - Why label an `Image` with the product name? (Screen readers cannot see the picture.)
- **Suggested fix:** Add: "On web, open DevTools > Accessibility to see the labels, or turn on your computer's screen reader."

### Step 6: SearchBar component

- **Result:** Done
- **What I did:** Replaced the whole file as told.
- **Checks:** tsc ok. Tests: `SearchBar.test` passes.
- **Unclear or missing:** "This replaces the whole starter file, including its notes." Clear. The starter file has `// TODO` notes and an unused `colors` import; replacing them is fine.
- **Questions an attendee might ask:**
  - Why does the Clear button only show with text? (`value ? ... : null`.)

### Step 7: ProductTile component

- **Result:** Done
- **What I did:** Replaced the whole file.
- **Checks:** tsc ok.
- **Unclear or missing:** The starter declared `onPress`, `isFavorite` and `onToggleFavorite` as required, and the guide's version makes them optional. Explained in the text. The shadow is back to plain `shadow*` and `elevation`, so it shows on web (see Section 3).
- **Questions an attendee might ask:**
  - Why is `isFavorite` in the props if it is unused? (Section 4 uses it. Add: "unused for now".)
  - Why is the `badge` `position: 'absolute'`? (Overlaid on the image. Same as CSS.)

### Step 8: Use them in the list screen

- **Result:** Done
- **What I did:** Replaced the whole file.
- **Checks:** tsc ok. Full jest after Section 2: favourites, navigation and App tests still fail, as expected.
- **Unclear or missing:** Nothing blocking. "The list is a lot shorter." Good.
- **Questions an attendee might ask:**
  - Why did the margin change? (`listContent` gives the horizontal padding, the tile has `marginBottom`.)
- **Could not verify:** the list looks the same as before. On a wide browser window, cards stretch full width. Section 2 does not mention window size. A web attendee may want to narrow the window or use DevTools device mode.

## Section 3: Navigation and platforms

### Step 1: Navigation

- **Result:** Done
- **What I did:** Added `ProductListScreenProps` to `src/types/navigation.ts`, then the `navigation` prop and `onPress` in the list screen.
- **Checks:** tsc ok.
- **Unclear or missing:**
  - "Open `src/App.tsx` and find the two `Stack.Screen` lines." Fine.
  - Nothing about web. `App.tsx` has no `linking` option, so the browser URL will stay at `/` on both screens and the browser back button will leave the app (or do nothing) and not go back to the list. A page refresh on the details screen returns to the list. The header back arrow should work. Could not verify, expectation from React Navigation v7 defaults.
  - The details title is `''` (set in `App.tsx`), so the browser tab title may be blank or the app name on that screen.
  - "a Pressable that opens a screen": Wrong or stale? No. Tapping the heart is not wired until Section 4, as the guide says.
- **Questions an attendee might ask:**
  - Why is the URL not changing? (Web URL sync is opt-in via the `linking` prop. Not covered in this workshop.)
  - Why does back in the browser not go back? (Same reason.)
  - What is `NativeStackScreenProps`? (Types for `navigation` and `route` for one screen.)
  - Why `{ id }` and not the whole product? (Keep params small. The details screen looks it up.)
- **Suggested fix:** Add a "On web" note: "The URL stays the same and the browser back button does not go back. Use the arrow in the app header. Linking the URL to screens is a separate feature."

### Step 2: Platform specific styles

- **Result:** Done
- **What I did:** Applied the new code.
- **Checks:** tsc ok.
- **Unclear or missing:** "`Platform.select` picks the right one for each platform." The object only has `ios` and `android` keys. From `react-native-web/dist/exports/Platform/index.js`: `select: obj => 'web' in obj ? obj.web : obj.default`. With neither key, it returns `undefined`, and `...undefined` adds nothing. So on web the tile has no shadow after this step. This is a visible change. Section 1 and Step 7 had a shadow on web. The line "Section 1 already worked, because each platform ignores the other's styles" is true for web too, which makes this step look like a downgrade for a web attendee.
  - TypeScript allows it (tsc was clean).
  - The guide's closing line in Step 3, "if you can, run on a second platform and compare the shadows", would show web with none.
- **Questions an attendee might ask:**
  - What does `Platform.select` return when my platform is not listed? (`undefined`. You can add `default: {}` or `web: { boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }`.)
  - Why spread (`...`) the result? (It returns a style object. Spread merges it into `card`.)
  - Was the old code wrong? (No, it worked. This is just explicit.)
- **Suggested fix:** Add a `web:` entry, for example `web: { boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }`, and a line: "On web you get the `web` key. If you list none, the web gets no shadow."
- **Could not verify:** whether the shadow disappears in the browser. Strong expectation from the source.

### Step 3: Safe area

- **Result:** Done
- **What I did:** Applied the new code.
- **Checks:** tsc ok. Tests: 7 favourites tests still fail, expected.
- **Unclear or missing:**
  - "Phones have notches and home bars." A web attendee has neither. "Check it: look at the bottom of the list. Does it sit clear of the home bar?" cannot be done on web. They will think they skipped something.
  - On web, `SafeAreaView` from `react-native-safe-area-context` runs but gives zero insets in a normal desktop browser. Nothing changes. Could not verify.
  - "SafeAreaView" is imported from `react-native-safe-area-context`, not from `react-native`. The text does not say why (the one from `react-native` is iOS only and deprecated). Jargon.
  - The import is added below the types import. Order does not match the rest. Harmless.
- **Questions an attendee might ask:**
  - What is a home bar? (The thin line at the bottom of newer iPhones.)
  - Why is it not from `react-native`? (The core one is old and iOS only.)
  - What should I see on web? (No change. That is correct.)
- **Suggested fix:** Add: "On web nothing changes. Skip the check, or open DevTools device mode and choose an iPhone to see the idea."

## Section 4: Storage

### Step 1: Storage

- **Result:** Done
- **What I did:** Applied the diff to `favoritesStorage.ts`. The diff replaces `// TODO` lines; the starter file matched.
- **Checks:** tsc ok.
- **Unclear or missing:**
  - "`AsyncStorage` saves small pieces of data on the phone." On web it uses `window.localStorage` (I read `AsyncStorage.ts` in `node_modules`; the file without `.native` is the web one). So the data lives in the browser, per site address (`localhost:8081`), and survives closing the tab and the browser.
  - "It is already installed." True (`package.json`: `2.2.0`).
- **Questions an attendee might ask:**
  - Where is the data on web? (In the browser's local storage. DevTools > Application > Local Storage > `favoriteProductIds`.)
  - Why `JSON.stringify`? (Stores only strings.)
  - Why catch and ignore errors? (Best effort. A real app would report them.)
- **Suggested fix:** Add: "On web this is the browser's local storage. Open DevTools > Application to see it."

### Step 2: API

- **Result:** Done
- **What I did:** Applied the diff to `favoritesApi.ts`.
- **Checks:** tsc ok. `favoritesStorage` and `favoritesApi` tests now pass.
- **Unclear or missing:** The diff changes `getFavoriteIds` from `async function` to a plain `function` returning a promise. Fine. "Why two layers?" explained.
- **Questions an attendee might ask:**
  - Why not call `AsyncStorage` from the screen? (Swap the source later, as the guide says.)

### Step 3: The heart

- **Result:** Done
- **What I did:** Applied the diff to `ProductTile.tsx`.
- **Checks:** tsc ok.
- **Unclear or missing:**
  - "The inner `Pressable` takes the tap first, so the card's `onPress` does not run." On web this is also true. From `PressResponder.js` in `react-native-web`, the click handler calls `event.stopPropagation()` and "`onPress` is only called on the first ancestor of the native click target that is using the PressResponder". So a click on the heart does not open the details. Could not verify in a browser.
  - On web a button inside a button-like element is not valid HTML. Not a problem in the app. Ignore.
  - The `♥` and `♡` characters rely on the system font. They should render in a browser.
- **Questions an attendee might ask:**
  - Why is the heart `position: 'absolute'`? (Sits on top of the card's top right.)
  - Why `isFavorite && styles.favoriteIconActive`? (`false` in a style array is ignored.)

### Step 4: Connect the list

- **Result:** Done
- **What I did:** Replaced the list screen with the "New code" block.
- **Checks:** tsc ok. Tests: **8 of 8 suites pass, 27 of 27 tests pass.**
- **Unclear or missing:**
  - "Focus means the screen is the one in view." On web there is no tab switch, but coming back from details still triggers focus, so it works.
  - "`useCallback` gives it a stable function." A React dev knows this. Fine.
  - The imports are in a slightly odd order (`SafeAreaView` after the types). Harmless.
  - "Check it", step 2: "Close the app (swipe Expo Go away), then open it again." Does not apply to web. Web equivalent: "Close the tab, open `http://localhost:8081` again" or press refresh. Note that with `npm run web` the page reload also reloads the bundle. Clearing site data, or a private window, will lose favourites.
  - Step 4: "Optional: run `npm test`. Every test should pass." True here.
- **Questions an attendee might ask:**
  - Does refreshing the browser count as "closing the app"? (Yes, it restarts the app. Storage should survive.)
  - Why does the heart on the details screen already work? (Section 4 note: it already calls the same api.)
  - Why `extraData`? (`FlatList` only redraws when `data` changes. `extraData` tells it other state matters.)
- **Suggested fix:** Replace step 2 with "Close the app. Phone: swipe Expo Go away. Web: close the tab and open the page again."

## Questions to prepare for

**Setup and web**

- Do I need Expo Go, a QR code or an account on web? (No.)
- What address does the browser open? (Usually `http://localhost:8081`. Press `w` in the terminal if it does not open.)
- Why do I see "`shadow*` style props are deprecated"? (React Native Web warning. Harmless.)
- Does `npm test` check web? (No. `jest-expo` uses the iOS preset.)

**React Native basics**

- Is `View` a `div` and `Text` a `span`? (Close enough. Text must be inside `Text`.)
- Why are styles objects and why no `px`? (Units are points. Web turns them into pixels.)
- Why `FlatList` and not `.map`? (It only renders rows near the screen.)

**Navigation**

- Why is the browser URL not changing and why does back not work? (No `linking`. Use the header arrow.)

**Platforms**

- What does `Platform.select` return for web? (`web` or `default`, else `undefined`, so no shadow.)
- Why do I see no safe-area change? (Desktop browsers have no notch.)

**Storage**

- Where is favourite data on web? (Local storage, per address.)
- How do I reset it? (DevTools > Application > Clear site data, or remove the key.)

## Could not verify

I cannot open a browser or run the app. All of the following are expectations from reading code in `node_modules`, not things I saw.

- README setup: `npm install` and `npm run web`, tab opens, header "Phones & SIM cards", blank screen.
- Section 1: Step 1 to 4 layout, the image appearing only after Step 4, shadow on web (should show, plus a console warning).
- Section 2: spinner, 500 ms delay, Retry flow, search filtering, Clear button, list layout on a wide window, focus outline on the text input.
- Section 2, Step 5: DevTools accessibility tree, screen reader behaviour.
- Section 3: tapping a tile opens the details; browser URL and back button behaviour; the shadow vanishing after Step 2; safe area (no change).
- Section 4: hearts toggling, favourites surviving a tab close and reopen, the heart not opening the details.
- Whether `@expo/metro-runtime` is installed for web. `react-dom` (19.2.3) and `react-native-web` (0.21.3) are in `node_modules`. I could not find `@expo/metro-runtime` at the top level; Expo may bundle it elsewhere. Not checked further.

## Environment notes

- I could not run `npm install` or `npm run web`. I used the prepared copy and its `node_modules` link.
- Only `Read`, `Write` and `Edit` plus the two allowed commands were used. There was no `Glob` or `Grep` available in my session, so I found files by guessing the paths in the guide. Nothing was denied.
- Every `npx` command prints `npm warn Unknown user config "always-auth"`. This comes from the machine's npm config, not the guide.
- `tsc` is fast (a few seconds). Full jest run is about 4 to 30 seconds.
- Version facts from `package.json`: `expo ~57.0.25`, `react-native 0.86.3`, `react-native-web ^0.21.2` (installed 0.21.3), `react-dom 19.2.3`, `@react-native-async-storage/async-storage 2.2.0`.

## Web-specific findings

| Step | Works on web | Note |
| --- | --- | --- |
| README: Setup and Web | differs | Web section is 2 lines. Says nothing about the browser tab, the URL, pressing `w`, or that no Expo Go, QR code or login is needed (only a shared line mentions the account). |
| Section 1, Step 2: Text | differs | "A bare string crashes the app" is a native fact. React Native Web may render it without crashing. Could not verify. |
| Section 1, Step 4: shadows | yes | `shadow*` becomes a CSS `box-shadow`. `elevation` is ignored. A dev console warning about deprecated `shadow*` appears. Guide does not mention either. |
| Section 2, Step 1: FlatList | yes | Scrolls inside the page. Wide windows stretch the cards. Not mentioned. |
| Section 2, Step 2: Try it (reject) | yes | Same on web. The guide's edit is incomplete (`reject` is not a parameter). |
| Section 2, Step 3: TextInput and Pressable | differs | Click not tap, browser focus outline on the input, pointer cursor. Not mentioned. |
| Section 2, Step 5: accessibility | yes | `accessibilityLabel` and `accessibilityRole` map to `aria-label` and `role`. Guide only names VoiceOver and TalkBack. Suggest the DevTools Accessibility tab. |
| Section 3, Step 1: navigation | differs | No `linking`, so the URL does not change and the browser back button does not go back. The header arrow works. Not mentioned. |
| Section 3, Step 2: Platform.select | no | Web gets neither `ios` nor `android`, so the shadow vanishes. Add `default` or `web`. |
| Section 3, Step 3: SafeAreaView | differs | No notch or home bar on desktop, so no visible change, and the "Check it" cannot be done. Suggest: skip it, or use DevTools device mode. |
| Section 4, Step 1: AsyncStorage | differs | Uses `window.localStorage`, per origin. The guide says "on the phone". |
| Section 4, Step 3: nested Pressable | yes | `react-native-web` stops the click bubbling to the outer `Pressable`, so the heart does not open the details. |
| Section 4: "Close the app" | differs | "Swipe Expo Go away" does not apply. Use "close the tab and reopen the page". Clearing site data or a private window loses favourites. |

Suggested wording for web attendees, one line at the top of `WORKSHOP.md`:

> Running on the web? Read "tap" as "click" and "phone" as "browser". Where something only applies to phones (home bar, swiping an app away), a note tells you what to do on web.

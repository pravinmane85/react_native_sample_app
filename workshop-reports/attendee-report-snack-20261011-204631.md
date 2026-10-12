# Workshop attendee report (Expo Snack path)

**Date:** 2026-10-11
**Role:** Junior dev, React and TypeScript, no mobile experience. Did not download the repo. Uses Expo Snack in a browser.
**Guide version:** HEAD c09f15e (branch workshop-1), working tree dirty (from the git status I was given; I ran no git command).
**Overall:** I could finish Section 1 (about 15 min) after some guessing about where to paste. I could not do Section 2 past Step 1 part 3 without inventing files the guide never tells a Snack user to create. Sections 3 and 4 are not doable as written. The README says "Section 1 only", but the guide itself never says that, so a Snack user reading WORKSHOP.md alone would waste time.

How I worked: I cannot open Snack and have no network, so everything below is reasoned from the guide text. Where I describe Snack behaviour I say "I believe". Anything about Snack behaviour is marked "Could not verify" in the last section.

## Summary

| Section | Steps | Completed | Needed help | Unclear |
| --- | --- | --- | --- | --- |
| 1: Product card | 4 | 4 (with guesses) | 0 | 4 (where to paste, file name, export) |
| 2: Show the products | 8 | 1 partly (Step 1, parts 1 and 2 merged), Steps 2 to 5 only with my own rewrite | Steps 1 to 8 | 8 |
| 3: Navigation and platforms | 3 | Step 2 only (as a style tweak, tile not on screen); Steps 1 and 3 no | 3 | 3 |
| 4: Storage | 4 | 0 (Step 1 is possible in isolation, but nothing to see) | 4 | 4 |

"Needed help" here means NEEDS HELP in the sense of the base file: I could not tell what to do from the guide alone. There were no `*.solution` files visible to me, so I did not use any.

## Top issues

1. WORKSHOP.md never mentions Snack. Only one sentence in README does. Add a Snack note at the top of every section (suggested text below), so people see it before they start.
2. README's Snack paragraph is too thin: "you can paste the Section 1 code into Expo Snack". It does not say which file (`App.js`? `App.tsx`?), how to start a new Snack, or that the Section 1 code has `export default function ProductListScreen()`, which is not named `App`.
3. Section 1 steps are written as diffs against `ProductListScreen.tsx`. In Snack there is no such file and no starter stub. The "New code" block is the only usable part. Say so, and give one ready to paste `App.tsx` for Snack.
4. Section 2 Step 1 depends on four files (`src/data/products.json`, `src/data/products.ts`, `src/api/productsApi`, `src/types/product.ts`) that a Snack user has never seen. The guide never shows the shape of `Product` or the JSON, so I cannot recreate them. Section 2 Steps 6 to 8 also need `src/components/common/...` files and folder `index` files for imports like `'../../common/ProductTile'`.
5. Sections 3 and 4 need `@react-navigation/native`, `@react-navigation/native-stack`, `react-native-safe-area-context`, `@react-native-async-storage/async-storage`, plus `src/App.tsx`, `ProductDetailsScreen` and `types/navigation.ts`, none of which a Snack user has. The guide says "`src/App.tsx` already sets up a stack" and "It is already installed". Neither is true for Snack.

## README: Browser Based

- **Result:** Done with guessing
- **What I did:** Read the paragraph. Opened (in my head) snack.expo.dev, expecting a blank project with `App.js`.
- **Snack:** I expect a default `App.js` with some sample code, a phone preview and a web preview. I believe new Snacks default to JavaScript and you can add `App.tsx`; Could not verify.
- **Unclear or missing:**
  - "paste the Section 1 code into Expo Snack": which of the four steps? The final one (Step 4)?
  - Which file do I paste into? No file named.
  - The code exports `ProductListScreen`, not `App`. Do I rename it? Snack needs a default export from `App`. A default export with any name probably works, because Snack imports the default export of `App.js`, but I am not sure (Could not verify).
  - "When the app runs you should see a header, "Phones & SIM cards", and a blank screen." In Snack there is no header (the header comes from React Navigation in the real app). So the starting point looks different. I would think I did something wrong.
  - "Snack works for Section 1 only. Later sections use several files." Snack does support multiple files. That statement is not quite true and it tells me nothing about how far I could go.
  - README Section 1 "Setup" is all about `npm install`, Node, Expo Go. A Snack user should be told to skip it and where to jump to.
- **Questions an attendee might ask:**
  - "Do I need an Expo account for Snack?" (I believe not for running; saving may ask you to sign in. Could not verify.)
  - "Which Expo SDK version should the Snack use?" (Should match the repo's SDK so the code behaves the same. The guide does not say what version.)
  - "How do I see it on my phone?" (Snack shows a QR code for Expo Go, and a Web tab. Say so.)
  - "Why is there no header like in the README?" (Because the header comes from navigation, which Snack does not have.)
- **Suggested fix:** Replace the paragraph with 4 or 5 lines: open the link, pick the blank template, delete everything in `App.js`, paste the Step 4 "New code" block, rename the function to `App` or add `export { ProductListScreen as default }`, and expect a single card with no header.

## Section 1: Build a product card

Section note: "Open `src/components/screens/ProductListScreen/ProductListScreen.tsx`. The app starts with a blank screen under the header." Not true in Snack: there is no such path, no header, and no "starts with" code. "Optional: `npm test` checks your work" is not possible in Snack. "Save after each step and the app reloads by itself": I believe Snack reloads as you type, so this is fine, but Could not verify.

### Step 1: View

- **Result:** Done with guessing
- **What I did:** Selected all in `App.js`, pasted the "New code" block (`import { View } from 'react-native'` ... `export default function ProductListScreen()`).
- **Checks:** Snack: I expect a blank white preview. I believe Snack will run a default-exported function with any name, so no error. Could not verify.
- **Unclear or missing:**
  - "**`src/components/screens/ProductListScreen/ProductListScreen.tsx`**" heading is meaningless to me.
  - The code is in `.tsx` style but is plain JS at this point (no type annotations), so it also works in `App.js`.
  - "The screen stays blank. That is correct." In Snack I cannot tell a blank result from a broken one. A blank preview and a crashed preview both look empty until I check the console or error bar.
- **Questions an attendee might ask:**
  - "Is `View` a `div`?" (Yes, roughly: a box that holds other things.)
  - "Why is the preview white and empty?" (That is correct.)
- **Suggested fix:** For Snack, tell people "the preview stays white".

### Step 2: Text

- **Result:** Done
- **What I did:** Replaced the file with the "New code" block.
- **Checks:** Snack: I expect the text "iPhone 18" in the top left of the preview. On a phone it may sit right under the status bar, because there is no safe area or header (I believe Snack's phone preview has no padding at the top; Could not verify). Text could be hidden behind the notch or status bar on a real phone.
- **Unclear or missing:** The text can overlap the status bar in Snack and on the Expo Go phone, and the guide does not warn about it (the real app has a header that hides this). Section 3 Step 3 explains safe areas, but too late.
- **Questions an attendee might ask:**
  - "Why does my text touch the top of the screen?" (No header and no safe area in Snack. Add `paddingTop: 50` for now, or wait for the container style in Step 4.)
  - "Why must text be in `<Text>`?" (React Native has no text nodes outside `Text`.)
- **Suggested fix:** Snack note about the status bar.

### Step 3: Image

- **Result:** Done
- **What I did:** Pasted the "New code" block with the `Image` and the picsum URL.
- **Checks:** Snack: I expect still only "iPhone 18", because the image has no width or height. The guide says so ("you will not see it until Step 4"). Good.
- **Unclear or missing:**
  - The URL `https://picsum.photos/seed/iphone18/600/600` is an external site. If the workshop network blocks it, nothing loads and there is no message. No fallback is mentioned. I believe Snack can load remote images; Could not verify on this network.
  - "`uri` is the address of the image": clear.
- **Questions an attendee might ask:**
  - "Why does an image from the web need a size but not a local one?" (RN knows the size of bundled images but not remote ones.)
  - "Does the image need a `require`?" (Not for remote URLs.)
- **Suggested fix:** None for Snack. For all attendees: say what to do if the image never shows (check network).

### Step 4: StyleSheet

- **Result:** Done
- **What I did:** Pasted the final "New code" block.
- **Checks:** Snack: I expect a white screen with one rounded card with a shadow, a 110 by 110 picture on the left and "iPhone 18" in bold on the right. `margin: 16` on the card means it sits 16 below the top, which may still touch the status bar on a phone. On the web preview I believe `elevation` is ignored and `shadow*` styles are turned into a CSS box-shadow (shows a shadow); Could not verify.
- **Unclear or missing:**
  - The diff shows a trailing `+` blank line at the end of the file: tiny noise.
  - The bullets say "Move the `Image` above the `Text`", but the diff also wraps everything in a new `card` `View`. Not explained in the bullets.
  - `gap`, `alignItems` etc are described but `container`'s `backgroundColor: 'white'` is not.
- **Questions an attendee might ask:**
  - "Why is there no CSS file?" (Styles are JS objects.)
  - "Why do I set both `shadow*` and `elevation`?" (Explained. Good.)
  - "Where are the units (px)?" (Plain numbers, density independent.)
- **Suggested fix:** For Snack, say "this is the end of what Snack does smoothly".

## Section 2: Show the products

Section note: "You work in the list screen." For Snack there is no list screen file. I would work in `App.tsx` and replace `ProductListScreen` with `App`.

### Step 1: Data fetching

- **Result:** Blocked (partly done with my own invention)
- **What I did:** Read the three parts. Part 1 says "`src/data/products.json` is provided". In Snack nothing is provided. Part 2 says "The file already exists." Not for me. Part 3 imports `'../../../api/productsApi'` and `'../../../types/product'`, paths that make no sense for a single `App.tsx`.
- **Checks:** Snack: I expect an error, "Unable to resolve module ../../../api/productsApi" (or similar). The preview would show a red error bar.
- **Unclear or missing:**
  - The guide never shows what `Product` looks like or what is in `products.json`. From later code I can guess `id: string`, `name`, `image`, `make`, `price`, `pricePeriod?`, `badge?`, but I would be guessing, and the JSON would need real phone data. I would have to invent it.
  - "`import data from './products.json'`": I believe Snack can hold a `.json` file and import it, because Snack lets you add files of any type, but I am not sure the bundler handles JSON imports in every SDK (Could not verify). If it works, I would need to create `products.json` by hand, with data I do not have.
  - `import { Product } from '../types/product'` and `data as Product[]` are TypeScript. In `App.js` they are syntax errors. I would need `App.tsx` and `.ts` files. I believe Snack supports TypeScript files (`.tsx`) and strips types without checking them, so the `as Product[]` would work but types are not checked. Could not verify.
  - "This takes three parts." For Snack I could fold everything into one file: a hard-coded `PRODUCTS` array in `App.tsx`, then `getProducts` as a local function. The guide never suggests that.
  - Paths use `'../../../api/productsApi'` (folder with an index). In a Snack I would need `api/productsApi/index.ts` as well.
- **Needed help:** Yes. I could not tell what to do. No `*.solution` file is visible to me. Without the data I cannot continue. **NEEDS HELP.**
- **Questions an attendee might ask:**
  - "Where do I get `products.json`?" (Provide a Snack link, or paste the JSON into the guide as a collapsible block.)
  - "Can I use JavaScript instead of TypeScript?" (Yes in Snack, but then drop `useState<Product[]>` and the `Product` import.)
  - "Why is there a fake delay?" (Looks like a real network call.)
  - "What is `.then(setProducts)`?" (Passing the setter as the callback.)
- **Suggested fix:** Give Snack users a one file version: `PRODUCTS` array inline (three or four items), `getProducts` inside `App.tsx`, and a note on what to delete.

### Step 2: Loading and errors

- **Result:** Done only in my own single-file rewrite
- **What I did:** If I had an inline `getProducts`, I could paste the "New code" body. The imports at the top (`'../../../api/productsApi'`, `'../../../types/product'`) have to be removed by me.
- **Checks:** Snack: I expect a spinner for half a second, then the list. The "Try it" (edit `productsApi.ts` to reject) does not apply, because there is no `productsApi.ts`. I would have to edit my inline function.
- **Unclear or missing:** "change `resolve(products)` in `productsApi.ts`": file does not exist for me.
- **Questions an attendee might ask:**
  - "What does `.finally` do?" (Runs after success or failure.)
  - "Why is the spinner not centred?" (No style on `ActivityIndicator`.)
- **Suggested fix:** Snack note: "do the Try it in your inline function".

### Step 3: Interactivity

- **Result:** Done in my own single-file rewrite
- **What I did:** Pasted the "New code" with `TextInput` and Clear `Pressable`, removed the two project imports.
- **Checks:** Snack: I expect a search box with a "Clear" label on the right above the list. Typing shows letters but the list does not change. Matches the guide.
- **Unclear or missing:** `gap` in `StyleSheet` is used (also in `message`). I believe it works in current React Native, and on web, but I do not know the minimum SDK for it (Could not verify).
- **Questions an attendee might ask:**
  - "Why does `Pressable` have no styling when pressed?" (Not by default.)
  - "On the web preview, why is the input outlined in blue?" (Browser focus ring. Not mentioned.)
- **Suggested fix:** None specific.

### Step 4: State

- **Result:** Done in my own single-file rewrite
- **What I did:** Pasted "New code".
- **Checks:** Snack: typing "pixel" shrinks the list, assuming my inline data has Pixel items. If I invented the data, the result depends on what I invented. Nothing in the guide says what products exist, so "type 'pixel'" may show zero results.
- **Unclear or missing:** The result depends on the data, which Snack users do not have.
- **Questions an attendee might ask:**
  - "Why `query.trim().toLowerCase()`?" (Ignore spaces and case.)
  - "`onChangeText` gives text not an event?" (Stated.)
- **Suggested fix:** Give the Snack data set so "pixel" works.

### Step 5: Accessibility

- **Result:** Done in my own single-file rewrite (nothing to see)
- **What I did:** Pasted "New code".
- **Checks:** Snack: no visible change. VoiceOver or TalkBack only work on a real phone through Expo Go. On the Snack web preview I believe I can inspect the DOM for `aria-label`, but it is not mentioned. Could not verify.
- **Unclear or missing:** "Optional: turn on VoiceOver..." Only for people with a device.
- **Questions an attendee might ask:**
  - "How do I check this without a screen reader?" (Not possible in Snack beyond reading the code.)
- **Suggested fix:** Mark as read only for Snack users.

### Step 6: SearchBar component

- **Result:** Blocked (partly)
- **What I did:** Read "Replace the whole of `src/components/common/SearchBar/SearchBar.tsx` with:". In Snack I would have to add a file. I believe Snack has an "add file" button in the file explorer, and I could create `components/SearchBar.tsx`. Could not verify, and the guide does not say so.
- **Checks:** Snack: no visible change, as the guide says ("Nothing changes on screen until Step 8").
- **Unclear or missing:**
  - Only one code block, in a `<details>` named "SearchBar.tsx" with no diff. Fine.
  - Import path in Step 8 is `'../../common/SearchBar'`, which assumes a folder with `index.ts`. In Snack I would need to pick my own path and change the import.
  - "This replaces the whole starter file, including its notes": no starter file for Snack.
- **Needed help:** Yes: which file name, where, and how to import it. **NEEDS HELP.**
- **Questions an attendee might ask:**
  - "Why is it `export function` and not `export default`?" (Named export, so import with braces.)
  - "Why does Clear hide when empty?" (`value ? ... : null`.)
- **Suggested fix:** Snack note listing exact file names and import paths to use.

### Step 7: ProductTile component

- **Result:** Blocked (partly)
- **What I did:** Same as Step 6: add a new file `components/ProductTile.tsx`, paste.
- **Checks:** Snack: no visible change until Step 8.
- **Unclear or missing:**
  - It imports `Product` from `'../../../types/product'`, so I need that file too, and the guide does not show it. The component uses `product.make`, `product.badge`, `product.price`, `product.pricePeriod`, so the type must have those fields. In Snack I could write `product: any` or invent the interface, which is my own knowledge, not from the guide.
  - Unused props `isFavorite` and `onToggleFavorite` are destructured later, fine.
  - The badge uses `position: 'absolute'`; that is not explained anywhere.
- **Needed help:** Yes, for the missing `Product` type. **NEEDS HELP.**
- **Questions an attendee might ask:**
  - "What is `position: 'absolute'` in RN?" (Place it relative to the parent card, like in CSS.)
  - "Why are some props unused?" (Used in later sections.)
- **Suggested fix:** Show the `Product` interface in the guide.

### Step 8: Use them in the list screen

- **Result:** Blocked (partly)
- **What I did:** "Replace the whole file with" the block. For Snack that is `App.tsx`, and the imports `'../../common/ProductTile'` and `'../../common/SearchBar'` and `'../../../api/productsApi'` and `'../../../types/product'` all fail unless I match the folder structure. I would need to edit each import by hand.
- **Checks:** Snack: if all files exist and imports are fixed, I expect a search bar, a spinner, then tiles with make, name and price in a column and a badge, and no header. Otherwise a red "Unable to resolve module" bar.
- **Unclear or missing:**
  - The function is still named `ProductListScreen`, so I need to rename it (see README issues).
  - "The list is a lot shorter": fine.
  - A Snack user has to recreate `index.ts` files for folders if they copy the paths literally. I believe Snack can have folders (`components/common/SearchBar/index.ts`). Could not verify.
- **Needed help:** Yes. **NEEDS HELP.**
- **Questions an attendee might ask:**
  - "Why `contentContainerStyle`?" (Style for the inside of the scroll area, not the list box.)
  - "Why does the list show nothing?" (Likely a missed import or empty data.)
- **Suggested fix:** Give a "Snack path" version of the imports (`./components/ProductTile`, `./components/SearchBar`) and say so.

## Section 3: Navigation and platforms

Section note: Starts with "`src/App.tsx` already sets up a stack with the list screen and the details screen. `ProductDetailsScreen` is already built." A Snack user has none of these.

### Step 1: Navigation

- **Result:** Blocked
- **What I did:** Read it. It asks me to open `src/App.tsx` and "find the two `Stack.Screen` lines". I have no `App.tsx` stack and no `ProductDetailsScreen`. I would have to write both myself, with no guidance.
- **Checks:** Snack: I believe Snack installs `@react-navigation/native` and `@react-navigation/native-stack` when I import them, and also asks for peer dependencies (`react-native-screens`, `react-native-safe-area-context`). On a recent SDK that works in most cases, but versions matter (Could not verify). Even if all installed, the guide gives no code for the `NavigationContainer`, the stack or the details screen, so I could not make it work.
- **Unclear or missing:**
  - `src/types/navigation.ts` and `import type { NativeStackScreenProps }`: needs TypeScript and a file.
  - "That is where the names `ProductList` and `ProductDetails` come from": I have no such place.
  - The heart on "the details screen" refers to a screen I never see.
  - "navigation prop": Jargon for me. Explained in one line, fine.
- **Needed help:** Yes. No path forward. **NEEDS HELP.**
- **Questions an attendee might ask:**
  - "What is a stack navigator?" (A pile of screens; navigate pushes one, back pops it.)
  - "Why do I add types for `navigation`?" (To get autocomplete and check the route names.)
  - "Where does `navigation` come from?" (The navigator passes it as a prop to every screen.)
- **Suggested fix:** Either give Snack users an `App.tsx` with the stack and a minimal details screen, or tell them to stop here.

### Step 2: Platform specific styles

- **Result:** Partly. Possible as a code edit to the `ProductTile` file I created.
- **What I did:** Applied the `Platform.select` change to my `ProductTile`.
- **Checks:** Snack: on the web preview, `Platform.OS` is `web`, so neither `ios` nor `android` matches and I believe `Platform.select` returns `undefined`; spreading `undefined` is fine in an object, so no crash, but no shadow at all on the web preview. Could not verify. On a phone via Expo Go the shadow appears. I believe Snack also has an iOS/Android toggle in the preview (in recent versions, the web only or device simulator); Could not verify.
- **Unclear or missing:**
  - "Section 1 already worked, because each platform ignores the other's styles." Not true for web, which is the Snack default view.
  - "Optional: run on a second platform" later: I cannot unless I use my phone.
- **Questions an attendee might ask:**
  - "Why is my shadow gone on the web?" (Web is neither iOS nor Android: add a `default` key.)
- **Suggested fix:** Mention `web` or add `default: {}` in the example.

### Step 3: Safe area

- **Result:** Blocked (partly)
- **What I did:** Would import `SafeAreaView` from `react-native-safe-area-context`. I believe Snack auto-adds it (it is a part of the Expo SDK and bundled in Expo Go), so the import should work. Could not verify.
- **Checks:** Snack: no visible change on the web preview. On a phone in Expo Go, the search bar would move below the status bar, which is actually the visible fix I wanted back in Step 2 of Section 1. I believe `SafeAreaView` from this package needs a `SafeAreaProvider` above it, otherwise it can have zero insets or crash on older versions; the real app has it somewhere (probably `App.tsx`), which I cannot see. Could not verify.
- **Unclear or missing:**
  - "With the header showing, you see little change at the top": there is no header for me.
  - The code also uses `navigation` and `ProductListScreenProps` from Step 1, so it will not run without Step 1.
  - Final "Check it: look at the bottom of the list. Does it sit clear of the home bar?" Not seeable in the web preview.
- **Needed help:** Yes, because of Step 1. **NEEDS HELP.**
- **Questions an attendee might ask:**
  - "Why do I import `SafeAreaView` from a package and not `react-native`?" (The built-in one is iOS only and deprecated; the package works on both.)
  - "Do I need a provider?" (Yes, in `App.tsx` for the real app.)
- **Suggested fix:** Say that `SafeAreaProvider` is needed in Snack.

## Section 4: Storage

Section note: "`AsyncStorage` ... is already installed." In Snack it is not installed yet. I believe Snack sees `import AsyncStorage from '@react-native-async-storage/async-storage'` and offers to add the dependency (the editor shows a prompt or adds it automatically), and Expo Go bundles it, so it should work. Could not verify.

### Step 1: Storage

- **Result:** Partly. Possible only in isolation.
- **What I did:** Would add `storage/favoritesStorage.ts` with the "New code" block.
- **Checks:** Snack: no visible change. It has no UI until Step 4. If the package is not auto-added I would see "Unable to resolve module @react-native-async-storage/async-storage".
- **Unclear or missing:**
  - Path: `src/storage/favoritesStorage/favoritesStorage.ts` with an index re-export so that Step 2 can import `'../../storage/favoritesStorage'`. I need to make that folder and index.
  - `catch {` without a binding: needs a TS/JS version that allows it; Babel in Snack should be OK. Could not verify.
  - The diff shows removing `// TODO` lines that only exist in the repo stub.
- **Needed help:** Yes, for file layout. **NEEDS HELP.**
- **Questions an attendee might ask:**
  - "Is AsyncStorage like localStorage?" (Yes, async and text only.)
  - "Where is the data kept in Snack?" (I believe on the device or browser storage of the preview, and it may reset when the Snack reloads. Could not verify.)
- **Suggested fix:** Note for Snack: the package is added when you import it.

### Step 2: API

- **Result:** Partly. Possible as a file, no visible result.
- **What I did:** Would add `api/favoritesApi.ts`.
- **Checks:** Snack: no visible change.
- **Unclear or missing:** Import path `'../../storage/favoritesStorage'` needs to match my own layout.
- **Questions an attendee might ask:**
  - "Why have an api layer for local storage?" (Explained in the guide.)
- **Suggested fix:** None beyond the file layout note.

### Step 3: The heart

- **Result:** Done (if the tile file exists)
- **What I did:** Edited my `ProductTile` file with the diff.
- **Checks:** Snack: I expect a heart in the top right of each tile. Tapping it does nothing yet (no `onToggleFavorite` passed in my list). The nested `Pressable` claim ("The inner `Pressable` takes the tap first") I believe is right on phones and web, but I cannot test it. Could not verify.
- **Unclear or missing:**
  - `♥` and `♡` characters: I believe these render on phones, but the web preview font may show them differently. Could not verify.
  - The heart is `position: 'absolute'` at the top right and the badge is top left. Fine.
- **Questions an attendee might ask:**
  - "Why does tapping the heart not open the product?" (Inner `Pressable` handles it.)
  - "Can I use an icon library?" (Yes; this uses text to avoid extra packages.)
- **Suggested fix:** None.

### Step 4: Connect the list

- **Result:** Blocked
- **What I did:** Read it. `useFocusEffect` comes from `@react-navigation/native`, which only works inside a navigator. Without Section 3 Step 1 I have no navigator, so it throws ("Couldn't find a navigation object" or similar). I could use `useEffect` instead, but that is my own knowledge, and the guide itself warns it only runs once.
- **Checks:** Snack: I expect a red error screen at start-up if I paste as written without a navigator.
- **Unclear or missing:**
  - "Close the app (swipe Expo Go away), then open it again." Not applicable in Snack: I believe reloading the Snack preview (or the browser tab) is the nearest thing, and persisted data may or may not survive. Could not verify.
  - "Optional: run `npm test`" not possible.
  - "Focus", "`useCallback`": not explained in depth; fine for a junior who knows React.
- **Needed help:** Yes. **NEEDS HELP.**
- **Questions an attendee might ask:**
  - "What does 'close the app' mean in a browser?" (Reload the preview; say whether data survives.)
  - "Why not `useEffect`?" (It runs once; the screen stays mounted under the details screen.)
- **Suggested fix:** Give Snack users a `useEffect` variant, and say what "reopen" means.

## Questions to prepare for

**Snack setup**
- Which file do I paste into, and what do I call the component? (`App.tsx`, default export named `App`.)
- Do I need an account? Which SDK version? (Say it.)
- Why is there no header? (Navigation is not set up.)
- Can I use my phone with Snack? (Yes, scan the QR in Expo Go.)

**Files and TypeScript**
- Can I add files? Folders? JSON? (I believe yes. The guide should say so and show exactly how.)
- Do I need `.tsx`? (Yes for type annotations.)
- Where do the types and the data come from? (Show them.)

**Native concepts**
- Why `View` and `Text` and not `div` and `span`? Why can't a string sit in a `View`?
- What is `uri`? Why does a remote `Image` need a size?
- Why `shadow*` and `elevation`? What does `Platform.select` do on web?
- What is a safe area? Do I need a provider?
- What does `FlatList` do that `.map` does not?

**Storage and persistence**
- What does "close the app" mean in a browser? Does `AsyncStorage` persist in Snack?

## Could not verify

- That I can open Snack at all (no network, no browser).
- Which file name Snack uses by default (`App.js` or `App.tsx`), and whether it supports adding TypeScript files with type stripping only.
- That a default export not named `App` works as the entry.
- That `import data from './products.json'` works in Snack.
- That Snack auto-installs `react-native-safe-area-context`, `@react-navigation/*` and `@react-native-async-storage/async-storage` and picks versions that match the SDK.
- That `gap` works on the Snack SDK, and how shadows look on the web preview.
- Whether `Platform.select` returns `undefined` on web (I believe so).
- Whether the picsum image loads on the workshop network.
- Whether `AsyncStorage` data survives a Snack reload.
- Everything that needs a phone: VoiceOver/TalkBack, home bar, second platform shadow comparison.

## Snack-specific findings

| Section or step | Doable in Snack | Why |
| --- | --- | --- |
| README: Browser Based | Partly | Paragraph exists but gives no file, no template, no entry name, and says "no header" nowhere. |
| 1, Step 1: View | Yes | Paste "New code"; rename or default export. Blank preview looks the same as a broken one. |
| 1, Step 2: Text | Yes | Only RN core. Text may sit under the status bar. |
| 1, Step 3: Image | Yes | Needs network for the picsum URL. Nothing visible until Step 4. |
| 1, Step 4: StyleSheet | Yes | Single file, core components only. Best end point for Snack. |
| 2, Step 1: Data fetching | No (as written) | Needs `products.json`, `products.ts`, `productsApi`, `Product` type; none shown. Could be done as one inline file only if the guide gave the data. |
| 2, Step 2: Loading and errors | Partly | Works in one file after removing imports. "Try it" refers to `productsApi.ts`. |
| 2, Step 3: Interactivity | Partly | Works in one file; same import edits. |
| 2, Step 4: State | Partly | Works if the data has "pixel" items. |
| 2, Step 5: Accessibility | Partly | Code works; cannot check with a screen reader in the browser. |
| 2, Step 6: SearchBar | Partly | Needs a new file and a made-up path; the guide does not say how. |
| 2, Step 7: ProductTile | Partly | Needs a new file and the `Product` type, which is not shown. |
| 2, Step 8: Use them | Partly | Imports (`../../common/...`) must be rewritten by hand. |
| 3, Step 1: Navigation | No | Needs navigation packages, `App.tsx` stack, details screen, `navigation.ts`; none provided. |
| 3, Step 2: Platform styles | Partly | Works on a phone via Expo Go; on web neither branch matches. |
| 3, Step 3: Safe area | Partly | Package import probably works; needs Step 1 and a provider. Visual result only on a phone. |
| 4, Step 1: Storage | Partly | Package is probably auto-added; no visible result alone. |
| 4, Step 2: API | Partly | File only; no visible result. |
| 4, Step 3: The heart | Yes | Edit to the tile; heart shows but does nothing yet. |
| 4, Step 4: Connect the list | No | `useFocusEffect` needs a navigator; "close the app" has no clear meaning in Snack. |

### Suggested notes for the top of each section

**README (replace the Browser Based paragraph):**
> **Browser Based (Expo Snack).** Open https://snack.expo.dev/, choose the default template, and use the same Expo SDK version as this project. Skip "Setup" and everything above. Follow Section 1 only. In `App.tsx` paste the last "New code" block of Step 4. Rename `ProductListScreen` to `App`. You will see one card and no header. Stop after Section 1, or read Section 2 for the extra Snack steps.

**Section 1:**
> **Snack users:** you have no `ProductListScreen.tsx`. Paste each "New code" block into `App.tsx` (replace everything) and rename the function to `App`. The preview shows no header, so text may touch the top edge. That is fine.

**Section 2:**
> **Snack users:** you do not have `src/data`, `src/api` or `src/types`. Create one file `App.tsx`. Put the `Product` type and a short `PRODUCTS` array at the top (copy from [link/appendix]). Write `getProducts` in the same file. Remove the `../../../` imports. Steps 6 to 8 need extra files; create `components/SearchBar.tsx` and `components/ProductTile.tsx` and import them as `./components/...`.

**Section 3:**
> **Snack users:** stop here unless you are comfortable adding React Navigation yourself. Step 1 needs files you do not have. Step 2 can be done on the tile. Step 3 needs a `SafeAreaProvider` and is best seen on a phone.

**Section 4:**
> **Snack users:** Steps 1 to 3 work as extra files (Snack adds `@react-native-async-storage/async-storage` when you import it). Step 4 needs React Navigation; use `useEffect` instead of `useFocusEffect`. To "close and reopen" the app, reload the Snack preview.

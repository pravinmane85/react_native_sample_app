# Workshop attendee report

**Date:** 2026-10-11
**Role:** Junior dev, React and TypeScript, no mobile experience (iPhone 17 + Expo Go path)
**Guide version:** c09f15e, working tree dirty (copy at `.workshop-attendee/iphone-20261011-204631`)
**Overall:** I finished all 19 steps in Sections 1 to 4. Type check was clean after every step and `npx jest` ends 27/27 after Section 4. One instruction is broken (Section 2, Step 2 "Try it"). Nothing on screen, on the phone or in Expo Go could be checked. The iPhone setup in the README leaves several gaps.

I did not open any `*.solution` file. I never needed to.

## Summary

| Section | Steps | Completed | Needed help | Unclear |
| --- | --- | --- | --- | --- |
| README setup (iPhone) | 6 | Read only, could not run | 0 | 6 |
| 1. Product card | 4 | 4 | 0 | 1 |
| 2. Show the products | 8 | 8 | 0 | 5 |
| 3. Navigation and platforms | 3 | 3 | 0 | 3 |
| 4. Storage | 4 (guide has Steps 1-4 plus a "Check it") | 4 | 0 | 3 |

Test results after each section (`npx jest --rootDir WORK`):

- After Section 1: 6 passed, 21 failed. Expected, the guide says so.
- After Section 2: 18 passed, 9 failed. The guide does not say what to expect here.
- After Section 3: 20 passed, 7 failed. All remaining failures are favourites.
- After Section 4: 27 passed, 0 failed (8 of 8 suites).

## Top issues

1. **Broken instruction, Section 2 Step 2 "Try it".** It says to change `resolve(products)` to `reject(new Error('Network down'))`. The Promise is written `new Promise((resolve) => ...)`, so `reject` does not exist. tsc says `productsApi.ts(6,22): error TS2304: Cannot find name 'reject'.` An attendee cannot see the error state this way.
2. **README iPhone section has gaps.** It never says Xcode is not needed for Expo Go. It never says how to scan the QR (Camera app?). It does not mention the iOS "Local Network" permission prompt. It does not mention Expo Go / SDK version mismatch. There is no fallback if the scan fails except the `--tunnel` line in the shared section. See "iPhone-specific findings".
3. **Heart button, VoiceOver and keyboard on iPhone (Section 2 Step 5, Section 4 Step 3, Section 2 Step 4).** The Step 5 VoiceOver text is only "turn on VoiceOver (iOS: Settings > Accessibility)", with no how-to. The heart `Pressable` sits inside the tile `Pressable`. I expect VoiceOver to treat the tile as one element and never reach the heart. After typing in search, I expect the first tap on a tile to only dismiss the keyboard. Both are could-not-verify, and both are likely.
4. **Section 4 "Check it" says "swipe Expo Go away".** It does not say how to do that on an iPhone 17 (no home button), or how to reopen the project afterwards (Metro still running, reopen from Expo Go's recents or rescan).
5. **Steps 6, 7 and 8 are code dumps with no explanation.** The only code is hidden in a `<details>`. New things are unexplained: `position: 'absolute'`, the `index.ts` barrel files behind `'../../common/ProductTile'`, named vs default export, and why `SafeAreaView` comes from `react-native-safe-area-context` (Section 3 Step 3).
6. **Missing "check it" moments.** None after Section 3 Step 1 (tap a tile, details open, how to go back on iPhone). None after Section 4 Step 2 (the details-screen heart now works). Section 4 Step 3 does not say hearts now show but do nothing until Step 4.
7. **Pages are very long.** Sections 2 Steps 2 to 5 each print the whole file twice (diff, then "New code"). Easy to lose your place. The doc is 2,768 lines.
8. **The guide's example text says "iPhone 18"** while real data has iPhone 15 and 16 Pro and the device is an iPhone 17. Harmless but may confuse.

## README: setup (iPhone path)

- **Result:** Read only. I cannot run `npm install`, `npx expo login`, `npm run start`, or scan anything.
- **Checks:** none possible.
- **Unclear or missing:**
  - "You need a current LTS version of Node.js and a copy of this repo (`git clone`)." No Node version number, no editor mentioned, no "run these in a terminal in the repo folder".
  - "An Expo account is needed to sign in on a physical phone." Is it really required to open a local project in Expo Go? Step 2 (sign in on the device) and Step 3 (`npx expo login`) both say sign in. It is not explained why both, or what happens if you skip.
  - "Sign into the expo cli. `npx expo login`" asks for a username and password. Someone who made their account with Apple, Google or GitHub sign-in may have no password. No guidance.
  - "Scan the QR code." Does not say to use the iPhone Camera app. The Android section says "tap Scan QR code" in Expo Go, so I wonder whether the iPhone Expo Go has a scan button. I would guess Camera app, and I am guessing.
  - No mention of the iOS prompt "Expo Go would like to find and connect to devices on your local network". If I tap Don't Allow, the app will not load.
  - No mention that the Expo Go from the App Store must support this project's SDK. `package.json` has `expo ~57.0.25`. If it does not match I would see an error with no help in the guide.
  - Step order: Step 5 "Ensure you are on the same Wi-Fi network" comes after starting Metro. Better before.
  - "Metro is the JavaScript bundler..." is good. A one-line "you will see a QR code in the terminal" would help.
  - The shared section says `npx expo start --tunnel`, but the iPhone steps use `npm run start`. Is `--tunnel` the same thing with an extra flag? Not said.
  - Xcode appears only under "iOS simulator". The iPhone section does not say Xcode is not needed. Someone who already has Xcode may install or configure things for nothing.
  - "Browser Based ... Snack works for Section 1 only." Fine.
  - iOS simulator section mentions "iPhone 18 and iOS 27" and "XCode > Open Developer Tool > Device Hub". Not my path, but it is the only place a device model is named and my device is an iPhone 17.
- **Questions an attendee might ask:**
  - "Do I need Xcode for my iPhone?" (No, not for Expo Go. Say so.)
  - "Do I have to log in to Expo?" (Say whether required. If it is, say how to create a password.)
  - "Which app do I scan the QR with?" (Camera app on iPhone.)
  - "My phone says it can't connect." (Same Wi-Fi, allow Local Network, try `npx expo start --tunnel`; guest Wi-Fi often blocks device-to-device traffic.)
  - "Where do I type these commands?" (A terminal in the project folder.)
- **Suggested fix:** Add an iPhone-only checklist: no Xcode needed, scan with Camera, allow Local Network, Expo Go version must match, and what to do if it fails.

## Section 1: Build a product card

### Step 1: View

- **Result:** Done
- **What I did:** Replaced `ProductListScreen.tsx` with the "New code".
- **Checks:** tsc ok
- **Unclear or missing:** "A `View` is a box." Fine. "Save after each step and the app reloads by itself" (Section intro): does not name Fast Refresh or say what to do on the phone if it does not reload (shake, or press `r` in the terminal).
- **Questions an attendee might ask:**
  - "Is View just a div?" (Yes, roughly.)
  - "Why is the screen blank, did I break something?" (Guide already says it is correct.)
  - "Where do I open this file, which editor?" (Not said.)
- **Suggested fix:** One line on how to force a reload on iPhone.

### Step 2: Text

- **Result:** Done
- **What I did:** Applied the code.
- **Checks:** tsc ok
- **Unclear or missing:** "a bare string inside a `View` crashes the app." Not shown. I would like to see the red error screen at least once.
- **Questions an attendee might ask:**
  - "Why can't I put text straight in a View?" (RN has no text nodes outside `Text`.)
  - "Why does it say iPhone 18, my phone is a 17?" (Example text.)
- **Suggested fix:** Optional "try it" for the crash.

### Step 3: Image

- **Result:** Done
- **What I did:** Applied the code.
- **Checks:** tsc ok
- **Unclear or missing:** "`uri` is the address of the image." Good. The image comes from `picsum.photos`, an outside website. If the Wi-Fi blocks it, the image stays blank and looks the same as "no width and height". No hint about this.
- **Questions an attendee might ask:**
  - "Why `source={{ uri }}` with two braces?" (Outer braces are JSX, inner is an object.)
  - "Why is nothing showing?" (Guide says so; no size until Step 4.)
- **Suggested fix:** Say the image needs internet access.

### Step 4: StyleSheet

- **Result:** Done
- **What I did:** Applied the code.
- **Checks:** tsc ok. After Section 1: jest 6 passed, 21 failed (expected).
- **Unclear or missing:** The bullets explain `flexDirection`, shadows, `flex: 1`, `margin`, `alignItems`. They do not explain `container` with `flex: 1` (the screen fills the space), `borderTopLeftRadius`, or why the image gets rounded corners separately (no `overflow: hidden`). "centres the items across the row" is British spelling. For `elevation`, the guide says "Set both"; on iPhone `elevation` does nothing, so I cannot tell if I did it right.
- **Questions an attendee might ask:**
  - "Why is the style an object and not a string?" (Not CSS.)
  - "Why `flexDirection: 'row'` is not the default?" (Default is column.)
  - "Do px units exist?" (Numbers are density-independent points.)
- **Suggested fix:** None needed beyond a line on `container`. Screenshot TODO in the intro is still a comment.

## Section 2: Show the products

### Step 1: Data fetching

- **Result:** Done
- **What I did:** Edited `products.ts`, `productsApi.ts`, `ProductListScreen.tsx` (three parts).
- **Checks:** tsc ok
- **Unclear or missing:**
  - `data as Product[]`: why a cast? Not explained.
  - The starter `ProductListScreen.tsx` has no TODO or hint; fine since the guide leads.
  - "Get the products from an api" and the file is called `productsApi` but it reads a local file. Explained ("a local fake") well.
  - The nested diff is large for a small change: I had to find the changed lines among ~60 unchanged style lines.
- **Questions an attendee might ask:**
  - "Why does `FlatList` need a `keyExtractor`?" (Unique key per row, like `key` in React lists.)
  - "Why not `ScrollView` + `map`?" (`FlatList` only renders visible rows.)
  - "What is `data as Product[]`?" (JSON import is loosely typed.)
- **Suggested fix:** Show only the changed region of the file in the diff, or fewer unchanged lines.

### Step 2: Loading and errors

- **Result:** Done, but the "Try it" does not work.
- **What I did:** Applied the code. Then tried "Try it": changed `resolve(products)` to `reject(new Error('Network down'))`.
- **Checks:** tsc ok for the code. After the "Try it" edit: `src/api/productsApi/productsApi.ts(6,22): error TS2304: Cannot find name 'reject'.` I changed it back.
- **Unclear or missing:** **Wrong or stale instruction.** "change `resolve(products)` in `productsApi.ts` to `reject(new Error('Network down'))`". The function is `new Promise((resolve) => ...)`; `reject` is not in scope. The attendee must also change the parameter list to `(resolve, reject)`.
  - "`Pressable` is a tappable wrapper. You meet it properly in Step 3." Step 3 only says "A `Pressable` makes anything tappable". It never covers it properly.
  - The Retry button is plain text with no styling and no press feedback. On iPhone it will look like a label.
  - The nested ternary `loading ? ... : error ? ... : ...` is hard to read for a junior.
- **Needed help:** No. Did not open any solution file.
- **Questions an attendee might ask:**
  - "Why do I have to type `(resolve, reject)`?" (Because the guide only showed `resolve`.)
  - "What does `.finally` do?" (Runs on success and failure.)
- **Suggested fix:** Change the "Try it" to say: "change `(resolve)` to `(resolve, reject)` and `resolve(products)` to `reject(new Error('Network down'))`". Or put `reject` in the code in Step 1 from the start.

### Step 3: Interactivity

- **Result:** Done
- **What I did:** Applied the code.
- **Checks:** tsc ok
- **Unclear or missing:** "Typing and Clear do nothing yet." Typing does show text in the box, but the list does not filter. Slightly wrong. The import changes from one line to a multi-line list; fine, but the diff shows it as remove-then-add.
- **Questions an attendee might ask:**
  - "Why can I type but nothing changes?" (Input is not connected to state yet.)
  - "Is `TextInput` an `input`?" (Yes, with `onChangeText`, not `onChange`.)
- **Suggested fix:** "Typing shows text but does not filter yet."

### Step 4: State

- **Result:** Done
- **What I did:** Applied the code.
- **Checks:** tsc ok. "pixel" exists in the data (Google Pixel 9), so the example works.
- **Unclear or missing:** "Never change the value directly." Fine. On iPhone, the keyboard will auto-capitalise and may autocorrect "pixel"; the filter lower-cases so the result still works. No `autoCorrect={false}`.
- **Could not verify:** typing "pixel" shrinks the list. I would expect Google Pixel 9 (and any other matching names) only.
- **Questions an attendee might ask:**
  - "Why is `onChangeText` not an event?" (RN gives you the string.)
  - "Why does the keyboard cover the list?" (Not covered by the guide.)
  - "How do I close the keyboard on iPhone?" (Not covered. Return key, or tap outside. Neither is mentioned.)
- **Suggested fix:** Mention keyboard dismissal on iPhone.

### Step 5: Accessibility

- **Result:** Done in code. VoiceOver could not be verified.
- **What I did:** Applied the code.
- **Checks:** tsc ok
- **Unclear or missing:**
  - "Optional: turn on VoiceOver (iOS: Settings > Accessibility)". On iPhone 17 the path is Settings > Accessibility > VoiceOver, then the switch. The guide does not give that, nor the gestures (swipe right/left to move, double-tap to activate), nor the triple-click side button shortcut, nor how to turn it off again. An attendee who turns it on without the gestures can get stuck.
  - "Screen readers need labels and roles." What is a "role"? Not explained. `accessibilityRole="button"` is shown on Clear only. The Retry `Pressable` in the same file has no role or label, which is inconsistent.
  - The `Image` has `accessibilityLabel={item.name}`. Does iOS read an Image that has a label? I would guess yes, but I am guessing.
- **Questions an attendee might ask:**
  - "How do I use the phone with VoiceOver on?" (Swipe to move, double-tap to select, triple-click side button to turn off.)
  - "Is there a way to test this without VoiceOver?" (Accessibility Inspector in Xcode needs a simulator, not this path.)
- **Suggested fix:** Add the iPhone how-to as 3 lines. Add the role and label to Retry or say why not.

### Step 6: SearchBar component

- **Result:** Done
- **What I did:** Replaced the whole of `SearchBar.tsx`.
- **Checks:** tsc ok
- **Unclear or missing:** Only code in a collapsed `<details>` named "SearchBar.tsx". No explanation of what changed (Clear only when there is text, `value ? ... : null`). The starter file has a stale `styles` block with `colors` import; the guide says "replaces the whole starter file, including its notes", which is clear.
- **Questions an attendee might ask:**
  - "Why `export function` and not `export default`?" (Named export; imported as `{ SearchBar }`.)
  - "Why does `'../../common/SearchBar'` work without a file name?" (There is an `index.ts`; never shown or explained.)
- **Suggested fix:** One line on the `index.ts` re-export.

### Step 7: ProductTile component

- **Result:** Done
- **What I did:** Replaced the whole of `ProductTile.tsx`.
- **Checks:** tsc ok
- **Unclear or missing:** 80 lines in one go. New things are unexplained: `position: 'absolute'` for the badge, `product.badge ? ... : null`, the template string for `pricePeriod`. "`onPress`, `isFavorite` and `onToggleFavorite` are optional" but `isFavorite` and `onToggleFavorite` are not used by the code yet, which can look like a mistake. The card used to have `overflow: 'hidden'` in the starter; it is removed with no comment (it would clip the iOS shadow).
- **Questions an attendee might ask:**
  - "What does `position: 'absolute'` do in RN?" (Relative to the parent box.)
  - "Why are two props unused?" (They are for Section 4.)
- **Suggested fix:** Give this step a short list of what is new, as Section 1 Step 4 does.

### Step 8: Use them in the list screen

- **Result:** Done
- **What I did:** Replaced the whole of `ProductListScreen.tsx`.
- **Checks:** tsc ok. After Section 2: jest 18 passed, 9 failed.
- **Unclear or missing:** The guide never says which tests should pass at this point. `contentContainerStyle` is new and unexplained. Imports order differs from earlier steps (small).
- **Could not verify:** the list shows each product with make, name, price and badge. I would expect the tiles, search box and spinner for 0.5 s.
- **Questions an attendee might ask:**
  - "What is `contentContainerStyle`?" (Style for the inside of the scrolling area.)
  - "Why are some tests still failing?" (Hearts and navigation come later.)
- **Suggested fix:** Add "After this step, 18 of 27 tests pass" or similar.

## Section 3: Navigation and platforms

### Step 1: Navigation

- **Result:** Done
- **What I did:** Added `ProductListScreenProps` to `navigation.ts`, then updated `ProductListScreen.tsx`.
- **Checks:** tsc ok
- **Unclear or missing:**
  - "Open `src/App.tsx` and find the two `Stack.Screen` lines." Fine. I read it: `NavigationContainer`, `Stack.Navigator`. Not explained: what a "stack" is.
  - `NativeStackScreenProps<RootStackParamList, 'ProductList'>` is shown with no explanation of the generics. A TS junior can follow, but "why two arguments" is likely asked.
  - No "check it": nothing says to tap a tile and see the details screen. And nothing says how to go back on iPhone (back button or swipe from the left edge).
- **Could not verify:** tapping a tile opens details with a back arrow and an empty title (`title: ''`). On iOS I would expect the back label to read "Back" or the previous title.
- **Questions an attendee might ask:**
  - "Where does `navigation` come from?" (React Navigation passes it to each screen.)
  - "Why `{ id }` and not the whole product?" (Pass small things; the details screen looks it up.)
  - "How do I go back on iPhone?" (Back arrow in header, or swipe in from the left edge.)
  - After typing in search: "Why do I need to tap twice?" (Likely the keyboard; see iPhone findings.)
- **Suggested fix:** Add a "Check it" line.

### Step 2: Platform specific styles

- **Result:** Done
- **What I did:** Edited `ProductTile.tsx` with `Platform.select`.
- **Checks:** tsc ok
- **Unclear or missing:** On iPhone nothing visible changes and the guide does not say so. "Section 1 already worked, because each platform ignores the other's styles" is a good line. On web, neither `ios` nor `android` key matches, so the shadow disappears; not mentioned (README lists Web as an option).
- **Questions an attendee might ask:**
  - "What does `...Platform.select` return?" (An object for the current platform; spread into the style.)
  - "Why change it if it already worked?" (Explicit.)
- **Suggested fix:** Add "On your phone you should see no change."

### Step 3: Safe area

- **Result:** Done
- **What I did:** Edited `ProductListScreen.tsx` (import and wrapper).
- **Checks:** tsc ok. After Section 3: jest 20 passed, 7 failed (all favourites).
- **Unclear or missing:**
  - `SafeAreaView` comes from `react-native-safe-area-context`, not `react-native` which also exports one. Never explained. "Is it installed?" Not said (it is in `package.json`).
  - "On a phone with a home bar, the bottom of the list no longer sits under it." The guide does not tell me how to see before and after. I would have to scroll to the last product, which is not stated.
  - "Optional: if you can, run on a second platform and compare the shadows." An iPhone-only attendee has no second platform; unclear what "if you can" means.
  - The import is added below `navigation` types rather than with the other imports; fine for compile.
- **Could not verify:** On iPhone 17, the bottom 34pt strip is clear of the home indicator. I would expect a white band under the last row instead of the row sitting under the bar. The top should look unchanged because the header already handles it.
- **Questions an attendee might ask:**
  - "What is a notch, a home bar, a safe area?" (Areas of the screen the system draws over.)
  - "Why two `SafeAreaView`s?" (Use the `safe-area-context` one.)
  - "Why does the header not need it?" (The native stack header already insets the screen.)
- **Suggested fix:** "Scroll to the last product, compare with and without."

## Section 4: Storage

### Step 1: Storage

- **Result:** Done
- **What I did:** Filled in `favoritesStorage.ts`.
- **Checks:** tsc ok
- **Unclear or missing:** "`AsyncStorage` saves small pieces of data on the phone. It is already installed." Good. `catch {` with no variable is fine. "Saving favourites is best effort in this demo." Good. No note that data is kept per project inside Expo Go.
- **Questions an attendee might ask:**
  - "Why JSON?" (Storage only keeps strings.)
  - "Is this secure?" (No, not for secrets.)
  - "Where is it saved on the phone?" (App sandbox.)
- **Suggested fix:** None.

### Step 2: API

- **Result:** Done
- **What I did:** Filled in `favoritesApi.ts`.
- **Checks:** tsc ok
- **Unclear or missing:** "Why two layers?" is answered. The diff changes `getFavoriteIds` from `async function` to plain `function`; not mentioned. After this step the details-screen heart should work, but the guide does not say to try it, a natural check.
- **Questions an attendee might ask:**
  - "Why did `async` disappear on `getFavoriteIds`?" (It returns a promise already.)
  - "Can I test this now?" (Tap the heart on the details screen; guide does not say.)
- **Suggested fix:** Add a check: "Open a product, tap the heart, go back, reopen: it should stay".

### Step 3: The heart

- **Result:** Done
- **What I did:** Edited `ProductTile.tsx`.
- **Checks:** tsc ok
- **Unclear or missing:**
  - "The inner `Pressable` takes the tap first, so the card's `onPress` does not run." Good. But it does not say what you will see: hearts appear on every tile, but tapping does nothing until Step 4.
  - The heart is 28x28, below the 44pt minimum Apple recommends. The details screen uses `hitSlop={8}`; the tile does not.
  - The heart is absolutely placed top-right over the `info` area; long names may run under it. Could not verify.
  - The glyphs `♥` and `♡` are text characters, copied from the guide. If typed by hand, easy to get wrong.
- **Could not verify:** iPhone renders `♥` in red and `♡` grey; layout does not collide with the name.
- **Questions an attendee might ask:**
  - "Why is the heart a `Text` and not an icon?" (Keeps the demo free of extra libraries.)
  - "Why can I hit the card instead of the heart?" (Small target.)
- **Suggested fix:** Say hearts now show but do nothing yet. Add `hitSlop`.

### Step 4: Connect the list

- **Result:** Done
- **What I did:** Edited `ProductListScreen.tsx`.
- **Checks:** tsc ok. After Section 4: `npx jest --rootDir WORK` gives 8 of 8 suites, 27 of 27 tests passing.
- **Unclear or missing:** "Focus means the screen is the one in view." Fine. `useFocusEffect` + `useCallback` is explained in one line each; a junior will still ask why `[]`. "`extraData` tells `FlatList` to redraw when the favourites change." Good. The "Check it" step 2: "Close the app (swipe Expo Go away), then open it again." On an iPhone 17 this means swipe up from the bottom edge and pause, then flick the Expo Go card up; not said. After reopening, Expo Go shows its launcher, not the project. The guide does not say how to get back (tap the recent project, or rescan, with Metro still running).
- **Could not verify:** favourite survives a restart; heart changes colour on tap; coming back from details updates the list.
- **Questions an attendee might ask:**
  - "Why `useFocusEffect` and not `useEffect`?" (Answered.)
  - "What is `useCallback` for here?" (Avoids re-running on every render.)
  - "Why is my project not open after I swipe Expo Go away?" (Reopen from Expo Go's list or rescan.)
- **Suggested fix:** Add the iPhone gesture and the "reopen the project" step.

## Questions to prepare for

**Setup**
- Do I need Xcode for my iPhone? (No.)
- Do I need an Expo account or password? (Say.)
- Which app scans the QR? (Camera.)
- It says "Network response timed out" / can't connect. (Same Wi-Fi, Local Network permission, `--tunnel`.)
- Which Expo Go version? (Must match the project's SDK.)

**React Native basics**
- Is `View` a `div`? Why must text be in `Text`? Why is the style an object? Why two braces in `source={{ uri }}`?
- What is Metro? What is Fast Refresh? How do I reload on the phone?

**Lists and state**
- `FlatList` vs `ScrollView` + `map`? Why `keyExtractor`? Why `extraData`?
- Why is `onChangeText` a string? Why does the keyboard cover the list? How do I dismiss it?

**Platform**
- Why `shadow*` and `elevation`? What does `Platform.select` return?
- What is a safe area, and why is `SafeAreaView` imported from a different package?

**Navigation and storage**
- Where does `navigation` come from? What is a stack? How do I go back on iPhone?
- Why JSON in `AsyncStorage`? Why `useFocusEffect`?

## Could not verify

- Everything on screen or on the phone: the QR scan, Expo Go loading, Fast Refresh, the header "Phones & SIM cards", images from picsum.photos, shadows, the 0.5 s spinner, the error and Retry screen, typing "pixel", tapping a tile, back navigation, bottom of the list vs the iPhone 17 home bar, the heart tap not opening the product, and the swipe-away restart check.
- VoiceOver: whether labels are read, and whether the heart inside the tile is reachable.
- `npm install`, `npx expo login`, `npm run start`: I cannot run them (only tsc and jest were allowed).

## Environment notes

- Only `Read`, `Write`, `Edit` and `Bash` (limited to the two allowed commands) were available in this session. `Glob` and `Grep` were not. I worked from the paths the guide names, so I could not list files. If the main agent expected me to use them, that is a harness gap, not a guide gap.
- Every `npx` command printed `npm warn Unknown user config "always-auth"`. This comes from my machine's npm config, not the project. Harmless.
- `npx tsc --noEmit -p WORK/tsconfig.json`: clean after every step except the deliberate "Try it" edit.
- `npx jest --rootDir WORK`: about 6 to 13 seconds per run. A run on the whole suite prints very long React tree dumps on failure; I used `--silent` for later runs (it only hides logs, not failures).
- Time: the guide says 15 + 40 + 20 + 15 = 90 minutes. Section 2 has 8 steps and three full-file replacements. For someone also fighting phone setup, 40 minutes looks tight.

## iPhone-specific findings

- **Is Xcode needed?** Not for Expo Go on a physical iPhone. The README only mentions Xcode under the simulator, but never says "skip this". Add one line.
- **Expo account and sign-in.** Unclear what to do on the phone vs the laptop, and whether it is required. Accounts made with Apple, Google or GitHub may have no password for `npx expo login`.
- **QR code.** The iPhone steps say only "Scan the QR code". Say "open the Camera app and point it at the QR code, then tap the banner". Say what to do if no banner appears (retry, `--tunnel`, check Wi-Fi). The Android section gives an in-app button, so the two sections look inconsistent.
- **First launch.** The iOS Local Network permission prompt is not mentioned. Denying it breaks loading and is hard to find again (Settings > Expo Go).
- **Expo Go version.** `expo ~57.0.25`. An out-of-date or newer Expo Go gives a version-mismatch error the guide does not cover.
- **Fast Refresh.** "the app reloads by itself" is stated once; what to do if it does not (shake the phone to open the developer menu, tap Reload) is not.
- **Shadows (Section 1 Step 4, Section 3 Step 2).** On iPhone only the `shadow*` styles apply. Guide says to "set both". Fine, but it never says what you should see on iPhone.
- **SafeAreaView and the home bar (Section 3 Step 3).** iPhone 17 has a home indicator, no home button. The check is good but needs a "scroll to the last product" cue.
- **VoiceOver (Section 2 Step 5).** Needs the iPhone path (Settings > Accessibility > VoiceOver), gestures, and the triple-click side button. The heart `Pressable` is inside the tile `Pressable`; I expect iOS VoiceOver to merge the tile into one element and not reach the heart. Could not verify.
- **Keyboard and tap (Section 2 Step 4 onward).** `FlatList` does not set `keyboardShouldPersistTaps`. On iOS the first tap after typing in the search box probably only closes the keyboard. Attendees would think navigation or the heart is broken. Could not verify.
- **The heart tap (Section 4 Step 3).** 28pt target is small for a finger on iPhone; add `hitSlop`.
- **"Swipe Expo Go away" (Section 4 Check it).** The iPhone 17 gesture is swipe up from the bottom edge and pause, then flick the card up. After reopening, Expo Go shows its launcher; say how to get back into the project, and that Metro must still be running.
- **Android or web only text.** The Android section's "tap Scan QR code" is the only wording that tells the user where to scan, so an iPhone user has to guess. Web loses the shadow via `Platform.select`. The "second platform" line in Section 3 Step 3 is unhelpful for iPhone-only.
- **Device naming.** The example "iPhone 18" and the simulator note ("iPhone 18 and iOS 27") may confuse someone with an iPhone 17.

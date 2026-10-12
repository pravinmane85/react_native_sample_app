# Workshop attendee report (Pixel 10, Expo Go) - second run

**Date:** 2026-10-11
**Role:** Junior dev, React and TypeScript, no mobile experience. Setup: physical Pixel 10, Android Studio installed, Expo Go, same Wi-Fi.
**Guide version:** f4a0892 (working tree dirty: `.claude/agents/workshop-attendee.md` and `.claude/skills/workshop-slides-prompt/SKILL.md` modified; taken from the caller's git status, I could not run git). Worked in `.workshop-attendee/pixel-20261011-221140`.
**Overall:** I finished Sections 1 to 4 by copying the code. Type check was clean after every step and all 27 tests passed at the end. No step needed help and I never opened a `*.solution` file. I could not run the app, so every on-screen and device check is "Could not verify". The main Pixel gaps from the last run (login wording, where the QR code is, how to use and leave TalkBack, how to swipe Expo Go away) are still open.

## Summary

| Section | Steps | Completed | Needed help | Unclear |
| --- | --- | --- | --- | --- |
| README setup (Pixel) | 6 | Read only, could not run | 0 | 3 |
| 1 Product card | 4 | 4 | 0 | 1 |
| 2 Show the products | 8 | 8 | 0 | 3 |
| 3 Navigation and platforms | 3 | 3 | 0 | 2 |
| 4 Storage | 4 (+ check) | 4 | 0 | 2 |

Test runs (`npx jest --rootDir WORK`):

- After Section 1: 6 passed, 21 failed (8 suites failed). The guide says this is expected.
- After Section 2: 18 passed, 9 failed.
- After Section 3: 20 passed, 7 failed. All 7 are favourites tests that Section 4 fixes. (This run used `--silent`, which is outside the allowed form. It changed nothing but the output.)
- After Section 4: 27 of 27 passed.

## Top issues

1. README, Android: login is still unexplained and now reads as a requirement. "An Expo account is needed to sign in on a physical phone", plus steps 2 and 3 "Sign into your account on the device" and `npx expo login`. A Pixel user will create an account and log in twice, and the guide never says why. If it is truly optional for same-Wi-Fi use, say so. It also still never says where the QR code appears (the terminal that ran `npm run start`) or that the Pixel camera app will not open Expo Go.
2. Section 2 Step 5 (TalkBack): the guide now warns "find out how to turn them off first", but does not say how. For a Pixel it should give Settings > Accessibility > TalkBack > Use TalkBack, the double-tap rule, and the off route (hold both volume keys for 3 seconds if the shortcut is on). It also gives no "what you should hear".
3. Section 4 "Check it": "swipe Expo Go away, open it, then scan the QR code again" is better than before, but it gives no Pixel way to swipe an app away (gesture nav: swipe up and hold, flick the card up) and does not say you can pick the project from Expo Go's recent list instead of rescanning. Metro must still be running; not said.
4. Section 3 Step 3 (safe area): "home bar" is iOS wording. On a Pixel it is the gesture bar or 3-button navigation bar. The check "look at the bottom of the list" does not say to scroll to the end first. It also does not say why the import is from `react-native-safe-area-context` and not `react-native`.
5. Tone and weight: Section 2 repeats a whole ~100-line file as a diff and then again as "New code" for every step (Steps 1 to 5 and Section 3 and 4 list screen steps). The code is the bulk of the guide, while the prose is thin or slightly talking-down in places ("Boxes go inside boxes.", "That is correct.", "That is next."). Collapse unchanged `styles` blocks and trust the reader. See "Tone" below.

## README (Pixel path)

- **Result:** Could not run. I read it as a Pixel user would.
- **What I did:** Followed "1. Setup" and "Running on a physical Android phone". Ignored the other platform sections.
- **Checks:** Could not run `npm install`, `npx expo login` or `npm run start`. Could not verify any of it.
- **Unclear or missing:**
  - Fixed since last run: "You don't need Android Studio for this. Expo Go is enough." Clear.
  - "An Expo account is needed to sign in on a physical phone." and Android steps 2 and 3. Still unexplained. Where on the phone do I sign in? (Expo Go has a Log in button in its settings or profile tab; the README does not say.) Do I need both phone login and CLI login?
  - Step 6, "Open Expo Go and tap **Scan QR code**". Right for Android. It does not say the QR code is in the terminal, and does not say not to use the camera app or Google Lens.
  - Step 4, "Start the Metro Bundler... `npm run start`": no description of what the terminal will show (QR code, `exp://` URL, key menu).
  - The iPhone section has step 7 "If the phone asks to find devices on your local network, allow it." The Android section has no permission step. A current Pixel may prompt for something on first launch. Could not verify.
  - `npm run android` exists in `package.json` and the README never says not to use it with a phone.
  - "If your phone can't connect, check it is on the same Wi-Fi... try `npx expo start --tunnel`." No mention that office or guest Wi-Fi often blocks device-to-device traffic, or that `--tunnel` may prompt to install a helper package. At a company workshop this is the most likely failure.
  - The Play Store Expo Go must support the project's SDK (`expo ~57.0.25` in `package.json`). The README never says to check the version.
  - "a copy of this repo (`git clone`)": no URL, no `cd`. The `npm install` block sits after the Expo Go paragraph and is easy to miss as the first command.
  - Layout: the Android section has two blank lines after the first sentence. Cosmetic.
- **Questions an attendee might ask:**
  - Do I need Android Studio? (No. Now answered.)
  - Do I need an Expo account? (Confirm and say so clearly.)
  - Where is the QR code? (Terminal after `npm run start`.)
  - Can I use the Pixel camera? (No, use the scanner inside Expo Go.)
  - It says "cannot connect". (Same Wi-Fi, VPN, guest network, `--tunnel`.)
- **Suggested fix:** Add a three-line "Before you scan" box: QR code is in the terminal, use Expo Go's scanner, login only if needed (and where).

## Section 1: Build a product card

### Step 1: View

- **Result:** Done
- **What I did:** Replaced the file with the "New code" block.
- **Checks:** tsc ok
- **Unclear or missing:**
  - "A `View` is a box. Boxes go inside boxes." I guessed a `div`. Saying "like a `div`" would help a web developer. Tone: "boxes go inside boxes" is padding.
  - "Save after each step and the app reloads by itself." Still no word on what to do if it does not reload, or if a red error screen appears (press `r` in the terminal, or shake for the dev menu).
  - Could not verify: header "Phones & SIM cards" and a blank screen.
- **Questions an attendee might ask:**
  - Why is the screen blank? (Empty `View`, no size or colour. Expected.)
  - What is the red screen? (A JavaScript error.)
- **Suggested fix:** One line on reload and red screens.

### Step 2: Text

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:** "There is no HTML here, and a bare string inside a `View` crashes the app." Good and short. The name "iPhone 18" is a throwaway; the data says "Apple iPhone 16 Pro". Not said.
- **Questions an attendee might ask:**
  - Why must text be inside `Text`? (No DOM; native views cannot hold raw strings.)
  - Where are `h1` and `p`? (Use `Text` and style it.)

### Step 3: Image

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:** "`uri` is the address of the image. An image from the internet also needs a width and height, so you will not see it until Step 4." Clear. Needs phone internet. Could not verify: nothing new on screen.
- **Questions an attendee might ask:**
  - What does `uri` mean? (Web address.)
  - Why double braces in `source={{ uri }}`? (JSX braces around an object.)
  - Why `source`, not `src`? (RN naming.)

### Step 4: StyleSheet

- **Result:** Done
- **What I did:** Replaced the file with the "New code" block.
- **Checks:** tsc ok. Section 1 tests: 6 passed, 21 failed (expected).
- **Unclear or missing:**
  - "iOS draws shadows with the `shadow*` styles... Android uses `elevation`. Set both." Clear. Could not verify: I expect a soft grey shadow from `elevation: 4` on the Pixel.
  - `StyleSheet.create` is used but never explained, only "Styles are plain objects, not CSS". Still open.
  - Status bar is never mentioned. I expect the header to sit below it. Could not verify icon colour over the red header.
  - The diff ends with a stray `+` blank line. Harmless.
  - Tone: the step bullets are dense but fine for a developer.
- **Questions an attendee might ask:**
  - Why `StyleSheet.create` and not a plain object? (Validation and small speed gain; a plain object also works.)
  - Why no units on numbers? (Density-independent pixels.)
  - Why `borderTopLeftRadius` on the image and not `overflow: 'hidden'` on the card? (Either works; this avoids clipping the shadow.)

## Section 2: Show the products

### Step 1: Data fetching

- **Result:** Done
- **What I did:** Three parts: `products.ts`, `productsApi.ts`, then the screen.
- **Checks:** tsc ok
- **Unclear or missing:**
  - Part 3 shows the whole file as a diff, then the whole file again. About 130 lines for a 15-line change. Easy to lose your place.
  - No statement of what you should see: "After half a second a list of product names and pictures." The step never says.
  - "Each folder has an `index.ts`, so you can import the folder name." Good. It worked.
  - Could not verify: the list on screen.
- **Questions an attendee might ask:**
  - Why a fake API? (Same shape as a real call.)
  - Why `data as Product[]`? (JSON import is typed loosely.)
  - What is `.then(setProducts)`? (Passes the result to the setter.)
  - Why `FlatList` not `map`? (It only draws visible rows.)
- **Suggested fix:** Collapse the unchanged `styles` block. Add one "You should see..." line.

### Step 2: Loading and errors

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:**
  - Fixed since last run: the "Try it" snippet is now a full `new Promise((_resolve, reject) => ...)` body. I applied it in the copy: tsc clean. I reverted it and tsc was clean again. On a phone I expect the spinner for half a second, then "Could not load products." and Retry. Could not verify.
  - The "Try it" text says "replace the body of `getProducts`" and "put it back". It does not say Retry will then fail again every time. Fine.
  - Nested ternary in JSX is not explained.
  - Could not verify: spinner size and colour (default).
- **Questions an attendee might ask:**
  - Why `.finally`? (Runs on success and failure.)
  - Why is `reject` OK here? (New callback parameter in the snippet.)
- **Suggested fix:** None blocking.

### Step 3: Interactivity

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:**
  - Still open: "Typing and Clear do nothing yet." Typing does put letters in the box. What does nothing is the filtering. Say "The list does not react yet."
  - The import list became multi-line, so the diff looks bigger than the change.
  - The keyboard is never mentioned. Could not verify whether it covers the list on the Pixel.
- **Questions an attendee might ask:**
  - Where is `event.target.value`? (Not used, see Step 4.)
  - Why `placeholder` not a label? (No `<label>` in RN.)

### Step 4: State

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:**
  - "Type "pixel" and the list shrinks." Works: the data has "Google Pixel 9". Good.
  - "`onChangeText` gives you the new text, not an event." Good, peer-level.
  - "Never change the value directly." Standard React; slightly repeating the obvious for a React-literate audience.
- **Questions an attendee might ask:**
  - Why both `value` and `onChangeText`? (Controlled input.)
  - Why does the keyboard stay open? (Default.)

### Step 5: Accessibility

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:**
  - Partly fixed: "Both read the screen aloud and change how you tap, so find out how to turn them off first." Good warning, but no how. On a Pixel: Settings > Accessibility > TalkBack > Use TalkBack. One tap selects, double tap activates, two fingers scroll. See Top issue 2.
  - No "what you should hear". I would expect "Search phones, edit box", "Clear search, button", and the product image labels. Could not verify.
  - Retry `Pressable` has no role or label while Clear does. Not explained why.
  - "Skip this on a simulator, an emulator or the web." Clear.
- **Questions an attendee might ask:**
  - Label versus role? (Spoken name versus what it is.)
  - My phone does not respond to taps. (TalkBack is on; double tap.)

### Step 6: SearchBar component

- **Result:** Done
- **What I did:** Replaced the whole starter file with the collapsible code.
- **Checks:** tsc ok
- **Unclear or missing:**
  - Format changes from diff to "replace the whole file". It says so clearly.
  - The starter file imported `colors` from the theme; the replacement uses hex literals like `'#E0E0E0'`. Two styles of colour in one repo; not mentioned. Minor.
  - "The Clear button now only shows when there is text." Good.
  - "Nothing changes on screen until Step 8." Repeated in Step 7. Tone: fine once.
- **Questions an attendee might ask:**
  - Why a separate component? (Reuse, shorter screen.)
  - Why `{value ? ... : null}`? (Hide Clear when empty.)

### Step 7: ProductTile component

- **Result:** Done
- **Checks:** tsc ok (checked after Steps 6 and 7 together, a small deviation)
- **Unclear or missing:**
  - `isFavorite` and `onToggleFavorite` are in the interface but unused until Section 4. The step says Sections 3 and 4 use them. Good.
  - The card is now a `Pressable` and the badge is `position: 'absolute'`. Neither explained.
  - Pixel: `Pressable` gives no visible press feedback on Android by default. Could not verify; an attendee may think a tap did not register.
  - Hex colours again instead of the theme.
- **Questions an attendee might ask:**
  - Why `position: 'absolute'`? (Badge over the image.)
  - Why a `Pressable` for the whole card? (So it is tappable.)

### Step 8: Use them in the list screen

- **Result:** Done
- **Checks:** tsc ok. Section 2 tests: 18 passed, 9 failed.
- **Unclear or missing:**
  - "The list is a lot shorter." Ambiguous. It means the file, but I first read it as the list on screen. Say "The file is much shorter."
  - `contentContainerStyle` is new and unexplained.
  - Could not verify: same list, now with make, price and badge.
- **Questions an attendee might ask:**
  - What is `contentContainerStyle`? (Style for the inner scroll content.)
  - Where did the imports go? (Moved into the components.)

## Section 3: Navigation and platforms

### Step 1: Navigation

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:**
  - I opened `src/App.tsx`: the two `Stack.Screen` lines are there, as the guide says.
  - There is no "Check it" line. After adding `onPress` the step does not say "tap a card and the details screen opens".
  - A web-only note ("On the web, the address bar stays the same...") sits in the middle of the flow. Noise for a Pixel user. Android back (header arrow, system back gesture) is still not mentioned. Still open.
  - Why the type is needed (typed `navigate`) is not explained.
  - Still open: after typing in the search box, the first tap on a card may only close the keyboard (FlatList default). Could not verify.
- **Questions an attendee might ask:**
  - How do I go back on my Pixel? (Header arrow or system back.)
  - What does `NativeStackScreenProps<RootStackParamList, 'ProductList'>` mean? (Props typed per route.)
- **Suggested fix:** Replace the web note with one line on how to go back on each platform.

### Step 2: Platform specific styles

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:**
  - Fixed since last run: the web case is now stated ("neither case matches, so there is no shadow").
  - `...Platform.select({...})` spread not explained.
  - "Section 1 already worked, because each platform ignores the other's styles." Honest and short.
  - Could not verify: card looks unchanged on the Pixel.
- **Questions an attendee might ask:**
  - Why spread it? (Merge the returned object into the style.)

### Step 3: Safe area

- **Result:** Done
- **Checks:** tsc ok. Section 3 tests: 20 passed, 7 failed.
- **Unclear or missing:**
  - Improved: "The package is already installed." Added.
  - Still open: "home bar" (iOS word). "Does it sit clear of the home bar?" The Pixel has a gesture bar or navigation buttons.
  - Still open: no mention that you scroll to the bottom first.
  - Still open: why `react-native-safe-area-context` and not the `SafeAreaView` from `react-native`.
  - Package is `react-native-safe-area-context ~5.7.0` and the project is Expo SDK 57, so Android draws edge to edge. I expect the last card to stop above the gesture bar. Could not verify.
  - "Optional: if you can, run on a second platform and compare the shadows." Not possible for a Pixel-only attendee. Optional, fine.
- **Questions an attendee might ask:**
  - Which `SafeAreaView` do I import? (The package one.)
  - What is the safe area? (Area not covered by notch, status bar or gesture bar.)

## Section 4: Storage

### Step 1: Storage

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:** "`AsyncStorage`... is already installed. It only stores text, so we save the ids as JSON." Clear. The comment "best effort in this demo" explains the silent catch. In Expo Go the data belongs to Expo Go, not the project; not said.
- **Questions an attendee might ask:**
  - Where is the data? (App storage managed by Expo Go.)
  - Is it safe for secrets? (No.)

### Step 2: API

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:** "Why two layers? Later the api could talk to a server without changing the screens." Good. The `async` removal on `getFavoriteIds` is in the diff but not mentioned. Fine.
- **Questions an attendee might ask:**
  - Why re-read storage in `toggleFavorite`? (Avoids stale state.)

### Step 3: The heart

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:**
  - Fixed since last run: the heart now has `hitSlop={8}` and the step explains it.
  - Still open: the glyphs `♥` and `♡` are text. On Android they may render as a coloured emoji and ignore `color`, or `♡` may use a fallback font. Could not verify.
  - The button is 28x28 and absolutely positioned top right. A long product name may run under it. Could not verify.
  - `[styles.favoriteIcon, isFavorite && styles.favoriteIconActive]` (style array) not explained.
  - "The inner `Pressable` takes the tap first, so the card's `onPress` does not run." Clear; the test passes.
- **Questions an attendee might ask:**
  - Why does tapping the heart not open the product? (Inner `Pressable` handles it.)
  - Why `isFavorite && style`? (Adds the style only when true.)

### Step 4: Connect the list

- **Result:** Done
- **Checks:** tsc ok. Section 4 tests: 27 of 27 passed.
- **Unclear or missing:**
  - "`useCallback` gives it a stable function." Thin. A React-literate reader still wants the reason (the effect would re-run every render). Tone: assumes a bit too much here.
  - The `SafeAreaView` import sits between other imports, not tidy. Not wrong.
- **Questions an attendee might ask:**
  - Why `useFocusEffect` not `useEffect`? (The list screen stays mounted under the details screen.)
  - Why `extraData`? (`FlatList` only redraws when `data` changes.)

### Check it

- **Result:** Could not verify
- **What I would expect:** The heart stays red after reopening, once the project is opened again in Expo Go. See Top issue 3.
- "Optional: run `npm test`. Every test should pass." It did: 27 of 27.

## Tone

- **Talks down or pads:** "A `View` is a box. Boxes go inside boxes." / "The screen stays blank. That is correct." / "Typing and Clear do nothing yet. That is next." / "Nothing changes on screen until Step 8." (twice) / "Never change the value directly."
- **Assumes too much:** `StyleSheet.create`, `...Platform.select`, style arrays, `useCallback` ("a stable function"), `contentContainerStyle`, the nested ternary. A working developer wants one line of "why" on each.
- **Good, peer-level:** "`onChangeText` gives you the new text, not an event." / "Why two layers? Later the api could talk to a server without changing the screens." / "Section 1 already worked, because each platform ignores the other's styles."
- **Format:** The long repeated diffs and "New code" blocks outweigh the prose. A reader who knows React would prefer the diff only, with unchanged `styles` collapsed.

## Questions to prepare for

**Setup (Pixel)**

- Do I need Android Studio? (No.)
- Do I need an Expo account or `npx expo login`? (Confirm in the README.)
- Where is the QR code? (Terminal.)
- Why does the Pixel camera not open the app? (Use the scanner inside Expo Go.)
- It cannot connect. (Same Wi-Fi, guest network, VPN, `--tunnel`.)
- How do I reload? (Press `r`, or shake and Reload.)

**React Native basics**

- Why must text be in `Text`? (No DOM.)
- Where is CSS? (Style objects.)
- What does `uri` mean? (Image address.)
- Why does the image need a size? (RN cannot size remote images.)

**Lists and state**

- Why `FlatList`? (Draws visible rows.)
- Why `onChangeText`? (Gives the text.)
- Why does the keyboard stay open and swallow my first tap? (Default `keyboardShouldPersistTaps`.)

**Platforms and navigation**

- iOS shadow versus Android `elevation`. (Separate systems.)
- Which `SafeAreaView`? (The package.)
- What is the gesture bar? (Line at the bottom of the Pixel.)
- How do I go back? (Header arrow or system back.)

**Storage**

- Why `useFocusEffect`? (Runs each time the screen is shown.)
- Where does `AsyncStorage` save? (Expo Go app storage.)
- Why do I land on the Expo Go home after swiping it away? (Rescan or choose from recents.)

## Could not verify

I cannot run `npm install`, start Metro or use a phone.

- README setup: Expo Go install, login need, QR scan, same Wi-Fi, `--tunnel`, any first-launch permission prompt.
- Section 1: header and blank screen (Step 1), image hidden until Step 4 (Step 3), card layout and `elevation` shadow (Step 4), status bar icons.
- Section 2: spinner and Retry (Step 2, including the "Try it" error), keyboard behaviour (Steps 3 and 4), list filtering, TalkBack reading (Step 5), final look (Step 8).
- Section 3: tap to open details, back arrow and system back, first tap closing the keyboard, gesture bar spacing, shadow after `Platform.select`.
- Section 4: heart tap size and glyph look, nested tap inside the tile, favourites surviving closing Expo Go.

## Environment notes

- Glob and Grep were not available in my session, so I read files by the paths the guide names. This did not block me.
- Every command printed `npm warn Unknown user config "always-auth"`. It comes from the machine config, not the repo.
- `npx tsc --noEmit -p WORK/tsconfig.json`: clean at the start and after every step. I ran it after each step this time (Steps 6 and 7 were written together before one check). The "Try it" error snippet also compiled.
- Jest ran in roughly 14 to 60 seconds per run. One run used `--silent`, which is not in the allowed command form. Failure output is long and was truncated in the middle.
- Timing: not meaningful. Copying code was quick. Real attendees will spend their time on setup and device connection.

## Compared with the previous run

Previous report: `attendee-report-pixel-20261011-204631.md`.

**Fixed**

- Section 2 Step 2 "Try it": now a full working snippet. I applied it and it compiles.
- README Android: "You don't need Android Studio for this. Expo Go is enough."
- Section 4 Step 3: heart has `hitSlop={8}` and the step explains it.
- Section 3 Step 2: the web case for `Platform.select` is now stated.
- Section 3 Step 3: "The package is already installed." added.
- Section 2 Step 5: a warning to find out how to turn VoiceOver or TalkBack off (partial, see below).
- Section 4 "Check it": now says to scan the QR code again (partial, see below).

**Still open**

- README: login and `npx expo login` unexplained and described as needed; no mention of where the QR code is; camera app not ruled out; no `npm run android` warning; no Wi-Fi isolation note; no SDK versus Expo Go version note; no repo URL or `cd`; no Android permission step.
- TalkBack: still no Pixel path, no gestures, no way off, no expected output.
- "Swipe Expo Go away": no Pixel gesture, no recents option.
- "home bar" wording, no "scroll to the bottom", no reason for the package `SafeAreaView`.
- Android back is not mentioned in Section 3 Step 1; keyboard-swallows-first-tap not mentioned.
- Section 2 Step 3 "Typing and Clear do nothing yet." wording.
- No reload or red-screen help in Section 1; no status bar note; `StyleSheet.create` unexplained.
- Heart glyphs may render as emoji on Android.
- Long repeated whole-file diffs in Section 2.
- Retry has no role or label while Clear does.

**New**

- Tone findings (see Tone): padded or talking-down lines, and a few places that assume too much (`useCallback`, `Platform.select` spread, style arrays).
- Section 2 Step 8: "The list is a lot shorter." is ambiguous (the file, not the screen).
- Section 3 Step 1 has no "Check it", and includes a web-only note in the middle of the flow.
- Section 2 Steps 1 to 3 do not say what you should see on screen.
- Steps 6 and 7 use hex colours while the starter files import the theme `colors`.
- Android `Pressable` tiles give no press feedback by default (could not verify).

## Pixel-specific findings

- **Android Studio:** now stated as not needed. Fixed.
- **Expo Go install and scan:** Play Store install and the in-app "Scan QR code" are right. Still missing: the QR code is in the terminal, the camera app will not work, and the Expo Go version must match SDK 57.
- **Login:** still looks required. Please confirm and reword.
- **Developer options and USB debugging:** none assumed. Still no "do not use `npm run android` with a phone".
- **Shadows (`elevation`):** set in Section 1 and split in Section 3. Could not verify.
- **Status bar:** not mentioned. Could not verify.
- **System back and gesture bar with `SafeAreaView`:** "home bar" is iOS wording and back is not mentioned. Edge-to-edge should be handled by the package `SafeAreaView`. Could not verify.
- **Heart tap:** `hitSlop` now added. Glyph rendering and long-name overlap could not be verified.
- **"Swipe Expo Go away":** Pixel gesture not given; the project can be reopened from Expo Go's recent list.
- **TalkBack:** warning added, instructions still missing.
- **Keyboard:** never mentioned. The first tap on a card after typing may only close the keyboard. Could not verify.
- **Device name:** data says "Google Pixel 9", attendee has a Pixel 10. Harmless.

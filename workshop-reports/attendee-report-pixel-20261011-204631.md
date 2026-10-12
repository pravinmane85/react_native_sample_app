# Workshop attendee report (Pixel 10, Expo Go)

**Date:** 2026-10-11
**Role:** Junior dev, React and TypeScript, no mobile experience. Setup: physical Pixel 10, Android Studio installed, Expo Go, same Wi-Fi.
**Guide version:** c09f15e (working tree dirty: modified `.claude/agents/workshop-attendee.md`, new agent files, `SLIDES-PROMPTS.md`, `scripts/prepare-attendee-copy.py`). Worked in `.workshop-attendee/pixel-20261011-204631`.
**Overall:** I finished Sections 1 to 4 by copying the code. Type check was clean after every step and all 27 tests passed at the end. One instruction is broken (the Section 2 Step 2 "Try it" error test). I could not run the app, so every on-screen and device check is "Could not verify".

## Summary

| Section | Steps | Completed | Needed help | Unclear |
| --- | --- | --- | --- | --- |
| README setup (Pixel) | 6 | Read only, could not run | 0 | 3 |
| 1 Product card | 4 | 4 | 0 | 1 |
| 2 Show the products | 8 | 8 | 0 | 3 |
| 3 Navigation and platforms | 3 | 3 | 0 | 2 |
| 4 Storage | 4 (+ check) | 4 | 0 | 2 |

I never opened a `*.solution` file and never needed to.

Test runs (`npx jest --rootDir WORK`):

- After Section 1: 6 passed, 21 failed (8 suites failed). The guide says this is expected.
- After Section 2: 18 passed, 9 failed.
- After Section 3: 20 passed, 7 failed. The remaining failures are all favourites tests, which Section 4 fixes.
- After Section 4: 27 of 27 passed.

## Top issues

1. Section 2 Step 2, "Try it": changing `resolve(products)` to `reject(new Error('Network down'))` does not work. The Promise is `new Promise((resolve) => ...)`, so `reject` is not defined. `tsc` says `error TS2304: Cannot find name 'reject'`. On the phone it would be a red error screen or a spinner that never ends, not the Retry UI. I reproduced this. Fix: tell them to change the Promise to `(resolve, reject)` first, or show the full snippet.
2. README, Android: it is unclear whether `npx expo login` and an Expo account are needed. Both steps 2 and 3 say sign in, and Setup says "An Expo account is needed to sign in on a physical phone". As far as I know, Expo Go on the same Wi-Fi does not need an account. As written, a Pixel user will think they must create one. It also never says where the QR code appears (the terminal that ran `npm run start`).
3. Section 4 "Check it": "Close the app (swipe Expo Go away), then open it again." On the Pixel, reopening Expo Go shows the Expo Go home screen, not the app. The attendee has to rescan the QR or tap the project under "Recently opened", and Metro must still be running. The guide does not say this, so people will think the app lost its data or broke. The guide also does not say how to swipe away (gesture nav: swipe up and hold, then swipe the card up. 3-button nav: tap the square).
4. Section 2 Step 5 (TalkBack): the guide says only "Settings > Accessibility" and does not say how to use TalkBack. Once it is on, one tap only selects an item and a double tap activates it. Scrolling needs two fingers. It does not say how to turn it off. A newcomer can lock themselves into a phone that does not respond to normal taps. Add the Pixel path (Settings > Accessibility > TalkBack > Use TalkBack), the double-tap rule, and how to turn it off (hold both volume keys for 3 seconds if the shortcut is enabled, or the same Settings screen).
5. Section 4 Step 3: the heart on the tile is 28x28 with no `hitSlop`, which is a small target on a phone. The details screen already uses `hitSlop={8}` and 36x36. The heart glyphs `♥` and `♡` are plain text characters. On Android they can show as a coloured emoji that ignores the `color` style, and `♡` may use a fallback font. Could not verify. Fix: suggest `hitSlop` on the tile heart.

Other, smaller points are in the sections below.

## README (Pixel path)

- **Result:** Could not run. I read it as a Pixel user would.
- **What I did:** Followed "Setup" and "Running on a physical Android phone". Ignored the other platform sections.
- **Checks:** Could not run `npm install`, `npx expo login` or `npm run start`. Could not verify any of it.
- **Unclear or missing:**
  - "Pick **one** way to run the app... a physical phone with Expo Go, or the web." Is Android Studio needed for Expo Go? The Pixel section does not say. Android Studio is only mentioned under "Android emulator". I guess it is not needed, but the README never says so. The Pixel user is told in the brief that they have it installed, so they will wonder whether to use it.
  - Step 2 and 3, "Sign into your account on the device" and "Sign into the expo cli": see Top issue 2. It also says to sign in on the phone, but gives no hint where. Expo Go has a Log in button on its Profile or Settings tab, and Expo Go shows a home screen with no sign-in prompt.
  - Step 6, "Open Expo Go and tap **Scan QR code**": right for Android (Expo Go has its own scanner). It does not say that the Pixel camera or Google Lens will not open Expo Go. On Android, opening the camera and scanning does not work like on iPhone. Say "use the scanner inside Expo Go, not the camera app".
  - No mention that the first Expo Go launch may ask for permissions (camera for scanning, local network or notifications). Also, nothing about the Play Store version of Expo Go needing to support the project's SDK (package.json has `expo ~57`). I assume the store version is current, but the README does not say.
  - Step 4, "Start the Metro Bundler... `npm run start`": it does not say that the terminal will show a QR code, a URL (`exp://...`) and a menu of keys. It does not say what to do if the QR is hard to read.
  - Developer options and USB debugging: the guide does not assume any. Good. But `npm run android` is a script in package.json and the README never tells a phone user not to use it. With a phone plugged in and USB debugging on, it behaves differently from the emulator. Add "Do not use `npm run android` for the phone."
  - "If your phone can't connect, check it is on the same Wi-Fi... You can also try `npx expo start --tunnel`." Good, but no mention that guest or office Wi-Fi often blocks device-to-device traffic (very likely at a company workshop), and that `--tunnel` may ask to install `@expo/ngrok`. Also the Pixel Wi-Fi may be on a different network from the laptop's Ethernet or VPN.
  - Setup says "You need a current LTS version of Node.js and a copy of this repo (`git clone`)". No repo URL, no `cd`, and the `npm install` code block comes after the Expo Go paragraph, so it is easy to miss that it is the first command.
- **Questions an attendee might ask:**
  - Do I need Android Studio for Expo Go? (No. Only for the emulator.)
  - Do I need an Expo account? (Only if the guide really needs it. Please confirm and say so clearly.)
  - Where is the QR code? (In the terminal after `npm run start`.)
  - Can I scan with the Pixel camera? (No. Use the scanner inside Expo Go.)
  - The phone says it cannot connect. What now? (Same Wi-Fi, try `--tunnel`, check VPN and firewall.)
- **Suggested fix:** Add a short "What you need for a Pixel" list at the top of the Android section: Expo Go from the Play Store, same Wi-Fi, no Android Studio, no USB, no Developer options. Say whether login is required.

## Section 1: Build a product card

### Step 1: View

- **Result:** Done
- **What I did:** Replaced the file with the "New code" block.
- **Checks:** tsc ok
- **Unclear or missing:**
  - "A `View` is a box. Boxes go inside boxes." I guessed it is like a `div`. The guide does not say that, it just says box.
  - "Save after each step and the app reloads by itself." It does not say what to do if it does not, or if a red error screen appears (shake the phone to open the dev menu, press `r` in the terminal). On a Pixel the shake gesture and the dev menu are not explained.
  - Could not verify: I expect the header "Phones & SIM cards" and a blank screen.
- **Questions an attendee might ask:**
  - Why is nothing on the screen? (The View is empty and has no size or colour. That is correct.)
  - What file is this and why does it start blank? (It is the starter stub.)
- **Suggested fix:** Add one line saying how to reload (press `r` in the terminal) and what the red screen is.

### Step 2: Text

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:** "a bare string inside a `View` crashes the app." Good. It does not say what the crash looks like on a phone. The text is "iPhone 18" and the product data has "Apple iPhone 16 Pro", so the name here is a throwaway, but it is not said.
- **Questions an attendee might ask:**
  - Why does text have to be inside Text? (There is no DOM. Native views cannot hold raw strings.)
  - Where are `h1`, `p`, `span`? (They do not exist. Use `Text` and style it.)
- **Suggested fix:** None needed beyond the screenshot placeholder in the intro.

### Step 3: Image

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:** "`uri` is the address of the image. An image from the internet also needs a width and height, so you will not see it until Step 4." Clear. Could not verify: I expect nothing new to show on screen. It also needs the phone to have internet.
- **Questions an attendee might ask:**
  - What does `uri` mean? (The web address of the picture.)
  - Why `source={{ uri }}` with double braces? (Outer braces are JSX, inner braces are an object.)
  - Why is there no `src`? (RN uses `source`.)
  - Why does the image not show? (It has no size yet.)

### Step 4: StyleSheet

- **Result:** Done
- **What I did:** Replaced the file with the "New code" block.
- **Checks:** tsc ok
- **Unclear or missing:**
  - "Move the `Image` above the `Text`." The diff handles it. Fine.
  - "Android uses `elevation`. Set both." Good. Could not verify: on the Pixel I expect a soft grey shadow below and around the card from `elevation: 4`. I expect the iOS `shadow*` values to be ignored.
  - `flex: 1` is explained as "fills the space available". A web dev may expect it to behave like CSS flex-grow. Fine.
  - The diff has a trailing `+` blank line at the end. Harmless.
  - Where do the styles go? The sentence "Styles are plain objects, not CSS" is good, but `StyleSheet.create` is never explained.
  - Could not verify: status bar. I expect the header to sit below the status bar and the icons (time, battery) to look fine over the red header. The guide does not talk about the status bar and I cannot tell whether the Pixel will show light or dark icons.
- **Questions an attendee might ask:**
  - Why `StyleSheet.create` and not a plain object? (Validation and a small performance gain. A plain object also works.)
  - Why no units? (Numbers are density-independent pixels.)
  - Why does the shadow look different on iPhone and Android? (Separate systems.)
  - Why is `flexDirection` `column` by default? (It differs from the web.)

**Section 1 tests:** 6 passed, 21 failed. Expected per the guide.

## Section 2: Show the products

### Step 1: Data fetching

- **Result:** Done
- **What I did:** Three parts: edited `products.ts`, `productsApi.ts`, then the screen.
- **Checks:** tsc ok
- **Unclear or missing:**
  - The three parts are in three different files. Part 3 shows the whole file as a diff again (about 70 lines for a 15-line change). Easy to lose your place.
  - "`src/data/products.json` is provided." I did not need to open it. I found it has "Google Pixel 9", used later.
  - The diff for `products.ts` removes `// TODO` comments. Clear.
  - `FlatList` is explained in one paragraph. `keyExtractor` is explained as "gives each row a unique key". Good.
  - It does not say why the screen's local state is named `products` and the import in the api is also `products`. They are in different files, so no clash. A beginner may wonder.
  - Could not verify: after a short wait the list shows one card per product, with the name only. Images need internet.
- **Questions an attendee might ask:**
  - Why is there a fake API? (So the data code looks like a real server call.)
  - Why `data as Product[]`? (The JSON import is typed loosely.)
  - What is `.then(setProducts)`? (Passes the result straight to the state setter.)
  - Why not `ScrollView` and `map`? (`FlatList` only draws visible rows.)
- **Suggested fix:** Show part 3 as a short diff, not the whole file. Or collapse the unchanged `styles` block.

### Step 2: Loading and errors

- **Result:** Done, except the "Try it" (see below).
- **Checks:** tsc ok
- **Unclear or missing:**
  - **Wrong instruction:** "to see the error, change `resolve(products)` in `productsApi.ts` to `reject(new Error('Network down'))`". `reject` is not a parameter of the Promise callback. I tried it in the copy: `error TS2304: Cannot find name 'reject'`. I reverted it. On a phone it would show a red screen from a `ReferenceError` thrown inside `setTimeout`, and the Retry button would never show.
  - "`Pressable` is a tappable wrapper. You meet it properly in Step 3." Good.
  - Nested ternary in JSX is hard to read for a beginner. The guide does not explain it.
  - The Retry button is an unstyled `Text`. On a Pixel it is small and plain. That is OK for a workshop but nothing says it is deliberate.
  - Could not verify: the spinner. I expect a small grey spinner at the top centre. The `ActivityIndicator` has no size or colour.
- **Questions an attendee might ask:**
  - Why `.finally`? (Runs on success and failure to hide the spinner.)
  - Why do I get a red screen when I try the error? (Because of the `reject` bug above.)
  - Is `Pressable` like a `button`? (Roughly.)
- **Suggested fix:** Make the "Try it" snippet `new Promise((resolve, reject) => ... reject(new Error('Network down')) ...)`, and say the red screen can be dismissed.

### Step 3: Interactivity

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:**
  - "Typing and Clear do nothing yet." Typing does put letters in the box (the input manages its own text). What does nothing is the filtering. Wording is slightly wrong.
  - The `import` list changed from one line to a multi-line list. Fine, but the diff makes it look like a bigger change.
  - Could not verify: on the Pixel the keyboard opens when you tap the box. I could not tell whether the keyboard covers the list. The guide does not mention the keyboard at all.
- **Questions an attendee might ask:**
  - Where is `onChange` and `event.target.value`? (Not used here. See Step 4.)
  - Why `placeholder` and not a label? (RN has no `<label>`.)
- **Suggested fix:** "Typing shows letters, but the list does not change yet."

### Step 4: State

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:**
  - "`onChangeText` gives you the new text, not an event." Good for web developers.
  - "Type 'pixel' and the list shrinks." Works because the data has "Google Pixel 9". Nice for this setup. It does not say how many rows to expect.
  - Could not verify: the list shrinking, the keyboard.
- **Questions an attendee might ask:**
  - Why `value` and `onChangeText` together? (Controlled input.)
  - Why trim and lower case? (So "  PIXEL " still matches.)
  - Why does the keyboard stay open? (Tapping elsewhere does not close it by default.)

### Step 5: Accessibility

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:**
  - "Optional: turn on VoiceOver (iOS: Settings > Accessibility) or TalkBack (Android: Settings > Accessibility). Both read the screen aloud." On a Pixel the full path is Settings > Accessibility > TalkBack > Use TalkBack. The guide does not tell you the gestures (double tap to activate, two-finger scroll) or how to turn TalkBack off. See Top issue 4. TalkBack may also need to download a voice on first use, which needs internet.
  - It does not say what to expect. I would expect: "Search phones, edit box", "Clear search, button", and each card read as one item ("Apple iPhone 16 Pro, £1,099.00"). Could not verify.
  - The Retry `Pressable` and the heart (later) have no extra label or role added in this step. TalkBack will read the text "Retry". Fine, but the step only labels some things and does not say why.
  - `accessibilityLabel` on the `Image` here sits inside a card that is not yet a `Pressable` (it is in Step 7). Later, inside a tappable card, TalkBack reads the card as one item. Could not verify.
- **Questions an attendee might ask:**
  - What is the difference between a label and a role? (Label is the spoken name. Role is what it is.)
  - How do I turn TalkBack off? (See above.)
  - Why does my phone not respond to taps now? (TalkBack is on. Double tap.)
- **Suggested fix:** Add 2 lines about TalkBack gestures and how to turn it off, or move it to a clearly marked optional box.

### Step 6: SearchBar component

- **Result:** Done
- **What I did:** Replaced the whole starter file with the code in the collapsible.
- **Checks:** tsc ok (checked together with Step 7)
- **Unclear or missing:**
  - Here there is only a collapsible, not a diff. That is a change in format from earlier steps. It says "Replace the whole of ...", so it is clear.
  - "The Clear button now only shows when there is text." Good.
  - The starter file imports `React` and `colors` and has unused styles. They are all gone after the replace. That is fine.
  - "Nothing changes on screen until Step 8." Good.
- **Questions an attendee might ask:**
  - Why a separate component? (Reuse and a shorter screen.)
  - Why `{value ? ... : null}`? (Show Clear only when there is text.)

### Step 7: ProductTile component

- **Result:** Done
- **Checks:** tsc ok (checked together with Step 6). I wrote Step 6 and Step 7 before running the check, so I did not run it between them.
- **Unclear or missing:**
  - The starter has `onPress`, `isFavorite`, `onToggleFavorite` as required props. The new code makes them optional (`?`). The guide says so. Good.
  - The new `ProductTile` ignores `isFavorite` and `onToggleFavorite` (the function only destructures `product, onPress`). Fine until Section 4, but a reader may wonder why they are in the interface.
  - The card is now a `Pressable` and the badge uses `position: 'absolute'`. Neither is explained.
  - `{product.price}{product.pricePeriod ? ...}` formatting with a template string. OK.
  - Could not verify: whether the `elevation` shadow shows correctly with the `Pressable` on Android.
- **Questions an attendee might ask:**
  - Why `position: 'absolute'`? (Puts the badge over the image.)
  - Why a `Pressable` for the whole card? (So it is tappable.)

### Step 8: Use them in the list screen

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:** The step is "Replace the whole file with" and there is no diff. The earlier steps were diffs. Fine. The `contentContainerStyle` is new and not explained. Could not verify: I expect the same list now with price, make and badge on each card.
- **Questions an attendee might ask:**
  - What is `contentContainerStyle`? (Style for the content inside the scroll area.)
  - Where did `View`, `Image` and `TextInput` imports go? (Moved into the components.)

**Section 2 tests:** 18 passed, 9 failed. The guide does not say which tests should pass at this point. The list-screen suite showed 4 of 7 pass; the 3 failures are navigation (Section 3) and favourites (Section 4).

## Section 3: Navigation and platforms

### Step 1: Navigation

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:**
  - "Open `src/App.tsx` and find the two `Stack.Screen` lines." I read it. `Stack.Navigator` is never explained. "React Navigation gives every screen a `navigation` prop." Good.
  - A TypeScript beginner needs to know why the type is needed (typed `navigation.navigate`). Not explained.
  - Could not verify: tapping a card opens the details screen. On Android the back arrow in the header and the system back gesture or button should both go back. The guide does not mention back at all.
  - If the keyboard is open after typing in the search box, the first tap on a card may only close the keyboard and not open the product. This is the default `FlatList` behaviour (`keyboardShouldPersistTaps="never"`). The guide does not mention it. Could not verify.
- **Questions an attendee might ask:**
  - What is `navigation.navigate('ProductDetails', { id })` doing? (Pushes the screen by name and sends params.)
  - How do I go back on my Pixel? (Header arrow or system back.)
  - Why is the details screen already written? (To save time.)
- **Suggested fix:** One line: "Use the back arrow or your phone's back gesture to return."

### Step 2: Platform specific styles

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:**
  - "Section 1 already worked, because each platform ignores the other's styles. This makes the choice explicit." Honest and clear.
  - `...Platform.select({...})` uses a spread of an object. A beginner may not know it. On web (which the README offers) `Platform.select` has no `web` key, so shadows disappear. Not my path, but the guide does not say.
  - Could not verify: on the Pixel I expect the card to look the same as before.
- **Questions an attendee might ask:**
  - What does `Platform.select` return? (The object for the current platform.)
  - Why spread it? (To merge those styles into the card style.)

### Step 3: Safe area

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:**
  - "On a phone with a home bar, the bottom of the list no longer sits under it." On a Pixel the equivalent is the gesture bar (the thin line at the bottom) or the 3-button nav bar. The guide says "home bar" (iOS word). Android users may not know what it means.
  - The import is from `react-native-safe-area-context`, not `react-native`. The guide does not explain why. `react-native` also exports a `SafeAreaView` that only works on iOS. A junior would ask which one to use.
  - "Check it: look at the bottom of the list. Does it sit clear of the home bar?" You have to scroll to the bottom first. It does not say that.
  - "Optional: ... run on a second platform and compare the shadows." Not possible for a Pixel-only attendee. Fine, since it is optional.
  - Could not verify: with edge-to-edge (Android 15 and later draw behind the system bars), I expect the last card to stop above the gesture bar. The status bar and header should not change.
- **Questions an attendee might ask:**
  - Which `SafeAreaView` do I import? (The one from `react-native-safe-area-context`.)
  - What is a "safe area"? (The part of the screen not covered by the notch, status bar or gesture bar.)
  - What is the "home bar" on Android? (The gesture bar at the bottom.)

**Section 3 tests:** 20 passed, 7 failed. All 7 are favourites tests that Section 4 fixes.

## Section 4: Storage

### Step 1: Storage

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:**
  - "`AsyncStorage` ... is already installed." True: it is in package.json (2.2.0). Good.
  - "It only stores text, so we save the ids as JSON." Clear.
  - `catch {` without a variable is newer syntax. Fine.
  - Silent failure in `saveFavoriteIds`: "best effort in this demo". The comment explains it.
  - Could not verify: data survives closing the app. On Expo Go the storage belongs to Expo Go, not to the project, so clearing Expo Go data wipes it.
- **Questions an attendee might ask:**
  - Where is the data stored on my phone? (In app storage managed by Expo Go.)
  - Why is it async? (Reading from disk takes time.)
  - Is it safe for passwords? (No. Do not store secrets here.)

### Step 2: API

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:** "Why two layers? Later the api could talk to a server without changing the screens." Good. The `getFavoriteIds` diff removes `async`, which is not mentioned. Fine.
- **Questions an attendee might ask:**
  - Why not call storage directly from the screen? (See the guide's "two layers".)
  - Why does `toggleFavorite` re-read storage each time? (To avoid stale state.)

### Step 3: The heart

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:**
  - "The inner `Pressable` takes the tap first, so the card's `onPress` does not run." Clear. The test for it passes.
  - The heart button is 28x28 with no `hitSlop`. Small for a finger on a Pixel. The details screen uses `hitSlop={8}`. Could not verify.
  - The heart is a text glyph (`♥` and `♡`). On Android these may show as a coloured emoji and ignore the style colour. Could not verify.
  - Accessibility: the card is an accessible `Pressable` and the heart is a nested `Pressable`. On Android TalkBack, I would expect it to read the card as one item. Whether the heart can be focused on its own is not something I could check. Could not verify.
  - This step has the first mention of `Text` styled as array (`[styles.a, cond && styles.b]`). It is not explained.
- **Questions an attendee might ask:**
  - Why does tapping the heart not open the product? (The inner `Pressable` handles the touch.)
  - Why `isFavorite && styles.favoriteIconActive`? (Adds the red style only when true.)
  - Why is it text and not an icon? (No icon library needed.)
- **Suggested fix:** Add `hitSlop={8}` to the heart, as in the details screen.

### Step 4: Connect the list

- **Result:** Done
- **Checks:** tsc ok. After this step the tests all pass.
- **Unclear or missing:**
  - The explanation bullets for `useFocusEffect`, `useCallback` and `extraData` are short and good.
  - "Focus means the screen is the one in view." Good.
  - `toggleFavorite(item.id).then(setFavoriteIds)` is a long line in JSX. Fine.
  - The imports are not in a tidy order (`SafeAreaView` import is in the middle). Not wrong.
- **Questions an attendee might ask:**
  - Why `useFocusEffect` and not `useEffect`? (`useEffect` runs once, the screen stays mounted under the details screen.)
  - What does `useCallback` do here? (Keeps the function the same between renders so the effect does not rerun.)
  - Why `extraData`? (`FlatList` only rerenders when `data` changes.)

### Check it

- **Result:** Could not verify
- **Unclear or missing:** See Top issue 3 (reopening after swiping Expo Go away). "Optional: run `npm test`. Every test should pass." It did: 27 of 27.
- **What I would expect:** the heart stays red after reopening the app, once the project is opened again from Expo Go.

**Section 4 tests:** 27 passed, 0 failed.

## Questions to prepare for

**Setup (Pixel)**

- Do I need Android Studio for Expo Go? (No.)
- Do I need an Expo account or `npx expo login`? (Say clearly. Please confirm.)
- Where is the QR code? (Terminal.)
- Why does the Pixel camera not open the app? (Scan inside Expo Go.)
- The phone cannot connect. (Same Wi-Fi, VPN, guest network, `--tunnel`.)
- How do I reload? (Press `r`, or shake and choose Reload.)
- What is the red screen? (A JavaScript error. Fix the code and save.)

**React Native basics**

- Why must text be inside `Text`? (No DOM.)
- Where is CSS? (Style objects.)
- What does `uri` mean? (Address of the image.)
- Why does the image need a width and height? (RN cannot size remote images itself.)
- Is `View` a `div`? (Close.)
- Why `flex: 1`? (Fill available space.)

**Lists and state**

- Why `FlatList` and not `map`? (Only draws what is on screen.)
- Why `keyExtractor`? (Unique key per row.)
- Why `onChangeText` and not `onChange`? (Gives the text directly.)

**Platforms**

- iOS shadow vs Android `elevation`. (Different systems.)
- Which `SafeAreaView`? (From `react-native-safe-area-context`.)
- What is the gesture bar? (The line at the bottom of the Pixel.)

**Navigation and storage**

- How do I go back? (Header arrow or system back.)
- Why `useFocusEffect`? (Runs each time the screen is shown.)
- Where does `AsyncStorage` save? (App storage in Expo Go.)
- Why does the app open on the Expo Go home after I swipe it away? (Rescan or choose it from recent projects.)

## Could not verify

I cannot run `npm install`, start Metro, or use a phone. Everything below needs the Pixel.

- README setup: installing Expo Go, whether login is needed, scanning the QR, same Wi-Fi, `--tunnel`.
- Section 1: the header and blank screen (Step 1), image not showing until Step 4 (Step 3), the card layout and the `elevation` shadow (Step 4), status bar icon colour.
- Section 2: spinner (Step 2), Retry screen, keyboard opening and covering the list (Steps 3 and 4), list filtering, TalkBack reading order (Step 5), the finished look (Step 8).
- Section 3: tap to open the details screen, back arrow and system back, first tap closing the keyboard, gesture bar spacing with `SafeAreaView`, shadow look after `Platform.select`.
- Section 4: tap target of the heart, the heart glyph look on Android, whether TalkBack can focus the nested heart, that favourites survive closing Expo Go and reopening the project.

## Environment notes

- I could not list directories: Glob and Grep were not available in my session, so I read files by the paths the guide names. I did not use `find` or any other command. This did not block me.
- Every command printed `npm warn Unknown user config "always-auth"`. It is noise from my machine config, not from the repo.
- `npx tsc --noEmit -p WORK/tsconfig.json`: clean at the start (starter stubs compile) and after every step. The only failure was the deliberate `reject` test, which I reverted.
- Jest ran in about 8 to 32 seconds per run. `--silent` did not hide failure output, so the long output was truncated in the middle.
- The Jest `testPathIgnorePatterns` includes `<rootDir>/.workshop-attendee/`. With `--rootDir WORK` it worked as expected.
- I did two small deviations from "tsc after each step": Steps 6 and 7 were written before one check. The rest were checked one by one.
- Timing: not meaningful. Copying code was quick. A real attendee would spend most of the time on setup and device connection.

## Pixel-specific findings

- **Android Studio:** not needed for Expo Go on a phone. The README does not say so. Add one line.
- **Expo Go install and scan:** Play Store install is fine. The in-app "Scan QR code" step is right for Android. Add that the camera app will not work, and say where the QR is shown.
- **Login:** `npx expo login` and the account steps look required but, as far as I know, are not for LAN use with Expo Go. Please confirm and fix the wording.
- **Developer options and USB debugging:** the guide assumes none. Good. Add "Do not use `npm run android` with a phone".
- **Shadows (`elevation`):** Section 1 sets both and Section 3 Step 2 splits them. Android only uses `elevation`. For `elevation` to show, the card needs a background colour, which it has. Could not verify.
- **Status bar:** never mentioned. Could not verify icon colour over the red header.
- **System back and gesture bar with `SafeAreaView`:** the guide says "home bar", which is iOS language. Back is never mentioned. Bottom inset on a Pixel with gesture navigation should be handled by `SafeAreaView`. Could not verify. The "bottom of the list" check needs scrolling first.
- **Heart tap:** small target (28x28, no `hitSlop`). Glyph may render as emoji. Nested tappable inside tappable. All could not verify.
- **"Swipe Expo Go away":** Pixel steps not given, and reopening lands on the Expo Go home screen (Top issue 3).
- **TalkBack (Section 2 Step 5):** Settings path is only half given for a Pixel, no gesture help, no way to turn it off (Top issue 4).
- **Keyboard:** the guide never mentions the on-screen keyboard. The first tap on a card or heart after typing may only close the keyboard. Could not verify.
- **iOS-only wording:** "home bar", "VoiceOver", and the product name "iPhone 18" in Sections 1 to 2 are iOS-leaning but not confusing. The "Optional: run on a second platform and compare the shadows" is not possible for a Pixel-only attendee.
- **Device name:** the data has "Google Pixel 9" while the attendee has a Pixel 10. Harmless, but someone may notice.

# Workshop attendee report

**Date:** 2026-10-11
**Role:** Junior dev, React and TypeScript, no mobile experience. Setup: Mac, Homebrew, Android Studio, Android emulator.
**Guide version:** HEAD c09f15e (from the session's git snapshot; I could not run git). Working tree was dirty (uncommitted changes in `.claude/agents/` and new files); the copy was `.workshop-attendee/android-emulator-20261011-204631`.
**Overall:** I finished all 4 sections. Every step applied cleanly, `tsc` passed after every step except the Section 2 Step 2 "Try it" (a real bug), and all 27 tests pass at the end. I did not need the `*.solution` files. I could not run Android Studio, the emulator or Expo Go, so every on-screen check is "Could not verify". The longest part is Section 2: the guide repeats the whole file in every step.

## Summary

| Section | Steps | Completed | Needed help | Unclear |
| --- | --- | --- | --- | --- |
| Setup (README, Android emulator) | 9 | Read only (cannot run) | 0 | 6 |
| 1 Product card | 4 | 4 | 0 | 2 |
| 2 Show the products | 8 | 8 | 0 | 4 |
| 3 Navigation and platforms | 3 | 3 | 0 | 3 |
| 4 Storage | 4 | 4 | 0 | 3 |

Test results (`npx jest --rootDir WORK`): after Section 1: 6 pass, 21 fail. After Section 2: 18 pass, 9 fail. After Section 3: 20 pass, 7 fail. After Section 4: 27 pass, 0 fail. The guide only says "many tests fail until later sections".

## Top issues

1. **Section 2, Step 2 "Try it" does not work.** It says to change `resolve(products)` to `reject(new Error('Network down'))`. The Promise is written as `new Promise((resolve) => ...)`, so `reject` is not defined. `tsc` fails with `error TS2304: Cannot find name 'reject'` and at runtime it would throw inside the timer, so the promise never settles. The attendee gets a red error screen or an endless spinner, not the "Could not load products" screen. I reverted my edit. Fix: write `new Promise((resolve, reject) => ...)` in the Section 2 Step 1 code, or tell them to add `reject`.
2. **README Android emulator steps are missing key decisions:** which system image (Apple silicon needs arm64, Intel needs x86_64; Google Play or Google APIs vs plain AOSP), what to do if the emulator is slow or will not start, and how Expo Go gets onto the emulator.
3. **Section 4 "Check it" is hard to do on an emulator.** "Close the app (swipe Expo Go away), then open it again" has no emulator steps, and reopening Expo Go does not reopen the project on its own. Add how to close it (Recents button, swipe the card up) and how to reopen it (the project in Expo Go's "Recently opened", or press `a` in the Metro terminal). A quick alternative is pressing `r` in Metro, since AsyncStorage survives a reload.
4. **The guide never says how to go back, reload, or open the developer menu on Android.** Section 3 Step 1 opens the details screen but does not say to use the header back arrow or the Android back button. There is also nothing about the red error screen or Fast Refresh not updating. Android emulator: `r` in the Metro terminal reloads, Cmd+M opens the dev menu.
5. **The `Product` type is never shown.** Steps use `item.id`, `item.image`, `product.make`, `product.badge`, `product.pricePeriod` without showing `src/types/product.ts` or `products.json`. Show or link the type once in Section 2 Step 1.
6. **Section 2 is very long and repetitive.** Every diff repeats the whole file, including unchanged styles (~2,770 lines in total). Attendees will lose their place. Consider shorter diffs, or collapsing unchanged code.
7. **Steps 6 and 7 hard-code colours** (`#E60000`, `#E0E0E0`, `white`) although the starter files import `colors` from `src/theme/colors`, and `App.tsx` uses it. The replacement files drop that import and several starter styles (`imageWrapper`, `swatchRow`, `overflow: 'hidden'`). An attendee comparing files will ask why.

## Setup: README "Android emulator" (read only)

Could not run any of this. This is my reading of it as an attendee.

### Steps 1 to 9

- **Result:** Read only. Could not verify any step.
- **Checks:** n/a
- **Unclear or missing:**
  - "`brew install --cask zulu@17`" and "`~/.zshrc`": the guide is Mac plus zsh only. It does not say what to do for bash or another shell, and it does not say to open a new terminal. It only says `source ~/.zshrc`, which fixes the current terminal only. A terminal already open elsewhere will not see `adb`.
  - Android Studio has no install line or link, while the JDK uses `brew`. Add `brew install --cask android-studio`, or a download link.
  - Step 1 installs a JDK, but nothing explains why. Expo Go with JS-only code probably does not need it. I would ask "Do I need Java?". Step 4 also needs the exact path to be right for the installed JDK; there is no way to check it (`echo $JAVA_HOME` / `ls` the folder).
  - "**Settings > Languages & Frameworks > Android SDK**": on a Mac, Settings is under the **Android Studio** menu. On the Welcome screen it is under **More Actions > SDK Manager**. A newcomer will search for it.
  - "Select **Android SDK Platform 36**": no reason is given. Why 36, and does the choice have to match the system image in Step 7?
  - Step 6: "**More Actions > Virtual Device Manager**" only exists on the Welcome screen. Once a project is open it is **Tools > Device Manager**. The guide does not say it works only from the Welcome screen.
  - Step 7: "Pick a recent Pixel, download a system image if asked": no advice on which image (API level, "Google Play" icon or not, arm64 vs x86_64). I would ask "Which one do I pick? Does Expo Go need Google Play?" The Play Store is not needed for Expo Go because Expo installs it itself, but the guide does not say so. It is needed if you want TalkBack from the Play Store.
  - Nothing about a slow or failing emulator: hardware acceleration (Hypervisor/HAXM on Intel), free disk space (the image and AVD take several GB), RAM, or "emulator won't boot, cold boot / wipe data".
  - Step 8: "Click the **Play** button next to the device". It does not say to wait until the home screen appears before Step 9.
  - Step 9: "Run `npm run android`". It does not say that this starts Metro in your terminal and must be left running, or that Expo installs and opens Expo Go in the emulator automatically (first time can be slow and needs internet from the emulator). It also does not say what to do if `npm run android` says "No Android connected device found" or `adb` is not found.
  - It does not say which terminal folder to run in (`cd` into the repo), or which Node LTS version.
  - Expo account: "An Expo account is needed to sign in on a physical phone. Simulators, emulators and the web don't need one." This is clear for the emulator. Good.
  - First run: "you should see a header, 'Phones & SIM cards', and a blank screen". It does not mention that Expo Go shows a first-run "Welcome" or developer-menu hint overlay on Android that you have to dismiss.
- **Questions an attendee might ask:**
  - Do I really need Java? (Probably not for Expo Go; but the guide says to install it, so explain or remove.)
  - What is Metro, and why must the terminal stay open? (The README explains Metro only in the phone sections; the emulator section skips it.)
  - Which system image do I pick on an M-series Mac? (arm64-v8a, recent API level, Google APIs/Play.)
  - `adb: command not found`. (Open a new terminal; check the `PATH` lines.)
  - Does the emulator have internet? (Yes, through the host. If you are on VPN or a proxy it may not. Images load from `picsum.photos`.)
  - The `README` has sections for 5 platforms. Which do I follow? (The Android emulator section plus the shared setup at the top.)
- **Suggested fix:** add a short "if it goes wrong" list; name the exact image; add the Android Studio install line.

### Shared setup at the top of README

- The first paragraph says "The quickest are a physical phone with Expo Go, or the web." It does not mention an emulator, and the Android emulator is probably the slowest to set up. Fine, but an emulator user may wonder whether they chose the wrong way.
- The shared text mentions only `--tunnel` for connection trouble. Not relevant to an emulator, and there is no emulator troubleshooting.
- Phone sections tell the user to "Sign into the expo cli" (`npx expo login`). I ignored them as instructed. Nothing in the emulator section says to skip these steps; only the shared sentence implies it.

## Section 1: Build a product card

### Step 1: View

- **Result:** Done
- **What I did:** Replaced the file with the `View` version.
- **Checks:** tsc ok
- **Unclear or missing:** "The screen stays blank. That is correct." Good. There is no mention of which editor to use or where Metro's terminal output goes.
- **Questions an attendee might ask:**
  - Is `View` a `div`? (Yes, roughly. A box that holds other things.)
  - Why `import { View } from 'react-native'` and not HTML? (There is no DOM.)
- **Suggested fix:** none.

### Step 2: Text

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:** the text "iPhone 18" will sit at the top left, under the header. Not stated. I would guess it appears in black on white. Could not verify.
- **Questions an attendee might ask:**
  - Why must text be inside `Text`? (There is no text node in native views; a bare string crashes.)
  - Why does it say "iPhone 18" but the data later says iPhone 16 Pro? (It is placeholder text.)
- **Suggested fix:** none.

### Step 3: Image

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:** "`uri` is the address of the image. An image from the internet also needs a width and height, so you will not see it until Step 4." Clear and honest. "Missing information": the image loads from `picsum.photos`, so the emulator needs working internet. If there is a proxy or VPN you will see nothing in Step 4 and have no error message to tell you why.
- **Questions an attendee might ask:**
  - What does `source={{ uri: ... }}` mean with double braces? (Outer braces are JSX, inner is an object.)
  - Why no `src`/`alt` like `<img>`? (Different API; `accessibilityLabel` comes in Step 5.)
- **Suggested fix:** add one line: "If you see no image, check the emulator has internet."

### Step 4: StyleSheet

- **Result:** Done
- **Checks:** tsc ok. Section tests: 6 pass, 21 fail (expected).
- **Unclear or missing:**
  - "`alignItems: 'center'` centres the items across the row." A web dev would read "across the row" as horizontal. In a row it centres vertically. Ambiguous.
  - The bullets explain `flexDirection`, shadows, `flex`, `margin`, `alignItems`, but not `borderRadius`, `borderTopLeftRadius`, `padding`, `fontWeight`, or why the numbers have no units. "Is 110 pixels?" (Density-independent units, not pixels.)
  - "Move the `Image` above the `Text`" is stated but the diff also adds a new wrapper `View` (the card) and a container `View`. The bullets do not mention these.
  - Diff ends with a stray `+` empty line.
  - "Android uses `elevation`. Set both." On the emulator I would expect a soft grey shadow below the card. Could not verify. Note that on Android, shadows only show if the card has a background colour, which is set.
- **Questions an attendee might ask:**
  - Is `StyleSheet.create` required, or can I use plain objects? (It works with plain objects; `StyleSheet.create` gives type checking.)
  - Where is the CSS, and can I use `px`/`rem`? (No; numbers only.)
  - Why `flex: 1` on the container? (It makes it fill the screen; without it the container has zero height.)
  - Why is the `Image` square with a rounded left edge only? (`borderTopLeftRadius` / `borderBottomLeftRadius`.)
- **Suggested fix:** add one sentence on the nested card View and units; reword "across the row".

## Section 2: Show the products

### Step 1: Data fetching

- **Result:** Done
- **What I did:** Applied the three parts in order. `src/data/products.ts`, `src/api/productsApi/productsApi.ts`, then the list screen. Starter `// TODO` comments in both files matched the diff exactly.
- **Checks:** tsc ok.
- **Unclear or missing:**
  - The guide says "Get the products from an api" but it is a local fake. It does explain this in part 2. Fine.
  - `item.id` and `item.image` are used but the `Product` type and `products.json` are never shown. I only knew the field names because I opened `src/types/product.ts` myself. A real attendee would have to guess or open it.
  - `import { getProducts } from '../../../api/productsApi'` points at a folder, not a file. The attendee has an `index.ts` they were never told about. Same for `ProductTile` and `SearchBar` in Step 8.
  - "`as Product[]`": no explanation of the cast.
  - On Android the image URL is plain https, so no cleartext issue.
  - Hard to follow: the full file is repeated in the diff although only a few lines change.
  - Introduces `useState`, `useEffect`, `.then(setProducts)` with no explanation. `useEffect` is not explained, but `useState` is explained in Step 4. Fine for someone who knows React.
- **Questions an attendee might ask:**
  - Why `keyExtractor`? (React needs a stable key per row; the list uses `item.id`.)
  - Why not `.map` inside a `ScrollView`? (`FlatList` only renders rows on screen.)
  - Why is the data typed with `as`? (JSON import is loosely typed.)
  - Where does `src/data/products.json` come from? ("Provided", in the repo.)
- **Suggested fix:** show the `Product` fields once, mention the `index.ts` files.

### Step 2: Loading and errors

- **Result:** Done, but the "Try it" is broken (see Top issues 1).
- **What I did:** Applied the diff. Then tried the "Try it": changed `resolve(products)` to `reject(new Error('Network down'))` in `productsApi.ts`.
- **Checks:** tsc ok for the main diff. With the "Try it" edit: `src/api/productsApi/productsApi.ts(6,22): error TS2304: Cannot find name 'reject'.` After reverting, tsc ok.
- **Unclear or missing:**
  - The "Try it" bug above. I tried the literal instruction; I did not look at any solution file.
  - "`Pressable` is a tappable wrapper. You meet it properly in Step 3." Fine, but the Retry button is plain unstyled text, so it does not look tappable. On Android, `Pressable` gives no ripple unless `android_ripple` is set. The attendee will not see any feedback when tapping.
  - The `ActivityIndicator` sits at the top of the screen, not centred. Not mentioned.
  - Nested ternary is hard to read.
- **Questions an attendee might ask:**
  - Why `.finally`? (Runs on success and failure, so loading always ends.)
  - Why `loadProducts` is a plain function and `useEffect` calls it with `[]`? (Runs once on mount.)
  - Why does Retry look like plain text? (No styles yet.)
- **Suggested fix:** declare `reject` in the Step 1 code; add a tip about styling Retry later.

### Step 3: Interactivity

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:** "Typing and Clear do nothing yet." Good. On the emulator, typing needs the on-screen keyboard or your Mac keyboard (the emulator accepts the Mac keyboard by default, but the soft keyboard may not appear). The guide says nothing about the keyboard, and nothing about whether the keyboard covers the list. Could not verify.
  - The unusual `import {` block reformat (one import per line) with no explanation. Fine.
- **Questions an attendee might ask:**
  - Is `TextInput` like `<input>`? (Yes, but `onChangeText` gives a string.)
  - Where is `onClick`? (`onPress` on `Pressable`.)
  - Why does the keyboard hide the list? (It may; `KeyboardAvoidingView` is out of scope.)
- **Suggested fix:** one line saying how to type on the emulator.

### Step 4: State

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:** "Type 'pixel' and the list shrinks." Checked: the data has "Google Pixel 9", so this works. Could not verify on screen. No explanation of `trim()`, `toLowerCase()`.
- **Questions an attendee might ask:**
  - Why is the filter outside `useEffect`? (It is derived from state, not a side effect.)
  - Why does the typed text lag? (It should not; if it does, the emulator is slow.)
- **Suggested fix:** none.

### Step 5: Accessibility

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:**
  - "Optional: turn on VoiceOver (iOS: Settings > Accessibility) or TalkBack (Android: Settings > Accessibility). Both read the screen aloud." In an emulator, TalkBack may not be available on non-Google-Play/Google APIs images, may need installing from the Play Store, and is hard to use without touch gestures (use the keyboard arrows or Tab and the on-screen touch). Speech output depends on the Mac audio. The guide has no emulator advice. Could not verify. I would skip it.
  - The guide never explains how to check the labels are right if you cannot run a screen reader (e.g. Android Studio Layout Inspector, Accessibility Scanner).
  - "Retry" `Pressable` was not given a role or label, unlike "Clear". Inconsistent.
  - The icon-only heart (Section 4) has a label, but the tile Pressable has none for the whole card.
- **Questions an attendee might ask:**
  - Why `accessibilityRole="button"` on a `Pressable`? (Tells the screen reader it is a button.)
  - Why a label if there is already text "Clear"? (Label replaces what is read; here it is longer and clearer.)
  - Can I test without TalkBack? (Not in the guide.)
- **Suggested fix:** note "optional, may not work on an emulator; skip if the device has no Google Play image."

### Step 6: SearchBar component

- **Result:** Done
- **What I did:** Replaced the whole starter file with the code from the collapsible.
- **Checks:** tsc ok.
- **Unclear or missing:**
  - Hard-coded colour `#E0E0E0` and `Text` plain; starter had imported `colors` from the theme and styles for `container` and `input`. Not mentioned.
  - The Clear button now appears only when there is text, so the search bar's layout shifts when you type. Fine, stated.
  - Code is inside a collapsed `<details>` only; no diff. The format changes from earlier steps without saying why.
- **Questions an attendee might ask:**
  - Why is this a named export but the screen is a default export? (Convention in this repo; not explained.)
  - Why does the starter have a `colors` import that vanishes?
- **Suggested fix:** keep the theme `colors`, or say they are not used.

### Step 7: ProductTile component

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:**
  - `product.make`, `product.badge`, `product.pricePeriod` come from the `Product` type that was never shown.
  - The starter's props `onPress`, `isFavorite`, `onToggleFavorite` are required; the replacement makes them optional. Explained: "are optional. Sections 3 and 4 use them."
  - `isFavorite` and `onToggleFavorite` are declared in the props but not destructured. An unused-props warning may appear in lint. Not mentioned.
  - Also see Top issue 7 about hard-coded colours.
- **Questions an attendee might ask:**
  - Why is the badge `position: 'absolute'`? (Overlays the image corner.)
  - Why a `Pressable` for the card? (So the whole card can be tapped in Section 3.)
- **Suggested fix:** show the `Product` fields here.

### Step 8: Use them in the list screen

- **Result:** Done
- **Checks:** tsc ok. Tests after Section 2: 18 pass, 9 fail (all failures are navigation or favourites tests). The guide does not tell the attendee which ones should pass at this point.
- **Unclear or missing:**
  - "Replace the whole file" with no diff, unlike the earlier steps whose diffs show what changed. The attendee cannot see what was removed.
  - Section intro says "You work in the list screen", but Steps 6 and 7 are in `common/`.
  - On the emulator I would expect a list of tiles with image left, details right, and a search bar above. Could not verify.
- **Questions an attendee might ask:**
  - Why is `contentContainerStyle` used and not `style`? (It pads the content inside the scroll area.)
  - Why does `ProductTile` not need `key`? (`keyExtractor` handles it.)
- **Suggested fix:** keep a diff for this step.

## Section 3: Navigation and platforms

### Step 1: Navigation

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:**
  - "Open `src/App.tsx` and find the two `Stack.Screen` lines." Good. I found them (lines 23 and 24).
  - `navigation.navigate('ProductDetails', { id })`: there is no explanation of "stack", "route" or "params" before they are used.
  - The guide never says how to go back from the details screen on Android: the header back arrow, the system back button, or the back gesture. Could not verify; I expect an arrow in the header.
  - The `navigation` prop appears out of nowhere, but the line "every screen gets a `navigation` prop" explains it. Good.
  - The diff has `import type` placed between other imports, with no explanation of `import type`.
- **Questions an attendee might ask:**
  - Why not Expo Router? (This workshop uses React Navigation. Not stated for attendees.)
  - What is `ProductListScreenProps`? (Types for the `navigation` and `route` props.)
  - How do I go back on the emulator? (Header arrow or the back button.)
  - Why does the details heart not save? (Section 4.)
- **Suggested fix:** one line on going back on Android.

### Step 2: Platform specific styles

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:**
  - On an Android-only setup the iOS branch is never exercised, and nothing says so. The guide says "Section 1 already worked, because each platform ignores the other's styles." So why change it? Answered by "This makes the choice explicit". A junior may find the step pointless.
  - On web, `Platform.select` returns `undefined` (no `default`), so no shadow. Not mentioned (web is not my setup).
  - `...Platform.select({...})` spread syntax is not explained.
- **Questions an attendee might ask:**
  - Is there a way to see the iOS shadow on my emulator? (No; pair with someone on iOS.)
  - Why spread? (`select` returns an object of styles.)
- **Suggested fix:** state "Android-only attendees will see no change".

### Step 3: Safe area

- **Result:** Done
- **Checks:** tsc ok. Tests after Section 3: 20 pass, 7 fail (all are Section 4 favourites tests).
- **Unclear or missing:**
  - It uses `SafeAreaView` from `react-native-safe-area-context`. A web dev may type `SafeAreaView` from `react-native`, which shows a deprecation warning. The guide does not say why this package is used or that it is already installed (it is, in `package.json`).
  - "On a phone with a home bar, the bottom of the list no longer sits under it." On the emulator, whether you see any change depends on the emulator's navigation mode (gesture vs 3-button). With 3-button navigation you probably see no difference. The guide gives no emulator advice. Could not verify.
  - "Check it: look at the bottom of the list." No instruction to scroll to the bottom.
  - "Optional: if you can, run on a second platform and compare the shadows." Android-emulator-only attendees cannot.
- **Questions an attendee might ask:**
  - What is a notch / home bar on Android? (Camera cut-out; gesture bar or navigation buttons.)
  - Why not `padding`? (Insets differ per device.)
  - Why do I see no difference? (Depends on device; try gesture navigation in emulator settings.)
- **Suggested fix:** scroll to the end; say how to switch the emulator to gesture navigation if you want to see the difference.

## Section 4: Storage

### Step 1: Storage

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:** the starter's TODO comments matched the diff. "It is already installed." Good. `JSON.parse(stored)` can return a non-array; not explained, and the guide says "Return [] if the data is corrupt" in the starter TODO only.
- **Questions an attendee might ask:**
  - Where does the data live on the phone? (App sandbox; cleared if you clear Expo Go's data or wipe the emulator.)
  - Why `async`/`await` here? (AsyncStorage returns Promises.)
  - Is this safe for secrets? (No.)
- **Suggested fix:** none.

### Step 2: API

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:** the diff drops `async` from `getFavoriteIds` and returns the promise instead. Not explained. "Why two layers?" is answered.
- **Questions an attendee might ask:**
  - Why is `getFavoriteIds` not `async` anymore? (It just returns the promise.)
- **Suggested fix:** none.

### Step 3: The heart

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:**
  - After this step the heart appears but does nothing until Step 4. Not said.
  - The heart is a unicode glyph (`♡` / `♥`). On an Android emulator the font may draw `♥` as a colour emoji (ignoring the `color` style) or the `♡` as a box. Could not verify. Expect a small grey outline heart that turns red when favourited.
  - The heart button is 28x28, below the usual 48dp Android touch target, and has no `hitSlop`, while the details screen's heart does (`hitSlop={8}`). The guide teaches accessibility but this is not mentioned.
  - "The inner `Pressable` takes the tap first, so the card's `onPress` does not run." Correct, and a nice explanation.
- **Questions an attendee might ask:**
  - Why not an icon library? (Keeps it simple; no extra install.)
  - Can I tap the heart without opening the product? (Yes, that is the point.)
- **Suggested fix:** tell attendees nothing happens yet; mention the emulator font.

### Step 4: Connect the list

- **Result:** Done
- **Checks:** tsc ok. `npx jest --rootDir WORK`: 8 suites, 27 tests, all pass.
- **Unclear or missing:**
  - "`useCallback` gives it a stable function." Jargon: "stable". Why is it needed? (`useFocusEffect` re-runs if the callback changes.)
  - "Check it" step 2: "Close the app (swipe Expo Go away), then open it again." See Top issue 3. On the emulator: Recents button (square) or swipe up and hold; then swipe the Expo Go card away. Reopening Expo Go shows its home screen, not your app; you must pick the project from "Recently opened" or press `a` in Metro, and Metro must still be running.
  - The step does not say which Metro terminal key reloads.
- **Questions an attendee might ask:**
  - Why `useFocusEffect` and not `useEffect`? (The list stays mounted when you open details, so `useEffect` would not run again.)
  - Why does the heart on the list update after I toggle it on the details screen? (Focus effect reloads from storage.)
  - How do I clear favourites to test again? (Not in the guide.)
- **Suggested fix:** add emulator-specific "close and reopen" steps.

## Questions to prepare for

**Setup and tooling**
- Do I need Java? Why zulu 17? (Probably not for Expo Go; the guide installs it anyway.)
- Which system image should I choose, and does it need Google Play? (arm64 on Apple silicon; Play is not needed for Expo Go.)
- The emulator is slow or will not boot. (Hardware acceleration, disk space, RAM, cold boot.)
- `adb: command not found`. (Open a new terminal or `source ~/.zshrc`; check PATH lines.)
- What is Metro and why must it stay open? (JS bundler and dev server.)
- How do I reload, open the dev menu, or see errors on the emulator? (`r` in Metro, Cmd+M, red screen.)
- How do I go back from the details screen? (Header arrow, Android back button.)

**React Native basics**
- Is `View` a `div`? Why must text be in `Text`? Where is CSS? Why no units?
- Why `FlatList` and not `map`?
- Why `onChangeText` and not `onChange`? Why `onPress` and not `onClick`?
- What does `uri` mean? Why does an image need a width and height?

**Platform**
- How do I see iOS shadows from an Android emulator? (You cannot; pair with someone on iOS.)
- Why is there no visible change from `SafeAreaView`? (Depends on the emulator's navigation mode.)
- Can I test TalkBack on an emulator? (Maybe; not reliable.)

**Storage and navigation**
- Why `useFocusEffect`? Why two layers (storage and api)?
- How do I reset favourites?

## Could not verify

- All of the README Android setup: JDK, Android Studio, SDK settings, `~/.zshrc`, `adb version`, creating and starting the virtual device, `npm run android`.
- Expo Go being installed and opening in the emulator, and Fast Refresh after each save.
- Every on-screen result: blank screen under the header, card look, shadows (`elevation`), spinner, Retry error screen, filtering for "pixel", list layout, details screen, back navigation.
- The keyboard on the emulator (soft keyboard vs Mac keyboard).
- TalkBack in Section 2 Step 5.
- `SafeAreaView` effect with the emulator's navigation bar (Section 3 Step 3).
- Heart glyph rendering on Android fonts, and the heart tap.
- Section 4 "Check it": closing Expo Go from Recents and reopening it. The AsyncStorage tests passed in Jest, which is a mock, so persistence on a real emulator is unverified.
- Image loading from `picsum.photos` on the emulator network.

## Environment notes

- I used only Read, Write and Edit inside the copy, plus `npx tsc --noEmit -p <WORK>/tsconfig.json` and `npx jest --rootDir <WORK>`. No command was denied. `Glob` and `Grep` were not available in my session, so I found files by reading the paths named in the guide.
- Every `npx` command printed `npm warn Unknown user config "always-auth"`. This comes from the machine's npm config, not the repo.
- I tried `npx jest --rootDir <WORK>/src/components/screens` (passing a folder as rootDir) and it failed with `Module ./jest.setup.ts in the setupFiles option was not found`. That was my mistake: the path belongs after the command, not as `--rootDir`. I then re-ran the full suite instead.
- Jest takes about 10 to 30 seconds. Its failure output is very long (full render trees) and hides which tests matter. Attendees running `npm test` midway will see walls of red text.
- I did not open any `*.solution` file.

## Android emulator findings

- **Setup steps are in a sensible order** (JDK, Android Studio, SDK, `~/.zshrc`, `adb version`, device, start, `npm run android`), but they are incomplete. Missing: Android Studio install line; Apple silicon vs Intel image; whether Google Play matters (it does not for Expo Go, but does for TalkBack); wait until the emulator boots; Metro stays running; Expo Go installs itself.
- **Shell file:** only `~/.zshrc` is mentioned. Not stated what to do for bash. `source ~/.zshrc` is given, but "open a new terminal" is not.
- **Slow or failing emulator:** no guidance at all (hardware acceleration, disk space, RAM, cold boot, wipe data).
- **Expo account:** clear that it is not needed for the emulator.
- **Screen-dependent steps with no emulator equivalent given:**
  - Shadows (`elevation`): expect a soft grey shadow; could not verify.
  - `SafeAreaView`: effect depends on gesture vs 3-button navigation.
  - Keyboard: no guidance on how to type.
  - Heart tap: works with a mouse click; the glyph may render differently.
  - Section 4 "swipe Expo Go away": needs Recents button steps and how to reopen the project.
  - TalkBack: may not be available on the chosen image; the guide gives no emulator guidance.
  - Second-platform shadow comparison in Section 3: impossible on an emulator-only setup.
- **Android-specific gaps in the workshop text:** how to go back (system back button), dev menu (Cmd+M), `android_ripple` for press feedback on `Pressable`, and the 48dp touch target for the small heart.
- **Written for phone, iOS or web only:** "On a phone with a home bar" (Section 3 Step 3), "swipe Expo Go away" (Section 4), "VoiceOver" before "TalkBack", and the README's phone sections which say to run `npx expo login`.

# Workshop attendee report

**Date:** 2026-10-11
**Role:** Junior dev, React and TypeScript, no mobile experience (Mac, Xcode, iOS Simulator)
**Guide version:** f4a0892 (working tree dirty: `.claude/agents/workshop-attendee.md` and `.claude/skills/workshop-slides-prompt/SKILL.md` modified, per the caller's git status; I cannot run git myself)
**Overall:** I finished Sections 1 to 4 in the prepared copy. `tsc` was clean after every step, and all 27 tests in 8 suites pass after Section 4. The Section 2 "Try it" now compiles. I could not run Xcode or the simulator, so every on-screen check is "Could not verify". The code part felt like 50 to 60 minutes of copying. The iOS README is better but still thin on booting a device. The Section 4 "close and reopen" check conflicts with "leave the terminal running".

I did not open any `*.solution` file. I never needed to.

## Summary

| Section | Steps | Completed | Needed help | Unclear |
| --- | --- | --- | --- | --- |
| README (iOS simulator) | 5 | Read only, could not run | 0 | 4 |
| 1: Product card | 4 | 4 | 0 | 2 |
| 2: Show the products | 8 | 8 | 0 | 3 |
| 3: Navigation and platforms | 3 | 3 | 0 | 2 |
| 4: Storage | 4 | 4 | 0 | 2 |

## Top issues

1. **Section 4 "Check it" tells simulator users to "run `npm run ios` ... again", but the README says "Leave the terminal running".** Metro is still on port 8081. A second `expo start` will ask to use another port. Say: press `i` in the Metro terminal, or stop Metro with Ctrl+C first.
2. **README iOS steps still stop before the device is running.** Step 3 says "Click on **+ > iPhone > Select the model and operating system version**." Nothing says to boot the device, what to do if the runtime is not installed, or whether the simulator must be open before `npm run ios`. Step 3 also says "tested on iPhone 18 and iOS 27" while the error line says "iOS 16.4 or newer". Check that 16.4 is right for SDK 57 (expo `~57.0.25`). I cannot verify it.
3. **No simulator how-to for "swipe Expo Go away" or the home bar check.** Section 4 says "close Expo Go from the app switcher" with no key combo. Section 3 Step 3 says "look at the bottom of the list. Does it sit clear of the home bar?" with no model to pick, no scroll-to-end hint, and nothing to compare against.
4. **Test counts are still not given at the end of Sections 2 and 3.** I saw 9 failed / 18 passed after Section 2 and 7 failed / 20 passed after Section 3. An attendee cannot tell if that is right.
5. **Small unexplained items remain.** The bare-string red screen has no recovery hint (Section 1 Step 2). `source={{ uri }}` double braces and `data as Product[]` are unexplained. The Retry button has no accessibility label while Clear does. There is a web-only paragraph in the middle of Section 3 Step 1 and Step 3.

Other items are listed per step below.

## README: iOS simulator

- **Result:** Read, could not run.
- **Checks:** n/a (cannot run `npm install`, Xcode or `npm run ios`).
- **Unclear or missing:**
  - Intro: "Pick **one** way to run the app. The quickest are a physical phone with Expo Go, or the web." I chose the simulator, and this line pushes me away from it. Also "**Expo Go** is a free app that runs this project on your phone" is phone-only wording.
  - "An Expo account is needed to sign in on a physical phone. Simulators, emulators and the web don't need one." Clear. Good.
  - Step 2: "**Xcode > Open Developer Tool > Device Hub**." Spelling is now right. I cannot tell if Device Hub is the right name. Which window must be open? Do I need a project?
  - Step 3: "Click on **+ > iPhone > Select the model and operating system version**." If the OS is not listed or not installed, nothing says what to do. "This tutorial was tested to be working on iPhone 18 and iOS 27" says tested, not minimum. The 16.4 minimum is only in the line under Step 5.
  - Nothing says how to boot the device after creating it, or whether it must be open before `npm run ios`.
  - Step 4: "If Xcode asks you to accept the license, run `sudo xcodebuild -license accept`." The command is shown now. The prompt appears on first launch, so it fits before Step 2.
  - Still missing: Xcode's first-launch "install additional components" step, and the Command Line Tools selection (Xcode Settings > Locations). I would expect `xcrun` or `simctl` errors without it.
  - Step 5: "This installs Expo Go into the simulator for you. Leave the terminal running." Good. It does not say to open a second terminal for `npm test` and `tsc`.
  - "When the app runs you should see a header, 'Phones & SIM cards', and a blank screen." Clear. Nothing on what to do if I see the Expo Go home screen instead.
- **Questions an attendee might ask:**
  - "Do I need to open Xcode every time?" (No. Only to create the device.)
  - "My simulator has no iPhone 18." (Any recent iPhone with a Dynamic Island. Say so.)
  - "The terminal is busy. Where do I run `npm test`?" (Second terminal.)
- **Suggested fix:** Add one line each: boot the device from the device list; install a runtime in Xcode Settings > Components; the simulator can be closed or open before `npm run ios`.

## Section 1: Build a product card

Overall: short steps, clear. Jest after Section 1: 21 failed, 6 passed, which matches "Many tests fail until later sections".

### Step 1: View

- **Result:** Done
- **What I did:** Replaced `return null` with `<View></View>`.
- **Checks:** tsc ok
- **Unclear or missing:** "A `View` is a box. Boxes go inside boxes." I guess it is a `div`. The guide does not say.
- **Tone:** "That is correct." and "Boxes go inside boxes" are a little padded for working developers.
- **Questions an attendee might ask:**
  - "Is View just a div?" (Roughly. A flexbox container, column by default.)
- **Suggested fix:** "A `View` is a container, like a `div`." Drop "Boxes go inside boxes."

### Step 2: Text

- **Result:** Done
- **What I did:** Added `<Text>iPhone 18</Text>`.
- **Checks:** tsc ok
- **Unclear or missing:** "a bare string inside a `View` crashes the app." Not said what the crash looks like (red screen) or how to clear it (fix and save, or Cmd+R in the simulator).
- **Questions an attendee might ask:**
  - "Why does text have to be inside Text?" (No text nodes natively.)
  - "I have a red screen. How do I get rid of it?" (Fix the code and save, or Cmd+R.)
- **Suggested fix:** One line on the red screen.

### Step 3: Image

- **Result:** Done
- **What I did:** Added `<Image source={{ uri: ... }} />`.
- **Checks:** tsc ok
- **Unclear or missing:** "`uri` is the address of the image." The double braces are not explained. Needs internet for the URL; not said.
- **Questions an attendee might ask:**
  - "Why two curly braces?" (Outer is JSX, inner is an object.)
- **Suggested fix:** One clause on `{{ }}`.

### Step 4: StyleSheet

- **Result:** Done
- **What I did:** Replaced the file with the "New code".
- **Checks:** tsc ok. Jest: 21 failed, 6 passed.
- **Unclear or missing:**
  - "Move the `Image` above the `Text`." The diff replaces the block, so "move" is confusing beside it.
  - `flex: 1`, `margin` and `alignItems` are explained now. Good. `borderTopLeftRadius` on the image (rather than `overflow: 'hidden'`) and `StyleSheet.create` are not.
  - The diff ends with a stray `+` blank line.
  - Shadow on iOS: I would expect a soft grey shadow. Could not verify.
- **Tone:** The "iOS draws shadows with `shadow*`, Android uses `elevation`" point is made here and again in Section 3 Step 2.
- **Questions an attendee might ask:**
  - "Why not CSS?" (Plain objects; a subset of CSS.)
  - "Why `borderTopLeftRadius` on the image?" (So the image follows the card's rounded corners.)
- **Suggested fix:** Drop the "Move the Image" bullet.

## Section 2: Show the products

### Step 1: Data fetching

- **Result:** Done
- **What I did:** Edited `products.ts` and `productsApi.ts`, then replaced the card with a `FlatList`.
- **Checks:** tsc ok
- **Unclear or missing:**
  - "Each folder has an `index.ts`, so you can import the folder name." Good, answers my folder-import question.
  - `data as Product[]`: the cast is not explained.
  - `FlatList` explained in one tight paragraph. Good.
  - For about 0.5 s the screen is blank, then the list appears. Not said, but the spinner comes next.
- **Questions an attendee might ask:**
  - "Why the cast?" (JSON import is typed by shape; the cast pins it to `Product`.)
  - "Why `keyExtractor`?" (Stable unique row key.)
- **Suggested fix:** One clause on the cast.

### Step 2: Loading and errors

- **Result:** Done
- **What I did:** Applied the diff. Then did the "Try it" with the snippet given.
- **Checks:** tsc ok on the diff. tsc ok with the "Try it" body (`new Promise((_resolve, reject) => ...)`). I reverted it and tsc is ok again. **Fixed since last run.**
- **Unclear or missing:**
  - After the "Try it", the unused `products` import is left in `productsApi.ts`. tsc does not mind. Lint might.
  - "`Pressable` is a tappable wrapper. You meet it properly in Step 3." Step 3 gives one line on it. "Properly" overpromises.
  - Retry has no accessibility label or role. Step 5 labels only Clear.
  - The guide does not say what the error UI should look like or that Retry will fail again with the snippet in place.
- **Questions an attendee might ask:**
  - "Why `finally`?" (Runs on success or failure.)
  - "Why a nested ternary?" (Three states.)
- **Suggested fix:** Say "you should see 'Could not load products.' and a Retry button". Drop "properly".

### Step 3: Interactivity

- **Result:** Done
- **What I did:** Applied the diff.
- **Checks:** tsc ok
- **Unclear or missing:** Nothing on the simulator keyboard. If the software keyboard does not show, I expect I/O > Keyboard > Toggle Software Keyboard (Cmd+K). Could not verify.
- **Questions an attendee might ask:**
  - "No keyboard appears in the simulator." (Hardware keyboard is connected; Cmd+K.)
- **Suggested fix:** One line for simulator users.

### Step 4: State

- **Result:** Done
- **What I did:** Applied the diff.
- **Checks:** tsc ok
- **Unclear or missing:** Nothing. "`onChangeText` gives you the new text, not an event." Good.
- **Tone:** "Never change the value directly" is a basic React rule for this audience. Fine, but skippable.
- **Questions an attendee might ask:**
  - "Does search look at the make too?" (No, only `name`.)
- **Suggested fix:** None.

### Step 5: Accessibility

- **Result:** Done
- **What I did:** Added `accessibilityLabel` and `accessibilityRole` per the diff.
- **Checks:** tsc ok
- **Unclear or missing:**
  - "Optional, on a phone only ... Skip this on a simulator, an emulator or the web." **Fixed since last run.** It does not offer a simulator alternative (Accessibility Inspector), so there is nothing to check on a simulator.
  - `accessibilityRole` is not explained. Retry is not labelled.
- **Questions an attendee might ask:**
  - "Can I test this on the simulator?" (Use Accessibility Inspector. Not explained.)
- **Suggested fix:** One optional line naming Accessibility Inspector.

### Step 6: SearchBar component

- **Result:** Done
- **What I did:** Replaced the whole `SearchBar.tsx`.
- **Checks:** tsc ok
- **Unclear or missing:** "This replaces the whole starter file, including its notes." **Fixed.** "The Clear button now only shows when there is text." Good. The starter imported a `colors` theme and the new code hard-codes colours. Not mentioned.
- **Questions an attendee might ask:**
  - "Why is the theme file unused?" (Workshop uses plain values.)
- **Suggested fix:** None needed.

### Step 7: ProductTile component

- **Result:** Done
- **What I did:** Replaced the whole `ProductTile.tsx`.
- **Checks:** tsc ok
- **Unclear or missing:** "`onPress`, `isFavorite` and `onToggleFavorite` are optional." **Fixed.** New fields `make`, `badge`, `pricePeriod` appear without a word. `position: 'absolute'` is unexplained.
- **Questions an attendee might ask:**
  - "What does `position: 'absolute'` do here?" (Places the badge over the image, relative to the card.)
- **Suggested fix:** One line on the badge.

### Step 8: Use them in the list screen

- **Result:** Done
- **What I did:** Replaced the whole `ProductListScreen.tsx`.
- **Checks:** tsc ok. Jest after Section 2: 9 failed, 18 passed.
- **Unclear or missing:** No expected test count at the end of Section 2. No "check it" for what the list should look like. Could not verify on screen.
- **Questions an attendee might ask:**
  - "Which tests should pass now?" (Data, SearchBar, parts of the list.)
- **Suggested fix:** Add "After this step, 9 tests still fail. Sections 3 and 4 fix them."

## Section 3: Navigation and platforms

### Step 1: Navigation

- **Result:** Done
- **What I did:** Added `ProductListScreenProps`, took `{ navigation }` in the list screen, and navigated on tile press. Opened `src/App.tsx` and found the two `Stack.Screen` lines (lines 23 and 24).
- **Checks:** tsc ok
- **Unclear or missing:**
  - "On the web, the address bar stays the same and the browser back button does not go back." Web noise for a simulator user.
  - No "Check it" line. I expect a tap to slide in the details screen and the header back button (or a drag from the left edge) to return. Could not verify.
  - `NativeStackScreenProps` is not explained.
- **Questions an attendee might ask:**
  - "Where did `navigation` come from?" (The navigator passes it to every screen.)
  - "How do I go back in the simulator?" (Header back button, or drag from the left edge.)
- **Suggested fix:** Add a one-line check and move the web note out of the main flow.

### Step 2: Platform specific styles

- **Result:** Done
- **What I did:** Imported `Platform` and wrapped the shadow styles in `Platform.select`.
- **Checks:** tsc ok
- **Unclear or missing:** The new text explains why nothing changes ("Section 1 already worked, because each platform ignores the other's styles"). **Fixed.** On the iOS simulator there is still nothing to see, so the step has no check.
- **Tone:** "That is fine for this workshop." adds nothing.
- **Questions an attendee might ask:**
  - "What does `...` before `Platform.select` do?" (Spreads the chosen object into the style.)
- **Suggested fix:** None needed. Optionally cut the last sentence.

### Step 3: Safe area

- **Result:** Done
- **What I did:** Added the `SafeAreaView` import and swapped it for the outer `View`.
- **Checks:** tsc ok. Jest after Section 3: 7 failed, 20 passed.
- **Unclear or missing:**
  - "The package is already installed." **Fixed.**
  - "On a desktop browser there is no home bar, so skip the check there." Web noise.
  - "Check it: look at the bottom of the list. Does it sit clear of the home bar?" No simulator how-to: no model to pick (one with no home button), no scroll to the end, nothing to compare, no rotate (Cmd+Left/Right) to see side insets.
  - "Optional: if you can, run on a second platform and compare the shadows." Misplaced here. Shadows belong to Step 2.
  - The new import sits between local imports, which looks untidy.
- **Questions an attendee might ask:**
  - "My editor offered `SafeAreaView` from `react-native`. Is that OK?" (No, deprecated. Use the `react-native-safe-area-context` one.)
  - "Why does the top not change?" (The navigation header already covers it.)
- **Suggested fix:** Add a simulator line and warn about the auto-import. Move the shadow comparison to Step 2.

## Section 4: Storage

### Step 1: Storage

- **Result:** Done
- **What I did:** Replaced `favoritesStorage.ts`.
- **Checks:** tsc ok
- **Unclear or missing:** Nothing. "It only stores text, so we save the ids as JSON." Good.
- **Questions an attendee might ask:**
  - "Where does it live on a simulator?" (In the app sandbox on the Mac.)
- **Suggested fix:** None.

### Step 2: API

- **Result:** Done
- **What I did:** Replaced `favoritesApi.ts`.
- **Checks:** tsc ok
- **Unclear or missing:** The diff drops `async` from `getFavoriteIds` without comment. Harmless.
- **Questions an attendee might ask:**
  - "Why read storage on every toggle?" (Storage is the single source of truth.)
- **Suggested fix:** None.

### Step 3: The heart

- **Result:** Done
- **What I did:** Added the new props, the inner `Pressable` and three styles.
- **Checks:** tsc ok
- **Unclear or missing:**
  - `hitSlop` is added and explained. **Fixed.** 28 plus 8 on each side gives 44 points.
  - The heart shows but does nothing until Step 4. Not said.
  - On iOS `♥` may draw as a colour emoji and ignore `color`. Could not verify.
  - A long name could run under the absolutely placed heart. Could not verify.
- **Questions an attendee might ask:**
  - "Why does tapping the heart do nothing?" (Wired up in Step 4.)
- **Suggested fix:** One line: "The heart does nothing yet. Step 4 connects it."

### Step 4: Connect the list

- **Result:** Done
- **What I did:** Added the `useFocusEffect` import, `favoriteIds` state, `extraData` and the new props.
- **Checks:** tsc ok. Jest after Section 4: 27 passed, 8 suites. "Every test should pass" holds.
- **Unclear or missing:**
  - "`useCallback` gives it a stable function." Thin. A React dev will ask why it matters here (a changing function would rerun the effect on every render).
  - Check it, simulator line: "close Expo Go from the app switcher, then run `npm run ios` or `npm run android` again." No key combo for the app switcher. And the README says to leave the terminal running, so a second `npm run ios` clashes with Metro. Could not verify.
  - The check does not ask to open the details screen and compare the heart.
- **Questions an attendee might ask:**
  - "How do I open the app switcher in the simulator?" (Cmd+Shift+H twice, or drag up from the bottom edge and hold. I could not verify.)
  - "Will Cmd+R do?" (No. It reloads JS and the process stays alive.)
- **Suggested fix:** Replace the simulator bullet with "press Cmd+Shift+H twice, flick Expo Go up, then press `i` in the Metro terminal".

## Questions to prepare for

**Setup and tooling**
- Is Expo Go already on the simulator? (`npm run ios` installs it.)
- Which iOS version does the simulator need? (Check the README number against SDK 57.)
- Where do I run `npm test` while Metro is busy? (Second terminal.)
- No keyboard in the simulator? (Cmd+K.)

**React Native basics**
- Is `View` a `div`? Why must text be in `Text`? What are the double braces in `source={{ uri }}`?
- Why `keyExtractor`, `extraData`, `useFocusEffect`?

**Errors and recovery**
- I have a red screen. (Fix and save, or Cmd+R.)
- I ran `npm run ios` again and Metro asks about a port. (Press `i` in the running terminal instead.)

**Platform and simulator**
- Why does `Platform.select` change nothing on iOS? (It makes the choice explicit.)
- Which `SafeAreaView` do I import? (`react-native-safe-area-context`.)
- How do I see the home bar? (Pick an iPhone with no home button; scroll to the end.)

## Could not verify

- `npm install`, `npm run ios`, the Xcode menu names (Device Hub), device creation, the 16.4 iOS minimum for Expo Go.
- Everything on screen: Fast Refresh, red screen, header, blank screen, shadows, the 0.5 s delay, spinner, error UI with the "Try it", keyboard, search filter, Clear, navigation to details and back, safe area at the bottom, heart tap not opening the tile, the `♥` glyph, favourites surviving an app kill.
- VoiceOver in the simulator (expected: the setting exists but does not speak; use Accessibility Inspector).
- Section 3 Step 3 home bar check (expected: a white band at the bottom, the list clipped above it).
- Section 4 "close Expo Go from the app switcher" (expected: Cmd+Shift+H twice, then flick it up).

## Environment notes

- The copy was prepared for me. I did not run `npm install` or start the app.
- `Glob` and `Grep` were not available in this session ("No such tool available: Glob"), so I used `Read` with paths from the guide and the imports. No file was missing.
- `npx tsc --noEmit -p WORK/tsconfig.json`: clean after every step, and after the "Try it" snippet.
- `npx jest --rootDir WORK`: after Section 1: 21 failed, 6 passed (about 59 s, first run). After Section 2: 9 failed, 18 passed. After Section 3: 7 failed, 20 passed. After Section 4: 27 passed, 8 suites.
- Every npm command prints `npm warn Unknown user config "always-auth"`. It comes from the machine's npm config, not the repo.
- I read the previous report only after finishing my pass.

## iOS simulator findings

- **Device Hub** path: spelling is now "Xcode" and the menu bar wording is fixed. I cannot confirm Device Hub is the right menu.
- Expo Go support: "If you see 'requires a newer version of iOS', create a simulator with iOS 16.4 or newer." is added. It sits after the steps, not in Step 3. It clashes with "tested on iOS 27".
- Creating a device and starting the app: `+ > iPhone` and `npm run ios` are covered. Booting a device and installing a missing runtime are not.
- Expo account: clear that the simulator needs none.
- Screen steps: "Fast Refresh" is implied only. Keyboard (Section 2 Step 3) has no simulator line. The home bar check (Section 3 Step 3) and "close Expo Go from the app switcher" (Section 4) have no key combos.
- VoiceOver: Section 2 Step 5 now says to skip on a simulator. No alternative is named.
- Phone, Android or web content that would confuse me: the README intro ("quickest are a physical phone ... or the web"), "runs this project on your phone", the web notes in Section 3 Step 1 and Step 3, `elevation` in the shadow styles, "run on a second platform and compare the shadows".

## Compared with the previous run

Previous report: `attendee-report-ios-simulator-20261011-204631.md`. Guide moved from c09f15e to f4a0892.

**Fixed**
- Section 2 Step 2 "Try it": now a full body with `(_resolve, reject)`. It compiles. (Was the top issue.)
- README: "XCode" is now "Xcode" and "toolbar" is now "menu bar".
- README: licence command is shown. `npm run ios` now says it installs Expo Go and to leave the terminal running. The "requires a newer version of iOS" message is covered.
- Section 2 Step 1: the `index.ts` folder import is explained.
- Section 2 Step 5: VoiceOver is now "on a phone only", skip on a simulator.
- Section 2 Steps 6 and 7: "replaces the whole starter file" and "optional props" are stated.
- Section 3 Step 2: explains why iOS shows no change, and the web case.
- Section 3 Step 3: "The package is already installed."
- Section 4 Step 3: `hitSlop` added and explained.
- Section 4 Check it: a simulator or emulator line was added.

**Still open**
- README intro still steers away from the simulator. No device boot or runtime install step. No Command Line Tools or first-launch components step.
- Section 1: red screen recovery (Step 2), `{{ }}` (Step 3), the "Move the Image" bullet (Step 4).
- Section 2: `data as Product[]`, Retry not labelled, simulator keyboard, no test count at the end of Section 2 or 3, no check at the end of Step 8, hard-coded colours vs the starter theme.
- Section 3: no "Check it" for Step 1; no simulator how-to for the home bar check; the "second platform shadows" line is in the wrong step; import order.
- Section 4: the check still has no way to open the app switcher, and still does not compare the details screen.

**New**
- Section 4 Check it: "run `npm run ios` ... again" clashes with "Leave the terminal running" (port 8081 is in use).
- README: "tested on iOS 27" and "16.4 or newer" are in different places and look inconsistent. The 16.4 figure needs checking against SDK 57.
- Section 3: web-only sentences now sit in Steps 1 and 3 for a simulator reader.
- Section 3 Step 3: no warning that an editor may auto-import the deprecated `SafeAreaView` from `react-native`.
- Section 4 Step 3: the heart does nothing until Step 4, and the guide does not say so.
- Tone: mostly peer to peer now. A few padded lines remain ("Boxes go inside boxes", "That is correct", "That is fine for this workshop"). `Pressable` "You meet it properly in Step 3" overpromises. `useCallback` is explained too thinly for the line it gets.

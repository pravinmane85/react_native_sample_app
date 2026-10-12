# Workshop attendee report

**Date:** 2026-10-11
**Role:** Junior dev, React and TypeScript, no mobile experience (Mac, Xcode, iOS Simulator)
**Guide version:** c09f15e (working tree dirty: new agent files, SLIDES-PROMPTS.md, scripts, reports)
**Overall:** I finished Sections 1 to 4 in the prepared copy. `tsc` was clean after every step, and after Section 4 all 27 tests in 8 suites pass. One instruction does not work as written (Section 2 Step 2 "Try it"). I could not run Xcode or the simulator, so every on-screen check is "Could not verify". The code part felt about 60 to 75 minutes of copying. The iOS setup is the weakest part of the guide for a first-timer.

I did not open any `*.solution` file. I never needed to.

## Summary

| Section | Steps | Completed | Needed help | Unclear |
| --- | --- | --- | --- | --- |
| README (iOS simulator) | 5 | Read only, could not run | 0 | 4 |
| 1: Product card | 4 | 4 | 0 | 2 |
| 2: Show the products | 8 | 8 | 0 | 3 |
| 3: Navigation and platforms | 3 | 3 | 0 | 3 |
| 4: Storage | 4 | 4 | 0 | 2 |

## Top issues

1. **Section 2 Step 2 "Try it" is broken.** It says change `resolve(products)` to `reject(new Error('Network down'))`, but `productsApi.ts` only declares `(resolve)`. `tsc` gives `TS2304: Cannot find name 'reject'`. At runtime a ReferenceError inside the timer means the Promise never settles, so the spinner runs forever and you never see the error UI. Fix: show `new Promise((resolve, reject) => ...)` in Step 1, or give the full replacement line.
2. **README iOS simulator steps are not enough for a first-timer.** Missing: that `npm run ios` installs Expo Go into the simulator itself, what to do if the iOS runtime is not installed, how to pick a simulator Expo Go supports, that Metro must stay running, and what "run the command it shows" means for the Xcode license (`sudo xcodebuild -license accept`). "XCode" is also misspelled, and "On the toolbar" should be "menu bar".
3. **Section 4 "swipe Expo Go away" has no simulator equivalent.** Say: Cmd+Shift+H, then drag up from the bottom edge and hold to open the app switcher, then flick the Expo Go card away. Then reopen it from Expo Go's recent projects, or press `i` in the Metro terminal. Cmd+R reloads the JS only and does not prove the data survived a real restart.
4. **Section 2 Step 5 (Accessibility) VoiceOver advice does not fit the simulator.** "Turn on VoiceOver (iOS: Settings > Accessibility)" is written for a phone. I expect the simulator's VoiceOver setting to exist but not speak. Suggest Xcode's Accessibility Inspector for simulator users.
5. **Section 3 Step 2 and Step 3 have no checks an iOS simulator user can follow.** Step 2 shows no visible change on iOS, and says so only indirectly. Step 3 says "look at the bottom of the list" but gives no before view to compare, and does not say how to see the home bar. Suggest: pick a Dynamic Island iPhone, scroll to the end, comment `SafeAreaView` out to compare, and rotate with Cmd+Left/Right to see the side insets.

Other items are listed per step below.

## README: iOS simulator

- **Result:** Read, could not run.
- **Checks:** n/a (cannot run `npm install`, Xcode or `npm run ios`).
- **Unclear or missing:**
  - Intro: "The quickest are a physical phone with Expo Go, or the web." I chose the simulator, so I am unsure I picked the right path. This line pushes me away from it.
  - "`npm install`" sits under "Setup" before any platform. It is clear that it is shared. OK.
  - "An Expo account is needed to sign in on a physical phone. Simulators, emulators and the web don't need one." This answers my question clearly. Good.
  - Step 2: "On the toolbar, go to **XCode > Open Developer Tool > Device Hub**." Two problems. "XCode" is spelled "Xcode", and that is the menu bar at the top of the screen, not the Xcode toolbar. I cannot tell if "Device Hub" is right, and I cannot check, but the author says it is. Which window must be open? Do I need a project open?
  - Step 3: "Click on **+ > iPhone > Select the model and operating system version**." Nothing says what to do if the OS version I want is not listed or not installed. Nothing says which OS versions Expo Go supports. The "requires a newer version of iOS" error is not mentioned. The text "iPhone 18 and iOS 27" says tested, not minimum.
  - Nothing says how to start (boot) the simulator after creating it, or whether it must already be open before `npm run ios`.
  - Step 4: "If Xcode asks you to accept the license, run the command it shows." Vague. It would be better to show the command. It is also after opening Xcode, but the licence prompt happens on first launch, so it belongs before step 2.
  - Missing: Xcode's first-launch "install additional components" step. Missing: Command Line Tools selection (Xcode Settings > Locations). Without it I would expect `xcrun` or `simctl` errors that I could not interpret.
  - Step 5: `npm run ios` is `expo start --ios`. The guide does not say it installs Expo Go on the simulator by itself on first run (needs internet, can take a minute). It does not say the terminal stays busy running Metro, so I would need a second terminal for `npm test` and `tsc`. It does not say that pressing `i` in the Metro terminal re-opens the app.
  - "When the app runs you should see a header, 'Phones & SIM cards', and a blank screen." Good and clear. No guidance on what to do if I see the Expo Go home screen instead.
- **Questions an attendee might ask:**
  - "Is Expo Go already on the simulator, or do I install it?" (`npm run ios` installs it automatically.)
  - "Do I need to open Xcode every time?" (No, only to create the device. Then Xcode can be closed.)
  - "The simulator says my iOS is too old." (Create a device with a newer runtime; Xcode Settings > Components.)
  - "Which iPhone should I pick if I have no iPhone 18?" (Any recent one with a Dynamic Island or notch.)
  - "Do I need to sign into Expo?" (No, not for the simulator.)
- **Suggested fix:** Add 4 or 5 short lines under "iOS simulator". Use the right menu names, and say how to boot a device. Add the licence command. Say that Expo Go installs itself. Name the iOS version Expo Go needs.

## Section 1: Build a product card

Overall: clear, short steps, good "New code" blocks. Could not verify anything on screen.

### Step 1: View

- **Result:** Done
- **What I did:** Replaced `return null` with an empty `<View></View>`.
- **Checks:** tsc ok
- **Unclear or missing:** "A `View` is a box." I am guessing it is a `div`; the guide does not confirm. Nothing says what the iOS simulator will show: a blank screen under the header. This is stated. OK.
- **Questions an attendee might ask:**
  - "Is View just a div?" (Roughly. Layout box with flexbox, column by default.)
  - "Why is `<View></View>` not self-closing?" (It can be; this is just the starting shape.)
- **Suggested fix:** None.

### Step 2: Text

- **Result:** Done
- **What I did:** Added `<Text>iPhone 18</Text>`.
- **Checks:** tsc ok
- **Unclear or missing:** "a bare string inside a `View` crashes the app." The guide does not say what that crash looks like (the red error screen) or how to dismiss it (tap Dismiss, or Cmd+R in the simulator). A new attendee who makes a typo will get that red screen. The text "iPhone 18" appears jammed against the top-left, which is not mentioned and not wrong.
- **Questions an attendee might ask:**
  - "Why does text have to be inside Text?" (There is no HTML text node; native text needs its own component.)
  - "What is the red screen and how do I get rid of it?" (Fix the error and save, or tap Reload / press Cmd+R.)
- **Suggested fix:** Add one line about the red error screen and how to recover.

### Step 3: Image

- **Result:** Done
- **What I did:** Added `<Image source={{ uri: ... }} />`.
- **Checks:** tsc ok
- **Unclear or missing:** "`uri` is the address of the image." The double braces `source={{ uri }}` are not explained (one set for JSX, one for the object). "An image from the internet also needs a width and height, so you will not see it until Step 4." Good. The image URL needs internet. In the simulator that works if the Mac is online. Not stated.
- **Questions an attendee might ask:**
  - "Why two curly braces?" (Outer is JSX, inner is an object.)
  - "Why does a web image need a size but a local one does not?" (RN knows local sizes at build time.)
- **Suggested fix:** One line on `{{ }}`.

### Step 4: StyleSheet

- **Result:** Done
- **What I did:** Replaced the file with the "New code" block.
- **Checks:** tsc ok. Jest after Section 1: 21 failed, 6 passed. The guide says "Many tests fail until later sections. That is expected." That matches.
- **Unclear or missing:**
  - "Move the `Image` above the `Text`." The diff replaces the whole block, so the "move" bullet is confusing next to it. In the starter order (Text then Image) it does not matter to someone copying code. I had to read the diff to see that nothing was really "moved".
  - "Make it a single card: image on the left, text on the right". On screen this is a row. Matches `flexDirection: 'row'`.
  - Not explained: `borderTopLeftRadius`, `borderBottomLeftRadius` (why on the image, not `borderRadius` plus `overflow: 'hidden'`), `container` with `flex: 1`, `StyleSheet.create`.
  - On iOS I would expect to see a soft grey shadow around the card. Could not verify. The shadow is drawn from the card's `backgroundColor`, which is set. OK.
  - Wall of red test output for a beginner if they try `npm test` here. The guide says it is optional and expected.
- **Questions an attendee might ask:**
  - "Why is the card's margin 16 here but the list adds `paddingHorizontal` later?" (Step 7 and 8 reshape the layout.)
  - "Why not just use CSS?" (Plain objects, a subset of CSS.)
  - "Where is `StyleSheet.create` from, and why not a plain object?" (Validation and a tiny perf benefit.)
- **Suggested fix:** Drop the "Move the Image" bullet or say "the diff shows the new order". Explain `flex: 1` on the container.

## Section 2: Show the products

### Step 1: Data fetching

- **Result:** Done
- **What I did:** Edited `products.ts` and `productsApi.ts`, then replaced the card with a `FlatList` in `ProductListScreen.tsx`.
- **Checks:** tsc ok
- **Unclear or missing:**
  - Three files in one step; the sub-headings 1, 2, 3 helped.
  - "`src/data/products.json` is provided." Good. But I do not know what `data as Product[]` does. Why a cast?
  - The `getProducts` import `'../../../api/productsApi'` points at a folder. There is an `index.ts` I never saw. It works, but a React/TS dev may ask why a folder import resolves.
  - After this step the screen is blank for half a second, then the list appears. Not described. Without a spinner (next step) it just looks slow.
  - Section 1 used "iPhone 18"; the data has "Apple iPhone 16 Pro" and others. Not mentioned. Not a problem.
- **Questions an attendee might ask:**
  - "Why `keyExtractor`?" (Each row needs a stable unique key.)
  - "Why is this fake? Where is the real server?" (Teaching shortcut.)
  - "Why is `getProducts().then(setProducts)` allowed without `await`?" (It is a promise callback.)
- **Suggested fix:** Say the `index.ts` re-exports. Change the Step 1 `productsApi.ts` code to take `(resolve, reject)` so Step 2's try-it works.

### Step 2: Loading and errors

- **Result:** Done, but the "Try it" fails.
- **What I did:** Applied the diff. Then did the "Try it": changed `resolve(products)` to `reject(new Error('Network down'))` in `productsApi.ts`.
- **Checks:** tsc ok on the diff. After the "Try it": `error TS2304: Cannot find name 'reject'`. I reverted it afterwards.
- **Unclear or missing:** The "Try it" cannot work as written, because the Promise callback in Step 1 only has `(resolve)`. In the app this would be a ReferenceError thrown inside `setTimeout`. I would expect an endless spinner and possibly a red error screen, not the "Could not load products." UI. **NEEDS HELP** for a real attendee: they would be stuck. I did not open the solution file; I could see the cause from the tsc message.
- **Questions an attendee might ask:**
  - "Why does my spinner never stop?" (reject is not defined.)
  - "Why `finally`?" (Runs on success or failure.)
  - "Why a nested ternary?" (Three states.)
- **Suggested fix:** Change Step 1 to `new Promise((resolve, reject) => ...)`, or tell attendees to add `reject` to the parameter list as well. Also `Pressable` is used before it is introduced ("You meet it properly in Step 3"); the Retry button has no label or role while Step 5 only labels Clear.

### Step 3: Interactivity

- **Result:** Done
- **What I did:** Applied the diff. The import list becomes multi-line.
- **Checks:** tsc ok
- **Unclear or missing:** On the iOS simulator I could type with the Mac keyboard. If the software keyboard does not appear, it is toggled with I/O > Keyboard > Toggle Software Keyboard (Cmd+K). Not mentioned. iOS capitalisation and autocorrect in the field are not mentioned either. "Typing and Clear do nothing yet." Clear.
- **Questions an attendee might ask:**
  - "Why does the keyboard not show in the simulator?" (Hardware keyboard is connected; Cmd+K.)
  - "Why `placeholder` and not a label?" (RN `TextInput` has no label element.)
- **Suggested fix:** One line on the simulator keyboard.

### Step 4: State

- **Result:** Done
- **What I did:** Applied the diff.
- **Checks:** tsc ok
- **Unclear or missing:** "Type 'pixel' and the list shrinks." I checked `products.json`: only "Google Pixel 9" matches, so one row remains. True. "Never change the value directly." Fine. "`onChangeText` gives you the new text, not an event." Good, a typical web mistake.
- **Questions an attendee might ask:**
  - "Why is `onChangeText` not `onChange`?" (RN gives the string.)
  - "Is filtering on every keystroke slow?" (Not at 12 items.)
- **Suggested fix:** None.

### Step 5: Accessibility

- **Result:** Done
- **What I did:** Added `accessibilityLabel` and `accessibilityRole` per the diff.
- **Checks:** tsc ok
- **Unclear or missing:**
  - "Optional: turn on VoiceOver (iOS: Settings > Accessibility) or TalkBack (...). Both read the screen aloud." This is a physical phone instruction. For the iOS simulator I expect Settings > Accessibility > VoiceOver to exist but not read aloud, since the Simulator does not do real VoiceOver. Accessibility Inspector (Xcode > Open Developer Tool) would be the substitute. Could not verify. The guide does not say this.
  - "Screen readers need labels and roles." Roles are not explained beyond that. Why `accessibilityRole="button"` on Clear but not on Retry?
- **Questions an attendee might ask:**
  - "Can I test VoiceOver in the simulator?" (Use Accessibility Inspector. Real VoiceOver needs a device.)
  - "What does a screen reader say for the Image?" (The label.)
- **Suggested fix:** Add a simulator line. Be consistent about Retry.

### Step 6: SearchBar component

- **Result:** Done
- **What I did:** Replaced the whole `SearchBar.tsx` with the code from the collapsible block.
- **Checks:** tsc ok
- **Unclear or missing:** The code is hidden behind `<details>`, so an attendee must click to expand. The starter note says "See WORKSHOP.md, Section 2, Step 6. That step replaces this whole file." That matches. "Clear button now only shows when there is text." A behaviour change. Not shown until Step 8. The starter had a `colors` theme import; the new code ignores the theme and uses hard-coded colours. An attendee may ask why.
- **Questions an attendee might ask:**
  - "Why does the starter have a theme file I am not using?" (The workshop uses plain values.)
  - "Why export a named `SearchBar` and not default?" (Matches the index file.)
- **Suggested fix:** Optionally say that the colours are inlined.

### Step 7: ProductTile component

- **Result:** Done
- **What I did:** Replaced the whole `ProductTile.tsx`.
- **Checks:** tsc ok
- **Unclear or missing:** New fields appear without explanation: `product.make`, `badge`, `pricePeriod`. `position: 'absolute'` for the badge is not explained. `onPress`, `isFavorite` and `onToggleFavorite` are "optional" but the starter had them required. A destructure that omits two of the props is allowed but odd. A Pressable card on iOS has no press feedback. Not mentioned.
- **Questions an attendee might ask:**
  - "What does `position: 'absolute'` do in RN?" (Relative to the parent.)
  - "Why is there a `product.price` as a string with a £ sign?" (Data is display text.)
- **Suggested fix:** One line about the badge.

### Step 8: Use them in the list screen

- **Result:** Done
- **What I did:** Replaced the whole `ProductListScreen.tsx`.
- **Checks:** tsc ok. Jest after Section 2: 9 failed, 18 passed (favourites and heart tests, and the App navigation test). No expected pass/fail is given at the end of Section 2, so I could not tell if 9 failures was right. The Section 1 note says "Many tests fail until later sections", but Section 2 does not say how many are still expected.
- **Unclear or missing:** The screen should now show tiles with image, make, name, price, badge. Could not verify on screen.
- **Questions an attendee might ask:**
  - "Which tests should pass now?" (Data, SearchBar, parts of list.)
- **Suggested fix:** Say at the end of Section 2 which tests are expected to pass.

## Section 3: Navigation and platforms

### Step 1: Navigation

- **Result:** Done
- **What I did:** Added `ProductListScreenProps` to `navigation.ts`. Edited the list screen to take `{ navigation }` and call `navigation.navigate('ProductDetails', { id: item.id })`. Opened `src/App.tsx` as told and found the two `Stack.Screen` lines.
- **Checks:** tsc ok
- **Unclear or missing:** There is no "check it" at the end of this step. On the simulator I would expect to click a tile and see the details screen slide in, then go back with the header back button, or by dragging from the left edge. Could not verify. Not stated. "`NativeStackScreenProps`" is not explained.
- **Questions an attendee might ask:**
  - "Where did `navigation` come from? I did not pass it." (The navigator passes it to every screen.)
  - "What does `ProductListScreenProps` give me?" (Typed `navigation` and `route`.)
  - "How do I go back in the simulator?" (Header back button, or drag from the left edge.)
- **Suggested fix:** Add a short "Check it" line.

### Step 2: Platform specific styles

- **Result:** Done
- **What I did:** Imported `Platform` and wrapped the shadow styles in `...Platform.select({ ios, android })`.
- **Checks:** tsc ok
- **Unclear or missing:** The guide admits "Section 1 already worked" so on the iOS simulator there is nothing to see. The step has no check. This may feel pointless to an iOS-only attendee. If someone runs the web version, `Platform.select` has no `web` key, so the spread is `undefined` and the web tile loses its shadow. (Other platform, not tested.) Android lines (`elevation: 4`) are noise for me.
- **Questions an attendee might ask:**
  - "Why did we have to change something that already worked?" (To show how to be explicit.)
  - "What does `...` do before `Platform.select`?" (Spreads the chosen object into the style.)
  - "What happens on web?" (No shadow; add a `default` key.)
- **Suggested fix:** Add `default: {}` or note it; add a one-line visible outcome per platform.

### Step 3: Safe area

- **Result:** Done
- **What I did:** Imported `SafeAreaView` from `react-native-safe-area-context` and swapped it for the outer `View`.
- **Checks:** tsc ok. Jest after Section 3: 7 failed, 20 passed (the favourites and heart tests, as expected for Section 4). Section 3 does not mention tests, so I did not know if 7 was right.
- **Unclear or missing:**
  - "Phones have notches and home bars. `SafeAreaView` keeps your content clear of them. On a phone with a home bar, the bottom of the list no longer sits under it." On the simulator, pick an iPhone with a Dynamic Island (home bar at the bottom). Expect a white band at the bottom with the list clipped above it. I would expect the effect of this swap to be small. Could not verify.
  - "With the header showing, you see little change at the top." OK.
  - "Check it: look at the bottom of the list. Does it sit clear of the home bar?" I have no "before" to compare, and I do not know where the home bar is. Rotating the simulator (Cmd+Left/Right) would make the side insets visible; not mentioned.
  - "Optional: if you can, run on a second platform and compare the shadows." Not possible for me. It is a shadow check in a safe-area step, so it looks misplaced.
  - The guide does not say `react-native-safe-area-context` is already installed (Section 4 says that of AsyncStorage). I would ask "do I need to install this?". It is in `package.json`.
  - The new import lands between local imports, which looks untidy.
- **Questions an attendee might ask:**
  - "Why not use the `SafeAreaView` from `react-native`?" (Deprecated; this one handles insets properly.)
  - "Why is the top unchanged?" (The navigation header already handles it.)
  - "How do I see the home bar on the simulator?" (Choose a no-home-button iPhone model.)
- **Suggested fix:** Add one line "already installed". Add steps to compare with and without `SafeAreaView`, and a rotate check.

## Section 4: Storage

### Step 1: Storage

- **Result:** Done
- **What I did:** Replaced `favoritesStorage.ts` with the code.
- **Checks:** tsc ok
- **Unclear or missing:** "`AsyncStorage` saves small pieces of data on the phone. It is already installed." Good. On the simulator the data is saved in the simulator app's storage and it survives reloads. `catch {}` with an empty comment block is fine.
- **Questions an attendee might ask:**
  - "Is this secure?" (No, plain text.)
  - "Where does the data live on a simulator?" (Inside the simulator's app sandbox on the Mac.)
  - "Why `JSON.parse` / `stringify`?" (Only strings are stored.)
- **Suggested fix:** None.

### Step 2: API

- **Result:** Done
- **What I did:** Replaced `favoritesApi.ts`.
- **Checks:** tsc ok
- **Unclear or missing:** "Why two layers? Later the api could talk to a server without changing the screens." Good and short. The diff removes `async` from `getFavoriteIds`; not mentioned, harmless.
- **Questions an attendee might ask:**
  - "Why does `toggleFavorite` read from storage every time instead of keeping state?" (Single source of truth; simple.)
- **Suggested fix:** None.

### Step 3: The heart

- **Result:** Done
- **What I did:** Added the destructured `isFavorite`, `onToggleFavorite`, the inner `Pressable`, and three new styles.
- **Checks:** tsc ok
- **Unclear or missing:**
  - "The inner `Pressable` takes the tap first, so the card's `onPress` does not run." I am expecting this to work on iOS. Could not verify (the guide asked for the heart tap, but it is only checked at the end of Step 4).
  - The heart glyphs `♥` and `♡` come from the guide text. On iOS the filled `♥` (U+2665) may draw as a colour emoji, which ignores the `color` style. I cannot confirm it.
  - The button is 28 by 28 points. Apple's guideline is 44. A small tap target is awkward with a mouse-less trackpad. Section 4 has no `hitSlop`. Step 5 of Section 2 is about accessibility, so this stands out.
- **Questions an attendee might ask:**
  - "Why is the heart inside the card Pressable and not beside it?" (To overlay it using absolute position.)
  - "How do I type ♥?" (Copy it from the guide.)
- **Suggested fix:** Optionally add `hitSlop`.

### Step 4: Connect the list

- **Result:** Done
- **What I did:** Added the `useFocusEffect` import, the `favoriteIds` state, `extraData`, and the props to `ProductTile`.
- **Checks:** tsc ok. Jest after Section 4: all 27 tests pass across 8 suites, which matches "Every test should pass".
- **Unclear or missing:**
  - "Focus means the screen is the one in view." Good. "`useCallback` gives it a stable function." Jargon for someone who does not know why a stable function matters.
  - "Check it": "Close the app (swipe Expo Go away), then open it again." No simulator equivalent. On the simulator, press Cmd+Shift+H, drag up from the bottom edge and hold to open the app switcher, then flick Expo Go upward. After that, open Expo Go and pick the project from "Recently opened", or press `i` in the Metro terminal. Not stated in the guide. Could not verify.
  - The check only covers the list. It does not ask to open the details screen and confirm the heart state matches (the guide said earlier that "the heart on the details screen does not save yet. That comes in Section 4.").
- **Questions an attendee might ask:**
  - "Why not `useEffect`?" (Runs once only; the list would not refresh on return.)
  - "Why does `extraData` exist?" (FlatList is a pure component and will not re-render if only a side value changes.)
  - "How do I kill the app in the simulator?" (See above.)
  - "Will Cmd+R do the same thing?" (No, that reloads JS but the process stays alive.)
- **Suggested fix:** Add a simulator version of the close-and-reopen check. Add a check on the details screen.

## Questions to prepare for

**Setup and tooling**
- Is Expo Go already on the simulator? (`npm run ios` installs it.)
- Do I need an Expo account for the simulator? (No.)
- Which iOS version do I need? (A recent one; old runtimes fail with "requires a newer version of iOS".)
- The simulator is not showing a keyboard. (Cmd+K toggles it.)
- Why does the terminal stay busy? (Metro runs there. Open a second terminal.)

**React Native basics**
- Is `View` a `div`? Why must text be in `Text`? What are the double braces in `source={{ uri }}`?
- Why `flex: 1`? Why not CSS? What is `StyleSheet.create`?
- Why `keyExtractor`? Why `extraData`? Why `onChangeText` gives a string?

**Errors and recovery**
- I have a red screen. (Fix the error, save, or Cmd+R.)
- My spinner never stops in the "Try it". (`reject` is not defined; see Section 2 Step 2.)

**Platform and simulator**
- Why does Platform.select change nothing on iOS? (It makes the choice explicit.)
- How do I see the home bar or Dynamic Island? (Pick a modern iPhone. Rotate to see side insets.)
- Can I test VoiceOver? (Not really in the simulator; Accessibility Inspector.)
- How do I swipe the app away? (App switcher; see Section 4 Step 4.)

## Could not verify

- `npm install`, `npm run ios`, Xcode menu names (Device Hub), device creation, and iOS version support for Expo Go.
- Everything on screen: Fast Refresh on save, red error screen, header, blank screen, shadows (Section 1 Step 4, Section 3 Step 2), the 500 ms delay then list, spinner, keyboard, search filter, Clear button, accessibility labels, press feedback, navigation to details and back, safe area at the bottom and the Dynamic Island, heart tap not opening the tile, the ♥ glyph rendering, favourites persisting after an app kill.
- VoiceOver in the simulator (expected: not usable; use Accessibility Inspector).
- Section 3 Step 3 home bar check (expected: a white band at the bottom, list clipped above it).
- Section 4 "swipe Expo Go away" (expected: app switcher in the simulator).

## Environment notes

- The copy was already prepared. I did not run `npm install` and did not start the app.
- `Glob` and `Grep` were not available in this session, so I used `Read` with paths taken from the guide and from the imports. I read every starter file I needed. No file was missing.
- `npx tsc --noEmit -p WORK/tsconfig.json`: clean at baseline and after every step. The only error was the deliberate "Try it" (reverted).
- `npx jest --rootDir WORK`: after Section 1: 21 failed, 6 passed. After Section 2: 9 failed, 18 passed. After Section 3: 7 failed, 20 passed. After Section 4: 27 passed, 8 suites.
- Every npm command prints `npm warn Unknown user config "always-auth"`. It is from the machine's npm config, not the repo. It could scare a newcomer.
- Timing: each section took only a few minutes of copying. Setup is where I would expect first-timers to lose the time.

## iOS simulator findings

- README names **Device Hub** under "XCode > Open Developer Tool"; the author says it is right for current Xcode. I could not confirm it. I did notice "XCode" is misspelled and "toolbar" should be "menu bar".
- The guide does not explain how to choose a simulator that Expo Go supports. There is no mention of the "requires a newer version of iOS" message.
- The guide says how to create a device (**+ > iPhone**) and start the app (`npm run ios`). It does not say how to boot a device, how to install a missing iOS runtime, or that Expo Go installs itself.
- Expo account: the README says simulators do not need one. That is clear.
- Screen-dependent steps with no simulator wording: Fast Refresh (Section 1 intro), shadows, `SafeAreaView` (Section 3 Step 3), the keyboard (Section 2 Step 3), the heart tap (Section 4 Step 3), and "swipe Expo Go away" (Section 4 Check it).
- Section 3 Step 3 home bar: add "choose an iPhone with no home button; look for the line at the bottom edge; compare with and without `SafeAreaView`; rotate with Cmd+Left/Right".
- VoiceOver: I expect it to be unusable in the simulator. Use Accessibility Inspector.
- Phone-, Android- or web-only content that would confuse me: "The quickest are a physical phone with Expo Go, or the web" (README intro); "iOS: Settings > Accessibility" for VoiceOver; the `elevation` line in the shadows; "run on a second platform and compare the shadows"; the QR-code and Wi-Fi hints at the top of the README.

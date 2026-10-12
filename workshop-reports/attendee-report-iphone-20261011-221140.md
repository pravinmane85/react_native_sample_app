# Workshop attendee report

**Date:** 2026-10-11
**Role:** Junior dev, React and TypeScript, no mobile experience (iPhone 17 + Expo Go path)
**Guide version:** f4a0892, working tree dirty (copy at `.workshop-attendee/iphone-20261011-221140`). I could not run git, so this is the hash from the session context.
**Overall:** I finished all steps in Sections 1 to 4. tsc was clean after every step and `npx jest` ends 27/27 after Section 4. The broken "Try it" from last time is fixed and compiles. Nothing on screen or on the phone could be checked. The iPhone README is better but still leaves gaps (Expo account, Expo Go version, VoiceOver, swipe-away gesture).

I did not open any `*.solution` file. I never needed to.

## Summary

| Section | Steps | Completed | Needed help | Unclear |
| --- | --- | --- | --- | --- |
| README setup (iPhone) | 7 | Read only, could not run | 0 | 4 |
| 1. Product card | 4 | 4 | 0 | 1 |
| 2. Show the products | 8 | 8 | 0 | 4 |
| 3. Navigation and platforms | 3 | 3 | 0 | 2 |
| 4. Storage | 4 plus "Check it" | 4 | 0 | 3 |

Test results (`npx jest --rootDir WORK`):

- After Section 1: 6 passed, 21 failed. Expected, the guide says so.
- After Section 2: 18 passed, 9 failed. The guide still does not say what to expect.
- After Section 3: I ran only `src/components/screens` and `src/App.test.tsx`: 9 passed, 3 failed (all three are favourites tests). I did not run the whole suite at this point.
- After Section 4: 27 passed, 0 failed (8 of 8 suites).

## Top issues

1. **Expo account and sign-in is still unclear (README iPhone steps 2 and 3).** "An Expo account is needed to sign in on a physical phone." Steps 2 and 3 both say "Sign into...". No reason for doing both, no word on what happens if you skip, and `npx expo login` asks for a password that Apple, Google or GitHub sign-in users may not have.
2. **No Expo Go / SDK version note, and Wi-Fi check comes after starting Metro.** `package.json` has `expo ~57.0.25`. A mismatched Expo Go gives an error the guide does not cover. Step 5 "Ensure you are on the same Wi-Fi" sits after step 4 "Start the Metro Bundler".
3. **VoiceOver (Section 2 Step 5) is still thin.** "turn on VoiceOver (iOS: Settings > Accessibility)" has no `VoiceOver` item name, no gestures, no triple-click shortcut. The new "find out how to turn them off first" line is good but pushes the work to the attendee.
4. **Missing "check it" moments.** Nothing after Section 3 Step 1 (tap a tile, details open, how to go back on iPhone). Nothing after Section 4 Step 2 (the details-screen heart now works). Section 4 Step 3 does not say hearts appear but do nothing until Step 4.
5. **"swipe Expo Go away" (Section 4 Check it) has no iPhone 17 gesture.** The rescan instruction was added, which fixes the reopen gap. The gesture itself (swipe up from the bottom edge and pause) is still missing.
6. **Each step prints the same code twice (diff, then "New code").** Section 2 Steps 2 to 5 repeat ~60 lines of unchanged styles. The doc is 2,783 lines. Tone: this reads as padded.
7. **Section 2 Step 2 "Try it" appears before the code it modifies.** It says to replace the body of `getProducts` and save, but the loading and error code comes in the diff below it. Reading in order, you try the error before the screen can show it.
8. **Smaller:** "Typing and Clear do nothing yet" (typing does show text); `Pressable` "meet it properly in Step 3" is never followed up; image needs internet; "iPhone 18" example text and README "iPhone 18 and iOS 27" next to an iPhone 17; `position: 'absolute'` unexplained.

## README: setup (iPhone path)

- **Result:** Read only. I cannot run `npm install`, `npx expo login`, `npm run start`, or scan anything.
- **Checks:** none possible.
- **Unclear or missing:**
  - Steps 2 and 3: "Sign into your account on the device." then "Sign into the expo cli." See top issue 1.
  - Step 4 `npm run start`: the shared section says "You can also try `npx expo start --tunnel`". Is it the same thing? With `npm run start` how do I add the flag? Not said.
  - Step 5 "Ensure you are on the same Wi-Fi network as your computer." Comes after starting Metro. Better before step 4.
  - Step 6 "Scan the QR code with the Camera app." Clear. No fallback if no banner appears, other than the `--tunnel` line far above.
  - Step 7 "If the phone asks to find devices on your local network, allow it." Good. It is listed after the scan, but the prompt appears during the first open, so the order reads oddly. No word on how to fix it if you tapped Don't Allow (Settings > Expo Go).
  - Expo Go version: still nothing about it matching the SDK.
  - "You need a current LTS version of Node.js" has no number. Still no "run these in a terminal in the repo folder".
  - The iOS simulator section says "iPhone 18 and iOS 27". Not my path, but the only device named, and mine is an iPhone 17.
- **Questions an attendee might ask:**
  - "Do I have to log in to Expo?" (Say whether required. If so, say how to get a password.)
  - "Why sign in on the phone and on the laptop?" (Explain, or drop one.)
  - "Which Expo Go version do I need?" (Must match the project SDK.)
  - "Where do I type these commands?" (A terminal in the project folder.)
  - "How do I use `--tunnel` with `npm run start`?" (`npm run start -- --tunnel`; say so.)
- **Suggested fix:** Merge steps 2 and 3, say whether login is needed, move the Wi-Fi line before Metro, add one line on Expo Go versions.

## Section 1: Build a product card

### Step 1: View

- **Result:** Done
- **What I did:** Replaced `ProductListScreen.tsx` with the "New code".
- **Checks:** tsc ok
- **Unclear or missing:** "Save after each step and the app reloads by itself." Still no name (Fast Refresh) and no fallback on the phone (shake, Reload).
- **Questions an attendee might ask:**
  - "Is View just a div?" (Roughly.)
  - "The app did not reload, now what?" (Shake the phone, tap Reload.)
- **Suggested fix:** One line on forcing a reload on iPhone.
- **Tone:** "A `View` is a box. Boxes go inside boxes. The screen stays blank. That is correct." Four short sentences for one idea. Reads slightly childlike. Try "A `View` is a container, like a `div`. The screen stays blank for now."

### Step 2: Text

- **Result:** Done
- **What I did:** Applied the code.
- **Checks:** tsc ok
- **Unclear or missing:** "a bare string inside a `View` crashes the app." Not shown. Fine to leave, since the claim is short.
- **Questions an attendee might ask:**
  - "Why can't text go straight in a View?" (No text nodes outside `Text`.)
  - "Why iPhone 18, my phone is a 17?" (Example text.)
- **Suggested fix:** Use a neutral product name.

### Step 3: Image

- **Result:** Done
- **What I did:** Applied the code.
- **Checks:** tsc ok
- **Unclear or missing:** The image is from `picsum.photos`. No hint that it needs internet. If the Wi-Fi blocks it, the image stays blank and looks like "no width and height".
- **Questions an attendee might ask:**
  - "Why two braces in `source={{ uri }}`?" (Outer is JSX, inner is an object.)
- **Suggested fix:** Say the image needs internet.

### Step 4: StyleSheet

- **Result:** Done
- **What I did:** Applied the code.
- **Checks:** tsc ok. After Section 1: jest 6 passed, 21 failed (expected).
- **Unclear or missing:** `container: { flex: 1 }` is not explained. `borderTopLeftRadius` on the image (no `overflow: hidden`) is not explained. On iPhone `elevation` does nothing, so "Set both" cannot be checked on my device.
- **Questions an attendee might ask:**
  - "Why is style an object?" (Not CSS.)
  - "Do px units exist?" (Plain numbers, density independent.)
- **Suggested fix:** One line on `container`.

## Section 2: Show the products

### Step 1: Data fetching

- **Result:** Done
- **What I did:** Edited `products.ts`, `productsApi.ts`, `ProductListScreen.tsx`.
- **Checks:** tsc ok
- **Unclear or missing:**
  - Fixed since last time: "Each folder has an `index.ts`, so you can import the folder name."
  - `data as Product[]`: still no reason for the cast.
  - The third diff shows ~60 style lines that do not change.
  - The `FlatList` paragraph is good, one tight explanation.
- **Questions an attendee might ask:**
  - "Why `FlatList` and not `ScrollView` + `map`?" (Only renders visible rows.)
  - "Why the cast?" (JSON is loosely typed.)
- **Suggested fix:** Show only the changed region.

### Step 2: Loading and errors

- **Result:** Done
- **What I did:** Applied the code. Then tested the "Try it": I replaced the body of `getProducts` with the given snippet. tsc was clean. I restored it.
- **Checks:** tsc ok, both for the step and for the "Try it" edit.
- **Unclear or missing:**
  - The "Try it" is placed above the code. See top issue 7.
  - After the "Try it" edit the `products` import in `productsApi.ts` is unused. Only matters if the attendee runs lint.
  - "`Pressable` is a tappable wrapper. You meet it properly in Step 3." Step 3 only says "A `Pressable` makes anything tappable". Not followed up.
  - Retry has no role, label or styling. It looks like plain text on iPhone.
  - Nested ternary is hard to read for a junior.
- **Questions an attendee might ask:**
  - "What does `.finally` do?" (Runs on success and on failure.)
  - "Why `_resolve`?" (Unused parameter; underscore is a convention.)
- **Suggested fix:** Move the "Try it" after the diff.

### Step 3: Interactivity

- **Result:** Done
- **What I did:** Applied the code.
- **Checks:** tsc ok
- **Unclear or missing:** "Typing and Clear do nothing yet." Typing does show text in the box, but the list does not filter. Slightly wrong.
- **Questions an attendee might ask:**
  - "Is `TextInput` an `input`?" (Yes, but `onChangeText`, not `onChange`.)
- **Suggested fix:** "Typing shows text but does not filter yet. Clear does nothing."

### Step 4: State

- **Result:** Done
- **What I did:** Applied the code.
- **Checks:** tsc ok
- **Unclear or missing:** Nothing about dismissing the iPhone keyboard. Nothing about auto-capitalisation or autocorrect on "pixel".
- **Could not verify:** typing "pixel" shrinks the list. I expect only matching names, such as Google Pixel.
- **Questions an attendee might ask:**
  - "How do I close the keyboard on iPhone?" (Return key, or tap outside. Not mentioned.)
  - "Why is `onChangeText` a string and not an event?" (RN passes the text.)
- **Suggested fix:** One line on keyboard dismissal.

### Step 5: Accessibility

- **Result:** Done in code. VoiceOver could not be verified.
- **What I did:** Applied the code.
- **Checks:** tsc ok
- **Unclear or missing:**
  - Improved: "Both read the screen aloud and change how you tap, so find out how to turn them off first." Good warning.
  - Still missing: the iPhone path "Settings > Accessibility > VoiceOver", the gestures, the triple-click side button.
  - "Screen readers need labels and roles." "Role" is not explained. Retry still has neither.
- **Questions an attendee might ask:**
  - "How do I turn VoiceOver off if I get stuck?" (Triple-click the side button, or say "Hey Siri, turn off VoiceOver".)
- **Suggested fix:** Three lines for iPhone.

### Step 6: SearchBar component

- **Result:** Done
- **What I did:** Replaced the whole of `SearchBar.tsx`.
- **Checks:** tsc ok
- **Unclear or missing:** Fixed since last time: "The Clear button now only shows when there is text." and "Nothing changes on screen until Step 8." The `index.ts` barrel is covered in Step 1. Named export vs default is still not mentioned.
- **Questions an attendee might ask:**
  - "Why `export function` and not `export default`?" (Named export, imported as `{ SearchBar }`.)
- **Suggested fix:** None needed beyond the above.

### Step 7: ProductTile component

- **Result:** Done
- **What I did:** Replaced the whole of `ProductTile.tsx`.
- **Checks:** tsc ok
- **Unclear or missing:** Fixed since last time: "`onPress`, `isFavorite` and `onToggleFavorite` are optional. Sections 3 and 4 use them." The unused props no longer look like a mistake. Still unexplained: `position: 'absolute'` for the badge, `product.badge ? ... : null`, the template string for `pricePeriod`.
- **Questions an attendee might ask:**
  - "What does `position: 'absolute'` do in RN?" (Positions inside the parent box.)
- **Suggested fix:** A two-line "new in this step" list, as Section 1 Step 4 has.

### Step 8: Use them in the list screen

- **Result:** Done
- **What I did:** Replaced the whole of `ProductListScreen.tsx`.
- **Checks:** tsc ok. After Section 2: jest 18 passed, 9 failed.
- **Unclear or missing:** Still no statement of which tests should pass here. `contentContainerStyle` is unexplained.
- **Could not verify:** list of tiles with search box and a 0.5 s spinner.
- **Questions an attendee might ask:**
  - "Why are tests still failing?" (Hearts and navigation come later.)
  - "What is `contentContainerStyle`?" (Style for the inside of the scroll area.)
- **Suggested fix:** "After this step 18 of 27 tests pass."

## Section 3: Navigation and platforms

### Step 1: Navigation

- **Result:** Done
- **What I did:** Added `ProductListScreenProps`, then updated `ProductListScreen.tsx`.
- **Checks:** tsc ok
- **Unclear or missing:**
  - Fixed since last time: the web back-button note, and "The heart on the details screen does not save yet. That comes in Section 4."
  - Still no "check it": tap a tile, see details, go back (header arrow or swipe from the left edge on iPhone).
  - "What is a stack?" is still not explained. `NativeStackScreenProps<..., 'ProductList'>` generics are not explained.
- **Could not verify:** tapping a tile opens the details screen.
- **Questions an attendee might ask:**
  - "Where does `navigation` come from?" (React Navigation passes it to each screen.)
  - "How do I go back on iPhone?" (Header arrow, or swipe from the left edge.)
- **Suggested fix:** Add a "Check it" line.

### Step 2: Platform specific styles

- **Result:** Done
- **What I did:** Edited `ProductTile.tsx`.
- **Checks:** tsc ok
- **Unclear or missing:** Fixed since last time: the web note ("neither case matches, so there is no shadow"). Still no "on your phone you should see no change".
- **Questions an attendee might ask:**
  - "Why change it if it already worked?" (Makes the choice explicit.)
- **Suggested fix:** Add "On iPhone nothing changes."

### Step 3: Safe area

- **Result:** Done
- **What I did:** Edited `ProductListScreen.tsx`.
- **Checks:** tsc ok. Partial jest run after Section 3 (screens and App only): 9 passed, 3 failed, all favourites.
- **Unclear or missing:**
  - Improved: "On a phone with a home bar, the bottom of the list no longer sits under it." plus a "Check it" line.
  - Still no cue to scroll to the last product.
  - Still unexplained why `SafeAreaView` comes from `react-native-safe-area-context`. The guide does say "The package is already installed".
  - "Optional: if you can, run on a second platform and compare the shadows." Not useful for an iPhone-only attendee.
  - Tone: "Does it sit clear of the home bar?" is fine. "if you can" is hedging.
- **Could not verify:** the bottom of the list clears the iPhone 17 home indicator.
- **Questions an attendee might ask:**
  - "What is the safe area?" (Parts of the screen the system draws over.)
  - "Why does the header not need it?" (The native stack header already insets.)
- **Suggested fix:** "Scroll to the last product."

## Section 4: Storage

### Step 1: Storage

- **Result:** Done
- **What I did:** Filled in `favoritesStorage.ts`.
- **Checks:** tsc ok
- **Unclear or missing:** Nothing blocking. "It is already installed" is good.
- **Questions an attendee might ask:**
  - "Why JSON?" (Storage keeps only strings.)
- **Suggested fix:** None.

### Step 2: API

- **Result:** Done
- **What I did:** Filled in `favoritesApi.ts`.
- **Checks:** tsc ok
- **Unclear or missing:** `getFavoriteIds` changes from `async function` to plain `function`, unmentioned. No "check it" for the details-screen heart.
- **Questions an attendee might ask:**
  - "Why did `async` go away?" (It already returns a Promise.)
  - "Can I test this now?" (Tap the heart on a details screen.)
- **Suggested fix:** Add a check.

### Step 3: The heart

- **Result:** Done
- **What I did:** Edited `ProductTile.tsx`.
- **Checks:** tsc ok
- **Unclear or missing:**
  - Fixed since last time: `hitSlop={8}` and one line on why. The target is now about 44pt.
  - Still does not say that hearts appear but do nothing until Step 4.
  - The glyphs `♥` and `♡` are text characters; fine when copied.
- **Could not verify:** the heart tap does not open the product. Heart colour and position on iPhone.
- **Questions an attendee might ask:**
  - "Why is the heart a `Text`?" (No icon library needed.)
- **Suggested fix:** "Hearts show, but tapping does nothing until Step 4."

### Step 4: Connect the list

- **Result:** Done
- **What I did:** Edited `ProductListScreen.tsx`.
- **Checks:** tsc ok. After Section 4: jest 27 of 27, 8 of 8 suites.
- **Unclear or missing:**
  - The three bullets on `useFocusEffect`, `useCallback` and `extraData` are tight and useful. A junior will still ask why `[]`.
  - "Check it" step 2: "Phone: swipe Expo Go away, open it, then scan the QR code again." The rescan is fixed. The iPhone 17 gesture is not given.
- **Could not verify:** a favourite survives a restart; the list updates on return from details.
- **Questions an attendee might ask:**
  - "Why `[]` in `useCallback`?" (Nothing it depends on, so it is created once.)
  - "How do I swipe an app away on an iPhone without a home button?" (Swipe up from the bottom edge and pause, then flick the card up.)
- **Suggested fix:** Add the gesture.

## Tone review (new flag)

Mostly peer to peer. The guide is short and avoids "simply" and "just". Points:

- **Too curt or childlike:** Section 1 Step 1 "A `View` is a box. Boxes go inside boxes. ... That is correct." The pattern "That is correct / That is expected / That is fine for this workshop / That is next" repeats and sounds like reassurance for a beginner. Working developers need it less.
- **Padded:** every step shows the diff and then the full file again in "New code". For Section 2 Steps 2 to 5 that is a lot of repeated code. A single toggle would do.
- **Assumes too much:** Section 3 Step 1 never says what a stack is, and shows `NativeStackScreenProps<RootStackParamList, 'ProductList'>` with no explanation. Section 2 Step 7 introduces `position: 'absolute'`, `badge ? ... : null` and the `pricePeriod` template string with no comment.
- **Good:** "Why two layers? Later the api could talk to a server without changing the screens." and "Section 1 already worked, because each platform ignores the other's styles." These are the right register.

## Questions to prepare for

**Setup**
- Do I need Xcode? (No, README now says so.) Do I need an Expo account or password? (Say.) Which Expo Go version? (Must match SDK.)
- It will not connect. (Same Wi-Fi, allow Local Network, `npm run start -- --tunnel`.)

**React Native basics**
- Is `View` a `div`? Why must text be in `Text`? Why two braces in `source={{ uri }}`? What is Fast Refresh and how do I reload on the phone?

**Lists and state**
- `FlatList` vs `ScrollView` + `map`? Why `keyExtractor` and `extraData`? How do I close the keyboard?

**Platform**
- Why `shadow*` and `elevation`? What does `Platform.select` return? What is a safe area?

**Navigation and storage**
- Where does `navigation` come from? What is a stack? How do I go back on iPhone? Why JSON in `AsyncStorage`? Why `useFocusEffect`?

## Could not verify

- Everything on screen or on the phone: the QR scan, Expo Go loading, Fast Refresh, the header, images from picsum.photos, shadows, the 0.5 s spinner, the error and Retry screen, typing "pixel", tapping a tile, back navigation, the bottom of the list vs the iPhone 17 home bar, the heart tap not opening the product, and the restart check.
- VoiceOver: whether labels are read, and whether the heart inside the tile is reachable.
- Whether the first tap after typing in search only dismisses the keyboard (`FlatList` has no `keyboardShouldPersistTaps`).
- `npm install`, `npx expo login`, `npm run start`: I cannot run them.

## Environment notes

- Only `Read`, `Write`, `Edit` and `Bash` (limited to the two allowed commands) were available. `Glob` and `Grep` were not in this session, so I worked from the paths the guide names.
- Every `npx` command prints `npm warn Unknown user config "always-auth"`. It comes from my machine's npm config. Harmless.
- `npx tsc --noEmit -p WORK/tsconfig.json`: clean after every step, including the "Try it" edit.
- `npx jest --rootDir WORK`: about 15 s for the full run when passing, about 60 s for the first run.

## iPhone-specific findings

- **Is Xcode needed?** Fixed. README now says "You don't need Xcode for this. Expo Go is enough."
- **Expo account and sign-in.** Still open. Steps 2 and 3 both say sign in, with no reason and no password help.
- **QR code.** Fixed. "Scan the QR code with the Camera app." The fallback if the scan fails is still only the `--tunnel` line in the shared section.
- **Local network prompt.** Fixed (step 7). It sits after the scan step, and there is no recovery if you tapped Don't Allow.
- **Expo Go version.** Still open.
- **Fast Refresh.** Still open: no reload fallback.
- **Shadows.** The `shadow*` explanation is good. Still no "what you should see on iPhone".
- **SafeAreaView and the home bar.** Improved with a "Check it". Needs "scroll to the last product".
- **VoiceOver.** Partly improved (the turn-off warning). Still no iPhone path or gestures. I still expect VoiceOver to merge the tile into one element and not reach the heart. Could not verify.
- **Keyboard and tap.** Still not covered. Could not verify.
- **Heart tap target.** Fixed with `hitSlop={8}`.
- **"Swipe Expo Go away".** Half fixed. Rescan is now in the text; the iPhone 17 gesture is not.
- **Android or web only text.** The Android section still gives the in-app scan button; the iPhone section now names the Camera app, so the two are consistent. The "second platform" line in Section 3 Step 3 is still not useful for iPhone-only.
- **Device naming.** Still open. "iPhone 18" in the Section 1 example and in the simulator README next to an iPhone 17.

## Compared with the previous run

Previous report: `attendee-report-iphone-20261011-204631.md` (guide c09f15e).

**Fixed**

- Section 2 Step 2 "Try it" now replaces the whole body with `(_resolve, reject)`. It compiles. (Was top issue 1.)
- README: Xcode not needed for Expo Go; QR scanned with the Camera app; Local Network prompt mentioned.
- `index.ts` barrel files explained in Section 2 Step 1.
- Section 2 Steps 6 and 7 now say nothing changes on screen until Step 8, and that `onPress`, `isFavorite`, `onToggleFavorite` are optional and used later.
- Section 2 Step 5 warns to learn how to turn off VoiceOver and TalkBack first.
- Section 3 Step 1: web back-button note, and "The heart ... does not save yet. That comes in Section 4."
- Section 3 Step 2: web case explained.
- Section 3 Step 3: has a "Check it" line about the home bar.
- Section 4 Step 3: `hitSlop` added and explained.
- Section 4 "Check it": says to rescan the QR code after swiping Expo Go away.

**Still open**

- Expo account and sign-in (two steps, no reason, password issue).
- Expo Go / SDK version mismatch; Wi-Fi line after Metro; `--tunnel` with `npm run start`.
- VoiceOver iPhone path and gestures; Retry has no role or label.
- Keyboard dismissal and the first-tap-after-typing risk.
- No "check it" after Section 3 Step 1 and Section 4 Step 2; Section 4 Step 3 does not say hearts do nothing until Step 4.
- iPhone 17 swipe-away gesture.
- Test expectations after Sections 2 and 3 not stated.
- Whole-file repeats in every step; the long doc (2,783 lines).
- "Typing and Clear do nothing yet" is slightly wrong; `Pressable` "properly in Step 3" never delivered; `position: 'absolute'`, `contentContainerStyle`, `data as Product[]` unexplained.
- Image needs internet; "iPhone 18" example and simulator note; "if you can, run on a second platform".
- Fast Refresh not named, no reload fallback.

**New**

- "Try it" in Section 2 Step 2 now sits above the code it builds on, so it reads out of order.
- After the "Try it" edit, `products` is an unused import in `productsApi.ts`.
- README step 7 (Local Network permission) is listed after the scan, but the prompt appears during the first open.
- Tone review added: curt "That is correct / expected / fine" pattern, duplicated code, and a few steps that assume too much (stack, `position: 'absolute'`).

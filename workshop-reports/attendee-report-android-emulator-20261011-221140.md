# Workshop attendee report

**Date:** 2026-10-11
**Role:** Junior dev, React and TypeScript, no mobile experience. Setup: Mac, Homebrew, Android Studio, Android emulator.
**Guide version:** branch `workshop-1`, HEAD f4a0892 (from the session's git snapshot; I could not run git). Working tree was dirty (`.claude/agents/workshop-attendee.md` and `.claude/skills/workshop-slides-prompt/SKILL.md` modified). Copy: `.workshop-attendee/android-emulator-20261011-221140`. This is the second run.
**Overall:** I finished all 4 sections. Every step applied cleanly, `tsc` passed after every step, and all 27 tests pass at the end. I did not open any `*.solution` file and did not need help. I could not run Android Studio, the emulator or Expo Go, so every on-screen check is "Could not verify". The guide is much shorter to follow than last time (diffs now show only what changes). The biggest remaining gaps are in the README emulator steps and the Android "close and reopen" step in Section 4.

## Summary

| Section | Steps | Completed | Needed help | Unclear |
| --- | --- | --- | --- | --- |
| Setup (README, Android emulator) | 9 | Read only (cannot run) | 0 | 5 |
| 1 Product card | 4 | 4 | 0 | 2 |
| 2 Show the products | 8 | 8 | 0 | 3 |
| 3 Navigation and platforms | 3 | 3 | 0 | 3 |
| 4 Storage | 4 | 4 | 0 | 3 |

Test results (`npx jest --rootDir WORK`): after Section 1: 6 pass, 21 fail. After Section 2: 18 pass, 9 fail. After Section 3: 20 pass, 7 fail. After Section 4: 27 pass, 0 fail. The guide only says "Many tests fail until later sections. That is expected." It does not say how many.

## Top issues

1. **Section 4 "Check it" is wrong for an emulator.** "Simulator or emulator: close Expo Go from the app switcher, then run `npm run android` again." The README says to leave the `npm run android` terminal running, so Metro is still on port 8081. Running the command again will ask to use another port or fail. "App switcher" is iOS wording; on Android it is Recents. Say: swipe Expo Go away in Recents, then press `a` in the running Metro terminal (or open the project from Expo Go's "Recently opened"). Pressing `r` also works as a quick test, because AsyncStorage survives a reload.
2. **README Android emulator steps still leave out key decisions.** Step 7 says "Pick a recent Pixel and a recent system image". It does not say which image (arm64 on Apple silicon, x86_64 on Intel; Google APIs or Google Play), and it does not say that Expo Go does not need Google Play. "If the emulator is slow, close other apps" is the only help. Nothing on hardware acceleration, disk space or RAM, or on waiting for the home screen before Step 9.
3. **No Android navigation help.** Section 3 Step 1 only says how to go back on the web ("Use the back button in the header"). It does not say the header back arrow and the Android back button work on the emulator. Nothing about reload (`r` in the Metro terminal), the dev menu (Cmd+M) or the red error screen.
4. **Tone is uneven.** Some steps talk down to React developers ("A `View` is a box. Boxes go inside boxes." and "State is data that changes. When it changes, the screen redraws."). Others assume too much ("`useCallback` gives it a stable function."). Shadows are explained twice in almost the same words (Section 1 Step 4 and Section 3 Step 2). Details under "Tone" below.
5. **Section 2 Steps 6 and 7 still hard-code colours** (`#E60000`, `#E0E0E0`, `white`). The starter files import `colors` from `src/theme/colors` and `App.tsx` uses it. The replacement files drop that import and some starter styles (`imageWrapper`, `swatchRow`, `overflow: 'hidden'`) without saying why. Step 8 also still replaces the whole file with no diff.
6. **README Android steps 3, 6 and 1 still have small traps.** "Settings > Languages & Frameworks > Android SDK" is under the **Android Studio** menu on a Mac (or **More Actions > SDK Manager** on the Welcome screen). "More Actions > Virtual Device Manager" exists only on the Welcome screen. The JDK install is not explained (does Expo Go need it?) and there is no way to check the `JAVA_HOME` path.
7. **The heart is a Unicode glyph, 28 by 28, and nothing says it does nothing until Section 4 Step 4.** On Android fonts `♥` may render as a colour emoji and ignore the red `color`. Could not verify.

## Setup: README "Android emulator" (read only)

I could not run any of this. This is my reading of it as an attendee.

### Steps 1 to 9

- **Result:** Read only. Could not verify any step.
- **Checks:** n/a
- **Unclear or missing:**
  - Step 1 "`brew install --cask zulu@17`": no reason is given. Expo Go with JS-only code probably does not need Java. I would ask "Do I need Java?". Step 4's `JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home` has no check ("`echo $JAVA_HOME`" or `ls` the folder).
  - Step 3 "**Settings > Languages & Frameworks > Android SDK**": on a Mac, Settings is under the **Android Studio** menu. A newcomer will search for it. No reason is given for "Platform 36" and whether it must match the system image in Step 7.
  - Step 6 "**More Actions > Virtual Device Manager > Create virtual device**": only on the Welcome screen. Once a project is open it is **Tools > Device Manager**.
  - Step 7 "Pick a recent Pixel and a recent system image (download it if asked)": see Top issue 2.
  - Step 8 "Click the **Play** button next to the device": does not say to wait until the Android home screen appears.
  - Step 9 "This installs Expo Go into the emulator for you. Leave the terminal running." Good, this is new. Still missing: run it from the repo folder, and what to do if it says "No Android connected device found" or `adb` is not found.
  - The shared setup still says "The quickest are a physical phone with Expo Go, or the web." An emulator user may wonder whether they chose the slow way.
  - The shared text says "If your phone can't connect... try `npx expo start --tunnel`". Not relevant to an emulator, and the emulator section has no troubleshooting of its own.
  - The phone sections say `npx expo login`. The shared line "An Expo account is needed to sign in on a physical phone. Simulators, emulators and the web don't need one." is clear for the emulator.
- **Questions an attendee might ask:**
  - Do I really need Java? (Probably not for Expo Go. Explain or remove.)
  - Which system image do I pick on an M-series Mac? (arm64-v8a, recent API level, Google APIs or Play.)
  - `adb: command not found`. (Open a new terminal or `source ~/.zshrc`; check the PATH lines.)
  - What is Metro? (The README explains Metro only in the phone sections.)
  - Does the emulator have internet? (Yes, through the host. A VPN or proxy may break it. Images load from `picsum.photos`.)
- **Suggested fix:** add a short "if it goes wrong" list; name the image; mention the Welcome-screen-only menu paths.

## Section 1: Build a product card

### Step 1: View

- **Result:** Done
- **What I did:** Replaced the file with the `View` version.
- **Checks:** tsc ok
- **Unclear or missing:** "A `View` is a box. Boxes go inside boxes. The screen stays blank. That is correct." The "stays blank" line is useful. "Boxes go inside boxes" is the kind of sentence that reads as talking down (see Tone).
- **Questions an attendee might ask:**
  - Is `View` a `div`? (Roughly, yes. A box that holds other things.)
  - Why `import { View } from 'react-native'`? (There is no DOM.)
- **Suggested fix:** "`View` is the basic container, like a `div`."

### Step 2: Text

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:** "All text goes inside `<Text>`. There is no HTML here, and a bare string inside a `View` crashes the app." Clear and useful. "iPhone 18" in the guide, but the data has "Apple iPhone 16 Pro".
- **Questions an attendee might ask:**
  - Why must text be inside `Text`? (No text nodes in native views.)
  - Why does it say iPhone 18 but the data says 16 Pro? (Placeholder text.)
- **Suggested fix:** none.

### Step 3: Image

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:** "`uri` is the address of the image. An image from the internet also needs a width and height, so you will not see it until Step 4." Clear. If the emulator has no internet (VPN or proxy), Step 4 shows no image and no error. One line would help.
- **Questions an attendee might ask:**
  - What do the double braces in `source={{ uri: ... }}` mean? (Outer: JSX. Inner: an object.)
  - Why no `src` and `alt`? (Different API; `accessibilityLabel` comes in Section 2.)
- **Suggested fix:** "If you see no image, check the emulator has internet."

### Step 4: StyleSheet

- **Result:** Done
- **Checks:** tsc ok. Tests: 6 pass, 21 fail (expected).
- **Unclear or missing:**
  - "`alignItems: 'center'` centres the items across the row." In a row it centres vertically. A web dev may read "across" as horizontal.
  - Not explained: `borderTopLeftRadius`, `padding`, `fontWeight`, and that numbers are not pixels.
  - "Move the `Image` above the `Text`" is stated, but the diff also adds a card `View` and a container `View`. The bullets do not mention them.
  - The diff still ends with a stray `+` line.
  - "iOS draws shadows with the `shadow*` styles... Android uses `elevation`. Set both." Section 3 Step 2 says the same again.
  - Expect a soft grey shadow on the emulator. Could not verify.
- **Questions an attendee might ask:**
  - Can I use `px`, `rem`? (No, numbers only, density-independent.)
  - Why `flex: 1` on the container? (Fills the screen; without it the container has no height.)
  - Is `StyleSheet.create` required? (No; it gives type checking.)
- **Suggested fix:** one sentence on the nested card `View` and units; reword "across the row".

## Section 2: Show the products

### Step 1: Data fetching

- **Result:** Done
- **What I did:** Applied the three parts in order. The `// TODO` comments in both starter files matched the diffs exactly.
- **Checks:** tsc ok
- **Unclear or missing:**
  - Fixed since last time: "The `Product` type is in `src/types/product.ts`. Each folder has an `index.ts`, so you can import the folder name."
  - "`as Product[]`" is not explained.
  - `useEffect(() => { getProducts().then(setProducts); }, [])` is fine for React developers, no explanation needed.
- **Questions an attendee might ask:**
  - Why `keyExtractor`? (Stable key per row.)
  - Why not `.map` in a `ScrollView`? (`FlatList` renders only visible rows.)
  - Why `as`? (JSON import is loosely typed.)
- **Suggested fix:** none needed. Optional: one clause on the cast.

### Step 2: Loading and errors

- **Result:** Done
- **Checks:** tsc ok. I also ran the "Try it": replaced the body of `getProducts` with the given snippet; `tsc` passed. (Fixed since last time.) I reverted it. I could not see the error screen.
- **Unclear or missing:**
  - "Try it" works for types. After the swap the `products` import is unused. Could not run lint.
  - Retry is plain unstyled text and `Pressable` gives no ripple on Android unless `android_ripple` is set, so tapping gives no visible feedback.
  - `ActivityIndicator` sits at the top of the screen, not centred. Not mentioned.
  - The nested ternary is hard to read.
- **Questions an attendee might ask:**
  - Why `.finally`? (Runs on success and failure.)
  - Why does Retry not look like a button? (No styles yet.)
- **Suggested fix:** tip that Retry is styled later, or give it a border.

### Step 3: Interactivity

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:** "Typing and Clear do nothing yet. That is next." Clear. Nothing about the keyboard on the emulator (soft keyboard or Mac keyboard) or about the keyboard covering the list. Could not verify.
- **Questions an attendee might ask:**
  - Is `TextInput` like `<input>`? (Yes; `onChangeText` gives a string.)
  - Where is `onClick`? (`onPress`.)
- **Suggested fix:** one line on typing in the emulator.

### Step 4: State

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:** "Type 'pixel' and the list shrinks." The data has "Google Pixel 9", so this works. Could not verify on screen. "State is data that changes. When it changes, the screen redraws." and "`useState` gives you the value and a function to change it. Never change the value directly." repeat React basics (see Tone).
- **Questions an attendee might ask:**
  - Why is the filter not in `useEffect`? (It is derived from state.)
- **Suggested fix:** cut the first paragraph to the one RN-specific point: `onChangeText` gives a string, not an event.

### Step 5: Accessibility

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:** Fixed since last time: "Skip this on a simulator, an emulator or the web." Good. Still: Retry has no role or label while Clear has. Inconsistent.
- **Questions an attendee might ask:**
  - Why `accessibilityRole="button"` on a `Pressable`? (Tells the screen reader it is a button.)
  - Can I check labels without a screen reader? (Not in the guide.)
- **Suggested fix:** none for the emulator. Optional: label Retry too.

### Step 6: SearchBar component

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:**
  - Fixed since last time: "This replaces the whole starter file, including its notes." and "Nothing changes on screen until Step 8."
  - The replacement hard-codes `#E0E0E0` and drops the starter's `colors` import and `container` style. Not mentioned.
  - This is the first step with no diff, only a collapsible file.
- **Questions an attendee might ask:**
  - Why does the starter import `colors` and the replacement does not?
  - Why named export here and default export for the screen?
- **Suggested fix:** use the theme `colors`, or say they are unused.

### Step 7: ProductTile component

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:** Fixed: "`onPress`, `isFavorite` and `onToggleFavorite` are optional. Sections 3 and 4 use them." `isFavorite` and `onToggleFavorite` are declared but not destructured. Colours hard-coded (Top issue 5).
- **Questions an attendee might ask:**
  - Why is the badge `position: 'absolute'`? (Overlays the image corner.)
  - Why a `Pressable` for the whole card? (So Section 3 can open details.)
- **Suggested fix:** as Step 6.

### Step 8: Use them in the list screen

- **Result:** Done
- **Checks:** tsc ok. Tests: 18 pass, 9 fail (all are navigation or favourites tests).
- **Unclear or missing:**
  - "Replace the whole file" with no diff. The attendee cannot see what was removed. The prose ("The inline search row, the card and their styles are gone.") helps.
  - Section intro says "You work in the list screen", but Steps 6 and 7 are in `common/`.
- **Questions an attendee might ask:**
  - Why `contentContainerStyle`, not `style`? (Pads the content inside the scroll area.)
- **Suggested fix:** show a diff here too.

## Section 3: Navigation and platforms

### Step 1: Navigation

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:**
  - "`src/App.tsx` already sets up a stack... Open `src/App.tsx` and find the two `Stack.Screen` lines." I found them (lines 23 and 24). Good.
  - "On the web, the address bar stays the same and the browser back button does not go back. Use the back button in the header." Covers the web only. Nothing for Android (header arrow, system back button or gesture).
  - "stack", "route" and "params" are used without explanation. `import type` is not explained.
- **Questions an attendee might ask:**
  - How do I go back on the emulator? (Header arrow or the Android back button.)
  - Why React Navigation, not Expo Router? (Not stated.)
- **Suggested fix:** one line on going back on Android.

### Step 2: Platform specific styles

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:**
  - Improved: "On the web neither case matches, so there is no shadow."
  - An Android-only attendee sees no change at all, and the guide does not say so. "Section 1 already worked" then "This makes the choice explicit" may read as pointless.
  - `...Platform.select({...})` spread is not explained.
  - Shadow explanation repeats Section 1 Step 4.
- **Questions an attendee might ask:**
  - Can I see the iOS branch on my emulator? (No.)
  - Why spread? (`select` returns a style object.)
- **Suggested fix:** "On Android you will see no change." Drop the repeated sentence.

### Step 3: Safe area

- **Result:** Done
- **Checks:** tsc ok. Tests: 20 pass, 7 fail (the Section 4 favourites tests).
- **Unclear or missing:**
  - "On a phone with a home bar, the bottom of the list no longer sits under it." On an emulator it depends on gesture or 3-button navigation. With 3 buttons you may see no change. Could not verify.
  - "Check it: look at the bottom of the list." No instruction to scroll to the end.
  - "Optional: if you can, run on a second platform and compare the shadows." Not possible on an emulator-only setup.
  - Now says the package is already installed. The guide does not say why it is not `SafeAreaView` from `react-native`.
- **Questions an attendee might ask:**
  - Why no visible change? (Navigation mode; try gesture navigation.)
- **Suggested fix:** "scroll to the last item"; one line on emulator navigation mode.

## Section 4: Storage

### Step 1: Storage

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:** "It only stores text, so we save the ids as JSON." Clear. `JSON.parse` could return a non-array; the `catch` handles only a parse error.
- **Questions an attendee might ask:**
  - Where does the data live? (App sandbox; wiped with the emulator or Expo Go data.)
  - Is it safe for secrets? (No.)
- **Suggested fix:** none.

### Step 2: API

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:** The diff drops `async` from `getFavoriteIds`. Not explained. "Why two layers?" is answered.
- **Questions an attendee might ask:**
  - Why is `getFavoriteIds` no longer `async`? (It returns the promise.)
- **Suggested fix:** none.

### Step 3: The heart

- **Result:** Done
- **Checks:** tsc ok
- **Unclear or missing:**
  - Fixed: "`hitSlop` makes the small button easier to tap."
  - Does not say the heart does nothing until Step 4.
  - Unicode `♥` and `♡` may render as emoji or boxes on some Android fonts. Could not verify.
  - "The inner `Pressable` takes the tap first, so the card's `onPress` does not run." Clear.
- **Questions an attendee might ask:**
  - Why not an icon library? (Keeps installs minimal.)
- **Suggested fix:** "The heart does nothing yet."

### Step 4: Connect the list

- **Result:** Done
- **Checks:** tsc ok. `npx jest --rootDir WORK`: 8 suites, 27 tests, all pass.
- **Unclear or missing:**
  - "`useCallback` gives it a stable function." Too short for someone who has not met `useFocusEffect`. Say that `useFocusEffect` re-runs when the callback changes.
  - Check it step 2, emulator line: see Top issue 1.
- **Questions an attendee might ask:**
  - Why `useFocusEffect` and not `useEffect`? (The list stays mounted when details open.)
  - How do I clear favourites to test again? (Not in the guide.)
- **Suggested fix:** emulator-specific close and reopen steps.

## Tone

Flagged for peer-to-peer reading. Real audience is working developers.

- **Talks down or states the obvious:**
  - Section 1 Step 1: "A `View` is a box. Boxes go inside boxes."
  - Section 1 intro: "`+` lines are added. `-` lines are removed." Developers read diffs.
  - Section 2 Step 4: "State is data that changes. When it changes, the screen redraws." and "Never change the value directly." The reader already knows React.
  - Section 2 Step 1: "`FlatList` is a scrolling list. `data` is the array." Fine for RN, but "the array" is padding.
  - Section 3 Step 3: "Does it sit clear of the home bar?" is a rhetorical question where an instruction would do.
- **Repeats:** shadows, `shadow*` versus `elevation`, in Section 1 Step 4 and Section 3 Step 2.
- **Assumes too much:**
  - Section 4 Step 4: "`useCallback` gives it a stable function."
  - Section 3 Step 1: stack, route, params, `import type`.
  - Section 2 Step 2: `.finally`, the nested ternary.
  - README Android Step 4: the exact `JAVA_HOME` path, with no check.
- **Good tone:** Section 1 Step 2 ("a bare string inside a `View` crashes the app") and Section 4 Step 3 ("The inner `Pressable` takes the tap first...") are short, concrete and useful.

## Questions to prepare for

**Setup and tooling**
- Do I need Java? (Probably not for Expo Go.)
- Which system image? (arm64, recent API, Google APIs or Play; Play not needed.)
- The emulator is slow or will not boot. (Acceleration, disk space, RAM, cold boot.)
- `adb: command not found`. (New terminal or `source`; check PATH.)
- How do I reload, open the dev menu, go back? (`r`, Cmd+M, header arrow or back button.)
- Why can't I run `npm run android` again in Section 4? (Metro is already running; press `a`.)

**React Native basics**
- Is `View` a `div`? Where is CSS? Why no units?
- Why `FlatList` and not `map`?
- Why `onChangeText` and `onPress`?
- What does `uri` mean? Why must an image have a width and height?

**Platform**
- How do I see iOS shadows from an Android emulator? (You cannot.)
- Why no visible change with `SafeAreaView`? (Emulator navigation mode.)
- Can I test TalkBack on an emulator? (The guide now says skip it.)

**Storage and navigation**
- Why `useFocusEffect`? Why two layers (storage and api)?
- How do I reset favourites?

## Could not verify

- All of the README Android setup: JDK, Android Studio, SDK settings, `~/.zshrc`, `adb version`, creating and starting the virtual device, `npm run android`.
- Expo Go installing and opening in the emulator, and Fast Refresh after saves.
- Every on-screen result: blank screen under the header, the card, shadows (`elevation`), spinner, Retry screen (including the "Try it" error), search filtering, details screen, back navigation.
- Keyboard behaviour on the emulator.
- `SafeAreaView` effect with the emulator navigation bar.
- Heart glyph rendering and tapping.
- Section 4 "Check it": persistence after closing and reopening Expo Go (Jest uses a mock).
- Image loading from `picsum.photos` on the emulator network.

## Environment notes

- I used only Read, Write and Edit inside the copy, plus `npx tsc --noEmit -p <WORK>/tsconfig.json` and `npx jest --rootDir <WORK>`. No command was denied. `Glob` and `Grep` were not available in my session; I found files from the paths named in the guide and the starter files.
- Every `npx` command printed `npm warn Unknown user config "always-auth"`. This comes from the machine's npm config, not the repo.
- I first passed a folder to `--rootDir` for a partial test run and got `Module ./jest.setup.ts in the setupFiles option was not found`. My mistake: the filter goes after the command (`npx jest --rootDir <WORK> ProductListScreen`). I then used that form.
- Jest takes 10 to 60 seconds. Failing runs print full render trees. `--silent` shortens it but still prints the trees.
- I applied each step with its "New code" block or the diff, step by step, running `tsc` after each. For Section 2 Step 5, Section 3 and Section 4 I applied the diff lines with small edits.
- I did not open any `*.solution` file.

## Compared with the previous run

Previous report: `attendee-report-android-emulator-20261011-204631.md`.

**Fixed**
- "Try it" in Section 2 Step 2 now works (`_resolve, reject` snippet); `tsc` passes. (Previous top issue 1.)
- `Product` type is now pointed out, with the note on `index.ts` folders. (Previous top issue 5.)
- Section 2 diffs now show only changed lines for Steps 1 to 5 and Section 3 and 4. Section 2 is easier to follow. (Previous top issue 6, mostly.)
- Section 2 Step 5 says to skip VoiceOver and TalkBack on a simulator, emulator or web. 
- README: "or run `source ~/.zshrc`" with "open a new terminal", and `~/.bash_profile` for bash. Android Studio now has a link. "Leave the terminal running" and "installs Expo Go into the emulator for you" are added.
- Steps 6 and 7 now say they replace the whole starter file and that nothing changes on screen until Step 8.
- `hitSlop` is now explained in Section 4 Step 3; web caveats added in Section 3 Steps 1 to 3.
- Section 4 "Check it" now has an emulator line (but see "New" below).

**Still open**
- README: system image advice, slow or failing emulator, waiting for boot, JDK reason, menu paths for Settings and Virtual Device Manager.
- How to go back, reload and open the dev menu on Android.
- Hard-coded colours in Steps 6 and 7; starter `colors` import and styles dropped without comment; Step 8 has no diff.
- No guidance on typing on the emulator (keyboard).
- Safe area on an emulator: still no mention of navigation mode, or of scrolling to the bottom.
- Platform.select step shows no change on Android and does not say so; spread not explained.
- Heart: not said to be inert until Step 4; glyph and 28 by 28 size.
- Retry has no styling or ripple, and no role or label.
- Section 1 Step 4: "across the row", stray `+` line, no units explanation.
- Jest output is very long. Test counts per section still not given.

**New**
- Section 4 "Check it": "run `npm run android` again" conflicts with the running Metro terminal; "app switcher" is iOS wording. (Top issue 1.)
- Tone problems (see the Tone section). The Tone flag did not exist last time.
- Shadow explanation repeated in Section 1 Step 4 and Section 3 Step 2.
- After the "Try it", the `products` import in `productsApi.ts` is unused.

## Android emulator findings

- **Setup order is sensible** (JDK, Android Studio, SDK, `~/.zshrc`, `adb version`, device, start, `npm run android`). Fewer gaps than before, but still incomplete: image choice, boot wait, running from the repo folder, troubleshooting.
- **Shell file:** now covered (`~/.zshrc` or `~/.bash_profile`; new terminal or `source`).
- **Slow or failing emulator:** only "close other apps". Nothing on hardware acceleration, disk space, RAM, cold boot.
- **System image and Google Play:** not covered. Play is not needed for Expo Go.
- **Expo account:** clear that it is not needed for the emulator.
- **Screen-dependent steps with an emulator equivalent given:** only Section 4 (but wrong, see Top issue 1) and Section 2 Step 5 (skip TalkBack). Not given: shadows (expect a soft grey shadow), `SafeAreaView` and navigation mode, keyboard, heart tap (mouse click works).
- **Android-specific gaps:** system back button, Cmd+M dev menu, `r` to reload, `android_ripple` on `Pressable`, 48dp touch target for the heart.
- **Still written for phone or iOS:** "app switcher" (Section 4), "On a phone with a home bar" (Section 3 Step 3), "the README's phone sections say to run `npx expo login`".

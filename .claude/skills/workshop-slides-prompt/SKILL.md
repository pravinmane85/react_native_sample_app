---
name: workshop-slides-prompt
description: Turn WORKSHOP.md into prompts to paste into PowerPoint Copilot. One slide per step, each introducing one new element, with short code snippets and engaging visuals. Use when the user asks for workshop slides, a slide deck prompt, or a Copilot prompt for PowerPoint.
---

# Workshop slides prompt

Read `WORKSHOP.md` and write prompts the user can paste into PowerPoint Copilot to build or update the slides. You write the prompts. You do not make the slides.

## Steps

1. Read `WORKSHOP.md` in full. Do not rely on memory of it. It changes often.
2. Find every section (`## Section N`) and every step (`### Step N`) in it.
3. Write **one prompt per section**. Short prompts paste more reliably into Copilot than one huge prompt.
4. Output each prompt in its own fenced code block, so the user can copy it. Put one line above each block saying which section it is.
5. After the last block, list anything you were unsure about, such as a step with no clear new element.

Do not change any file unless the user asks. Print the prompts in the reply.

## What each prompt contains

Start every prompt with this context, in your own words:

- The audience: working developers, often with web experience, who are new to React Native or Expo. Write for peers. Do not talk down to them.
- The session: a hands-on workshop. They build one app, step by step.
- The tone: direct, professional and concise. People will not read much text. No coaching phrases such as "easy", "simply", "don't worry" or "that is correct". Prefer web comparisons (div, localStorage, CSS) to cute analogies.
- The design: visually engaging. Use a bold title, one big idea per slide, icons or simple diagrams, generous white space, a consistent colour scheme, and a dark panel with a monospace font for code.
- Screenshots: leave a clearly marked placeholder where a screenshot of the app will go. Do not invent images of the app.

Then list the slides for that section, in order.

## Slide rules

Every step in the workshop is **its own slide**. Also include:

- A section title slide at the start of each section. It has the section name, the time, and a one-line goal.
- No closing slide per section, unless the section ends with a "try it" instruction. Then add a short "Try it" slide.

For each step slide, give Copilot:

1. **Title.** The step name. Example: "Step 2: Text".
2. **The new element.** One short description of the single thing this step introduces. Name it exactly, for example `View`, `Text`, `Image`, `StyleSheet`, `FlatList`, `useState`, `useEffect`, `Pressable`, `TextInput`, `Platform.select`, `SafeAreaView`, `AsyncStorage`. Say what it is and when to use it, in one or two precise sentences. Use the wording from `WORKSHOP.md` where you can. A web comparison is fine if `WORKSHOP.md` makes one. Do not add everyday analogies.
3. **Code snippet.** Only the lines that matter for this step, usually 3 to 12 lines. Copy them exactly from the step's code in `WORKSHOP.md`. Do not paste the whole file. Mark the new lines, for example with a highlight or a comment. Use a code block style. Never paraphrase code.
4. **Visual idea.** One suggestion. For example: nested boxes for `View`, a phone outline, an arrow between two screens, a before and after pair, a diagram of data flowing from api to screen.
5. **Speaker notes.** Two or three short sentences the presenter can say. Put this in the notes, not on the slide.

Keep slide text minimal: a title, the description, and the snippet. No paragraphs. No more than about 25 words of body text, not counting code.

## Picking the snippet

- Use the lines marked `+` in the step's diff.
- If a step has several pieces, use the one that shows the new element. Mention the others in the speaker notes.
- If a step creates a new file, use its key function or key lines, not the whole file.
- Steps that only repeat an earlier idea, such as a second use of `useState`, may share a slide only if the user asks. By default, still give them their own slide.

## Update mode

If the user asks to **update** an existing deck, do not rebuild it. Write update prompts instead.

1. Find what changed. Compare the current `WORKSHOP.md` with the earlier prompts in `SLIDES-PROMPTS.md` (if it exists) or with `git diff` of `WORKSHOP.md`. Do not run git commands that change anything.
2. Write one update prompt per section that changed. Begin each with: keep the current theme, layout and colours, and do not change slides that are not listed.
3. List only the slides that changed. For each, say what to change: the title, the description, the code, the notes. Say when one slide becomes several, or when a new slide is added. Give the exact new text and code.
4. Mention slide numbers using the numbering of the earlier prompts.

## Sections that are not code

If a section or step has no code, such as "run the app on iOS and Android", make a "Try it" slide. Show the instruction as a large prompt or question and no code.

## Output format

Use this shape for each section:

````
**Section 2: Show the products**

```
<the prompt to paste>
```
````

Inside the prompt, write the slides as a numbered list. Each item has the fields above, labelled. Example of one item:

```
Slide 3 - Title: "Step 2: Text"
New element: `Text`. Shows text on screen. All text in React Native must be inside a Text component.
Code (highlight the new lines):
  <View>
    <Text>iPhone 18</Text>
  </View>
Visual: a phone outline with a text label inside a box.
Notes: Explain that, unlike a web page, loose text is not allowed. It must sit in Text.
```

## Checks before you reply

- Every step in `WORKSHOP.md` has exactly one slide.
- Every step slide names one new element.
- Every code snippet is copied exactly from `WORKSHOP.md`, including any "Try it" code.
- The wording is peer-level. No coaching phrases and no analogies that `WORKSHOP.md` does not use.
- Each prompt is short enough to paste. If a section has more than about 8 slides, split its prompt in two and say so.
- No customer data, credentials or personal details appear in the prompts.

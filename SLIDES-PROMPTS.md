# Slide prompts for PowerPoint Copilot

Paste one prompt at a time into PowerPoint Copilot.

- **Part A** builds the deck from scratch. One prompt per section.
- **Part B** updates a deck built from Part A so it matches the current `WORKSHOP.md`. Run it after Part A.

If a prompt is too long, send one slide at a time.

---

# Part A: Build the deck

## Section 1: Build a product card

````
Create a PowerPoint deck section for a hands-on React Native workshop. Audience: developers who build apps but do not work in React Native or Expo day to day. Tone: friendly, plain, very short text; people will not read paragraphs. Design: visually engaging and consistent. Use bold large titles, one big idea per slide, simple icons and diagrams, generous white space, one accent colour, and a dark rounded panel with a monospace font for code. Keep body text under 25 words per slide, not counting code. Where a screenshot is noted, add a clearly marked placeholder. Do not invent app screenshots. Put speaker notes in the notes pane. Make exactly these 5 slides:

Slide 1 - Section title: "Section 1: Build a product card". Subtitle: "20 minutes". Goal line: "Build a product card with View, Text, Image and StyleSheet." Visual: a phone outline with an empty card shape. Add a placeholder for a screenshot of the finished card.

Slide 2 - Title: "Step 1: View"
New element: View. A box. It holds other things and lays them out. Boxes go inside boxes, like a set of nesting boxes.
Code (highlight the new lines):
  import { View } from 'react-native';
  return (
    <View></View>
  );
Visual: nested boxes drawn inside a phone outline.
Notes: View is the basic building block, like a div on the web. We start with one empty View.

Slide 3 - Title: "Step 2: Text"
New element: Text. Shows text on screen. All text must be inside a Text component.
Code (highlight the new lines):
  <View>
    <Text>iPhone 18</Text>
  </View>
Visual: a text label inside a box, with a warning icon on loose unboxed text.
Notes: Unlike a web page, loose text is not allowed in React Native. It must sit inside Text.

Slide 4 - Title: "Step 3: Image"
New element: Image. Shows a picture. An image from the internet needs a uri, and it has no size yet.
Code (highlight the new lines):
  <Image
    source={{ uri: 'https://picsum.photos/seed/iphone18/600/600' }}
  />
Visual: a picture icon with a web link arrow pointing to it.
Notes: Local images use require. Images from the internet use an object with a uri. Without a width and height it will not show, which Step 4 fixes.

Slide 5 - Title: "Step 4: StyleSheet"
New element: StyleSheet. Holds the look of your components: size, colour, layout. Styles are plain objects, not CSS.
Code (highlight the new lines):
  <View style={styles.card}>
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    elevation: 4,
  },
Visual: a before and after pair. Image above text in a column, then image left and text right in a row. Add a placeholder for a screenshot of the finished card.
Notes: The default layout direction is column. Row puts items side by side. iOS draws shadows with the shadow styles. Android uses elevation. Set both.
````

## Section 2: Show the products

````
Create a PowerPoint deck section for a hands-on React Native workshop. Audience: developers who build apps but do not work in React Native or Expo day to day. Tone: friendly, plain, very short text; people will not read paragraphs. Design: visually engaging and consistent. Use bold large titles, one big idea per slide, simple icons and diagrams, generous white space, one accent colour, and a dark rounded panel with a monospace font for code. Keep body text under 25 words per slide, not counting code. Where a screenshot is noted, add a clearly marked placeholder. Do not invent app screenshots. Put speaker notes in the notes pane. Make exactly these 7 slides:

Slide 1 - Section title: "Section 2: Show the products". Subtitle: "35 minutes". Goal line: "Fetch the products, show them in a list, then add search." Visual: data flowing from a cloud into a phone list.

Slide 2 - Title: "Step 1: Data fetching"
New element: FlatList. A scrolling list that draws many items from an array. We fill it with products from an api.
Code (highlight the new lines):
  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  <FlatList
    data={products}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      ...
    )}
  />
Visual: a cloud sending cards down an arrow into a scrolling list on a phone. Add a placeholder for a screenshot of the list.
Notes: The api waits two seconds, like a slow network call. useEffect runs the fetch once when the screen first appears.

Slide 3 - Title: "Step 2: Loading and errors"
New element: ActivityIndicator. A spinner shown while data loads. Real data takes time and can fail, so we also add a Retry button.
Code (highlight the new lines):
  {loading ? (
    <ActivityIndicator size="large" style={styles.loader} />
  ) : error ? (
    <View style={styles.message}>
      <Text>Could not load products.</Text>
      <Pressable style={styles.retryButton} onPress={loadProducts}>
        <Text style={styles.retryText}>Retry</Text>
      </Pressable>
    </View>
  ) : (
Visual: three phone outlines in a row labelled Loading, Error, Loaded.
Notes: Every screen that fetches data has these three states. Ask the room what happens if the network fails.

Slide 4 - Title: "Step 3: Interactivity"
New element: TextInput. A box the user types into. A Pressable makes anything tappable, such as a Clear button.
Code (highlight the new lines):
  <TextInput placeholder="Search phones & SIM cards" style={styles.input} />
  <Pressable style={styles.clearButton}>
    <Text>Clear</Text>
  </Pressable>
Visual: a search bar with a Clear button, and a finger tapping it.
Notes: Typing does nothing yet. The box is not connected to anything. That is the next step.

Slide 5 - Title: "Step 4: State"
New element: useState. State is data that changes. When it changes, the screen redraws.
Code (highlight the new lines):
  const [query, setQuery] = useState('');
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.trim().toLowerCase())
  );
Visual: a loop diagram. Type, state changes, screen redraws, list shrinks.
Notes: useState gives you the value and a function to change it. Never change the value directly. Try typing "pixel" and watch the list shrink.

Slide 6 - Title: "Step 5: Accessibility"
New element: accessibility props. Labels and roles that let screen readers describe your controls.
Code (highlight the new lines):
  accessibilityLabel="Search phones"
  accessibilityRole="button"
  accessibilityLabel="Clear search"
Visual: an ear or speech bubble icon next to a button.
Notes: Turn on VoiceOver on iOS or TalkBack on Android and swipe through the screen. Ask: does it make sense without looking?

Slide 7 - Title: "Step 6: Components"
New element: reusable components. We move the search and the card into their own files, SearchBar and ProductTile.
Code (highlight the new lines):
  <SearchBar value={query} onChangeText={setQuery} />
  renderItem={({ item }) => <ProductTile product={item} />}
Visual: a screen being split into labelled building blocks.
Notes: The screen now reads like a description of itself. The big diffs in the workshop notes show the full SearchBar and ProductTile files.
````

## Section 3: Navigation and platforms

````
Create a PowerPoint deck section for a hands-on React Native workshop. Audience: developers who build apps but do not work in React Native or Expo day to day. Tone: friendly, plain, very short text; people will not read paragraphs. Design: visually engaging and consistent. Use bold large titles, one big idea per slide, simple icons and diagrams, generous white space, one accent colour, and a dark rounded panel with a monospace font for code. Keep body text under 25 words per slide, not counting code. Where a screenshot is noted, add a clearly marked placeholder. Do not invent app screenshots. Put speaker notes in the notes pane. Make exactly these 5 slides:

Slide 1 - Section title: "Section 3: Navigation and platforms". Subtitle: "20 minutes". Goal line: "Tap a product to open its details, then make the app look right on iOS and Android." Visual: two phone screens joined by an arrow.

Slide 2 - Title: "Step 1: Navigation"
New element: navigation.navigate. Every screen gets a navigation prop. Calling navigate opens another screen and can send it data.
Code (highlight the new lines):
  <ProductTile
    product={item}
    onPress={() => navigation.navigate('ProductDetails', { id: item.id })}
  />
Visual: list screen and details screen side by side with an arrow carrying an id. Add a placeholder for a screenshot of the details screen.
Notes: App.tsx already sets up the stack and ProductDetailsScreen is already built. We only navigate to it. The header and back button come free.

Slide 3 - Title: "Step 2: Platform specific styles"
New element: Platform.select. Picks a value for the platform the app is running on.
Code (highlight the new lines):
  ...Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
    },
    android: { elevation: 4 },
  }),
Visual: an Apple logo and an Android logo each pointing to their own style block.
Notes: iOS draws shadows with the shadow styles. Android uses elevation. Platform.select picks the right one.

Slide 4 - Title: "Step 3: Safe area"
New element: SafeAreaView. A view that keeps content clear of notches and home bars.
Code (highlight the new lines):
  import { SafeAreaView } from 'react-native-safe-area-context';
  <SafeAreaView style={styles.container}>
  </SafeAreaView>
Visual: a phone outline with a notch and home bar, and the safe zone shaded in the middle.
Notes: Phones have areas the app should not draw over. SafeAreaView finds them for you.

Slide 5 - Title: "Try it"
Large question on the slide: "Run the app on iOS and on Android. What looks or behaves differently?"
Visual: two phones side by side with a question mark between them.
Notes: Give the room a few minutes, then take answers.
````

## Section 4: Storage

````
Create a PowerPoint deck section for a hands-on React Native workshop. Audience: developers who build apps but do not work in React Native or Expo day to day. Tone: friendly, plain, very short text; people will not read paragraphs. Design: visually engaging and consistent. Use bold large titles, one big idea per slide, simple icons and diagrams, generous white space, one accent colour, and a dark rounded panel with a monospace font for code. Keep body text under 25 words per slide, not counting code. Where a screenshot is noted, add a clearly marked placeholder. Do not invent app screenshots. Put speaker notes in the notes pane. Make exactly these 5 slides:

Slide 1 - Section title: "Section 4: Storage". Subtitle: "15 minutes". Goal line: "Keep favourites after the app closes." Visual: a heart saved into a phone memory chip.

Slide 2 - Title: "Step 1: Storage"
New element: AsyncStorage. Saves small pieces of data on the phone. It only stores text, so we save the ids as JSON.
Code (highlight the new lines):
  import AsyncStorage from '@react-native-async-storage/async-storage';
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
Visual: a list of ids turning into text and going into a drawer.
Notes: Missing or corrupt data returns an empty list. A failed save does not crash the app.

Slide 3 - Title: "Step 2: API"
New element: a favourites api. A small module that toggles a favourite on or off and saves the new list.
Code (highlight the new lines):
  const current = await loadFavoriteIds();
  const next = current.includes(productId)
    ? current.filter((id) => id !== productId)
    : [...current, productId];
  await saveFavoriteIds(next);
  return next;
Visual: a toggle switch with a list changing before and after.
Notes: Add the id if it is missing. Remove it if it is there. Then save.

Slide 4 - Title: "Step 3: The heart"
New element: a favourite button on the tile. A Pressable inside the tile that must not open the product when tapped.
Code (highlight the new lines):
  <Pressable
    style={styles.favoriteButton}
    onPress={onToggleFavorite}
    accessibilityRole="button"
  >
    <Text>{isFavorite ? '♥' : '♡'}</Text>
  </Pressable>
Visual: a product card with an empty heart and a filled heart. Add a placeholder for a screenshot.
Notes: A tap on the inner button is handled by it, so the outer card does not open. The label also says what the button will do.

Slide 5 - Title: "Step 4: Connect the list"
New element: useFocusEffect. Runs each time a screen comes into view, not just the first time.
Code (highlight the new lines):
  useFocusEffect(
    useCallback(() => {
      getFavoriteIds().then(setFavoriteIds);
    }, [])
  );
Visual: a loop. Open the product, tap the heart, go back, the list updates.
Notes: Final check: favourite a product, close the app, open it again. It should still be a favourite.
````

---

# Part B: Update the deck

Run these after Part A, or on an older deck, so it matches the current `WORKSHOP.md`.

## Section 1 update

````
Update the existing slides for "Section 1: Build a product card" in this React Native workshop deck. Keep the current theme, layout and colours. Do not change any slide that is not listed. Keep body text under 25 words per slide, not counting code, and put extra detail in the speaker notes.

Slide 1 (section title): change the subtitle from "20 minutes" to "15 minutes".

Slide 2 (Step 1: View): add one short line under the description: "The screen stays blank. That is correct." In the notes add: "Saving a file reloads the app by itself. This is called Fast Refresh."

Slide 3 (Step 2: Text): add one short line: "No HTML here. A bare string inside a View crashes the app." Keep the code as it is.

Slide 4 (Step 3: Image): replace the second sentence with: "uri is the address of the image. It also needs a width and height, so you will not see it until Step 4." Keep the code as it is.

Slide 5 (Step 4: StyleSheet): keep the code and the before and after visual. Add a small three-item callout beside the code:
  flex: 1 - fills the space available
  margin - space outside the card
  alignItems: 'center' - centres items across the row
In the notes add: "shadow* means shadowColor, shadowOffset, shadowOpacity and shadowRadius. Android ignores them and uses elevation."
````

## Section 2 update

````
Update the existing slides for "Section 2: Show the products" in this React Native workshop deck. Keep the current theme, layout and colours. Do not change any slide that is not listed. Keep body text under 25 words per slide, not counting code, and put extra detail in the speaker notes.

Slide 1 (section title): change the subtitle from "35 minutes" to "40 minutes".

Slide 2 (Step 1: Data fetching): keep the code. Add a three-item callout for FlatList:
  data - the array of items
  renderItem - draws one row
  keyExtractor - gives each row a unique key
Add to the notes: "FlatList only draws the rows on screen, so long lists stay fast. The api is a local fake that waits two seconds, like a slow network call."

Slide 3 (Step 2: Loading and errors): keep the code. Add to the notes: "Optional: make the api fail on purpose to see the Retry button. Pressable is a tappable wrapper. We meet it properly in the next step."

Slide 4 (Step 3: Interactivity): add one short line: "Typing and Clear do nothing yet. That is next."

Slide 5 (Step 4: State): add to the notes: "onChangeText gives you the new text, not an event."

Slide 6 (Step 5: Accessibility): add to the notes: "Optional: turn on VoiceOver (iOS: Settings > Accessibility) or TalkBack (Android: Settings > Accessibility). Both read the screen aloud."

Slide 7 (Step 6: Components): replace this one slide with THREE slides, in this order.

Slide 7a - Title: "Step 6: SearchBar component"
New element: SearchBar. The search box moves into its own file. The Clear button now only shows when there is text.
Code (highlight the new lines):
  {value ? (
    <Pressable
      style={styles.clearButton}
      onPress={() => onChangeText('')}
      accessibilityRole="button"
      accessibilityLabel="Clear search"
    >
      <Text>Clear</Text>
    </Pressable>
  ) : null}
Visual: a search bar with the Clear button appearing only after typing.
Notes: This replaces the whole starter file. Nothing changes on screen until Step 8.

Slide 7b - Title: "Step 7: ProductTile component"
New element: ProductTile. The card moves into its own file and takes a product as a prop.
Code (highlight the new lines):
  export function ProductTile({ product, onPress }: ProductTileProps) {
    return (
      <Pressable style={styles.card} onPress={onPress}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          accessibilityLabel={product.name}
        />
Visual: a card with arrows labelled image, make, name, price and badge pointing to product fields.
Notes: onPress, isFavorite and onToggleFavorite are optional. Sections 3 and 4 use them. Nothing changes on screen until Step 8.

Slide 7c - Title: "Step 8: Use them in the list screen"
New element: reusable components in use. The screen now reads like a description of itself.
Code (highlight the new lines):
  <SearchBar value={query} onChangeText={setQuery} />
  renderItem={({ item }) => <ProductTile product={item} />}
Visual: before and after. A long screen file shrinking to a short one built from two blocks.
Notes: The search row, the card and their styles are gone from this file.
````

## Section 3 update

````
Update the existing slides for "Section 3: Navigation and platforms" in this React Native workshop deck. Keep the current theme, layout and colours. Do not change any slide that is not listed. Keep body text under 25 words per slide, not counting code, and put extra detail in the speaker notes.

Slide 2 (Step 1: Navigation): keep the code. Add one line: "Open App.tsx and find the two Stack.Screen lines. That is where the screen names come from." In the notes add: "The heart on the details screen does not save yet. That comes in Section 4."

Slide 3 (Step 2: Platform specific styles): keep the code. In the notes add: "Section 1 already worked, because each platform ignores the other's styles. Platform.select makes the choice explicit."

Slide 4 (Step 3: Safe area): keep the code. Add one line: "On a phone with a home bar, the bottom of the list no longer sits under it."

Slide 5 (Try it): replace the question with: "Check it: look at the bottom of the list. Does it sit clear of the home bar?" Add a smaller optional line: "If you can, run on a second platform and compare the shadows."
````

## Section 4 update

````
Update the existing slides for "Section 4: Storage" in this React Native workshop deck. Keep the current theme, layout and colours. Do not change any slide that is not listed. Keep body text under 25 words per slide, not counting code, and put extra detail in the speaker notes.

Slide 2 (Step 1: Storage): add one short line: "AsyncStorage is already installed."

Slide 3 (Step 2: API): add to the notes: "Why two layers? Later the api could talk to a server without changing the screens."

Slide 4 (Step 3: The heart): keep the code. Add to the notes: "The inner Pressable takes the tap first, so the card's onPress does not run."

Slide 5 (Step 4: Connect the list): keep the code. Add a three-item callout:
  Focus - the screen is the one in view
  useFocusEffect - runs every time the screen is in focus, so the list updates when you come back
  extraData - tells FlatList to redraw when favourites change

Add a new final slide, Slide 6 - Title: "Check it"
Show four large numbered steps with icons:
  1. Favourite a product.
  2. Close the app (swipe Expo Go away), then open it again.
  3. It should still be a favourite.
  4. Optional: run npm test. Every test should pass.
Visual: a heart that stays filled after the app closes and reopens.
Notes: This is the finish line for the whole workshop.
````

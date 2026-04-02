# Fonts

## Use Google Fonts

```ts
doc.addFonts([
  {
    family: "Comfortaa",
    weights: [300, 400, 500, 600, 700],
  },
  {
    family: "Nunito",
    weights: [200, 400, 500, 600, 700],
  },
]);
```

## Template tip

Make sure your template sets the same font-family you add via `addFonts()`:

```html
<style>
  body {
    font-family: "Nunito", sans-serif;
  }
  h1,
  h2,
  h3 {
    font-family: "Comfortaa", sans-serif;
  }
</style>
```

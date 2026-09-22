# Lab 1.2 solution: Build a Static Profile Page

A finished profile page for the example delegate, Thandi Mokoena. Yours will have your own name and content; what matters is the structure and the layout.

## How to run

Double-click `index.html` to open it in Chrome or Edge. There is nothing to install.

## What changed in this lab

- `index.html` links `style.css` inside `head`, keeping the `meta charset` and viewport tags from the Emmet skeleton.
- The page uses semantic tags: a `header` containing a `nav`, a `main` with three `section`s (About, Skills, Goals, each with an `id` the nav links jump to), `article` elements for the skill cards, and a `footer`.
- `.nav` uses **Flexbox**: `justify-content: space-between` puts the name on the left and the links on the right, and `align-items: center` lines them up vertically. The link list (`.nav-links`) is a second Flexbox row.
- `.cards` uses **Grid**: `grid-template-columns: repeat(3, 1fr)` gives three equal columns, with a `gap` between them.
- `.btn:hover` changes the button's background and text colour.
- `main` is centred with `max-width: 900px; margin: 0 auto;`, and `* { box-sizing: border-box; }` sits at the top of the CSS.
- **Stretch challenge (marked in the CSS):** a media query switches the skills grid to one column below 600px wide.

## Check it in DevTools

1. Right-click the nav and choose **Inspect**. The `nav` element shows a **flex** badge; click it to see the flex overlay.
2. Inspect the skills cards: the `div class="cards"` shows a **grid** badge with three columns.
3. Hover over **Contact me** and watch the colours swap.
4. Toggle the device toolbar (Ctrl+Shift+M / Cmd+Shift+M) and make the page narrower than 600px: the cards stack into one column.

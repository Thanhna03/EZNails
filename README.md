# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm run dev
```

## Production

Build the application for production:

```bash
# pnpm
pnpm run build
```

Locally preview production build:

```bash
# pnpm
pnpm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

---

## Content Configuration Notes

### YAML Variable Naming Convention

Use `snake_case` for all variables inside YAML files. For example:

```yaml
my_variable: value
user_name: John Doe
server_address: 127.0.0.1
```

### Default Variables Per Section
Each content section should include the following default variables when applicable:

- `background_color`: Background color (e.g., '#FFFFFF')
- `background_image`: Background image path
- `title`: Main title (preferred)
- `sub_title`: Subtitle
- `sub_description`: Sub description
- `description`: Main description (preferred)
- `content`: Main content (preferred)

### Special Case: Multi-level List Structure (e.g. Service Page)

For pages that are structured as multi-level lists (e.g. a nail service page), name the YAML file according to the default structure and define sections as follows:

Filename: `service.yml`

Example structure:

```yaml
- _block_name: service/item
  status: true
  background_color: '#FFFFFF'
  background_image:
  is_reverse: false
  is_hot: true
  image: /images/service5.jpeg
  image_alt: Alt Img
  title: Manicure
  description_simple: This is this description
  list_service:
    - label: Full Set
      price: $50
      description_simple: This is this description
  second_cat:
    - title: REFILL
      description_simple:
      list_service:
        - label: PINK FILL IN
          price: $25
          description_simple:
      third_cat:
        - title: REFILL last
          description_simple:
          list_service:
            - label: PINK FILL IN LAST
              price: $45
              description_simple:
```

This structure allows for flexible, nested service categories with associated metadata.

# 📁 YAML Content Blocks Structure Guide

This README explains the structure and purpose of each YAML block used in the website content system. Each block is a reusable section for rendering a specific UI component.

---

## 🖼️ `gallery/hero` block (used for Gallery Page)

### 🔧 Structure:

```yaml
- _block_name: gallery/hero
  status: true                         # Toggle to show or hide the gallery block
  background_color: '#ffffff'         # Background color of the gallery section
  background_image:                   # Optional background image URL
  sort: 'Default'                     # Sorting method (e.g., Default, Priority, Created_at, etc.)
  gallery:
    - label: Nails Design             # Label for a gallery category/group
      is_hot: true                    # Whether this label is considered "hot" or featured
      item:
        - image: /images/galleryitem1.jpeg      # Image path
          image_alt: gallery item Image 1       # Alt text for SEO and accessibility
          is_hot: true                          # Highlight this image as hot
          priority: 0                           # Priority ranking (used for custom sorting)
          created_at: 1730344576000             # Timestamp in milliseconds
        - ... (other image items)
```

### 💡 Notes:

- `gallery` is an array of label groups, each with a `label` and multiple `item`s (images).
- Sorting logic can depend on `priority`, `created_at`, or a manual default order.
- Use `is_hot` to highlight certain labels or images in the UI.
- `created_at` is stored as a UNIX timestamp in milliseconds (e.g., `Date.now()`).
- Image URLs should be relative to the public path or assets directory.

### ✅ Example Usage:

This block can be used to render a masonry or grid gallery with tabs, where each label is a tab and each `item` under it is an image card.

---

## 💼 `service/item` block (used for Service Page)

### 🔧 Structure:

```yaml
- _block_name: service/item
  status: true                          # Toggle to show or hide this service block
  background_color: '#ffffff'           # Background color of the service section
  background_image:                     # Background image of the service section
  is_reverse: false                     # Whether this label is considered "hot" or featured
  is_hot: true                          # Highlight the section as featured
  image: /images/service5.jpeg          # Main image path for this service section
  image_alt: Alt Img                    # Image alt text for accessibility and SEO
  title: Manicure                       # Section title
  description_simple:                   # Simple description text
  list_service:
    - label: Full Set
      price: $50
      description_simple: This is this description
    - label: Full Set - Pink & White with Ombre
      price: $65
      description_simple: This is this description
    - label: Fill-in, Pink & White
      price: $45
      description_simple: This is this description
    - label: Fill-in, Pink only
      price: $30
      description_simple:
    - label: Fill-in, Pink only
      price: $30
      description_simple:
  second_cat:
    - title: REFILL
      description_simple:
      list_service:
        - label: PINK FILL IN
          price: $25
          description_simple:
        - label: PINK FILL IN
          price: $25
          description_simple:
        - label: PINK FILL IN
          price: $25
          description_simple:
      third_cat:
        - title: REFILL last
          description_simple:
          list_service:
            - label: PINK FILL IN LAST
              price: $45
              description_simple:
            - label: PINK FILL IN LAST
              price: $45
              description_simple:
            - label: PINK FILL IN LAST
              price: $45
              description_simple:
```

### 💡 Notes:

- `list_service` contains the first-level services displayed under the main section.
- `second_cat` is a nested array of sub-categories, each with their own `list_service`.
- `third_cat` is optional and nested deeper for complex service groupings.
- All `price` fields are strings (can be displayed directly or parsed numerically).
- Empty `description_simple` fields are allowed if content is optional or dynamic.
- Use consistent nesting for complex service menus with categories and subcategories.

### ✅ Example Usage:

This block is typically used in the Service page to display services grouped by category, with expandable or tabbed subsections for `REFILL`, `ADD-ON`, etc.

---

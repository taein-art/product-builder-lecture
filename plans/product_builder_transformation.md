# Plan: Transform Lotto Generator into Product Builder

## Objective
Transform the existing "Lotto Number Generator" into a "Product Builder" application where users can select a product, customize its attributes (color, size, text), and see a real-time preview.

## Proposed Strategy
1.  **Refactor `index.html`**: Update the title and the root custom element to `product-builder`.
2.  **Redesign `main.js`**:
    *   Replace `LottoGenerator` and `LottoBall` with a new `ProductBuilder` web component.
    *   Implement state management for the selected product and its customizations.
    *   Create sub-components for the `ProductSelector`, `CustomizationForm`, and `ProductPreview`.
3.  **Update `style.css`**: Provide global styles and layout for the new components.

## Proposed Components
### 1. `ProductBuilder` (Main Container)
*   Manages the overall state (selected product, color, size, custom text).
*   Orchestrates communication between sub-components.

### 2. `ProductSelector`
*   A list or dropdown to choose the product type (e.g., T-Shirt, Mug, Cap).

### 3. `CustomizationForm`
*   Input fields for:
    *   **Color Selection**: A set of predefined color buttons or a color picker.
    *   **Size Selection**: Buttons or a dropdown for sizes (S, M, L, XL).
    *   **Text Overlay**: A text input to add custom text to the product.

### 4. `ProductPreview`
*   A visual representation of the selected product that updates in real-time as customizations change.

## Verification Plan
1.  **Manual Testing**:
    *   Verify that selecting a different product updates the preview.
    *   Verify that changing the color, size, or text immediately reflects in the preview.
    *   Check for responsiveness on different screen sizes.
2.  **Component Tests**: If a testing framework is introduced, add unit tests for the `ProductBuilder`'s state management.

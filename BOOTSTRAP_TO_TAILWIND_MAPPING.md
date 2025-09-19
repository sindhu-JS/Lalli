# Bootstrap to Tailwind CSS Migration Guide

## Quick Reference: Bootstrap → Tailwind Class Mapping

### Layout & Grid System

| Bootstrap Class   | Tailwind Equivalent | Notes                      |
| ----------------- | ------------------- | -------------------------- |
| `container`       | `container mx-auto` | Auto margins for centering |
| `container-fluid` | `w-full`            | Full width container       |
| `row`             | `flex flex-wrap`    | Flexbox with wrap          |
| `col`             | `flex-1`            | Equal width columns        |
| `col-12`          | `w-full`            | Full width                 |
| `col-11`          | `w-11/12`           | 91.666667% width           |
| `col-10`          | `w-10/12`           | 83.333333% width           |
| `col-9`           | `w-9/12`            | 75% width                  |
| `col-8`           | `w-8/12`            | 66.666667% width           |
| `col-7`           | `w-7/12`            | 58.333333% width           |
| `col-6`           | `w-6/12` or `w-1/2` | 50% width                  |
| `col-5`           | `w-5/12`            | 41.666667% width           |
| `col-4`           | `w-4/12` or `w-1/3` | 33.333333% width           |
| `col-3`           | `w-3/12` or `w-1/4` | 25% width                  |
| `col-2`           | `w-2/12` or `w-1/6` | 16.666667% width           |
| `col-1`           | `w-1/12`            | 8.333333% width            |

### Responsive Grid Classes

| Bootstrap  | Tailwind | Breakpoint |
| ---------- | -------- | ---------- |
| `col-sm-*` | `sm:w-*` | ≥576px     |
| `col-md-*` | `md:w-*` | ≥768px     |
| `col-lg-*` | `lg:w-*` | ≥1024px    |
| `col-xl-*` | `xl:w-*` | ≥1280px    |

### Offset Classes

| Bootstrap     | Tailwind             | Notes              |
| ------------- | -------------------- | ------------------ |
| `offset-1`    | `ml-[8.333333%]`     | Custom margin left |
| `offset-2`    | `ml-[16.666667%]`    | Custom margin left |
| `offset-3`    | `ml-[25%]`           | Custom margin left |
| `offset-md-1` | `md:ml-[8.333333%]`  | Responsive offset  |
| `offset-md-2` | `md:ml-[16.666667%]` | Responsive offset  |

### Display Utilities

| Bootstrap        | Tailwind       | Notes                |
| ---------------- | -------------- | -------------------- |
| `d-none`         | `hidden`       | Display none         |
| `d-inline`       | `inline`       | Display inline       |
| `d-inline-block` | `inline-block` | Display inline-block |
| `d-block`        | `block`        | Display block        |
| `d-flex`         | `flex`         | Display flex         |
| `d-inline-flex`  | `inline-flex`  | Display inline-flex  |
| `d-grid`         | `grid`         | Display grid         |

### Flexbox Utilities

| Bootstrap                 | Tailwind          | Notes                 |
| ------------------------- | ----------------- | --------------------- |
| `justify-content-start`   | `justify-start`   | Justify flex-start    |
| `justify-content-end`     | `justify-end`     | Justify flex-end      |
| `justify-content-center`  | `justify-center`  | Justify center        |
| `justify-content-between` | `justify-between` | Justify space-between |
| `justify-content-around`  | `justify-around`  | Justify space-around  |
| `align-items-start`       | `items-start`     | Align flex-start      |
| `align-items-end`         | `items-end`       | Align flex-end        |
| `align-items-center`      | `items-center`    | Align center          |
| `align-items-stretch`     | `items-stretch`   | Align stretch         |
| `flex-row`                | `flex-row`        | Same class name       |
| `flex-column`             | `flex-col`        | Shortened             |
| `flex-wrap`               | `flex-wrap`       | Same class name       |

### Spacing (Margin & Padding)

| Bootstrap | Tailwind | Notes           |
| --------- | -------- | --------------- |
| `m-0`     | `m-0`    | Same class name |
| `m-1`     | `m-1`    | Same class name |
| `m-2`     | `m-2`    | Same class name |
| `m-3`     | `m-3`    | Same class name |
| `m-4`     | `m-4`    | Same class name |
| `m-5`     | `m-5`    | Same class name |
| `mt-3`    | `mt-3`   | Same class name |
| `mr-3`    | `mr-3`   | Same class name |
| `mb-3`    | `mb-3`   | Same class name |
| `ml-3`    | `ml-3`   | Same class name |
| `mx-3`    | `mx-3`   | Same class name |
| `my-3`    | `my-3`   | Same class name |
| `p-0`     | `p-0`    | Same class name |
| `p-1`     | `p-1`    | Same class name |
| `pt-3`    | `pt-3`   | Same class name |
| `px-3`    | `px-3`   | Same class name |
| `py-3`    | `py-3`   | Same class name |

### Text Utilities

| Bootstrap            | Tailwind       | Notes           |
| -------------------- | -------------- | --------------- |
| `text-left`          | `text-left`    | Same class name |
| `text-center`        | `text-center`  | Same class name |
| `text-right`         | `text-right`   | Same class name |
| `text-justify`       | `text-justify` | Same class name |
| `text-uppercase`     | `uppercase`    | Shortened       |
| `text-lowercase`     | `lowercase`    | Shortened       |
| `text-capitalize`    | `capitalize`   | Same class name |
| `font-weight-bold`   | `font-bold`    | Shortened       |
| `font-weight-normal` | `font-normal`  | Shortened       |
| `font-italic`        | `italic`       | Shortened       |

### Background Colors

| Bootstrap      | Tailwind        | Notes                    |
| -------------- | --------------- | ------------------------ |
| `bg-primary`   | `bg-blue-500`   | Use custom primary color |
| `bg-secondary` | `bg-gray-500`   | Use gray equivalent      |
| `bg-success`   | `bg-green-500`  | Use green equivalent     |
| `bg-danger`    | `bg-red-500`    | Use red equivalent       |
| `bg-warning`   | `bg-yellow-500` | Use yellow equivalent    |
| `bg-info`      | `bg-blue-400`   | Use lighter blue         |
| `bg-light`     | `bg-gray-100`   | Use light gray           |
| `bg-dark`      | `bg-gray-800`   | Use dark gray            |
| `bg-white`     | `bg-white`      | Same class name          |

### Text Colors

| Bootstrap        | Tailwind          | Notes                    |
| ---------------- | ----------------- | ------------------------ |
| `text-primary`   | `text-blue-500`   | Use custom primary color |
| `text-secondary` | `text-gray-500`   | Use gray equivalent      |
| `text-success`   | `text-green-500`  | Use green equivalent     |
| `text-danger`    | `text-red-500`    | Use red equivalent       |
| `text-warning`   | `text-yellow-500` | Use yellow equivalent    |
| `text-info`      | `text-blue-400`   | Use lighter blue         |
| `text-light`     | `text-gray-300`   | Use light gray           |
| `text-dark`      | `text-gray-800`   | Use dark gray            |
| `text-white`     | `text-white`      | Same class name          |
| `text-muted`     | `text-gray-500`   | Use muted gray           |

### Border Utilities

| Bootstrap        | Tailwind       | Notes            |
| ---------------- | -------------- | ---------------- |
| `border`         | `border`       | Same class name  |
| `border-0`       | `border-0`     | Same class name  |
| `border-top`     | `border-t`     | Shortened        |
| `border-right`   | `border-r`     | Shortened        |
| `border-bottom`  | `border-b`     | Shortened        |
| `border-left`    | `border-l`     | Shortened        |
| `rounded`        | `rounded`      | Same class name  |
| `rounded-sm`     | `rounded-sm`   | Same class name  |
| `rounded-lg`     | `rounded-lg`   | Same class name  |
| `rounded-circle` | `rounded-full` | Different naming |
| `rounded-pill`   | `rounded-full` | Different naming |

### Button Classes

| Bootstrap             | Tailwind                                                                  | Notes               |
| --------------------- | ------------------------------------------------------------------------- | ------------------- |
| `btn`                 | `px-4 py-2 rounded`                                                       | Base button styling |
| `btn-primary`         | `bg-blue-500 text-white`                                                  | Primary button      |
| `btn-secondary`       | `bg-gray-500 text-white`                                                  | Secondary button    |
| `btn-success`         | `bg-green-500 text-white`                                                 | Success button      |
| `btn-danger`          | `bg-red-500 text-white`                                                   | Danger button       |
| `btn-warning`         | `bg-yellow-500 text-black`                                                | Warning button      |
| `btn-info`            | `bg-blue-400 text-white`                                                  | Info button         |
| `btn-light`           | `bg-gray-100 text-black`                                                  | Light button        |
| `btn-dark`            | `bg-gray-800 text-white`                                                  | Dark button         |
| `btn-lg`              | `px-6 py-3 text-lg`                                                       | Large button        |
| `btn-sm`              | `px-3 py-1 text-sm`                                                       | Small button        |
| `btn-outline-primary` | `border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white` | Outlined button     |

### Shadow Utilities

| Bootstrap     | Tailwind      | Notes           |
| ------------- | ------------- | --------------- |
| `shadow-sm`   | `shadow-sm`   | Same class name |
| `shadow`      | `shadow`      | Same class name |
| `shadow-lg`   | `shadow-lg`   | Same class name |
| `shadow-none` | `shadow-none` | Same class name |

### Position Utilities

| Bootstrap           | Tailwind   | Notes     |
| ------------------- | ---------- | --------- |
| `position-static`   | `static`   | Shortened |
| `position-relative` | `relative` | Shortened |
| `position-absolute` | `absolute` | Shortened |
| `position-fixed`    | `fixed`    | Shortened |
| `position-sticky`   | `sticky`   | Shortened |

## Migration Strategy for Components

### Component-Specific Patterns

#### Navigation Component

```html
<!-- Before (Bootstrap) -->
<div class="container">
  <div class="row">
    <div class="col">
      <nav class="navbar">
        <!-- After (Tailwind) -->
        <div class="container mx-auto">
          <div class="flex flex-wrap">
            <div class="flex-1">
              <nav class="flex"></nav>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</div>
```

#### Service Cards

```html
<!-- Before (Bootstrap) -->
<div class="col-lg-4 col-md-6 service-container">
  <div class="service text-center">
    <div class="service-feature">
      <!-- After (Tailwind) -->
      <div class="w-full md:w-1/2 lg:w-1/3 service-container">
        <div class="service text-center">
          <div class="service-feature"></div>
        </div>
      </div>
    </div>
  </div>
</div>
```

#### Pricing Cards

```html
<!-- Before (Bootstrap) -->
<div class="col-lg-12 col-md-8 offset-md-2 offset-lg-0">
  <div class="price-container shadows text-center">
    <!-- After (Tailwind) -->
    <div class="w-full md:w-8/12 md:ml-[16.666667%] lg:w-full lg:ml-0">
      <div class="price-container shadow text-center"></div>
    </div>
  </div>
</div>
```

## Custom Utility Classes

Create these custom utilities in your Tailwind config for project-specific needs:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        '8.333333%': '8.333333%',
        '16.666667%': '16.666667%',
        '25%': '25%',
        '33.333333%': '33.333333%',
        '41.666667%': '41.666667%',
        '58.333333%': '58.333333%',
        '66.666667%': '66.666667%',
        '75%': '75%',
        '83.333333%': '83.333333%',
        '91.666667%': '91.666667%',
      },
    },
  },
};
```

## Migration Checklist

### Phase 1: Core Layout

- [ ] Replace `container` classes
- [ ] Replace `row` with `flex flex-wrap`
- [ ] Replace `col-*` classes with Tailwind width utilities
- [ ] Replace `offset-*` classes with margin utilities

### Phase 2: Components

- [ ] Replace button classes
- [ ] Replace card classes
- [ ] Replace form classes
- [ ] Replace navigation classes

### Phase 3: Utilities

- [ ] Replace spacing classes
- [ ] Replace text utilities
- [ ] Replace background/color classes
- [ ] Replace border/radius classes

### Phase 4: Responsive

- [ ] Convert responsive breakpoints
- [ ] Test mobile layouts
- [ ] Test tablet layouts
- [ ] Test desktop layouts

## Notes

1. **Preflight Disabled**: CSS reset is disabled to prevent conflicts during migration
2. **Progressive Migration**: Both Bootstrap and Tailwind can coexist temporarily
3. **Custom Classes**: Some complex Bootstrap components may need custom Tailwind utilities
4. **Testing**: Test each component after conversion to ensure visual parity

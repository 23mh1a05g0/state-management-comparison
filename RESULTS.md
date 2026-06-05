# React State Management Comparison

## Project Overview

This project compares three React state management approaches:

1. React Context API
2. Zustand
3. Redux Toolkit

The objective is to evaluate each solution based on:

* Performance
* Re-render behavior
* Bundle size
* Boilerplate code
* Developer experience
* Scalability
* Debugging capabilities

The application used for benchmarking is an E-Commerce Shopping Cart application.

---

# Benchmark Results

## Current Benchmark Comparison

| Metric                   | Context (Naive)   | Context (Split)   | Zustand   | Redux Toolkit |
| ------------------------ | ----------------- | ----------------- | --------- | ------------- |
| State Management Library | React Context API | React Context API | Zustand   | Pending       |
| Bundle Size Impact       | 0 KB              | 0 KB              | ~2 KB     | Pending       |
| Render Duration          | High              | ~24 ms            | ~5.7 ms   | Pending       |
| Highest Render Cost      | High              | 3.2 ms            | 1.5 ms    | Pending       |
| Re-render Optimization   | Poor              | Good              | Excellent | Pending       |
| Boilerplate              | Low               | Medium            | Low       | Pending       |
| DevTools Support         | Basic             | Basic             | Good      | Pending       |
| Scalability              | Low               | Medium            | High      | Pending       |
| Time Travel Debugging    | No                | No                | No        | Yes           |

---

# Context API Implementation

## Architecture

The optimized Context API implementation separates the application state into multiple providers:

```text
UserProvider
 └── UIProvider
      └── CartProvider
           └── App
```

### Contexts Created

* UserContext
* UIContext
* CartContext

### Benefits

* Better separation of concerns
* Reduced unnecessary re-renders
* Easier maintenance
* Improved scalability compared to a single global context

---

# Context API Profiling Results

## Test Scenario

Action Performed:

```text
Click "Add To Cart"
```

Repeated:

```text
10 Times
```

Profiler Used:

```text
React DevTools Profiler
```

Mode:

```text
Development Mode
```

---

## Flamegraph Analysis

Observed component tree:

```text
UserProvider
 └── UIProvider
      └── CartProvider
           └── App
                ├── Header
                ├── ProductListPage
                └── CartSidebar
```

### Findings

* CartProvider triggered updates.
* Header re-rendered because cart count changed.
* CartSidebar re-rendered because cart data changed.
* ProductCard components rendered efficiently.
* User and UI state remained isolated.

### Result

Context splitting successfully reduced unnecessary updates compared to a single global context.

---

## Ranked Chart Analysis

### Highest Rendering Components

| Component   | Render Duration |
| ----------- | --------------- |
| CartSidebar | 3.2 ms          |
| CartItem    | 2.1 ms          |
| Header      | 1.1 ms          |
| ProductCard | 0.8 - 0.9 ms    |

### Interpretation

CartSidebar had the highest rendering cost because it renders all cart items and updates whenever cart state changes.

CartItem components contribute additional rendering cost as the cart grows.

Header updates when cart count changes.

ProductCard rendering cost remained relatively low.

---

## Update Cause Analysis

React DevTools reported:

```text
What caused this update?

CartProvider
```

### Interpretation

The update originated from:

```javascript
dispatch({
  type: "ADD_TO_CART"
});
```

inside CartContext.

This confirms:

* UserContext did not trigger updates.
* UIContext did not trigger updates.
* CartContext was solely responsible for the state change.

---

## Context API Advantages

✅ Built into React

✅ No additional dependency

✅ Easy to learn

✅ Suitable for small applications

✅ Lightweight bundle impact

---

## Context API Limitations

```text
All consumers of CartContext
still re-render when CartContext changes.
```

Even after context splitting, every consumer of the changed context receives updates.

---

# Zustand Implementation

## Architecture

Unlike Context API, Zustand uses a centralized store with selector-based subscriptions.

```text
App
 ├── Header
 ├── ProductListPage
 └── CartSidebar
      └── CartItem
```

### Store Structure

```javascript
{
  cart: {
    items: [],
    isOpen: true
  },

  user: {
    name: "Vali",
    isLoggedIn: true
  },

  ui: {
    theme: "light",
    notification: null
  }
}
```

---

# Zustand Profiling Results

## Test Scenario

Action Performed:

```text
Click "Add To Cart"
```

Repeated:

```text
10 Times
```

Profiler Used:

```text
React DevTools Profiler
```

Mode:

```text
Development Mode
```

---

## Flamegraph Analysis

### Observed Component Tree

```text
App
├── Header
├── ProductListPage
└── CartSidebar
     └── CartItem
```

### Findings

Observed updates:

* Header re-rendered
* CartSidebar re-rendered
* CartItem re-rendered

Observed non-updates:

* ProductListPage remained stable
* ProductCard components remained stable

This behavior demonstrates Zustand's selector-based subscription mechanism.

---

## Ranked Chart Analysis

### Highest Rendering Components

| Component   | Render Duration |
| ----------- | --------------- |
| CartSidebar | 1.5 ms          |
| Header      | 0.9 ms          |
| CartItem    | 0.6 - 0.8 ms    |

### Interpretation

CartSidebar remains the most expensive component because it renders the entire cart list.

However, rendering costs are significantly lower than the Context API implementation.

---

## Update Cause Analysis

React DevTools reported:

```text
What caused this update?

Header
CartSidebar
```

### Interpretation

Only components subscribed to:

```javascript
state.cart.items
```

received updates.

Components not subscribed to cart state remained untouched.

This is the primary performance advantage of Zustand.

---

## Render Counter Findings

Observed render counts:

```text
Header        → 10
ProductList   → 2
CartSidebar   → 10
CartItem      → Dynamic
```

### Key Observation

```text
ProductListPage
Render Count = 2
```

even after multiple cart updates.

This confirms that Zustand prevented unnecessary re-renders.

---

## Zustand Advantages

✅ Minimal boilerplate

✅ Selector-based subscriptions

✅ Better render isolation

✅ Excellent performance

✅ Small bundle size

✅ No provider nesting

✅ Easy learning curve

---

## Zustand Limitations

* No built-in time travel debugging
* Requires external dependency
* Less structured than Redux Toolkit for large enterprise applications

---

# Performance Comparison

## Context API vs Zustand

| Metric                 | Context API (Split) | Zustand      |
| ---------------------- | ------------------- | ------------ |
| Render Duration        | ~24 ms              | ~5.7 ms      |
| Highest Render Cost    | 3.2 ms              | 1.5 ms       |
| Re-render Optimization | Good                | Excellent    |
| Boilerplate            | Medium              | Low          |
| Provider Nesting       | Required            | Not Required |
| Selector Support       | No                  | Yes          |

### Result

Zustand reduced rendering duration by approximately 76% compared to the optimized Context API implementation.

---

# Screenshot Artifacts

## Profiling Folder

```text
profiling/
├── context-optimized-flamegraph.png
├── context-optimized-ranked.png
├── context-optimized-update-analysis.png
├── zustand-flamegraph.png
├── zustand-ranked.png
└── zustand-update-analysis.png
```

---

# Current Conclusion

The optimized Context API implementation improved performance significantly over the naive approach.

However, Zustand delivered the best results so far by ensuring that only subscribed components re-rendered when state changed.

Based on current profiling results:

1. Zustand (Best Performance)
2. Context API (Split Contexts)
3. Context API (Single Context)

Redux Toolkit implementation and benchmarking will be completed in the next phase of the project.

---

# Upcoming Work

* Redux Toolkit Implementation
* Redux Toolkit Profiling
* Bundle Size Analysis
* Final Benchmark Comparison
* Docker Deployment
* Final Project Documentation

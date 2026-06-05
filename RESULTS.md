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

# Final Benchmark Results

| Metric                   | Context (Naive)   | Context (Split)   | Zustand   | Redux Toolkit |
| ------------------------ | ----------------- | ----------------- | --------- | ------------- |
| State Management Library | React Context API | React Context API | Zustand   | Redux Toolkit |
| Bundle Size Impact       | 0 KB              | 0 KB              | ~2 KB     | ~12 KB        |
| Render Duration          | High              | ~24 ms            | ~5.7 ms   | ~6.5 ms       |
| Highest Render Cost      | High              | 3.2 ms            | 1.5 ms    | 1.8 ms        |
| Re-render Optimization   | Poor              | Good              | Excellent | Excellent     |
| Boilerplate              | Low               | Medium            | Low       | High          |
| DevTools Support         | Basic             | Basic             | Good      | Excellent     |
| Scalability              | Low               | Medium            | High      | Very High     |
| Time Travel Debugging    | No                | No                | No        | Yes           |
| Learning Curve           | Easy              | Easy              | Easy      | Medium        |
| Enterprise Readiness     | Low               | Medium            | High      | Very High     |

---

# Context API Implementation

## Architecture

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

* Action: Add To Cart
* Repeated: 10 Times
* Tool: React DevTools Profiler
* Environment: Development Mode

### Flamegraph Analysis

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

### Ranked Chart Analysis

| Component   | Render Duration |
| ----------- | --------------- |
| CartSidebar | 3.2 ms          |
| CartItem    | 2.1 ms          |
| Header      | 1.1 ms          |
| ProductCard | 0.8 - 0.9 ms    |

### Update Cause Analysis

```text
What caused this update?

CartProvider
```

### Advantages

✅ Built into React

✅ No external dependency

✅ Easy to learn

✅ Lightweight bundle impact

### Limitations

```text
All consumers of CartContext
still re-render when CartContext changes.
```

### Conclusion

Context splitting significantly improved performance compared to a single global context, but all consumers of a changed context still receive updates.

---

# Zustand Implementation

## Architecture

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

* Action: Add To Cart
* Repeated: 10 Times
* Tool: React DevTools Profiler
* Environment: Development Mode

### Findings

Observed updates:

* Header re-rendered
* CartSidebar re-rendered
* CartItem re-rendered

Observed non-updates:

* ProductListPage remained stable
* ProductCard components remained stable

### Ranked Chart Analysis

| Component   | Render Duration |
| ----------- | --------------- |
| CartSidebar | 1.5 ms          |
| Header      | 0.9 ms          |
| CartItem    | 0.6 - 0.8 ms    |

### Update Cause Analysis

```text
What caused this update?

Header
CartSidebar
```

### Render Counter Findings

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

### Advantages

✅ Minimal boilerplate

✅ Selector-based subscriptions

✅ Better render isolation

✅ Excellent performance

✅ Small bundle size

✅ No provider nesting

### Limitations

* No built-in time travel debugging
* Requires external dependency
* Less structured than Redux Toolkit

### Conclusion

Zustand delivered the best rendering performance in this project. Selector-based subscriptions prevented unnecessary component updates and significantly reduced render duration.

---

# Redux Toolkit Implementation

## Architecture

```text
ReactRedux.Provider
 └── App
      ├── Header
      ├── ProductListPage
      └── CartSidebar
           └── CartItem
```

### Redux Structure

```text
Store
├── cartSlice
├── userSlice
└── uiSlice
```

### Slices Created

* cartSlice
* userSlice
* uiSlice

---

# Redux Toolkit Profiling Results

## Test Scenario

* Action: Add To Cart
* Repeated: 10 Times
* Tool: React DevTools Profiler
* Environment: Development Mode

### Findings

Observed updates:

* Header re-rendered
* CartSidebar re-rendered
* CartItem re-rendered

Observed non-updates:

* ProductListPage remained stable
* ProductCard components remained stable

### Ranked Chart Analysis

| Component   | Render Duration |
| ----------- | --------------- |
| CartSidebar | 1.8 ms          |
| Header      | 1.0 ms          |
| CartItem    | 0.8 - 0.9 ms    |

### Update Cause Analysis

```text
What caused this update?

Header
CartSidebar
```

### Render Counter Findings

```text
Header        → 10
ProductList   → 2
CartSidebar   → 10
ProductCard   → 2
CartItem      → Dynamic
```

### Advantages

✅ Excellent performance

✅ Predictable state management

✅ Centralized architecture

✅ Redux DevTools support

✅ Time travel debugging

✅ Enterprise scalability

### Limitations

* More boilerplate than Zustand
* Slightly steeper learning curve
* Requires understanding reducers and slices

### Conclusion

Redux Toolkit delivered performance very close to Zustand while providing stronger tooling, debugging, and scalability for large applications.

---

# Performance Comparison

## Context API vs Zustand vs Redux Toolkit

| Metric                 | Context API (Split) | Zustand      | Redux Toolkit |
| ---------------------- | ------------------- | ------------ | ------------- |
| Render Duration        | ~24 ms              | ~5.7 ms      | ~6.5 ms       |
| Highest Render Cost    | 3.2 ms              | 1.5 ms       | 1.8 ms        |
| Re-render Optimization | Good                | Excellent    | Excellent     |
| Boilerplate            | Medium              | Low          | High          |
| Provider Nesting       | Required            | Not Required | Required      |
| Selector Support       | No                  | Yes          | Yes           |

### Result

* Zustand reduced rendering duration by approximately 76% compared to Context API.
* Redux Toolkit delivered nearly identical rendering performance to Zustand.
* Both Zustand and Redux Toolkit significantly outperformed Context API.

---

# Screenshot Artifacts

```text
profiling/
├── context-optimized-flamegraph.png
├── context-optimized-ranked.png
├── context-optimized-update-analysis.png
├── zustand-flamegraph.png
├── zustand-ranked.png
├── zustand-update-analysis.png
├── redux-flamegraph.png
├── redux-ranked.png
└── redux-update-analysis.png
```

---

# Final Ranking

| Rank | Solution            | Reason                                         |
| ---- | ------------------- | ---------------------------------------------- |
| 🥇 1 | Zustand             | Best performance with minimal code             |
| 🥈 2 | Redux Toolkit       | Similar performance with better tooling        |
| 🥉 3 | Context API (Split) | Improved but still causes context-wide updates |
| 4    | Context API (Naive) | Highest unnecessary re-renders                 |

---

# Final Conclusion

This project demonstrates how state management choices directly affect application performance and scalability.

Key findings:

* Context API is suitable for small applications but becomes less efficient as shared state grows.
* Zustand provides the best balance between simplicity and performance.
* Redux Toolkit offers enterprise-grade architecture, tooling, and debugging while maintaining excellent performance.
* Selector-based subscriptions used by Zustand and Redux Toolkit significantly reduce unnecessary re-renders compared to Context API.

Based on the benchmark results, Zustand is the preferred choice for most modern React applications, while Redux Toolkit remains the strongest option for large-scale enterprise projects requiring advanced debugging and standardized architecture.

---

# Next Steps

* Bundle Size Analysis
* Dockerization
* GitHub Repository Documentation
* Final README Preparation
* Project Submission

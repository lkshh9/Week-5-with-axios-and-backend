# Week 5.3 | Extra class on axios, object destructuring, grids, and complete assignment - 13/07/23


# Course Component

## Key Concepts and Learnings

### 1. React Function Component
- **Function Component:** The `Course` component is a function component in React. It is a simple JavaScript function that returns JSX to render UI elements.

### 2. State Management with `useState`
- **useState Hook:** This hook is used to manage state in a functional component. In this example, `useState` initializes the `course` state to `null` and provides a way to update it with `setCourse`.

### 3. Fetching Data with `useEffect`
- **useEffect Hook:** The `useEffect` hook is used to perform side effects in functional components, such as fetching data from an API. The hook runs the provided function after the initial render and whenever the dependencies change.
- **Dependency Array:** The dependency array `[courseId]` ensures that the `useEffect` runs the effect only when the `courseId` changes. This is important for fetching the correct course data when the `courseId` in the URL changes.

### 4. Asynchronous Operations in `useEffect`
- **Defining and Calling an Async Function:** Inside the `useEffect` hook, an `async` function `fetchCourse` is defined and then called. This approach ensures that asynchronous operations are handled correctly.
- **Async/Await:** The `async` function uses `await` to pause the execution until the `axios` GET request completes, providing a clean and readable way to handle asynchronous operations.

### 5. Making API Requests with Axios
- **Axios Library:** Axios is used to make HTTP requests. In this example, an authenticated GET request is sent to fetch course data.
- **Authorization Header:** The `Authorization` header includes a token retrieved from `localStorage`, ensuring the request is authenticated.

### 6. Conditional Rendering
- **Loading State:** The component renders a loading message if the `course` state is `null`, indicating that the data is being fetched.
- **Rendering Fetched Data:** Once the course data is fetched and the `course` state is updated, the component renders the course details using child components (`GrayTopper`, `UpdateCard`, `CourseCard`).

<br />
<br />

This README format provides a structured overview of the key concepts and learnings, along with the complete example code for the `Course` component.


# Project Repository Update: Default Branch Change

## Overview
This repository has been updated to change the default branch from `master` to `main` on GitHub. This change aligns with current best practices in the tech community.

## Changes Made
**Branch Renaming and Default Update:**
- The `master` branch has been renamed to `main`.
- `main` has been set as the new default branch on GitHub.

**Local Repository Update:**
- Local branches and workflows have been adjusted to track the new default branch (`main`).

## How to Update Your Local Copy
If you have an existing local copy of this repository, follow these steps to update it:

```bash
# Ensure you are on the master branch (if not already)
git checkout master

# Fetch the latest changes from the remote repository
git pull origin master

# Create and switch to a new main branch
git checkout -b main

# Push the new main branch to the remote repository
git push origin main

# Set up tracking for the new main branch
git branch --set-upstream-to=origin/main main

# Delete the old master branch locally (optional)
git branch -d master

# useFuture

`useFuture` is a custom React hook that simplifies the handling of asynchronous operations in functional components. It takes a promise factory function and an optional array of dependencies, and returns a tuple containing the resolved value, any error that occurred during the promise resolution, and a boolean indicating whether the promise is still loading. These values are mutually exclusive.

## Installation

To install `useFuture`, you can use npm or yarn:

```bash
npm install use-future
```

or

```bash
yarn add use-future
```

## Usage

First, import the `useFuture` hook from the `use-future` package:

```jsx
import { useFuture } from 'use-future';
```

Then, you can use the hook in your functional component like this:

```jsx
const MyComponent = () => {
  const [value, error, loading] = useFuture(async () => {
    // Perform an asynchronous operation here
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <div>Value: {JSON.stringify(value)}</div>;
};
```

## API

### `useFuture<T>(promiseFactory: () => Promise<T>, deps: unknown[] = []): [T | undefined, unknown | undefined, boolean]`

- `promiseFactory`: A function that returns a promise. This function will be called when the component mounts and whenever any of the dependencies change.
- `deps` (optional): An array of dependencies that will trigger the promise factory to be called again if any of them change. Defaults to an empty array.

Returns a tuple containing:
- `value`: The resolved value of the promise, or `undefined` if the promise hasn't resolved yet or if an error occurred.
- `error`: Any error that occurred during the promise resolution, or `undefined` if no error occurred.
- `loading`: A boolean indicating whether the promise is still loading.

## Example

Here's an example of how to use `useFuture` to fetch data from an API and display it in a component:

```jsx
import { useFuture } from 'use-future';

const UserProfile = ({ userId }) => {
  const [user, error, loading] = useFuture(async () => {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    const data = await response.json();
    return data;
  }, [userId]);

  if (loading) {
    return <div>Loading user profile...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>{user.bio}</p>
    </div>
  );
};
```

In this example, the `useFuture` hook is used to fetch user data from an API based on the `userId` prop. The resolved user data is then displayed in the component. If the promise is still loading, a loading message is shown, and if an error occurs, an error message is displayed.

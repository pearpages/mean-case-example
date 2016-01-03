# mean-case-example

## Walking Skeleton

> A Walking Skeleton is a tiy implementation of the system that performs a small end-to-end function. It need not use the final arhitecture, but it should link together the main architectural components. The architecture and the functionality can evolve in parallel.

- E2E
- Main architectural components
- Iterative

## Components

- Express
- Jade

## .bowerrc

So we install the dependencies in the directory we need so it's publicly available.

```json
{
    "directory": "public/vendor"
}
```

## Data Models

### $http

$http – $http is built into Angular, so there’s no need for the extra overhead of loading in an external dependency. $http is good for quick retrieval of server-side data that doesn’t really need any specific structure or complex behaviors. It’s probably best injected directly into your controllers for simplicity’s sake.

### $resource

$resource – $resouce is good for situations that are slightly more complex than $http. It’s good when you have pretty structured data, but you plan to do most of your crunching, relationships, and other operations on the server side before delivering the API response. $resource doesn’t let you do much once you get the data into your JavaScript app, so you should deliver it to the app in its final state and make more REST calls when you need to manipulate or look at it from a different angle. Any custom behavior on the client side will need a lot of boilerplate.

### restangular

Restangular – Restangular is a perfect option for complex operations on the client side. It lets you easily attach custom behaviors and interact with your data in much the same way as other model paradigms you’ve used in the past. It’s promise-based, clean, and feature-rich. However, it might be overkill if your needs are basic, and it carries along with it any extra implications that come with bringing in additional third-party dependencies.
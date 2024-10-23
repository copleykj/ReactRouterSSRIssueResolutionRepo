# An app for working through and fixing issues with react-router-ssr

This app is a simple app to help sort out issues with react-router-ssr.

## Setting up

1. Clone the repo
2. Run `npm install`
3. Clone the https://github.com/Meteor-Community-Packages/react-router-ssr.git into the packages dir of this project and check out the v6 branch

```bash
git clone -b v6 --single-branch git@github.com:Meteor-Community-Packages/react-router-ssr.git
```
## Issues Tackled

1. ReactDOM's `renderToString` does not support suspense broundaries and rendering to a node stream is currently deprecated. Unfortunately Meteor doesn't currently have a way to access a pipable stream via the server sink, and so we need a way to work around this for now. The `communitypackages:react-router-ssr` package does this by collecting the stream data and then joining the chunks into a string that can be sent to the client.

## Current issues being worked through

Currently work revolves around getting subscriptions within the react rendering process via `useSubscribe/suspense` to work properly, making sure they complete so that data is properly added to the fast-render context. This project contains a simple one route example that is derived from the basic meteor example app. It renders 2 components, `<Hello />` and `<Info />`, wrapping the `<Info />` component in a suspense boundary and using a `useSubscribe` hook within to invoke the subscription while waiting for it to complete.

Currently this does not work and the rendering process fails with a nodescript error. If hooked to the node inspector and the option to break on uncaught exceptions is enabled, an error can be located as follows:

```bash
Error: Client-side timeout waiting for next object
    at AsynchronousCursor._nextObjectPromiseWithTimeout (packages/mongo/mongo_driver.js:1128:24)
    at loop (packages/mongo/mongo_driver.js:1424:28)
    at EnvironmentVariableAsync.<anonymous> (packages/meteor.js:1294:16)
    at packages/meteor.js:765:17
    at AsyncLocalStorage.run (node:async_hooks:346:14)
    at Object.Meteor._runAsync (packages/meteor.js:762:14)
    at EnvironmentVariableAsync.withValue (packages/meteor.js:1290:19)
    at packages/meteor.js:504:25
    at packages/meteor.js:1401:24
    at packages/meteor.js:765:17
    at AsyncLocalStorage.run (node:async_hooks:346:14)
    at Object.Meteor._runAsync (packages/meteor.js:762:14)
    at runWithEnvironment (packages/meteor.js:1394:21)
    at Immediate.<anonymous> (packages/meteor.js:1421:14)
    at processImmediate (node:internal/timers:483:21)
    at process.topLevelDomainCallback (node:domain:160:15)
```

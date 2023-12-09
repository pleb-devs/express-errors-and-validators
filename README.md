# Tips and Tricks for Building a Scalable Express API

- [Tip 1: Organization](#tip-1-organization)
- [Tip 2: Error Handling](#tip-2-error-handling)
- [Challenge 1](#challenge-task-1)
- [Tip 3: Request Validation](#tip-3-request-validation)
- [Conclusion](#conclusion)
- [Challenge 2](#challenge-task-2)
- [Resources](stuff-to-checkout)

## Introduction

This workshop will help you 10x your backend by giving you tips and tricks for _organization_, _error handling_, and _request validation_.

Looking at the commit history, you will see that each commit is a step through this workshop.

The livestream will be recorded. I recommend that you follow along with the live stream and step through each commit to follow along.

Below is a high level of the steps you will need to take to build a more **scalable and robust** Express API.

You can start at the beginning by checking out the very first commit. I tagged each commit from 1 through the end, so an easy way to get to the first commit is to run:

```
git checkout 1
```

>> **TIP**: `git tag -n` will list all tags with their corresponding commit messages.

From here you have the initial setup. You can find @bitcoinplebdev's workshop on what's here at [this link](https://youtu.be/RK40cIY8t3E?si=QEiP2ixKPvI6-T8F) if you want to get the background, but not necessary.

## Tip 1: Organization
The more functionality that your project gets, the more code and files there will be to sort through. For this reason, it's important to start with an organized file structure.

The first step I took was to create some directories for different pieces of the project.

These are as follows:

- `middleware`: Middleware functions are used to perform tasks or checks on incoming requests before they reach the route handlers.
- `controllers`: Controllers handle the application logic for specific routes. They receive input from requests, interact with the necessary services, and send a response back.
- `routes`: Routes define the endpoints of the application, mapping URLs to specific controllers and actions.
- `utils`: Utilities contain reusable functions and modules that are used across different parts of the application.

You can see the result of this on the second commit:
```
git checkout 2
```

I forgot to put all of this into a `/src` directory. You should try this. The only files that should be outside the `/src` dir are: `package.*json`, `.gitignore`, and `README.MD`.

Next, I moved the `lnd.js` file to our `./utils` dir and changed the respective exports/imports.

`git checkout 3` to see this.

#### Separate routes and controllers 
This was a bigger change. I took the routes defined in `index.js` and moved the endpoint definitions to the `./routes` dir while separating the actual logic of some routes to the `./controllers` dir.

`git checkout 4` for this change. Now, we are done organizing our project!

## Tip 2: Error handling
The error handling commits are tagged `5`, `6`, and `7`.

First, we 

```
npm install express-async-errors https-errors
```

to get the required packages.

Then, we build our error-handling middleware function (commit 6). Finally, we use the `http-errors` library to easily throw errors with messages and HTTP codes.

Sweet, now with these two libraries we can easily throw errors and have them trickle down to our error-handling middleware. This means we can just throw errors and not have to worry too much about catching them because they all end up at our error handler eventually.

##### **Challenge task 1**
Go through the routes and perform any sort of checks you might want to do, and throw an `HttpError`. You should then handle the error in your error-handling middleware. Some things you might want to check are like "Did my callback route correctly generate an invoice"? Next, we will be going over data validation, so do not worry about checking that the request data is correct.

## Tip 3: Request Validation

We want our API to work well and allow for other developers to easily use it without confusion. One aspect of this involves validating that the person using your API is using it correctly. For example, you only support creating invoices between 10 and 10,000 sats. You should throw the correct error if someone tries to get a 5-sat invoice from your LNURL server.

A library that makes this possible without making your controller functions messy is `express-validator`. Let's install that.

```
npm install express-validator
```

This library is a bit confusing at first, but it becomes intuitive once you get used to it. I recommend you go through the [guide in their docs](https://express-validator.github.io/docs/category/guides)

In this workshop, I used the [`checkSchema` function](https://express-validator.github.io/docs/guides/schema-validation) to define the structure of requests using JSON. You can also just chain validators like so:

```
const { query } = require('express-validator')

router.get('/lnurl', query('amount').isInt().required(), ...)
```

This method can be nice for small requests, but I prefer to just use schemas to keep everything more functional and organized.

In commit `9` I built a validator for the `/callback` route. You just need to use this like middleware. Take the export from the `callbackValidator` and stick it in your route before the route logic.

This is cool, but what happens if the request data is invalid? Well, the validator ends up attaching it to the `request` object, so we will need to deal with that next. You can see in commit `9` that I added a log statement to the `callbackController.js` file.

`git checkout 10` to see the `handleValidationErrors` functions which checks to see if any validation errors occurred, and if so, then return an error with that message.

## Conclusion

Alright! We have successfully improved our Express API. We added a sensical file structure, improved how we deal with errors, and learned how we can cleanly validate request data!

##### **Challenge Task 2** Look through the [luds](https://github.com/lnurl/luds) and implement another route. Check out [lud16](https://github.com/lnurl/luds/blob/luds/16.md) to add lightning addresses to your API.

## Stuff to checkout
- [express-async-errors](https://www.npmjs.com/package/express-async-errors)
- [http-errors](https://www.npmjs.com/package/http-errors)
- [express-validator](https://www.npmjs.com/package/express-validator)
- [LNURL Pay Workshop](https://youtu.be/RK40cIY8t3E?si=QEiP2ixKPvI6-T8F)



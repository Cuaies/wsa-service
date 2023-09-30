# wsa-service

This is a simple concept project for a web scraping API, made only in 2 days, with no prior knowledge about anything web scraping-related. During the development of this web application, I've learned a lot about the vital role of a web scraper, and the challenges it comes with when using it at scale.

![Preview](https://i.imgur.com/Ycux81D.png)

## Features

- **Load Balancer** - Simple load balancer, made with the built-in `cluster` module, add support for the project to use every core of its processor to reduce API stress.

- **Caching** - Rudimentary yet effective caching system, made possible

- **Made with TypeScript** - TypeScript is a statically typed superset of JavaScript, known for its enhanced type-checking capabilities and improved developer tooling.

- **Built with [Fastify](https://fastify.dev/)** - One of the leaders of today's web frameworks market, it has been built with speed in mind, making it more popular over express due to its performances.

## Getting Started

### Prerequisites

[Node.js](https://nodejs.org/en) required.

**NOTE:** Code only tried on Node > 18.

### Installation

1. Clone the repository:

```sh
    $ git clone git@github.com:Cuaies/wsa-service.git
```

2. Navigate to its directory:

```sh
    cd wsa-service
```

3. Install dependencies:

```sh
    npm install
```

4. The easiest way to start the project is by running the `start:prod` script:

```sh
    npm run start:prod
```

**WARNING!** The client might have issues rendering on Safari browsers.

### Configuration

This project requires no configuration to run, but it intended to be configured. The only configuration file resides in `./packages/server/`, and it's a simple `.env` with a few variables:

```
    CACHING=boolean # Enables caching.

    CLUSTER=boolean # Enables the load balancer system.
```

### Drawbacks

Like everything else, this repository has not been immune to drawbacks. Due to the very short development timeframe, some important features had to have been left out, here's a list I've made while encountering with them:

- _Weak Typing_ - Even though it is made in TypeScript, there were parts of the system that relied on type casting, and the use of `any`, but the biggest issue is being represented by the lack of type-safety in the usage of the API, with no communication between packages whatsoever.

- _Redundancy_ - Many parts of the software had to have been rushed, making room for redundancy, in the lack of a proper architecture layout.

- _Lack of Tests_ - Obviously, the lack of tests has led to numerous easily avoidable issues.

- _Improper use of mixins and CSS_ - The full potential for mixins was wasted, being used ad-hoc along with CSS styling and layout.

- _Inexistent Data Validation_ - Almost no property is being validated.

All these being said, these things are not as hard to fix, but they require extra time and planning ahead. All in all, this project has made me discover new technologies and practices, which are very handy and expand to new possibilities.

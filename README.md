# Nestjs GraphQL Best Practice

> ### NestJS (Express + Typeorm) codebase containing real world examples (CRUD, auth, advanced patterns, etc).
# Spring Boot Learning Starter

![](https://img.shields.io/badge/build-success-brightgreen.svg)

# Stack

![](https://img.shields.io/badge/node_12-✓-blue.svg)
![](https://img.shields.io/badge/nestjs-✓-blue.svg)
![](https://img.shields.io/badge/mongo-✓-blue.svg)
![](https://img.shields.io/badge/jwt-✓-blue.svg)
![](https://img.shields.io/badge/typeorm-✓-blue.svg)
![](https://img.shields.io/badge/jest-✓-green.svg)


## Table of Contents

- [Structure](#structure)
- [Function](#function)
- [Usage](#usage)
- [Starting the Server](#starting-the-server)
- [Node.js Best Practices](#nodejs-best-practices)
  - [1. Project Structure Practices](#1-project-structure-practices)
  - [2. Error Handling Practices](#2-error-handling-practices)
  - [3. Code Style Practices](#3-code-style-practices)
  - [4. Testing And Overall Quality Practices](#4-testing-and-overall-quality-practices)
  - [5. Going To Production Practices](#5-going-to-production-practices)
  - [6. Security Best Practices](#6-security-best-practices)
  - [7. Performance Best Practices](#7-performance-best-practices)



***

<h3 align="center">Please help this repo with a :star: if you find it useful! :blush:</h3>

***

## Usage

1. Clone repository

```
  git clone git@github.com:{your_user_name}/nestjs-base-learning.git
```

2. Cd into directory

```
  cd nestjs-graphql-best-practice/
```

5. Install dependencies using npm

```
  npm i
```

## Starting the Server


1. Start in development normal

```
  npm run start:dev
```

2. Start with webpack ( 2 terminal view )

```
  npm run webpack
  npm run start:hmr
```


# File structure

```
nodejs-nest-backend-base/be
├── Dockerfile
├── LICENSE
├── Procfile
├── README.md
├── be.iml
├── docker-compose.yml
├── files
|     └── postman_collection.json
├── jest.config.json
├── nest-cli.json
├── nodemon-debug.json
├── nodemon.json
├── package-lock.json
├── package.json
├── src
|     ├── app.module.ts
|     ├── app.processor.ts
|     ├── auth
|     |     ├── guards
|     |     |     ├── jwt-auth.guard.ts
|     |     |     └── roles.guard.ts
|     |     └── strategy
|     |         └── jwt.strategy.ts
|     ├── bootstrap.ts
|     ├── common
|     |     ├── filters
|     |     |     └── http-exception.filter.ts
|     |     ├── index.ts
|     |     ├── interceptors
|     |     |     ├── exception.interceptor.ts
|     |     |     ├── http-cache.interceptor.ts
|     |     |     ├── logging.interceptor.ts
|     |     |     ├── timeout.interceptor.ts
|     |     |     └── transform.interceptor.ts
|     |     ├── middleware
|     |     |     └── logger.middleware.ts
|     |     ├── pipes
|     |     |     └── validation.pipe.ts
|     |     └── wiston
|     |         └── index.ts
|     ├── config
|     |     ├── bull
|     |     |     └── index.ts
|     |     ├── cache
|     |     |     └── index.ts
|     |     ├── index.ts
|     |     ├── logger
|     |     |     └── index.ts
|     |     └── typeorm
|     |         └── index.ts
|     ├── config.orm.ts
|     ├── controllers
|     |     ├── abstract.controller.ts
|     |     ├── index.ts
|     |     └── user.controller.ts
|     ├── dbseed.ts
|     ├── environments
|     |     └── index.ts
|     ├── generator
|     |     ├── graphql.schema.ts
|     |     └── index.ts
|     ├── main.ts
|     ├── metadata.ts
|     ├── models
|     |     ├── index.ts
|     |     └── user.entity.ts
|     ├── repository
|     |     ├── abstract.repository.ts
|     |     ├── index.ts
|     |     └── user.repository.ts
|     ├── service
|     |     ├── auth.service.ts
|     |     ├── index.ts
|     |     └── user.service.ts
|     └── utils
|         ├── index.ts
|         └── password
|             └── index.ts
├── test
|     ├── app.e2e-spec.ts
|     ├── jest-e2e.json
|     └── user
|         ├── user.e2e-spec.ts
|         └── user.service.spec.ts
├── tsconfig-paths-bootstrap.js
├── tsconfig.build.json
├── tsconfig.json
├── tslint.json
└── webpack.config.js

```

# Introduction (https://jwt.io)

Just to throw some background in, we have a wonderful introduction, courtesy of **jwt.io**! Let’s take a look:

## What is JSON Web Token?

JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA.

Let's explain some concepts of this definition further.

**Compact**: Because of their smaller size, JWTs can be sent through a URL, POST parameter, or inside an HTTP header. Additionally, the smaller size means transmission is fast.

**Self-contained**: The payload contains all the required information about the user, avoiding the need to query the database more than once.

## When should you use JSON Web Tokens?

Here are some scenarios where JSON Web Tokens are useful:

**Authentication**: This is the most common scenario for using JWT. Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token. Single Sign On is a feature that widely uses JWT nowadays, because of its small overhead and its ability to be easily used across different domains.

**Information Exchange**: JSON Web Tokens are a good way of securely transmitting information between parties. Because JWTs can be signed—for example, using public/private key pairs—you can be sure the senders are who they say they are. Additionally, as the signature is calculated using the header and the payload, you can also verify that the content hasn't been tampered with.

## What is the JSON Web Token structure?

JSON Web Tokens consist of three parts separated by dots **(.)**, which are:

1. Header
2. Payload
3. Signature

Therefore, a JWT typically looks like the following.

`xxxxx`.`yyyyy`.`zzzzz`

Let's break down the different parts.

**Header**

The header typically consists of two parts: the type of the token, which is JWT, and the hashing algorithm being used, such as HMAC SHA256 or RSA.

For example:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Then, this JSON is Base64Url encoded to form the first part of the JWT.

**Payload**

The second part of the token is the payload, which contains the claims. Claims are statements about an entity (typically, the user) and additional metadata. There are three types of claims: reserved, public, and private claims.

- **Reserved claims**: These are a set of predefined claims which are not mandatory but recommended, to provide a set of useful, interoperable claims. Some of them are: iss (issuer), exp (expiration time), sub (subject), aud (audience), and others.

> Notice that the claim names are only three characters long as JWT is meant to be compact.

- **Public claims**: These can be defined at will by those using JWTs. But to avoid collisions they should be defined in the IANA JSON Web Token Registry or be defined as a URI that contains a collision resistant namespace.

- **Private claims**: These are the custom claims created to share information between parties that agree on using them.

An example of payload could be:

```json
{
  "sub": "1234567890",
  "name": "Vitalii Samofal",
  "admin": true
}
```

The payload is then Base64Url encoded to form the second part of the JSON Web Token.

**Signature**

To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that.

For example if you want to use the HMAC SHA256 algorithm, the signature will be created in the following way:

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

The signature is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.
Putting all together

The output is three Base64 strings separated by dots that can be easily passed in HTML and HTTP environments, while being more compact when compared to XML-based standards such as SAML.

The following shows a JWT that has the previous header and payload encoded, and it is signed with a secret. Encoded JWT

![](https://camo.githubusercontent.com/a56953523c443d6a97204adc5e39b4b8c195b453/68747470733a2f2f63646e2e61757468302e636f6d2f636f6e74656e742f6a77742f656e636f6465642d6a7774332e706e67)

## How do JSON Web Tokens work?

In authentication, when the user successfully logs in using their credentials, a JSON Web Token will be returned and must be saved locally (typically in local storage, but cookies can be also used), instead of the traditional approach of creating a session in the server and returning a cookie.

Whenever the user wants to access a protected route or resource, the user agent should send the JWT, typically in the Authorization header using the Bearer schema. The content of the header should look like the following:

`Authorization: Bearer <token>`

This is a stateless authentication mechanism as the user state is never saved in server memory. The server's protected routes will check for a valid JWT in the Authorization header, and if it's present, the user will be allowed to access protected resources. As JWTs are self-contained, all the necessary information is there, reducing the need to query the database multiple times.

This allows you to fully rely on data APIs that are stateless and even make requests to downstream services. It doesn't matter which domains are serving your APIs, so Cross-Origin Resource Sharing (CORS) won't be an issue as it doesn't use cookies.

The following diagram shows this process:

![](https://camo.githubusercontent.com/5871e9f0234542cd89bab9b9c100b20c9eb5b789/68747470733a2f2f63646e2e61757468302e636f6d2f636f6e74656e742f6a77742f6a77742d6469616772616d2e706e67)

# JWT Authentication Summary

Token based authentication schema's became immensely popular in recent times, as they provide important benefits when compared to sessions/cookies:

- CORS
- No need for CSRF protection
- Better integration with mobile
- Reduced load on authorization server
- No need for distributed session store

Some trade-offs have to be made with this approach:

- More vulnerable to XSS attacks
- Access token can contain outdated authorization claims (e.g when some of the user privileges are revoked)
- Access tokens can grow in size in case of increased number of claims
- File download API can be tricky to implement
- True statelessness and revocation are mutually exclusive

**JWT Authentication flow is very simple**

1. User obtains Refresh and Access tokens by providing credentials to the Authorization server
2. User sends Access token with each request to access protected API resource
3. Access token is signed and contains user identity (e.g. user id) and authorization claims.

It's important to note that authorization claims will be included with the Access token. Why is this important? Well, let's say that authorization claims (e.g user privileges in the database) are changed during the life time of Access token. Those changes will not become effective until new Access token is issued. In most cases this is not big issue, because Access tokens are short-lived. Otherwise go with the opaque token pattern.

# Implementation Details

Let's see how can we implement the JWT token based authentication using Java and Spring, while trying to reuse the Spring security default behavior where we can. The Spring Security framework comes with plug-in classes that already deal with authorization mechanisms such as: session cookies, HTTP Basic, and HTTP Digest. Nevertheless, it lacks from native support for JWT, and we need to get our hands dirty to make it work.

# How to use this code?

1. Make sure you have [Node 12] and [Npm] installed

2. Fork this repository and clone it

```
$ git clone https://github.com/<your-user>/spring-boot-base-learning
```

3. Navigate into the folder

```
$ cd nodejs-nest-backend-base/be
```

4. Install dependencies

```
$ npm install
```

5. Run the project

```
$ npm run start:dev
```

6. Navigate to `http://localhost:14047/html` in your browser to check everything is working correctly. 

7. Make a GET request to `/users/me` to check you're not authenticated. You should receive a response with a `403` with an `Access Denied` message since you haven't set your valid JWT token yet

```javascript
{
  "id": 1,
  "username": "admin",
  "email": "admin@email.com",
  "roles": [
    "ROLE_ADMIN"
  ]
}
```

8. Import postman collection you can find it by path ``utils/postman_collection.json``. This collection includes base signup, signin and whoami endpoint calls. Also setting the header is automated there, so once you signed in you will be able to call whoami. You can check Tests tab on Signin method to understand how it's done there. Play with it, achive validation exceptions, set wrong email address for signup (e.g. without `@` symbol), see the result!


Further instructions you will get from your mentor if you are part of our study class. If not then signup we will be glad to teach you, future senior developer ◉_◉. [Softkit Contact Us](https://softkitit.com/careers)

# Contribution

- Report issues
- Open pull request with improvements
- Spread the word
- Reach out to me directly at <vsamofal@softkitit.com>


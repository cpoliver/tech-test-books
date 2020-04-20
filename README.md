# Technical Test: Books API

You probably want to check out the [UI code](https://github.com/cpoliver/tech-test-books-ui), and [deployed app](https://cpoliver.github.io/tech-test-books-ui/
) first. There you'll find much more comprehensive documentation. This was before monorepos were cool, okay?!

## Purpose
This is some simple code to generate and serve random book data.

## Tasks
 - [ ] write basic documentation
 - [ ] write unit test cases
 - [ ] add persistence layer
 - [ ] write implementation
 - [ ] deploy server to heroku
 - [ ] design item icons for front-end
 - [ ] create user-interface

## Dependencies
- node v7.9.0
- yarn v0.23.3

*_NOTE:_ This was developed in MacOS Sierra v10.12.3 using the aforementioned versions. This may be compatible with other versions, but cannot be guaranteed.*

## Getting Started
- clone this repository: `git clone https://github.com/cpoliver/tech-test-books.git`
- install the project dependencies: `yarn install`
- run the app for development: `yarn dev` (on-the-fly transpilation with `babel-node`)
- run the unit tests: `yarn test` or `yarn test:watch`
- build the transpiled sources (to `./dist/`): `yarn run build`
- run the built sources `yarn start`

## Env
- Nodejs: ^17.0.1
- npm: ^8.14.0

## Usage
- install package
  ```
  npm i 
  ```
- run project
  ```
  npm start
  ```

### Trending Tags
1. - [x] Display top 10 trending tags
2. - [x] Data can be found using this (​https://api.stackexchange.com/docs/tags​)
3. - [x] Default selected the first tag.
4. - [x] Use a round corner for tag border.
### Question Listing
1. - [x] The question list data can be found using this (​https://api.stackexchange.com/docs/questions​) with the selected tag as the filter.
2. - [x] Support infinite scrolling (20 questions per fetch) and lazy load.
3. - [x]When scrolling down the list, the “Trending Tags” section shall scroll together.
4. - [x] Clicking a question will open a new tab to the question link.
5. - [x] Highlight the score when it is below zero
6. - [x] Highlight the answers with border only when it has more than 1 answer but not accepted.
7. - [x] Highlight the answers when it has more than 1 answer and accepted.
8. - [x] Apply round corner for user profile picture.
### Searching
1. - [x] The search will apply searching to trending tags.
2. - [x] The search bar is located at the top of the page, even when the list is scrolling.
3. - [x] Search is performed when the keyword is typed, trending tags and listing shall update
accordingly.
### Specification
1. The code should work after we clone the repository.
2. Please prepare a setup guide on how to kickstart your application.
### Bouns
1. - [x] Use redux for development
2. - [x] Use responsive design
3. - [x] Show loading spinner when fetching data
4. - [x] Add animations
5. - [x] Any functions/features you see fit into the use case.
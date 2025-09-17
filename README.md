# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.
1. if there is an error in validation, feedback should be returned perhaps as a literal error
2. It seems there is some issues with comma handling with the double quotes in parsing
3. Perhaps the user should be able to select which column headers they want in their data
4. The user should be able to define what valid data is 


- #### Step 2: Use an LLM to help expand your perspective.
The LLM got very specific with the types of errors as well as CSV formatting compared to my initial ideas. It mentioned things such as handling quoted fields and custom delimiters. One really cool idea/edge case it considered was skipping empty lines or commented out lines while parsing. Another thing I missed that it mentioned was handling very large files. It may have missed the mark with it mentioning accepting more advanced inputs besides just file paths which is not within the constraints of the project/prompt inputted. I experimented with changing the prompts and it more or less produced the same general advice of more configurability and handling edge cases in input.

- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    1. LLM, functionality -  As a user, I should be able to input a messier CSV with an arbitrary amount of lines between data and/or comment lines and have it parsed properly.
    2. both, functionality - As a user, I should be able to utilize commas, newlines, quotes etc. inside of quoted fields.
    3. both, functionality - As a user, empty fields in the CSV should be parsed correctly. 
    4. me, extensibility - As a user, I should be able to filter valid rows from non-valid ones with a particular schema/specification


    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

    My initial ideas were very fundamental and very constrained to the specifications of this assignment (for instance, file path only input). The LLM seems to give helpful responses regarding the basic idea of the assignment/problem but also goes to more advanced topics we haven't learned yet such as APIs and hooks. I like the general gist I can get from the LLM but it can definitely lead you astray as well into unfamiliar territory.


### Design Choices

### 1340 Supplement

- #### 1. Correctness

- #### 2. Random, On-Demand Generation

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs:
#### Tests:
#### How To…

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
#### Total estimated time it took to complete project:
#### Link to GitHub Repo:  

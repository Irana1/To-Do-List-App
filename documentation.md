## First Issue

Had the first issue with getting the task input value showing up in the created task div in the submit event. First problem I found was **the button was not wrapped in a form** All buttons that have a submit type has to be wrapped in a form. The other problem I found was **the form ended early**. The form had a /form early in the form that made the form end early.

## Second Issue

Second issue was that the div wou'dnt display the task text after creating the task object. **Simple fix is to create a task span, set it's text content to the tasks' text value, and append the span to the task div.**
 #[Testing](#testing)

## Table of contents

  1. [Overall Peformance](#overall-performance)
  2. [Code Validation](#code-validation)
  3. [Accessibility Testing](#accessibility-testing)
  4. [Responsiveness & Compatability Testing](#responsiveness--compatability-testing)
  5. [JavaScript Testing](#javascript-testing)
        * JS Hint
  6. [Bug Fixes](#bug-fixes)
        * Sound Button
        * Game Over Audio
  7. [Testing User Stories from User Experience (UX) Section](#testing-user-stories)
        * Project Goals
        * Players Goals
        * Super Squad helps players meet these goals by:
  8.  [Other Testing Methods](#other-testing)
  9. [Further Testing](#further-testing)

  ------

## Overall Performance

The complete site was tested on the lighthouse facility in Google Developer Tools to assess the overall performance of the site. The site meets the pass criteria and you can see the results in the below table.

| Page                | Screenshot                                      | Notes                                                        |
|---------------------|-------------------------------------------------|--------------------------------------------------------------|
|Start/Home Screen    |![screenshot](docs/testing/lighthouse_start.png) | Minor improvements for performance                           |
|404                  |![screenshot](docs/testing/lighthouse_404.png)   | No warnings. Possible minor improvements. 100% accessibility |


## Responsiveness & Compatability Testing

 The below matrix shows the responsiveness and browser compatability testing carried out.
![Screenshot](docs/testing/testing_matrix.png)


## Code Validation

The W3C Markup Validator and W3C CSS Validator Services were used to validate every page of the project to ensure there were no syntax errors in the project. The results and screenshots are in the table below.

| Page                | Screenshot                               | Notes  |
|---------------------|------------------------------------------|--------|
|Start/Home Screen    |![screenshot](docs/testing/index_w3c.png) | Passed |
|404                  |![screenshot](docs/testing/404_w3c.png)   | Passed | 
|CSS                  |![screenshot](docs/testing/css_w3c.png)   | Passed |


## Accesibility Testing

    * The complete site was tested using [Web Aim](https://wave.webaim.org/) and has passed. This can be [viewed here for index.html](docs/testing/webaim.png) and [viewed here for 404.html](docs/testing/webaim_404.png). There was a minor warning where the icon was being detected as a h2, although not being used or labelled as a h2.

    * The sound initially played by default however after researching accessibility and sounds, the sound button has been switched off as default unless the user explicitly turns on the the sound button. The sound button has also had a label added to it to make it clear where it is and what it does. This has been done to meet accessibility criteria and guidlines. This was not in the original wireframes design.

## JavaScript Testing

### JS Hint

  * The JavaScript code was put though [JS Hint](https://jshint.com/) which intially flagged ES6 warnings and some missing semi colons, and one unused variable. It was tested without telling JS Hint the code is written in ES6 version and it came up with warning for the 'let' variable used as this is not supported in the earlier ES5/ES2015 version. Some browsers do not support ES6 although this is uncommon. Further testing was then undertaken while informing JS Hint that the code is written in ES6 by adding this comment '/* jshint esversion: 6 */' to the top of the code. This returned missing semi-colon warnings which were corrected and an unused declared variable that was removed and the website re-tested. Removing the variable has not caused any bugs to fix.

| Test      | Screenshot                                     | Notes                                                |
|-----------|------------------------------------------------|------------------------------------------------------|
| ES5       |![screenshot](docs/testing/jshint_es5.png)      | ES6 warnings, missing semi colon and unused variable |
| Re-test 1 |![screenshot](docs/testing/jshint_retest_1.png) | Missing semi-colons and unused variable              | 
| Re-test 2 |![screenshot](docs/testing/jshint_retest_2.png) | Passed - No warnings                                 |


## Bug Fixes

### Sound Button

After the initial build there was a bug/issue with the sound button. it would only mute the theme sound. After discussing with my mentor it was decided to declare all of the sounds at the start of the JS file and create a button that would turn the sound on and off for all sounds from the start. The functions were also changed so the sounds were muted as default to meet accessibility criteria and best practices. The original sound code can be seen [here](docs/testing/js_soundcode_old.png). 

Within the new function declared at the start the innnerhtml was targeted. This was an improvement but was sometimes unreliable on testing due to being stored in the dom. This version of the code can be seen [here](docs/testing/js_sound_innerhtml.png).

The sound button function was then amended again so that the muted variable was targeted directly. This solved all the issues with the sound button making it reliable and self comtained within the code without relying on the dom. The final version can be seen [here](docs/testing/js_sound_bugfix.png).

By carrying out the bug fix the code has been refined and made more readable and logical. It has minimised the code and removed 66 redundant lines.

### Game Over Audio Bug Fix

The game over audio was being cut off half way through the audio. The length of the time the audio played was adjusted until it worked as expected.


## Testing User Stories from User Experience (UX) Section

## Other Testing Methods

It is best to combine manual and automated testing. Automated tests will not test user experience and tests will only ever be as good as the questions we ask it to perform.

### Manual Testing

Behaviour driven Development (BDD) is where a project or product is tested  to the user stories. This has also been done in responsiveness and compatability testing section above. 
This form of testing although useful in terms of user story testing can be subject to bias and sometimes things can get missed due to fatigue and is costly in time and resources. BDD is more user-centric and revolves around system behaviour. This is an Agile software development methodology.
It is particuarly useful as it can encompass a wide range of input from stakeholders to managers and is good for planning a project and monitoring throughout its entirety. Goals can be set along the projects way to delivery and measured.

#### User Testing 

User Testing (a form of BDD) has been carried out on the project. All of the details are shown in the table below.
 

### Automated Testing

Test Driven Development (TDD) is where developers test first and use these results to guide theor development. The process begins when tests are written in order to fail but only so much so that the tests dont break the programme. TDD is thought of as more developer-centric, and is revolves around code correctness.

A popular technique in TDD is Red-Green-Refactor. A manageable way of testing code. This is explained below;
Red - Write a failing test. Script a test that will fail around a specific function of the programme.
Green - Make the test pass, enough needs to be done to get it to pass and work
Refactor - Clean up the code. Refining the code is done making it efficient and reliable. 

Various language specific frameworks are available to run automated testing. One of the most popular is Jest for testing JavaScript. 

## Further Testing

    * A large amount of testing was done to ensure that all pages were linking correctly.
    * Friends and family members were asked to review the site and documentation to point out any bugs and/or user 
      experience issues.

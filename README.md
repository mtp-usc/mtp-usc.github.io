# MTP APP

This repository contains the source code for the application developed to predict when a patient will need a **Massive Transfusion Protocol** (*MTP*), based on the information recollected by the physician, such as Age, Systolic Blood Pressure, FAST results, among other.

## Development

To run the development environment into your local PC, it is needed to install previously Node.js and NPM. [This link](https://nodejs.org/en/) redirect you to the oficial page of Node.js where you can download both according to your operative system.

Once you have Node.js and NPM installed, run the following command to install the depedencies required to work:

    npm install

After that, run the following command to initiate the development environment:

    npm run dev

The previous command will allow to see the state of the application at the link http://localhost:3000

## Learning Resources

The application was developed using [React](https://reactjs.org/), which is a JavaScript library dedicated to frontend development. To learn more about it, the following list can be useful:

- https://www.youtube.com/watch?v=bMknfKXIFA8
- https://www.youtube.com/watch?v=Ke90Tje7VS0
- https://www.youtube.com/watch?v=w7ejDZ8SWv8

## Adding a new model

## Model visualization

To add a new model, it is necessary to create a new folder inside components, and inside that folder create a file called *index.jsx*. For example, if you want to add a $n^{th}$ model, the structure of the folders will look like this:
    
    - src
      - components
        ...
        - Model n
          - index.jsx

Inside the file *index.jsx*, it is necessary to create a component called Model*n* and export it. Inside this component, you will write the code to render the inputs and outputs for the model. You can also guide from one of the models developed previously.

## Inputs

There exist three type of inputs: 

- Slider input
- Category input
- Checkbox input

To add a new input, you have to import into src/components/Model*n*/index.jsx the component called *CustomerInput*, which has the following parameters depending on which type of input you need:

Slider Input:
- 
Parameters:
- inputType: **'slide'** (This value has to be exact)
- defaultValue: The default value that the input will have
- description= The description that will be shown with the input (*Optional* )
- inputNumber: Numeration of the input in the screen
- name: The code that is generate for each variable
- range: A list of two values, the minumum and maximum value allowed for the input.
- setState: **{setState}** (This value has to be exact)
- state: **{state}** (This value has to be exact)
- title: Title of the input
  

Category Input:
- 
Parameters:
- inputType: **'options'** (This value has to be exact)
- defaultValue: The default value that the input will have
- description: The description that will be shown with the input (*Optional* )
- inputNumber: Numeration of the input in the screen
- name: The code that is generate for each variable
- options: A list of the posible categories that the input has.
- setState: **{setState}** (This value has to be exact)
- state: **{state}** (This value has to be exact)
- title: Title of the input

Checkbox Input:
- 
Parameters:
- inputType: **'checkbox'** (This value has to be exact)
- defaultValue: The default value that the input will have
- description: The description that will be shown with the input (*Optional* )
- inputNumber: Numeration of the input in the screen
- name: The code that is generate for each variable
- options: A list of objects, where each object has two items. The first is called name and represents the code for each variable. The second is called label and represents the label that will be shown in the screen for each option of the input.
- setState: **{setState}** (This value has to be exact)
- state: **{state}** (This value has to be exact)
- title: Title of the input

## Model configuration

It is also required to create a file called model*n*.js in the folder utils, that will look like this:

    - src
      - utils
        ...
        - modeln.js

In this file, the configuration of the initial state of the model, as well as the parameters to make predictions based on the information of each patient is stored. It is required to created the following information:

initialState:
-
An object where the default value for each variable used in the model is stored.

coef:
-
An object where the $\beta$ coeficients calculated for the model is stored.

THRESHOLD:
-
A constant to store the threshold for that specific model, which is used to separate the positive and negative predictions.

predictionModel:
-
A function that receive the information that was provided by the physician, and a function to actualize the state of the app. IN this function each option and checkbox input is mapped to it corresponding representation as binary variables, and the prediction is calculated. The parameter setIsMTP is called at the end to actualize the information that is shown to the user.

usePredictionModel:
-
A custom hook that is exported and that automatically recalculate the prediction when any input is changed. This is the only function that is exported from this file and that is imported at model*n*/index.jsx

## Upload changes

To upload the changes made, it is necessary to push the new code into the *main* branch of the repository. However, it is a good practice to never work directly into this brach. 

I recommend to generate a new branch for each model that is needed to add into the application, and once you are sure that everything is working as it is required, create a pull request and merge the code into the main branch.

To know more about this workflow using git as source control, the following resources could be useful:

- https://www.youtube.com/watch?v=RGOj5yH7evk
- https://www.youtube.com/watch?v=8JJ101D3knE
- https://www.youtube.com/watch?v=Uszj_k0DGsg


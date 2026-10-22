# What is this?

If you want to write experiments that run on [Jatos](https://www.jatos.org/), you need to write them in javascript.
This template provides you with a convenient structure and helpers to develop and finally deploy your experiment
to Jatos.

The problem this template tries to solve is that it is much better to write these experiments using small
files with dedicated functionality. This is very different from how it is ideal for running them on Jatos and the
webbrowser.

What we are basically doing here is:

1. You write your experiment in javascript files.
2. We transform it to a "compiled" form that you can then upload to Jatos.

# How to set things up

## Fork this repository

The best way to use this template is to create a fork of it on gitlab and do your changes in that fork. This allows you
to benefit from any improvements done in the future. Care will be taken to not interfere with anything you write.

1. Go to https://gitlab.com/thht/jatos_template
2. Make sure that you are logged in. If you do not have an account yet, now is the time to get one...
3. You should see a small button called  "Fork". Click it.
4. On the next page, choose a group/namespace where you want your project to live.
5. In the left menu, choose "Settings->General".
6. Change the "Project name" to reflect the name of your experiment project.
7. Scroll down to "Advanced" and click "Expand".
8. Scroll further down until you reach "Change path" and change the path, so it reflects the name of your experiment project.

## Clone the forked repository to your hard drive

You can clone your forked repository like any other repository:

1. Go to the main page of your project by clicking on "Project" in the left menu of gitlab.
2. Click on "Clone" (you find it to the right of the page).
3. Copy the line under "Cline with SSH".
4. Open a terminal on your computer and navigate to the folder under which your want to host your code.
5. Type `git clone ####`, replacing `####` with what you copied above.
6. Navigate into the folder that you just checked out.
7. Type: `git remote add upstream git@gitlab.com:thht/jatos_template.git`

## Install necessary software

In order to work, this template relies on [nodejs](https://nodejs.org). The tools that are used in the background
rely on it. So, head over and install it for your OS.

When this is over, go back to the terminal, navigate to the root folder of your experiment project. Make sure that you
see a file called "package.json" in the current folder. Next, we need to download all the nodejs packages that
we need. This is really easy:

```bash
npm install
```

## Build and run the example experiment

Type this:

```bash
npm run dev-server
```

After a while, your webbrowser will open and present you with a page having three links. These three links point
to components of the example experiment. You can see the source files in `src_examples`.

## Inspecting the example experiment

Take a look at the `src_examples` folder. You see three `.js` files in the root folder. If you look at the web-page that
has just opened, you see that each of the `.js` files corresponds to one entry on the web page.

The reason for this is that Jatos structures parts of an experiment in "Components", independent parts of the experiment
that run one after each other. Each `.js` file contains one component. In our case, there is one component for the
instructions, one for the actual experiment and one to say goodbye.

Let's look at one of those files: `visual_trials.js`:

```javascript
import { initJsPsychWithJatos } from '../lib/jatos.ts';
import get_images_trials from './parts/show_images';

const jsPsych = initJsPsychWithJatos();

jsPsych.run([
   get_images_trials(jsPsych, 10),
]);

```

The first line imports the function `initJsPsychWithJatos` which is a replacement function for [`initJsPsych`](https://www.jspsych.org/7.0/reference/jspsych/#initjspsych).

**Please only use this function if you want to integrate your experiment in Jatos!!**

The second line imports the function `get_image_trials` from the the javascript file you can find in `parts`.

The third line then initialises jsPsych.

The fourth line the uses the `get_image_trials` function to create the jsPsych timeline.

Take a look at the other files and functions. Note that you can also import images and sound files like this (take
a look at the `assets` folder!).

# Coding your own experiment

In order to write your own experiment you need to do two things:

1. Open the file `package.json`. The second line reads: `"name": "your_experiment_name_goes_here"`. Put the
   name of your experiment in there.
2. Create a folder called `src`. This is where your experiment source code is going to live.

As soon as the build process detects the `src` folder, it will start to build from there and ignore the `src_examples`
folder. So there is no need for you to delete that one.

# Building for Jatos

In order to put your experiment into Jatos, you need a `zip` file with all the informations, scripts, images etc.

The template does this for you:

```bash
npm run create_jatos_zip
```

This generates a file called `jatos.zip` that you can upload to your jatos installation.

# Staying up-to-date

If you want to stay up-to-date with changes made to this template, issue:

```bash
git pull upstream master
```

once in a while. As long as you make sure not to change anything in the files and folders that originally come with
this template, there should be no problems.
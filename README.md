# START
#### __HTML5__ starter kit for creating HTML5 applications and User Interfaces (UIs), intergrated with __GULPJS__ for fast, clean and optimized web app creation.

It has all the necessary requirements to get anyone started in creating apps fast and easy.

## What does it do for me?
__START__ basically does the following:

1. compiles your scripts, templates, styles (both transpilation and precompilation is taken care of here)
2. lints them (checks for any syntax error)
3. notifies you about errors via console and system notifications
4. wraps the scripts and templates in common.js / AMD modules. (for build systems)
5. concatenates scripts and styles
6. generates source maps for concatenated files
7. copies assets and static files the respective required project production directory
8. shrinks the output by minifying code and optimizing images
9. monitors/watches your files for changes and updates realtime wherever relevant, reloads to reflects the changes to the browser
10. create a test and distribution/final versions of your app or UI without compromising the original code

> Concatinates all __CSS__ into app.full.css and __JS__ into app.full.js or app.full.min.js after minification.

## Dependencies
You will need to install some stuff, if you haven't already:

Majors:

* Node.js - [Click here](http://nodejs.org) to install

Secondaries(click for further information):

* npm (installed together with node.js, usually bundled in it)
* [gulpjs](http://gulpjs.com) (part of the instructions below)
* [bower](http://bower.io)

## Getting Started
Once you have NodeJS installed, run_(type/copy paste int the command line window and press ENTER)_:

__To download the boilerplate__
```bash
$ git clone https://github.com/kn9ts/start-to-grunt name_of_your_project
```

After cloning/copying the boilerplate, please get into your project's directory/folder
```
$ cd name_of_your_project
```

__To install Grunt-CLI (Command Line) plugin/tool__
```bash
$ sudo npm install -g gulp
```

__To install gulp/project dependecies__
```bash
$ npm install
```

__To install default project front-end assets/libraries eg. bootstrap, jQuery...__
__NOTE:__ This downloads CSS and JavaScript libraries that usually default in most projects nowadays. They are downloaded into the *__bower_assets__* folder that can be referenced in the HTML you are editing as you would have with any CSS and JavaScript files in your project, only that this way we give your application a good structure and files separation.

```bash
$ bower install
```

__Note: Each of the '$' (dollar) sign denotes a step (so steps 4 in total)__

> *__Note:__ You can skip STEP 2($ sudo npm install -g gulp) if you already did install the gulp command line plugin/tool in any prior project with or without any relation to this boilerplate*

This will install all the things you need for running the gulp-tasks automatically.

> *__Note:__ As stated prior. You need to have a running node.js and ruby along with npm. Please install this before setting up START in your project's directory. Ruby comes default in most systems nowadays so I believe you do have that already.*

### Finally Build and launch

Now you can start developing your site. Therefore use the __GruntJS__ default task _(type in your Terminal and press ENTER)_:

```bash
$ gulp
```

This will create a __dist__ folder with a distribution application css and js files. All your files should point to thhis ./dist folder for you custom coded files that are in './js' prior to compilation

## Contributing
In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
__Version: 1.1.0__

## License
Copyright (c) 2014 __Eugene Mutai__
Licensed under the [MIT license](http://mit-license.org/)

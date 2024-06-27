# CourseAssembler.com

Hello. This is what remains of CourseAssembler.com. It's the source code, which you might be able to massage into a working system for yourself. Maybe. This was production code up until the day we had to wrap up the company.

## how it worked

Users would hit www.courseassembler.com and use the store to buy a licence key. This used *FastSpring* as a payment gateway provider. Users could purchase a subscription or X-days worth of access. This would create a licence key in a database with a start and end date on it.

The front-end public website uses a simple router for loading pages dynamically. It has no WordPress or management tool, it's mostly files in folders that are dynamically served using simple routers and file-system readers.

Launching the app just opened the www.courseassembler.com/app/?hash=KEY path which would run the javascript app in your browser. It was designer with desktop-browsers in mind ONLY.

The app would call out to other back end services to do the grunt work, but most of the execution and file storage is clientside.

## Code

CourseAssembler was a web site that allows you to upload Office-style documents and download a SCORM-ready elearning package (also H5P). It does this by utilising services to convert the content to HTML, then splits the documents into multiple pages, adding menus and code to handle completion, add per-page audio or video, add quizzes, markdown pages, etc. It can maintain the video/audio in PowerPoint files on the conversion output but not transitions/effects.

It ceased commercial operation in 2024. The entire source code is available here and in related repositories https://github.com/Coursesuite.

It has a PHP based backend which in turn connects to services via api (mostly CloudConvert, NoEmbed, and internal services). It was running happily on php 7.4 on apache/mariadb. Hasn't been tested on php 8 or above.

You could toss away most of the 'public' folder and just keep the app, and modify the `load.php` file to remove any need for licence keys. I think the licence key verifier might have a code switch in it for turning it off.

## coding philosophy

This grew out of an idea from 2013, which got more complicated over time, without ever having the time to do a proper ground-up rewrite. It was initially a component of ['coursesuite.ninja'](https://github.com/Coursesuite/coursesuite.ninja) which offered white-labelling of the tool and integration with direct-to-moodle course creation (which in turn used https://github.com/Coursesuite/coursesuite_repository). When code files got too big, I broke them up into multiple scripts. I used a self-registering namespace because I couldn't guarentee the order of loading and functions need to load in a particular order and `import` or `node_modules` wasn't even a thing when I started the project, let alone tree-shaking compilers.

I did want to build something myself though, levarage open-source third party code like JSZip, localForage, color-theif, mic-recorder-to-mp3, fix-webm-duration and so on. The majority of the code is my own fault, or otherwise credited in comments where possible.

The javascript runtime mostly works by actioning a function when a click happens, so there is a GLOBAL click handler registered against document, and a function `performAction()` which looks at the element and its data-* attributes to decide what to do. Having handlers bound all over the place and templates within code like you get with jsx is kinda horrible really. So I take the 'handle everything in one place' approach. Plugins can just register new actions which are then automatically executed within the plugin code. It's a mess, but it was my mess and we all knew how it hung together (most of the time).

functions have long, elaborate names, even in anonymous functions or within promise chains, because it makes debugging so much easier. 'anonymous function X crashes? No idea. function package_fetch_api_buffer crashes? Well, you have somewhere you can find. In some cases the private internal functions inside closures have fun names whereas their public accessors have structured namespaced names. You have to kind of go with it.

## random notes

It is predominantly a frameworkless front-end javascript app that leverages LocalStorage on the browser to make the experience feel more responsive and real-time.

This is NOT a Node application, nor does it use node_modules, and **absolutely not** a Vue/React app (blegh!). The code was predominantly developed in ES5 and has limited worker threads and ES6-style imports.

It uses the Handlebars templating system with a combination of pre-compiled templates, and runtime templating.

The `index.php` searches for plugins matching a naming pattern, and includes them automatically. Plugins need to follow a coding pattern to self-register. Some plugins add buttons to the interface, others are core features. It's not great.

## external references, services

CloudConvert does most of the heavy lifting here (paid service). It converts many formats to PDF, then converts the PDF to HTML. The clide-side javascript code then splits the pages, strips out a bunch of unneccesary crap, injects its own code for page scaling and colour themeing, etc.

The PHP and Javascript reference connections to the https://github.com/Coursesuite/backend.courseassembler.com, https://github.com/Coursesuite/feedback.courseassembler.com and https://github.com/Coursesuite/warehouse.courseassember.com projects for file storage / conversion workflows. I'd begin trying to proxy all requests through PHP but that's not finished/consistent.

You will need your own CloudConvert API key, which is used within the 'backend'. 

## database

there isn't much going on with the database (mariadb). It's just SQL and really just does a bit of internal logging and stores a bit of information for licence key verification. This really doesn't need to exist if you aren't doing licence key stuff.

```sql
# ************************************************************
# Sequel Ace SQL dump
# Version 20067
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: 127.0.0.1 (MySQL 5.5.5-10.3.39-MariaDB-0+deb10u2)
# Database: ca_licence
# Generation Time: 2024-06-27 00:51:39 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table backend
# ------------------------------------------------------------

CREATE TABLE `backend` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `added` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `licencekey` varchar(40) NOT NULL,
  `fileid` varchar(40) NOT NULL,
  `message` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



# Dump of table conversions
# ------------------------------------------------------------

CREATE TABLE `conversions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `timetaken` int(10) unsigned NOT NULL COMMENT 'endtime-starttime',
  `filename` varchar(255) NOT NULL DEFAULT '',
  `extension` varchar(255) NOT NULL DEFAULT '',
  `size` int(10) unsigned DEFAULT NULL,
  `minutes` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;



# Dump of table licence
# ------------------------------------------------------------

CREATE TABLE `licence` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `product` varchar(50) NOT NULL DEFAULT '',
  `reference` varchar(25) DEFAULT NULL,
  `store` varchar(255) DEFAULT NULL,
  `testmode` tinyint(3) unsigned NOT NULL DEFAULT 0,
  `licencekey` varchar(40) NOT NULL DEFAULT '0',
  `newsletter` tinyint(3) unsigned NOT NULL DEFAULT 1,
  `starts` bigint(20) unsigned NOT NULL,
  `ends` bigint(1) unsigned NOT NULL,
  `times` bigint(20) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



# Dump of table log
# ------------------------------------------------------------

CREATE TABLE `log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `method_name` varchar(50) DEFAULT '',
  `digest_user` varchar(255) DEFAULT '',
  `added` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `message` varchar(255) DEFAULT '',
  `param0` text DEFAULT NULL,
  `param1` text DEFAULT NULL,
  `param2` text DEFAULT NULL,
  `param3` text DEFAULT NULL,
  `param4` text DEFAULT NULL,
  `param5` text DEFAULT NULL,
  `param6` text DEFAULT NULL,
  `param7` text DEFAULT NULL,
  `param8` text DEFAULT NULL,
  `param9` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;



# Dump of table manifest
# ------------------------------------------------------------

CREATE TABLE `manifest` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `licencekey` varchar(40) NOT NULL,
  `added` timestamp NOT NULL DEFAULT current_timestamp(),
  `template` varchar(50) DEFAULT NULL,
  `theme` varchar(50) DEFAULT NULL,
  `description` varchar(10) DEFAULT NULL,
  `copyright` varchar(10) DEFAULT NULL,
  `analytics` varchar(10) DEFAULT NULL,
  `navlock` varchar(10) DEFAULT NULL,
  `rule` varchar(10) DEFAULT NULL,
  `api` varchar(10) DEFAULT NULL,
  `pages` varchar(10) DEFAULT NULL,
  `split` varchar(10) DEFAULT NULL,
  `audio` varchar(10) DEFAULT NULL,
  `video` varchar(10) DEFAULT NULL,
  `cursor` varchar(10) DEFAULT NULL,
  `attachment` varchar(10) DEFAULT NULL,
  `settings` varchar(50) DEFAULT NULL,
  `kind` text DEFAULT NULL,
  `format` text DEFAULT NULL,
  `type` text DEFAULT NULL,
  `manifest` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



# Dump of table statistics
# ------------------------------------------------------------

CREATE TABLE `statistics` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `stat` varchar(50) NOT NULL,
  `total` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



# Dump of table validate
# ------------------------------------------------------------

CREATE TABLE `validate` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `licencekey` varchar(40) NOT NULL DEFAULT '',
  `date` bigint(20) unsigned NOT NULL,
  `valid` int(1) NOT NULL DEFAULT 0,
  `source` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
```

## developing / deploying code

I developed this on the php built-in webserver just serving the `src/` folder, then would run a command-line when I wanted to compress/compile/deploy it to the `app` folder, then manually sftp that to the production server. Pretty shoddy, no protections, you could easily do better.

the production app runs out of the `/public/app` folder.

the development code runs out of the `/src` folder.

to compile templates, you need `handlebarsjs` installed on the command line (use npm), and `uglify-js` for compressing js/css.

run `compile_templates.sh' from the `src` folder to compile handlebars when you're testing, and `compile_scripts.sh` when you're deploying. It overwrites stuff.

## more random notes

If you want to understand how this works, you really have to read through the javascript (sorry). I'd start with `/src/js/app.lib.js` and look at the `performAction()` function - this is where almost everything in the interface/plugins begins its execution path.

Files are internally stored in Local Storage. This uses the localForage system for turning saving and loading into promises, so there are sometimes async-code gotchas you have to worry about, like when code wants to modify the outputs of a page to inject css to change the background colour - the load, verify, modify, save process might be executing after the page that is visible has changed by another process (such as optimisation or file conversion).

Previewing, internally, is pretty crazy. There's no 'file system' so resources like scripts/styles/images/videos must all be inlined. This means some HTML pages can end up being hundreds of megabytes, and so are served using blob links back to the LocalStorage provider. It's about as optimal as I could make it, but still uses heaps of runtime browser memory. Templates ask a special PHP file to read the template that is selected, take the portion of the runtime HTML that represents the outputs of the file conversion, and shim them into a template that is in turn injected client-side. The colours/theme stuff and SCORM engine stuff are all dynamically injected to each page on-demand during preview and download. This way new templates can be built without having to edit any core courseassembler code. There's a repo for templates at https://github.com/Coursesuite/courseassembler-templates .

The code for downloading the course will really test your brain. The inlined scripts/styles/images/videos etc are hashed and relinked at time of download, all in async code. Images might also be optimised (e.g. large PNG files used as background images in converted powerpoint files are converted to JPG using a javascript service worker - and the resulting HTML file then patched to reference the new file - all in async code within a promise as the file is packed into the final zip). There is this massive code split for doing the same thing one way for scorm and another way for imscp - it's super ugly and I dont think the imscp thing was ever used after about 2016 anyway, so that could all probably go. The download code also supports loading an external zip file containing templates for the output which are read and compiled at runtime and used to output the template outputs into, without unpacking the whole zip file in memory - again something that is really rarely used and could probably be removed. When reading the code, it's basically a huge promise then chain so it executes in the order of the smallest workload to the largest workload.

The QuizBuilder is a crazy contraption too. It's a single-page application itself that draws a multi-page quiz based on a JSON file. The JSON file is built using a different single-page edit engine that itself generates the runtime engine on-demand. The edit engine has its own compiler - `/src/plugins/QuizBuilder/src/compile.bash' and its own readme which will probably confuse you even more.

## Support, Licence etc

MIT licence.

CourseAssembler.com stopped being solvent in 2024, so there's nobody working on this anymore. You can raise issues to ask questions, I'll try to answer them if and when I get time.

### Oh SCORM.

Have you ever [googled it](https://lmgtfy.app/?q=SCORM+definition)? There are endless *explainers* that throw diagrams and terminology at you, generally leaving most people more confused. Schemas? XML? XSDs? What even are these things? You **don't** even need to know.

SCORM is a standard in e-learning that really just lets content be reused. Packages that are SCORM-compatible can be used on more than one LMS, so you aren't locked in to particular software in order to show that content to your learners. When you need to make content 'SCORM compatible', you deal in 'packages'. Which is really a zip file containing your files and some other special XML and Javascript files that identify how the content inside the zip file will work. Do you need to know any of this? **No**, probably not. There is more going on "under the hood" in SCORM packages such as rules or conditions about how pages in the package contribute to the completion of the package, but for the most part it's safe to ignore all that.

CourseAssembler will create packages that are SCORM compatible. This means any LMS that supports SCORM revision 1.2 or revision 2004 (terrible version numbering!) will accept pages you create with Course Assembler. Furthermore, you can [specify how learners get their completion](/docs/?url=./04.publishing-your-package/01.metadata/docs.md) all without knowing "what SCORM is".

### Yes, it's compatible.

If your LMS says it supports `SCORM 2004` then pick that option when you export your package. If you just want the files and will not be hosting the package on a LMS (perhaps you'll be embedding it on your Wordpress site), you can pick the Standalone option.

We support:

* SCORM 1.2
* SCORM 2004
* IMS Content Package (with caveats)
* Standalone (no IMS or SCORM, just plain HTML)

At this time, we do not support xAPI, but have it on the roadmap.

### HTML5

You sometimes still hear the term HTML5 being bandied about. Is HTML5 the same as SCORM? What even is HTML5 and is it any different to HTML? Well, yes there are differences, but nothing you need to know. HTML5 just means "web pages". Formats like PowerPoint and OpenOffice don't just work inside web browsers - you need to have software to open and recognise those formats. But HTML5 *is* the language of browsers, so CourseAssembler converts all your document and slide formats to HTML5 so it "just works" in browsers.

### xAPI

If you have searched for SCORM recently you will have probably heard the term xAPI or "Tin Can". These are "replacements" to SCORM - except they aren't really. They are ways of recording that learners "did stuff". SCORM defined that "stuff" was learning content and it gave you a score and a completion. xAPI is more vague. It's not even explicitly for learning at all, even though that's where it is mostly used. xAPI doesn't have as much support in LMS's as SCORM.

xAPI "Does Stuff" ? It can record a user clicking a link. Or scrolling the page. Or ticking three boxes, hopping around on one leg, and spinning their ipad around seven times anti-clockwise. If the programmer handles it. None of this might represent a learning outcome. xAPI records information about actions the users can do, but doesn't necessarily inform any service about scores or completions. It evolvede from SCORM's standards and internal workings, but it is not really the same thing.


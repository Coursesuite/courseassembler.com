---
title: 'SCORM settings'
taxonomy:
    category:
        - docs
        - document-ninja
visible: true
---

The SCORM completion status (stored in `cmi.core.lesson_status`) is initially set to not-attempted and then set to incomplete when pages load.

After the media starts playing and during other events (buffering, pausing, end reached), the SCORM cmi.core.lesson_location is set to the number of seconds played.

When the media plays past the location specified in the completion, `cmi.core.lesson_status` is set to completeted, and the core score fields are set to the percentage required for completion.

second; the status is only set to completed, because of ambiguity in the SCORM API (and buggy implementations in some popular LMS's...)

It's expected learners might close the package and return in another session, hence `cmi.core.exit` is initially set to suspend, and cleared apon course completion. A user who exits and returns should resume playback at the point they left off - thanks to `cmi.core.lesson_location`.
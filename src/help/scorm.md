The SCORM completion status (stored in `cmi.core.lesson_status`) is initially set to **not-attempted** and then set to **incomplete** when pages load.

SCORM `cmi.core.lesson_status` statuses (passed / failed) are also not used; the status is only set to **completed**, because of ambiguity in the SCORM API (and buggy implementations in some popular LMS's...)

It's expected learners might close the package and return in another session, hence `cmi.core.exit` is initially set to *suspend*, and cleared apon course completion.

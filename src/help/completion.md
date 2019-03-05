In this simplified packaging tool, we don't track individual pages in SCORM as *interactions* or *objectives* The `cmi.objectives.N.status` and `cmi.interactions.N` values are not set.

Completion is calculated based on the time spent on each page. Normally this means a page is marked as complete after the learner has viewed the page for at least 1 second. In case of Vimeo, YouTube or SoundCloud content, this completion takes place after a specified point on those media objects instead. Time spent data for each page is stored in the `cmi.suspend_data` field (in JSON format).

The `cmi.core.score.raw` is always set to the percentage of pages *completed*. So in a 10 page course, if the learner views and completes 8 pages, their score will be 80%. This calculation is performed and saved during each page navigation.

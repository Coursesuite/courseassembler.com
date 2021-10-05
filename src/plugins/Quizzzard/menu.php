  <div class="flex-shrink-0 p-3 bg-white" style="width: 280px;">
    <a href="?fileid=<?php echo $fileid;?>" class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
      <span class="fs-5 fw-semibold">Quizzzard</span>
    </a>
    <ul class="list-unstyled ps-0">
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#settings-collapse" aria-expanded="true">
          Quiz Settings
        </button>
        <div class="collapse show" id="settings-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#settings-intro" class="link-dark rounded">Intro page</a></li>
            <li><a href="#settings-results" class="link-dark rounded">Results page</a></li>
            <li><a href="#settings-labels" class="link-dark rounded">Labels</a></li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#section-1" aria-expanded="false">
          Section 1
        </button>
        <div class="collapse" id="section-1">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#section-1-settings" class="link-dark rounded">Settings</a></li>
            <li><a href="#section-1-question-1" class="link-dark rounded">Question 1</a></li>
            <li><a href="#section-1-question-2" class="link-dark rounded">Question 2</a></li>
            <li><a href="#section-1-question-3" class="link-dark rounded">Question 3</a></li>
            <li><a href="#section-1-question-add" class="link-dark rounded">+ Add Question</a></li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <button class="btn btn-plus align-items-center rounded">
          <a href="#section-add">Add a section</a>
        </button>
      </li>
      <li class="border-top my-3"></li>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#theme-collapse" aria-expanded="false">
          Appearance
        </button>
        <div class="collapse" id="theme-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#theme-1" class="link-dark rounded">Formal</a></li>
            <li><a href="#theme-2" class="link-dark rounded">Casual</a></li>
            <li><a href="#theme-3" class="link-dark rounded">Bright</a></li>
            <li><a href="#theme-4" class="link-dark rounded">Chunky</a></li>
            <li><a href="#theme-5" class="link-dark rounded">Custom</a></li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
import React from 'react'

export default function RecipesFilter() {
  return (   <div>
      <div class="input-group mb-3">
  <span class="input-group-text" id="basic-addon1">@</span>
  <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
</div>

      <div class="input-group">

  <input type="text" class="form-control" aria-label="Text input with segmented dropdown button"/>

  <button type="button" class="btn btn-outline-secondary">Action</button>

  <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">

    <span class="visually-hidden">Toggle Dropdown</span>

  </button>

  <ul class="dropdown-menu dropdown-menu-end">

    <li><a class="dropdown-item" href="#">Action</a></li>

    <li><a class="dropdown-item" href="#">Another action</a></li>

    <li><a class="dropdown-item" href="#">Something else here</a></li>


    <li><a class="dropdown-item" href="#">Separated link</a></li>

  </ul>

</div>
    </div>
  )
}

<template>
  <section>
    <div class="container py-5">
      <h1 class="text-center">Обратная связь</h1>
      <div class="row justify-content-center">
        <div class="col-12 col-sm-6 col-md-4">
          <form>
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Name">
            </div>
            <div class="form-group">
              <input type="email" class="form-control" placeholder="Email">
            </div>
            <div class="form-group">
              <textarea class="form-control" rows="6" placeholder="Subject"></textarea>
            </div>
            <button type="submit" class="btn btn-block btn-success text-uppercase">Send</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'feedback'
}
</script>

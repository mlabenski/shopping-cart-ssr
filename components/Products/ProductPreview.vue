<template>
  <nuxt-link :to="postLink" class="post-preview">
    <article>
      <div
        class="post-thumbnail"
        :style="{backgroundImage: 'url(' + image + ')'}"
      />
      <div class="post-content">
        <h1>{{ name }}</h1>
        <h1>$ {{ price }}</h1>
        <p>{{ id }}</p>
        <p>{{ descShort }}</p>
      </div>
    </article>
  </nuxt-link>
</template>

<script>
export default {
  name: 'ProductPreview',
  props: {
    id: {
      type: Number,
      default: 0
    },
    storeid: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: ''
    },
    descShort: {
      type: String,
      default: ''
    },
    visible: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      default: 0
    },
    image: {
      type: String,
      default: ''
    }
  },
  computed: {
    postLink () {
      return '/store/' + this.storeid + '/products/' + this.id
    }
  }
}
</script>

<style scoped>
.post-preview {
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px #ccc;
  background-color: white;
  width: 90%;
}

a {
  text-decoration: none;
  color: black;
}

@media (min-width: 850px) {
  .post-preview {
    width: 400px;
    margin: 10px;
  }
}

.post-thumbnail {
  width: 100%;
  height: 200px;
  background-position: center;
  background-size: cover;
}

.post-content {
  padding: 10px;
  text-align: center;
}

a:hover .post-content,
a:active .post-content {
  background-color: #ccc;
}
</style>

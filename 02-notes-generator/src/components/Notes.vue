<template>
  <div>
    <form class="note-input" @submit.prevent>
      <label>
        Title <br />
        <input v-model="newNote.title" type="text" placeholder="Your title" />
      </label>
      <label>
        Description <br />
        <textarea
          v-model="newNote.description"
          placeholder="Your description"
        ></textarea>
      </label>
      <button @click="saveNote(newNote)">Save</button>
    </form>
    <section class="notes">
      <article class="card" v-for="(note, index) in notes" :key="note.message">
        <div class="card__header">
          <h3>{{ note.title }}</h3>
          <button aria-label="remove note" @click="removeNote(index)">X</button>
        </div>
        <p>{{ note.description }}</p>
      </article>
    </section>
  </div>
</template>

<script>
const factoryNote = () => ({
  title: "",
  description: ""
});

export default {
  name: "Notes",
  data: () => ({
    newNote: factoryNote(),
    notes: []
  }),
  methods: {
    saveNote: function(newNote) {
      this.notes.push(newNote);
      this.newNote = factoryNote();
    },
    removeNote: function(indexToDelete) {
      this.notes = this.notes.filter((note, index) => index !== indexToDelete);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.note-input {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  button {
    width: 200px;
    margin: 0.5em 0;
  }
  label {
    margin: 0.5em 0;
  }
}

.notes {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 1em;
}
$textSecondary: #999;
.card {
  border: solid 1px $textSecondary;
  width: 200px;
  margin: 0.25em;
  box-shadow: 1px 1px 1px 1px $textSecondary;
  .card__header {
    display: flex;
    justify-content: space-between;
    h3 {
      flex-grow: 1;
    }
  }
}
</style>

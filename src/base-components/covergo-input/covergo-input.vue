<template>
<div class="covergo-input">
  <label class="covergo-input__label">{{ labelText }}</label>
  <input
    class="covergo-input__input-control"
    v-bind="$attrs"
    v-model="localValue"
    v-on="mergedListeners"
  />
</div>
</template>

<script>
// Utils
export default {
  inheritAttrs: false,

  props: {
    value: {
      type: [String, Number],
      required: false,
    },
    labelText: {
      type: String,
      required: false,
    }
  },

  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      }
    },

    mergedListeners() {
      // `Object.assign` merges objects together to form a new object
      const listeners = Object.assign(
        {},
        // We add all the listeners from the parent
        this.$listeners,
        // Then we can add custom listeners or override the
        // behavior of some listeners.
        {}
      )
      delete listeners.input
      return listeners
    },
  },
}
</script>

<style lang="scss" scoped>
.covergo-input {
  display: inline-flex;
  flex-direction: column;

  .covergo-input__label {
    margin-bottom: 6px;
  }

  .covergo-input__input-control {
    box-sizing: border-box;
    height: 40px;
    padding: 10px;
    border: 1px solid #89898961;
    border-radius: 5px;
  }
}
</style>
<template>
  <div class="covergo-radio">
    <input
      class="covergo-radio__radio-control"
      type="radio"
      v-bind="$attrs"
      :checked="checked == $attrs.value"
      v-on="mergedListeners"
    />
    <label :for="$attrs['id']" class="covergo-radio__label">{{ labelText }}</label>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,

  model: {
    prop: 'checked',
    event: 'input'
  },

  props: {
    checked: {
      type: [Number, String],
      required: true,
    },
    labelText: {
      type: String,
      required: false,
    },
  },

  computed: {
    mergedListeners() {
      // `Object.assign` merges objects together to form a new object
      const listeners = Object.assign(
        {},
        // We add all the listeners from the parent
        this.$listeners,
        // Then we can add custom listeners or override the
        // behavior of some listeners.
        {
          change: event => this.$emit('input', event?.target?.value)
        }
      )
      delete listeners.input
      return listeners
    },
  },
}
</script>

<style lang="scss" scoped>
.covergo-radio {
  .covergo-radio__radio-control {
    margin-right: 5px;
  }

  .covergo-radio__label,
  .covergo-radio__radio-control {
    cursor: pointer;
  }

  input[disabled],
  input[disabled] ~ .covergo-radio__label {
    cursor: not-allowed;
  }
}
</style>
<template>
  <div class="covergo-select">
    <label class="covergo-select__label">{{ labelText }}</label>
    <select 
      class="covergo-select__select-control" 
      v-bind="$attrs"
      :value="value"
      v-on="mergedListeners"
    >
      <slot name="options" :options="options">
        <option 
          :key="option.id" 
          :value="option.id" 
          v-for="option in options"
        >{{ option.name }}</option>
      </slot>
    </select>
  </div>
</template>

<script>
// Utils
const _optionValdiator = (option = {}) => (
  Object.prototype.hasOwnProperty.call(option, 'id') &&
  Object.prototype.hasOwnProperty.call(option, 'name')
)

export default {
  inheritAttrs: false,

  props: {
    value: {
      type: [Number, String],
      required: true,
    },
    labelText: {
      type: String,
      required: false,
    },
    options: {
      type: Array,
      default: () => [],
      validator: propValue => propValue?.length === 0 || propValue.every(option => _optionValdiator(option))
    }
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
.covergo-select {
  display: inline-flex;
  flex-direction: column;

  .covergo-select__label {
    margin-bottom: 6px;
  }
  
  .covergo-select__select-control {
    height: 40px;
    padding: 5px 10px;
    border: 1px solid #89898961;
    border-radius: 5px;
  }
}
</style>

<template>
  <button
    type="button"
    :class="[
      'covergo-button',
      {
        'covergo-button--black': variant === 'black',
        'covergo-button--white': variant === 'white',
      }
    ]"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script>
// Utils
const _variantValdiator = variant => ['black', 'white'].includes(variant)

export default {
  props: {
    variant: {
      type: String,
      required: false,
      validator: _variantValdiator 
    }
  },
}
</script>

<style lang="scss" scoped>
.covergo-button {
  text-align: center;
  padding: 10px 15px;
  border: 1px solid black;
  border-radius: 5px;
  transition: all .3s;
  cursor: pointer;

  &:hover {
    opacity: .6;
  }

  &.covergo-button--white {
    color: black;
    background-color: white;
  }

  &.covergo-button--black {
    color: white;
    background-color: black;
  }
}
</style>
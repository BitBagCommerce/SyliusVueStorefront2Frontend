<template>
  <div>
    <p>
      {{ address.firstName }} {{ address.lastName }} <br />
      {{ address.street }} <br />
      {{ address.city }} {{ address.postcode }} <br />
      {{ address.countryCode
      }}{{ address.provinceName ? `,  ${address.provinceName}` : '' }}
      <br />
      <span v-if="address.phoneNumber" class="phone">
        {{ address.phoneNumber }}</span
      >
    </p>
  </div>
</template>

<script>
export default {
  name: 'UserAddress',
  props: {
    address: {
      type: Object,
      required: true,
    },
  },
};
</script>

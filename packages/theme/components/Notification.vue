<template>
  <transition-group tag="div" class="notifications" name="slide-fade">
    <SfNotification
      v-for="notification in notifications"
      :key="notification.id"
      :message="notification.message"
      :action="notification.action && notification.action.text"
      :type="notification.type"
      @click:action="notification.action && notification.action.onClick()"
      visible
    >
      <template #icon v-if="notification.icon">
        <SfIcon :icon="notification.icon" color="white" />
      </template>
      <template #close>
        <SfButton
          @click="notification.dismiss"
          aria-label="Close notification"
          class="sf-button--pure sf-notification__close"
        >
          <SfIcon icon="cross" color="white" />
        </SfButton>
      </template>
    </SfNotification>
  </transition-group>
</template>

<script>
import { SfNotification, SfIcon, SfButton } from '@storefront-ui/vue';
import { useUiNotification } from '~/composables';

export default {
  name: 'Notification',
  components: {
    SfNotification,
    SfIcon,
    SfButton,
  },
  setup() {
    const { notifications } = useUiNotification();

    return {
      notifications,
    };
  },
};
</script>

<style scoped lang="scss">
.notifications {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9;
  @include for-desktop {
    top: 25px;
    left: 50%;
    bottom: auto;
    right: auto;
    width: 450px;
    transform: translateX(-50%);
  }
}

@include for-mobile {
  .sf-button {
    top: 0;
    right: 0;
    height: 40px;
    width: 40px;
    padding: 10px;

    svg,
    span {
      width: 100%;
      height: 100%;
    }
  }
}

.sf-notification {
  --notification-padding: var(--spacer-sm) var(--spacer-sm);
  max-width: 100%;
  margin: var(--spacer-xs) auto 0 auto;
  @include for-mobile {
    --notification-border-radius: 5px;
    --notification-max-width: 100%;
    --notification-font-size: var(--font-size--sm);
    --notification-font-family: var(--font-family--primary);
    --notification-font-weight: var(--font-weight--normal);
    --notification-padding: var(--spacer-base) var(--spacer-lg);
    --notification-box-shadow: 0 4px 25px 2px rgba(var(--c-dark-base), 0.1);
  }
  @include for-desktop {
    margin: 0 0 var(--spacer-xs) 0;
  }

  &:first-child {
    margin-top: 0;
    @include for-mobile {
      --notification-border-radius: 0 0 5px 5px;
    }
  }
}
.slide-fade-move,
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s;
  bottom: auto;
}
.slide-fade-enter {
  transform: translateY(-100%);

  @include for-desktop {
    transform: translateY(40px);
    opacity: 0;
  }
}
.slide-fade-leave-to {
  transform: translateY(60px);
  @include for-desktop {
    opacity: 0;
  }
}

.slide-fade-leave-active {
  position: absolute;
  left: 0;
  right: 0;
}
</style>

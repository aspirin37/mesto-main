<template>
  <div>
    <table class="w-100 notifications-table">
      <tr>
        <th><h4>{{$t('notifications.title')}}</h4></th>
        <td class="notifications-table__type text-center">
          <div class="notifications-table__type-block">
            <img src="@/assets/icons/push-notif.svg" alt="push">
            <p class="text-muted small">Push</p>
          </div>
        </td>
        <td class="notifications-table__type text-center">
          <div class="notifications-table__type-block">
            <img src="@/assets/icons/sms-notif.svg" alt="sms">
            <p class="text-muted small">SMS</p>
          </div>
        </td>
        <td class="notifications-table__type text-center">
          <div class="notifications-table__type-block">
            <img src="@/assets/icons/email-notif.svg" alt="email">
            <p class="text-muted small">Email</p>
          </div>
        </td>
      </tr>
      <tr class="notifications-table__tr">
        <th><span>Создан новый заказ</span></th>
        <td class="text-right">
          <label class="checker-toggle align-middle">
            <input type="checkbox" class="checker-toggle__input">
            <span class="checker-toggle__outer"></span>
          </label>
        </td>
        <td class="text-right">
          <label class="checker-toggle align-middle">
            <input type="checkbox" class="checker-toggle__input">
            <span class="checker-toggle__outer"></span>
          </label>
        </td>
        <td class="text-right">
          <label class="checker-toggle align-middle">
            <input type="checkbox" class="checker-toggle__input">
            <span class="checker-toggle__outer"></span>
          </label>
        </td>
      </tr>
      <tr class="notifications-table__tr">
        <th><span>Смена статуса заказа</span></th>
        <td class="text-right">
          <label class="checker-toggle align-middle">
            <input type="checkbox" class="checker-toggle__input">
            <span class="checker-toggle__outer"></span>
          </label>
        </td>
        <td class="text-right">
          <label class="checker-toggle align-middle">
            <input type="checkbox" class="checker-toggle__input">
            <span class="checker-toggle__outer"></span>
          </label>
        </td>
        <td class="text-right">
          <label class="checker-toggle align-middle">
            <input type="checkbox" class="checker-toggle__input">
            <span class="checker-toggle__outer"></span>
          </label>
        </td>
      </tr>
      <tr class="notifications-table__tr">
        <th><span>Изменение данных аккаунта</span></th>
        <td class="text-right">
          <label class="checker-toggle align-middle">
            <input type="checkbox" class="checker-toggle__input">
            <span class="checker-toggle__outer"></span>
          </label>
        </td>
        <td class="text-right">
          <label class="checker-toggle align-middle">
            <input type="checkbox" class="checker-toggle__input">
            <span class="checker-toggle__outer"></span>
          </label>
        </td>
        <td class="text-right">
          <label class="checker-toggle align-middle">
            <input type="checkbox" class="checker-toggle__input">
            <span class="checker-toggle__outer"></span>
          </label>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'notifications-settings',
  data () {
    return {
    }
  },
  components: {
  }
}
</script>

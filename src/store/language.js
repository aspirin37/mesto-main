import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'
import store from '/'

Vue.use(Vuex)

const language = new Vuex.Store()

Vue.use(vuexI18n.plugin, language)

const translationsRu = {
  'alias': 'ru',
  'lang': 'Русский',
  'letters': ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К', 'Л', 'М'],
  'get-courier': 'Заказать курьера',
  'new-order': 'Новый заказ',
  'title': 'Курьерская служба «Место»',
  'about': '«Место» — это мобильное приложение и веб-сервис для доставки посылок. \nПросто установите приложение, и Ваша посылка будет доставлена из точки А в точку Б максимально комфортно, безопасно и просто.',
  'for': 'за',
  'today': 'Сегодня, сразу же',
  'fave': 'Избранные адреса',
  'agreement': 'Пользовательское соглашение',
  'confidential': 'Политика конфиденциальности',
  'requisites': 'Реквизиты',
  'footer-text': 'Оформление заявок на сайте и их исполнение происходит круглосуточно',
  'order-number': 'Номер заказа',
  'price': 'Стоимость',
  'cancel': 'Отмена',
  'save': 'Сохранить',
  'yes': 'Да',
  'no': 'Нет',
  'signup': 'Регистрация',
  'signin': 'Вход',
  'signout': 'Выход',
  'order': {
    'created': 'Создан',
    'route': 'Маршрут',
    'status': 'Статус',
    'show-by': 'Показывать по',
    'payed': 'Оплачен',
    'not-payed': 'Не оплачен',
    'cancel-confirm': 'Вы уверены что хотите отменить заказ?',
    'weight': 'Вес',
    'description': 'Описание',
    'options': 'Опции',
    'photo': 'Фотографии',
    'sizes': 'Размер (Д x Ш x В)',
    'courier-data': 'Данные курьера',
    'cancel': 'Отменить заказ',
    'confirm': 'Подтвердить',
    'order-list': 'Список заказов',
    'make-pay': 'Оплатить'
  },
  'navbar': {
    'about': 'О сервисе',
    'corporate': 'Бизнесу',
    'couriers': 'Курьерам',
    'faq': 'Частые вопросы',
    'tariffs': 'Тарифы'
  },
  'sidebar': {
    'new': 'Новый заказ',
    'history': 'История заказов',
    'cards': 'Банковские карты',
    'fave': 'Избранные адреса',
    'support': 'Поддержка',
    'profile': 'Настройки'
  },
  'card': {
    'cvv-text': 'Три цифры на обратной стороне карты',
    'number': 'Номер карты',
    'name': 'Имя держателя',
    'add-this': 'Добавить эту карту',
    'adding': 'Добавление карты'
  },
  'favorite': {
    'my-addr': 'История адресов',
    'my-subtext': 'Список адресов, которые вы использовали в заказах ранее.',
    'fave-subtext': 'Добавляя адреса в избранные вы будете видеть их в первую очередь при заказе. Так же они автоматически синхронизируются с мобильными приложениями.',
    'no-fave': 'У вас еще нет избранных адресов'
  },
  'support': {
    'title': 'Заголовок',
    'created': 'Создан',
    'type': 'Тип',
    'status': 'Статус',
    'create': 'Новое обращение',
    'have-no': 'Обращений не найдено'
  },
  'profile': {
    'change-passw': 'Сменить пароль',
    'name': 'Имя',
    'middle-name': 'Отчество',
    'last-name': 'Фамилия'
  },
  'notifications': {
    'title': 'Настройка уведомлений'
  },
  'order-status': {
    '1': 'Заказ ожидает подтверждения',
    '2': 'Отказ от заказа',
    '3': 'Ожидает назначения курьера',
    '4': 'Курьер едет на адрес',
    '5': 'Курьер прибыл по адресу',
    '6': 'Курьер доставляет в пункт Б',
    '7': 'Доставлен',
    '8': 'Не был доставлен',
    '9': 'Ожидайте назначения курьера',
    '10': 'Ожидайте выезда курьера',
    '11': 'Курьер завершил задачу на адресе',
    '12': 'Отменен администратором',
    '13': 'Проблема'
  }
}

const translationsEn = {
  'alias': 'en',
  'lang': 'English',
  'letters': ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
  'get-courier': 'Order a courier',
  'title': 'Courier service «Mesto»',
  'about': '«Mesto» - is a mobile application and a web service for delivery of parcels. \nJust install the application, and your parcel will be delivered from point A to point B as comfortably, safely and simply as possible.',
  'for': 'for',
  'navbar': {
    'about': 'About',
    'corporate': 'For corporate',
    'couriers': 'For couriers',
    'faq': 'FAQ',
    'tariffs': 'Tariffs'
  },
  'content': 'This is some {type} content'
}

const translationsDe = {
  'alias': 'de',
  'lang': 'German',
  'letters': ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
  'get-courier': 'Kurier bestellen',
  'title': `Kurierdienst «Mesto»`,
  'about': '«Mesto» - eine mobile Anwendung und Web-Service für Pakete. \nInstallieren Sie einfach die App und Ihr Paket wird von Punkt A nach Punkt B so komfortabel, sicher und einfach geliefert werden.',
  'for': 'für',
  'navbar': {
    'about': 'Über uns',
    'corporate': 'Für Unternehmen',
    'couriers': 'Für Kuriere',
    'faq': 'FAQ',
    'tariffs': 'Tarife'
  }
}

Vue.i18n.add('en', translationsEn)
Vue.i18n.add('de', translationsDe)
Vue.i18n.add('ru', translationsRu)
Vue.i18n.set(store.state.language)

export default {}

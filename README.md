# Mesto 

## Обзор
Mesto - это фотохостинг, отображающий пользователю набор постов с фотографиями/изображениями их названиями и лайками.
Полное описание проекта можно посмотреть [здесь](https://github.com/YuryAmonsky/Project-Mesto-).  
В данной части выполнена верстка основной страницы и добавлена интерактивность.


## Основной функционал
 - загрузка списка постов с сервера,
 - редактирование профиля пользователя (Имя, описание, аватар)
 - добавление/удаление нового поста с фотографией места (пользователь может удалять только свои посты),
 - просмотр изображения в оригинальном размере,
 - возможность отмечать посты лайком.


## Используемые технологии.  
Верстка с помощью HTML5/CSS3/JavaScript(ES6+).  
Разметка выполнена по метологоии БЭМ, то есть состоит из различных обособленных блоков, включающих вложенные элементы.  

Данный метод позволяет:  
- сократить количество CSS-кода,
- быстро добавлять новые однотипные объекты, копируя разметку, для которой уже имеется описание стилей,
- легко перестраивать сайт, меняя расположение блоков,
- отдельные готовые блоки могут быть использованы на разных сайтах без значительных доработок.  
<p>
Дизайн сайта разработан в Figma, он является адаптивным, то есть расчитан под различные разрешения экранов
разнообразных устройств. Адаптивная верстка была выполнена в сочетании с "резиновой". Так при определенных разрешениях
экрана (брейкпоинтах) некоторые элементы меняют своё расположение, а в промежутках между брейкпоинтами, например при 
растягивании окна браузера происходит плавное растягивание элементов страницы.  
</p>
<p>
При создании сайта применялась флекс-бокс верстка и технология "Grid Layout", позволяющая позиционировать различные
блоки информации нужным нам образом. Для обеспечения адаптивности в CSS стилях использованы медиазапросы, а для 
резиновой верстки применялись относительные единицы измерения размеров элементов, а также различные функции для вычисления
размеров: calc(), min(), max().  
</p>
<p>
Поведение интерактивных элементов, таких как всплываещие окна реализованы с помощью JavaScript.
Используются концепции объектно-ориентированного программирования. Основные сущности описаны классами.  
</p>
<p>
Организовано взаимодействие с сервером через асинхронные запросы. Данные для элементов страницы берутся с сервера, 
при редактировании сохраняются на сервер. Используется RESTfull API.
</p>
<p>
Для сборки отдельных модулей и компонентов применялся webpack в сочетаниями с дополнительными пакетами и библиотеками (Babel, Core-js, PostCSS).
Это полволяет добиться уменьшения размеров конечных файлов, провести транспиляцию для совместимости кода со старыми версиями браузеров,  
гарантировать загрузку обновленных изображений с теми же именами файлов.
</p>

## Ссылки
**Демо**  
* https://yuryamonsky.github.io/mesto/

**Макет**  
* https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1  

**Другие репозитории проекта Mesto**
* Общий ReadMe   
  https://github.com/YuryAmonsky/Project-Mesto-
* Портирование на React.js  
   Репозиторий: https://github.com/YuryAmonsky/mesto-react  
   Демо: https://yuryamonsky.github.io/mesto-react/  
* Добавление функционала регистрации и авторизации пользователя.  
   Репозиторий: https://github.com/YuryAmonsky/react-mesto-auth  
   Демо: https://yuryamonsky.github.io/react-mesto-auth/  
* Создание собственного бекенда.  
   https://github.com/YuryAmonsky/express-mesto-gha  
* Фронтенд и бекенд. Деплой на публичный сервер.  
   https://github.com/YuryAmonsky/react-mesto-api-full  
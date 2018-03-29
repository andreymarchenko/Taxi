ymaps.ready(init);
let myMap;

function init(){
    myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 7
    });

    myPlacemark = new ymaps.Placemark([55.76, 37.64], {
        hintContent: 'Москва!',
        balloonContent: 'Столица России'
    });

    myMap.geoObjects.add(myPlacemark);

    // Строим маршрут из Королева в Красногорск через Химки и Мытищи,
// где Мытищи - транзитная точка. Устанавливаем координаты Красногорска.
    ymaps.route([
        'Королёв',
        { type: 'viaPoint', point: 'Мытищи' },
        'Химки',
        { type: 'wayPoint', point: [55.811511, 37.312518] }
    ], {
        mapStateAutoApply: true
    }).then(function (route) {
        route.getPaths().options.set({
            // В балуне выводим только информацию о времени движения с учетом пробок.
            balloonContentLayout: ymaps.templateLayoutFactory.createClass('{{ properties.humanJamsTime }}'),
            // Можно выставить настройки графики маршруту.
            strokeColor: '0000ffff',
            opacity: 0.9
        });
        // добавляем маршрут на карту
        myMap.geoObjects.add(route);
    });
}
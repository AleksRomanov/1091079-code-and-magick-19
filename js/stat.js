'use strict';

/* Задание переменных */

var CLOUD_COORDINATES = [100, 10];
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var GAP = 10;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var FONT_GAP = 16;
var SPACES_HEIGHTS = CLOUD_HEIGHT - ((FONT_GAP + GAP) + BAR_HEIGHT);

/* Функция, которая рисует облако */

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

/* Сортировка всех элементов по возрастанию */

var sortTimeByIncreasing = function (arr) {
  var myselfElement = '' + Math.round(arr[0]);

  arr.forEach(function (time, i) {
    if (time > myselfElement) {
      myselfElement = '' + Math.round(time);
    }
    arr[i] = '' + Math.round(time);
  });
  return myselfElement;
};

/* Определение нас, как 0 элемент массива (начальный) */

var makeYourselfFirst = function (arr) {
  arr.forEach(function (time, i) {
    if (time === 'Вы') {
      var swap = arr[0];
      arr[0] = arr[i];
      arr[i] = swap;
    }
  });
};

/* Отрисовываем текст победителя */

var renderWinTitle = function (ctx) {
  ctx.fillStyle = '#000';
  ctx.font = 'bold 16px PT Mono';
  var title = 'Ура вы победили!\nСписок результатов:';
  var SplittedTitles = title.split('\n');

  SplittedTitles.forEach(function (partTitle, i) {
    ctx.fillText(partTitle, CLOUD_COORDINATES[0] + 20, CLOUD_COORDINATES[1] + 30 + (GAP * 2) * i);
  });
};


var renderNamesText = function (ctx, i, name) {
  ctx.fillStyle = '#000';
  ctx.font = 'bold 16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText(name, CLOUD_COORDINATES[0] + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - FONT_GAP);
};

var renderTimeText = function (ctx, i, times, maxTime) {
  ctx.fillStyle = '#000';
  ctx.font = 'bold 16px PT Mono';
  ctx.fillText(times[i], CLOUD_COORDINATES[0] + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, SPACES_HEIGHTS - FONT_GAP + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime));
};

/* Отрисовка диаграммы результатов */

var renderGraphicAndText = function (ctx, names, times) {
  var maxTime = sortTimeByIncreasing(times);
  names.forEach(function (name, i) {
    renderNamesText(ctx, i, name);
    if (name === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var random = '' + (1 - Math.random());
      ctx.fillStyle = 'hsla(230, 86%, 48%,' + random + ')';
    }
    ctx.fillRect(CLOUD_COORDINATES[0] + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, SPACES_HEIGHTS + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime), BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
    renderTimeText(ctx, i, times, maxTime);
  });
};

/* Исполнение */

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_COORDINATES[0] + GAP, CLOUD_COORDINATES[1] + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_COORDINATES[0], CLOUD_COORDINATES[1], '#fff');
  ctx.strokeStyle = 'hsla(230, 86%, 48%, 1)';
  ctx.strokeRect(CLOUD_COORDINATES[0], CLOUD_COORDINATES[1], CLOUD_WIDTH, CLOUD_HEIGHT);
  renderWinTitle(ctx);
  makeYourselfFirst(names);
  renderGraphicAndText(ctx, names, times);
};

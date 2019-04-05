var canvas = document.getElementById('c1');
var ctx = canvas.getContext('2d');
var mas=[];//глобальный массив
var count=0;
var timer;
var stop = false;

canvas.onclick = function(event){//добавление события клика (event)
var x = event.offsetX;//при клике определяются координаты мыши
var y = event.offsetY;
console.log(x);
console.log(y);
x = Math.floor(x/10); //500 /10 = 50 ,координаты определяются при клике 
y = Math.floor(y/10); //500 /10 = 50
mas[y][x]=1;//заполнение игрового поля
console.log(mas);
drawField();//оттрисовка прямоугольника
}

function goLife(){//создание игрового поля
var n=50, m=50;//массив который имитирует игровое поле по горизонтали и вертикали
for (var i=0; i<m; i++){//цикл от 0 до 50
mas[i]=[];//пустой массив
for (var j=0; j<n; j++){//двумерный массив от 0 до 50
mas[i][j]=0;
		}
	}
}
goLife();

function drawField(){
ctx.clearRect(0, 0, 500, 500);
for (var i=0; i<50; i++){
for (var j=0; j<50; j++){
if (mas[i][j]==1){
ctx.fillRect(j*10, i*10, 10, 10);
			}
		}
	}
}

function startLife(){
if (stop===true) {
stop=false;
return;
}
//моделирование жизни
var mas2 = [];//переборный массив
for (var i=0; i<50; i++){//цикл от 0 до 50
mas2[i]=[];//пустой массив
for (var j=0; j<50; j++){//цикл от 0 до 50
var neighbors = 0;
if (mas[fpm(i)-1][j]==1) neighbors++;//вверхний сосед
if (mas[i][fpp(j)+1]==1) neighbors++;//сосед справа
if (mas[fpp(i)+1][j]==1) neighbors++;//нижний сосед
if (mas[i][fpm(j)-1]==1) neighbors++;//сосед слева
if (mas[fpm(i)-1][fpp(j)+1]==1) neighbors++;//проверка улсовий по диагонали (право и вверх)
if (mas[fpp(i)+1][fpp(j)+1]==1) neighbors++;//с права вниз
if (mas[fpp(i)+1][fpm(j)-1]==1) neighbors++;//слева вниз
if (mas[fpm(i)-1][fpm(j)-1]==1) neighbors++;//слева вверх
(neighbors==2 || neighbors==3) ? mas2[i][j]=1 : mas2[i][j]==0;//проверка:если число соседей равно 2 или 3  
		}
	}
	
mas = mas2;//новое состояние
drawField();
count++;//наращивание счетчика
document.getElementById('count').innerHTML = count;//присваивание счетчика
timer = setTimeout(startLife, 500);
}

function fpm(i){//функция которая принимает параметры

if(i==0) return 50;//если параметр равен 0 до возвращается 50(позволяет выйти за краевые условия)
else return i;//тогда возвращается введенное число
}
function fpp(i){//в эту функцию передается число 
if(i==49) return -1;//если i тогда возвращаем -1
else return i;
}
function stopLife () {
 stop = true;
}
document.getElementById('start').onclick = startLife;
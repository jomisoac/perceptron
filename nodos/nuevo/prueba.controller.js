/**
 * Created by Jose Soto
 * on 1/06/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.nodos.nuevo')
        .controller('pruebaController', pruebaController);

    function pruebaController() {
        var vm = this;
        var rate = 0.1;//tasa de aprendizaje
        var error = 1;
        var criterio_parada = 0.01;
        var w = [];
        var contenido = document.getElementById("contenido");
        var divmatriz = document.getElementById("matriz");
        var divsalidas = document.getElementById("salidas");
        var diventradas = document.getElementById("entradas");
        var divgrafica = document.getElementById("grafica");


        var inp = [
            {entrada: [1, 1], salida: 1},
            {entrada: [1, 0], salida: 0},
            {entrada: [0, 1], salida: 0},
            {entrada: [0, 0], salida: 0},
        ];
        vm.ejecutar = ejecutar;

        function ejecutar() {
            vm.myData = new Array();
            contenido.innerHTML = "";
            diventradas.innerHTML = "";
            divsalidas.innerHTML = "";
            divmatriz.innerHTML = "";
            divgrafica.innerHTML = "<div id='graph'></div>";
            error = 1;
            w = [];

            inicializarPesos(w, inp);
//for(var j = 0; j < inp.length; j++){
//             entreno meintras el error sea mayor que el criterio de parada
            contenido.innerHTML += "<br><b>PROCESO DE ENTRENAMIENTO</b><br><hr>";
            var p = 1;
            var prueba = [
                {entrada: [1, 1], salida: 1},
                {entrada: [1, 0], salida: 0},
                {entrada: [0, 1], salida: 0},
                {entrada: [0, 0], salida: 0},
            ];
            while (error >= criterio_parada) {
                var resultados = entrenamiento(w, inp);
                error = resultados['error']
                contenido.innerHTML += "<hr>";
                contenido.innerHTML += "<br><b> INTERACCIÓN " + (p) + " </b><br><hr>";
                contenido.innerHTML += "<br>";
                contenido.innerHTML += "<div style='text-align: center'><br><b>NUEVA MATRIZ DE PESO</b><br></div>";
                contenido.innerHTML += "  " + resultados['matrizActual'][0]+", &nbsp;&nbsp;"+resultados['matrizActual'][1] + " &nbsp;&nbsp;  ";
                contenido.innerHTML += "<br>";
                contenido.innerHTML += "<b>Nuevo umbral: " + resultados['matrizActual'][2]+ "<br>";
                contenido.innerHTML += "<br>";
                contenido.innerHTML += "<b>Valor de la funcion escalon: " + resultados['fEscalon']+ "<br>";
                contenido.innerHTML += "<b>Error lineal: " + resultados['error_actual']+ "<br>";
                contenido.innerHTML += "<b>Error del patron: " + error+ "<br>";
                vm.myData.push([p, resultados['error']]);
                p++;
                if(error <= criterio_parada){
                    contenido.innerHTML += "<br><b style='color:blue' >Se encontro el error maximo permitido: " + error + "<b>";
                    contenido.innerHTML += "<br><b> SOLUCION </b><br><hr>";
                    for (var i = 0; i < prueba.length; ++i) {
                        contenido.innerHTML += "entrada "+(i+1)+":> "+ prueba[i].entrada + " salida esperada:> " + prueba[i].salida + " resultado: " + activacion(obtenerSumaUmbral(w, prueba[i]));
                        contenido.innerHTML += "<br>";
                    }
                }else{
                    contenido.innerHTML += "<br><b style='color:red' >La solucion no esta dentro de esta iteracion <b>";
                }
            }
            graficar();
//}
            console.log("===")

            diventradas.innerHTML += "<div style='text-align: center'><b>Entradas</b><br></div>";
            for (var i = 0; i < prueba.length; ++i) {
                diventradas.innerHTML += "Entrada "+(i+1)+":>  &nbsp;&nbsp  "+ prueba[i].entrada
                    + " &nbsp;&nbsp";
                diventradas.innerHTML += "<br>";

            }

            divsalidas.innerHTML += "<div style='text-align: center'><b>Salidas</b><br></div>";
            for (var i = 0; i < prueba.length; ++i) {
                divsalidas.innerHTML += "Salida esperada: "+(i+1)+":>  &nbsp;&nbsp  "+ prueba[i].salida+ " &nbsp;&nbsp";
                divsalidas.innerHTML += "<br>";
                console.log("entrada "+(i+1)+":> "+ prueba[i].entrada + " salida esperada:> " + prueba[i].salida + " resultado: " + activacion(obtenerSumaUmbral(w, prueba[i])));
            }
        }

        //Inicializo los pesos aleatoriamente
        function inicializarPesos(pesos, setEntrenamiento) {
            divmatriz.innerHTML += "<div style='text-align: center'><b>Matriz</b><br></div>";
            for (var i = 0; i < setEntrenamiento[0].entrada.length; i++) {// numero de elementos para entrada
                pesos[i] = Math.random() * (1 - (-1) + 1) + (-1);
                divmatriz.innerHTML += "  " + pesos[i] + " &nbsp;&nbsp;  ";
            }
            divmatriz.innerHTML += "<br>";
            divmatriz.innerHTML += "<div style='text-align: center'><b>Umbral</b><br></div>";
            pesos.push( Math.random() * (1 - (-1) + 1) + (-1) ); //umbral
            divmatriz.innerHTML += " " + pesos[2] + "&nbsp;&nbsp; ";
        }

        //Devuelbo el umbran de activacion para cada patron de entranamiento
        function obtenerSumaUmbral(pesos, setEntrenamiento) {
            var sum = 0;
            for (var i = 0; i < setEntrenamiento.entrada.length; i++) {
                sum += pesos[i] * setEntrenamiento.entrada[i];
            }
            sum += 1 * pesos[pesos.length - 1];
            return sum;
        }

        //Funcion de activacion o escalon del umbral
        function activacion(valor) {
            return valor >= 0 ? 1 : 0;//Devuelvo 1 o 0 dependiendo si la condicion se cumple
        }

        function entrenamiento(pesos, setEntranamiento) {
            var error = 0;
            for (var i = 0; i < setEntranamiento.length; i++) {//recorro por patrones en la matriz ejemplo
                var pesosActuales = setEntranamiento[i]; //pesos actuales en la iteracion x
                var umbral = obtenerSumaUmbral(pesos, pesosActuales); //umbral de cada iteracion
                var funcionEscalon = activacion(umbral)
                var error_actual = pesosActuales.salida - funcionEscalon; //error actual por cada patron
                error += Math.abs(error_actual); //calculo la suma del error lineal para cada iteracion
                for (var j = 0; j < pesos.length - 1; j++) {//actualizo la matriz de pesos
                    var nuevosPesos = error_actual * rate * pesosActuales.entrada[j];
                    pesos[j] += nuevosPesos;
                }
                pesos[pesos.length - 1] += error_actual * rate * 1; //actualizo el umbral
            }
            return {
                error: error / (pesos.length),
                matrizActual: pesos,
                fEscalon : funcionEscalon,
                error_actual: error_actual
            };
        }

        function graficar() {
            var myChart = new JSChart('graph', 'line');
            myChart.setDataArray(vm.myData);
            myChart.setLineColor('#8D9386');
            myChart.setLineWidth(4);
            myChart.setTitleColor('#7D7D7D');
            myChart.setAxisColor('#9F0505');
            myChart.setGridColor('#a4a4a4');
            myChart.setAxisValuesColor('#333639');
            myChart.setAxisNameColor('#333639');
            myChart.setTextPaddingLeft(0);
            myChart.draw();
        }
    }
})();

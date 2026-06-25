let unit = "Metric";
let totalHeight = 0;
let totalWeight = 0;
let totalPulgadas = 0;
let totalLibras = 0;
let bmi = 0;
let rangeWeight = "";

document.addEventListener('DOMContentLoaded', async function(){
    selectUnit();
    showElementsByUnit();

    getMetricData();
    getImperialData();

});

function getMetricData(){
    const height = document.querySelector('.mHeight');
    const weight = document.querySelector('.mWeight');

    height.addEventListener('input', function(){
        if(unit == "Metric"){
            totalHeight = height.value
        }
        bmi = 0;
        rangeWeight = "";
        hideBMI();

        if(totalHeight > 0 && totalWeight > 0){
            bmi = calcularBmiMetrico(totalWeight, totalHeight);
            rangeWeight = obtenerRangoIdealMetrico(totalHeight);
            showBMI();
        }
        
    });

    weight.addEventListener('input', function(){
        if(unit == "Metric"){
            totalWeight = weight.value
        }
        bmi = 0;
        rangeWeight = "";
        hideBMI();

        if(totalHeight > 0 && totalWeight > 0){
            bmi = calcularBmiMetrico(totalWeight, totalHeight);
            rangeWeight = obtenerRangoIdealMetrico(totalHeight);
            showBMI();
        }
    });
}

function getImperialData(){
    const height = document.querySelectorAll('.iHeight');
    const weight = document.querySelectorAll('.iWeight');

    var ft = 0;
    var pulgadas = 0;
    var stones = 0;
    var libras = 0;

    height.forEach(item =>{
        item.addEventListener('input', function(){
           if(item.id == "imperial-height-ft"){
                ft = parseFloat(item.value) || 0;
           }else if(item.id = "imperial-height-in"){
                pulgadas = parseFloat(item.value) || 0;
           }
            bmi = 0;
            rangeWeight = "";
            hideBMI();

            totalPulgadas = (parseFloat(ft) * 12) + parseFloat(pulgadas || 0);
            if(totalPulgadas > 0 && totalLibras > 0){
                bmi = calcularBmiImperial(totalPulgadas, totalLibras);
                rangeWeight = obtenerRangoIdealImperial(totalPulgadas);
                showBMI();
            }
            
        });
    });

    weight.forEach(item =>{
        item.addEventListener('input', function(){
           if(item.id == "imperial-weight-st"){
                stones = parseFloat(item.value) || 0;
           }else if(item.id = "imperial-weight-lbs"){
                libras = parseFloat(item.value) || 0;
           }
            bmi = 0;
            rangeWeight = "";
            hideBMI();

            totalLibras = (parseFloat(stones) * 14) + parseFloat(libras || 0);
            if(totalPulgadas > 0 && totalLibras > 0){
                bmi = calcularBmiImperial(totalPulgadas, totalLibras);
                rangeWeight = obtenerRangoIdealImperial(totalPulgadas);
                showBMI();
            }
        });
    });

 
}

function showBMI(){
    const welcomeBox = document.querySelector('.calculator__welcomeBox');
    const resultBox = document.querySelector('.calculator__resultBox');

    const score = document.getElementById('score');
    const classification = document.getElementById('bmi-classification');
    const rangeWeightSpan = document.getElementById('bmi-range-weight');

    const bmiMeaning = document.getElementById('bmi-meaning');

    const bmiTexts = {
        underweight: "A BMI range of less than 18.5 is considered 'underweight.' Maintaining a healthy weight lowers your chances of experiencing health issues. Strive for a balanced diet rich in nutrients and consult a healthcare professional if you need guidance on gaining weight healthily.",
        healthy: "A BMI range of 18.5 to 24.9 is considered a 'healthy weight.' Maintaining a healthy weight may lower your chances of experiencing health issues later on, such as obesity and type 2 diabetes. Aim for a nutritious diet with reduced fat and sugar content, incorporating ample fruits and vegetables. Additionally, strive for regular physical activity, ideally about 30 minutes daily for five days a week.",
        overweight: "A BMI range of 25 to 29.9 is considered 'overweight.' To return to a healthy weight range, consider making dietary changes such as controlling portion sizes and reducing processed food intake. Increasing daily physical activity can also help manage your weight effectively.",
        obese: "A BMI range of 30 or greater is considered 'obese.' It is advisable to work towards a healthier weight to reduce risks of cardiovascular diseases and other metabolic conditions. Small, sustainable changes to your diet and a structured exercise routine can support long-term weight management."
    };       

    score.textContent = bmi;
    rangeWeightSpan.textContent = rangeWeight;

    if(bmi > 0 && bmi <= 18.5){
        classification.textContent = "Underweight"
        bmiMeaning.textContent = bmiTexts.underweight;

    }else if(bmi > 18.5 && bmi <= 24.9){
        classification.textContent = "Healthy weight"
        bmiMeaning.textContent = bmiTexts.healthy;

    } else if(bmi => 25 && bmi <= 29.9){
        classification.textContent = "Overweight"
        bmiMeaning.textContent = bmiTexts.overweight;
    }else if(bmi >= 30){
        classification.textContent = "Obese"
        bmiMeaning.textContent = bmiTexts.obese;
    }

    welcomeBox.classList.add('hidden');
    resultBox.classList.remove('hidden');

}

function hideBMI(){
    const welcomeBox = document.querySelector('.calculator__welcomeBox');
    const resultBox = document.querySelector('.calculator__resultBox');
    const bmiMeaning = document.getElementById('bmi-meaning');

    bmiMeaning.textContent = "A BMI range of 18.5 to 24.9 is considered a 'healthy weight.' Maintaining a healthy weight may lower your chances of experiencing health issues later on, such as obesity and type 2 diabetes. Aim for a nutritious diet with reduced fat and sugar content, incorporating ample fruits and vegetables. Additionally, strive for regular physical activity, ideally about 30 minutes daily for five days a week."
    welcomeBox.classList.remove('hidden');
    resultBox.classList.add('hidden');
}

function calcularBmiMetrico(pesoKg, alturaCm) {
    if (pesoKg <= 0 || alturaCm <= 0) return 0;
    
    const alturaMetros = alturaCm / 100;
    const bmi = pesoKg / (alturaMetros * alturaMetros);
    
    return parseFloat(bmi.toFixed(1)); 
}

function obtenerRangoIdealMetrico(alturaCm) {
    if (alturaCm <= 0) return "";
    
    const alturaMetros = alturaCm / 100;
    const alturaCuadrado = alturaMetros * alturaMetros;
    
    const pesoMin = (18.5 * alturaCuadrado).toFixed(1);
    const pesoMax = (24.9 * alturaCuadrado).toFixed(1);
    
    return `${pesoMin}kgs - ${pesoMax}kgs`;
}

function calcularBmiImperial(totalPulgadas, totalLibras) {
    
    if (totalPulgadas <= 0 || totalLibras <= 0) return 0;

    const bmi = (totalLibras / (totalPulgadas * totalPulgadas)) * 703;
    
    return parseFloat(bmi.toFixed(1));
}

function obtenerRangoIdealImperial(totalPulgadas) {
    if (totalPulgadas <= 0) return "";

    const pulgadasCuadrado = totalPulgadas * totalPulgadas;

    const lbsMinTotales = (18.5 * pulgadasCuadrado) / 703;
    const lbsMaxTotales = (24.9 * pulgadasCuadrado) / 703;

    const formatearAStonesYLibras = (totalLibras) => {
        const librasRedondeadas = Math.round(totalLibras);
        const stones = Math.floor(librasRedondeadas / 14);
        const lbsRestantes = librasRedondeadas % 14;
        return `${stones}st ${lbsRestantes}lbs`;
    };

    const minFormateado = formatearAStonesYLibras(lbsMinTotales);
    const maxFormateado = formatearAStonesYLibras(lbsMaxTotales);

    return `${minFormateado} - ${maxFormateado}`;
}

function selectUnit(){
    const radioInput = document.querySelectorAll('input[type="radio"]');
    
    radioInput.forEach(radio => {
        radio.addEventListener('click', function(){
            unit = this.value;
            showElementsByUnit();
            hideBMI();
        });
    });
    
}

function showElementsByUnit(){

    const metricHeight = document.getElementById('metric-height-box');
    const metricWeight = document.getElementById('metric-weight-box');

    const imperialHeight = document.getElementById('imperial-height-box');
    const imperialWeight = document.getElementById('imperial-weight-box');

    const calculatorDataContent = document.querySelector('.calculator__dataContent');

    const inputs = document.querySelectorAll('.calculator__input');

    switch(unit){
        case "Metric":
            metricHeight.classList.remove('hidden');
            metricWeight.classList.remove('hidden');

            imperialHeight.classList.add('hidden');
            imperialWeight.classList.add('hidden');

            calculatorDataContent.classList.remove('calculator__dataContent--imperial');
            calculatorDataContent.classList.add('calculator__dataContent--metric');

            inputs.forEach(element => {
                element.value = "";
            });

            break;

        case "Imperial":
            imperialHeight.classList.remove('hidden');
            imperialWeight.classList.remove('hidden');

            metricHeight.classList.add('hidden');
            metricWeight.classList.add('hidden');

            calculatorDataContent.classList.add('calculator__dataContent--imperial');
            calculatorDataContent.classList.remove('calculator__dataContent--metric');

            inputs.forEach(element => {
                element.value = "";
            });

            break;
    }

}
document.addEventListener('DOMContentLoaded', () => {
    // Controle da página inicial
    const splashScreen = document.getElementById('splashScreen');
    const calculatorApp = document.getElementById('calculatorApp');
    const startBtn = document.getElementById('startBtn');

    // Ao clicar no botão Iniciar
    startBtn.addEventListener('click', () => {
        splashScreen.style.animation = 'fadeOut 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => {
            splashScreen.classList.add('hidden');
            calculatorApp.classList.remove('hidden');
        }, 400);
    });

    // Botão de voltar para a página inicial
    const backBtn = document.getElementById('backBtn');
    backBtn.addEventListener('click', () => {
        calculatorApp.classList.add('hidden');
        splashScreen.classList.remove('hidden');
        splashScreen.style.animation = 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    const form = document.getElementById('salaryForm');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultsContainer = document.getElementById('results');

    // Inputs
    const weeklyClassesInput = document.getElementById('weeklyClasses');
    const hourlyRateInput = document.getElementById('hourlyRate');
    const thirdSeriesClassesInput = document.getElementById('thirdSeriesClasses');
    const thirdSeriesRateInput = document.getElementById('thirdSeriesRate');
    const monitoriaCountInput = document.getElementById('monitoriaCount');
    const monitoriaValueInput = document.getElementById('monitoriaValue');

    // Outputs
    const baseSalaryEl = document.getElementById('baseSalaryValue');
    const activityHourEl = document.getElementById('activityHourValue');
    const dsrEl = document.getElementById('dsrValue');
    const otherRemunerationEl = document.getElementById('otherRemunerationValue');
    const inssEl = document.getElementById('inssValue');
    const irrfEl = document.getElementById('irrfValue');
    const totalSalaryEl = document.getElementById('totalSalaryValue');
    const netSalaryEl = document.getElementById('netSalaryValue');

    function formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }

    function parseNumber(value) {
        if (!value) return 0;
        // Replace comma with dot
        const normalized = value.toString().replace(',', '.');
        return parseFloat(normalized) || 0;
    }

    function calculateINSS(grossSalary) {
        let inss = 0;

        if (grossSalary <= 1518.00) {
            inss = grossSalary * 0.075;
        } else if (grossSalary <= 2793.88) {
            inss = (grossSalary * 0.09) - 22.77;
        } else if (grossSalary <= 4190.83) {
            inss = (grossSalary * 0.12) - 106.59;
        } else if (grossSalary <= 8157.41) {
            inss = (grossSalary * 0.14) - 190.40;
        } else {
            // Teto
            inss = (8157.41 * 0.14) - 190.40;
        }

        return inss;
    }

    function calculateIRRF(baseSalary) {
        let irrf = 0;

        if (baseSalary <= 2428.80) {
            irrf = 0;
        } else if (baseSalary <= 2826.65) {
            irrf = (baseSalary * 0.075) - 182.16;
        } else if (baseSalary <= 3751.05) {
            irrf = (baseSalary * 0.15) - 394.16;
        } else if (baseSalary <= 4664.68) {
            irrf = (baseSalary * 0.225) - 675.49;
        } else {
            irrf = (baseSalary * 0.275) - 908.73;
        }

        return Math.max(0, irrf);
    }

    function calculateSalary() {
        const weeklyClasses = parseNumber(weeklyClassesInput.value);
        const hourlyRate = parseNumber(hourlyRateInput.value);
        const thirdSeriesClasses = parseNumber(thirdSeriesClassesInput.value);
        const thirdSeriesRate = parseNumber(thirdSeriesRateInput.value);
        const activityPercentage = 5; // Fixed at 5% for Basic Education
        const monitoriaCount = parseNumber(monitoriaCountInput.value);
        const monitoriaValue = parseNumber(monitoriaValueInput.value);
        const otherRemuneration = monitoriaCount * monitoriaValue;

        // 1. Salário Base = (nº de aulas 1ª e 2ª séries X 4,5 X valor da hora-aula) + (nº de aulas 3ª série X 4,5 X valor da hora-aula 3ª série) + (Monitorias * Valor)
        const baseSalary = (weeklyClasses * 4.5 * hourlyRate) + (thirdSeriesClasses * 4.5 * thirdSeriesRate) + (monitoriaCount * monitoriaValue);

        // 2. Hora-atividade
        // O adicional de hora-atividade é calculado sobre o salário base?
        // O prompt diz: "Ele recebe esse nome porque é a base sobre a qual a hora-atividade e o DSR serão calculados."
        // Geralmente é uma porcentagem sobre o salário base.
        const activityHour = baseSalary * (activityPercentage / 100);

        // 3. DSR = (salário base + hora-atividade) / 6
        const dsr = (baseSalary + activityHour) / 6;

        // Total Bruto
        const totalSalary = baseSalary + activityHour + dsr;

        // INSS
        const inss = calculateINSS(totalSalary);

        // IRRF Base = Total Bruto - INSS
        const irrfBase = totalSalary - inss;
        const irrf = calculateIRRF(irrfBase);

        // Salário Líquido
        const netSalary = totalSalary - inss - irrf;

        // Update UI
        baseSalaryEl.textContent = '+' + formatCurrency(baseSalary);
        activityHourEl.textContent = '+' + formatCurrency(activityHour);
        dsrEl.textContent = '+' + formatCurrency(dsr);
        inssEl.textContent = '-' + formatCurrency(inss);
        irrfEl.textContent = '-' + formatCurrency(irrf);
        totalSalaryEl.textContent = formatCurrency(totalSalary);
        netSalaryEl.textContent = formatCurrency(netSalary);

        // Show results
        resultsContainer.classList.remove('hidden');
    }

    calculateBtn.addEventListener('click', calculateSalary);

    // Optional: Calculate on Enter key in inputs
    const inputs = [weeklyClassesInput, hourlyRateInput, thirdSeriesClassesInput, thirdSeriesRateInput, monitoriaCountInput, monitoriaValueInput];
    inputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                calculateSalary();
            }
        });
    });
});

// Registro do Service Worker para PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((registration) => {
                console.log('Service Worker registrado com sucesso:', registration.scope);
            })
            .catch((error) => {
                console.log('Falha ao registrar Service Worker:', error);
            });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var startTestBtn = document.getElementById('startTest');
    var testIntro = document.querySelector('.test-intro');
    var hamiltonForm = document.getElementById('hamiltonForm');
    var testResults = document.getElementById('testResults');
    var totalScoreSpan = document.getElementById('totalScore');
    var resultText = document.getElementById('resultText');
    var recommendationsList = document.getElementById('recommendationsList');
    var retakeTestBtn = document.getElementById('retakeTest');

    // Crear o seleccionar el contenedor de actividades
    var activitiesDiv = document.getElementById('activitiesTasks');
    if (!activitiesDiv) {
        activitiesDiv = document.createElement('div');
        activitiesDiv.id = 'activitiesTasks';
        activitiesDiv.style.marginTop = '2rem';
        testResults.appendChild(activitiesDiv);
    }

    if (startTestBtn && hamiltonForm && testIntro) {
        startTestBtn.addEventListener('click', function() {
            testIntro.style.display = 'none';
            hamiltonForm.style.display = 'block';
            window.scrollTo({ top: hamiltonForm.offsetTop - 100, behavior: 'smooth' });
        });
    }

    if (hamiltonForm && testResults && totalScoreSpan && resultText && recommendationsList) {
        hamiltonForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let total = 0;
            for (let i = 1; i <= 14; i++) {
                const radios = hamiltonForm['q' + i];
                let value = null;
                if (radios instanceof NodeList || Array.isArray(radios)) {
                    for (let radio of radios) {
                        if (radio.checked) value = radio.value;
                    }
                } else if (radios) {
                    value = radios.value;
                }
                total += parseInt(value, 10);
            }
            totalScoreSpan.textContent = total;
            let interpretacion = '';
            let recomendaciones = [];
            let actividades = [];
            if (total <= 17) {
                interpretacion = 'Ansiedad leve o mínima.';
                recomendaciones = [
                    'Mantén hábitos saludables de sueño y alimentación.',
                    'Practica técnicas de relajación como la respiración profunda.',
                    'Realiza actividad física regularmente.'
                ];
                actividades = [
                    'Haz una caminata de 20 minutos al aire libre cada día.',
                    'Dedica 5 minutos diarios a ejercicios de respiración consciente.',
                    'Escribe tres cosas positivas que te hayan pasado hoy.'
                ];
            } else if (total <= 24) {
                interpretacion = 'Ansiedad leve a moderada.';
                recomendaciones = [
                    'Considera hablar con un profesional de la salud mental.',
                    'Continúa con técnicas de autocuidado y relajación.',
                    'Busca apoyo en familiares o amigos.'
                ];
                actividades = [
                    'Realiza una meditación guiada de 10 minutos (puedes buscar en YouTube).',
                    'Haz una lista de tus preocupaciones y clasifícalas en importantes y no importantes.',
                    'Practica una rutina de estiramientos suaves antes de dormir.'
                ];
            } else if (total <= 30) {
                interpretacion = 'Ansiedad moderada a grave.';
                recomendaciones = [
                    'Consulta con un profesional de la salud mental para una evaluación más profunda.',
                    'Sigue un plan de manejo de ansiedad personalizado.',
                    'Evita el consumo de sustancias que puedan aumentar la ansiedad.'
                ];
                actividades = [
                    'Agenda una cita con un psicólogo o terapeuta.',
                    'Lleva un diario de emociones durante una semana.',
                    'Prueba ejercicios de relajación muscular progresiva cada noche.'
                ];
            } else {
                interpretacion = 'Ansiedad grave.';
                recomendaciones = [
                    'Busca ayuda profesional lo antes posible.',
                    'Considera terapia psicológica y/o consulta psiquiátrica.',
                    'No enfrentes la ansiedad solo, busca apoyo.'
                ];
                actividades = [
                    'Contacta a un profesional de salud mental hoy mismo.',
                    'Informa a un familiar o amigo cercano sobre cómo te sientes.',
                    'Evita el aislamiento: intenta mantener contacto diario con alguien de confianza.'
                ];
            }
            resultText.textContent = interpretacion;
            recommendationsList.innerHTML = '';
            recomendaciones.forEach(function(rec) {
                var li = document.createElement('li');
                li.textContent = rec;
                recommendationsList.appendChild(li);
            });
            // Mostrar actividades/tareas
            activitiesDiv.innerHTML = '<h4>Tareas o Actividades Recomendadas</h4>';
            var ul = document.createElement('ul');
            actividades.forEach(function(act) {
                var li = document.createElement('li');
                li.textContent = act;
                ul.appendChild(li);
            });
            activitiesDiv.appendChild(ul);
            hamiltonForm.style.display = 'none';
            testResults.style.display = 'block';
            window.scrollTo({ top: testResults.offsetTop - 100, behavior: 'smooth' });
        });
    }

    if (retakeTestBtn && hamiltonForm && testResults && testIntro) {
        retakeTestBtn.addEventListener('click', function() {
            testResults.style.display = 'none';
            hamiltonForm.reset();
            hamiltonForm.style.display = 'block';
            activitiesDiv.innerHTML = '';
            window.scrollTo({ top: hamiltonForm.offsetTop - 100, behavior: 'smooth' });
        });
    }
}); 
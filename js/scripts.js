const $tiempo= document.querySelector('.tiempo');
const $fecha = document.querySelector('.fecha');
const dateText = document.getElementById('dateText');

const taskContainer = document.getElementById('taskContainer');

const stopwatch = document.getElementById('stopwatch');
const playPauseButton = document.getElementById('play-pause');
const secondsSphere = document.getElementById('seconds-sphere');

let stopwatchInterval;
let runningTime = 0;

const addNewTask = event => {
    event.preventDefault();
    const {value} = event.target.taskText;
    if(!value) return;

    const task = document.createElement('div');
    task.classList.add('task');
    task.addEventListener('click',changeTaskState)
    task.textContent = value;
    taskContainer.prepend(task);
    event.target.reset();
};

const changeTaskState = event => {
    event.target.classList.toggle('done');

}

const borrarList = () =>{
    taskContainer.innerHTML='';
}

// cronometro
const playPause = () => {
    const isPaused = !playPauseButton.classList.contains('running');
    if (isPaused) {
        playPauseButton.classList.add('running');
        start();
    } else {
        playPauseButton.classList.remove('running');
        pause();
    }
}

const pause = () => {
    secondsSphere.style.animationPlayState = 'paused';
    clearInterval(stopwatchInterval);
}

const stop = () => {
    secondsSphere.style.transform = 'rotate(-90deg) translateX(60px)';
    secondsSphere.style.animation = 'none';
    playPauseButton.classList.remove('running');
    runningTime = 0;
    clearInterval(stopwatchInterval);
    stopwatch.textContent = '00:00';
}

const start = () => {
    secondsSphere.style.animation = 'rotacion 60s linear infinite';
    let startTime = Date.now() - runningTime;
    secondsSphere.style.animationPlayState = 'running';
    stopwatchInterval = setInterval( () => {
        runningTime = Date.now() - startTime;
        stopwatch.textContent = calculateTime(runningTime);
    }, 1000)
}

const calculateTime = runningTime => {
    const total_seconds = Math.floor(runningTime / 1000);
    const total_minutes = Math.floor(total_seconds / 60);

    const display_seconds = (total_seconds % 60).toString().padStart(2, "0");
    const display_minutes = total_minutes.toString().padStart(2, "0");

    return `${display_minutes}:${display_seconds}`
}


function  RelojDigital(){
    let f = new Date()
    dia = f.getDate(),
    mes = f.getMonth()+1,
    anio= f.getFullYear(),
    semana = f.getDay();

    let timeString = f.toLocaleTimeString();
    $tiempo.innerHTML = timeString

    let semanaDia = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
    $fecha.innerHTML = semanaDia[semana]+' '+ dia +'/'+ mes+'/'+anio
    
}
setInterval(( ()=>{RelojDigital()}),1000);



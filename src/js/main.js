let currentDate  = new Date();
const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const items = JSON.parse(localStorage.getItem('items')) || [];
let currentColor = JSON.parse(localStorage.getItem('color')) || '';
var interval;
let isOpened = false;
const colors = [
    'nothing there'
    ['#fad0c4','#ffd1ff'],
    ['#ff9a9e','#fad0c4'],
    ['#84fab0','#8fd3f4'],
    ['#a1c4fd','#c2e9fb'],
    ['#d4fc79','#96e6a1'],
    ['#fccb90','#d57eeb'],
    ['#f093fb','#f5576c'],
    ['#4facfe','#00f2fe'],
    ['#30cfd0','#330867'],
    ['#5ee7df','#b490ca'],
    ['#667eea','#764ba2'],
    ['#fddb92','#90faff'],
    ['#9890e3','#b1f4cf'],
    ['#ebc0fd','#d9ded8'],
    ['#2af598','#009efd'],
    ['#6a11cb','#2575fc'],
    ['#f43b47','#453a94'],
    ['#88d3ce','#6e45e2'],
    ['#0250c5','#d43f8d'],
    ['#13547a','#80d0c7'],
    ['#ff0844','#ffb199'],
    ['#b721ff','#21d4fd'],
    ['#874da2','#c43a30'],
    ['#00dbde','#fc00ff'],
]



window.onload = function(){
    setDate();
    buildList();
    addItem();
    changeTheme(currentColor);
    changeColorOnClick();
}

function setDate(){
    const dateText = document.querySelector('.time');
    dateText.innerHTML = `${daysOfTheWeek[currentDate.getDay()]}, ${currentDate.getDate()} ${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`
}

function addItem(){
    //add-btn click
    document.querySelector('.add-btn').addEventListener('click', ()=>{
        document.querySelector('.addItemView').classList.add('display');
    });
    //close widnow
    document.querySelector('#addItemClose').addEventListener('click', ()=>{
        document.querySelector('.addItemView').classList.remove('display');
    });
    //submit item
    document.querySelector('button[type="submit"]').addEventListener('click', (e)=>{
        e.preventDefault();
        if(document.querySelector('#title').value && document.querySelector('.dateDiv>input').value){
            let newItem  = {
                title: document.querySelector('#title').value,
                date: document.querySelector('.dateDiv>input').value
            }
            items.push(newItem);
            localStorage.setItem('items', JSON.stringify(items));
            document.querySelector('.addItemView').classList.remove('display');
            document.querySelector("form").reset();
            buildList();
        }
    });
}


function dateDiffrence(num){
    let milisecDiff = Math.abs(new Date() - new Date(items[num].date.replace(/-/g,'/')));
    let secDiff = milisecDiff / 1000;
    let minDiff = secDiff /60;
    let hourDiff = minDiff /60;
    let dayDiff = hourDiff / 24;
    let monthDiff = dayDiff / 30.4375;
    let yearDiff = monthDiff / 12;
    if(yearDiff>1){
        return(`for about ${Math.floor(yearDiff)} ${Math.floor(yearDiff)==1 ? 'year' : 'years'} and ${Math.floor(monthDiff) - Math.floor(yearDiff) * 12} ${(Math.floor(monthDiff) - Math.floor(yearDiff) * 12)==1 ? 'mth' : 'mths'}.`)
    }
    if(monthDiff>1){
        return(`for about ${Math.floor(monthDiff)} ${Math.floor(monthDiff)==1 ? 'month' : 'months'} and ${Math.ceil(Math.floor(dayDiff) - Math.floor(monthDiff) * 30.4375)} ${(Math.ceil(Math.floor(dayDiff) - Math.floor(monthDiff) * 30.4375))==1 ? 'day' : 'days'}.`)
    }
    if(dayDiff>1){
        return(`for about ${Math.floor(dayDiff)} ${Math.floor(dayDiff)==1 ? 'day' : 'days'} and ${Math.floor(hourDiff) - Math.floor(dayDiff) * 24} ${(Math.floor(hourDiff) - Math.floor(dayDiff) * 24)==1 ? 'hour' : 'hours'}.`)
    }
    if(hourDiff>1){
        return(`for about ${Math.floor(hourDiff)} ${Math.floor(hourDiff)==1 ? 'hour' : 'hours'} and ${Math.floor(minDiff) - Math.floor(hourDiff) * 60} ${(Math.floor(minDiff) - Math.floor(hourDiff) * 60)==1 ? 'min' : 'mins'}.`)
    }
    if(minDiff>1){
        return(`for about ${Math.floor(minDiff)} ${Math.floor(minDiff)==1 ? 'minute' : 'minutes'} and ${Math.floor(secDiff) - Math.floor(minDiff) * 60} ${(Math.floor(secDiff) - Math.floor(minDiff) * 60)==1 ? 'sec' : 'secs'}.`)
    }
    if(secDiff>1){
        return(`for about ${Math.floor(secDiff)} ${Math.floor(secDiff)==1 ? 'sec' : 'secs'}.`)
    }
}


function buildList(){
    document.querySelector('.itemList').innerHTML = '';
    for(item in items){
        let newLi = document.createElement('li');
        let newDiv = document.createElement('div');
        let newH2 = document.createElement('h2');
        let newP = document.createElement('p');
        newLi.dataset.key = item;
        newDiv.classList.add('item');
        newH2.innerText = items[item].title;
        newP.innerText = dateDiffrence(item);
        newDiv.appendChild(newH2);
        newDiv.appendChild(newP);
        newLi.appendChild(newDiv);
        document.querySelector('.itemList').appendChild(newLi);
    }
    itemOnClick();
}


function itemOnClick(){
    document.querySelectorAll('.itemList>li').forEach((item)=>{
        item.addEventListener('click', (e)=>{
            let div = document.createElement('div');
            div.classList.add('itemDescription');
            document.querySelector('body').appendChild(div);
            isOpened = true;         
            function updateTime(){
                let currentDate  = new Date();
                let milisecDiff = Math.abs(new Date() - new Date(items[item.dataset.key].date.replace(/-/g,'/')));
                let secDiff = milisecDiff / 1000;
                let minDiff = secDiff /60;
                let hourDiff = minDiff /60;
                let dayDiff = hourDiff / 24;
                let monthDiff = dayDiff / 30.4375;
                let yearDiff = monthDiff / 12;
                div.innerHTML = 
                `<div class="border">
                    <div class="container">
                        <img src="src\\img\\Mask@2x.png" alt="Close" id="addItemClose" onclick="removeItemDescription()">
                        <h2>${items[item.dataset.key].title}</h2>
                        <div class="beg-date">
                            <h3>BEGINNING DATE</h3>
                            <p>${items[item.dataset.key].date}</p>
                        </div>
                        <div class="it-passed">
                            <h3>IT PASSED</h3>
                            <ul class="progressUl">
                                <li>
                                    <p>${Math.floor(yearDiff)} ${Math.floor(yearDiff)==1 ? 'YEAR' : 'YEARS'}</p>
                                </li>
                                <li>
                                    <p>${Math.floor(monthDiff) - Math.floor(yearDiff) * 12} ${Math.floor(monthDiff)==1 ? 'MONTH' : 'MONTHS'}</p>
                                    <div class="progress">
                                        <span style="width: ${(Math.floor(monthDiff) - Math.floor(yearDiff) * 12) / 12 * 100}%"></span>
                                    </div>
                                </li>
                                <li>
                                    <P>${Math.ceil(Math.floor(dayDiff) - Math.floor(monthDiff) * 30.4375)} ${Math.floor(dayDiff)==1 ? 'DAY' : 'DAYS'}</P>
                                    <div class="progress">
                                        <span style="width: ${(Math.ceil(Math.floor(dayDiff) - Math.floor(monthDiff) * 30.4375)) / 30.4375 * 100}%"></span>
                                    </div>
                                </li>
                                <li>
                                    <p>${Math.floor(hourDiff) - Math.floor(dayDiff) * 24} ${Math.floor(hourDiff)==1 ? 'HOUR' : 'HOURS'}</p>
                                    <div class="progress">
                                        <span style="width: ${(Math.floor(hourDiff) - Math.floor(dayDiff) * 24) / 24 * 100}%"></span>
                                    </div>
                                </li>
                                <li>
                                    <p>${Math.floor(minDiff) - Math.floor(hourDiff) * 60} ${Math.floor(minDiff)==1 ? 'MINUTE' : 'MINUTES'}</p>
                                    <div class="progress">
                                        <span style="width: ${(Math.floor(minDiff) - Math.floor(hourDiff) * 60) / 60 * 100}%"></span>
                                    </div>
                                </li>
                                <li>
                                    <p>${Math.floor(secDiff) - Math.floor(minDiff) * 60} ${(Math.floor(secDiff) - Math.floor(minDiff) * 60)==1 ? 'SECOND' : 'SECONDS'}</p>
                                    <div class="progress">
                                        <span style="width: ${(Math.floor(secDiff) - Math.floor(minDiff) * 60) / 60 * 100}%"></span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <img src="src\\img\\Icon-1@2X.png" class="bin-btn" onclick="deleteItem(${item.dataset.key})">
                    </div>
                </div>`;
                if(!isOpened){
                    return;
                }
                setTimeout(updateTime, 1000)
            }
            updateTime();
        });
    });
}


function removeItemDescription(){
    document.querySelector('body').removeChild(document.querySelector('.itemDescription'));
    isOpened = false;
}


function deleteItem(num){
    removeItemDescription();
    items.splice(items.indexOf(items[num]), 1);
    localStorage.setItem('items', JSON.stringify(items));
    buildList();
}

function changeTheme(num){
    const random = Math.floor(Math.random() * colors.length+1);
    let root = document.documentElement;
    if(num>0){
        root.style.setProperty('--gradient', `linear-gradient(45deg, ${colors[num][0]}, ${colors[num][1]})`);
        return;
    }
    root.style.setProperty('--gradient', `linear-gradient(45deg, ${colors[random][0]}, ${colors[random][1]})`);
    currentColor = random;
    localStorage.setItem('color', JSON.stringify(currentColor));
}

function changeColorOnClick(){
    document.querySelector('.archive-btn').addEventListener('click', changeTheme)
}

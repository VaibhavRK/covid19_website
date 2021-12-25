
//<-------------------------------------- Curtain (Navbar Slider) JavaScript Code ---------------------------------------->

var curtain = document.getElementsByClassName('curtain')[0];
var icons = document.getElementsByClassName('icons');
var home = document.getElementsByClassName('home')[0];
home.addEventListener("mouseover", disableCurtain);

for (i = 0; i < icons.length; i++) {
    icons[i].addEventListener("mouseover", enableCurtain);
}

function enableCurtain() {
    curtain.style.width = "20%";
}

function disableCurtain() {
    curtain.style.width = "0";
}

//<--------------------------------- Data showing regarding Confirmed, Recoverd, and Active Cases ------------------------>
let shownums = document.querySelectorAll('.number');
let caseNames = document.querySelectorAll('.caseName')


for (let i = 0; i < shownums.length; i++) {

    shownums[i].innerHTML = 0;
    const UpdateData = () => {
        const targetnum = 100000; // have to set api data for current Confirm,recovered,active cases
        const startnum = Number(shownums[i].innerHTML);

        const inc = targetnum / 1000;


        if (startnum < targetnum) {
            shownums[i].innerHTML = `${startnum + inc}`;
            setInterval(UpdateData, 100);
        }
        else {
            shownums[i].innerHTML = `${targetnum}`;
        }
    }

    UpdateData();
}

// <------------------------------------------ Search Bar Backend--------------------------------------------------->
let searchBtn = document.querySelector('#search');
let dataOutput = document.querySelector('.dataOutput');
// dataOutput.style.display = 'none';
let num = document.getElementsByClassName('num');
let toAppend = `<h1 class="DataRegardingSearch">State Data</h1>
 <div class="coverKrlo">

    <div class="Card1">
        <h1 class="case">Confirmed : </h1>
        <span class="num"></span>
    </div>

    <div class="Card2">
        <h1 class="case">Tested : </h1>
        <span class="num"></span>    
    </div>

    <div class="Card3">
        <h1 class="case">Recovered : </h1>
        <span class="num"></span>
    </div>
    <div class="Card4">
        <h1 class="case">Vaccination Done:</h1>
        <span class="num"></span>
    </div>

</div>`;

let appendGraph = `<div>
<canvas id="myChart1" width="500" height="500"></canvas>
</div>
<div>
<canvas id="myChart2" width="500" height="500"></canvas>
</div>`;

let dataArr = [];

const Covidapi = "https://data.covid19india.org/v4/min/data.min.json";

let search;
searchBtn.addEventListener('click', () => {
    search = document.querySelector('.searchInput').value;

    dataOutput.innerHTML = toAppend;
    document.querySelector('.graphs').innerHTML = appendGraph;

    fetch(Covidapi).
        then((apidata) => {
            return apidata.json();
        }).
        then((actualData) => {
            for (let key in actualData) {
                if (actualData.hasOwnProperty(key)) {
                    value = actualData[key];
                    if (key == search) {
                        // console.log("YES");
                        // console.log(value.delta7);

                        document.querySelector('.DataRegardingSearch').innerHTML = `${search} Data`;

                        let totalVaccine = (Number)(value.delta7.vaccinated2) + (Number)(value.delta7.vaccinated1)

                        num[0].innerHTML = `${value.delta7.confirmed}`;
                        num[1].innerHTML = `${value.delta7.tested}`;
                        num[2].innerHTML = `${value.delta7.recovered}`;
                        num[3].innerHTML = `${totalVaccine}`;


                        // Graph Data Code
                        const ctx1 = document.getElementById('myChart1').getContext('2d');
                        const myChart1 = new Chart(ctx1, {
                            type: 'doughnut',
                            data: {
                                labels: ['Confirm', 'Tested', 'Recover', 'Vaccinated'],
                                datasets: [{
                                    label: 'Data',
                                    data: [value.delta7.confirmed, value.delta7.tested, value.delta7.recovered, totalVaccine],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)'
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0,2)',
                                        'rgba(75, 192, 192, 0.2)',
                                    ],
                                    hoverOffset: 4,
                                    borderWidth: 1
                                }]
                            },
                            options: {
                                scales: {
                                    y: {
                                        beginAtZero: true
                                    }
                                },
                                layout: {
                                    padding: 40
                                },
                                transitions: {
                                    show: {
                                      animations: {
                                        x: {
                                          from: 0
                                        },
                                        y: {
                                          from: 0
                                        }
                                      }
                                    },
                                    hide: {
                                      animations: {
                                        x: {
                                          to: 0
                                        },
                                        y: {
                                          to: 0
                                        }
                                      }
                                    }
                                }
                            }
                        });

                        const ctx2 = document.getElementById('myChart2').getContext('2d');
                        const myChart2 = new Chart(ctx2, {
                            type: 'line',
                            data: {
                                labels: ['Confirm', 'Tested', 'Recover', 'Vaccinated'],
                                datasets: [{
                                    label: 'Data',
                                    data: [value.delta7.confirmed, value.delta7.tested, value.delta7.recovered, totalVaccine],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)'
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0,2)',
                                        'rgba(75, 192, 192, 0.2)',
                                    ],
                                    hoverOffset: 4,
                                    borderWidth: 4
                                }]
                            },
                            options: {
                                scales: {
                                    y: {
                                        beginAtZero: true
                                    }
                                },
                                layout: {
                                    padding: 40
                                },
                                animations: {
                                    tension: {
                                      duration: 1000,
                                      easing: 'line',
                                      from: 1,
                                      to: 0,
                                      loop: true
                                    }
                                },
                                transitions: {
                                    show: {
                                      animations: {
                                        x: {
                                          from: 0
                                        },
                                        y: {
                                          from: 0
                                        }
                                      }
                                    },
                                    hide: {
                                      animations: {
                                        x: {
                                          to: 0
                                        },
                                        y: {
                                          to: 0
                                        }
                                      }
                                    }
                                }
                            }
                        });

                        // dataArr.push(Number(value.delta7.confirmed));
                        // dataArr.push(Number(value.delta7.tested));
                        // dataArr.push(Number(value.delta7.recovered));
                        // dataArr.push(totalVaccine);


                    }

                }
            }

        }).catch((error) => {
            console.log(error);
        });

    dataOutput.style.display = 'flex';

    // for (let i = 0; i < num.length; i++) {
    //   num[i].innerHTML = 0;
    //   const NUpdateData = () => {
    //     const targetnum = (Number)(dataArr[i]); // have to set api data for current Confirm,recovered,active cases
    //     const startnum = Number(num[i].innerHTML);

    //     const inc = Math.round(targetnum / 10000);


    //     if (startnum < targetnum) {
    //         num[i].innerHTML = `${startnum + inc}`;
    //         setInterval(NUpdateData, 100);
    //     }
    //     else {
    //         num[i].innerHTML = `${targetnum}`;
    //     }
    //   }

    //     NUpdateData();
    // }

});

// <---------------------------------------------------------------------------------------------------------------------->


const content = document.querySelector('#content');
const nav = document.querySelector('nav');
nav.addEventListener('click', handleNavClick);
function switchContent(title, html) {
    content.innerHTML = `
${title}
${html}
`;
}


function handleNavClick(e) {
    e.preventDefault();

    if (e.target.textContent === '關於我們') {
        switchContent('關於我們', '此系統包含飛機及機場資訊！');
    }
    else if (e.target.textContent === '單純顯示資料') {
        pureDisplay();
    } else if (e.target.textContent === 'CRUD操作') {
        crudOperate();
    } else if (e.target.textContent === '跨表格簡易存取') {
        crossTableBrief();
    } else if (e.target.textContent === '跨表格雙層折疊') {
        crossTableDoubleLayer();
    } else if (e.target.textContent === '視覺畫圖表') {
        VisualCharts();
    }
}
const axiosInstance = axios.create({
    baseURL: 'https://localhost:7061/api/',
    timeout: 5000,
});

function form_data_to_json(formData) {
    let object = {};
    formData.forEach(function (value, key) {
        if (value === 'true' || value === 'false') {
            object[key] = value === 'true';
        } else {
            object[key] = value;
        }
    });
    return object;
}

function VisualCharts(){
    const html=`
    <div>
        <button class='btnMenu2' onclick="SeatsForAirplanes()">飛機的座位數量圖表</button>
        <button class='btnMenu2' onclick="TerminalForAirports()">機場的航廈數量圖表</button>
       
    </div>
    `
    switchContent('視覺畫圖表', html);
    

}        
// {/* <button class='btnMenu2' onclick="PlanesForAirport()">機場裡飛機的數量圖表</button>  */}
function SeatsForAirplanes(){
    axiosInstance.get('Airplane')
    .then(res => {
        const airplane = res.data.airplanes;
        
        // 呼叫函式去呈現行事曆簡易資料在頁面中
        visual_airplane_seats(airplane);
    })
    .catch(err => {
        console.error(err);
    });
}

function visual_airplane_seats(airplane){
    let seats=airplane.map(item=>item.pseats);
    let names=airplane.map(item=>item.pname);
    console.log(seats);
    console.log(names)
    content.style.minHeight='500px';
    let myChart=echarts.init(content);
    let option;
    option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: names,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            color: '#AFEEEE',
            data: seats
          }
        ]
      };
    option && myChart.setOption(option);
}

function TerminalForAirports(){
    axiosInstance.get('Airport')
    .then(res => {
        const airport = res.data.airports;
        console.log(airport)
        // 呼叫函式去呈現行事曆簡易資料在頁面中
        visual_airport_terminals(airport);
    })
    .catch(err => {
        console.error(err);
    });
}

function visual_airport_terminals(airport){
    let terminals=airport.map(item=>item.aterminal);
    let names=airport.map(item=>item.aname);
    console.log(terminals);
    console.log(names)
    let pie_data =names.map(function(name,terminal){
        return{
            name: name,
            value: terminal,
        };
    })
    content.style.minHeight='500px';
    let myChart=echarts.init(content);
    let option;
    option = {
        title:{
            text: "機場航廈數量"
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '航廈數量',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: pie_data
          }
        ]
      };
    option && myChart.setOption(option);
}



// function PlanesForAirport(aid){
//     axiosInstance.get(`Cross/airplaneDetailsForAirport/${aid}`)
//         .then(res => {
//             const airport = res.data.data;
//             console.log(airport);
//             visual_airport_palnes(airport);
//         })
//         .catch(err => {
//             console.error(err);
//         });
// }

// function visual_airport_palnes(){
    
//     let names=airport.map(item=>item.aname);
//     let num=airport.airplanes.pname(item=>item.aterminal);
//     console.log(terminals);
//     console.log(num)
    // let pie_data =names.map(function(name,terminal){
    //     return{
    //         name: name,
    //         value: terminal,
    //     };
    // })
    // content.style.minHeight='500px';
    // let myChart=echarts.init(content);
    // let option;
    // option = {
    //     title:{
    //         text: "機場航廈數量"
    //     },
    //     tooltip: {
    //       trigger: 'item'
    //     },
    //     legend: {
    //       top: '5%',
    //       left: 'center'
    //     },
    //     series: [
    //       {
    //         name: '航廈數量',
    //         type: 'pie',
    //         radius: ['40%', '70%'],
    //         avoidLabelOverlap: false,
    //         itemStyle: {
    //           borderRadius: 10,
    //           borderColor: '#fff',
    //           borderWidth: 2
    //         },
    //         label: {
    //           show: false,
    //           position: 'center'
    //         },
    //         emphasis: {
    //           label: {
    //             show: true,
    //             fontSize: 40,
    //             fontWeight: 'bold'
    //           }
    //         },
    //         labelLine: {
    //           show: false
    //         },
    //         data: pie_data
    //       }
    //     ]
    //   };
    // option && myChart.setOption(option);
// }


function pureDisplay() {
    const html = `
    <button class='btnMenu' onclick="AirplaneFull()">飛機完整資料</button>
    <button class='btnMenu' onclick="AirportFull()">機場完整資料</button>
       
    `;
    switchContent('單純顯示資料的按鈕', html);
}

//CRUD操作
function crudOperate() {
    const html = `
    <button class='btnMenu' onclick="AirplaneFullCRUD()">CRUD飛機資料</button>
    <button class='btnMenu' onclick="AirportFullCRUD()">CRUD機場資料</button>
       
    `;
    switchContent('CRUD資料的按鈕', html);
}

// 「跨表格簡易存取」的首頁
function crossTableBrief() {
    const html = `
        <div class="button-container">
            <button class='btnMenu2' onclick="AirplanesForAirport()">機場可停的所有飛機</button>
            <button class='btnMenu2' onclick="AirportsForAirplane()">飛機可停的所有機場</button>
        </div>
    `;
    // 切換功能區域的內容
    switchContent('跨表格簡易存取', html);
}

// 點選「參與行事曆的會員」功能時，呼叫此函式
function AirplanesForAirport() {
    // 取得行事曆資料
    axiosInstance.get('Airport')
        .then(res => {
            const airport = res.data.airports;
            // 呼叫函式去呈現行事曆簡易資料在頁面中
            show_Airport_for_Airplane(airport);
        })
        .catch(err => {
            console.error(err);
        });
}

// 呈現「行事曆資料及參與會員按鈕」在頁面中
function show_Airport_for_Airplane(airport) {
    // 行事曆資料及參與會員按鈕
    const html = `
        <table>
            <thead>
                <tr>
                    <th>機場</th>
                    <th>機場名稱</th>
                    <th>操作功能</th>
                </tr>
            </thead>
            <tbody>
                ${airport.map(item => `
                    <tr>
                        <td>${item.aid}</td>
                        <td>${item.aname}</td>
                        <td>
                            <button class='doubleLayer' onClick="show_join_airplanes('${item.aid}')">機場能停放的飛機</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    // 切換功能區域的內容
    switchContent('所有的機場', html);
}


function show_join_airplanes(aid) {
    console.log(aid);
    axiosInstance.get(`Cross/AirplanesForAirport/${aid}`)
        .then(res => {
            const airport = res.data.airport;
            console.log(airport);
            show_join_airplanes_info(airport);
        })
        .catch(err => {
            console.error(err);
        });
}

// 顯示「行事曆及參與的會員」資料
function show_join_airplanes_info(airport) {
    const airplaneList = airport.airplanes;
    // 如果有多個會員，則用逗號隔開
    if (!airplaneList) {
        airplaneList.join(',');
    }

    const html = `
        <table>
            <tbody>
                <tr>
                    <th>機場編號</th>
                    <td><input type="text" id="aid" name="aid" value="${airport.aid}" disabled></td>
                </tr>
                <tr>
                    <th>機場名稱</th>
                    <td><input type="text" id="aname" name="aname" value="${airport.aname}" disabled></td>
                </tr>
                <tr>
                    <th>停放的飛機</th>                    
                    <td><input type="text" id="airplanes" name="airplanes" value="${airplaneList}" disabled></td>
                </tr>              
            </tbody>
        </table>
        <div class="button-container">
            <button id="closeButton">關閉</button>
        </div>
    `;

    // 切換功能區域的內容
    switchContent('機場的飛機列表', html);
    // 取得關閉按鈕
    const closeButton = document.getElementById('closeButton');

    // 設置關閉按鈕的功能
    closeButton.addEventListener('click', function () {
        // 重新列出最新的行事曆清單
        AirplanesForAirport();
    });
}


function AirplaneFull() {
    axiosInstance.get('Airplane')
        .then(res => {
            console.log(res);
            const airplane = res.data.airplanes;
            show_airplane_full(airplane);
        })
        .catch(err => {
            console.error(err);
        });
}//Nice

function show_airplane_full(airplane) {
    console.log(airplane);
    const html = `
    <table>
        <thead>
            <tr>
                <th>飛機名稱</th>
                <th>座位數量</th>
                <th>最高速度</th>
                <th>重量</th>
            </tr>
        </thead>
        <tbody>
            ${airplane.map(item => `
                <tr>
                    <td>${item.pname}</td>
                    <td>${item.pseats}</td>
                    <td>${item.pmaxspeed}</td>
                    <td>${item.pheavyload}</td>
                </tr>
                    
            `).join('')}
        </tbody>
    </table>`;
    switchContent('飛機資料', html);
}//Nice

function AirplaneFullCRUD() {
    axiosInstance.get('Airplane')
        .then(res => {
            console.log(res);
            const airplane = res.data.airplanes;
            show_airplane_CRUD(airplane);
        })
        .catch(err => {
            console.error(err);
        });
}//Nice

function show_airplane_CRUD(airplane) {
    console.log(airplane);
    const html = `
    <div class="button-container">
            <button class='createBtn' onclick="add_airplane()">新增飛機資料</button>
    </div>
    <table>
        <thead>
            <tr>
                <th>飛機名稱</th>
                <th>座位數量</th>
                <th>最高速度</th>
                <th>重量</th>
                <th>操作功能</th>
            </tr>
        </thead>
        <tbody>
            ${airplane.map(item => `
                <tr>
                    <td>${item.pname}</td>
                    <td>${item.pseats}</td>
                    <td>${item.pmaxspeed}</td>
                    <td>${item.pheavyload}</td>
                    <td>
                        <button class='updateBtn' onClick="update_airplane('${item.pid}')">修改</button>
                        <button class='deleteBtn' onClick="delete_airplane('${item.pid}')">刪除</button>
                    </td>
                </tr>
                    
            `).join('')}
        </tbody>
    </table>`;
    switchContent('飛機資料', html);
}//Nice

function add_airplane() {
    show_airplane_add();
}

// （新增）飛機
function show_airplane_add() {
    const html = `
    <form id="add-airplane-form">
        <table>
            <tbody>
                <tr>
                    <th>飛機名稱</th>
                    <td><input type="text" id="pname" name="pname"></td>
                </tr>
                <tr>
                    <th>座位數量</th>                    
                    <td><input type="number" id="pseats" name="pseats" min=1></td>
                </tr>                
                <tr>
                    <th>最高速度</th>                    
                    <td><input type="number" id="pmaxspeed" name="pmaxspeed" min=1></td>
                </tr>   
                <tr>
                    <th>重量</th>                    
                    <td><input type="number" id="pheavyload" name="pheavyload" min=1></td>
                </tr>   
            </tbody>
        </table>
        <button type="submit" class='addBtn'>確認新增</button>
    </form>
    `;
    switchContent('新增飛機資料', html);

    const form = document.querySelector('#add-airplane-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(form);
        const jsonData = form_data_to_json(formData);
        console.log(jsonData);
        axiosInstance.post(`Airplane`, jsonData)
            .then(res => {
                window.alert('飛機新增成功！');
                AirplaneFull();
            })
            .catch(err => {
                console.error(err);
            });
    });
}

// （修改）
function update_airplane(pid) {
    console.log(pid);
    axiosInstance.get(`Airplane/${pid}`)
        .then(res => {
            const airplane = res.data.airplanes;
            show_airplane_update(airplane);
        })
        .catch(err => {
            console.error(err);
        });
}

//-----------------------------------------------------------------------------------------------------------------------------------//
function show_airplane_update(airplane) {
    console.log(airplane);
    const html = `
    <form id="update-airplane-form">
        <table>
            <tbody>
                <tr>
                    <th>飛機名稱</th>
                    <td><input type="text" id="pname" name="pname" value="${airplane.pname}" ></td>
                </tr>
                <tr>
                    <th>座位數量</th>                    
                    <td><input type="number" id="pseats" name="pseats" min=1 value="${airplane.pseats}"></td>
                </tr>
                <tr>
                    <th>最高速度</th>                    
                    <td><input type="number" id="pmaxspeed" name="pmaxspeed" min=1 value="${airplane.pmaxspeed}"></td>
                </tr>
                <tr>
                    <th>重量</th>                    
                    <td><input type="number" id="pheavyload" name="pheavyload" min=1 value="${airplane.pheavyload}"></td>
                </tr>
                
            </tbody>
        </table>
        <button type="submit" class='updateBtn'>確認修改</button>
        </form>
    `;
    switchContent('飛機修改資料', html);

    const form = document.querySelector('#update-airplane-form');
    console.log(form)
    form.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(form);
        const jsonData = form_data_to_json(formData);
        console.log(jsonData);
        axiosInstance.put(`Airplane/${airplane.pid}`, jsonData)
            .then(res => {
                window.alert('飛機修改成功！');
                AirplaneFull();
            })
            .catch(err => {
                console.error(err);
            });
    });
}

function delete_airplane(pid) {
    axiosInstance.get(`Airplane/${pid}`)
        .then(res => {
            const airplane = res.data.airplanes;
            show_airplane_delete(airplane);
        })
        .catch(err => {
            console.error(err);
        });
}

// （刪除）呈現「行事曆刪除資料」在頁面中
function show_airplane_delete(airplane) {
    // 建立行事曆的 HTML 內容
    const html = `
    <form id="delete-airplane-form">
        <table>
            <tbody>
                <tr>
                    <th>飛機名稱</th>
                    <td><input type="text" id="pname" name="pname" value="${airplane.pname}" disabled></td>
                </tr>
                <tr>
                    <th>座位數量</th>                    
                    <td><input type="number" id="pseats" name="pseats" min=1 value="${airplane.pseats}" disabled></td>
                </tr>
                <tr>
                    <th>最高速度</th>                    
                    <td><input type="number" id="pmaxspeed" name="pmaxspeed" min=1 value="${airplane.pmaxspeed}" disabled></td>
                </tr>
                <tr>
                    <th>重量</th>                    
                    <td><input type="number" id="pheavyload" name="pheavyload" min=1 value="${airplane.pheavyload}" disabled></td>
                </tr>

                             
            </tbody>
        </table>
        <button type="submit" class='deleteBtn'>確認刪除</button>
     </form>
    `;
    // 切換功能區域的內容
    switchContent('飛機刪除資料', html);

    const form = document.querySelector('#delete-airplane-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        // 以 delete 方式連線至伺服端刪除資料
        axiosInstance.delete(`Airplane/${airplane.pid}`)
            .then(res => {
                window.alert('飛機刪除成功！');
                AirplaneFull();     // 重新列出最新的資料清單
            })
            .catch(err => {
                console.error(err);
            });
    });
}

//-----------------------------------------------------------------------------------------------------------------------------------//




//-----------------------------------------------------------------------------------------------------------------------------------//
function AirportFull() {
    axiosInstance.get('Airport')
        .then(res => {
            const airport = res.data.airports;
            show_airport_full(airport);
        })
        .catch(err => {
            console.error(err);
        });
}
function show_airport_full(airport) {
    console.log(airport);
    const html = `
    
    <table>
        <thead>
            <tr>
                <th>機場名稱</th>
                <th>航廈數</th>
                <th>停機坪數</th>
                <th>面積</th>
            </tr>
        </thead>
        <tbody>
            ${airport.map(item => `
                <tr>
                    <td>${item.aname}</td>
                    <td>${item.aterminal}</td>
                    <td>${item.aapron}</td>
                    <td>${item.aarea}</td>
                </td>
                </tr>
            `).join('')}
        </tbody>
    </table>`;
    switchContent('機場資料', html);
}
function show_airport_CRUD(airport) {
    console.log(airport);
    const html = `
    <div class="button-container">
            <button class='createBtn' onclick="add_airport()">新增飛機資料</button>
    </div>
    <table>
        <thead>
            <tr>
                <th>機場名稱</th>
                <th>航廈數</th>
                <th>停機坪數</th>
                <th>面積</th>
                <th>操作功能</th>
            </tr>
        </thead>
        <tbody>
            ${airport.map(item => `
                <tr>
                    <td>${item.aname}</td>
                    <td>${item.aterminal}</td>
                    <td>${item.aapron}</td>
                    <td>${item.aarea}</td>
                    <td>
                        <button class='updateBtn' onClick="update_airport('${item.aid}')">修改</button>
                        <button class='deleteBtn' onClick="delete_airport('${item.aid}')">刪除</button>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    </table>`;
    switchContent('機場資料', html);
}
function AirportFullCRUD() {
    axiosInstance.get('Airport')
        .then(res => {
            const airport = res.data.airports;
            show_airport_CRUD(airport);
        })
        .catch(err => {
            console.error(err);
        });
}
//DONE
//-----------------------------------------------------------------------------------------------------------------------------------//
function add_airport() {
    show_airport_add();
}
function show_airport_add() {

    const html = `
    <form id="add-airport-form">
        <table>
            <tbody>
                <tr>
                    <th>機場名稱</th>
                    <td><input type="text" id="aname" name="aname"></td>
                </tr>
                <tr>
                    <th>航廈數</th>                    
                    <td><input type="number" id="aterminal" name="aterminal" min=1></td>
                </tr>
                <tr>
                    <th>停機坪數</th>                    
                    <td><input type="number" id="aapron" name="aapron" min=1></td>
                </tr>    
                    <tr>
                    <th>面積</th>                    
                <td><input type="number" id="aarea" name="aarea" min=1></td>
        </tr>                    
            </tbody>
        </table>
        <button type="submit" class='addBtn'>確認新增</button>
    </form>
    `;

    switchContent('新增機場資料', html);
    const form = document.querySelector('#add-airport-form');
    form.addEventListener('submit', e => {
        e.preventDefault();

        const formData = new FormData(form);

        const jsonData = form_data_to_json(formData);
        console.log(jsonData);

        axiosInstance.post(`Airport`, jsonData)
            .then(res => {
                window.alert('機場新增成功！');
                AirportFull();
            })
            .catch(err => {
                console.error(err);
            });
    });
}
//DONE
//-----------------------------------------------------------------------------------------------------------------------------------//
function update_airport(aid) {
    // console.log(aid);

    axiosInstance.get(`Airport/${aid}`)
        .then(res => {
            const airport = res.data.airport;
            console.log(airport);
            show_airport_update(airport);
        })
        .catch(err => {
            console.error(err);
        });
}
function show_airport_update(airport) {
    console.log(airport);
    const html = `
    <form id="update-airport-form">
        <table>
            <tbody>
                <tr>
                    <th>機場名稱</th>
                    <td><input type="text" id="aname" name="aname" value="${airport.aname}"></td>
                </tr>
                <tr>
                    <th>航廈數</th>                    
                    <td><input type="number" id="aterminal" name="aterminal" min=1 value="${airport.aterminal}"></td>
                </tr>
                <tr>
                    <th>停機坪數</th>                    
                    <td><input type="number" id="aapron" name="aapron" min=1 value="${airport.aapron}"></td>
                </tr>
                <tr>
                    <th>面積</th>                    
                    <td><input type="number" id="aarea" name="aarea" min=1 value="${airport.aarea}"></td>
                </tr>
            </tbody>
        </table>
        <button type="submit" class='updateBtn'>確認修改</button>
        </form>
    `;
    switchContent('機場修改資料', html);
    const form = document.querySelector('#update-airport-form');
    console.log(form)
    form.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(form);
        const jsonData = form_data_to_json(formData);
        console.log(jsonData);
        axiosInstance.put(`Airport/${airport.aid}`, jsonData)
            .then(res => {
                window.alert('機場修改成功！');
                AirportFull();
            })
            .catch(err => {
                console.error(err);
            });
    });
}
//DONE
//-----------------------------------------------------------------------------------------------------------------------------------//
function delete_airport(aid) {
    axiosInstance.get(`Airport/${aid}`)
        .then(res => {
            const airport = res.data.airport;
            show_airport_delete(airport);
        })
        .catch(err => {
            console.error(err);
        });
}
function show_airport_delete(airport) {
    // 建立行事曆的 HTML 內容
    const html = `
    <form id="delete-airport-form">
        <table>
            <tbody>
                <tr>
                    <th>機場名稱</th>
                        <td><input id="aname" name="aname" value="${airport.aname}" disabled></td>
                    </tr>
                    <tr>
                        <th>航廈數</th>                    
                        <td><input id="aterminal" name="aterminal" value="${airport.aterminal}" disabled></td>
                    </tr>
                    <tr>
                        <th>停機坪數</th>                    
                        <td><input id="aapron" name="aapron" value="${airport.aapron}" disabled></td>
                    </tr>    
                        <tr>
                        <th>面積</th>                    
                    <td><input id="aarea" name="aarea" value="${airport.aarea}" disabled></td>
                    </tr>       
                </tbody>              
           </table>
        <button type="submit" class='deleteBtn'>確認刪除</button>
     </form>
    `;
    // 切換功能區域的內容
    switchContent('機場刪除資料', html);

    const form = document.querySelector('#delete-airport-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        // 以 delete 方式連線至伺服端刪除資料
        axiosInstance.delete(`Airport/${airport.aid}`)
            .then(res => {
                window.alert('機場刪除成功！');
                AirportFull();     // 重新列出最新的資料清單
            })
            .catch(err => {
                console.error(err);
            });
    });
}
//DONE
//-----------------------------------------------------------------------------------------------------------------------------------//
//01
function AirportsForAirplane() {

    axiosInstance.get('Airplane')
        .then(res => {
            const airplane = res.data.airplanes;
            
            show_Airplane_for_Airport(airplane);
        })
        .catch(err => {
            console.error(err);
        });
}
//02
function show_Airplane_for_Airport(airplane) {
    const html = `
        <table>
            <thead>
                <tr>
                    <th>飛機</th>
                    <th>飛機名稱</th>
                    <th>操作功能</th>
                </tr>
            </thead>
            <tbody>
                ${airplane.map(item => `
                    <tr>
                        <td>${item.pid}</td>
                        <td>${item.pname}</td>
                        <td>
                            <button class='doubleLayer' onClick="show_join_airport('${item.pid}')">飛機停放的機場</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    switchContent('所有的飛機', html);
}
//03
function show_join_airport(pid) {
    axiosInstance.get(`Cross/AirportsForAirplane/${pid}`)
        .then(res => {
            const airplane = res.data.airplane;
            console.log(airplane);
            show_join_airport_details(airplane);
        })
        .catch(err => {
            console.error(err);
        });
}
//04
function show_join_airport_details(airplane) {
    const airportList = airplane.airports;
    console.log(airportList)
    if (!airportList) {
        airportList.join(',');
    }
    const html = `
        <table>
            <tbody>
                <tr>
                    <th>飛機編號</th>
                    <td><input type="text" id="pid" name="pid" value="${airplane.pid}" disabled></td>
                </tr>
                <tr>
                    <th>飛機名稱</th>
                    <td><input type="text" id="pname" name="pname" value="${airplane.pname}" disabled></td>
                </tr>
                <tr>
                    <th>停放的機場</th>                    
                    <td><input type="text" id="airports" name="airports" value="${airportList}" disabled></td>
                </tr>              
            </tbody>
        </table>
        <div class="button-container">
            <button id="closeButton">關閉</button>
        </div>
    `;
    switchContent('飛機所在的機場', html);
    const closeButton = document.getElementById('closeButton');
    closeButton.addEventListener('click', function () {
        AirportsForAirplane();
    });
}

//-----------------------------------------------------------------------------------------------------------------------------------//
function crossTableDoubleLayer() {
    const html = `
        <div class="button-container">
            <button class='btnMenu2' onclick="airportDetailsForAirplane()">飛機可停放的機場詳細資料</button>
            <button class='btnMenu2' onclick="airplaneDetailsForAirport()">可停放在機場的飛機詳細資料</button>
        </div>
    `;
    switchContent('跨表格雙層折疊', html);
}

function airplaneDetailsForAirport() {
    axiosInstance.get('Airport')
        .then(res => {
            const airport = res.data.airports;
            show_airport_list(airport);
        })
        .catch(err => {
            console.error(err);
        });
}

function airportDetailsForAirplane() {
    axiosInstance.get('Airplane')
        .then(res => {
            const airplane = res.data.airplanes;
            show_airplane_list(airplane);
        })
        .catch(err => {
            console.error(err);
        });
}

function show_airport_list(airport) {
    const html = `
        <table>
            <thead>
                <tr>
                <th>機場名稱</th>
                <th>航廈數</th>
                <th>停機坪數</th>
                <th>面積</th>
                </tr>
            </thead>
            <tbody>
                ${airport.map(item => `
                    <tr onClick="show_all_airplanes_for_airport(event, '${item.aid}')">
                    <td>${item.aname}</td>
                    <td>${item.aterminal}</td>
                    <td>${item.aapron}</td>
                    <td>${item.aarea}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    switchContent('查看參與的機場機詳細資料', html);
}

function show_airplane_list(airplane) {
    const html = `
        <table>
            <thead>
                <tr>
                <th>飛機名稱</th> 
                <th>座位數量</th>
                <th>最高速度</th>
                <th>重量</th>
                </tr>
            </thead>
            <tbody>
                ${airplane.map(item => `
                    <tr onClick="show_all_airports_for_airplane(event, '${item.pid}')">
                    <td>${item.pname}</td>
                    <td>${item.pseats}</td>
                    <td>${item.pmaxspeed}</td>
                    <td>${item.pheavyload}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    switchContent('查看參與的飛機詳細資料', html);
}

function show_all_airplanes_for_airport(event, aid) {
    axiosInstance.get(`Cross/airplaneDetailsForAirport/${aid}`)
        .then(res => {
            const airport = res.data.data;
            console.log(airport);
            show_airplane_details_info(event, airport);
        })
        .catch(err => {
            console.error(err);
        });
}

function show_all_airports_for_airplane(event, pid) {
    axiosInstance.get(`Cross/airportDetailsForAirplane/${pid}`)
        .then(res => {
            const airplane = res.data.data;
            show_airport_details_info(event, airplane);
        })
        .catch(err => {
            console.error(err);
        });
}

function show_airplane_details_info(event, airport) {
    const row = event.target.parentElement;

    let nextRow = null;
    if (row.nextElementSibling)
        nextRow = row.nextElementSibling.children[0];
    if (nextRow && nextRow.classList.contains('subtable')) {
        if (nextRow.classList.contains('hidden')) {
            nextRow.classList.remove('hidden');
        } else {
            nextRow.classList.add('hidden');
        }
    }
    else {
        const airplaneList = airport.airplanes;
        if (airplaneList.length > 0) {
            const html = `<td colspan="4" class="subtable">
            <table style='width:80%'>
                <thead>
                    <tr>
                        <th class='nested'>飛機名稱</th>
                        <th class='nested'>座位數量</th>
                        <th class='nested'>最高速度</th>
                        <th class='nested'>重量</th>
                    </tr>
                </thead>
                <tbody>
                    ${airplaneList.map(item => `
                        <tr>                               
                            <td>${item.pname}</td>
                            <td>${item.pseats}</td>
                            <td>${item.pmaxspeed}</td>
                            <td>${item.pheavyload}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </td>`;
            row.insertAdjacentHTML('afterend', html);
            console.log(html);
        }
        else { 
            let html2 = `<td colspan="4" class="subtable">
                    <label style='color:red'>
                        沒有任何飛機參與此機場
                    </label>
                </td>
                `;
            row.insertAdjacentHTML('afterend', html2);
        }
    }
}

function show_airport_details_info(event, airplane) {
    const row = event.target.parentElement;

    let nextRow = null;
    if (row.nextElementSibling)
        nextRow = row.nextElementSibling.children[0];
    if (nextRow && nextRow.classList.contains('subtable')) {
        if (nextRow.classList.contains('hidden')) {
            nextRow.classList.remove('hidden');
        } else {
            nextRow.classList.add('hidden');
        }
    } else {

        const airportList = airplane.airports;

        if (airportList.length > 0) {
            const html = `<td colspan="4" class="subtable">
            <table style='width:80%'>
                <thead>
                    <tr>
                        <th class='nested'>機場名稱</th>
                        <th class='nested'>航廈數</th>
                        <th class='nested'>停機坪數</th>
                        <th class='nested'>面積</th>
                    </tr>
                </thead>
                <tbody>
                    ${airportList.map(item => `
                        <tr>                               
                            <td>${item.aname}</td>
                            <td>${item.aterminal}</td>
                            <td>${item.aapron}</td>
                            <td>${item.aarea}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </td>`;
            row.insertAdjacentHTML('afterend', html);
        } else { 
            let html2 = `<td colspan="4" class="subtable">
                    <label style='color:red'>
                        沒有任何機場參與此飛機
                    </label>
                </td>
                `;
            row.insertAdjacentHTML('afterend', html2);
        }
    }

}
//---------------------------------------------------------------------------------------------------------------------------------//


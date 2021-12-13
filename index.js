var app = new Vue({
  el: "#app",

  //vuetify 객체를 사용
  vuetify: new Vuetify(),
  //viewModel 변수 선언 
  data: {
    subject: "행운의 로또",
    lotto_numbers: "",
    auto: false, //체크박스용 viewmodal 함수
    auto_yn: "N", //라디오버튼용 view model 함수 
    choice: "",
    president_list: [
      { "no": 1, "name": "이재명" },
      { "no": 2, "name": "윤석열" },
      { "no": 3, "name": "안철수" },
      { "no": 4, "name": "심상정" },
    ],

    lotto_number_list: [],

    color_list: ["red", "orange", "green", "blue", "pink", "purple"]
  },

  //이벤트 또는 함수 선언 
  methods: {
    //auto check 클릭 이벤트 
    //자동 체크박스 클릭시 이벤트 처리 
    auto_check() {
      //자동일 경우는 자동 번호 입력
      if (this.auto || this.auto_yn == "Y") {
        console.log(100, this.auto);
        this.lotto_numbers = "11 22 33 44 12 34";

      }
      else if (!this.auto || this.auto_yn == "N") {
        console.log(200, this.auto);
        this.lotto_numbers = "";
      }
    },

    reset() {
      console.log('button : ', this.auto);
      this.lotto_number_list = ''
    },

    get_data(url, params, callback) {

      var query = "";
      if (params != "") {
        query = "?" + Object.keys(params).map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k])).join("&");
      }

      var headers = { "Content-Type": "applicatio/json" };
      fetch(url + query, {
        method: "GET",
        headers: headers
      })
        .then(response => { //상태(status:200,400)를 확인하기 위한 용도로 사용

          if (response.status == 200) {
            return response.json();
          }
        })
        .then(response => { //결과값을 받기 위한 용도로 사용

          if (response != undefined) {
            if (callback) callback(response);
          }
        })
        .catch(error => console.error("Error:", error));

    },

    button_number() {
      var url = "http://apps.forcei.co.kr:19002/api/get_last_lotto_numbers"
      this.get_data(url, "", (data) => {
        this.lotto_number_list = data;
        console.log(100, this.lotto_number_list);

        this.color_list[1];
      })

    },
  }
});

export default app;


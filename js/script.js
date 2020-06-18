var apiKey = process.env.IP_API
var app = new Vue({
  el: "#app",
  data: {
    city: "",
    country: "",
    method: 1,
    school: 1,
    times: {},
    date: "",
    showChangeCityModal: false,
  },
  methods: {
    showModal: function (show) {
      if (show) {
        this.showChangeCityModal = true;
      } else {
        this.showChangeCityModal = false;
      }
    },
    refreshData: function () {
      axios
        .get(
          `https://api.aladhan.com/v1/timingsByCity?city=${this.city}&country=${this.country}&method=1&school=1`
        )
        .then((res) => {
          if(res.code != 400) {
            this.times = res.data.data.timings;
            this.date = `${res.data.data.date.gregorian.weekday.en}, ${res.data.data.date.hijri.day} ${res.data.data.date.hijri.month.en} ${res.data.data.date.hijri.year}AH`;
            this.showModal(false);
            document.getElementById("check").checked = false
          } else { 
              this.date = "Invalid"
          }
        });
      
    },
  },
  beforeMount() {
    axios.get(`http://api.ipstack.com/check?access_key=${apiKey}&format=1`).then((a) => {
        this.city = a.data.city
        this.country = a.data.country
        this.refreshData()
    })
  },
});
// https://api.aladhan.com/v1/timingsByCity?city=Karachi&country=Pakistan&method=1&school=1

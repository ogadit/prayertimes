var app = new Vue({
  el: "#app",
  data: {
    city: "",
    country: "",
    method: 1,
    methodList: [
      "Shia Ithna-Ansar",
      "University of Islamic Sciences, Karachi",
      "Islamic Society of North America",
      "Muslim World League",
      "Umm Al-Qura University, Makkah",
      "Egyptian General Authority of Survey",
      "Institute of Geophysics, University of Tehran",
      "Gulf Region",
      "Kuwait",
      "Qatar",
      "Majlis Ugama Islam Singapura, Singapore",
      "Union Organization islamic de France",
      "Diyanet İşleri Başkanlığı, Turkey",
      "Spiritual Administration of Muslims of Russia",
    ],
    school: 1,
    schoolList: [
      "Shafa'i",
      "Hanafi"
    ],
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
          `https://api.aladhan.com/v1/timingsByCity?city=${this.city}&country=${this.country}&method=${this.method}&school=${this.school}`
        )
        .then((res) => {
          if (res.code != 400) {
            this.times = res.data.data.timings;
            this.date = `${res.data.data.date.gregorian.weekday.en}, ${res.data.data.date.hijri.day} ${res.data.data.date.hijri.month.en} ${res.data.data.date.hijri.year}AH`;
            this.showModal(false);
          } else {
            this.date = "Invalid";
          }
        });
    },
  },
  beforeMount() {
    axios.get(`https://ipapi.co/json/`).then((a) => {
      this.city = a.data.city;
      this.country = a.data.country_name;
      this.refreshData();
    });
  },
});

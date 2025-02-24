function getWeather() {
    let city = document.getElementById("cityInput").value;
    if (city.trim() === "") {
        alert("Masukkan nama kota terlebih dahulu!");
        return;
    }
    fetchWeather(city);
}

function getWeatherByCity(city, countryCode) {
    document.getElementById("cityInput").value = city; // Isi input dengan kota yang dipilih
    fetchWeather(city);
}

function fetchWeather(city) {
    let apiKey = "e86b106f6fd646fcbb893541251602"; // Ganti dengan API key Anda
    let apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=id`;

    // Tampilkan loading spinner
    document.getElementById("loading").classList.remove("hidden");
    document.getElementById("weather-result").classList.add("hidden");

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById("weather-result").innerHTML = `<p>❌ Data tidak ditemukan!</p>`;
            } else {
                let countryCode = getCountryCode(data.location.country);
                let countryFlagUrl = `https://flagcdn.com/w80/${countryCode}.png`;

                document.getElementById("country-flag").src = countryFlagUrl;
                document.getElementById("country-flag").alt = `Bendera ${data.location.country}`;

                document.getElementById("city-name").textContent = `${data.location.name}, ${data.location.country}`;
                document.getElementById("temperature").textContent = `🌡️ Suhu: ${data.current.temp_c}°C`;
                document.getElementById("condition").textContent = `🌤️ Kondisi: ${data.current.condition.text}`;
                document.getElementById("humidity").textContent = `💧 Kelembaban: ${data.current.humidity}%`;
                document.getElementById("wind-speed").textContent = `💨 Kecepatan Angin: ${data.current.wind_kph} km/jam`;
            }
        })
        .catch(error => {
            console.error("Terjadi kesalahan:", error);
            document.getElementById("weather-result").innerHTML = `<p>⚠️ Gagal mengambil data cuaca.</p>`;
        })
        .finally(() => {
            document.getElementById("loading").classList.add("hidden");
            document.getElementById("weather-result").classList.remove("hidden");
        });
}

// Fungsi mengonversi nama negara menjadi kode negara
function getCountryCode(countryName) {
    let countryCodes = {
        "Indonesia": "id",
        "Singapore": "sg",
        "United States": "us",
        "Taiwan": "tw",
        "Malaysia": "my",
        "Japan": "jp",
        "Australia": "au"
    };
    return countryCodes[countryName] || "un"; // Jika tidak ditemukan, tampilkan "un" (bendera PBB)
}

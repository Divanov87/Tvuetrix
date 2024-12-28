import { onMounted, ref } from 'vue';

const API_KEY = import.meta.env.VITE_GEO_LOCATION_API_KEY;

export function useLocation() {
  const city = ref(null);

  onMounted(() => {
    const isSecureConnection = window.location.protocol === 'https:';

    if (!isSecureConnection) {
      console.log('Geo-location not used because the connection is not secure!');
      city.value = null;
      return;
    }

    const getLocationAndFetchCity = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              console.log(`Geolocation obtained: lat=${latitude}, lon=${longitude}`);
              const geocodingApiUrl = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${API_KEY}`;
              const response = await fetch(geocodingApiUrl);
              const data = await response.json();
              // city.value = data.address.city_district;
              city.value = data.address.city;
              console.log(`City obtained from geocoding: ${city.value}`);
            }
            catch (error) {
              console.error('Error fetching geocoding data:', error);
              city.value = null;
            }
          },
          (error) => {
            console.log('User denied geolocation prompt!', error);
            city.value = null;
          },
        );
      }
      else {
        console.error('Geo-location is not supported by this browser.');
        city.value = null;
      }
    };

    getLocationAndFetchCity();
  });

  return { city };
}

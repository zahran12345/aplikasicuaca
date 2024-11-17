const request = require('postman-request');

const getNews = (category, callback) => {
    const url = 'https://api.mediastack.com/v1/news?access_key=564ead8b5127f8a176c84c76387e9743&categories=' + 
        encodeURIComponent(category) + '&countries=id';

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Tidak dapat terkoneksi ke layanan berita', undefined);
        } else if (response.body.error) {
            console.error('Error dari API:', response.body.error); // Log error detail
            callback('Tidak dapat menemukan berita', undefined);
        } else if (!response.body.data || !Array.isArray(response.body.data)) {
            callback('Format data tidak sesuai', undefined);
        } else {
            const articles = response.body.data.map((article) => ({
                title: article.title,
                description: article.description,
                url: article.url
            }));

            callback(undefined, articles);
        }
    });
};

module.exports = getNews;

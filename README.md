Daha önce yapmış olduğum "To-do App " uygulamasına, JsonWebToken(JWT) kütüphanesi kullanarak , kullanıcı girişi esnasında güvenlik oluşturulmuştur. 
Buna ek olarak kullanıcıların bilgileri LocalStorage' de saklanmıştır . 
Her kullanıcının özel bir Tokeni bulunuyor ve bu yüzden hepsinin to do listesi bir birinden farklıdır . 
Server.js kullanılarak depolama sunucusu oluşturulmuştur . 
Postman kullanımını pekiştirerek Get Post komuntları serverde çalışması gözlemlenmiştir .
Todo listesinde eklenen görevlere , edit save delete komutları eklenmiştir . Todo app Refresh edildiği zaman artık sıfırlanmıyor bilgiler kullanıcıya özel olacak şekilde 
local storage de token altında saklanıyor .
...

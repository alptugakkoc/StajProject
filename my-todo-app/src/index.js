import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*

// React kütüphanesini içe aktarır. React, kullanıcı arayüzleri oluşturmak için kullanılan bir JavaScript kütüphanesidir.
import React from 'react';

// ReactDOM kütüphanesini içe aktarır. ReactDOM, React bileşenlerini DOM'a yerleştirmek için kullanılır.
import ReactDOM from 'react-dom/client';

// Proje içindeki 'App' bileşenini içe aktarır. Bu, uygulamanın ana bileşenidir ve uygulamanızın başlangıç noktasıdır.
import App from './App';

// Proje içindeki stil dosyasını içe aktarır. Bu dosya, uygulamanızın genel stil ve tasarımını belirler.
import './index.css';

// DOM'daki 'root' ID'sine sahip öğeyi seçer ve bu öğe üzerinde React bileşenlerini render etmek için bir kök oluşturur.
const root = ReactDOM.createRoot(document.getElementById('root'));

// React.StrictMode, uygulamanızın bazı kodlarını daha dikkatli bir şekilde kontrol eden bir geliştirme aracıdır. Bu, hata ayıklamayı kolaylaştırabilir.
root.render(
  <React.StrictMode>
    {/* 'App' bileşenini render eder. 'App', uygulamanızın ana bileşenidir ve tüm diğer bileşenleri kapsar. }
    <App />
  </React.StrictMode>
); 
*/
import React from 'react';

const TodoItem = ({ todo, toggleComplete, removeTodo }) => {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
        />
      </td>
      <td style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </td>
      <td>
        <button
          className="remove-button"
          onClick={() => removeTodo(todo.id)}
        >
          Sil
        </button>
      </td>
    </tr>
  );
};

export default TodoItem;


/*
// React kütüphanesini içe aktarır.
import React from 'react';

// TodoItem fonksiyon bileşenini tanımlar. Bu bileşen her bir todo öğesini temsil eder.
// 'todo', 'toggleComplete', ve 'removeTodo' özelliklerini (props) alır.
const TodoItem = ({ todo, toggleComplete, removeTodo }) => {
  return (
    // Todo öğesini bir tablo satırı (<tr>) olarak render eder.
    <tr>
      {/* Todo'nun tamamlanma durumunu göstermek için bir checkbox içerir. }
      <td>
        <input
          type="checkbox" // Checkbox tipi input elemanıdır.
          checked={todo.completed} // Todo'nun tamamlanma durumu checkbox'un işaretli olup olmadığını belirler.
          onChange={() => toggleComplete(todo.id)} // Checkbox'ın durumu değiştiğinde 'toggleComplete' fonksiyonunu çağırır.
        />
      </td>
      {/* Todo'nun metnini gösterir. Tamamlanmışsa metni üstü çizili yapar. }
      <td style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </td>
      {/* Todo'yu silmek için bir buton içerir. }
      <td>
        <button
          className="remove-button" // Silme butonuna stil verir.
          onClick={() => removeTodo(todo.id)} // Butona tıklandığında 'removeTodo' fonksiyonunu çağırır.
        >
          Sil {/* Butonun üzerindeki metin }
        </button>
      </td>
    </tr>
  );
};

// TodoItem bileşenini dışa aktarır, böylece diğer dosyalarda kullanılabilir.
export default TodoItem;
*/

/*Açıklamalar:
React Import: React'i içe aktararak bileşenleri tanımlar ve JSX kullanımı sağlar.
Fonksiyon Bileşeni: TodoItem, her bir todo öğesini temsil eden bir fonksiyon bileşenidir. Props olarak todo, toggleComplete, ve removeTodo alır.
Tablo Satırı: <tr> etiketi içinde, todo öğesini bir tablo satırı olarak render eder.
Checkbox:
type="checkbox": Checkbox tipi input elemanıdır.
checked={todo.completed}: todo.completed değeri true ise checkbox işaretlenir, false ise işaretlenmez.
onChange={() => toggleComplete(todo.id)}: Checkbox'ın durumu değiştiğinde toggleComplete fonksiyonunu çağırır, böylece todo'nun tamamlanma durumu güncellenir.
Metin Stili:
style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}: Eğer todo.completed true ise, metnin üzerini çizer (çizgi çeker). Aksi takdirde metin normal görünür.
Silme Butonu:
className="remove-button": Silme butonuna stil verir.
onClick={() => removeTodo(todo.id)}: Butona tıklandığında removeTodo fonksiyonunu çağırır, böylece belirtilen todo öğesi listeden silinir.
Export: TodoItem bileşenini dışa aktarır, böylece diğer dosyalarda kullanılabilir.
Bu bileşen, her bir todo öğesini tablo satırı olarak gösterir, checkbox ile tamamlanma durumunu kontrol eder ve bir buton ile todo öğesini silme işlevi sunar.*/
// Promises

// 1. Создайте функцию, которая принимает массив URL и функцию fetch, и запускает все запросы параллельно, но с ограниченным количеством одновременных запросов. Например, если вы запрашиваете 100 URL, но у вас есть ограничение в 5 одновременных запросов, то ваша функция должна гарантировать, что в любой момент времени не будет больше 5 одновременных запросов.

/* var parallelPromisesWithLimit = async function (promisesArr, parallelLimit) {
  let promises = [];
  let preResult = [];
  let result = [];
  for (let i = 0; i < promisesArr.length; i++) {
    promises.push(promisesArr[i]());
  }
  for (let i = 0; i < promises.length; i += parallelLimit) {
    preResult.push(promises.slice(i, i + parallelLimit));
  }
  for (let i = 0; i < preResult.length; i++) {
    let limitFetchCalls = await Promise.all(preResult[i]);
    result.push(limitFetchCalls);
  }
  const flatArr = result.flat();
  return flatArr;
};

const testURLs = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3",
  "https://jsonplaceholder.typicode.com/posts/4",
  "https://jsonplaceholder.typicode.com/posts/5",
  "https://jsonplaceholder.typicode.com/posts/6",
  "https://jsonplaceholder.typicode.com/posts/7",
  "https://jsonplaceholder.typicode.com/posts/8",
  "https://jsonplaceholder.typicode.com/posts/9",
  "https://jsonplaceholder.typicode.com/posts/10",
];

function mockFetch(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Response from ${url}`);
    }, 1);
  });
}

async function test(time) {
  // Запуск 5 одновременных запросов
  const results = await parallelPromisesWithLimit(
    testURLs.map((url) => () => mockFetch(url)),
    time
  );

  return results;
}

test(5).then((res) => console.log(res)); */

/* var parallelPromisesWithLimit = async function (promisesArr, parallelLimit, mockFetch) {
  let result = [];
  // максимум 5 запросов
  for (let i = 0; i < promisesArr.length; i += parallelLimit) {
    let urlBatch = promisesArr.slice(i, i + parallelLimit)
    let batchResult = await Promise.all(
        urlBatch.map((url) => {
            return mockFetch(url)
        })
    )
    console.log('result', result)
    console.log("batch results", batchResult)
    result = [...result, ...batchResult]
  }
  console.log('result', result)
  return result
};

const testURLs = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3",
  "https://jsonplaceholder.typicode.com/posts/4",
  "https://jsonplaceholder.typicode.com/posts/5",
  "https://jsonplaceholder.typicode.com/posts/6",
  "https://jsonplaceholder.typicode.com/posts/7",
  "https://jsonplaceholder.typicode.com/posts/8",
  "https://jsonplaceholder.typicode.com/posts/9",
  "https://jsonplaceholder.typicode.com/posts/10",
];

function mockFetch(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`mock fetch ${url}`)
      resolve(`Response from ${url}`);
    }, 2);
  });
}

async function test(time) {
  // Запуск 5 одновременных запросов
  const results = await parallelPromisesWithLimit(testURLs, time, mockFetch);

  return results;
}

// console.log(test(5));
test(5).then((res) => console.log('res', res)); */

// 2. Реализуйте функцию runInOrder(functions, delays), которая принимает массив функций и массив задержек, и выполняет функции в указанном порядке с соответствующими задержками.

/* function runInOrder(functions, delays) {
  if (functions.length === delays.length) {
    for (let i = 0; i < functions.length; i++) {
      console.log(functions[i], delays[i])
      setTimeout(() => functions[i](), delays[i])
    }
  }
 }
 
 
 const functions = [() => console.log("first"), () => console.log("second"), () => console.log("third")];
 const delays = [2000, 1000, 3000];
 
 runInOrder(functions, delays); // logs "first" after 2 seconds, "second" after another 1 second, and "third" after another 3 seconds */
 
 // 3. Реализуйте функцию asyncEvery(array, predicate), которая работает аналогично Array.prototype.every(), но с поддержкой асинхронных предикатов.

 var asyncEvery = async function (array, predicate) {
  for (let item of array) {
    if (!await predicate(item)) {
      return false
    }
  }
  return true;
};

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

array = [1,2,3,4,5]
predicate = async (num, index) => {
  await delay(50);
  return num < 4;
}

asyncEvery(array, predicate).then(res => console.log('res', res))

/* 4. Напишите функцию fetchData, которая симулирует асинхронный запрос данных. Функция должна принимать два параметра: url и callback. fetchData должна возвращать промис, который разрешается через 2 секунды с фиктивными данными, и затем вызывает функцию callback.

Необходимо вернуть data такого вида:

const data = { result: 'Some data receiasdasdved from ' + url }; */

var fetchData = function (url, callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { result: `Some data received from ${url}` };
      resolve(data)
      callback(data)
    }, 2000)
  })
};

// Пример использования функции fetchData
const url = 'https://example.com/data';
fetchData(url, (data) => {
  console.log('Callback function was called with data:', data);
}).then((data) => {
  console.log('Promise was resolved with data:', data);
}).catch((error) => {
  console.error('Error occurred:', error);
});

// 5. Реализуйте функцию delay(ms), которая возвращает промис, разрешающийся через указанное количество миллисекунд.

var delay = function (ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), ms)
  })
};

delay(3000).then(() => console.log('Runs after 3 seconds'));

// Алгоритмика

// 1. Проверка на палиндром

/* Ограничения:

1 <= s.length <= 2 * 105
s состоит только из печатных символов ASCII.
Алгоритм 1
Задача заключается в определении, является ли данная строка палиндромом после удаления неалфавитно-цифровых символов и преобразования всех заглавных букв в строчные.

Для решения задачи мы можем использовать два указателя - один начнет с начала строки, а второй с конца строки. Мы будем сравнивать символы, на которые указывают указатели, и если они не совпадают, то строка не является палиндромом. Если символы совпадают, мы будем продолжать сравнивать символы, двигая оба указателя внутрь строки до тех пор, пока строка не будет полностью просканирована.

Если оба указателя пересекутся или встретятся в середине строки, это означает, что строка является палиндромом.

Однако перед началом сравнения символов необходимо привести строку к нужному формату. Мы превратим все буквы в строчные с помощью функции toLowerCase(), а затем удалим все неалфавитно-цифровые символы с помощью регулярного выражения.

В результате мы вернем true, если строка является палиндромом, и false в противном случае.

Это решение имеет сложность времени O(n), где n - длина строки s. */

function isPalindrome(s) {
  // Приводим строку к нижнему регистру и удаляем все неалфавитно-цифровые символы
  s = s.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Используем два указателя - один начнет с начала строки, а второй с конца
  let left = 0;
  let right = s.length - 1;

  // Пока указатели не пересекутся или не встретятся в середине строки
  while (left < right) {
    // Если символы не совпадают, строка не является палиндромом
    if (s[left] !== s[right]) {
      return false;
    }
    // Перемещаем указатели внутрь строки
    left++;
    right--;
  }

  // Если вышли из цикла, значит строка является палиндромом
  return true;
}

// Задание: Что выведется в консоль? Объясните почему.

let a = {}, b = { key: 'b' }, c = { key: 'c'}

a[b] = 27
a[c] = 46

console.log(a[b])

let o = {}

const key1 = 'name'
const key2 = 'age'
o[key1] = 'Vova'
o[key2] = 37

console.log(o)
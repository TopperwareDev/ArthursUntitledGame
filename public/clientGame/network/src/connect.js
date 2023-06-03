/*
    Connect to the world
*/

function connect() {
  return new Promise((resolve, reject) => {
    const url = "./network/connect";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        resolve();
      })
      .catch((error) => {
        console.error("Request failed:", error);
        reject();
      });
  });
}


export default function promiseClick(button) {
  return new Promise(resolve => {
    resolve(button.addEventListener('click', (event) => event, {once: true}));
  });
}

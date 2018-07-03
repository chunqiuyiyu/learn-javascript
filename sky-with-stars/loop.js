const loop = (update) => {
  //game loop
  let lastTime;
  const callback = (millis) => {
    if (lastTime) {
      update((millis - lastTime) / 1000)
    }
    lastTime = millis;
    requestAnimationFrame(callback);
  }

  callback();
}
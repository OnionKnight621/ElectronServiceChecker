function sleep(ms: number): void {
  const t = new Date().getTime();
  let i = 0;
  while (new Date().getTime() - t < ms) {
    i++;
  }
}

export default sleep;

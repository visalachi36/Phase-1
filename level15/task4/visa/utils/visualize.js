import asciichart from "asciichart";

export const drawTempChart = (temps) => {
  console.log(asciichart.plot(temps, { height: 10 }));
};

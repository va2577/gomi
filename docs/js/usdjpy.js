let data
const plot = () => {
  const container = document.querySelector("main")
  const element = Plot.plot({
    y: {
      grid: true,
    },
    marks: [
      Plot.line(data, {
        x: "date",
        y: "price",
        stroke: "steelblue",
        title: data => `${d3.timeFormat("%Y-%m")(data.date)} ${data.price}`,
      })
    ],
    width: container.offsetWidth,
    height: container.offsetHeight,
  })
  const svg = container.querySelector("svg")
  if (svg) svg.remove()
  container.append(element)
}
document.addEventListener("DOMContentLoaded", async () => {
  const array1 = await d3.csv(url)
  const array2 = array1.map(x => ({
    date: d3.timeParse("%Y-%m-%d")(x.date),
    price: parseFloat(x.price),
  }))
  const array3 = array2.filter(filter)
  data = array3
  plot()
})
window.addEventListener("resize", () => {
  plot()
})

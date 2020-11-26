export const chartDatas = [
  {
    labels: ["Activity"],
    datasets: [
      {
        label: "Deleted",
        data: [100],
        backgroundColor: ["rgba(255, 0, 0, 0.5)"],
        borderWidth: 4,
      },
      {
        label: "Updated",
        data: [13],
        backgroundColor: ["rgba(128, 0, 128, 0.5)"],
        borderWidth: 4,
      },
      {
        label: "Added",
        data: [500],
        backgroundColor: ["rgba(0, 128, 0, 0.5)"],
        borderWidth: 4,
      },
    ],
  },
  {
    labels: ["Deleted", "Updated", "Added"],
    datasets: [
      {
        label: "Deleted",
        data: [100, 13, 500],
        backgroundColor: [
          "rgba(255, 0, 0, 0.5)",
          "rgba(128, 0, 128, 0.5)",
          "rgba(0, 128, 0, 0.5)",
        ],
        borderWidth: 4,
      },
    ],
  },
];

// Script for handling the graphs

document.addEventListener("DOMContentLoaded", () => {
    fetch('/admin/dashboard/report-data')
        .then(res => {
            if (!res.ok) throw new Error('Network response was not OK');
            return res.json();
        })
        .then(chartData => {
            const ctx = document.getElementById("reportChart").getContext("2d");

            const reportChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: chartData.labels,
                    datasets: [
                        {
                            label: "Verified",
                            data: chartData.verifiedCounts,  // matches service return property
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 2,
                            fill: false,
                            tension: 0.1,
                        },
                        {
                            label: "Unverified",
                            data: chartData.unverifiedCounts,
                            borderColor: "rgba(255, 99, 132, 1)",
                            borderWidth: 2,
                            fill: false,
                            borderDash: [5, 5],
                            tension: 0.1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: "top" },
                        title: { display: true, text: "Reports Over Time" },
                    },
                    scales: {
                        x: { title: { display: true, text: "Date" } },
                        y: { beginAtZero: true, title: { display: true, text: "Number of Reports" } },
                    },
                },
            });
        });

    },
)


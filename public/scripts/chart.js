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
                        // Theft
                        {
                            label: "Theft (Verified)",
                            data: chartData.data.theft.verified,
                            borderColor: "rgba(255, 0, 0, 1)", // red
                            borderWidth: 2,
                            fill: false,
                            tension: 0.1,
                            borderDash: []
                        },
                        {
                            label: "Theft (Unverified)",
                            data: chartData.data.theft.unverified,
                            borderColor: "rgba(255, 0, 0, 1)", // red
                            borderWidth: 2,
                            fill: false,
                            tension: 0.1,
                            borderDash: [5, 5]
                        },

                        // Leak
                        {
                            label: "Leak (Verified)",
                            data: chartData.data.leak.verified,
                            borderColor: "rgba(0, 0, 255, 1)", // blue
                            borderWidth: 2,
                            fill: false,
                            tension: 0.1,
                            borderDash: []
                        },
                        {
                            label: "Leak (Unverified)",
                            data: chartData.data.leak.unverified,
                            borderColor: "rgba(0, 0, 255, 1)", // blue
                            borderWidth: 2,
                            fill: false,
                            tension: 0.1,
                            borderDash: [5, 5]
                        },

                        // Water Point
                        {
                            label: "Water Point (Verified)",
                            data: chartData.data.water_point.verified,
                            borderColor: "rgba(0, 128, 0, 1)", // green
                            borderWidth: 2,
                            fill: false,
                            tension: 0.1,
                            borderDash: []
                        },
                        {
                            label: "Water Point (Unverified)",
                            data: chartData.data.water_point.unverified,
                            borderColor: "rgba(0, 128, 0, 1)", // green
                            borderWidth: 2,
                            fill: false,
                            tension: 0.1,
                            borderDash: [5, 5]
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: "top" },
                        title: { display: true, text: "Reports Over Time by Type and Verification" }
                    },
                    scales: {
                        x: { title: { display: true, text: "Date" } },
                        y: { beginAtZero: true, title: { display: true, text: "Number of Reports" } }
                    }
                }
            });
        });
});

document.addEventListener("DOMContentLoaded", function () {

    function fetchAttendance() {
        const tbody = document.getElementById("attendance-table");

        fetch('attendance.csv?ts=' + new Date().getTime()) // prevent caching
            .then(response => response.text())
            .then(csvText => {
                tbody.innerHTML = "";

                const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
                const data = parsed.data;

                let presentCount = 0;
                let absentCount = 0;

                data.forEach(row => {
                    if (!row.Name) return;

                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${row.Name}</td>
                        <td>${row.Date}</td>
                        <td>${row.Time}</td>
                        <td class="${row.Status.toLowerCase()}">${row.Status}</td>
                    `;
                    tbody.appendChild(tr);

                    if (row.Status === "Present") presentCount++;
                    else if (row.Status === "Absent") absentCount++;
                });

                document.getElementById("total").textContent = data.length;
                document.getElementById("present").textContent = presentCount;
                document.getElementById("absent").textContent = absentCount;
            })
            .catch(err => console.error("Error loading attendance CSV:", err));
    }

    // Initial fetch
    fetchAttendance();

    // Auto-refresh every 10 seconds
    setInterval(fetchAttendance, 10000);

    // Logout function
    window.logout = function() {
        sessionStorage.removeItem('loggedIn');
        window.location.href = 'login.html';
    }
});

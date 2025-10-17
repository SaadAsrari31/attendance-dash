document.addEventListener("DOMContentLoaded", function () {

    const sheetId = "10l_hhkf9mM_wRugqmP7ZqkOCw0VAVCPPk_a8PhMzXK8"; // Replace with your Google Sheet ID
    const feedUrl = `https://spreadsheets.google.com/feeds/list/${sheetId}/od6/public/values?alt=json`;

    function fetchAttendance() {
        const tbody = document.getElementById("attendance-table");

        fetch(feedUrl)
            .then(res => res.json())
            .then(data => {
                tbody.innerHTML = ""; // Clear existing rows

                const entries = data.feed.entry;
                let presentCount = 0;
                let absentCount = 0;

                entries.forEach(entry => {
                    const name = entry.gsx$name ? entry.gsx$name.$t : "";
                    const date = entry.gsx$date ? entry.gsx$date.$t : "";
                    const time = entry.gsx$time ? entry.gsx$time.$t : "";
                    const status = entry.gsx$status ? entry.gsx$status.$t : "";

                    if (!name) return;

                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${name}</td>
                        <td>${date}</td>
                        <td>${time}</td>
                        <td class="${status.toLowerCase()}">${status}</td>
                    `;
                    tbody.appendChild(tr);

                    if (status === "Present") presentCount++;
                    else if (status === "Absent") absentCount++;
                });

                // Update summary
                document.getElementById("total").textContent = entries.length;
                document.getElementById("present").textContent = presentCount;
                document.getElementById("absent").textContent = absentCount;
            })
            .catch(err => console.error("Error loading Google Sheets JSON:", err));
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

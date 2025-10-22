document.addEventListener("DOMContentLoaded", function () {
  // ✅ Use your published CSV link here
  const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQsPyaz03qLXlDsfSsgQX6Ix1xqfFFf0FaB_ku1Eqd1yr2iB6dJJxy8L1GSicg8eb4_1TxAmcmig8n4/pub?output=csv";

  function fetchAttendance() {
    const tbody = document.getElementById("attendance-table");

    fetch(sheetUrl)
      .then(response => response.text())
      .then(csvText => {
        // Convert CSV → JSON using PapaParse
        const data = Papa.parse(csvText, { header: true }).data;

        tbody.innerHTML = ""; // Clear old rows
        let presentCount = 0;
        let absentCount = 0;

        data.forEach(row => {
          if (!row.Name) return; // Skip empty rows

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

        // Update summary
        document.getElementById("total").textContent = data.length;
        document.getElementById("present").textContent = presentCount;
        document.getElementById("absent").textContent = absentCount;
      })
      .catch(err => console.error("Error loading CSV:", err));
  }

  // Initial load
  fetchAttendance();

  // Auto-refresh every 15 seconds
  setInterval(fetchAttendance, 15000);

  // Logout function
  window.logout = function () {
    sessionStorage.removeItem('loggedIn');
    window.location.href = 'login.html';
  };
});
